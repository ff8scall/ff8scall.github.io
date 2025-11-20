import React, { useState, useRef, useEffect } from 'react';
import { Download } from 'lucide-react';
import JsBarcode from 'jsbarcode';
import SEO from '../components/SEO';

const BarcodeGenerator = () => {
    const [text, setText] = useState('');
    const [format, setFormat] = useState('CODE128');
    const canvasRef = useRef(null);
    const [error, setError] = useState('');

    const formats = [
        { value: 'CODE128', label: 'CODE128 (일반)' },
        { value: 'EAN13', label: 'EAN-13 (13자리 숫자)' },
        { value: 'EAN8', label: 'EAN-8 (8자리 숫자)' },
        { value: 'UPC', label: 'UPC (12자리 숫자)' },
        { value: 'CODE39', label: 'CODE39' },
    ];

    useEffect(() => {
        if (text.trim() && canvasRef.current) {
            try {
                JsBarcode(canvasRef.current, text, {
                    format: format,
                    width: 2,
                    height: 100,
                    displayValue: true,
                    fontSize: 14,
                    margin: 10
                });
                setError('');
            } catch (err) {
                setError('바코드 생성 실패: ' + err.message);
            }
        }
    }, [text, format]);

    const downloadBarcode = () => {
        if (!canvasRef.current) return;

        const link = document.createElement('a');
        link.download = 'barcode.png';
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="바코드 생성기 - Utility Hub"
                description="텍스트나 숫자를 다양한 형식의 바코드로 변환할 수 있습니다. CODE128, EAN-13, UPC 등 지원."
                keywords="바코드, 바코드생성기, CODE128, EAN13, UPC"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">바코드 생성기</h1>
                <p className="text-muted-foreground">
                    텍스트를 바코드로 변환하세요
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        바코드 형식
                    </label>
                    <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {formats.map(f => (
                            <option key={f.value} value={f.value}>{f.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        변환할 텍스트 또는 숫자
                    </label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="예: 1234567890128"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                        {format === 'EAN13' && 'EAN-13: 13자리 숫자를 입력하세요'}
                        {format === 'EAN8' && 'EAN-8: 8자리 숫자를 입력하세요'}
                        {format === 'UPC' && 'UPC: 12자리 숫자를 입력하세요'}
                        {format === 'CODE128' && 'CODE128: 영문, 숫자, 특수문자 사용 가능'}
                        {format === 'CODE39' && 'CODE39: 영문 대문자, 숫자, 일부 특수문자 사용 가능'}
                    </p>
                </div>
            </div>

            {/* Barcode Display */}
            {text.trim() && !error && (
                <div className="bg-card border border-border rounded-xl p-8 space-y-4">
                    <div className="flex justify-center bg-white p-6 rounded-lg">
                        <canvas ref={canvasRef}></canvas>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={downloadBarcode}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all"
                        >
                            <Download className="w-4 h-4" />
                            다운로드
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-center text-red-500">
                    {error}
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>각 바코드 형식마다 입력 가능한 문자와 길이가 다릅니다.</li>
                    <li>EAN-13, EAN-8, UPC는 숫자만 입력 가능하며 정확한 자릿수를 맞춰야 합니다.</li>
                    <li>CODE128은 가장 범용적이며 다양한 문자를 지원합니다.</li>
                    <li>생성된 바코드는 PNG 이미지로 다운로드할 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default BarcodeGenerator;
