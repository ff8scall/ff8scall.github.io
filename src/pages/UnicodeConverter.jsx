import React, { useState } from 'react';
import { Binary, ArrowRightLeft, Copy, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';

const UnicodeConverter = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' (Text -> Unicode), 'decode' (Unicode -> Text)

    const convert = (text, currentMode) => {
        if (!text) {
            setOutput('');
            return;
        }

        try {
            if (currentMode === 'encode') {
                // Text to Unicode
                let result = '';
                for (let i = 0; i < text.length; i++) {
                    result += '\\u' + text.charCodeAt(i).toString(16).padStart(4, '0');
                }
                setOutput(result);
            } else {
                // Unicode to Text
                // Replace \uXXXX with actual characters
                const result = text.replace(/\\u[\dA-F]{4}/gi, (match) => {
                    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
                });
                setOutput(result);
            }
        } catch (e) {
            setOutput('변환 중 오류가 발생했습니다.');
        }
    };

    const handleInputChange = (e) => {
        const text = e.target.value;
        setInput(text);
        convert(text, mode);
    };

    const handleModeToggle = () => {
        const newMode = mode === 'encode' ? 'decode' : 'encode';
        setMode(newMode);
        // Swap input and output for convenience
        setInput(output);
        convert(output, newMode);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title="유니코드 변환기"
                description="텍스트를 유니코드로 변환하거나 유니코드를 텍스트로 변환하는 개발자 도구입니다."
                keywords="유니코드 변환, 유니코드 인코딩, 유니코드 디코딩, 텍스트 변환, 개발자 도구"
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-3">
                    <Binary className="w-8 h-8 text-primary" />
                    유니코드 변환기
                </h1>
                <p className="text-text-secondary">
                    텍스트와 유니코드 이스케이프 시퀀스(\uXXXX) 간의 변환을 수행합니다.
                </p>
            </div>

            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-start">
                {/* Input Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-secondary">
                        {mode === 'encode' ? '일반 텍스트 (입력)' : '유니코드 (입력)'}
                    </label>
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        placeholder={mode === 'encode' ? '안녕하세요' : '\\uC548\\uB155\\uD558\\uC138\\uC694'}
                        className="w-full h-[300px] p-4 rounded-xl bg-bg-background border border-border-color focus:border-primary focus:ring-1 focus:ring-primary/50 resize-none outline-none transition-all font-mono text-sm"
                    />
                </div>

                {/* Controls */}
                <div className="flex md:flex-col gap-2 justify-center h-full py-8">
                    <button
                        onClick={handleModeToggle}
                        className="p-3 rounded-full hover:bg-bg-card-hover text-primary transition-colors"
                        title={mode === 'encode' ? '디코딩 모드로 전환' : '인코딩 모드로 전환'}
                    >
                        <ArrowRightLeft className="w-6 h-6" />
                    </button>
                </div>

                {/* Output Section */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-text-secondary">
                            {mode === 'encode' ? '유니코드 (결과)' : '일반 텍스트 (결과)'}
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-lg hover:bg-bg-card-hover text-text-secondary hover:text-primary transition-colors"
                                title="복사하기"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleClear}
                                className="p-2 rounded-lg hover:bg-bg-card-hover text-text-secondary hover:text-red-400 transition-colors"
                                title="지우기"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        className="w-full h-[300px] p-4 rounded-xl bg-bg-card border border-border-color resize-none outline-none font-mono text-sm text-text-secondary"
                    />
                </div>
            </div>
        </div>
    );
};

export default UnicodeConverter;
