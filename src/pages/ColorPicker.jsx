import React, { useState } from 'react';
import { Copy, Check, Palette } from 'lucide-react';
import SEO from '../components/SEO';

const ColorPicker = () => {
    const [color, setColor] = useState('#3b82f6');
    const [copiedValue, setCopiedValue] = useState('');

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const rgbToHsl = (r, g, b) => {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const rgb = hexToRgb(color);
    const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopiedValue(label);
        setTimeout(() => setCopiedValue(''), 1500);
    };

    const presetColors = [
        '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
        '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
        '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#000000',
        '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb', '#ffffff'
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <SEO
                title="색상표 - Utility Hub"
                description="색상 코드를 HEX, RGB, HSL 형식으로 변환하고 복사할 수 있습니다. 색상 선택기를 통해 원하는 색상을 쉽게 찾아보세요."
                keywords="색상표, 컬러피커, HEX, RGB, HSL, 색상코드"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Palette className="w-8 h-8" />
                    색상표
                </h1>
                <p className="text-muted-foreground">
                    색상 코드 변환 및 복사
                </p>
            </header>

            {/* Color Picker */}
            <div className="bg-card border border-border rounded-xl p-8 space-y-6">
                <div className="flex flex-col items-center gap-4">
                    <div
                        className="w-48 h-48 rounded-2xl shadow-xl border-4 border-white dark:border-gray-800"
                        style={{ backgroundColor: color }}
                    />
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full h-16 rounded-lg cursor-pointer"
                    />
                </div>

                {/* Color Codes */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                        <div>
                            <div className="text-sm text-muted-foreground">HEX</div>
                            <div className="font-mono font-bold text-lg">{color.toUpperCase()}</div>
                        </div>
                        <button
                            onClick={() => copyToClipboard(color.toUpperCase(), 'HEX')}
                            className="p-2 hover:bg-accent rounded-md transition-colors"
                        >
                            {copiedValue === 'HEX' ? (
                                <Check className="w-5 h-5 text-green-500" />
                            ) : (
                                <Copy className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {rgb && (
                        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                            <div>
                                <div className="text-sm text-muted-foreground">RGB</div>
                                <div className="font-mono font-bold text-lg">
                                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                                </div>
                            </div>
                            <button
                                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'RGB')}
                                className="p-2 hover:bg-accent rounded-md transition-colors"
                            >
                                {copiedValue === 'RGB' ? (
                                    <Check className="w-5 h-5 text-green-500" />
                                ) : (
                                    <Copy className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    )}

                    {hsl && (
                        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                            <div>
                                <div className="text-sm text-muted-foreground">HSL</div>
                                <div className="font-mono font-bold text-lg">
                                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                                </div>
                            </div>
                            <button
                                onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'HSL')}
                                className="p-2 hover:bg-accent rounded-md transition-colors"
                            >
                                {copiedValue === 'HSL' ? (
                                    <Check className="w-5 h-5 text-green-500" />
                                ) : (
                                    <Copy className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Preset Colors */}
            <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4">프리셋 색상</h2>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
                    {presetColors.map((presetColor, idx) => (
                        <button
                            key={idx}
                            onClick={() => setColor(presetColor)}
                            className="aspect-square rounded-lg shadow-md hover:scale-110 transition-transform border-2 border-transparent hover:border-primary"
                            style={{ backgroundColor: presetColor }}
                            title={presetColor}
                        />
                    ))}
                </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>색상 선택기를 드래그하거나 프리셋 색상을 클릭하여 색상을 선택하세요.</li>
                    <li>HEX, RGB, HSL 형식으로 자동 변환됩니다.</li>
                    <li>복사 버튼을 클릭하여 원하는 형식의 색상 코드를 복사할 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default ColorPicker;
