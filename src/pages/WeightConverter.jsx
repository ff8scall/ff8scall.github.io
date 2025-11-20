import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Weight, Clock, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';
import useHistory from '../hooks/useHistory';

const units = [
    { value: 'mg', label: '밀리그램 (mg)', ratio: 0.001 },
    { value: 'g', label: '그램 (g)', ratio: 1 },
    { value: 'kg', label: '킬로그램 (kg)', ratio: 1000 },
    { value: 'oz', label: '온스 (oz)', ratio: 28.3495 },
    { value: 'lb', label: '파운드 (lb)', ratio: 453.592 },
];

const WeightConverter = () => {
    const [amount, setAmount] = useState('');
    const [fromUnit, setFromUnit] = useState('kg');
    const [toUnit, setToUnit] = useState('lb');
    const [result, setResult] = useState('');

    const { history, saveHistory, clearHistory } = useHistory('weight-converter-history');

    useEffect(() => {
        if (amount === '' || isNaN(amount)) {
            setResult('');
            return;
        }

        const fromRatio = units.find(u => u.value === fromUnit)?.ratio || 1;
        const toRatio = units.find(u => u.value === toUnit)?.ratio || 1;

        // Convert to grams first, then to target unit
        const valueInGrams = parseFloat(amount) * fromRatio;
        const convertedValue = valueInGrams / toRatio;

        const formattedResult = Number(convertedValue.toPrecision(10)).toString();
        setResult(formattedResult);

        // Auto-save to history after 2 seconds of inactivity
        const timer = setTimeout(() => {
            if (amount && formattedResult) {
                saveHistory({
                    from: `${amount} ${fromUnit}`,
                    to: `${formattedResult} ${toUnit}`,
                    date: new Date().toLocaleString()
                });
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [amount, fromUnit, toUnit]);

    const handleSwap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const handleHistoryClick = (item) => {
        const [val, unit] = item.from.split(' ');
        setAmount(val);
        setFromUnit(unit);
        const [, targetUnit] = item.to.split(' ');
        setToUnit(targetUnit);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title="무게 변환기"
                description="mg, g, kg, oz, lb 등 무게 단위를 쉽고 정확하게 변환하세요."
                keywords="무게 변환, 단위 변환, 킬로그램 변환, 파운드 변환"
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-3">
                    <Weight className="w-8 h-8 text-primary" />
                    무게 변환기
                </h1>
                <p className="text-text-secondary">
                    다양한 무게 단위를 쉽고 정확하게 변환하세요.
                </p>
            </div>

            <div className="card p-8 space-y-8">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-secondary">변환할 값</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="숫자를 입력하세요"
                        className="input text-2xl font-bold py-4"
                    />
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">에서</label>
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="input cursor-pointer"
                        >
                            {units.map((u) => (
                                <option key={u.value} value={u.value}>{u.label}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleSwap}
                        className="p-3 rounded-full hover:bg-bg-card-hover text-primary transition-colors mt-6"
                        title="단위 바꾸기"
                    >
                        <ArrowRightLeft className="w-5 h-5" />
                    </button>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">으로</label>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="input cursor-pointer"
                        >
                            {units.map((u) => (
                                <option key={u.value} value={u.value}>{u.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="pt-8 border-t border-border-color text-center space-y-2">
                    <p className="text-text-secondary text-sm">변환 결과</p>
                    <div className="text-4xl font-bold text-primary break-all">
                        {result || '0'}
                        <span className="text-lg text-text-tertiary ml-2 font-normal">
                            {units.find(u => u.value === toUnit)?.value}
                        </span>
                    </div>
                </div>
            </div>

            {/* History Section */}
            {history.length > 0 && (
                <div className="card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold flex items-center gap-2">
                            <Clock className="w-5 h-5 text-text-secondary" />
                            최근 변환 기록
                        </h3>
                        <button
                            onClick={clearHistory}
                            className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                            <Trash2 className="w-3 h-3" />
                            기록 삭제
                        </button>
                    </div>
                    <div className="space-y-2">
                        {history.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleHistoryClick(item)}
                                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-bg-card-hover transition-colors text-sm group"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{item.from}</span>
                                    <ArrowRightLeft className="w-3 h-3 text-text-tertiary" />
                                    <span className="font-bold text-primary">{item.to}</span>
                                </div>
                                <span className="text-xs text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.date}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeightConverter;
