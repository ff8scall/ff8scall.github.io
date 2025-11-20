import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Key } from 'lucide-react';
import SEO from '../components/SEO';

const UuidGenerator = () => {
    const [uuids, setUuids] = useState([]);
    const [count, setCount] = useState(1);
    const [copied, setCopied] = useState('');

    const generateUUIDs = () => {
        const newUuids = [];
        for (let i = 0; i < count; i++) {
            newUuids.push(crypto.randomUUID());
        }
        setUuids(newUuids);
        setCopied('');
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopied(index);
        setTimeout(() => setCopied(''), 1500);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(uuids.join('\n'));
        setCopied('all');
        setTimeout(() => setCopied(''), 1500);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <SEO
                title="UUID/GUID 생성기 - Utility Hub"
                description="고유 식별자 UUID/GUID를 생성하세요. 개발, 데이터베이스, API 등에서 사용할 수 있는 랜덤 UUID를 무료로 생성합니다."
                keywords="UUID 생성, GUID 생성, 고유 식별자, UUID 만들기, GUID 만들기"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Key className="w-8 h-8 text-primary" />
                    UUID/GUID 생성기
                </h1>
                <p className="text-muted-foreground">
                    고유 식별자를 빠르게 생성하세요
                </p>
            </header>

            {/* Controls */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        생성 개수: {count}개
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1개</span>
                        <span>50개</span>
                    </div>
                </div>

                <button
                    onClick={generateUUIDs}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:brightness-110 transition-all"
                >
                    <RefreshCw className="w-5 h-5" />
                    UUID 생성
                </button>
            </div>

            {/* Results */}
            {uuids.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold">생성된 UUID</h3>
                        <button
                            onClick={copyAll}
                            className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-accent rounded-lg transition-colors text-sm"
                        >
                            {copied === 'all' ? (
                                <>
                                    <Check className="w-4 h-4 text-green-500" />
                                    전체 복사됨
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    전체 복사
                                </>
                            )}
                        </button>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {uuids.map((uuid, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 bg-background rounded-lg">
                                <span className="flex-1 font-mono text-sm break-all">{uuid}</span>
                                <button
                                    onClick={() => copyToClipboard(uuid, index)}
                                    className="p-2 hover:bg-secondary rounded-md transition-colors"
                                >
                                    {copied === index ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 UUID란?</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>UUID (Universally Unique Identifier): 범용 고유 식별자</li>
                    <li>128비트 숫자로 구성되며, 중복될 확률이 거의 없습니다</li>
                    <li>데이터베이스 기본 키, API 토큰, 세션 ID 등에 사용됩니다</li>
                    <li>형식: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx (Version 4)</li>
                </ul>
            </div>
        </div>
    );
};

export default UuidGenerator;
