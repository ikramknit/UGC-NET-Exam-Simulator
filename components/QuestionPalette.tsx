
import React from 'react';
import { QuestionStatus } from '../types';
import { PAPER1_QUESTION_COUNT, TOTAL_QUESTIONS } from '../constants';

interface QuestionPaletteProps {
    statuses: QuestionStatus[];
    currentIndex: number;
    jumpToQuestion: (index: number) => void;
    loadedQuestionCount: number;
}

const getStatusColor = (status: QuestionStatus, isCurrent: boolean): string => {
    if (isCurrent) return 'bg-blue-600 text-white border-blue-700';
    switch (status) {
        case QuestionStatus.Answered:
            return 'bg-green-500 text-white border-green-600';
        case QuestionStatus.NotAnswered:
            return 'bg-red-500 text-white border-red-600';
        case QuestionStatus.MarkedForReview:
            return 'bg-purple-500 text-white border-purple-600';
        case QuestionStatus.AnsweredAndMarkedForReview:
            return 'bg-purple-500 text-white border-purple-600 ring-2 ring-green-400';
        case QuestionStatus.NotVisited:
        default:
            return 'bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300';
    }
};

const QuestionPalette: React.FC<QuestionPaletteProps> = ({ statuses, currentIndex, jumpToQuestion, loadedQuestionCount }) => {
    const renderPaletteSection = (start: number, count: number) => {
        return Array.from({ length: count }, (_, i) => start + i).map(index => {
            const isLoaded = index < loadedQuestionCount;
            const status = statuses[index];
            
            let buttonClass = 'w-8 h-8 flex items-center justify-center rounded-md text-sm font-semibold border transition-colors duration-200';
            if (isLoaded) {
                buttonClass += ` ${getStatusColor(status, index === currentIndex)}`;
            } else {
                buttonClass += ' bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400 opacity-70';
            }

            return (
                <button
                    key={index}
                    onClick={() => jumpToQuestion(index)}
                    disabled={!isLoaded}
                    className={buttonClass}
                    aria-label={isLoaded ? `Question ${index + 1}` : `Question ${index + 1} (Loading)`}
                >
                    {index + 1}
                </button>
            );
        });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Question Palette</h3>
            
            <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2 border-b pb-1">Paper 1</h4>
                <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
                    {renderPaletteSection(0, PAPER1_QUESTION_COUNT)}
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-gray-700 mb-2 border-b pb-1">Paper 2</h4>
                <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
                    {renderPaletteSection(PAPER1_QUESTION_COUNT, TOTAL_QUESTIONS - PAPER1_QUESTION_COUNT)}
                </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span> Answered</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span> Not Answered</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-purple-500 mr-2"></span> Marked for Review</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-gray-200 mr-2 border border-gray-400"></span> Not Visited</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-blue-600 mr-2"></span> Current</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-gray-300 mr-2 border border-gray-400"></span> Loading</div>
            </div>
        </div>
    );
};

export default QuestionPalette;
