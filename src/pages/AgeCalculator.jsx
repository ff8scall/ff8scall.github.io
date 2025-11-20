import React, { useState } from 'react';
import { Cake } from 'lucide-react';
import SEO from '../components/SEO';

const AgeCalculator = () => {
    const [birthDate, setBirthDate] = useState('');

    const calculateAge = () => {
        if (!birthDate) return null;

        const birth = new Date(birthDate);
        const today = new Date();

        // 만 나이 계산
        let koreanAge = today.getFullYear() - birth.getFullYear() + 1;

        // 만 나이 계산
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        // 다음 생일까지 남은 일수
        const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

        // 살아온 일수
        const daysSinceBirth = Math.floor((today - birth) / (1000 * 60 * 60 * 24));

        return {
            koreanAge,
            internationalAge: age,
            daysUntilBirthday,
            daysSinceBirth,
            nextBirthday: nextBirthday.toLocaleDateString('ko-KR')
        };
    };

    const result = calculateAge();

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <SEO
                title="만 나이 계산기 - Utility Hub"
                description="생년월일을 입력하면 만 나이와 한국 나이를 계산해드립니다. 2024년 만 나이 통일법 적용."
                keywords="만 나이 계산, 한국 나이, 만 나이 계산기, 나이 계산, 생년월일 나이"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Cake className="w-8 h-8 text-primary" />
                    만 나이 계산기
                </h1>
                <p className="text-muted-foreground">
                    생년월일로 만 나이와 한국 나이를 계산하세요
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">생년월일</label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Results */}
            {result && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-border rounded-xl p-8 text-center">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">만 나이</h3>
                            <p className="text-5xl font-bold text-primary mb-2">
                                {result.internationalAge}세
                            </p>
                            <p className="text-xs text-muted-foreground">
                                (국제 표준 / 법적 나이)
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-border rounded-xl p-8 text-center">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">한국 나이</h3>
                            <p className="text-5xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                                {result.koreanAge}세
                            </p>
                            <p className="text-xs text-muted-foreground">
                                (전통적 계산법)
                            </p>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                        <h3 className="font-bold text-lg">📊 상세 정보</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="p-4 bg-secondary rounded-lg">
                                <p className="text-muted-foreground mb-1">다음 생일</p>
                                <p className="font-bold text-lg">{result.nextBirthday}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {result.daysUntilBirthday}일 남음
                                </p>
                            </div>
                            <div className="p-4 bg-secondary rounded-lg">
                                <p className="text-muted-foreground mb-1">살아온 날</p>
                                <p className="font-bold text-lg">
                                    {result.daysSinceBirth.toLocaleString('ko-KR')}일
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    약 {Math.floor(result.daysSinceBirth / 365)}년
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 만 나이 vs 한국 나이</h3>
                <ul className="space-y-2">
                    <li>
                        <strong className="text-foreground">만 나이:</strong> 태어난 날부터 계산하여 생일이 지나야 한 살 증가
                    </li>
                    <li>
                        <strong className="text-foreground">한국 나이:</strong> 태어나자마자 1세, 1월 1일마다 한 살 증가
                    </li>
                    <li className="pt-2 border-t border-border">
                        <strong className="text-foreground">2023년 6월 28일부터</strong> 대한민국에서 공식적으로 만 나이를 사용합니다.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AgeCalculator;
