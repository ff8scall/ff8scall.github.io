import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { Timer, Play, Pause, RotateCcw, Coffee, Briefcase, Settings, Volume2, VolumeX, Vibrate, VibrateOff, History, Target, CheckCircle, X, Moon } from 'lucide-react';

const PomodoroTimer = () => {
    // --- State ---
    const [mode, setMode] = useState('work'); // 'work', 'break', 'longBreak'
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [sessions, setSessions] = useState(0); // Completed work sessions today

    // Settings (Persisted)
    const [customTimes, setCustomTimes] = useState(() => JSON.parse(localStorage.getItem('pomo_times') || '{"work": 25, "break": 5, "longBreak": 15}'));
    const [autoStart, setAutoStart] = useState(() => JSON.parse(localStorage.getItem('pomo_autoStart') || 'false'));
    const [goal, setGoal] = useState(() => JSON.parse(localStorage.getItem('pomo_goal') || '8'));
    const [soundEnabled, setSoundEnabled] = useState(() => JSON.parse(localStorage.getItem('pomo_sound') || 'true'));
    const [vibrationEnabled, setVibrationEnabled] = useState(() => JSON.parse(localStorage.getItem('pomo_vibration') || 'true'));

    // History (Persisted)
    const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('pomo_history') || '[]'));

    const [showSettings, setShowSettings] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const timerRef = useRef(null);
    const audioRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')); // Simple bell sound

    // --- Effects ---

    // Persist Settings
    useEffect(() => {
        localStorage.setItem('pomo_times', JSON.stringify(customTimes));
        localStorage.setItem('pomo_autoStart', JSON.stringify(autoStart));
        localStorage.setItem('pomo_goal', JSON.stringify(goal));
        localStorage.setItem('pomo_sound', JSON.stringify(soundEnabled));
        localStorage.setItem('pomo_vibration', JSON.stringify(vibrationEnabled));
        localStorage.setItem('pomo_history', JSON.stringify(history));
    }, [customTimes, autoStart, goal, soundEnabled, vibrationEnabled, history]);

    // Request Notification Permission
    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    // Timer Logic
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

    // --- Handlers ---

    const handleTimerComplete = () => {
        clearInterval(timerRef.current);
        setIsActive(false);

        // Sound & Vibration
        if (soundEnabled) {
            audioRef.current.play().catch(e => console.log('Audio play failed', e));
        }
        if (vibrationEnabled && navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }

        // Notification
        if (Notification.permission === 'granted') {
            const title = mode === 'work' ? '집중 시간 종료!' : '휴식 종료!';
            const body = mode === 'work'
                ? '수고하셨습니다! 잠시 휴식을 취하세요.'
                : '휴식이 끝났습니다. 다시 집중해볼까요?';
            new Notification(title, { body, icon: '/favicon.ico' });
        }

        // Log History (Only for work sessions)
        if (mode === 'work') {
            const newSession = {
                id: Date.now(),
                date: new Date().toISOString(),
                duration: customTimes.work
            };
            setHistory(prev => [newSession, ...prev]);
            setSessions(prev => prev + 1);
        }

        // Auto-cycle Logic
        if (autoStart) {
            let nextMode = 'work';
            if (mode === 'work') {
                // Suggest long break every 4 sessions
                if ((sessions + 1) % 4 === 0) {
                    nextMode = 'longBreak';
                } else {
                    nextMode = 'break';
                }
            }
            switchMode(nextMode);
            setIsActive(true);
        } else {
            // If not auto-start, just switch mode state but don't start
            // Actually, usually people want to click start for the next session
            // But let's verify if we should switch the UI to the next mode automatically
            if (mode === 'work') {
                if ((sessions + 1) % 4 === 0) {
                    switchMode('longBreak');
                } else {
                    switchMode('break');
                }
            } else {
                switchMode('work');
            }
        }
    };

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(customTimes[mode] * 60);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(customTimes[newMode] * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const updateCustomTime = (key, value) => {
        const numVal = parseInt(value) || 1;
        setCustomTimes(prev => ({ ...prev, [key]: numVal }));
        // If currently in that mode and not active, update display
        if (mode === key && !isActive) {
            setTimeLeft(numVal * 60);
        }
    };

    const clearHistory = () => {
        if (confirm('기록을 초기화하시겠습니까?')) {
            setHistory([]);
            setSessions(0);
        }
    };

    // Calculate progress for circle
    const totalTime = customTimes[mode] * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    // Get today's sessions
    const todaySessions = history.filter(h => new Date(h.date).toDateString() === new Date().toDateString()).length;

    return (
        <div className="max-w-lg mx-auto space-y-6 pb-12">
            <SEO
                title="포모도로 타이머 - Pomodoro Timer"
                description="집중력 향상을 위한 포모도로 타이머. 커스텀 시간 설정, 긴 휴식, 기록 관리 기능 제공."
                keywords={['포모도로', 'pomodoro', '타이머', '집중', '생산성', '공부']}
            />

            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
                    <Timer className="w-8 h-8 text-primary" />
                    포모도로 타이머
                </h1>
                <p className="text-muted-foreground text-sm">
                    25분 집중, 5분 휴식으로 생산성을 극대화하세요.
                </p>
            </div>

            <div className="card p-6 md:p-8 space-y-8 relative">
                {/* Top Controls (Settings, History) */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={() => setShowHistory(true)}
                        className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        title="기록"
                    >
                        <History className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowSettings(true)}
                        className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        title="설정"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>

                {/* Mode Switcher */}
                <div className="flex justify-center gap-2 bg-secondary/50 p-1.5 rounded-full w-fit mx-auto mt-4">
                    {[
                        { id: 'work', label: '집중', icon: Briefcase, color: 'text-red-500' },
                        { id: 'break', label: '휴식', icon: Coffee, color: 'text-green-500' },
                        { id: 'longBreak', label: '긴 휴식', icon: Moon, color: 'text-indigo-500' },
                    ].map((m) => (
                        <button
                            key={m.id}
                            onClick={() => switchMode(m.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${mode === m.id
                                ? `bg-background shadow-sm ${m.color}`
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <m.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{m.label}</span>
                        </button>
                    ))}
                </div>

                {/* Timer Display */}
                <div className="relative w-72 h-72 mx-auto flex items-center justify-center">
                    {/* Circular Progress */}
                    <svg className="absolute w-full h-full transform -rotate-90">
                        <circle
                            cx="144"
                            cy="144"
                            r="130"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-secondary"
                        />
                        <circle
                            cx="144"
                            cy="144"
                            r="130"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 130}
                            strokeDashoffset={2 * Math.PI * 130 * (1 - progress / 100)}
                            className={`transition-all duration-1000 ${mode === 'work' ? 'text-red-500' :
                                    mode === 'break' ? 'text-green-500' : 'text-indigo-500'
                                }`}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Time Text */}
                    <div className="text-7xl font-bold font-mono tracking-wider z-10 text-foreground">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-6">
                    <button
                        onClick={toggleTimer}
                        className={`btn btn-lg px-10 py-4 rounded-2xl flex items-center gap-3 text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all ${isActive
                            ? 'bg-amber-500 hover:bg-amber-600 text-white'
                            : 'btn-primary'
                            }`}
                    >
                        {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                        {isActive ? '일시정지' : '시작'}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="p-4 rounded-2xl border-2 border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        title="리셋"
                    >
                        <RotateCcw className="w-8 h-8" />
                    </button>
                </div>

                {/* Goal Progress */}
                <div className="flex items-center justify-center gap-8 pt-4 border-t border-border/50">
                    <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">오늘의 목표</div>
                        <div className="flex items-center gap-2 justify-center">
                            <Target className="w-4 h-4 text-primary" />
                            <span className="text-xl font-bold">{todaySessions} / {goal}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Settings className="w-5 h-5" /> 설정
                            </h2>
                            <button onClick={() => setShowSettings(false)} className="p-1 hover:bg-secondary rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Time Settings */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-muted-foreground">시간 설정 (분)</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs text-muted-foreground">집중</label>
                                        <input
                                            type="number"
                                            value={customTimes.work}
                                            onChange={(e) => updateCustomTime('work', e.target.value)}
                                            className="w-full p-2 rounded-lg border border-border bg-background text-center"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-muted-foreground">휴식</label>
                                        <input
                                            type="number"
                                            value={customTimes.break}
                                            onChange={(e) => updateCustomTime('break', e.target.value)}
                                            className="w-full p-2 rounded-lg border border-border bg-background text-center"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-muted-foreground">긴 휴식</label>
                                        <input
                                            type="number"
                                            value={customTimes.longBreak}
                                            onChange={(e) => updateCustomTime('longBreak', e.target.value)}
                                            className="w-full p-2 rounded-lg border border-border bg-background text-center"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Goal Setting */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">일일 목표 세션</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        value={goal}
                                        onChange={(e) => setGoal(parseInt(e.target.value))}
                                        className="flex-1"
                                    />
                                    <span className="font-bold w-8 text-center">{goal}</span>
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="space-y-3 pt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">자동으로 다음 단계 시작</span>
                                    <button
                                        onClick={() => setAutoStart(!autoStart)}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${autoStart ? 'bg-primary' : 'bg-secondary'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${autoStart ? 'translate-x-6' : ''}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm flex items-center gap-2">
                                        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                        소리 알림
                                    </span>
                                    <button
                                        onClick={() => setSoundEnabled(!soundEnabled)}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${soundEnabled ? 'bg-primary' : 'bg-secondary'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${soundEnabled ? 'translate-x-6' : ''}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm flex items-center gap-2">
                                        {vibrationEnabled ? <Vibrate className="w-4 h-4" /> : <VibrateOff className="w-4 h-4" />}
                                        진동 알림
                                    </span>
                                    <button
                                        onClick={() => setVibrationEnabled(!vibrationEnabled)}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${vibrationEnabled ? 'bg-primary' : 'bg-secondary'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${vibrationEnabled ? 'translate-x-6' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* History Modal */}
            {showHistory && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-6 max-h-[80vh] flex flex-col">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <History className="w-5 h-5" /> 기록
                            </h2>
                            <button onClick={() => setShowHistory(false)} className="p-1 hover:bg-secondary rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                            {history.length === 0 ? (
                                <div className="text-center text-muted-foreground py-8">
                                    아직 기록이 없습니다.<br />첫 번째 세션을 완료해보세요!
                                </div>
                            ) : (
                                history.map((session) => (
                                    <div key={session.id} className="flex justify-between items-center p-3 bg-secondary/30 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <div className="text-sm">
                                                <div className="font-medium">{new Date(session.date).toLocaleDateString()}</div>
                                                <div className="text-xs text-muted-foreground">{new Date(session.date).toLocaleTimeString()}</div>
                                            </div>
                                        </div>
                                        <div className="font-mono font-bold text-primary">
                                            {session.duration}분
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {history.length > 0 && (
                            <button
                                onClick={clearHistory}
                                className="w-full py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                                기록 초기화
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PomodoroTimer;
