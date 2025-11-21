import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { GitCommit, Play, Plus, RefreshCw, Trash2, Users } from 'lucide-react';

const LadderGame = () => {
    const [players, setPlayers] = useState(['A', 'B', 'C', 'D']);
    const [results, setResults] = useState(['1등', '2등', '3등', '꽝']);
    const [isPlaying, setIsPlaying] = useState(false);
    const [ladder, setLadder] = useState([]);
    const [currentPath, setCurrentPath] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    // Colors for each player path
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
        '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
    ];

    const generateLadder = () => {
        const count = players.length;
        const steps = 10; // Number of vertical steps
        const newLadder = [];

        for (let i = 0; i < steps; i++) {
            const row = Array(count - 1).fill(false);
            // Randomly place horizontal lines
            for (let j = 0; j < count - 1; j++) {
                // Ensure no adjacent horizontal lines and random chance
                if (Math.random() > 0.5 && (j === 0 || !row[j - 1])) {
                    row[j] = true;
                }
            }
            newLadder.push(row);
        }
        setLadder(newLadder);
        setIsPlaying(false);
        setCurrentPath([]);
        setSelectedPlayer(null);
    };

    useEffect(() => {
        generateLadder();
    }, [players.length]);

    useEffect(() => {
        drawLadder();
    }, [ladder, players, results, currentPath, selectedPlayer]);

    const drawLadder = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const count = players.length;
        const colWidth = width / count;
        const rowHeight = (height - 100) / ladder.length; // Reserve top/bottom for text
        const startY = 50;

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        // Draw vertical lines
        for (let i = 0; i < count; i++) {
            const x = colWidth * i + colWidth / 2;
            ctx.strokeStyle = '#ddd';
            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, height - 50);
            ctx.stroke();
        }

        // Draw horizontal lines
        ladder.forEach((row, r) => {
            const y = startY + (r + 1) * rowHeight - rowHeight / 2;
            row.forEach((hasLine, c) => {
                if (hasLine) {
                    const x1 = colWidth * c + colWidth / 2;
                    const x2 = colWidth * (c + 1) + colWidth / 2;
                    ctx.strokeStyle = '#ddd';
                    ctx.beginPath();
                    ctx.moveTo(x1, y);
                    ctx.lineTo(x2, y);
                    ctx.stroke();
                }
            });
        });

        // Draw current path if playing
        if (currentPath.length > 0 && selectedPlayer !== null) {
            ctx.strokeStyle = colors[selectedPlayer % colors.length];
            ctx.lineWidth = 4;
            ctx.beginPath();

            // Start point
            const startX = colWidth * selectedPlayer + colWidth / 2;
            ctx.moveTo(startX, startY);

            currentPath.forEach(point => {
                const x = colWidth * point.col + colWidth / 2;
                const y = startY + point.row * rowHeight + (point.type === 'vertical' ? 0 : rowHeight / 2); // Adjust y based on type
                // This is simplified drawing logic, actual path tracing needs precise coordinates
                // Let's just draw lines between points
                ctx.lineTo(x, y);
            });

            ctx.stroke();
        }
    };

    const startPath = (playerIndex) => {
        if (isPlaying) return;

        setSelectedPlayer(playerIndex);
        setIsPlaying(true);

        const path = [];
        let col = playerIndex;
        let row = 0;
        const count = players.length;
        const rowHeight = (canvasRef.current.height - 100) / ladder.length;
        const startY = 50;

        // Initial point
        path.push({ col, row: -0.5, type: 'start' }); // -0.5 to represent top area

        // Animation loop
        let currentRow = 0;
        let currentCol = playerIndex;

        const animate = () => {
            if (currentRow >= ladder.length) {
                // Finished
                path.push({ col: currentCol, row: ladder.length, type: 'end' });
                setCurrentPath([...path]);
                setIsPlaying(false);
                return;
            }

            // Check horizontal lines
            // Left
            if (currentCol > 0 && ladder[currentRow][currentCol - 1]) {
                path.push({ col: currentCol, row: currentRow, type: 'vertical' }); // Down to line
                path.push({ col: currentCol - 1, row: currentRow, type: 'horizontal' }); // Move left
                currentCol--;
            }
            // Right
            else if (currentCol < count - 1 && ladder[currentRow][currentCol]) {
                path.push({ col: currentCol, row: currentRow, type: 'vertical' }); // Down to line
                path.push({ col: currentCol + 1, row: currentRow, type: 'horizontal' }); // Move right
                currentCol++;
            }
            else {
                // Just go down
                path.push({ col: currentCol, row: currentRow, type: 'vertical' });
            }

            currentRow++;
            setCurrentPath([...path]);

            // Continue animation
            animationRef.current = requestAnimationFrame(() => {
                // Slow down animation for visibility - actually let's just compute full path and animate drawing?
                // For simplicity in this version, we'll just compute full path instantly and let user trace with eye or implement simple delay
                // Let's do instant for now to ensure correctness, maybe add delay later
                animate();
            });
        };

        // Actually, let's pre-calculate the full path and then animate drawing it
        const fullPath = [];
        let c = playerIndex;

        // Start top
        fullPath.push({ x: c, y: 0 });

        for (let r = 0; r < ladder.length; r++) {
            // Move down half step
            fullPath.push({ x: c, y: r + 0.5 });

            if (c > 0 && ladder[r][c - 1]) {
                // Move left
                c--;
                fullPath.push({ x: c, y: r + 0.5 });
            } else if (c < count - 1 && ladder[r][c]) {
                // Move right
                c++;
                fullPath.push({ x: c, y: r + 0.5 });
            }

            // Move down half step (end of row)
            fullPath.push({ x: c, y: r + 1 });
        }

        // Animate drawing
        let step = 0;
        const drawStep = () => {
            if (step < fullPath.length) {
                // Map logical coordinates to canvas coordinates for drawing
                const canvas = canvasRef.current;
                const width = canvas.width;
                const height = canvas.height;
                const colWidth = width / count;
                const rowHeight = (height - 100) / ladder.length;
                const startY = 50;

                const ctx = canvas.getContext('2d');
                ctx.strokeStyle = colors[playerIndex % colors.length];
                ctx.lineWidth = 4;
                ctx.beginPath();

                const prev = fullPath[Math.max(0, step - 1)];
                const curr = fullPath[step];

                const getX = (c) => colWidth * c + colWidth / 2;
                const getY = (r) => startY + r * rowHeight;

                if (step === 0) {
                    ctx.moveTo(getX(curr.x), 50); // Start top
                } else {
                    ctx.moveTo(getX(prev.x), getY(prev.y));
                    ctx.lineTo(getX(curr.x), getY(curr.y));
                }
                ctx.stroke();

                step++;
                animationRef.current = requestAnimationFrame(drawStep);
            } else {
                setIsPlaying(false);
            }
        };

        // Clear previous path first
        drawLadder();
        drawStep();
    };

    const updatePlayer = (idx, value) => {
        const newPlayers = [...players];
        newPlayers[idx] = value;
        setPlayers(newPlayers);
    };

    const updateResult = (idx, value) => {
        const newResults = [...results];
        newResults[idx] = value;
        setResults(newResults);
    };

    const addMember = () => {
        if (players.length < 8) {
            setPlayers([...players, String.fromCharCode(65 + players.length)]);
            setResults([...results, '꽝']);
        }
    };

    const removeMember = () => {
        if (players.length > 2) {
            setPlayers(players.slice(0, -1));
            setResults(results.slice(0, -1));
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 select-none">
            <SEO
                title="사다리 타기 - 랜덤 매칭 게임"
                description="참가자와 벌칙을 입력하고 사다리를 타보세요! 간식 내기, 당번 정하기에 딱 좋은 사다리 게임입니다."
                keywords={['사다리', 'ladder', 'game', '내기', '복불복', 'random']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <GitCommit className="w-8 h-8 text-green-500 rotate-90" />
                    사다리 타기
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    참가자와 결과를 입력하고 이름을 클릭해서 사다리를 타보세요!
                </p>
            </div>

            <div className="card p-6 space-y-6">
                {/* Controls */}
                <div className="flex justify-center gap-4">
                    <button onClick={addMember} className="btn btn-secondary btn-sm" disabled={players.length >= 8}>
                        <Plus className="w-4 h-4 mr-1" /> 인원 추가
                    </button>
                    <button onClick={removeMember} className="btn btn-secondary btn-sm" disabled={players.length <= 2}>
                        <Trash2 className="w-4 h-4 mr-1" /> 인원 제거
                    </button>
                    <button onClick={generateLadder} className="btn btn-primary btn-sm">
                        <RefreshCw className="w-4 h-4 mr-1" /> 사다리 재생성
                    </button>
                </div>

                {/* Game Area */}
                <div className="relative overflow-x-auto">
                    <div className="min-w-[600px] flex flex-col">
                        {/* Top Inputs (Players) */}
                        <div className="flex justify-around mb-2">
                            {players.map((player, idx) => (
                                <input
                                    key={`p-${idx}`}
                                    type="text"
                                    value={player}
                                    onChange={(e) => updatePlayer(idx, e.target.value)}
                                    className="input w-20 text-center text-sm p-1"
                                    placeholder={`참가자 ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Start Buttons */}
                        <div className="flex justify-around mb-0">
                            {players.map((_, idx) => (
                                <button
                                    key={`btn-${idx}`}
                                    onClick={() => startPath(idx)}
                                    disabled={isPlaying}
                                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-transform hover:scale-110
                    ${isPlaying ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                                    style={{ backgroundColor: colors[idx % colors.length] }}
                                >
                                    ▼
                                </button>
                            ))}
                        </div>

                        {/* Canvas */}
                        <canvas
                            ref={canvasRef}
                            width={800}
                            height={400}
                            className="w-full h-[300px] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-2"
                        />

                        {/* Bottom Inputs (Results) */}
                        <div className="flex justify-around mt-2">
                            {results.map((result, idx) => (
                                <input
                                    key={`r-${idx}`}
                                    type="text"
                                    value={result}
                                    onChange={(e) => updateResult(idx, e.target.value)}
                                    className="input w-20 text-center text-sm p-1"
                                    placeholder={`결과 ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LadderGame;
