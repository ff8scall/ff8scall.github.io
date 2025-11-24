import React, { useState } from 'react';
import { CheckCircle, XCircle, DollarSign, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import ShareButtons from '../components/ShareButtons';

const MinimumWageCalculator = () => {
    const [year, setYear] = useState('2025');
    const [hourlyRate, setHourlyRate] = useState('');
    const [workHours, setWorkHours] = useState(209); // 월 통상 근로시간 (주 40시간 기준)
    const [result, setResult] = useState(null);

    const MIN_WAGE = {
        '2024': 9860,
        '2025': 10030
    };

    const calculate = () => {
        if (!hourlyRate) return;

        const minWage = MIN_WAGE[year];
        const myRate = parseFloat(hourlyRate);
        const isPass = myRate >= minWage;
        const diff = myRate - minWage;

        // 월급 환산 (주휴수당 포함 월 209시간 기준)
        const monthlyMinWage = minWage * workHours;
        const myMonthlyWage = myRate * workHours;

        setResult({
            isPass,
            diff,
            minWage,
            monthlyMinWage,
            myMonthlyWage
        });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title="최저임금 계산기 - 2024/2025년 기준"
                description="내 시급이 최저임금을 준수하고 있는지 확인해보세요. 2025년 최저임금 10,030원 반영."
                keywords={['최저임금', '최저시급', '2025년 최저임금', 'minimum wage']}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-2">
                    <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">최저임금 계산기</h1>
                <p className="text-muted-foreground">
                    내 급여가 최저임금 기준에 맞는지 확인해보세요.
                </p>
            </header>

            <div className="card p-6 space-y-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">기준 연도</label>
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="input w-full"
                            >
                                <option value="2025">2025년 (10,030원)</option>
                                <option value="2024">2024년 (9,860원)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">월 근로시간 (주휴포함)</label>
                            <input
                                type="number"
                                value={workHours}
                                onChange={(e) => setWorkHours(e.target.value)}
                                className="input w-full"
                                placeholder="기본 209시간"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">나의 시급</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(e.target.value)}
                                placeholder="예: 11000"
                                className="input w-full pr-8"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">원</span>
                        </div>
                    </div>

                    <button
                        onClick={calculate}
                        className="btn btn-primary w-full py-4 text-lg font-bold"
                    >
                        확인하기
                    </button>
                </div>

                {result && (
                    <div className={`mt-6 p-6 rounded-xl border text-center space-y-4 animate-fade-in ${result.isPass ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            {result.isPass ? (
                                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                            ) : (
                                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                            )}
                            <h3 className={`text-2xl font-bold ${result.isPass ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {result.isPass ? '최저임금 준수' : '최저임금 미달'}
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="p-3 bg-card rounded-lg border border-border">
                                <span className="text-muted-foreground block mb-1">기준 시급 ({year})</span>
                                <span className="font-bold text-lg">{result.minWage.toLocaleString()}원</span>
                            </div>
                            <div className="p-3 bg-card rounded-lg border border-border">
                                <span className="text-muted-foreground block mb-1">나의 시급</span>
                                <span className={`font-bold text-lg ${result.isPass ? 'text-green-600' : 'text-red-600'}`}>
                                    {parseFloat(hourlyRate).toLocaleString()}원
                                </span>
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            {result.isPass ? (
                                <p>기준보다 <span className="font-bold text-green-600">+{result.diff.toLocaleString()}원</span> 더 받고 계시네요! 👏</p>
                            ) : (
                                <p>기준보다 <span className="font-bold text-red-600">{result.diff.toLocaleString()}원</span> 부족합니다.</p>
                            )}
                        </div>

                        <div className="pt-4 border-t border-border/50">
                            <h4 className="font-medium mb-2">월급 환산 (월 {workHours}시간 기준)</h4>
                            <div className="flex justify-between items-center bg-card p-3 rounded-lg border border-border">
                                <span className="text-muted-foreground">예상 월급</span>
                                <span className="font-bold text-xl">{Math.floor(result.myMonthlyWage).toLocaleString()}원</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 text-left">
                                * 2025년 최저임금 월급 환산액 (209시간 기준): <strong>{Math.floor(result.minWage * 209).toLocaleString()}원</strong>
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <ShareButtons />
        </div>
    );
};

export default MinimumWageCalculator;
