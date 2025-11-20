import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { format, addDays, subDays, differenceInDays, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import SEO from '../components/SEO';

const DateCalculator = () => {
    const [activeTab, setActiveTab] = useState('dday'); // 'dday' or 'calc'

    // D-Day State
    const [targetDate, setTargetDate] = useState('');
    const [dDayResult, setDDayResult] = useState(null);

    // Date Calc State
    const [startDate, setStartDate] = useState('');
    const [daysToCalc, setDaysToCalc] = useState('');
    const [calcType, setCalcType] = useState('add'); // 'add' or 'sub'
    const [calcResult, setCalcResult] = useState(null);

    // Calculate D-Day
    const calculateDDay = () => {
        if (!targetDate) return;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = parseISO(targetDate);
        target.setHours(0, 0, 0, 0);

        const diff = differenceInDays(target, today);
        setDDayResult(diff);
    };

    // Calculate Date (Add/Sub)
    const calculateDate = () => {
        if (!startDate || !daysToCalc) return;
        const start = parseISO(startDate);
        const days = parseInt(daysToCalc, 10);

        let result;
        if (calcType === 'add') {
            result = addDays(start, days);
        } else {
            result = subDays(start, days);
        }
        setCalcResult(result);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <SEO
                title="D-Day 및 날짜 계산기"
                description="기념일, 시험일 등 중요한 날짜까지 남은 시간이나 지난 시간을 계산하세요."
                keywords="D-Day 계산, 날짜 계산, 기념일 계산, 날짜 더하기, 날짜 빼기"
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-3">
                    <Calendar className="w-8 h-8 text-primary" />
                    D-Day 및 날짜 계산기
                </h1>
                <p className="text-text-secondary">
                    중요한 날까지 남은 날짜를 확인하거나, 특정 날짜를 계산해보세요.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('dday')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'dday'
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'bg-bg-card text-text-secondary hover:bg-bg-card-hover'
                        }`}
                >
                    D-Day 계산
                </button>
                <button
                    onClick={() => setActiveTab('calc')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'calc'
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'bg-bg-card text-text-secondary hover:bg-bg-card-hover'
                        }`}
                >
                    날짜 더하기/빼기
                </button>
            </div>

            <div className="card p-8 min-h-[400px] flex flex-col justify-center">
                {activeTab === 'dday' ? (
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-secondary">목표 날짜 선택</label>
                            <input
                                type="date"
                                value={targetDate}
                                onChange={(e) => {
                                    setTargetDate(e.target.value);
                                }}
                                className="input text-lg"
                            />
                        </div>

                        <button
                            onClick={calculateDDay}
                            className="btn btn-primary w-full"
                        >
                            계산하기
                        </button>

                        {dDayResult !== null && (
                            <div className="text-center space-y-2 pt-8 border-t border-border-color">
                                <p className="text-text-secondary">
                                    {targetDate} 까지
                                </p>
                                <div className="text-5xl font-bold text-primary">
                                    {dDayResult === 0 ? 'D-Day' : dDayResult > 0 ? `D-${dDayResult}` : `D+${Math.abs(dDayResult)}`}
                                </div>
                                <p className="text-sm text-text-tertiary">
                                    {dDayResult > 0 ? `${dDayResult}일 남았습니다.` : dDayResult < 0 ? `${Math.abs(dDayResult)}일 지났습니다.` : '오늘입니다!'}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-text-secondary">기준 날짜</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="input"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-text-secondary">계산할 일수</label>
                                <input
                                    type="number"
                                    value={daysToCalc}
                                    onChange={(e) => setDaysToCalc(e.target.value)}
                                    placeholder="예: 100"
                                    className="input"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setCalcType('add')}
                                className={`flex-1 py-3 rounded-xl border transition-all ${calcType === 'add'
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-border-color hover:border-primary/50'
                                    }`}
                            >
                                더하기 (+)
                            </button>
                            <button
                                onClick={() => setCalcType('sub')}
                                className={`flex-1 py-3 rounded-xl border transition-all ${calcType === 'sub'
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-border-color hover:border-primary/50'
                                    }`}
                            >
                                빼기 (-)
                            </button>
                        </div>

                        <button
                            onClick={calculateDate}
                            className="btn btn-primary w-full"
                        >
                            계산하기
                        </button>

                        {calcResult && (
                            <div className="text-center pt-8 border-t border-border-color">
                                <p className="text-text-secondary mb-2">계산 결과</p>
                                <div className="text-3xl font-bold text-primary">
                                    {format(calcResult, 'yyyy년 M월 d일 (EEE)', { locale: ko })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DateCalculator;
