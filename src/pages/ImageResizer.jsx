import React, { useState } from 'react';
import { Image as ImageIcon, Download, Upload } from 'lucide-react';
import SEO from '../components/SEO';

const ImageResizer = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [resizedImage, setResizedImage] = useState(null);
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);
    const [quality, setQuality] = useState(80);
    const [maintainRatio, setMaintainRatio] = useState(true);
    const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setOriginalDimensions({ width: img.width, height: img.height });
                    setWidth(img.width);
                    setHeight(img.height);
                };
                img.src = event.target.result;
                setOriginalImage(event.target.result);
                setResizedImage(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleResize = () => {
        if (!originalImage) return;

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const resized = canvas.toDataURL('image/jpeg', quality / 100);
            setResizedImage(resized);
        };
        img.src = originalImage;
    };

    const handleWidthChange = (newWidth) => {
        setWidth(newWidth);
        if (maintainRatio && originalDimensions.width > 0) {
            const ratio = originalDimensions.height / originalDimensions.width;
            setHeight(Math.round(newWidth * ratio));
        }
    };

    const handleHeightChange = (newHeight) => {
        setHeight(newHeight);
        if (maintainRatio && originalDimensions.height > 0) {
            const ratio = originalDimensions.width / originalDimensions.height;
            setWidth(Math.round(newHeight * ratio));
        }
    };

    const downloadImage = () => {
        if (!resizedImage) return;
        const link = document.createElement('a');
        link.href = resizedImage;
        link.download = `resized_${width}x${height}.jpg`;
        link.click();
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <SEO
                title="이미지 리사이즈/압축 - Utility Hub"
                description="이미지 크기를 조절하고 용량을 줄이세요. 온라인에서 무료로 사진 리사이즈 및 압축이 가능합니다."
                keywords="이미지 리사이즈, 사진 크기 줄이기, 이미지 압축, 용량 줄이기, 이미지 크기 조절"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <ImageIcon className="w-8 h-8 text-primary" />
                    이미지 리사이즈 & 압축
                </h1>
                <p className="text-muted-foreground">
                    이미지 크기를 조절하고 용량을 줄이세요
                </p>
            </header>

            {/* Upload */}
            <div className="bg-card border border-border rounded-xl p-6">
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <Upload className="w-12 h-12 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">이미지를 선택하거나 드래그하세요</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </label>
            </div>

            {originalImage && (
                <>
                    {/* Settings */}
                    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                        <h3 className="font-bold text-lg">설정</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">너비 (px)</label>
                                <input
                                    type="number"
                                    value={width}
                                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">높이 (px)</label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="ratio"
                                checked={maintainRatio}
                                onChange={(e) => setMaintainRatio(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <label htmlFor="ratio" className="text-sm">비율 유지</label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                품질: {quality}%
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="100"
                                value={quality}
                                onChange={(e) => setQuality(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <button
                            onClick={handleResize}
                            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:brightness-110 transition-all"
                        >
                            리사이즈 실행
                        </button>
                    </div>

                    {/* Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="font-bold mb-3">원본</h3>
                            <img src={originalImage} alt="Original" className="w-full rounded-lg" />
                            <p className="text-sm text-muted-foreground mt-2">
                                {originalDimensions.width} × {originalDimensions.height}
                            </p>
                        </div>

                        {resizedImage && (
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h3 className="font-bold mb-3">리사이즈 결과</h3>
                                <img src={resizedImage} alt="Resized" className="w-full rounded-lg" />
                                <p className="text-sm text-muted-foreground mt-2">
                                    {width} × {height}
                                </p>
                                <button
                                    onClick={downloadImage}
                                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:brightness-110 transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                    다운로드
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>모든 처리는 브라우저에서 이루어지며, 서버에 업로드되지 않습니다</li>
                    <li>품질을 낮추면 파일 용량이 줄어듭니다</li>
                    <li>비율 유지를 체크하면 원본 비율이 유지됩니다</li>
                </ul>
            </div>
        </div>
    );
};

export default ImageResizer;
