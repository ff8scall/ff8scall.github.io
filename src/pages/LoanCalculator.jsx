import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Calendar, Percent } from 'lucide-react';
import SEO from '../components/SEO';

const LoanCalculator = () => {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [term, setTerm] = useState('');
    const [type, setType] = useState('equal-payment'); // equal-payment (원리금균등), equal-principal (원금균등)
    const [result, setResult] = useState(null);

    const calculateLoan = () => {
        if (!principal || !rate || !term) return;

        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100 / 12; // Monthly interest rate
        const n = parseFloat(term) * 12; // Total months

        let monthlyPayment = 0;
        let totalInterest = 0;
        let totalPayment = 0;

        if (type === 'equal-payment') {
            // 원리금균등상환
            monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            totalPayment = monthlyPayment * n;
            totalInterest = totalPayment - p;
        } else {
            // 원금균등상환 (첫 달 기준 예시, 실제로는 매달 달라짐)
            const monthlyPrincipal = p / n;
            let currentBalance = p;
            let interestSum = 0;

            for (let i = 0; i < n; i++) {
                const interest = currentBalance * r;
                interestSum += interest;
                currentBalance -= monthlyPrincipal;
            }

            totalInterest = interestSum;
            totalPayment = p + totalInterest;
            monthlyPayment = totalPayment / n; // Average monthly payment for display
        }

        setResult({
            monthlyPayment: Math.round(monthlyPayment),
            totalInterest: Math.round(totalInterest),
            totalPayment: Math.round(totalPayment)
        });
    };

    useEffect(() => {
        calculateLoan();
    }, [principal, rate, term, type]);

    const formatMoney = (num) => {
        return new Intl.NumberFormat('ko-KR').format(num);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title="대출금 계산기"
                description="원리금균등, 원금균등 상환 방식에 따른 월 납입금과 총 이자를 계산합니다."
                keywords="대출 계산기, 이자 계산, 원리금균등, 원금균등, 월 납입금"
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-3">
                    <Calculator className="w-8 h-8 text-primary" />
                    대출금 계산기
                </h1>
                <p className="text-text-secondary">
                    월 납입금과 총 이자를 미리 계산해보세요.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="card p-6 space-y-6 h-fit">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">대출 금액 (원)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                            <input
                                type="number"
                                value={principal}
                                onChange={(e) => setPrincipal(e.target.value)}
                                placeholder="예: 100000000"
                                className="input pl-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">연 이자율 (%)</label>
                        <div className="relative">
                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                            <input
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                placeholder="예: 3.5"
                                className="input pl-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">대출 기간 (년)</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                            <input
                                type="number"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                placeholder="예: 2"
                                className="input pl-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">상환 방식</label>
                        <div className="grid grid-cols-2 gap-2 p-1 bg-bg-background rounded-lg border border-border-color">
                            <button
                                onClick={() => setType('equal-payment')}
                                className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${type === 'equal-payment'
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                원리금균등
                            </button>
                            <button
                                onClick={() => setType('equal-principal')}
                                className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${type === 'equal-principal'
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                원금균등
                            </button>
                        </div>
                        <p className="text-xs text-text-tertiary mt-1">
                            {type === 'equal-payment'
                                ? '매월 동일한 금액(원금+이자)을 상환합니다.'
                                : '매월 동일한 원금을 상환하며, 이자는 줄어듭니다. (월 납입금은 평균값으로 표시)'}
                        </p>
                    </div>
                </div>

                {/* Result Section */}
                <div className="card p-8 bg-bg-card-hover border-primary/20 flex flex-col justify-center space-y-8">
                    <div className="text-center space-y-2">
                        <p className="text-text-secondary">월 예상 납입금</p>
                        <div className="text-4xl font-bold text-primary">
                            {result ? formatMoney(result.monthlyPayment) : '0'}
                            <span className="text-xl text-text-tertiary ml-1 font-normal">원</span>
                        </div>
                    </div>

                    <div className="space-y-4 pt-8 border-t border-border-color">
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary">총 대출 원금</span>
                            <span className="font-semibold">{principal ? formatMoney(principal) : '0'} 원</span>
                        </div>
                        <div className="flex justify-between items-center text-primary">
                            <span>총 이자액</span>
                            <span className="font-semibold">+ {result ? formatMoney(result.totalInterest) : '0'} 원</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-border-color text-lg font-bold">
                            <span>총 상환 금액</span>
                            <span>{result ? formatMoney(result.totalPayment) : '0'} 원</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanCalculator;
