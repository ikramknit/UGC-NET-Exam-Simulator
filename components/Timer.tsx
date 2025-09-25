
import React from 'react';

interface TimerProps {
    seconds: number;
}

const Timer: React.FC<TimerProps> = ({ seconds }) => {
    const formatTime = (timeInSeconds: number) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const secs = timeInSeconds % 60;

        const pad = (num: number) => num.toString().padStart(2, '0');

        return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    };

    return (
        <div className="text-xl font-mono font-semibold text-gray-700">
            Time Left: <span className="text-red-600">{formatTime(seconds)}</span>
        </div>
    );
};

export default Timer;
