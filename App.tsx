import React, { useState, useCallback } from 'react';
import { Question, ExamState } from './types';
import { generateQuestions } from './services/geminiService';
import Exam from './components/Exam';
import Results from './components/Results';
import { SYLLABUS_PAPER_1, SYLLABUS_PAPER_2, PAPER1_QUESTION_COUNT, UGC_NET_EXAM_STATE_KEY, TOTAL_QUESTIONS } from './constants';

const LoadingScreen: React.FC<{ loadingMessage: string }> = ({ loadingMessage }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 className="text-2xl font-semibold mt-4">Preparing Your Exam...</h2>
        <p className="mt-2 text-gray-300">{loadingMessage}</p>
    </div>
);

const StartScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-8">
        <div className="text-center bg-white p-12 rounded-lg shadow-2xl max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">UGC NET Exam Simulator</h1>
            <p className="text-gray-600 mb-6">
                Welcome! This is a simulation of the UGC National Eligibility Test (NET).
                You will face 150 questions across two papers with a total time limit of 3 hours. Your progress will be saved automatically.
            </p>
            <ul className="text-left list-disc list-inside mb-8 space-y-2 text-gray-700">
                <li><b>Paper 1:</b> 50 Questions on Teaching & Research Aptitude.</li>
                <li><b>Paper 2:</b> 100 Questions on Computer Science & Applications.</li>
                <li><b>Total Time:</b> 3 Hours (180 Minutes).</li>
                <li><b>Marking:</b> +2 for each correct answer. No negative marking.</li>
            </ul>
            <button
                onClick={onStart}
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Start Exam
            </button>
        </div>
    </div>
);


const App: React.FC = () => {
    const [examState, setExamState] = useState<ExamState>(ExamState.Start);
    const [questions, setQuestions] = useState<(Question | null)[]>([]);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [finalAnswers, setFinalAnswers] = useState<(number | null)[]>([]);

    const streamLoadQuestions = useCallback(async () => {
        setLoadingMessage('Preparing the first question to start the exam...');
        setQuestions(Array(TOTAL_QUESTIONS).fill(null));

        const fetchAndSetQuestion = async (index: number, retries = 2) => {
            const isPaper1 = index < PAPER1_QUESTION_COUNT;
            const syllabus = isPaper1 ? SYLLABUS_PAPER_1 : SYLLABUS_PAPER_2;
            const subject = isPaper1 ? "Teaching & Research Aptitude" : "Computer Science";
            
            try {
                const [newQuestion] = await generateQuestions(syllabus, 1, subject);
                setQuestions(prev => {
                    const newQuestions = [...prev];
                    newQuestions[index] = newQuestion;
                    return newQuestions;
                });
            } catch (error) {
                 if (retries > 0) {
                    console.warn(`Retrying to fetch question #${index + 1}. Retries left: ${retries - 1}`);
                    await new Promise(res => setTimeout(res, 1500));
                    await fetchAndSetQuestion(index, retries - 1);
                } else {
                    console.error(`Failed to fetch question #${index + 1} after multiple retries.`);
                    throw error;
                }
            }
        };

        try {
            await fetchAndSetQuestion(0);
            setExamState(ExamState.Ongoing);

            // Fetch the rest of the questions in parallel in the background
            for (let i = 1; i < TOTAL_QUESTIONS; i++) {
                 fetchAndSetQuestion(i).catch(questionError => {
                    console.error(`Failed to load question #${i + 1}:`, questionError);
                    setTimeout(() => alert(`Warning: Question ${i + 1} could not be loaded. You can continue with the available questions.`), 500);
                });
            }
        } catch (initialError) {
            console.error("Failed to start the exam:", initialError);
            alert("Fatal Error: Could not load the first question. Please refresh the page to try again.");
            setExamState(ExamState.Start);
        }
    }, []);
    
    const handleStartExam = () => {
        setExamState(ExamState.Loading);
        streamLoadQuestions();
    };

    const handleExamSubmit = (submittedAnswers: (number | null)[]) => {
        setFinalAnswers(submittedAnswers);
        localStorage.removeItem(UGC_NET_EXAM_STATE_KEY);
        setExamState(ExamState.Submitted);
    };
    
    const restartExam = () => {
        setQuestions([]);
        setFinalAnswers([]);
        localStorage.removeItem(UGC_NET_EXAM_STATE_KEY);
        setExamState(ExamState.Start);
    }

    switch (examState) {
        case ExamState.Start:
            return <StartScreen onStart={handleStartExam} />;
        case ExamState.Loading:
            return <LoadingScreen loadingMessage={loadingMessage} />;
        case ExamState.Ongoing:
            return <Exam questions={questions} onSubmit={handleExamSubmit} />;
        case ExamState.Submitted:
            return <Results questions={questions} userAnswers={finalAnswers} onRestart={restartExam} />;
        default:
            return <StartScreen onStart={handleStartExam} />;
    }
};

export default App;