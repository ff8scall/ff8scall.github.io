import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Link, ArrowRightLeft, Copy, Check } from 'lucide-react';

const UrlEncoderDecoder = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
    const [copied, setCopied] = useState(false);

    const handleConvert = () => {
        try {
            if (mode === 'encode') {
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
            }
        } catch (error) {
            setOutput('Error: Invalid input for decoding');
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const switchMode = () => {
        setMode(mode === 'encode' ? 'decode' : 'encode');
        setInput(output);
        setOutput('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="URL 인코더/디코더 - URL Encode & Decode"
                description="URL을 인코딩하거나 디코딩하는 무료 도구입니다. 특수 문자를 안전한 URL 형식으로 변환하세요."
                keywords={['URL 인코더', 'URL 디코더', 'URL encode', 'URL decode', 'percent encoding']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Link className="w-8 h-8 text-blue-500" />
                    URL 인코더/디코더
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    URL을 안전한 형식으로 인코딩하거나 원래 형태로 디코딩하세요.
                </p>
            </div>

            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-start">
                {/* Input Section */}
                <div className="card p-4 space-y-3 h-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        입력 ({mode === 'encode' ? 'Plain Text' : 'Encoded URL'})
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? '인코딩할 텍스트를 입력하세요...' : '디코딩할 URL을 입력하세요...'}
                        className="input w-full h-48 resize-none font-mono text-sm"
                    />
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-3 justify-center h-full py-4">
                    <button
                        onClick={handleConvert}
                        className="btn btn-primary whitespace-nowrap"
                    >
                        {mode === 'encode' ? '인코딩 하기 →' : '디코딩 하기 →'}
                    </button>

                    <button
                        onClick={switchMode}
                        className="btn btn-secondary flex items-center justify-center gap-2"
                        title="모드 전환"
                    >
                        <ArrowRightLeft className="w-4 h-4" />
                        <span className="md:hidden">모드 전환</span>
                    </button>
                </div>

                {/* Output Section */}
                <div className="card p-4 space-y-3 h-full">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            결과 ({mode === 'encode' ? 'Encoded URL' : 'Plain Text'})
                        </label>
                        <button
                            onClick={handleCopy}
                            disabled={!output}
                            className="text-sm text-gray-500 hover:text-blue-500 disabled:opacity-50 flex items-center gap-1"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? '복사됨' : '복사'}
                        </button>
                    </div>
                    <textarea
                        readOnly
                        value={output}
                        placeholder="결과가 여기에 표시됩니다..."
                        className="input w-full h-48 resize-none font-mono text-sm bg-gray-50 dark:bg-gray-800/50"
                    />
                </div>
            </div>

            <div className="card p-6 bg-gray-50 dark:bg-gray-800/50">
                <h3 className="text-lg font-semibold mb-3">💡 URL 인코딩이란?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    URL 인코딩(퍼센트 인코딩)은 URL에서 사용할 수 없는 문자나 의미가 있는 특수 문자를
                    <code>%</code> 뒤에 16진수 값을 붙여 표현하는 방식입니다.
                    예를 들어 공백(Space)은 <code>%20</code>으로, 한글 '가'는 <code>%EA%B0%80</code>로 변환됩니다.
                </p>
            </div>
        </div>
    );
};

export default UrlEncoderDecoder;
