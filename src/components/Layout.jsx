import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X, ChevronDown, Search, Activity, Sparkles, Code, Calculator, Type, Image, Gamepad2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';
import RelatedTools from './RelatedTools';
import Logo from './Logo';

const Layout = ({ children }) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Keyboard shortcut for search (Ctrl+K)
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const navCategories = [
        {
            title: '단위 변환',
            items: [
                { path: '/length', label: '길이 변환기' },
                { path: '/weight', label: '무게 변환기' },
                { path: '/temperature', label: '온도 변환기' },
            ]
        },
        {
            title: '생활/금융',
            items: [
                { path: '/loan', label: '대출금 계산기' },
                { path: '/currency', label: '환율 계산기' },
                { path: '/age', label: '나이 계산기' },
                { path: '/date-calc', label: '날짜 계산기' },
                { path: '/compound-interest', label: '복리 계산기' },
                { path: '/work-hours', label: '근무시간 계산기' },
            ]
        },
        {
            title: '건강',
            items: [
                { path: '/bmi', label: 'BMI 계산기' },
                { path: '/bmr', label: 'BMR 계산기' },
                { path: '/biorhythm', label: '바이오리듬' },
            ]
        },
        {
            title: '게임',
            items: [
                { path: '/reaction-test', label: '반응속도 테스트' },
                { path: '/typing-test', label: '타자 속도 테스트' },
                { path: '/1to50', label: '1 to 50' },
                { path: '/cps-test', label: 'CPS 테스트' },
                { path: '/aim-trainer', label: '에임 트레이너' },
                { path: '/number-memory', label: '숫자 기억하기' },
                { path: '/number-baseball', label: '숫자 야구' },
                { path: '/minesweeper', label: '지뢰찾기' },
                { path: '/roulette', label: '돌림판 돌리기' },
                { path: '/ladder-game', label: '사다리 타기' },
            ]
        },
        {
            title: '텍스트',
            items: [
                { path: '/word-counter', label: '글자수 세기' },
                { path: '/case-converter', label: '대소문자 변환' },
                { path: '/unicode', label: '유니코드 변환' },
            ]
        },
        {
            title: '개발자 도구',
            items: [
                { path: '/base-converter', label: '진법 변환기' },
                { path: '/json-formatter', label: 'JSON 포맷터' },
                { path: '/markdown-editor', label: '마크다운 에디터' },
                { path: '/html-formatter', label: 'HTML 포맷터' },
                { path: '/diff-checker', label: '코드 비교' },
                { path: '/web-editor', label: '웹 에디터' },
                { path: '/hash-gen', label: '해시 생성기' },
                { path: '/uuid-gen', label: 'UUID 생성기' },
                { path: '/url-encoder', label: 'URL 인코더/디코더' },
                { path: '/jwt-decoder', label: 'JWT 디코더' },
                { path: '/regex-tester', label: '정규식 테스터' },
                { path: '/cron-generator', label: 'CRON 생성기' },
                { path: '/csv-json', label: 'CSV ↔ JSON' },
                { path: '/base64', label: 'Base64 인코더' },
                { path: '/ascii-art', label: '아스키아트' },
                { path: '/ascii-table', label: '아스키 코드표' },
                { path: '/special-char', label: '특수문자표' },
            ]
        },
        {
            title: '유틸리티',
            items: [
                { path: '/qr-gen', label: 'QR코드 생성기' },
                { path: '/barcode-gen', label: '바코드 생성기' },
                { path: '/password-gen', label: '비밀번호 생성기' },
                { path: '/color-picker', label: '색상표' },
                { path: '/ip-address', label: 'IP 주소 확인' },
                { path: '/flashlight', label: '손전등' },
                { path: '/checklist', label: '체크리스트' },
                { path: '/timer', label: '타이머/스톱워치' },
                { path: '/pomodoro', label: '뽀모도로 타이머' },
                { path: '/image-resize', label: '이미지 리사이저' },
                { path: '/image-base64', label: '이미지 Base64' },
                { path: '/youtube-thumbnail', label: '유튜브 썸네일' },
            ]
        },
        {
            title: '운세/재미',
            items: [
                { path: '/blood-type', label: '혈액형 성격' },
                { path: '/mbti-test', label: 'MBTI 테스트' },
                { path: '/saju', label: '사주팔자' },
                { path: '/saju-compatibility', label: '궁합보기' },
                { path: '/birth-gen', label: '생년월일 생성기' },
                { path: '/name-analysis', label: '이름 분석' },
                { path: '/horoscope', label: '별자리 운세' },
                { path: '/tarot', label: '타로카드' },
                { path: '/lotto', label: '로또 번호 생성기' },
            ]
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
            {/* Skip to content link for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
            >
                본문으로 건너뛰기
            </a>

            {/* Header */}
            <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm supports-[backdrop-filter]:bg-background/60">

                <div className="container-custom h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="hover:opacity-90 transition-opacity">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">홈</Link>

                        {navCategories.map((category) => (
                            <div key={category.title} className="relative group">
                                <button
                                    type="button"
                                    className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors py-2"
                                >
                                    {category.title}
                                    <ChevronDown className="w-3 h-3" />
                                </button>
                                {/* Dropdown */}
                                <div className="absolute top-full left-0 w-48 bg-white dark:bg-gray-950 border border-border rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                                    <div className="py-1">
                                        {category.items.map((item) => (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="검색"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <ThemeToggle />

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-md hover:bg-accent"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-b border-border bg-background">
                    <div className="container-custom py-4 space-y-4">
                        <Link
                            to="/"
                            className="block text-sm font-medium py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            홈
                        </Link>
                        {navCategories.map((category) => (
                            <div key={category.title} className="space-y-2">
                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                    {category.title}
                                </div>
                                <div className="pl-4 space-y-1 border-l-2 border-border">
                                    {category.items.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="block text-sm py-2 text-muted-foreground hover:text-foreground"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main id="main-content" className="flex-1 container-custom py-8">
                {children}
                {location.pathname !== '/' && <RelatedTools />}
            </main>

            {/* Footer */}
            <footer className="border-t border-border py-8 mt-auto bg-muted/30">
                <div className="container-custom text-center text-muted-foreground text-sm">
                    <div className="flex justify-center gap-4 mb-4">
                        <Link to="/terms" className="hover:text-foreground">이용약관</Link>
                        <Link to="/privacy" className="hover:text-foreground">개인정보처리방침</Link>
                        <Link to="/contact" className="hover:text-foreground">문의하기</Link>
                    </div>
                    <p>© {new Date().getFullYear()} Utility Hub. All rights reserved.</p>
                </div>
            </footer>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
    );
};

export default Layout;
