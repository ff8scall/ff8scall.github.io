import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Ruler, ArrowRightLeft } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const AreaConverter = () => {
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('sqm');
    const [toUnit, setToUnit] = useState('pyeong');

    // 모든 단위를 제곱미터 기준으로 변환
    const units = {
        sqm: { name: '제곱미터 (㎡)', toBase: 1 },
        pyeong: { name: '평', toBase: 3.305785 },
        sqft: { name: '제곱피트 (ft²)', toBase: 0.092903 },
        sqyd: { name: '제곱야드 (yd²)', toBase: 0.836127 },
        acre: { name: '에이커 (acre)', toBase: 4046.856 },
        hectare: { name: '헥타르 (ha)', toBase: 10000 },
        sqkm: { name: '제곱킬로미터 (km²)', toBase: 1000000 },
        sqmi: { name: '제곱마일 (mi²)', toBase: 2589988 }
    };

    const convert = () => {
        if (!value || isNaN(value)) return '';
        const baseValue = parseFloat(value) * units[fromUnit].toBase;
        const result = baseValue / units[toUnit].toBase;
        return result.toLocaleString('ko-KR', { maximumFractionDigits: 6 });
    };

    const swap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="면적 변환기 - 제곱미터, 평, 에이커 변환"
                description="제곱미터, 평, 제곱피트, 에이커, 헥타르 등 다양한 면적 단위를 간편하게 변환하세요."
                keywords={['면적', '변환', '제곱미터', '평', '에이커', 'area', 'converter']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
                    <Ruler className="w-8 h-8 text-primary" />
                    면적 변환기
                </h1>
                <p className="text-muted-foreground">
                    제곱미터, 평, 에이커 등 다양한 면적 단위 변환
                </p>
            </div>

            <div className="card p-6 space-y-6">
                {/* From */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                        변환할 값
                    </label>
                    <div className="flex gap-3">
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="숫자 입력"
                            className="input flex-1"
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="input w-40"
                        >
                            {Object.entries(units).map(([key, unit]) => (
                                <option key={key} value={key}>{unit.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                    <button
                        onClick={swap}
                        className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                        title="단위 바꾸기"
                    >
                        <ArrowRightLeft className="w-5 h-5" />
                    </button>
                </div>

                {/* To */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                        변환 결과
                    </label>
                    <div className="flex gap-3">
                        <div className="input flex-1 bg-secondary/50 flex items-center font-bold text-lg">
                            {convert() || '0'}
                        </div>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="input w-40"
                        >
                            {Object.entries(units).map(([key, unit]) => (
                                <option key={key} value={key}>{unit.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Quick Reference */}
                <div className="bg-primary/5 rounded-xl p-4 text-sm">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                        💡 참고
                    </h3>
                    <div className="text-muted-foreground space-y-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <p>1평 ≈ 3.3㎡</p>
                        <p>1에이커 ≈ 1,224평</p>
                        <p>1헥타르 ≈ 3,025평</p>
                    </div>
                </div>
            </div>

            <ShareButtons />
        </div>
    );
};

export default AreaConverter;
