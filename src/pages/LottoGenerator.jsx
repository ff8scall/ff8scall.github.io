import React, { useState } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

const LottoGenerator = () => {
    const [numbers, setNumbers] = useState([]);
    const [history, setHistory] = useState([]);

    const generateNumbers = () => {
        const newNumbers = [];
        while (newNumbers.length < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            if (!newNumbers.includes(num)) {
                newNumbers.push(num);
            }
        }
        newNumbers.sort((a, b) => a - b);
        setNumbers(newNumbers);
        setHistory(prev => [newNumbers, ...prev.slice(0, 4)]);
    };

    const getNumberColor = (num) => {
        if (num <= 10) return 'bg-yellow-500';
        if (num <= 20) return 'bg-blue-500';
        if (num <= 30) return 'bg-red-500';
        if (num <= 40) return 'bg-gray-600';
        return 'bg-green-500';
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="로또 번호 생성기 - Utility Hub"
                description="행운의 로또 번호를 자동으로 생성해드립니다. 1부터 45까지의 숫자 중 6개를 무작위로 추출합니다."
                keywords="로또, 로또번호, 번호생성기, 행운의숫자"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Sparkles className="w-8 h-8 text-yellow-500" />
                    로또 번호 생성기
                </h1>
                <p className="text-muted-foreground">
                    행운의 번호를 생성해보세요!
                </p>
            </header>

            {/* Generate Button */}
            <div className="flex justify-center">
                <button
                    onClick={generateNumbers}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-xl"
                >
                    <RefreshCw className="w-6 h-6" />
                    번호 생성하기
                </button>
            </div>

            {/* Current Numbers */}
            {numbers.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-center">생성된 번호</h2>
                    <div className="flex justify-center gap-3 flex-wrap">
                        {numbers.map((num, idx) => (
                            <div
                                key={idx}
                                className={`w-16 h-16 rounded-full ${getNumberColor(num)} flex items-center justify-center text-white font-bold text-2xl shadow-md animate-fade-in`}
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* History */}
            {history.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-lg font-bold mb-4">생성 기록</h2>
                    <div className="space-y-3">
                        {history.map((nums, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <span className="text-sm text-muted-foreground w-8">#{idx + 1}</span>
                                <div className="flex gap-2 flex-wrap">
                                    {nums.map((num, numIdx) => (
                                        <div
                                            key={numIdx}
                                            className={`w-10 h-10 rounded-full ${getNumberColor(num)} flex items-center justify-center text-white font-bold text-sm`}
                                        >
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Info */}
            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>1부터 45까지의 숫자 중 6개를 무작위로 생성합니다.</li>
                    <li>생성된 번호는 자동으로 오름차순 정렬됩니다.</li>
                    <li>최근 5개의 생성 기록이 저장됩니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default LottoGenerator;
