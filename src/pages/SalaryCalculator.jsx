import React, { useState, useEffect } from 'react';
import { DollarSign, Info, PieChart as PieChartIcon } from 'lucide-react';
import SEO from '../components/SEO';
import ShareButtons from '../components/ShareButtons';

const SalaryCalculator = () => {
    const [year, setYear] = useState('2025');
    // Inputs are now strings to support commas
    const [annualSalary, setAnnualSalary] = useState('');
    const [nonTaxable, setNonTaxable] = useState('200,000');
    const [dependents, setDependents] = useState(1);
    const [result, setResult] = useState(null);

    useEffect(() => {
        calculateTakeHome();
    }, [annualSalary, nonTaxable, dependents, year]);

    // Format number with commas while typing
    const handleNumberInput = (setter) => (e) => {
        const value = e.target.value;
        // Remove non-digits
        const numStr = value.replace(/[^0-9]/g, '');
        if (!numStr) {
            setter('');
            return;
        }
        // Format with commas
        const formatted = parseInt(numStr).toLocaleString();
        setter(formatted);
    };

    const calculateTakeHome = () => {
        // Robust input parsing: remove non-numeric chars, then parse
        const cleanNumber = (val) => {
            if (!val) return 0;
            const str = String(val).replace(/[^0-9]/g, '');
            const num = parseFloat(str);
            return isNaN(num) ? 0 : num;
        };

        const salary = cleanNumber(annualSalary);

        if (!salary) {
            setResult(null);
            return;
        }

        const monthlySalary = salary / 12;
        const monthlyNonTaxable = cleanNumber(nonTaxable);
        // Ensure monthlyTaxable is never negative or NaN
        const monthlyTaxable = Math.max(0, (monthlySalary || 0) - (monthlyNonTaxable || 0));

        // 2025년 요율 (2024년과 동일하게 동결됨)
        // 국민연금: 4.5% (상한액 265,500원 - 월 소득 590만원 기준)
        // 건강보험: 3.545%
        // 장기요양: 건강보험료의 12.95%
        // 고용보험: 0.9%

        let pensionRate = 0.045;
        let healthRate = 0.03545;
        let longTermRate = 0.1295;
        let empRate = 0.009;
        let pensionLimit = 265500;

        // 연도별 로직 (현재는 2024/2025/2026 모두 동일 적용)
        // 2025년 동결 확정으로 2024년과 동일

        // 국민연금
        const nationalPension = Math.min((monthlyTaxable || 0) * pensionRate, pensionLimit) || 0;

        // 건강보험
        const healthInsurance = ((monthlyTaxable || 0) * healthRate) || 0;

        // 장기요양
        const longTermCare = ((healthInsurance || 0) * longTermRate) || 0;

        // 고용보험
        const employmentInsurance = ((monthlyTaxable || 0) * empRate) || 0;

        const totalInsurance = (nationalPension + healthInsurance + longTermCare + employmentInsurance) || 0;

        // 소득세 계산
        let incomeTax = 0;
        const depCount = dependents || 1; // Default to 1 if NaN
        const standardIncome = (monthlyTaxable || 0) - (totalInsurance || 0) - ((depCount - 1) * 150000);

        if (standardIncome > 1060000) {
            if (standardIncome <= 2060000) incomeTax = (standardIncome - 1060000) * 0.06;
            else if (standardIncome <= 4060000) incomeTax = 60000 + (standardIncome - 2060000) * 0.15;
            else if (standardIncome <= 8060000) incomeTax = 360000 + (standardIncome - 4060000) * 0.24;
            else incomeTax = 1320000 + (standardIncome - 8060000) * 0.35;
        }
        incomeTax = Math.max(0, incomeTax) || 0;

        const localIncomeTax = (incomeTax * 0.1) || 0;
        const totalDeduction = (totalInsurance + incomeTax + localIncomeTax) || 0;
        const takeHome = (monthlySalary - totalDeduction) || 0;

        setResult({
            monthlySalary: monthlySalary || 0,
            monthlyNonTaxable: monthlyNonTaxable || 0,
            nationalPension,
            healthInsurance,
            longTermCare,
            employmentInsurance,
            totalInsurance, // Added missing property
            incomeTax,
            localIncomeTax,
            totalDeduction,
            takeHome,
            annualTakeHome: takeHome * 12
        });
    };

    // Simple Donut Chart Component
    const DonutChart = ({ data }) => {
        const total = data.reduce((acc, item) => acc + (item.value || 0), 0);

        if (!total || isNaN(total) || total <= 0) {
            return (
                <div className="relative w-48 h-48 mx-auto">
                    <div className="w-full h-full rounded-full bg-muted/20"></div>
                    <div className="absolute inset-0 m-auto w-32 h-32 bg-card rounded-full flex items-center justify-center flex-col">
                        <span className="text-xs text-muted-foreground">데이터 없음</span>
                    </div>
                </div>
            );
        }

        let currentAngle = 0;
        const gradientParts = data.map(item => {
            const val = item.value || 0;
            const percentage = (val / total) * 100;
            const start = currentAngle;
            currentAngle += percentage;
            return `${item.color} ${start}% ${currentAngle}%`;
        });

        const gradient = `conic-gradient(${gradientParts.join(', ')})`;
        const percentage = Math.round(((data[0].value || 0) / total) * 100);

        return (
            <div className="relative w-48 h-48 mx-auto">
                <div
                    className="w-full h-full rounded-full"
                    style={{ background: gradient }}
                ></div>
                <div className="absolute inset-0 m-auto w-32 h-32 bg-card rounded-full flex items-center justify-center flex-col">
                    <span className="text-xs text-muted-foreground">실수령 비율</span>
                    <span className="font-bold text-lg">
                        {percentage}%
                    </span>
                </div>
            </div>
        );
    };

    // Helper to format large numbers to Korean units (e.g., 7,200만원)
    const formatKoreanNumber = (numStr) => {
        if (!numStr) return '';
        const n = parseInt(String(numStr).replace(/[^0-9]/g, ''));
        if (isNaN(n) || n === 0) return '';
        if (n < 10000) return `${n.toLocaleString()}원`;

        const unit = 10000;
        const man = Math.floor(n / unit);
        const remainder = n % unit;

        return `${man.toLocaleString()}만원${remainder > 0 ? ` ${remainder.toLocaleString()}원` : ''}`;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title={`연봉 실수령액 계산기 - ${year}년 기준`}
                description={`${year}년 최신 세율(동결)을 적용하여 연봉 실수령액을 계산하세요. 4대보험, 소득세, 공제액 분석 제공.`}
                keywords={['연봉 계산기', '실수령액', '월급 계산', '4대보험', '비과세', 'salary calculator']}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-2">
                    <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">연봉 실수령액 계산기</h1>
                <p className="text-muted-foreground">
                    세금과 4대보험을 제외한 내 진짜 월급은 얼마일까요?
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="card p-6 space-y-4">
                        <h2 className="font-bold text-lg flex items-center gap-2">
                            <span className="w-1 h-5 bg-primary rounded-full"></span>
                            급여 정보 입력
                        </h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">기준 연도</label>
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="input w-full"
                            >
                                <option value="2026">2026년 (예상)</option>
                                <option value="2025">2025년 (동결 확정)</option>
                                <option value="2024">2024년</option>
                            </select>
                            <p className="text-xs text-muted-foreground">
                                * 2025년 4대보험 요율은 2024년과 동일하게 동결되었습니다.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">연봉 (세전)</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={annualSalary}
                                    onChange={handleNumberInput(setAnnualSalary)}
                                    placeholder="예: 40,000,000"
                                    className="input w-full pr-8"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">원</span>
                            </div>
                            {annualSalary && (
                                <p className="text-sm font-bold text-primary text-right">
                                    {formatKoreanNumber(annualSalary)}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">월 비과세액</label>
                                <div className="group relative">
                                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                                    <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-white dark:bg-gray-900 border border-border text-foreground text-xs rounded shadow-xl hidden group-hover:block z-50">
                                        식대(월 20만원), 자가운전보조금(월 20만원) 등 세금이 부과되지 않는 수당입니다.
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={nonTaxable}
                                    onChange={handleNumberInput(setNonTaxable)}
                                    className="input w-full pr-8"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">원</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">부양가족 수 (본인포함)</label>
                                <div className="group relative">
                                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                                    <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-white dark:bg-gray-900 border border-border text-foreground text-xs rounded shadow-xl hidden group-hover:block z-50">
                                        부양가족 수가 많을수록 소득세 공제 혜택이 늘어납니다. 본인을 포함하여 입력해주세요.
                                    </div>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={dependents}
                                onChange={(e) => setDependents(parseInt(e.target.value))}
                                className="w-full accent-primary"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>1명</span>
                                <span className="font-bold text-primary">{dependents}명</span>
                                <span>10명</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Result Section */}
                <div className="lg:col-span-2 space-y-6">
                    {result ? (
                        <>
                            {/* Main Result Card */}
                            <div className="card p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 text-center relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">예상 월 실수령액 ({year}년 기준)</h3>
                                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                        {Math.floor(result.takeHome).toLocaleString()}원
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        연간 실수령액: <span className="font-medium text-foreground">{Math.floor(result.annualTakeHome).toLocaleString()}원</span>
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Chart & Summary */}
                                <div className="card p-6 flex flex-col items-center justify-center space-y-6">
                                    <h3 className="font-bold text-lg self-start flex items-center gap-2">
                                        <PieChartIcon className="w-5 h-5 text-primary" />
                                        공제 비율 분석
                                    </h3>
                                    <DonutChart
                                        data={[
                                            { name: '실수령액', value: result.takeHome, color: '#22c55e' }, // green-500
                                            { name: '4대보험', value: result.totalInsurance, color: '#3b82f6' }, // blue-500
                                            { name: '세금', value: result.incomeTax + result.localIncomeTax, color: '#ef4444' } // red-500
                                        ]}
                                    />
                                    <div className="flex gap-4 text-xs">
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <span>실수령</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                            <span>4대보험</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <span>세금</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed List */}
                                <div className="card p-6 space-y-4">
                                    <h3 className="font-bold text-lg">상세 내역</h3>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center py-2 border-b border-border">
                                            <span className="text-muted-foreground">월 급여 (세전)</span>
                                            <span className="font-bold">{Math.floor(result.monthlySalary).toLocaleString()}원</span>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-muted-foreground text-xs">
                                                <span>국민연금 (4.5%)</span>
                                                <span>-{Math.floor(result.nationalPension).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-muted-foreground text-xs">
                                                <span>건강보험 (3.545%)</span>
                                                <span>-{Math.floor(result.healthInsurance).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-muted-foreground text-xs">
                                                <span>장기요양 (12.95%)</span>
                                                <span>-{Math.floor(result.longTermCare).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-muted-foreground text-xs">
                                                <span>고용보험 (0.9%)</span>
                                                <span>-{Math.floor(result.employmentInsurance).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between font-medium text-blue-600 dark:text-blue-400 pt-1">
                                                <span>4대보험 합계</span>
                                                <span>-{Math.floor(result.totalInsurance).toLocaleString()}원</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-2 border-t border-border">
                                            <div className="flex justify-between text-muted-foreground text-xs">
                                                <span>소득세</span>
                                                <span>-{Math.floor(result.incomeTax).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-muted-foreground text-xs">
                                                <span>지방소득세 (10%)</span>
                                                <span>-{Math.floor(result.localIncomeTax).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between font-medium text-red-600 dark:text-red-400 pt-1">
                                                <span>세금 합계</span>
                                                <span>-{Math.floor(result.incomeTax + result.localIncomeTax).toLocaleString()}원</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-3 border-t border-border font-bold text-base">
                                            <span>총 공제액</span>
                                            <span className="text-red-600 dark:text-red-400">-{Math.floor(result.totalDeduction).toLocaleString()}원</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center p-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
                            연봉을 입력하면 상세한 분석 결과가 여기에 표시됩니다.
                        </div>
                    )}
                </div>
            </div>

            <ShareButtons />
        </div>
    );
};

export default SalaryCalculator;
