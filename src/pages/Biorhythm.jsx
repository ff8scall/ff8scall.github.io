import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { Activity, Calendar, Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const Biorhythm = () => {
    const [birthDate, setBirthDate] = useState('');
    const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
    const [bioData, setBioData] = useState(null);
    const canvasRef = useRef(null);

    const calculateBiorhythm = () => {
        if (!birthDate || !targetDate) return;

        const birth = new Date(birthDate);
        const target = new Date(targetDate);

        // Calculate days lived
        const diffTime = Math.abs(target - birth);
        const daysLived = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Cycles: Physical 23, Emotional 28, Intellectual 33
        const physical = Math.sin((2 * Math.PI * daysLived) / 23) * 100;
        const emotional = Math.sin((2 * Math.PI * daysLived) / 28) * 100;
        const intellectual = Math.sin((2 * Math.PI * daysLived) / 33) * 100;

        setBioData({
            physical,
            emotional,
            intellectual,
            daysLived
        });

        // Draw chart after state update
        setTimeout(() => {
            if (canvasRef.current) {
                drawChart(birth, target);
            }
        }, 10);
    };

    useEffect(() => {
        calculateBiorhythm();
    }, [birthDate, targetDate]);

    const drawChart = (birth, target) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerY = height / 2;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = '#e5e7eb'; // gray-200
        ctx.lineWidth = 1;

        // Center line (0%)
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();

        // Target date line (Center vertical)
        ctx.strokeStyle = '#9ca3af'; // gray-400
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw curves
        const daysRange = 15; // +/- 15 days
        const pixelsPerDay = width / (daysRange * 2);

        const drawWave = (cycle, color) => {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;

            for (let i = -daysRange; i <= daysRange; i++) {
                const dayOffset = i;
                const currentTarget = new Date(target);
                currentTarget.setDate(target.getDate() + dayOffset);

                const diffTime = Math.abs(currentTarget - birth);
                const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                const value = Math.sin((2 * Math.PI * days) / cycle);
                const x = (width / 2) + (dayOffset * pixelsPerDay);
                const y = centerY - (value * (height / 2 - 20)); // Scale to fit height with padding

                if (i === -daysRange) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        };

        drawWave(23, '#22c55e'); // Green (Physical)
        drawWave(28, '#ef4444'); // Red (Emotional)
        drawWave(33, '#3b82f6'); // Blue (Intellectual)
    };

    const getStatus = (value) => {
        if (value > 80) return { label: '최고조', icon: TrendingUp, color: 'text-green-600 bg-green-100' };
        if (value > 20) return { label: '고조기', icon: TrendingUp, color: 'text-blue-600 bg-blue-100' };
        if (value < -80) return { label: '최저조', icon: TrendingDown, color: 'text-red-600 bg-red-100' };
        if (value < -20) return { label: '저조기', icon: TrendingDown, color: 'text-orange-600 bg-orange-100' };
        return { label: '전환기', icon: Minus, color: 'text-gray-600 bg-gray-100' }; // Near 0
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title="무료 바이오리듬 계산기 - 신체, 감성, 지성 리듬 | Utility Hub"
                description="생년월일만 입력하면 오늘의 신체, 감성, 지성 바이오리듬을 무료로 확인할 수 있습니다. 나의 컨디션 흐름을 그래프로 확인해보세요."
                keywords="바이오리듬, 신체리듬, 감성리듬, 지성리듬, 무료바이오리듬, 컨디션체크, 바이오리듬계산기"
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-2">
                    <Activity className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">바이오리듬</h1>
                <p className="text-muted-foreground">
                    나의 신체, 감성, 지성 리듬을 확인하고 하루를 계획해보세요.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 입력 폼 */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            날짜 입력
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">생년월일</label>
                                <input
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className="w-full p-2 border border-border rounded-lg bg-background"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">기준일</label>
                                <input
                                    type="date"
                                    value={targetDate}
                                    onChange={(e) => setTargetDate(e.target.value)}
                                    className="w-full p-2 border border-border rounded-lg bg-background"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 범례 */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5" />
                            범례
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                <span className="text-sm">신체 (23일 주기) - 체력, 건강</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                <span className="text-sm">감성 (28일 주기) - 기분, 신경</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                <span className="text-sm">지성 (33일 주기) - 두뇌, 집중력</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 결과 및 차트 */}
                <div className="md:col-span-2 space-y-6">
                    {bioData ? (
                        <>
                            {/* 오늘의 상태 카드 */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { label: '신체', value: bioData.physical, color: 'text-green-600', bg: 'bg-green-50' },
                                    { label: '감성', value: bioData.emotional, color: 'text-red-600', bg: 'bg-red-50' },
                                    { label: '지성', value: bioData.intellectual, color: 'text-blue-600', bg: 'bg-blue-50' }
                                ].map((item) => {
                                    const status = getStatus(item.value);
                                    const StatusIcon = status.icon;
                                    return (
                                        <div key={item.label} className={`rounded-xl p-4 border text-center ${item.bg} dark:bg-opacity-10`}>
                                            <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                                            <div className={`text-2xl font-bold mb-1 ${item.color}`}>
                                                {Math.round(item.value)}%
                                            </div>
                                            <div className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${status.color}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {status.label}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* 그래프 */}
                            <div className="bg-card border border-border rounded-xl p-6 shadow-sm overflow-hidden">
                                <h3 className="font-bold text-lg mb-4 text-center">바이오리듬 그래프 (±15일)</h3>
                                <div className="relative w-full overflow-x-auto">
                                    <canvas
                                        ref={canvasRef}
                                        width={600}
                                        height={300}
                                        className="w-full h-auto min-w-[500px]"
                                    />
                                </div>
                                <p className="text-center text-xs text-muted-foreground mt-2">
                                    가운데 점선이 기준일({targetDate})입니다.
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center bg-muted/30 rounded-xl border border-dashed border-border p-12 text-center">
                            <Activity className="w-16 h-16 text-muted-foreground/50 mb-4" />
                            <h3 className="text-xl font-bold text-muted-foreground">생년월일을 입력해주세요</h3>
                            <p className="text-muted-foreground/80">
                                좌측에서 생년월일을 선택하면<br />나의 바이오리듬이 분석됩니다.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <ShareButtons
                    title="무료 바이오리듬 계산기"
                    description="오늘 나의 신체, 감성, 지성 리듬은 어떨까요? 무료로 확인해보세요!"
                />
            </div>
        </div>
    );
};

export default Biorhythm;
