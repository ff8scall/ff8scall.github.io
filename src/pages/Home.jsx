import React from 'react';
import { Link } from 'react-router-dom';
import {
    Ruler, Weight, Calculator, Calendar, Type, Coins, Binary,
    Hash, Barcode, Edit, Zap, Palette, GitCompare, CheckSquare,
    FileCode, Globe, Lightbulb, QrCode, Sparkles, Key, Heart, Lock, Clock, Shield,
    TrendingUp, Cake, Code, Timer, Brain, Image as ImageIcon, Youtube, FileText
} from 'lucide-react';
import SEO from '../components/SEO';

const tools = [
    // 생활/금융 (파란색 계열)
    { id: 'loan', title: '대출금 계산기', icon: Calculator, path: '/loan', color: 'bg-blue-500' },
    { id: 'salary-calc', title: '연봉 실수령액', icon: Calculator, path: '/salary-calc', color: 'bg-blue-600' },
    { id: 'work-hours', title: '근무 시간 계산기', icon: Clock, path: '/work-hours', color: 'bg-blue-700' },
    { id: 'compound-interest', title: '복리 계산기', icon: TrendingUp, path: '/compound-interest', color: 'bg-cyan-600' },
    { id: 'currency', title: '환율 변환기', icon: Coins, path: '/currency', color: 'bg-sky-600' },
    { id: 'date', title: 'D-Day 계산기', icon: Calendar, path: '/date', color: 'bg-indigo-600' },
    { id: 'age-calc', title: '만 나이 계산기', icon: Cake, path: '/age-calc', color: 'bg-indigo-700' },
    { id: 'lotto', title: '로또 번호 생성기', icon: Sparkles, path: '/lotto', color: 'bg-violet-600' },

    // 단위 변환 (보라색 계열)
    { id: 'length', title: '길이 변환기', icon: Ruler, path: '/length', color: 'bg-purple-500' },
    { id: 'weight', title: '무게 변환기', icon: Weight, path: '/weight', color: 'bg-purple-600' },

    // 텍스트/개발 (초록색 계열)
    { id: 'word-count', title: '글자수 계산기', icon: Type, path: '/word-count', color: 'bg-green-500' },
    { id: 'string-converter', title: '문자열 변환', icon: Edit, path: '/string-converter', color: 'bg-green-600' },
    { id: 'unicode', title: '유니코드 변환기', icon: Binary, path: '/unicode', color: 'bg-emerald-600' },
    { id: 'base64', title: 'Base64 인코딩', icon: Key, path: '/base64', color: 'bg-emerald-700' },
    { id: 'html-encoder', title: 'HTML 인코딩', icon: Code, path: '/html-encoder', color: 'bg-teal-600' },
    { id: 'hash-gen', title: '해시 생성기', icon: Shield, path: '/hash-gen', color: 'bg-teal-700' },
    { id: 'uuid-gen', title: 'UUID 생성기', icon: Key, path: '/uuid-gen', color: 'bg-lime-700' },
    { id: 'base-converter', title: '진법 변환기', icon: Binary, path: '/base-converter', color: 'bg-green-600' },
    { id: 'json-formatter', title: 'JSON 포맷터', icon: FileCode, path: '/json-formatter', color: 'bg-green-700' },
    { id: 'markdown-editor', title: '마크다운 에디터', icon: FileText, path: '/markdown-editor', color: 'bg-emerald-600' },
    { id: 'html-view', title: 'HTML 포맷터', icon: FileCode, path: '/html-view', color: 'bg-emerald-500' },
    { id: 'diff', title: '코드 비교', icon: GitCompare, path: '/diff', color: 'bg-lime-600' },
    { id: 'web-editor', title: '웹 에디터', icon: Edit, path: '/web-editor', color: 'bg-teal-500' },
    { id: 'ascii-art', title: '아스키아트', icon: Type, path: '/ascii-art', color: 'bg-green-800' },
    { id: 'ascii-table', title: '아스키 코드표', icon: FileCode, path: '/ascii-table', color: 'bg-lime-800' },
    { id: 'special-char', title: '특수문자표', icon: Hash, path: '/special-char', color: 'bg-emerald-800' },

    // 유틸리티 (주황색 계열)
    { id: 'qr-gen', title: 'QR코드 생성기', icon: QrCode, path: '/qr-gen', color: 'bg-orange-500' },
    { id: 'barcode-gen', title: '바코드 생성기', icon: Barcode, path: '/barcode-gen', color: 'bg-orange-600' },
    { id: 'password-gen', title: '비밀번호 생성기', icon: Lock, path: '/password-gen', color: 'bg-red-600' },
    { id: 'color-picker', title: '색상표', icon: Palette, path: '/color-picker', color: 'bg-amber-600' },
    { id: 'image-base64', title: '이미지 Base64', icon: Lightbulb, path: '/image-base64', color: 'bg-yellow-700' },
    { id: 'ip-address', title: 'IP 주소 확인', icon: Globe, path: '/ip-address', color: 'bg-orange-700' },
    { id: 'timer', title: '타이머/스톱워치', icon: Timer, path: '/timer', color: 'bg-amber-700' },
    { id: 'checklist', title: '체크리스트', icon: CheckSquare, path: '/checklist', color: 'bg-yellow-600' },
    { id: 'flashlight', title: '손전등', icon: Zap, path: '/flashlight', color: 'bg-amber-500' },
    { id: 'image-resize', title: '이미지 리사이즈', icon: ImageIcon, path: '/image-resize', color: 'bg-orange-700' },
    { id: 'youtube-thumbnail', title: '유튜브 썸네일', icon: Youtube, path: '/youtube-thumbnail', color: 'bg-red-600' },

    // 재미 (분홍색 계열)
    { id: 'blood-type', title: '혈액형 성격', icon: Heart, path: '/blood-type', color: 'bg-pink-600' },
    { id: 'mbti-test', title: 'MBTI 테스트', icon: Brain, path: '/mbti-test', color: 'bg-pink-700' },
];

const Home = () => {
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

            {/* Tools Grid */}
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {tools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                        <Link
                            key={tool.id}
                            to={tool.path}
                            className={`${tool.color} aspect-square rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-white hover:scale-105 transition-transform shadow-lg hover:shadow-xl group`}
                        >
                            <Icon className="w-12 h-12 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold text-center leading-tight">
                                {tool.title}
                            </span>
                        </Link>
                    );
                })}
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
