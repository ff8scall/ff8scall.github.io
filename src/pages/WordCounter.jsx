import React, { useState, useEffect } from 'react';
import { Type, Copy, Trash2, FileText } from 'lucide-react';
import SEO from '../components/SEO';

const WordCounter = () => {
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        chars: 0,
        charsNoSpace: 0,
        words: 0,
        lines: 0,
        bytes: 0
    });

    useEffect(() => {
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, '').length;
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        const lines = text === '' ? 0 : text.split(/\n/).length;

        // Simple byte calculation (assuming UTF-8 mostly, but keeping it simple for now)
        const bytes = new Blob([text]).size;

        setStats({ chars, charsNoSpace, words, lines, bytes });
    }, [text]);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
    };

    const handleClear = () => {
        setText('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title="실시간 글자수 계산기"
                description="자기소개서나 문서 작성 시 유용한 실시간 글자수 및 단어수 세기 도구입니다."
                keywords="글자수 세기, 단어수 세기, 공백 제외 글자수, 바이트 계산, 자기소개서 글자수"
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-3">
                    <Type className="w-8 h-8 text-primary" />
                    실시간 글자수 계산기
                </h1>
                <p className="text-text-secondary">
                    글자수, 단어수, 줄수 등을 실시간으로 확인하세요.
                </p>
            </div>

            <div className="grid lg:grid-cols-[1fr,300px] gap-8">
                {/* Input Area */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="flex items-center gap-2 font-medium text-text-secondary">
                            <FileText className="w-4 h-4" />
                            텍스트 입력
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
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="여기에 텍스트를 입력하거나 붙여넣으세요..."
                        className="w-full h-[500px] p-6 rounded-xl bg-bg-background border border-border-color focus:border-primary focus:ring-1 focus:ring-primary/50 resize-none outline-none transition-all text-lg leading-relaxed"
                    />
                </div>

                {/* Stats Sidebar */}
                <div className="space-y-6">
                    <div className="card p-6 space-y-6 sticky top-24">
                        <h3 className="font-bold text-lg border-b border-border-color pb-4">통계</h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-text-secondary">글자수 (공백포함)</span>
                                <span className="font-bold text-xl">{stats.chars.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-text-secondary">글자수 (공백제외)</span>
                                <span className="font-bold text-xl">{stats.charsNoSpace.toLocaleString()}</span>
                            </div>
                            <div className="pt-4 border-t border-border-color space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-text-secondary">단어 수</span>
                                    <span className="font-semibold">{stats.words.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-text-secondary">줄 수</span>
                                    <span className="font-semibold">{stats.lines.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-text-secondary">용량 (Bytes)</span>
                                    <span className="font-semibold">{stats.bytes.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WordCounter;
