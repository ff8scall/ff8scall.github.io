import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import SEO from '../components/SEO';

const SalaryCalculator = () => {
    const [annualSalary, setAnnualSalary] = useState('');
    const [dependents, setDependents] = useState(1); // 본인 포함

    const calculateTakeHome = () => {
        const salary = parseFloat(annualSalary);
        if (!salary) return null;

        const monthlySalary = salary / 12;

        // 4대 보험료 계산 (2024년 기준)
        const nationalPension = Math.min(monthlySalary * 0.045, 248850); // 상한액 5,530,000원
        const healthInsurance = monthlySalary * 0.03545; // 건강보험 3.545%
        const longTermCare = healthInsurance * 0.1295; // 장기요양 12.95%
        const employmentInsurance = monthlySalary * 0.009; // 고용보험 0.9%

        const totalInsurance = nationalPension + healthInsurance + longTermCare + employmentInsurance;

        // 간이세액표 기준 소득세 계산 (간략화)
        let incomeTax = 0;
        const taxableIncome = monthlySalary - totalInsurance;

        if (dependents === 1) {
            if (taxableIncome <= 1060000) incomeTax = 0;
            else if (taxableIncome <= 2060000) incomeTax = (taxableIncome - 1060000) * 0.06;
            else if (taxableIncome <= 4060000) incomeTax = 60000 + (taxableIncome - 2060000) * 0.15;
            else if (taxableIncome <= 8060000) incomeTax = 360000 + (taxableIncome - 4060000) * 0.24;
            else incomeTax = 1320000 + (taxableIncome - 8060000) * 0.35;
        } else {
            // 부양가족 있을 경우 공제 증가 (간략화)
            const deduction = (dependents - 1) * 150000;
            const adjustedIncome = Math.max(0, taxableIncome - deduction);

            if (adjustedIncome <= 1060000) incomeTax = 0;
            else if (adjustedIncome <= 2060000) incomeTax = (adjustedIncome - 1060000) * 0.06;
            else if (adjustedIncome <= 4060000) incomeTax = 60000 + (adjustedIncome - 2060000) * 0.15;
            else if (adjustedIncome <= 8060000) incomeTax = 360000 + (adjustedIncome - 4060000) * 0.24;
            else incomeTax = 1320000 + (adjustedIncome - 8060000) * 0.35;
        }

        const localIncomeTax = incomeTax * 0.1; // 지방소득세 10%

        const totalDeduction = totalInsurance + incomeTax + localIncomeTax;
        const takeHome = monthlySalary - totalDeduction;

        return {
            monthlySalary,
            nationalPension,
            healthInsurance,
            longTermCare,
            employmentInsurance,
            totalInsurance,
            incomeTax,
            localIncomeTax,
            totalDeduction,
            takeHome,
            annualTakeHome: takeHome * 12
        };
    };

    const result = calculateTakeHome();

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="연봉 실수령액 계산기 - Utility Hub"
                description="연봉을 입력하면 4대 보험과 세금을 제외한 실수령액을 계산해드립니다. 2024년 최신 세율 적용."
                keywords="연봉 계산기, 실수령액, 세금 계산, 4대보험, 월급 계산"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <DollarSign className="w-8 h-8 text-primary" />
                    연봉 실수령액 계산기
                </h1>
                <p className="text-muted-foreground">
                    4대 보험과 세금을 제외한 실제 받는 금액을 계산하세요
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">연봉 (세전)</label>
                    <input
                        type="number"
                        value={annualSalary}
                        onChange={(e) => setAnnualSalary(e.target.value)}
                        placeholder="예: 40000000"
                        className="w-full px-4 py-3 text-xl bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        부양가족 수 (본인 포함): {dependents}명
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={dependents}
                        onChange={(e) => setDependents(parseInt(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1명</span>
                        <span>10명</span>
                    </div>
                </div>
            </div>

            {/* Results */}
            {result && (
                <>
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/50 rounded-xl p-8 text-center">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">월 실수령액</h3>
                        <p className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                            {result.takeHome.toLocaleString('ko-KR')}원
                        </p>
                        <p className="text-muted-foreground">
                            연간 {result.annualTakeHome.toLocaleString('ko-KR')}원
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="font-bold mb-4 text-lg">💰 급여 내역</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">월 급여 (세전)</span>
                                    <span className="font-bold">{result.monthlySalary.toLocaleString('ko-KR')}원</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="font-bold mb-4 text-lg text-red-600 dark:text-red-400">📉 공제 내역</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">국민연금 (4.5%)</span>
                                    <span className="text-red-600 dark:text-red-400">-{result.nationalPension.toLocaleString('ko-KR')}원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">건강보험 (3.545%)</span>
                                    <span className="text-red-600 dark:text-red-400">-{result.healthInsurance.toLocaleString('ko-KR')}원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">장기요양 (12.95%)</span>
                                    <span className="text-red-600 dark:text-red-400">-{result.longTermCare.toLocaleString('ko-KR')}원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">고용보험 (0.9%)</span>
                                    <span className="text-red-600 dark:text-red-400">-{result.employmentInsurance.toLocaleString('ko-KR')}원</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-border">
                                    <span className="text-muted-foreground">소득세</span>
                                    <span className="text-red-600 dark:text-red-400">-{result.incomeTax.toLocaleString('ko-KR')}원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">지방소득세</span>
                                    <span className="text-red-600 dark:text-red-400">-{result.localIncomeTax.toLocaleString('ko-KR')}원</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-border font-bold">
                                    <span>총 공제액</span>
                                    <span className="text-red-600 dark:text-red-400">-{result.totalDeduction.toLocaleString('ko-KR')}원</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>2024년 기준 세율 및 보험료율 적용</li>
                    <li>간이세액표 기준으로 계산되며, 실제 금액과 다를 수 있습니다</li>
                    <li>비과세 항목(식대, 차량유지비 등)은 포함되지 않았습니다</li>
                    <li>연말정산 시 추가 환급 또는 납부가 발생할 수 있습니다</li>
                </ul>
            </div>
        </div>
    );
};

export default SalaryCalculator;
