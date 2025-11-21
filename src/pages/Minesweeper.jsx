import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Bomb, Flag, RefreshCw, Trophy, AlertTriangle } from 'lucide-react';

const Minesweeper = () => {
    const [grid, setGrid] = useState([]);
    const [gameState, setGameState] = useState('waiting'); // waiting, playing, won, lost
    const [mineCount, setMineCount] = useState(10);
    const [flagCount, setFlagCount] = useState(0);
    const [difficulty, setDifficulty] = useState('beginner'); // beginner, intermediate, expert
    const [timer, setTimer] = useState(0);

    // Configuration
    const configs = {
        beginner: { rows: 9, cols: 9, mines: 10 },
        intermediate: { rows: 16, cols: 16, mines: 40 },
        expert: { rows: 16, cols: 30, mines: 99 }
    };

    useEffect(() => {
        initGame();
    }, [difficulty]);

    useEffect(() => {
        let interval;
        if (gameState === 'playing') {
            interval = setInterval(() => {
                setTimer(t => t + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameState]);

    const initGame = () => {
        const { rows, cols, mines } = configs[difficulty];
        const newGrid = [];
        for (let r = 0; r < rows; r++) {
            const row = [];
            for (let c = 0; c < cols; c++) {
                row.push({
                    row: r,
                    col: c,
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                });
            }
            newGrid.push(row);
        }
        setGrid(newGrid);
        setMineCount(mines);
        setFlagCount(0);
        setGameState('waiting');
        setTimer(0);
    };

    const placeMines = (firstRow, firstCol) => {
        const { rows, cols, mines } = configs[difficulty];
        const newGrid = [...grid];
        let minesPlaced = 0;

        while (minesPlaced < mines) {
            const r = Math.floor(Math.random() * rows);
            const c = Math.floor(Math.random() * cols);

            // Don't place mine on first click or neighbors
            if (!newGrid[r][c].isMine && (Math.abs(r - firstRow) > 1 || Math.abs(c - firstCol) > 1)) {
                newGrid[r][c].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate neighbors
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (!newGrid[r][c].isMine) {
                    let count = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if (r + i >= 0 && r + i < rows && c + j >= 0 && c + j < cols) {
                                if (newGrid[r + i][c + j].isMine) count++;
                            }
                        }
                    }
                    newGrid[r][c].neighborMines = count;
                }
            }
        }
        setGrid(newGrid);
    };

    const revealCell = (r, c) => {
        if (gameState === 'lost' || gameState === 'won') return;
        if (grid[r][c].isFlagged || grid[r][c].isRevealed) return;

        const newGrid = [...grid];

        if (gameState === 'waiting') {
            placeMines(r, c);
            setGameState('playing');
        }

        if (newGrid[r][c].isMine) {
            // Game Over
            newGrid[r][c].isRevealed = true;
            revealAllMines(newGrid);
            setGameState('lost');
            setGrid(newGrid);
            return;
        }

        const revealRecursive = (row, col) => {
            if (row < 0 || row >= configs[difficulty].rows || col < 0 || col >= configs[difficulty].cols) return;
            if (newGrid[row][col].isRevealed || newGrid[row][col].isFlagged) return;

            newGrid[row][col].isRevealed = true;

            if (newGrid[row][col].neighborMines === 0) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        revealRecursive(row + i, col + j);
                    }
                }
            }
        };

        revealRecursive(r, c);
        setGrid(newGrid);
        checkWin(newGrid);
    };

    const toggleFlag = (e, r, c) => {
        e.preventDefault();
        if (gameState === 'lost' || gameState === 'won') return;
        if (grid[r][c].isRevealed) return;

        const newGrid = [...grid];
        if (!newGrid[r][c].isFlagged && flagCount >= mineCount) return; // Limit flags

        newGrid[r][c].isFlagged = !newGrid[r][c].isFlagged;
        setGrid(newGrid);
        setFlagCount(prev => newGrid[r][c].isFlagged ? prev + 1 : prev - 1);
    };

    const revealAllMines = (currentGrid) => {
        currentGrid.forEach(row => {
            row.forEach(cell => {
                if (cell.isMine) cell.isRevealed = true;
            });
        });
    };

    const checkWin = (currentGrid) => {
        const { rows, cols, mines } = configs[difficulty];
        let revealedCount = 0;
        currentGrid.forEach(row => {
            row.forEach(cell => {
                if (cell.isRevealed) revealedCount++;
            });
        });

        if (revealedCount === (rows * cols - mines)) {
            setGameState('won');
            setFlagCount(mines); // Auto flag all mines
        }
    };

    const getCellColor = (count) => {
        const colors = [
            '', 'text-blue-500', 'text-green-500', 'text-red-500', 'text-purple-500',
            'text-yellow-600', 'text-pink-500', 'text-gray-700', 'text-gray-900'
        ];
        return colors[count] || '';
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 select-none">
            <SEO
                title="지뢰찾기 - 고전 명작 퍼즐"
                description="지뢰를 피해 모든 칸을 열어보세요! 논리적인 추리로 지뢰의 위치를 찾아내는 고전 명작 게임입니다."
                keywords={['지뢰찾기', 'minesweeper', '퍼즐', '두뇌게임', '고전게임']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Bomb className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                    지뢰찾기
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    지뢰를 피해 모든 안전한 칸을 찾아내세요!
                </p>
            </div>

            {/* Difficulty Selector */}
            <div className="flex justify-center gap-2">
                {['beginner', 'intermediate', 'expert'].map((diff) => (
                    <button
                        key={diff}
                        onClick={() => setDifficulty(diff)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${difficulty === diff
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        {diff}
                    </button>
                ))}
            </div>

            <div className="card p-6 inline-block min-w-full md:min-w-0 overflow-x-auto">
                <div className="flex flex-col items-center gap-4">
                    {/* Header */}
                    <div className="flex justify-between items-center w-full bg-gray-200 dark:bg-gray-700 p-3 rounded-lg border-b-4 border-gray-300 dark:border-gray-600">
                        <div className="font-mono text-2xl text-red-500 bg-black px-2 py-1 rounded">
                            {String(mineCount - flagCount).padStart(3, '0')}
                        </div>

                        <button
                            onClick={initGame}
                            className="btn btn-ghost p-2 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full"
                        >
                            {gameState === 'won' ? '😎' : gameState === 'lost' ? '😵' : '🙂'}
                        </button>

                        <div className="font-mono text-2xl text-red-500 bg-black px-2 py-1 rounded">
                            {String(Math.min(999, timer)).padStart(3, '0')}
                        </div>
                    </div>

                    {/* Grid */}
                    <div
                        className="bg-gray-300 dark:bg-gray-600 p-1 rounded select-none"
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {grid.map((row, r) => (
                            <div key={r} className="flex">
                                {row.map((cell, c) => (
                                    <div
                                        key={c}
                                        onClick={() => revealCell(r, c)}
                                        onContextMenu={(e) => toggleFlag(e, r, c)}
                                        className={`
                      w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-base md:text-lg font-bold cursor-pointer border
                      ${cell.isRevealed
                                                ? 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                                : 'bg-gray-200 dark:bg-gray-500 border-t-white border-l-white border-b-gray-400 border-r-gray-400 hover:bg-gray-100 dark:hover:bg-gray-400'
                                            }
                    `}
                                    >
                                        {cell.isRevealed ? (
                                            cell.isMine ? (
                                                <Bomb className="w-5 h-5 text-black dark:text-white fill-current" />
                                            ) : (
                                                <span className={getCellColor(cell.neighborMines)}>
                                                    {cell.neighborMines > 0 ? cell.neighborMines : ''}
                                                </span>
                                            )
                                        ) : cell.isFlagged ? (
                                            <Flag className="w-5 h-5 text-red-500 fill-current" />
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {gameState === 'won' && (
                <div className="text-center animate-bounce">
                    <div className="text-2xl font-bold text-green-500 mb-2">축하합니다! 성공하셨습니다! 🎉</div>
                    <div className="text-gray-500">기록: {timer}초</div>
                </div>
            )}

            <div className="text-center text-sm text-gray-500">
                <p>좌클릭: 칸 열기 / 우클릭: 깃발 꽂기</p>
                <p className="mt-1 text-xs text-gray-400">모바일에서는 길게 눌러서 깃발을 꽂을 수 있습니다 (브라우저 설정에 따라 다를 수 있음)</p>
            </div>
        </div>
    );
};

export default Minesweeper;
