import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';

const StringConverter = () => {
    const [input, setInput] = useState('');
    const [copied, setCopied] = useState('');

    const conversions = [
        {
            name: '대문자',
            convert: (str) => str.toUpperCase()
        },
        {
            name: '소문자',
            convert: (str) => str.toLowerCase()
        },
        {
            name: '첫 글자만 대문자',
            convert: (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        },
        {
            name: '각 단어 첫 글자 대문자',
            convert: (str) => str.replace(/\b\w/g, c => c.toUpperCase())
        },
        {
            name: '공백 제거',
            convert: (str) => str.replace(/\s+/g, '')
        },
        {
            name: '앞뒤 공백 제거',
            convert: (str) => str.trim()
        },
        {
            name: '줄바꿈 제거',
            convert: (str) => str.replace(/\n/g, ' ')
        },
        {
            name: '역순',
            convert: (str) => str.split('').reverse().join('')
        }
    ];

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(''), 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="문자열 변환 - Utility Hub"
                description="텍스트를 대문자, 소문자로 변환하거나 공백을 제거하는 등 다양한 문자열 변환 기능을 제공합니다."
                keywords="문자열변환, 대소문자변환, 공백제거, 텍스트변환"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">문자열 변환</h1>
                <p className="text-muted-foreground">
                    다양한 방식으로 텍스트를 변환하세요
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6">
                <label className="block text-sm font-medium mb-2">
                    변환할 텍스트
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="여기에 텍스트를 입력하세요..."
                    className="w-full h-32 px-4 py-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Conversions */}
            {input && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conversions.map((conv, idx) => {
                        const result = conv.convert(input);
                        return (
                            <div key={idx} className="bg-card border border-border rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-sm">{conv.name}</h3>
                                    <button
                                        onClick={() => copyToClipboard(result, conv.name)}
                                        className="p-2 hover:bg-secondary rounded-md transition-colors"
                                        title="복사"
                                    >
                                        {copied === conv.name ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                <div className="p-3 bg-secondary rounded-lg text-sm break-all">
                                    {result || '(결과 없음)'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>텍스트를 입력하면 자동으로 다양한 형식으로 변환됩니다.</li>
                    <li>각 변환 결과 옆의 복사 버튼을 클릭하여 클립보드에 복사할 수 있습니다.</li>
                    <li>프로그래밍, 문서 작성 등 다양한 용도로 활용할 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default StringConverter;
