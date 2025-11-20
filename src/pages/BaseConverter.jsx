import React, { useState } from 'react';
import { Binary, ArrowRightLeft } from 'lucide-react';
import SEO from '../components/SEO';

const BaseConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputBase, setInputBase] = useState(10);
    const [results, setResults] = useState({});

    const convertBase = (value, fromBase) => {
        if (!value.trim()) {
            setResults({});
            return;
        }

        try {
            // 입력값을 10진수로 변환
            const decimal = parseInt(value, fromBase);

            if (isNaN(decimal)) {
                setResults({ error: '유효하지 않은 입력값입니다' });
                return;
            }

            setResults({
                binary: decimal.toString(2),
                octal: decimal.toString(8),
                decimal: decimal.toString(10),
                hexadecimal: decimal.toString(16).toUpperCase()
            });
        } catch (error) {
            setResults({ error: '변환 중 오류가 발생했습니다' });
        }
    };

    const handleInputChange = (value) => {
        setInputValue(value);
        convertBase(value, inputBase);
    };

    const handleBaseChange = (base) => {
        setInputBase(base);
        if (inputValue.trim()) {
            convertBase(inputValue, base);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="진법 변환기 (2진수, 8진수, 10진수, 16진수) - Utility Hub"
                description="2진수, 8진수, 10진수, 16진수를 서로 변환하세요. 온라인 진법 변환 계산기."
                keywords="진법 변환, 2진수 변환, 16진수 변환, 진법 계산기, binary converter"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Binary className="w-8 h-8 text-primary" />
                    진법 변환기
                </h1>
                <p className="text-muted-foreground">
                    2진수, 8진수, 10진수, 16진수 변환
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">입력 진법</label>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { base: 2, label: '2진수' },
                            { base: 8, label: '8진수' },
                            { base: 10, label: '10진수' },
                            { base: 16, label: '16진수' }
                        ].map(({ base, label }) => (
                            <button
                                key={base}
                                onClick={() => handleBaseChange(base)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${inputBase === base
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary hover:bg-accent'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">입력값</label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={
                            inputBase === 2 ? '예: 1010' :
                                inputBase === 8 ? '예: 12' :
                                    inputBase === 10 ? '예: 10' :
                                        '예: A'
                        }
                        className="w-full px-4 py-3 text-xl bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                    />
                </div>
            </div>

            {/* Results */}
            {results.error ? (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center">
                    <p className="text-red-600 dark:text-red-400">{results.error}</p>
                </div>
            ) : Object.keys(results).length > 0 && (
                <div className="space-y-3">
                    {[
                        { key: 'binary', label: '2진수 (Binary)', color: 'bg-blue-500' },
                        { key: 'octal', label: '8진수 (Octal)', color: 'bg-green-500' },
                        { key: 'decimal', label: '10진수 (Decimal)', color: 'bg-yellow-500' },
                        { key: 'hexadecimal', label: '16진수 (Hexadecimal)', color: 'bg-purple-500' }
                    ].map(({ key, label, color }) => (
                        <div key={key} className="bg-card border border-border rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${color}`} />
                                    <span className="font-bold text-sm">{label}</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(results[key])}
                                    className="text-xs px-3 py-1 bg-secondary hover:bg-accent rounded-md transition-colors"
                                >
                                    복사
                                </button>
                            </div>
                            <div className="p-3 bg-background rounded-lg font-mono text-lg break-all">
                                {results[key]}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 진법이란?</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li><strong>2진수:</strong> 0과 1만 사용 (컴퓨터의 기본 언어)</li>
                    <li><strong>8진수:</strong> 0~7까지 사용</li>
                    <li><strong>10진수:</strong> 0~9까지 사용 (우리가 일상적으로 사용)</li>
                    <li><strong>16진수:</strong> 0~9, A~F까지 사용 (색상 코드 등에 사용)</li>
                </ul>
            </div>
        </div>
    );
};

export default BaseConverter;
