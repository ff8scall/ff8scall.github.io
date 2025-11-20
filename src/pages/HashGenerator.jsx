import React, { useState } from 'react';
import { Copy, Check, Shield } from 'lucide-react';
import CryptoJS from 'crypto-js';
import SEO from '../components/SEO';

const HashGenerator = () => {
    const [input, setInput] = useState('');
    const [copied, setCopied] = useState('');

    const hashes = {
        'MD5': CryptoJS.MD5(input).toString(),
        'SHA-1': CryptoJS.SHA1(input).toString(),
        'SHA-256': CryptoJS.SHA256(input).toString(),
        'SHA-512': CryptoJS.SHA512(input).toString(),
        'SHA3-256': CryptoJS.SHA3(input, { outputLength: 256 }).toString(),
        'SHA3-512': CryptoJS.SHA3(input, { outputLength: 512 }).toString(),
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(''), 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="해시 생성기 (MD5, SHA-256) - Utility Hub"
                description="텍스트를 MD5, SHA-1, SHA-256, SHA-512 등 다양한 해시값으로 변환하세요. 암호화 해시 생성 도구."
                keywords="해시 생성기, MD5, SHA256, SHA512, 암호화, 해시값"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Shield className="w-8 h-8 text-primary" />
                    해시 생성기
                </h1>
                <p className="text-muted-foreground">
                    텍스트를 다양한 해시 알고리즘으로 변환하세요
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <label className="block text-sm font-medium">
                    변환할 텍스트
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="해시로 변환할 텍스트를 입력하세요..."
                    className="w-full h-32 px-4 py-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Hash Results */}
            {input && (
                <div className="space-y-3">
                    {Object.entries(hashes).map(([algorithm, hash]) => (
                        <div key={algorithm} className="bg-card border border-border rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-sm">{algorithm}</h3>
                                <button
                                    onClick={() => copyToClipboard(hash, algorithm)}
                                    className="flex items-center gap-2 px-3 py-1 text-sm bg-secondary hover:bg-accent rounded-md transition-colors"
                                >
                                    {copied === algorithm ? (
                                        <>
                                            <Check className="w-4 h-4 text-green-500" />
                                            복사됨
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            복사
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="p-3 bg-background rounded-lg font-mono text-xs break-all">
                                {hash}
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">
                                길이: {hash.length} 문자
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 해시 알고리즘 설명</h3>
                <ul className="space-y-2">
                    <li>
                        <strong className="text-foreground">MD5:</strong> 128비트 해시. 빠르지만 보안에 취약하여 파일 무결성 검증용으로만 사용 권장
                    </li>
                    <li>
                        <strong className="text-foreground">SHA-1:</strong> 160비트 해시. MD5보다 안전하지만 현재는 권장되지 않음
                    </li>
                    <li>
                        <strong className="text-foreground">SHA-256:</strong> 256비트 해시. 현재 가장 널리 사용되는 안전한 해시 알고리즘
                    </li>
                    <li>
                        <strong className="text-foreground">SHA-512:</strong> 512비트 해시. SHA-256보다 더 강력한 보안
                    </li>
                    <li>
                        <strong className="text-foreground">SHA3:</strong> 최신 해시 알고리즘. Keccak 기반으로 설계됨
                    </li>
                </ul>
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
                    <p className="text-yellow-600 dark:text-yellow-400 font-bold">⚠️ 주의사항</p>
                    <p className="mt-1">해시는 단방향 암호화입니다. 해시값으로 원본 텍스트를 복원할 수 없습니다.</p>
                </div>
            </div>
        </div>
    );
};

export default HashGenerator;
