import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';

const CompoundInterestCalculator = () => {
    const [principal, setPrincipal] = useState('10000000');
    const [rate, setRate] = useState('5');
    const [years, setYears] = useState('10');
    const [compound, setCompound] = useState('12'); // 월복리

    const calculate = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(years);
        const n = parseFloat(compound);

        if (!p || !r || !t || !n) return null;

        // 복리 공식: A = P(1 + r/n)^(nt)
        const amount = p * Math.pow((1 + r / n), n * t);
        const interest = amount - p;

        // 단리 계산 (비교용)
        const simpleInterest = p * r * t;
        const simpleAmount = p + simpleInterest;

        return {
            finalAmount: amount,
            totalInterest: interest,
            simpleAmount,
            simpleInterest,
            difference: amount - simpleAmount
        };
    };

    const result = calculate();

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="복리 계산기 - Utility Hub"
                description="복리 이자를 계산하세요. 원금, 이율, 기간을 입력하면 복리로 불어난 금액을 확인할 수 있습니다."
                keywords="복리 계산기, 복리 이자, 투자 계산, 복리 마법, 이자 계산"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    복리 계산기
                </h1>
                <p className="text-muted-foreground">
                    복리의 마법을 경험하세요
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">원금 (원)</label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">연 이율 (%)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">기간 (년)</label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">복리 주기</label>
                    <select
                        value={compound}
                        onChange={(e) => setCompound(e.target.value)}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                        <option value="1">연 1회</option>
                        <option value="2">반기 (6개월)</option>
                        <option value="4">분기 (3개월)</option>
                        <option value="12">월복리</option>
                        <option value="365">일복리</option>
                    </select>
                </div>
            </div>

            {/* Results */}
            {result && (
                <>
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/50 rounded-xl p-8 text-center">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">최종 금액 (복리)</h3>
                        <p className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                            {result.finalAmount.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}원
                        </p>
                        <p className="text-muted-foreground">
                            이자: {result.totalInterest.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}원
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="font-bold mb-4">💰 복리 vs 단리</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">복리 최종 금액</span>
                                    <span className="font-bold text-green-600 dark:text-green-400">
                                        {result.finalAmount.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}원
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">단리 최종 금액</span>
                                    <span className="font-bold">
                                        {result.simpleAmount.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}원
                                    </span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-border">
                                    <span className="text-muted-foreground">복리 효과</span>
                                    <span className="font-bold text-primary">
                                        +{result.difference.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}원
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="font-bold mb-4">📊 수익률</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">원금</span>
                                    <span className="font-bold">
                                        {parseFloat(principal).toLocaleString('ko-KR')}원
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">총 이자</span>
                                    <span className="font-bold text-green-600 dark:text-green-400">
                                        {result.totalInterest.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}원
                                    </span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-border">
                                    <span className="text-muted-foreground">수익률</span>
                                    <span className="font-bold text-primary">
                                        {((result.totalInterest / parseFloat(principal)) * 100).toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 복리란?</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>복리는 이자에 이자가 붙는 방식입니다</li>
                    <li>시간이 지날수록 단리보다 훨씬 큰 수익을 얻을 수 있습니다</li>
                    <li>아인슈타인은 복리를 "세상에서 가장 강력한 힘"이라고 표현했습니다</li>
                    <li>장기 투자일수록 복리 효과가 극대화됩니다</li>
                </ul>
            </div>
        </div>
    );
};

export default CompoundInterestCalculator;
