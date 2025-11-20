import React from 'react';
import { Link } from 'react-router-dom';
import { tools } from '../data/tools';
import SEO from '../components/SEO';
import { Sparkles, TrendingUp, Zap, Star, Wand2 } from 'lucide-react';

const Home = () => {
    // Featured tools configuration
    const featuredTools = [
        {
            id: 'zodiac',
            title: '2025년 띠별 운세',
            description: '을사년 나의 신년운세 확인하기',
            path: '/zodiac-fortune',
            color: 'from-purple-500 to-indigo-500',
            icon: Star,
            badges: ['NEW', '인기']
        },
        {
            id: 'tarot',
            title: '타로 카드',
            description: '오늘의 운세와 연애운 점치기',
            path: '/tarot',
            color: 'from-pink-500 to-rose-500',
            icon: Wand2,
            badges: ['NEW', '추천']
        },
        {
            id: 'saju',
            title: '사주팔자 2.0',
            description: '정통 명리학 기반 운세 분석',
            path: '/saju',
            color: 'from-blue-500 to-cyan-500',
            icon: Sparkles,
            badges: ['BEST']
        }
    ];

    return (
        <div className="space-y-8">
            <SEO
                title="Utility Hub - 온라인 도구 모음"
                description="일상생활과 업무에 필요한 39가지 유용한 온라인 도구를 무료로 제공합니다. 단위 변환, 계산기, 텍스트 도구, 개발 도구 등."
                keywords="온라인도구, 유틸리티, 변환기, 계산기, 개발도구, MBTI 테스트, 이미지 리사이즈, 마크다운 에디터"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "url": "https://ff8scall.github.io/utility-hub/",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://ff8scall.github.io/utility-hub/#/search?q={search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
                }}
            />

            {/* Hero Section */}
            <section className="text-center space-y-4 py-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    온라인 도구 모음
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    일상생활과 업무에 필요한 {tools.length}가지 유용한 도구를 한곳에서 만나보세요
                </p>
            </section>

            {/* Featured Tools Section */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-primary" />
                        주요 기능
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {featuredTools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                            <Link
                                key={tool.id}
                                to={tool.path}
                                className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all hover:scale-[1.02] focus:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-primary/50"
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity`} />

                                {/* Content */}
                                <div className="relative space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} text-white`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex flex-wrap gap-1 justify-end">
                                            {tool.badges.map((badge) => (
                                                <span
                                                    key={badge}
                                                    className={`text-xs px-2 py-1 rounded-full font-bold ${badge === 'NEW'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                        : badge === '인기'
                                                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                        }`}
                                                >
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">{tool.title}</h3>
                                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                                    </div>
                                    <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                                        자세히 보기
                                        <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* All Tools Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">모든 도구</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {tools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                            <Link
                                key={tool.id}
                                to={tool.path}
                                className={`${tool.color} aspect-square rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-white hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl group`}
                            >
                                <Icon className="w-12 h-12 group-hover:scale-110 group-focus:scale-110 transition-transform" />
                                <span className="text-sm font-bold text-center leading-tight">
                                    {tool.title}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Info Section */}
            <section className="bg-muted/30 rounded-2xl p-8 text-center space-y-4">
                <h2 className="text-2xl font-bold">무료로 사용 가능한 온라인 도구</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                    별도의 설치나 회원가입 없이 브라우저에서 바로 사용할 수 있습니다.
                    모든 도구는 무료이며, 모바일에서도 최적화되어 있습니다.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <div className="px-6 py-3 bg-card border border-border rounded-lg">
                        <div className="text-2xl font-bold text-primary">{tools.length}+</div>
                        <div className="text-sm text-muted-foreground">도구</div>
                    </div>
                    <div className="px-6 py-3 bg-card border border-border rounded-lg">
                        <div className="text-2xl font-bold text-primary">100%</div>
                        <div className="text-sm text-muted-foreground">무료</div>
                    </div>
                    <div className="px-6 py-3 bg-card border border-border rounded-lg">
                        <div className="text-2xl font-bold text-primary">24/7</div>
                        <div className="text-sm text-muted-foreground">언제나</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
