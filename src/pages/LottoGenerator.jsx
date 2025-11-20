import React, { useState } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import RelatedTools from '../components/RelatedTools';

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

            {/* Educational Content */}
            <div className="space-y-6">
                {/* 로또 번호 생성기란? */}
                <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">🎰 로또 번호 생성기란?</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                            로또 번호 생성기는 1부터 45까지의 숫자 중 6개를 <strong className="text-foreground">완전히 무작위</strong>로
                            선택해주는 도구입니다. 컴퓨터의 난수 생성 알고리즘을 사용하여 공정하고 예측 불가능한 번호 조합을 만들어냅니다.
                        </p>
                        <div className="bg-background border border-border rounded-lg p-4 mt-4">
                            <p className="font-semibold text-foreground mb-2">번호 색상 의미</p>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                                    <span className="text-xs">1-10</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                                    <span className="text-xs">11-20</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-red-500"></div>
                                    <span className="text-xs">21-30</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-600"></div>
                                    <span className="text-xs">31-40</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-green-500"></div>
                                    <span className="text-xs">41-45</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 사용 방법 */}
                <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">📝 사용 방법</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">1️⃣</span>
                            <div>
                                <p className="font-semibold text-foreground">"번호 생성하기" 버튼 클릭</p>
                                <p>버튼을 클릭할 때마다 새로운 6개의 번호가 생성됩니다.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">2️⃣</span>
                            <div>
                                <p className="font-semibold text-foreground">생성된 번호 확인</p>
                                <p>번호는 자동으로 오름차순 정렬되어 표시됩니다.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">3️⃣</span>
                            <div>
                                <p className="font-semibold text-foreground">마음에 드는 번호 선택</p>
                                <p>여러 번 생성해보고 마음에 드는 조합을 선택하세요. 최근 5개 기록이 저장됩니다.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 당첨 확률 */}
                <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">📊 로또 당첨 확률</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                            로또 6/45의 1등 당첨 확률은 <strong className="text-foreground">약 814만분의 1</strong>입니다.
                            이는 45개의 숫자 중 6개를 선택하는 모든 경우의 수인 8,145,060가지 중 하나를 맞춰야 하기 때문입니다.
                        </p>
                        <div className="bg-background border border-border rounded-lg p-4">
                            <p className="font-semibold text-foreground mb-2">등수별 당첨 확률</p>
                            <ul className="space-y-1 list-disc list-inside ml-2">
                                <li><strong className="text-foreground">1등</strong> (6개 일치): 1/8,145,060</li>
                                <li><strong className="text-foreground">2등</strong> (5개 + 보너스): 1/1,357,510</li>
                                <li><strong className="text-foreground">3등</strong> (5개 일치): 1/35,724</li>
                                <li><strong className="text-foreground">4등</strong> (4개 일치): 1/733</li>
                                <li><strong className="text-foreground">5등</strong> (3개 일치): 1/45</li>
                            </ul>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4 mt-4">
                            <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">💡 참고</p>
                            <p className="text-xs">
                                모든 번호 조합은 동일한 확률을 가집니다. "1, 2, 3, 4, 5, 6"과 "7, 13, 21, 28, 35, 42"는
                                당첨 확률이 똑같습니다. 특정 패턴이나 번호가 더 유리하다는 것은 미신입니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 주의사항 */}
                <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4 text-yellow-600 dark:text-yellow-400">⚠️ 주의사항</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                            <span>•</span>
                            <p>
                                <strong className="text-foreground">랜덤 생성의 의미</strong>:
                                이 도구는 완전히 무작위로 번호를 생성합니다. 과거 당첨 번호, 통계, 패턴 등을 전혀 고려하지 않습니다.
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span>•</span>
                            <p>
                                <strong className="text-foreground">당첨 보장 불가</strong>:
                                어떤 번호 조합도 당첨을 보장하지 않습니다. 로또는 순수한 확률 게임입니다.
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span>•</span>
                            <p>
                                <strong className="text-foreground">책임있는 구매</strong>:
                                로또는 여가 활동으로 즐기세요. 생활비나 저축금으로 과도하게 구매하지 마세요.
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span>•</span>
                            <p>
                                <strong className="text-foreground">도박 중독 예방</strong>:
                                로또 구매가 습관이 되거나 생활에 지장을 준다면 전문가의 도움을 받으세요.
                            </p>
                        </div>
                        <div className="bg-background border border-border rounded-lg p-3 mt-4">
                            <p className="text-xs">
                                <strong className="text-foreground">도박 문제 상담</strong>: 한국도박문제관리센터 ☎ 1336 (24시간 무료 상담)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools relatedIds={['compound-interest', 'loan', 'salary-calc']} />
        </div>
    );
};

export default LottoGenerator;
