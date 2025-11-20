import React, { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';
import SEO from '../components/SEO';

const JsonFormatter = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const formatJson = () => {
        setError('');
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            setOutput(formatted);
        } catch (err) {
            setError('JSON 파싱 실패: ' + err.message);
            setOutput('');
        }
    };

    const minifyJson = () => {
        setError('');
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
        } catch (err) {
            setError('JSON 파싱 실패: ' + err.message);
            setOutput('');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const validateJson = () => {
        setError('');
        try {
            JSON.parse(input);
            setError('');
            setOutput('✅ 유효한 JSON입니다!');
        } catch (err) {
            setError('❌ 유효하지 않은 JSON: ' + err.message);
            setOutput('');
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <SEO
                title="JSON 뷰어/포맷터 - Utility Hub"
                description="JSON 데이터를 보기 좋게 포맷팅하거나 압축할 수 있습니다. JSON 유효성 검사 기능도 제공합니다."
                keywords="JSON, JSON 포맷터, JSON 뷰어, JSON 검증, JSON 압축"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <FileCode className="w-8 h-8" />
                    JSON 뷰어/포맷터
                </h1>
                <p className="text-muted-foreground">
                    JSON 데이터를 포맷팅하고 검증하세요
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <label className="block text-sm font-medium">
                        JSON 입력
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='{"name": "홍길동", "age": 30}'
                        className="w-full h-96 px-4 py-3 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            onClick={formatJson}
                            disabled={!input.trim()}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all disabled:opacity-50 text-sm"
                        >
                            포맷팅
                        </button>
                        <button
                            onClick={minifyJson}
                            disabled={!input.trim()}
                            className="px-4 py-2 bg-secondary hover:bg-accent rounded-lg transition-colors disabled:opacity-50 text-sm"
                        >
                            압축
                        </button>
                        <button
                            onClick={validateJson}
                            disabled={!input.trim()}
                            className="px-4 py-2 bg-secondary hover:bg-accent rounded-lg transition-colors disabled:opacity-50 text-sm"
                        >
                            검증
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium">
                            결과
                        </label>
                        {output && !error && (
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
                        className="w-full h-96 px-4 py-3 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none"
                    />
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                            {error}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>왼쪽에 JSON 데이터를 입력하세요.</li>
                    <li>"포맷팅" 버튼: 들여쓰기를 추가하여 보기 좋게 정렬합니다.</li>
                    <li>"압축" 버튼: 불필요한 공백을 제거하여 데이터 크기를 줄입니다.</li>
                    <li>"검증" 버튼: JSON 형식이 올바른지 확인합니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default JsonFormatter;
