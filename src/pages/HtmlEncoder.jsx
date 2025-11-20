import React, { useState } from 'react';
import { Copy, Check, Code, ArrowRightLeft } from 'lucide-react';
import SEO from '../components/SEO';

const HtmlEncoder = () => {
    const [mode, setMode] = useState('encode');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const htmlEntities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
    };

    const encodeHtml = (text) => {
        return text.replace(/[&<>"'\/]/g, (char) => htmlEntities[char]);
    };

    const decodeHtml = (text) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    };

    const handleConvert = () => {
        if (mode === 'encode') {
            setOutput(encodeHtml(input));
        } else {
            setOutput(decodeHtml(input));
        }
    };

    const handleSwap = () => {
        setMode(mode === 'encode' ? 'decode' : 'encode');
        setInput(output);
        setOutput(input);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="HTML 인코딩/디코딩 - Utility Hub"
                description="HTML 특수문자를 인코딩하거나 디코딩하세요. &lt; &gt; &amp; 등의 HTML 엔티티 변환 도구."
                keywords="HTML 인코딩, HTML 디코딩, HTML 특수문자, HTML 이스케이프, HTML 엔티티"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Code className="w-8 h-8 text-primary" />
                    HTML 인코딩/디코딩
                </h1>
                <p className="text-muted-foreground">
                    HTML 특수문자를 안전하게 변환하세요
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <label className="block text-sm font-medium">
                        {mode === 'encode' ? '원본 HTML' : 'HTML 엔티티'}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? '<div>Hello & Welcome</div>' : '&lt;div&gt;Hello &amp; Welcome&lt;/div&gt;'}
                        className="w-full h-64 px-4 py-3 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        onClick={handleConvert}
                        disabled={!input.trim()}
                        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:brightness-110 transition-all disabled:opacity-50"
                    >
                        {mode === 'encode' ? '인코딩' : '디코딩'}
                    </button>
                </div>

                {/* Output */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium">
                            {mode === 'encode' ? 'HTML 엔티티' : '원본 HTML'}
                        </label>
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-3 py-1 text-sm bg-secondary hover:bg-accent rounded-md transition-colors"
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
                        )}
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="결과가 여기에 표시됩니다"
                        className="w-full h-64 px-4 py-3 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none"
                    />
                </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 주요 HTML 엔티티</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-2 bg-secondary rounded">
                        <code>&amp;</code> → <code>&amp;amp;</code>
                    </div>
                    <div className="p-2 bg-secondary rounded">
                        <code>&lt;</code> → <code>&amp;lt;</code>
                    </div>
                    <div className="p-2 bg-secondary rounded">
                        <code>&gt;</code> → <code>&amp;gt;</code>
                    </div>
                    <div className="p-2 bg-secondary rounded">
                        <code>"</code> → <code>&amp;quot;</code>
                    </div>
                    <div className="p-2 bg-secondary rounded">
                        <code>'</code> → <code>&amp;#39;</code>
                    </div>
                    <div className="p-2 bg-secondary rounded">
                        <code>/</code> → <code>&amp;#x2F;</code>
                    </div>
                </div>
                <p className="mt-4">
                    HTML 인코딩은 XSS(Cross-Site Scripting) 공격을 방지하고 HTML 코드를 안전하게 표시하는 데 사용됩니다.
                </p>
            </div>
        </div>
    );
};

export default HtmlEncoder;
