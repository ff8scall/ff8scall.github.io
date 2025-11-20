import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';

const AsciiTable = () => {
    const [copiedCode, setCopiedCode] = useState('');

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedCode(text);
        setTimeout(() => setCopiedCode(''), 1500);
    };

    // ASCII 코드 범위: 32-126 (출력 가능한 문자)
    const asciiCodes = [];
    for (let i = 32; i <= 126; i++) {
        asciiCodes.push({
            dec: i,
            hex: i.toString(16).toUpperCase(),
            char: String.fromCharCode(i),
            description: getCharDescription(i)
        });
    }

    function getCharDescription(code) {
        if (code === 32) return 'Space';
        if (code >= 48 && code <= 57) return 'Digit';
        if (code >= 65 && code <= 90) return 'Uppercase';
        if (code >= 97 && code <= 122) return 'Lowercase';
        return 'Symbol';
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <SEO
                title="아스키 코드표 - Utility Hub"
                description="ASCII 코드표를 확인하고 복사할 수 있습니다. 10진수, 16진수, 문자를 한눈에 볼 수 있습니다."
                keywords="ASCII, 아스키코드, 문자코드, 16진수, 10진수"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">아스키 코드표</h1>
                <p className="text-muted-foreground">
                    ASCII 코드와 문자 대응표
                </p>
            </header>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left font-bold">10진수</th>
                                <th className="px-4 py-3 text-left font-bold">16진수</th>
                                <th className="px-4 py-3 text-left font-bold">문자</th>
                                <th className="px-4 py-3 text-left font-bold">설명</th>
                                <th className="px-4 py-3 text-left font-bold">복사</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {asciiCodes.map((item) => (
                                <tr key={item.dec} className="hover:bg-accent/50 transition-colors">
                                    <td className="px-4 py-3 font-mono">{item.dec}</td>
                                    <td className="px-4 py-3 font-mono">0x{item.hex}</td>
                                    <td className="px-4 py-3 text-xl font-bold text-center">
                                        {item.char === ' ' ? '␣' : item.char}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{item.description}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => copyToClipboard(item.char)}
                                            className="p-2 hover:bg-secondary rounded-md transition-colors"
                                            title="문자 복사"
                                        >
                                            {copiedCode === item.char ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>ASCII 코드는 0-127까지 정의되어 있으며, 32-126은 출력 가능한 문자입니다.</li>
                    <li>10진수: 일반적으로 사용하는 숫자 체계</li>
                    <li>16진수: 프로그래밍에서 자주 사용하는 숫자 체계 (0x 접두사)</li>
                    <li>복사 버튼을 클릭하면 해당 문자가 클립보드에 복사됩니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default AsciiTable;
