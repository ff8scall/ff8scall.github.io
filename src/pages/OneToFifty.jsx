import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { Trophy, RefreshCw, Play, Timer } from 'lucide-react';

const OneToFifty = () => {
    const [numbers, setNumbers] = useState([]);
    const [currentNumber, setCurrentNumber] = useState(1);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [grid, setGrid] = useState([]);

    // 1-25 are initially visible, 26-50 replace them
    const generateGrid = () => {
        const firstSet = Array.from({ length: 25 }, (_, i) => i + 1);
        return shuffle(firstSet);
    };

    const shuffle = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    const startGame = () => {
        setNumbers(generateGrid());
        setCurrentNumber(1);
        setStartTime(Date.now());
        setEndTime(null);
        setIsPlaying(true);
        setGrid(Array(25).fill(null).map((_, i) => ({
            value: null,
            index: i
        })));

        // Initialize grid with 1-25 shuffled
        const initialNumbers = shuffle(Array.from({ length: 25 }, (_, i) => i + 1));
        setGrid(initialNumbers.map((val, idx) => ({ value: val, index: idx })));
    };

    const handleClick = (number, index) => {
        if (!isPlaying || number !== currentNumber) return;

        if (currentNumber === 50) {
            setEndTime(Date.now());
            setIsPlaying(false);
            return;
        }

        // If number is <= 25, replace with number + 25
        // If number is > 25, just clear it (set to null)
        const newGrid = [...grid];
        if (number <= 25) {
            newGrid[index] = { value: number + 25, index };
        } else {
            newGrid[index] = { value: null, index };
        }

        setGrid(newGrid);
        setCurrentNumber(prev => prev + 1);
    };

    const formatTime = (ms) => {
        return (ms / 1000).toFixed(2);
    };

    // Timer update for display
    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(Date.now() - startTime);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isPlaying, startTime]);

    return (
        <div className="max-w-2xl mx-auto space-y-6 select-none">
            <SEO
                title="1 to 50 - 순발력 테스트 게임"
                description="1부터 50까지 숫자를 순서대로 빠르게 클릭하세요! 당신의 순발력을 테스트해보세요."
                keywords={['1to50', '1부터50', '순발력', '게임', '반응속도']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    1 to 50
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    1부터 50까지 순서대로 빠르게 터치하세요!
                </p>
            </div>

            <div className="card p-6 text-center space-y-6">
                {/* Status Bar */}
                <div className="flex justify-between items-center text-xl font-bold px-4">
                    <div className="text-blue-500">
                        다음 숫자: <span className="text-3xl">{isPlaying ? currentNumber : '-'}</span>
                    </div>
                    <div className="text-red-500 font-mono text-3xl">
                        {isPlaying
                            ? formatTime(currentTime)
                            : endTime
                                ? formatTime(endTime - startTime)
                                : '0.00'}s
                    </div>
                </div>

                {/* Game Grid */}
                {!isPlaying && !endTime ? (
                    <div className="h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <button
                            onClick={startGame}
                            className="btn btn-primary btn-lg text-2xl px-12 py-4 animate-pulse"
                        >
                            <Play className="w-8 h-8 mr-2" />
                            게임 시작
                        </button>
                    </div>
                ) : endTime ? (
                    <div className="h-96 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl space-y-6">
                        <div className="text-4xl font-bold text-gray-900 dark:text-white">
                            Game Over!
                        </div>
                        <div className="text-6xl font-bold text-red-500 font-mono">
                            {formatTime(endTime - startTime)}s
                        </div>
                        <button
                            onClick={startGame}
                            className="btn btn-primary btn-lg flex items-center gap-2"
                        >
                            <RefreshCw className="w-6 h-6" />
                            다시 도전
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-5 gap-2 md:gap-3 max-w-md mx-auto">
                        {grid.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => item.value && handleClick(item.value, idx)}
                                className={`
                  aspect-square flex items-center justify-center text-2xl md:text-3xl font-bold rounded-lg cursor-pointer transition-all duration-75
                  ${item.value
                                        ? 'bg-white dark:bg-gray-700 shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 active:scale-95 border-2 border-gray-200 dark:border-gray-600'
                                        : 'invisible'}
                `}
                            >
                                {item.value}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="text-center text-sm text-gray-500">
                💡 팁: 다음 숫자를 미리 찾아두면 더 빠르게 기록을 단축할 수 있습니다.
            </div>
        </div>
    );
};

export default OneToFifty;
