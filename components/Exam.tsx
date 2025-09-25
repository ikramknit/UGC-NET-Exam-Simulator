import React, { useState, useEffect, useCallback } from 'react';
import { Question, QuestionStatus, Language } from '../types';
import { TOTAL_TIME_SECONDS, PAPER1_QUESTION_COUNT, TOTAL_QUESTIONS, UGC_NET_EXAM_STATE_KEY } from '../constants';
import Timer from './Timer';
import QuestionPalette from './QuestionPalette';

interface ExamProps {
    questions: Question[];
    onSubmit: (answers: (number | null)[]) => void;
}

const Exam: React.FC<ExamProps> = ({ questions, onSubmit }) => {
    const loadState = useCallback(() => {
        try {
            const savedState = localStorage.getItem(UGC_NET_EXAM_STATE_KEY);
            if (savedState) {
                const parsed = JSON.parse(savedState);
                if (parsed.answers && parsed.statuses && typeof parsed.timeLeft === 'number') {
                    return parsed;
                }
            }
        } catch (error) {
            console.error("Failed to load state from localStorage", error);
            localStorage.removeItem(UGC_NET_EXAM_STATE_KEY);
        }
        return null;
    }, []);

    const [currentIndex, setCurrentIndex] = useState(() => loadState()?.currentIndex || 0);
    const [answers, setAnswers] = useState<(number | null)[]>(() => loadState()?.answers || Array(questions.length).fill(null));
    const [statuses, setStatuses] = useState<QuestionStatus[]>(() => {
        const savedStatuses = loadState()?.statuses;
        const initialStatuses = Array(TOTAL_QUESTIONS).fill(QuestionStatus.NotVisited);
        if (savedStatuses) {
            savedStatuses.forEach((status: QuestionStatus, index: number) => {
                if (index < initialStatuses.length) {
                    initialStatuses[index] = status;
                }
            });
        }
        return initialStatuses;
    });
    const [timeLeft, setTimeLeft] = useState(() => loadState()?.timeLeft || TOTAL_TIME_SECONDS);
    const [language, setLanguage] = useState<Language>('en');
    const [activePaper, setActivePaper] = useState<1 | 2>(() => (loadState()?.currentIndex || 0) < PAPER1_QUESTION_COUNT ? 1 : 2);

    const performSubmit = useCallback(() => {
        localStorage.removeItem(UGC_NET_EXAM_STATE_KEY);
        onSubmit(answers);
    }, [answers, onSubmit]);

    const handleManualSubmitClick = () => {
        const answeredCount = answers.filter(a => a !== null && a !== undefined).length;
        const totalAttemptableQuestions = questions.length;
        const confirmationMessage = `You have attempted ${answeredCount} out of ${totalAttemptableQuestions} loaded questions.\n\nAre you sure you want to submit the exam? This action cannot be undone.`;

        if (window.confirm(confirmationMessage)) {
            performSubmit();
        }
    };
    
    useEffect(() => {
        const examProgress = { currentIndex, answers, statuses, timeLeft };
        localStorage.setItem(UGC_NET_EXAM_STATE_KEY, JSON.stringify(examProgress));
    }, [currentIndex, answers, statuses, timeLeft]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    performSubmit();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [performSubmit]);

    useEffect(() => {
        const targetLength = questions.length;
        if (targetLength > 0 && answers.length < targetLength) {
             setAnswers(currentAnswers => {
                const diff = targetLength - currentAnswers.length;
                return [...currentAnswers, ...Array(diff).fill(null)];
            });
        }
    }, [questions.length, answers.length]);

    useEffect(() => {
        if (questions.length > 0 && statuses[0] === QuestionStatus.NotVisited && !loadState()) {
             updateStatus(0, QuestionStatus.NotAnswered);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions.length]);

    const updateStatus = (index: number, newStatus: QuestionStatus) => {
        setStatuses(prev => {
            const newStatuses = [...prev];
            if (index < newStatuses.length && prev[index] !== newStatus) {
                newStatuses[index] = newStatus;
            }
            return newStatuses;
        });
    };
    
    const jumpToQuestion = (index: number) => {
        if (index >= 0 && index < questions.length) {
            setCurrentIndex(index);
            setActivePaper(index < PAPER1_QUESTION_COUNT ? 1 : 2);
            if (statuses[index] === QuestionStatus.NotVisited) {
                updateStatus(index, QuestionStatus.NotAnswered);
            }
        }
    };
    
    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            jumpToQuestion(currentIndex + 1);
        }
    };

    const handleSelectOption = (optionIndex: number) => {
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[currentIndex] = optionIndex;
            return newAnswers;
        });
        const currentStatus = statuses[currentIndex];
        if (currentStatus === QuestionStatus.MarkedForReview || currentStatus === QuestionStatus.AnsweredAndMarkedForReview) {
            updateStatus(currentIndex, QuestionStatus.AnsweredAndMarkedForReview);
        } else {
            updateStatus(currentIndex, QuestionStatus.Answered);
        }
    };

    const clearResponse = () => {
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[currentIndex] = null;
            return newAnswers;
        });
        updateStatus(currentIndex, QuestionStatus.NotAnswered);
    };

    const markForReview = () => {
        const currentStatus = statuses[currentIndex];
        if(answers[currentIndex] !== null) {
            updateStatus(currentIndex, QuestionStatus.AnsweredAndMarkedForReview);
        } else {
            updateStatus(currentIndex, QuestionStatus.MarkedForReview);
        }
        handleNext();
    };

    const saveAndNext = () => {
        handleNext();
    };
    
    const switchPaper = (paper: 1 | 2) => {
        setActivePaper(paper);
        if (paper === 1) {
            jumpToQuestion(0);
        } else if (questions.length > PAPER1_QUESTION_COUNT) {
            jumpToQuestion(PAPER1_QUESTION_COUNT);
        }
    }

    const isPaper2Ready = questions.length > PAPER1_QUESTION_COUNT;
    const isFullyLoaded = questions.length === TOTAL_QUESTIONS;
    const currentQuestion = questions[currentIndex];

    if (!currentQuestion) {
        return (
            <div className="flex items-center justify-center h-screen">
                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="ml-4 text-gray-700 text-xl">Loading Question...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">UGC NET Exam</h1>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 rounded-lg bg-gray-200 p-1">
                        <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${language === 'en' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-gray-600'}`}>English</button>
                        <button onClick={() => setLanguage('hi')} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${language === 'hi' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-gray-600'}`}>हिंदी</button>
                    </div>
                    <Timer seconds={timeLeft} />
                </div>
            </header>
            <main className="flex-grow p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <div className="flex border-b">
                        <button onClick={() => switchPaper(1)} className={`py-2 px-4 font-semibold ${activePaper === 1 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Paper 1: Teaching & Research Aptitude</button>
                        <button onClick={() => switchPaper(2)} className={`py-2 px-4 font-semibold flex items-center gap-2 ${activePaper === 2 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} ${!isPaper2Ready ? 'cursor-not-allowed opacity-50' : ''}`} disabled={!isPaper2Ready}>
                           Paper 2: Computer Science
                           {questions.length < TOTAL_QUESTIONS && activePaper === 2 && (
                                <svg className="animate-spin -ml-1 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                           )}
                        </button>
                    </div>
                    <div className="flex justify-between items-center pt-4 mb-4">
                       <h2 className="text-xl font-semibold text-blue-700">Question {currentIndex + 1}</h2>
                       <p className="text-gray-600 font-medium">Loaded Questions: {questions.length}/{TOTAL_QUESTIONS}</p>
                    </div>
                    <div className="flex-grow">
                        <p className="text-lg text-gray-800 mb-6 whitespace-pre-wrap">{currentQuestion.question[language]}</p>
                        <div className="space-y-4">
                            {currentQuestion.options.map((option, index) => (
                                <label key={index} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${answers[currentIndex] === index ? 'bg-blue-100 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}>
                                    <input
                                        type="radio"
                                        name={`question-${currentIndex}`}
                                        checked={answers[currentIndex] === index}
                                        onChange={() => handleSelectOption(index)}
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-4 text-gray-700">{option[language]}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="border-t pt-4 mt-6 flex flex-wrap gap-4">
                        <button onClick={saveAndNext} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Save & Next</button>
                        <button onClick={clearResponse} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition">Clear Response</button>
                        <button onClick={markForReview} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition">Mark for Review & Next</button>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <QuestionPalette statuses={statuses} currentIndex={currentIndex} jumpToQuestion={jumpToQuestion} loadedQuestionCount={questions.length} />
                     <button 
                        onClick={handleManualSubmitClick} 
                        disabled={!isFullyLoaded}
                        className={`w-full text-white text-lg font-bold py-4 rounded-lg transition-transform transform hover:scale-105 ${
                            !isFullyLoaded 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                     >
                        {isFullyLoaded ? 'SUBMIT EXAM' : `Loading... (${questions.length}/${TOTAL_QUESTIONS})`}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Exam;