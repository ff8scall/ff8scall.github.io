import React, { useState } from 'react';
import { Youtube, Download, Image as ImageIcon } from 'lucide-react';
import SEO from '../components/SEO';

const YoutubeThumbnail = () => {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [thumbnails, setThumbnails] = useState([]);

    const extractVideoId = (youtubeUrl) => {
        // 다양한 유튜브 URL 형식 지원
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /youtube\.com\/shorts\/([^&\n?#]+)/
        ];

        for (const pattern of patterns) {
            const match = youtubeUrl.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = extractVideoId(url);

        if (id) {
            setVideoId(id);
            setThumbnails([
                { quality: '최대 해상도', url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`, size: '1280×720' },
                { quality: '고화질', url: `https://img.youtube.com/vi/${id}/sddefault.jpg`, size: '640×480' },
                { quality: '중간 화질', url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`, size: '480×360' },
                { quality: '일반 화질', url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`, size: '320×180' },
                { quality: '저화질', url: `https://img.youtube.com/vi/${id}/default.jpg`, size: '120×90' }
            ]);
        } else {
            alert('유효한 유튜브 URL을 입력해주세요');
        }
    };

    const downloadImage = (imageUrl, quality) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `youtube_thumbnail_${videoId}_${quality}.jpg`;
        link.target = '_blank';
        link.click();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="유튜브 썸네일 다운로더 - Utility Hub"
                description="유튜브 동영상의 썸네일 이미지를 다운로드하세요. 고화질 썸네일을 무료로 저장할 수 있습니다."
                keywords="유튜브 썸네일, 유튜브 이미지 다운, 썸네일 다운로드, youtube thumbnail"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Youtube className="w-8 h-8 text-red-600" />
                    유튜브 썸네일 다운로더
                </h1>
                <p className="text-muted-foreground">
                    유튜브 동영상의 썸네일 이미지를 다운로드하세요
                </p>
            </header>

            {/* Input */}
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">유튜브 URL</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:brightness-110 transition-all"
                >
                    썸네일 가져오기
                </button>
            </form>

            {/* Thumbnails */}
            {thumbnails.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">다운로드 가능한 썸네일</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {thumbnails.map((thumb, idx) => (
                            <div key={idx} className="bg-card border border-border rounded-xl p-4 space-y-3">
                                <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
                                    <img
                                        src={thumb.url}
                                        alt={`Thumbnail ${thumb.quality}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="hidden w-full h-full items-center justify-center text-muted-foreground text-sm">
                                        <ImageIcon className="w-8 h-8" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold">{thumb.quality}</p>
                                        <p className="text-xs text-muted-foreground">{thumb.size}</p>
                                    </div>
                                    <button
                                        onClick={() => downloadImage(thumb.url, thumb.quality)}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        다운로드
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>유튜브 동영상 URL을 복사하여 붙여넣으세요</li>
                    <li>다양한 해상도의 썸네일을 선택할 수 있습니다</li>
                    <li>최대 해상도는 1280×720 (일부 영상은 지원하지 않을 수 있음)</li>
                    <li>모든 공개 유튜브 동영상에서 작동합니다</li>
                </ul>
            </div>
        </div>
    );
};

export default YoutubeThumbnail;
