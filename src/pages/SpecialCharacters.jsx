import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';

const SpecialCharacters = () => {
    const [copiedChar, setCopiedChar] = useState('');

    const categories = [
        {
            name: '화살표',
            chars: ['←', '→', '↑', '↓', '↔', '↕', '⇐', '⇒', '⇑', '⇓', '⇔', '⇕', '➔', '➜', '➡', '⬅', '⬆', '⬇']
        },
        {
            name: '기호',
            chars: ['※', '◎', '○', '●', '◇', '◆', '□', '■', '△', '▲', '▽', '▼', '☆', '★', '♤', '♠', '♡', '♥', '♧', '♣', '⊙', '◈', '▣']
        },
        {
            name: '수학',
            chars: ['±', '×', '÷', '≠', '≤', '≥', '∞', '∑', '∫', '√', '∂', '∆', '∇', '≈', '≡', '⊂', '⊃', '∈', '∉', '∪', '∩']
        },
        {
            name: '통화',
            chars: ['$', '¢', '£', '¥', '€', '₩', '₽', '₹', '₨', '฿', '₫', '₪', '₱', '₦', '₡']
        },
        {
            name: '단위',
            chars: ['°', '℃', '℉', 'Å', '㎎', '㎏', '㎞', '㎡', '㎥', '㎖', '㎗', '㎘', '㏄', '㏊', '㎝', '㎜', '㎛', '㎚']
        },
        {
            name: '선',
            chars: ['─', '│', '┌', '┐', '└', '┘', '├', '┤', '┬', '┴', '┼', '═', '║', '╔', '╗', '╚', '╝', '╠', '╣', '╦', '╩', '╬']
        },
        {
            name: '괄호',
            chars: ['(', ')', '[', ']', '{', '}', '⟨', '⟩', '「', '」', '『', '』', '【', '】', '〔', '〕', '《', '》']
        },
        {
            name: '특수기호',
            chars: ['©', '®', '™', '§', '¶', '†', '‡', '‰', '′', '″', '№', '℡', '℮', '㏂', '㏘', '♨', '☎', '☏', '✓', '✔', '✕', '✖', '✗', '✘']
        }
    ];

    const copyToClipboard = (char) => {
        navigator.clipboard.writeText(char);
        setCopiedChar(char);
        setTimeout(() => setCopiedChar(''), 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="특수문자표 - Utility Hub"
                description="다양한 특수문자를 한 곳에서 쉽게 복사할 수 있습니다. 화살표, 기호, 수학 기호, 통화 기호 등을 제공합니다."
                keywords="특수문자, 특수기호, 화살표, 수학기호, 통화기호"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">특수문자표</h1>
                <p className="text-muted-foreground">
                    원하는 특수문자를 클릭하여 복사하세요
                </p>
            </header>

            <div className="space-y-6">
                {categories.map((category, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-xl p-6">
                        <h2 className="text-lg font-bold mb-4">{category.name}</h2>
                        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                            {category.chars.map((char, charIdx) => (
                                <button
                                    key={charIdx}
                                    onClick={() => copyToClipboard(char)}
                                    className="aspect-square flex items-center justify-center text-2xl bg-secondary hover:bg-accent rounded-lg transition-colors relative group"
                                    title={`클릭하여 복사: ${char}`}
                                >
                                    {char}
                                    {copiedChar === char && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-lg">
                                            <Check className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>원하는 특수문자를 클릭하면 자동으로 클립보드에 복사됩니다.</li>
                    <li>복사된 문자는 녹색 체크 표시로 확인할 수 있습니다.</li>
                    <li>복사한 문자를 원하는 곳에 붙여넣기(Ctrl+V)하세요.</li>
                </ul>
            </div>
        </div>
    );
};

export default SpecialCharacters;
