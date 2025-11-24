import React, { useState } from 'react';
import { Calculator, Calendar, Info } from 'lucide-react';
import SEO from '../components/SEO';
import ShareButtons from '../components/ShareButtons';

const SeveranceCalculator = () => {
    const [avgSalary, setAvgSalary] = useState(''); // 3개월 평균 월급
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result, setResult] = useState(null);

    const calculateSeverance = () => {
        if (!avgSalary || !startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        // 재직일수 계산
        const diffTime = Math.abs(end - start);
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // 당일 포함

        if (totalDays < 365) {
            alert('재직 기간이 1년 미만인 경우 퇴직금이 발생하지 않습니다.');
            return;
        }

        // 1일 평균임금 계산 (간이: 월급 / 30일)
        // 실제로는 3개월치 임금 총액 / 3개월간 총 일수 이지만, 간이 계산을 위해 월급 기준 사용
        const dailyWage = parseFloat(avgSalary) / 30; // 간이 계산

        // 퇴직금 = 1일 평균임금 * 30일 * (재직일수 / 365)
        const severancePay = dailyWage * 30 * (totalDays / 365);

        setResult({
            totalDays,
            severancePay
        });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title="퇴직금 계산기 - 예상 퇴직금 조회"
                description="입사일과 퇴사일, 월급을 입력하여 예상 퇴직금을 간편하게 계산해보세요."
                keywords={['퇴직금', '퇴직금 계산기', '예상 퇴직금', 'severance pay']}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-2">
                    <Calculator className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">퇴직금 계산기</h1>
                <p className="text-muted-foreground">
                    나의 소중한 퇴직금, 얼마나 받을 수 있을까요?
                </p>
            </header>

            <div className="card p-6 space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">최근 3개월 월 평균 급여 (세전)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={avgSalary}
                                onChange={(e) => setAvgSalary(e.target.value)}
                                placeholder="예: 3000000"
                                className="input w-full pr-8"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">원</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            * 기본급 + 각종 수당을 포함한 세전 금액을 입력하세요.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> 입사일
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="input w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> 퇴사일 (마지막 근무일)
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="input w-full"
                            />
                        </div>
                    </div>

                    <button
                        onClick={calculateSeverance}
                        className="btn btn-primary w-full py-4 text-lg font-bold"
                    >
                        퇴직금 계산하기
                    </button>
                </div>

                {result && (
                    <div className="mt-6 p-6 bg-primary/5 rounded-xl border border-primary/10 text-center space-y-4 animate-fade-in">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">총 재직 기간</h3>
                            <p className="text-lg font-bold text-foreground">
                                {Math.floor(result.totalDays / 365)}년 {result.totalDays % 365}일 ({result.totalDays}일)
                            </p>
                        </div>
                        <div className="w-full h-px bg-border"></div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">예상 퇴직금</h3>
                            <p className="text-4xl font-bold text-primary">
                                {Math.floor(result.severancePay).toLocaleString()}원
                            </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            * 실제 퇴직금은 평균임금 산정 방식에 따라 차이가 있을 수 있습니다. (이 계산기는 통상임금 기준 간이 계산입니다)
                        </p>
                    </div>
                )}
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground space-y-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Info className="w-4 h-4" /> 퇴직금 지급 기준
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-1">
                    <li>계속근로기간이 1년 이상이어야 합니다.</li>
                    <li>4주간을 평균하여 1주간의 소정근로시간이 15시간 이상이어야 합니다.</li>
                    <li>퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365일)</li>
                </ul>
            </div>

            <ShareButtons />
        </div>
    );
};

export default SeveranceCalculator;
