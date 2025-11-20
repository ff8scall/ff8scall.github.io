import React, { useState } from 'react';
import { Zap, ZapOff } from 'lucide-react';
import SEO from '../components/SEO';

const Flashlight = () => {
    const [isOn, setIsOn] = useState(false);

    const toggleFlashlight = () => {
        setIsOn(!isOn);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="손전등 - Utility Hub"
                description="화면을 밝게 켜서 손전등처럼 사용할 수 있습니다. 어두운 곳에서 유용합니다."
                keywords="손전등, 플래시라이트, 화면밝기"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Zap className="w-8 h-8 text-yellow-500" />
                    손전등
                </h1>
                <p className="text-muted-foreground">
                    화면을 밝게 켜서 손전등으로 사용하세요
                </p>
            </header>

            {/* Flashlight Display */}
            <div
                className={`rounded-2xl transition-all duration-300 ${isOn
                        ? 'bg-white shadow-2xl'
                        : 'bg-card border border-border'
                    }`}
                style={{
                    minHeight: '400px',
                    boxShadow: isOn ? '0 0 100px 50px rgba(255, 255, 255, 0.5)' : 'none'
                }}
            >
                <div className="flex flex-col items-center justify-center h-full p-12">
                    {isOn ? (
                        <div className="text-center">
                            <Zap className="w-32 h-32 mx-auto mb-6 text-yellow-500 animate-pulse" />
                            <p className="text-2xl font-bold text-gray-800">켜짐</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <ZapOff className="w-32 h-32 mx-auto mb-6 text-muted-foreground" />
                            <p className="text-2xl font-bold text-muted-foreground">꺼짐</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Button */}
            <div className="flex justify-center">
                <button
                    onClick={toggleFlashlight}
                    className={`px-12 py-6 rounded-2xl font-bold text-xl transition-all shadow-lg hover:shadow-xl ${isOn
                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                            : 'bg-primary text-primary-foreground hover:brightness-110'
                        }`}
                >
                    {isOn ? '끄기' : '켜기'}
                </button>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>켜기 버튼을 누르면 화면이 밝게 켜집니다.</li>
                    <li>어두운 곳에서 간단한 조명으로 사용할 수 있습니다.</li>
                    <li>화면 밝기를 최대로 설정하면 더 밝게 사용할 수 있습니다.</li>
                    <li>모바일 기기에서 사용하면 더욱 효과적입니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default Flashlight;
