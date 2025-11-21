import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { Target, RefreshCw, History, AlertCircle, Settings } from 'lucide-react';

const NumberBaseball = () => {
    const [digitCount, setDigitCount] = useState(3); // 3 or 4
    const [targetNumber, setTargetNumber] = useState('');
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState([]);
    const [gameState, setGameState] = useState('playing'); // playing, won, lost
    const [attempts, setAttempts] = useState(0);
    const [maxAttempts] = useState(10);
    const inputRef = useRef(null);

    useEffect(() => {
        startNewGame();
    }, [digitCount]);

    const generateNumber = () => {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const result = [];

        for (let i = 0; i < digitCount; i++) {
            const index = Math.floor(Math.random() * numbers.length);
            result.push(numbers[index]);
            numbers.splice(index, 1);
        }

        return result.join('');
    };

    const startNewGame = () => {
        setTargetNumber(generateNumber());
        setLogs([]);
        setGameState('playing');
        setAttempts(0);
        setInput('');
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (gameState !== 'playing') return;

        if (input.length !== digitCount) {
            alert(`${digitCount}자리 숫자를 입력해주세요.`);
            return;
        }

        // Check for duplicate digits
        if (new Set(input).size !== digitCount) {
            alert('중복되지 않는 숫자를 입력해주세요.');
            return;
        }

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        let strikes = 0;
        let balls = 0;

        for (let i = 0; i < digitCount; i++) {
            if (input[i] === targetNumber[i]) {
                strikes++;
            } else if (targetNumber.includes(input[i])) {
                balls++;
            }
        }

        const result = {
            attempt: newAttempts,
            guess: input,
            strikes,
            balls
        };

        setLogs([result, ...logs]);
        setInput('');

        if (strikes === digitCount) {
            setGameState('won');
        } else if (newAttempts >= maxAttempts) {
            setGameState('lost');
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= digitCount) {
            setInput(value);
        }
    };

    const toggleDigitCount = (count) => {
        if (count === digitCount) return;
        if (window.confirm('난이도를 변경하면 현재 게임이 초기화됩니다. 계속하시겠습니까?')) {
            setDigitCount(count);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="숫자 야구 게임 - 추억의 두뇌 게임"
                description="컴퓨터가 생각한 숫자를 맞춰보세요! 3자리 또는 4자리 모드를 선택할 수 있습니다."
                keywords={['숫자야구', 'number baseball', 'bulls and cows', '두뇌게임', '추리']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Target className="w-8 h-8 text-green-500" />
                    숫자 야구
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    0~9 사이의 서로 다른 숫자를 맞춰보세요.
                </p>
            </div>

            {/* Difficulty Selector */}
            <div className="flex justify-center gap-2">
                <button
                    onClick={() => toggleDigitCount(3)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${digitCount === 3
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                >
                    3자리 (보통)
                </button>
                <button
                    onClick={() => toggleDigitCount(4)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${digitCount === 4
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                >
                    4자리 (어려움)
                </button>
            </div>

            <div className="card p-6 space-y-6">
                {/* Game Status */}
                <div className="flex justify-between items-center px-4">
                    <div className="text-lg font-bold">
                        시도: <span className={`${attempts >= maxAttempts - 2 ? 'text-red-500' : 'text-blue-500'}`}>
                            {attempts}
                        </span> / {maxAttempts}
                    </div>
                    <button
                        onClick={startNewGame}
                        className="btn btn-ghost btn-sm flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        새 게임
                    </button>
                </div>

                {/* Input Area */}
                <div className="flex flex-col items-center space-y-4">
                    {gameState === 'playing' ? (
                        <form onSubmit={handleSubmit} className="w-full max-w-xs flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                inputMode="numeric"
                                value={input}
                                onChange={handleInputChange}
                                className="input text-center text-2xl tracking-widest font-mono"
                                placeholder={digitCount === 3 ? "123" : "1234"}
                                disabled={gameState !== 'playing'}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={input.length !== digitCount}
                            >
                                던지기!
                            </button>
                        </form>
                    ) : (
                        <div className={`text-center p-6 rounded-xl w-full ${gameState === 'won' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                            }`}>
                            <div className="text-2xl font-bold mb-2">
                                {gameState === 'won' ? '🎉 홈런! 정답입니다!' : '😭 아웃! 게임 오버'}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                                정답은 <span className="text-xl font-bold font-mono text-gray-900 dark:text-white mx-1">{targetNumber}</span> 였습니다.
                            </div>
                            <button onClick={startNewGame} className="btn btn-primary mt-4">
                                다시 도전하기
                            </button>
                        </div>
                    )}
                </div>

                {/* Logs */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 px-2">
                        <History className="w-4 h-4" />
                        기록
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 min-h-[300px] max-h-[400px] overflow-y-auto space-y-2">
                        {logs.length === 0 ? (
                            <div className="text-center text-gray-400 py-12">
                                숫자를 입력해서 게임을 시작하세요!
                            </div>
                        ) : (
                            logs.map((log, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm animate-fade-in">
                                    <div className="flex items-center gap-4">
                                        <span className="text-gray-400 font-mono w-6">#{log.attempt}</span>
                                        <span className="text-xl font-bold font-mono tracking-widest">{log.guess}</span>
                                    </div>
                                    <div className="flex gap-2 font-bold">
                                        {log.strikes > 0 && (
                                            <span className="text-green-500">{log.strikes}S</span>
                                        )}
                                        {log.balls > 0 && (
                                            <span className="text-blue-500">{log.balls}B</span>
                                        )}
                                        {log.strikes === 0 && log.balls === 0 && (
                                            <span className="text-red-500">OUT</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-sm text-blue-800 dark:text-blue-200 space-y-2">
                <div className="flex items-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4" />
                    게임 규칙
                </div>
                <ul className="list-disc list-inside space-y-1 ml-1">
                    <li><span className="font-bold text-green-600 dark:text-green-400">스트라이크(S)</span>: 숫자와 위치가 모두 맞음</li>
                    <li><span className="font-bold text-blue-600 dark:text-blue-400">볼(B)</span>: 숫자는 맞지만 위치가 다름</li>
                    <li><span className="font-bold text-red-600 dark:text-red-400">아웃(OUT)</span>: 맞는 숫자가 하나도 없음</li>
                    <li>10번의 기회 안에 {digitCount}자리 숫자를 맞춰야 합니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default NumberBaseball;
