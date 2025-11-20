import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import RelatedTools from '../components/RelatedTools';

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

            {/* Educational Content */}
            <div className="space-y-6">
                {/* 복리란? */}
                <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">💡 복리란?</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                            <strong className="text-foreground">복리(複利, Compound Interest)</strong>는 원금에 대한 이자뿐만 아니라,
                            발생한 이자에도 다시 이자가 붙는 방식입니다. 시간이 지날수록 이자가 기하급수적으로 증가하여
                            단리보다 훨씬 큰 수익을 얻을 수 있습니다.
                        </p>
                        <p>
                            아인슈타인은 복리를 <strong className="text-foreground">"세상에서 가장 강력한 힘"</strong>이라고 표현했으며,
                            워렌 버핏은 복리의 힘을 활용하여 세계적인 부자가 되었습니다.
                        </p>
                        <div className="bg-background border border-border rounded-lg p-4 mt-4">
                            <p className="font-semibold text-foreground mb-2">복리 vs 단리 비교</p>
                            <ul className="space-y-1 list-disc list-inside">
                                <li><strong className="text-foreground">단리</strong>: 원금에만 이자가 붙음 (선형 증가)</li>
                                <li><strong className="text-foreground">복리</strong>: 원금 + 이자에 이자가 붙음 (기하급수적 증가)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 계산 공식 */}
                <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">📐 복리 계산 공식</h3>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <div className="bg-background border border-border rounded-lg p-4 font-mono text-center">
                            <p className="text-lg font-bold text-foreground">A = P(1 + r/n)^(nt)</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-background border border-border rounded-lg p-3">
                                <p><strong className="text-foreground">A</strong> = 최종 금액 (원금 + 이자)</p>
                            </div>
                            <div className="bg-background border border-border rounded-lg p-3">
                                <p><strong className="text-foreground">P</strong> = 원금 (초기 투자금)</p>
                            </div>
                            <div className="bg-background border border-border rounded-lg p-3">
                                <p><strong className="text-foreground">r</strong> = 연 이율 (소수점 형태)</p>
                            </div>
                            <div className="bg-background border border-border rounded-lg p-3">
                                <p><strong className="text-foreground">n</strong> = 연간 복리 횟수</p>
                            </div>
                            <div className="bg-background border border-border rounded-lg p-3 md:col-span-2">
                                <p><strong className="text-foreground">t</strong> = 투자 기간 (년)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 사용 예시 */}
                <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">📊 실전 예시</h3>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <div className="bg-background border border-border rounded-lg p-4">
                            <p className="font-semibold text-foreground mb-2">예시 1: 1,000만원을 연 5% 이율로 10년간 투자</p>
                            <ul className="space-y-1 list-disc list-inside ml-2">
                                <li>원금: 10,000,000원</li>
                                <li>연 이율: 5%</li>
                                <li>기간: 10년</li>
                                <li>복리 주기: 월복리 (12회/년)</li>
                            </ul>
                            <div className="mt-3 pt-3 border-t border-border">
                                <p className="font-bold text-green-600 dark:text-green-400">
                                    결과: 약 16,470,095원 (이자: 6,470,095원)
                                </p>
                                <p className="text-xs mt-1">
                                    * 단리로 계산 시: 15,000,000원 (차이: 약 147만원)
                                </p>
                            </div>
                        </div>

                        <div className="bg-background border border-border rounded-lg p-4">
                            <p className="font-semibold text-foreground mb-2">예시 2: 매월 50만원씩 적립 (연 7%, 20년)</p>
                            <p className="text-xs">
                                * 이 계산기는 일시불 투자만 계산합니다. 적립식 투자는 별도 계산이 필요합니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 활용 팁 */}
                <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">💰 재테크 활용 팁</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">1️⃣</span>
                            <div>
                                <p className="font-semibold text-foreground">일찍 시작하세요</p>
                                <p>복리는 시간이 지날수록 효과가 커집니다. 20대에 시작한 투자는 30대에 시작한 것보다 훨씬 큰 수익을 가져옵니다.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">2️⃣</span>
                            <div>
                                <p className="font-semibold text-foreground">장기 투자하세요</p>
                                <p>복리 효과는 장기 투자에서 극대화됩니다. 최소 10년 이상의 장기 투자를 권장합니다.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">3️⃣</span>
                            <div>
                                <p className="font-semibold text-foreground">재투자하세요</p>
                                <p>이자나 배당금을 인출하지 말고 재투자하면 복리 효과가 더욱 커집니다.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">4️⃣</span>
                            <div>
                                <p className="font-semibold text-foreground">복리 주기를 확인하세요</p>
                                <p>같은 이율이라도 복리 주기가 짧을수록 (일복리 &gt; 월복리 &gt; 연복리) 최종 수익이 커집니다.</p>
                            </div>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mt-4">
                            <p className="font-semibold text-yellow-600 dark:text-yellow-400 mb-1">⚠️ 주의사항</p>
                            <p className="text-xs">
                                이 계산기는 단순 복리 계산만 제공합니다. 실제 투자 시에는 세금, 수수료, 인플레이션 등을
                                고려해야 하며, 투자 상품에 따라 원금 손실 위험이 있을 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools relatedIds={['salary-calc', 'currency', 'loan']} />
        </div>
    );
};

export default CompoundInterestCalculator;
