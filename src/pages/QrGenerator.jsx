import React, { useState, useRef } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import QRCode from 'qrcode';
import SEO from '../components/SEO';

const QrGenerator = () => {
    const [text, setText] = useState('');
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const canvasRef = useRef(null);

    const generateQR = async () => {
        if (!text.trim()) return;

        try {
            const dataUrl = await QRCode.toDataURL(text, {
                width: 400,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
            setQrDataUrl(dataUrl);
        } catch (err) {
            console.error('QR 코드 생성 실패:', err);
        }
    };

    const downloadQR = () => {
        if (!qrDataUrl) return;

        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = qrDataUrl;
        link.click();
    };

    const copyToClipboard = async () => {
        if (!qrDataUrl) return;

        try {
            const blob = await (await fetch(qrDataUrl)).blob();
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('복사 실패:', err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="QR코드 생성기 - Utility Hub"
                description="텍스트나 URL을 QR코드로 변환하여 다운로드할 수 있습니다. 무료 QR코드 생성 도구입니다."
                keywords="QR코드, QR생성기, 큐알코드, QRcode"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">QR코드 생성기</h1>
                <p className="text-muted-foreground">
                    텍스트나 URL을 QR코드로 변환하세요
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        변환할 텍스트 또는 URL
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="예: https://example.com 또는 원하는 텍스트를 입력하세요"
                        className="w-full h-32 px-4 py-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <button
                    onClick={generateQR}
                    disabled={!text.trim()}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    QR코드 생성
                </button>
            </div>

            {/* QR Code Display */}
            {qrDataUrl && (
                <div className="bg-card border border-border rounded-xl p-8 space-y-4">
                    <div className="flex justify-center">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <img src={qrDataUrl} alt="QR Code" className="w-64 h-64" />
                        </div>
                    </div>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={downloadQR}
                            className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-accent rounded-lg transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            다운로드
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-accent rounded-lg transition-colors"
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
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>URL, 텍스트, 전화번호, 이메일 등 다양한 정보를 QR코드로 변환할 수 있습니다.</li>
                    <li>생성된 QR코드는 PNG 이미지로 다운로드하거나 클립보드에 복사할 수 있습니다.</li>
                    <li>모바일 기기의 카메라로 QR코드를 스캔하여 정보를 확인할 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default QrGenerator;
