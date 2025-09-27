import React, { useMemo, useState } from 'react';
import { Question, Language } from '../types';
import { MARKS_PER_QUESTION } from '../constants';

interface ResultsProps {
    questions: (Question | null)[];
    userAnswers: (number | null)[];
    onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ questions, userAnswers, onRestart }) => {
    const [language, setLanguage] = useState<Language>('en');

    const { score, correct, incorrect, unattempted, loadedQuestionCount } = useMemo(() => {
        let score = 0;
        let correct = 0;
        let incorrect = 0;
        let unattempted = 0;
        let loadedQuestionCount = 0;

        questions.forEach((q, index) => {
            if (q === null) {
                return; // Skip questions that failed to load
            }
            loadedQuestionCount++;

            const userAnswer = userAnswers[index];
            if (userAnswer === null || userAnswer === undefined) {
                unattempted++;
            } else if (userAnswer === q.answer) {
                score += MARKS_PER_QUESTION;
                correct++;
            } else {
                incorrect++;
            }
        });

        return { score, correct, incorrect, unattempted, loadedQuestionCount };
    }, [questions, userAnswers]);

    const totalMarks = loadedQuestionCount * MARKS_PER_QUESTION;

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">Exam Results</h1>
                <p className="text-center text-gray-500 mb-8">Here's your performance summary based on {loadedQuestionCount} loaded questions.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center mb-10">
                    <div className="bg-blue-100 p-6 rounded-xl">
                        <p className="text-lg font-semibold text-blue-800">Your Score</p>
                        <p className="text-5xl font-bold text-blue-600">{score} <span className="text-2xl font-medium text-gray-500">/ {totalMarks}</span></p>
                    </div>
                     <div className="bg-green-100 p-6 rounded-xl">
                        <p className="text-lg font-semibold text-green-800">Percentage</p>
                        <p className="text-5xl font-bold text-green-600">{totalMarks > 0 ? ((score / totalMarks) * 100).toFixed(2) : '0.00'}%</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 text-center">
                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{correct}</p>
                        <p className="text-sm font-medium text-green-800">Correct Answers</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">{incorrect}</p>
                        <p className="text-sm font-medium text-red-800">Incorrect Answers</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg col-span-2 sm:col-span-1">
                        <p className="text-2xl font-bold text-gray-600">{unattempted}</p>
                        <p className="text-sm font-medium text-gray-800">Unattempted</p>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6 border-b pb-2">
                    <h2 className="text-2xl font-bold text-gray-700">Question Breakdown</h2>
                    <div className="flex items-center space-x-1 rounded-lg bg-gray-200 p-1">
                        <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${language === 'en' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-gray-600'}`}>English</button>
                        <button onClick={() => setLanguage('hi')} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${language === 'hi' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-gray-600'}`}>हिंदी</button>
                    </div>
                </div>

                <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4">
                    {questions.map((q, index) => {
                        if (q === null) return null;
                        return (
                            <div key={index} className="p-4 border rounded-lg bg-gray-50">
                                <p className="font-semibold text-gray-800 mb-2">Q{index + 1}: {q.question[language]}</p>
                                <div className="space-y-1 text-sm">
                                    <p className={`p-2 rounded ${userAnswers[index] === q.answer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        Your Answer: <span className="font-medium">{userAnswers[index] !== null && userAnswers[index] !== undefined ? q.options[userAnswers[index] as number][language] : 'Not Answered'}</span>
                                    </p>
                                    {userAnswers[index] !== q.answer && (
                                        <p className="p-2 rounded bg-green-100 text-green-800">
                                            Correct Answer: <span className="font-medium">{q.options[q.answer][language]}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                 <div className="text-center mt-10">
                    <button
                        onClick={onRestart}
                        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Take Another Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;