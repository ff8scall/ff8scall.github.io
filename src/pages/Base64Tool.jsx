import React, { useState } from 'react';
import { Copy, Check, ArrowRightLeft } from 'lucide-react';
import SEO from '../components/SEO';

const Base64Tool = () => {
    const [mode, setMode] = useState('encode'); // encode or decode
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleConvert = () => {
        setError('');
        try {
            if (mode === 'encode') {
                const encoded = btoa(unescape(encodeURIComponent(input)));
                setOutput(encoded);
            } else {
                const decoded = decodeURIComponent(escape(atob(input)));
                setOutput(decoded);
            }
        } catch (err) {
            setError(mode === 'encode' ? '인코딩 실패: 입력값을 확인하세요.' : '디코딩 실패: 올바른 Base64 문자열이 아닙니다.');
            setOutput('');
        }
    };

    const handleSwap = () => {
        setMode(mode === 'encode' ? 'decode' : 'encode');
        setInput(output);
        setOutput(input);
        setError('');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="Base64 인코딩/디코딩 - Utility Hub"
                description="텍스트를 Base64로 인코딩하거나 Base64 문자열을 디코딩할 수 있습니다."
                keywords="Base64, 인코딩, 디코딩, Base64 변환, Base64 인코더"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Base64 인코딩/디코딩</h1>
                <p className="text-muted-foreground">
                    텍스트를 Base64로 변환하거나 Base64를 텍스트로 변환하세요
                </p>
            </header>

            {/* Mode Toggle */}
            <div className="flex justify-center gap-2">
                <button
                    onClick={() => setMode('encode')}
                    className={`px-6 py-3 rounded-lg font-bold transition-all ${mode === 'encode'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-accent'
                        }`}
                >
                    인코딩
                </button>
                <button
                    onClick={handleSwap}
                    className="p-3 rounded-lg bg-secondary hover:bg-accent transition-colors"
                    title="입력/출력 바꾸기"
                >
                    <ArrowRightLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setMode('decode')}
                    className={`px-6 py-3 rounded-lg font-bold transition-all ${mode === 'decode'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-accent'
                        }`}
                >
                    디코딩
                </button>
            </div>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <label className="block text-sm font-medium">
                    {mode === 'encode' ? '원본 텍스트' : 'Base64 문자열'}
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === 'encode' ? '인코딩할 텍스트를 입력하세요...' : '디코딩할 Base64 문자열을 입력하세요...'}
                    className="w-full h-48 px-4 py-3 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={handleConvert}
                    disabled={!input.trim()}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:brightness-110 transition-all disabled:opacity-50"
                >
                    {mode === 'encode' ? '인코딩' : '디코딩'}
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-center text-red-500">
                    {error}
                </div>
            )}

            {/* Output */}
            {output && !error && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium">
                            {mode === 'encode' ? 'Base64 결과' : '디코딩 결과'}
                        </label>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-accent rounded-lg transition-colors text-sm"
                        >
                            {copied ? (
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
                    <textarea
                        value={output}
                        readOnly
                        className="w-full h-48 px-4 py-3 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none"
                    />
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>인코딩: 일반 텍스트를 Base64 문자열로 변환합니다.</li>
                    <li>디코딩: Base64 문자열을 원본 텍스트로 변환합니다.</li>
                    <li>한글, 영문, 특수문자 모두 지원합니다.</li>
                    <li>이메일, API 통신 등에서 데이터를 인코딩할 때 유용합니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default Base64Tool;
