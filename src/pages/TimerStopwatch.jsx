import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import SEO from '../components/SEO';

const TimerStopwatch = () => {
    const [mode, setMode] = useState('timer'); // timer or stopwatch
    const [timerMinutes, setTimerMinutes] = useState(5);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [timeLeft, setTimeLeft] = useState(300); // seconds
    const [isRunning, setIsRunning] = useState(false);

    const [stopwatchTime, setStopwatchTime] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (mode === 'timer' && isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        // 알림음 (선택사항)
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (mode === 'stopwatch' && isRunning) {
            intervalRef.current = setInterval(() => {
                setStopwatchTime(prev => prev + 10);
            }, 10);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [mode, isRunning, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatStopwatch = (milliseconds) => {
        const mins = Math.floor(milliseconds / 60000);
        const secs = Math.floor((milliseconds % 60000) / 1000);
        const ms = Math.floor((milliseconds % 1000) / 10);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    };

    const startTimer = () => {
        const total = timerMinutes * 60 + timerSeconds;
        setTimeLeft(total);
        setIsRunning(true);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(timerMinutes * 60 + timerSeconds);
    };

    const resetStopwatch = () => {
        setIsRunning(false);
        setStopwatchTime(0);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <SEO
                title="타이머 및 스톱워치 - Utility Hub"
                description="온라인 타이머와 스톱워치를 사용하세요. 집중 타이머, 시간 측정, 운동 타이머 등 다양한 용도로 활용하세요."
                keywords="온라인 타이머, 스톱워치, 시간 측정, 집중 타이머, 카운트다운"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Clock className="w-8 h-8 text-primary" />
                    타이머 & 스톱워치
                </h1>
                <p className="text-muted-foreground">
                    시간을 측정하고 관리하세요
                </p>
            </header>

            {/* Mode Toggle */}
            <div className="flex justify-center gap-2">
                <button
                    onClick={() => {
                        setMode('timer');
                        setIsRunning(false);
                    }}
                    className={`px-8 py-3 rounded-lg font-bold transition-all ${mode === 'timer'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-accent'
                        }`}
                >
                    타이머
                </button>
                <button
                    onClick={() => {
                        setMode('stopwatch');
                        setIsRunning(false);
                    }}
                    className={`px-8 py-3 rounded-lg font-bold transition-all ${mode === 'stopwatch'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-accent'
                        }`}
                >
                    스톱워치
                </button>
            </div>

            {mode === 'timer' ? (
                <div className="bg-card border border-border rounded-xl p-8 space-y-6">
                    {!isRunning && timeLeft === (timerMinutes * 60 + timerSeconds) && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">분</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={timerMinutes}
                                    onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 text-center text-2xl bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">초</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={timerSeconds}
                                    onChange={(e) => setTimerSeconds(parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 text-center text-2xl bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>
                    )}

                    <div className="text-center">
                        <div className="text-8xl font-bold text-primary mb-8">
                            {formatTime(timeLeft)}
                        </div>
                        <div className="flex justify-center gap-3">
                            {!isRunning ? (
                                <button
                                    onClick={startTimer}
                                    className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg font-bold hover:brightness-110 transition-all"
                                >
                                    <Play className="w-5 h-5" />
                                    시작
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsRunning(false)}
                                    className="flex items-center gap-2 px-8 py-4 bg-yellow-600 text-white rounded-lg font-bold hover:brightness-110 transition-all"
                                >
                                    <Pause className="w-5 h-5" />
                                    일시정지
                                </button>
                            )}
                            <button
                                onClick={resetTimer}
                                className="flex items-center gap-2 px-8 py-4 bg-secondary hover:bg-accent rounded-lg font-bold transition-all"
                            >
                                <RotateCcw className="w-5 h-5" />
                                초기화
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-card border border-border rounded-xl p-8 space-y-6">
                    <div className="text-center">
                        <div className="text-8xl font-bold text-primary mb-8">
                            {formatStopwatch(stopwatchTime)}
                        </div>
                        <div className="flex justify-center gap-3">
                            {!isRunning ? (
                                <button
                                    onClick={() => setIsRunning(true)}
                                    className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg font-bold hover:brightness-110 transition-all"
                                >
                                    <Play className="w-5 h-5" />
                                    시작
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsRunning(false)}
                                    className="flex items-center gap-2 px-8 py-4 bg-yellow-600 text-white rounded-lg font-bold hover:brightness-110 transition-all"
                                >
                                    <Pause className="w-5 h-5" />
                                    정지
                                </button>
                            )}
                            <button
                                onClick={resetStopwatch}
                                className="flex items-center gap-2 px-8 py-4 bg-secondary hover:bg-accent rounded-lg font-bold transition-all"
                            >
                                <RotateCcw className="w-5 h-5" />
                                초기화
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 팁</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>타이머: 집중 시간 관리, 요리, 운동 등에 활용하세요</li>
                    <li>스톱워치: 운동 기록, 작업 시간 측정 등에 사용하세요</li>
                    <li>포모도로 기법: 25분 집중 + 5분 휴식을 반복하세요</li>
                </ul>
            </div>
        </div>
    );
};

export default TimerStopwatch;
