import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { Crosshair, Play, RefreshCw, Target } from 'lucide-react';

const AimTrainer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [targets, setTargets] = useState([]);
    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [avgTime, setAvgTime] = useState(0);

    const containerRef = useRef(null);
    const lastClickTime = useRef(0);
    const reactionTimes = useRef([]);

    useEffect(() => {
        let interval;
        if (isPlaying && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isPlaying) {
            finishGame();
        }
        return () => clearInterval(interval);
    }, [isPlaying, timeLeft]);

    const startGame = () => {
        setIsPlaying(true);
        setIsFinished(false);
        setScore(0);
        setMisses(0);
        setTimeLeft(30);
        setTargets([]);
        reactionTimes.current = [];
        lastClickTime.current = Date.now();
        spawnTarget();
    };

    const finishGame = () => {
        setIsPlaying(false);
        setIsFinished(true);

        // Calculate average reaction time
        if (reactionTimes.current.length > 0) {
            const sum = reactionTimes.current.reduce((a, b) => a + b, 0);
            setAvgTime(Math.round(sum / reactionTimes.current.length));
        } else {
            setAvgTime(0);
        }
    };

    const spawnTarget = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const size = Math.random() * 40 + 40; // 40px to 80px
        const x = Math.random() * (container.clientWidth - size);
        const y = Math.random() * (container.clientHeight - size);

        const newTarget = {
            id: Date.now(),
            x,
            y,
            size,
            createdAt: Date.now()
        };

        setTargets([newTarget]);
    };

    const handleTargetClick = (e, id) => {
        e.stopPropagation();
        const now = Date.now();
        const reaction = now - lastClickTime.current;
        reactionTimes.current.push(reaction);
        lastClickTime.current = now;

        setScore(prev => prev + 1);
        spawnTarget();
    };

    const handleMiss = () => {
        if (isPlaying) {
            setMisses(prev => prev + 1);
            setScore(prev => Math.max(0, prev - 1)); // Penalty
        }
    };

    const accuracy = score + misses > 0
        ? Math.round((score / (score + misses)) * 100)
        : 0;

    return (
        <div className="max-w-4xl mx-auto space-y-6 select-none">
            <SEO
                title="에임 트레이너 - 마우스 정확도 연습"
                description="움직이는 타겟을 빠르고 정확하게 클릭하여 에임 실력을 향상시키세요. FPS 게이머를 위한 필수 연습 도구입니다."
                keywords={['에임', 'aim', 'fps', '정확도', '마우스 연습', 'trainer']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Crosshair className="w-8 h-8 text-red-500" />
                    에임 트레이너
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    타겟을 빠르고 정확하게 클릭하세요! (빗나가면 감점)
                </p>
            </div>

            <div className="card p-6 space-y-6">
                {/* Stats Bar */}
                <div className="grid grid-cols-4 gap-4 text-center text-sm md:text-base font-bold">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="text-gray-500 text-xs mb-1">남은 시간</div>
                        <div className="text-xl">{timeLeft}s</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="text-gray-500 text-xs mb-1">점수</div>
                        <div className="text-xl text-blue-500">{score}</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="text-gray-500 text-xs mb-1">정확도</div>
                        <div className="text-xl text-green-500">{accuracy}%</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="text-gray-500 text-xs mb-1">평균 반응</div>
                        <div className="text-xl text-purple-500">{avgTime || '-'}ms</div>
                    </div>
                </div>

                {/* Game Area */}
                <div
                    ref={containerRef}
                    onMouseDown={handleMiss}
                    className="relative h-[400px] bg-gray-900 rounded-xl overflow-hidden cursor-crosshair touch-none"
                >
                    {!isPlaying && !isFinished && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                            <button
                                onClick={(e) => { e.stopPropagation(); startGame(); }}
                                className="btn btn-primary btn-lg text-2xl px-12 py-4 animate-pulse flex items-center gap-3"
                            >
                                <Play className="w-8 h-8" />
                                게임 시작
                            </button>
                        </div>
                    )}

                    {isFinished && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 text-white space-y-6">
                            <div className="text-4xl font-bold">Game Over!</div>
                            <div className="grid grid-cols-2 gap-8 text-center">
                                <div>
                                    <div className="text-gray-400 text-sm">최종 점수</div>
                                    <div className="text-5xl font-bold text-blue-400">{score}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm">정확도</div>
                                    <div className="text-5xl font-bold text-green-400">{accuracy}%</div>
                                </div>
                            </div>
                            <div className="text-xl text-gray-300">
                                평균 반응 속도: <span className="text-purple-400 font-bold">{avgTime}ms</span>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); startGame(); }}
                                className="btn btn-primary btn-lg flex items-center gap-2 mt-4"
                            >
                                <RefreshCw className="w-6 h-6" />
                                다시 도전
                            </button>
                        </div>
                    )}

                    {isPlaying && targets.map(target => (
                        <div
                            key={target.id}
                            onMouseDown={(e) => handleTargetClick(e, target.id)}
                            className="absolute rounded-full bg-red-500 border-4 border-white shadow-lg flex items-center justify-center transform transition-transform active:scale-90 hover:scale-105"
                            style={{
                                left: target.x,
                                top: target.y,
                                width: target.size,
                                height: target.size,
                            }}
                        >
                            <div className="w-2/3 h-2/3 rounded-full bg-white flex items-center justify-center">
                                <div className="w-2/3 h-2/3 rounded-full bg-red-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AimTrainer;
