import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { Timer, Play, Pause, RotateCcw, Coffee, Briefcase } from 'lucide-react';

const PomodoroTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('work'); // 'work' or 'break'
    const [sessions, setSessions] = useState(0);

    const timerRef = useRef(null);

    const WORK_TIME = 25 * 60;
    const BREAK_TIME = 5 * 60;

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleTimerComplete();
        }

        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft]);

    const handleTimerComplete = () => {
        clearInterval(timerRef.current);
        setIsActive(false);

        // Notification
        if (Notification.permission === 'granted') {
            new Notification(mode === 'work' ? '휴식 시간입니다!' : '집중 시간입니다!', {
                body: mode === 'work' ? '25분 집중하느라 고생하셨어요. 5분간 휴식하세요.' : '휴식이 끝났습니다. 다시 집중해볼까요?',
                icon: '/favicon.ico'
            });
        }

        // Switch mode
        if (mode === 'work') {
            setMode('break');
            setTimeLeft(BREAK_TIME);
            setSessions((prev) => prev + 1);
        } else {
            setMode('work');
            setTimeLeft(WORK_TIME);
        }
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === 'work' ? WORK_TIME : BREAK_TIME);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = mode === 'work'
        ? ((WORK_TIME - timeLeft) / WORK_TIME) * 100
        : ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100;

    return (
        <div className="max-w-md mx-auto space-y-6">
            <SEO
                title="포모도로 타이머 - Pomodoro Timer"
                description="25분 집중, 5분 휴식의 포모도로 기법을 위한 온라인 타이머입니다. 생산성을 높이고 집중력을 유지하세요."
                keywords={['포모도로', 'pomodoro', '타이머', '집중 타이머', '공부 타이머', '생산성']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Timer className="w-8 h-8 text-red-500" />
                    포모도로 타이머
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    25분 집중하고 5분 휴식하여 생산성을 극대화하세요.
                </p>
            </div>

            <div className="card p-8 space-y-8 text-center">
                {/* Mode Switcher */}
                <div className="flex justify-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full w-fit mx-auto">
                    <button
                        onClick={() => switchMode('work')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${mode === 'work'
                                ? 'bg-white dark:bg-gray-700 text-red-500 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                            }`}
                    >
                        <Briefcase className="w-4 h-4" />
                        집중 (25분)
                    </button>
                    <button
                        onClick={() => switchMode('break')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${mode === 'break'
                                ? 'bg-white dark:bg-gray-700 text-green-500 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                            }`}
                    >
                        <Coffee className="w-4 h-4" />
                        휴식 (5분)
                    </button>
                </div>

                {/* Timer Display */}
                <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                    {/* Circular Progress Background */}
                    <svg className="absolute w-full h-full transform -rotate-90">
                        <circle
                            cx="128"
                            cy="128"
                            r="120"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-200 dark:text-gray-700"
                        />
                        <circle
                            cx="128"
                            cy="128"
                            r="120"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 120}
                            strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                            className={`transition-all duration-1000 ${mode === 'work' ? 'text-red-500' : 'text-green-500'
                                }`}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Time Text */}
                    <div className="text-6xl font-bold font-mono tracking-wider z-10">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={toggleTimer}
                        className={`btn btn-lg px-8 flex items-center gap-2 ${isActive
                                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                : 'btn-primary'
                            }`}
                    >
                        {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        {isActive ? '일시정지' : '시작'}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="btn btn-secondary p-4"
                        title="리셋"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </div>

                {/* Session Counter */}
                <div className="text-sm text-gray-500">
                    완료한 세션: <span className="font-bold text-gray-900 dark:text-white">{sessions}</span>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
