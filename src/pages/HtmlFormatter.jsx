import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';

const HtmlFormatter = () => {
    const [input, setInput] = useState('');
    const [formatted, setFormatted] = useState('');
    const [copied, setCopied] = useState(false);

    const formatHtml = () => {
        try {
            let html = input.trim();
            let indent = 0;
            const tab = '  ';
            let result = '';

            html = html.replace(/>\s+</g, '><');

            const tokens = html.split(/(<[^>]+>)/g).filter(token => token.trim());

            tokens.forEach(token => {
                if (token.match(/^<\/\w/)) {
                    indent--;
                    result += tab.repeat(Math.max(0, indent)) + token + '\n';
                } else if (token.match(/^<\w[^>]*[^\/]>$/)) {
                    result += tab.repeat(indent) + token + '\n';
                    indent++;
                } else if (token.match(/^<\w[^>]*\/>$/)) {
                    result += tab.repeat(indent) + token + '\n';
                } else if (token.trim()) {
                    result += tab.repeat(indent) + token + '\n';
                }
            });

            setFormatted(result.trim());
        } catch (err) {
            setFormatted('포맷팅 오류: ' + err.message);
        }
    };

    const minifyHtml = () => {
        const minified = input
            .replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .trim();
        setFormatted(minified);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(formatted);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <SEO
                title="HTML 코드 뷰/포맷터 - Utility Hub"
                description="HTML 코드를 보기 좋게 포맷팅하거나 압축할 수 있습니다. 들여쓰기 자동 정렬 기능을 제공합니다."
                keywords="HTML포맷터, HTML정렬, 코드포맷팅, HTML압축"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">HTML 코드 뷰/포맷터</h1>
                <p className="text-muted-foreground">
                    HTML 코드를 정렬하거나 압축하세요
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <label className="block text-sm font-medium">
                        HTML 코드 입력
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="<div><p>Hello World</p></div>"
                        className="w-full h-96 px-4 py-3 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={formatHtml}
                            disabled={!input.trim()}
                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
                        >
                            포맷팅
                        </button>
                        <button
                            onClick={minifyHtml}
                            disabled={!input.trim()}
                            className="flex-1 px-4 py-2 bg-secondary hover:bg-accent rounded-lg transition-colors disabled:opacity-50"
                        >
                            압축
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium">
                            결과
                        </label>
                        {formatted && (
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
                        value={formatted}
                        readOnly
                        placeholder="결과가 여기에 표시됩니다"
                        className="w-full h-96 px-4 py-3 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none"
                    />
                </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>왼쪽에 HTML 코드를 입력하세요.</li>
                    <li>"포맷팅" 버튼: 들여쓰기를 추가하여 코드를 보기 좋게 정렬합니다.</li>
                    <li>"압축" 버튼: 불필요한 공백을 제거하여 코드를 압축합니다.</li>
                    <li>결과를 복사하여 사용할 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default HtmlFormatter;
