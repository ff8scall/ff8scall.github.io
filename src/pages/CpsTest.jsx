import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { MousePointer2, RefreshCw, Zap, Trophy } from 'lucide-react';

const CpsTest = () => {
    const [clicks, setClicks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [duration, setDuration] = useState(10); // Default 10s

    // Ripple effect state
    const [ripples, setRipples] = useState([]);

    useEffect(() => {
        let interval;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0.1) { // Use 0.1 to prevent float issues
                        finishGame();
                        return 0;
                    }
                    return prev - 0.1;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const finishGame = () => {
        setIsActive(false);
        setIsFinished(true);
    };

    const handleClick = (e) => {
        if (isFinished) return;

        if (!isActive) {
            setIsActive(true);
        }

        setClicks((prev) => prev + 1);

        // Add ripple effect
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { x, y, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples((prev) => prev.filter(r => r.id !== newRipple.id));
        }, 500);
    };

    const resetGame = () => {
        setClicks(0);
        setTimeLeft(duration);
        setIsActive(false);
        setIsFinished(false);
    };

    const changeDuration = (sec) => {
        setDuration(sec);
        setTimeLeft(sec);
        setClicks(0);
        setIsActive(false);
        setIsFinished(false);
    };

    const cps = duration > 0 ? (clicks / duration).toFixed(2) : 0;

    const getRank = (cps) => {
        if (cps >= 12) return { title: '⚡ 신의 손가락', color: 'text-purple-500' };
        if (cps >= 10) return { title: '🔥 프로게이머', color: 'text-red-500' };
        if (cps >= 8) return { title: '💎 다이아몬드', color: 'text-blue-500' };
        if (cps >= 6) return { title: '🥇 골드', color: 'text-yellow-500' };
        if (cps >= 4) return { title: '🥈 실버', color: 'text-gray-400' };
        return { title: '🥉 브론즈', color: 'text-amber-700' };
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 select-none">
            <SEO
                title="CPS 테스트 - 클릭 속도 측정"
                description="1초당 마우스 클릭 횟수(CPS)를 측정해보세요. 당신의 손가락 속도는 얼마나 빠를까요?"
                keywords={['cps', 'click test', '클릭 속도', '광클', '마우스 테스트']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <MousePointer2 className="w-8 h-8 text-blue-500" />
                    CPS 테스트
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    제한 시간 동안 최대한 빠르게 클릭하세요!
                </p>
            </div>

            {/* Duration Selector */}
            <div className="flex justify-center gap-2">
                {[1, 3, 5, 10, 30, 60].map((sec) => (
                    <button
                        key={sec}
                        onClick={() => changeDuration(sec)}
                        disabled={isActive}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${duration === sec
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        {sec}초
                    </button>
                ))}
            </div>

            <div className="card p-6 space-y-6">
                {isFinished ? (
                    <div className="text-center space-y-6 py-8">
                        <div className="space-y-2">
                            <div className="text-gray-500">최종 점수</div>
                            <div className="text-6xl font-bold text-gray-900 dark:text-white">
                                {cps} <span className="text-2xl text-gray-500">CPS</span>
                            </div>
                        </div>

                        <div className={`text-2xl font-bold ${getRank(cps).color} flex items-center justify-center gap-2`}>
                            <Trophy className="w-8 h-8" />
                            {getRank(cps).title}
                        </div>

                        <div className="text-gray-500">
                            총 {clicks}회 클릭 / {duration}초
                        </div>

                        <button
                            onClick={resetGame}
                            className="btn btn-primary btn-lg flex items-center gap-2 mx-auto"
                        >
                            <RefreshCw className="w-5 h-5" />
                            다시 시도
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center px-4 text-xl font-bold">
                            <div className="text-gray-500">
                                시간: <span className="text-gray-900 dark:text-white">{timeLeft.toFixed(1)}s</span>
                            </div>
                            <div className="text-gray-500">
                                클릭: <span className="text-blue-500">{clicks}</span>
                            </div>
                        </div>

                        <div
                            onMouseDown={handleClick}
                            className="relative h-64 bg-gray-50 dark:bg-gray-800 rounded-xl border-4 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer active:bg-gray-100 dark:active:bg-gray-700 transition-colors overflow-hidden"
                        >
                            {/* Ripple Effects */}
                            {ripples.map((ripple) => (
                                <span
                                    key={ripple.id}
                                    className="absolute rounded-full bg-blue-500/30 animate-ping pointer-events-none"
                                    style={{
                                        left: ripple.x,
                                        top: ripple.y,
                                        width: '20px',
                                        height: '20px',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                />
                            ))}

                            {!isActive && clicks === 0 ? (
                                <div className="text-center space-y-2 pointer-events-none">
                                    <Zap className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                    <div className="text-xl font-bold text-gray-600 dark:text-gray-300">
                                        여기를 클릭해서 시작하세요!
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        준비되셨나요?
                                    </div>
                                </div>
                            ) : (
                                <div className="text-6xl font-bold text-gray-900 dark:text-white pointer-events-none select-none">
                                    {(clicks / (duration - timeLeft)).toFixed(1)} <span className="text-2xl text-gray-400">CPS</span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CpsTest;
