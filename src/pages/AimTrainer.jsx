import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { Crosshair, Play, RefreshCw, Target, Clock, Settings, History, Trash2 } from 'lucide-react';

const AimTrainer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [countDown, setCountDown] = useState(3);
    const [targets, setTargets] = useState([]);
    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [duration, setDuration] = useState(20); // Default 20s
    const [difficulty, setDifficulty] = useState('normal'); // easy, normal, hard
    const [timeLeft, setTimeLeft] = useState(20);
    const [avgTime, setAvgTime] = useState(0);
    const [history, setHistory] = useState([]);

    const containerRef = useRef(null);
    const lastClickTime = useRef(0);
    const reactionTimes = useRef([]);

    useEffect(() => {
        // Load history from localStorage
        const savedHistory = localStorage.getItem('aimTrainerHistory');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

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

    // Reset timer when duration changes
    useEffect(() => {
        if (!isPlaying && !isCountingDown) {
            setTimeLeft(duration);
        }
    }, [duration]);

    // Countdown Effect (Faster: 0.5s interval)
    useEffect(() => {
        let interval;
        if (isCountingDown && countDown > 0) {
            interval = setInterval(() => {
                setCountDown((prev) => prev - 1);
            }, 500); // Faster countdown
        } else if (isCountingDown && countDown === 0) {
            setIsCountingDown(false);
            realStartGame();
        }
        return () => clearInterval(interval);
    }, [isCountingDown, countDown]);

    const startCountdown = () => {
        setIsPlaying(false); // Ensure game is stopped
        setIsFinished(false);
        setIsCountingDown(true);
        setCountDown(3);
        setTargets([]); // Clear targets
    };

    const realStartGame = () => {
        setIsPlaying(true);
        setScore(0);
        setMisses(0);
        setTimeLeft(duration);
        setTargets([]);
        reactionTimes.current = [];
        lastClickTime.current = Date.now();
        spawnTarget();
    };

    const finishGame = () => {
        setIsPlaying(false);
        setIsFinished(true);

        let currentAvgTime = 0;
        // Calculate average reaction time
        if (reactionTimes.current.length > 0) {
            const sum = reactionTimes.current.reduce((a, b) => a + b, 0);
            currentAvgTime = Math.round(sum / reactionTimes.current.length);
            setAvgTime(currentAvgTime);
        } else {
            setAvgTime(0);
        }

        // Save to history
        const newRecord = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            score: score,
            accuracy: score + misses > 0 ? Math.round((score / (score + misses)) * 100) : 0,
            avgTime: currentAvgTime,
            difficulty: difficulty,
            duration: duration
        };

        const newHistory = [newRecord, ...history].slice(0, 50); // Keep last 50
        setHistory(newHistory);
        localStorage.setItem('aimTrainerHistory', JSON.stringify(newHistory));
    };

    const spawnTarget = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Determine size based on difficulty
        let minSize, maxSize;
        switch (difficulty) {
            case 'easy':
                minSize = 60;
                maxSize = 100;
                break;
            case 'hard':
                minSize = 20;
                maxSize = 50;
                break;
            case 'normal':
            default:
                minSize = 40;
                maxSize = 80;
                break;
        }

        const size = Math.random() * (maxSize - minSize) + minSize;
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

    const handleDurationChange = (sec) => {
        setDuration(sec);
    };

    const handleDifficultyChange = (diff) => {
        setDifficulty(diff);
    };

    const clearHistory = () => {
        if (window.confirm('기록을 모두 삭제하시겠습니까?')) {
            setHistory([]);
            localStorage.removeItem('aimTrainerHistory');
        }
    };

    const accuracy = score + misses > 0
        ? Math.round((score / (score + misses)) * 100)
        : 0;

    const getDifficultyLabel = (diff) => {
        switch (diff) {
            case 'easy': return '쉬움';
            case 'normal': return '보통';
            case 'hard': return '어려움';
            default: return diff;
        }
    };

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

            {/* Controls Bar (Always Visible) */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                <div className="flex flex-col gap-4">
                    {/* Duration Selector */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium w-20">
                            <Clock className="w-5 h-5" />
                            <span>시간:</span>
                        </div>
                        <div className="flex gap-2">
                            {[10, 20, 30].map((sec) => (
                                <button
                                    key={sec}
                                    onClick={() => handleDurationChange(sec)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${duration === sec
                                            ? 'bg-red-500 text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {sec}초
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Difficulty Selector */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium w-20">
                            <Settings className="w-5 h-5" />
                            <span>난이도:</span>
                        </div>
                        <div className="flex gap-2">
                            {[
                                { id: 'easy', label: '쉬움' },
                                { id: 'normal', label: '보통' },
                                { id: 'hard', label: '어려움' }
                            ].map((diff) => (
                                <button
                                    key={diff.id}
                                    onClick={() => handleDifficultyChange(diff.id)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${difficulty === diff.id
                                            ? 'bg-blue-500 text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {diff.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Start/Restart Button */}
                <button
                    onClick={startCountdown}
                    className={`h-full px-8 py-4 rounded-lg text-lg font-bold text-white shadow-md transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 ${isPlaying
                            ? 'bg-yellow-500 hover:bg-yellow-600'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isPlaying ? (
                        <>
                            <RefreshCw className="w-6 h-6" />
                            다시 시작
                        </>
                    ) : (
                        <>
                            <Play className="w-6 h-6" />
                            {isFinished ? '다시 하기' : '게임 시작'}
                        </>
                    )}
                </button>
            </div>

            <div className="card p-6 space-y-6">
                {/* Stats Bar */}
                <div className="grid grid-cols-4 gap-4 text-center text-sm md:text-base font-bold">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="text-gray-500 text-xs mb-1">남은 시간</div>
                        <div className={`text-xl ${timeLeft <= 5 && isPlaying ? 'text-red-500 animate-pulse' : ''}`}>{timeLeft}s</div>
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
                    {/* Initial Start Overlay (Only show if never played and not counting down) */}
                    {!isPlaying && !isFinished && !isCountingDown && score === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                            <div className="text-white text-xl font-bold animate-pulse">
                                상단의 '게임 시작' 버튼을 눌러주세요!
                            </div>
                        </div>
                    )}

                    {isCountingDown && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
                            <div className="text-9xl font-bold text-white animate-bounce">
                                {countDown > 0 ? countDown : ''}
                            </div>
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
                                onClick={(e) => { e.stopPropagation(); startCountdown(); }}
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

                {/* History Section */}
                {history.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <History className="w-5 h-5" />
                                최근 기록
                            </h3>
                            <button
                                onClick={clearHistory}
                                className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                            >
                                <Trash2 className="w-4 h-4" />
                                기록 초기화
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-4 py-3">시간</th>
                                        <th className="px-4 py-3">난이도</th>
                                        <th className="px-4 py-3">설정 시간</th>
                                        <th className="px-4 py-3">점수</th>
                                        <th className="px-4 py-3">정확도</th>
                                        <th className="px-4 py-3">평균 반응</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((record) => (
                                        <tr key={record.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-4 py-3">{record.date}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${record.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                                        record.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                                                            'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {getDifficultyLabel(record.difficulty)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">{record.duration}초</td>
                                            <td className="px-4 py-3 font-bold text-blue-600 dark:text-blue-400">{record.score}</td>
                                            <td className="px-4 py-3 text-green-600 dark:text-green-400">{record.accuracy}%</td>
                                            <td className="px-4 py-3 text-purple-600 dark:text-purple-400">{record.avgTime}ms</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AimTrainer;
