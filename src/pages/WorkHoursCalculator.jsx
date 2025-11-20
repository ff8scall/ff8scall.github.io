import React, { useState } from 'react';
import { Clock, Calculator as CalcIcon } from 'lucide-react';
import SEO from '../components/SEO';

const WorkHoursCalculator = () => {
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('18:00');
    const [breakTime, setBreakTime] = useState(60);
    const [hourlyWage, setHourlyWage] = useState('');
    const [workDays, setWorkDays] = useState(20);

    const calculateHours = () => {
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);

        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;

        let totalMinutes = endMinutes - startMinutes;
        if (totalMinutes < 0) totalMinutes += 24 * 60; // 다음날로 넘어가는 경우

        totalMinutes -= breakTime;

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { hours, minutes, totalMinutes };
    };

    const { hours, minutes, totalMinutes } = calculateHours();
    const dailyWage = hourlyWage ? (totalMinutes / 60 * parseFloat(hourlyWage)) : 0;
    const monthlyWage = dailyWage * workDays;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <SEO
                title="근무 시간 계산기 - Utility Hub"
                description="출퇴근 시간을 입력하여 근무 시간과 월급을 계산하세요. 시급 계산, 일급 계산, 월급 계산을 한번에!"
                keywords="근무시간 계산, 월급 계산기, 시급 계산, 일급 계산, 근로시간"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Clock className="w-8 h-8 text-primary" />
                    근무 시간 계산기
                </h1>
                <p className="text-muted-foreground">
                    출퇴근 시간으로 근무 시간과 월급을 계산하세요
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">출근 시간</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">퇴근 시간</label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">휴게 시간 (분)</label>
                    <input
                        type="number"
                        value={breakTime}
                        onChange={(e) => setBreakTime(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">시급 (원)</label>
                        <input
                            type="number"
                            value={hourlyWage}
                            onChange={(e) => setHourlyWage(e.target.value)}
                            placeholder="예: 10000"
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">월 근무일수</label>
                        <input
                            type="number"
                            value={workDays}
                            onChange={(e) => setWorkDays(parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-border rounded-xl p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">일일 근무 시간</h3>
                    <p className="text-3xl font-bold text-primary">
                        {hours}시간 {minutes}분
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        총 {totalMinutes}분
                    </p>
                </div>

                {hourlyWage && (
                    <>
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-border rounded-xl p-6">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">일급</h3>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                                {dailyWage.toLocaleString('ko-KR')}원
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-border rounded-xl p-6 md:col-span-2">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">월급 (예상)</h3>
                            <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                                {monthlyWage.toLocaleString('ko-KR')}원
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                월 {workDays}일 근무 기준
                            </p>
                        </div>
                    </>
                )}
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>2024년 최저시급: 9,860원</li>
                    <li>주 40시간 근무 시 월 209시간 (주휴수당 포함)</li>
                    <li>야간 근무(22:00~06:00)는 통상임금의 50% 가산</li>
                    <li>주휴수당은 별도로 계산해야 합니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default WorkHoursCalculator;
