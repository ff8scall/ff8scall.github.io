import React, { useState, useEffect } from 'react';
import { Utensils, RefreshCw, Share2, Check, ThumbsUp, ThumbsDown, MapPin, History, Filter, X } from 'lucide-react';
import SEO from '../components/SEO';
import { lunchMenu, foodCategories } from '../data/lunchData';

const LunchRecommender = () => {
    // State
    const [selectedCategories, setSelectedCategories] = useState(['korean', 'chinese', 'japanese', 'western', 'snack']);
    const [filters, setFilters] = useState({ noSpicy: false, soupOnly: false });
    const [result, setResult] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(null);
    const [showCopied, setShowCopied] = useState(false);

    // Personalization State (Persisted)
    const [likes, setLikes] = useState(() => JSON.parse(localStorage.getItem('lunch_likes') || '[]'));
    const [dislikes, setDislikes] = useState(() => JSON.parse(localStorage.getItem('lunch_dislikes') || '[]'));
    const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('lunch_history') || '[]'));

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('lunch_likes', JSON.stringify(likes));
        localStorage.setItem('lunch_dislikes', JSON.stringify(dislikes));
        localStorage.setItem('lunch_history', JSON.stringify(history));
    }, [likes, dislikes, history]);

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            if (selectedCategories.length === 1) return;
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const toggleFilter = (key) => {
        setFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const selectAll = () => {
        if (selectedCategories.length === Object.keys(foodCategories).length) {
            setSelectedCategories(['korean']);
        } else {
            setSelectedCategories(Object.keys(foodCategories));
        }
    };

    const handleLike = (id) => {
        if (likes.includes(id)) {
            setLikes(likes.filter(item => item !== id));
        } else {
            setLikes([...likes, id]);
            setDislikes(dislikes.filter(item => item !== id)); // Remove from dislike if liked
        }
    };

    const handleDislike = (id) => {
        if (dislikes.includes(id)) {
            setDislikes(dislikes.filter(item => item !== id));
        } else {
            setDislikes([...dislikes, id]);
            setLikes(likes.filter(item => item !== id)); // Remove from like if disliked
        }
    };

    const recommendMenu = () => {
        if (isSpinning) return;

        // Filter candidates
        let candidates = lunchMenu.filter(item => {
            // 1. Category check
            if (!selectedCategories.includes(item.category)) return false;
            // 2. Filter check
            if (filters.noSpicy && item.tags.includes('spicy')) return false;
            if (filters.soupOnly && !item.tags.includes('soup')) return false;
            // 3. Dislike check (exclude disliked items)
            if (dislikes.includes(item.id)) return false;
            return true;
        });

        if (candidates.length === 0) {
            alert('조건에 맞는 메뉴가 없습니다. 필터를 조정해보세요!');
            return;
        }

        // Boost liked items (add them again to increase probability)
        const boostedCandidates = [...candidates];
        candidates.forEach(item => {
            if (likes.includes(item.id)) {
                boostedCandidates.push(item);
                boostedCandidates.push(item); // 3x chance
            }
        });

        setIsSpinning(true);
        setResult(null);

        // Animation
        let count = 0;
        const maxCount = 20;
        const interval = setInterval(() => {
            const randomIdx = Math.floor(Math.random() * candidates.length); // Use original candidates for animation variety
            setDisplayMenu(candidates[randomIdx]);
            count++;

            if (count >= maxCount) {
                clearInterval(interval);
                const finalChoice = boostedCandidates[Math.floor(Math.random() * boostedCandidates.length)];
                setDisplayMenu(finalChoice);
                setResult(finalChoice);
                setIsSpinning(false);

                // Add to history
                setHistory(prev => {
                    const newHistory = [finalChoice, ...prev.filter(h => h.id !== finalChoice.id)].slice(0, 5);
                    return newHistory;
                });
            }
        }, 80);
    };

    const copyToClipboard = () => {
        if (!result) return;
        const message = `오늘 점심 메뉴는 [${result.name}] 어때요?`;
        navigator.clipboard.writeText(message);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
    };

    const openMapSearch = () => {
        if (!result) return;
        const query = encodeURIComponent(result.name + ' 맛집');
        // Open Naver Map search (or Google/Kakao)
        window.open(`https://map.naver.com/v5/search/${query}`, '_blank');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-12">
            <SEO
                title="점심 메뉴 추천기"
                description="오늘 점심 뭐 먹을지 고민되시나요? 개인화된 추천으로 딱 맞는 메뉴를 찾아보세요!"
                keywords="점심메뉴, 메뉴추천, 점심, 메뉴, 랜덤, 맛집"
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
                    <Utensils className="w-8 h-8 text-primary" />
                    점심 메뉴 추천기
                </h1>
                <p className="text-muted-foreground">
                    오늘 점심 뭐 먹을지 고민되시나요? 취향에 딱 맞는 메뉴를 골라드릴게요!
                </p>
            </div>

            <div className="card p-6 space-y-6">
                {/* Controls Section */}
                <div className="space-y-4">
                    {/* Categories */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-muted-foreground">카테고리</label>
                            <button onClick={selectAll} className="text-xs text-primary hover:underline">
                                {selectedCategories.length === Object.keys(foodCategories).length ? '전체 해제' : '전체 선택'}
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(foodCategories).map(([key, value]) => (
                                <button
                                    key={key}
                                    onClick={() => toggleCategory(key)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${selectedCategories.includes(key)
                                            ? value.color + ' shadow-sm'
                                            : 'bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary'
                                        }`}
                                >
                                    {value.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-3 pt-2 border-t border-border/50">
                        <button
                            onClick={() => toggleFilter('noSpicy')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filters.noSpicy ? 'bg-red-100 text-red-700 border-red-200' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                                }`}
                        >
                            <Filter className="w-3 h-3" />
                            매운거 제외
                        </button>
                        <button
                            onClick={() => toggleFilter('soupOnly')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filters.soupOnly ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                                }`}
                        >
                            <Filter className="w-3 h-3" />
                            국물 요리만
                        </button>
                    </div>
                </div>

                {/* Display Area */}
                <div className="relative min-h-[240px] flex flex-col items-center justify-center bg-secondary/20 border-2 border-dashed border-border rounded-2xl p-6 overflow-hidden">
                    {displayMenu ? (
                        <div className={`text-center space-y-4 transition-all duration-300 ${result ? 'scale-100' : 'scale-95 opacity-80'}`}>
                            <div className="text-6xl mb-2 animate-bounce-slow">{displayMenu.icon}</div>
                            <div>
                                <h2 className="text-3xl font-bold text-foreground mb-2">{displayMenu.name}</h2>
                                {result && (
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto animate-in fade-in slide-in-from-bottom-2">
                                        {displayMenu.description}
                                    </p>
                                )}
                            </div>

                            {/* Tags */}
                            {result && (
                                <div className="flex justify-center gap-2 pt-2">
                                    {displayMenu.tags.map(tag => (
                                        <span key={tag} className="text-[10px] uppercase px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <Utensils className="w-12 h-12 mx-auto mb-2 opacity-20" />
                            <p>오늘 뭐 먹지?</p>
                        </div>
                    )}

                    {result && (
                        <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full animate-pulse">
                                추천 완료!
                            </span>
                        </div>
                    )}
                </div>

                {/* Result Actions */}
                {result && (
                    <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                        <button
                            onClick={() => handleLike(result.id)}
                            className={`p-3 rounded-full transition-colors ${likes.includes(result.id) ? 'bg-green-100 text-green-600' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
                            title="좋아요 (더 자주 나옴)"
                        >
                            <ThumbsUp className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => handleDislike(result.id)}
                            className={`p-3 rounded-full transition-colors ${dislikes.includes(result.id) ? 'bg-red-100 text-red-600' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
                            title="싫어요 (안 나옴)"
                        >
                            <ThumbsDown className="w-5 h-5" />
                        </button>
                        <div className="w-px h-10 bg-border mx-2"></div>
                        <button
                            onClick={openMapSearch}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors shadow-sm"
                        >
                            <MapPin className="w-4 h-4" />
                            맛집 검색
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-colors"
                        >
                            {showCopied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                            공유
                        </button>
                    </div>
                )}

                {/* Main Action Button */}
                <button
                    onClick={recommendMenu}
                    disabled={isSpinning}
                    className="w-full btn btn-primary py-4 text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                    <RefreshCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
                    {isSpinning ? '고르는 중...' : '메뉴 추천받기'}
                </button>
            </div>

            {/* History Section */}
            {history.length > 0 && (
                <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground px-1">
                        <History className="w-4 h-4" />
                        최근 추천 기록
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {history.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="flex-shrink-0 w-24 bg-card border border-border rounded-xl p-3 text-center text-xs space-y-1">
                                <div className="text-xl">{item.icon}</div>
                                <div className="font-medium truncate">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LunchRecommender;
