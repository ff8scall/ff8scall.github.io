import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navCategories = [
        {
            title: '생활/금융',
            items: [
                { path: '/loan', label: '대출금 계산기' },
                { path: '/date', label: 'D-Day 계산기' },
                { path: '/currency', label: '환율 변환기' },
                { path: '/lotto', label: '로또 번호 생성기' },
                { path: '/work-hours', label: '근무 시간 계산기' },
                { path: '/salary-calc', label: '연봉 실수령액' },
                { path: '/compound-interest', label: '복리 계산기' },
                { path: '/age-calc', label: '만 나이 계산기' },
            ]
        },
        {
            title: '단위 변환',
            items: [
                { path: '/length', label: '길이 변환기' },
                { path: '/weight', label: '무게 변환기' },
            ]
        },
        {
            title: '텍스트/개발',
            items: [
                { path: '/word-count', label: '글자수 계산기' },
                { path: '/unicode', label: '유니코드 변환기' },
                { path: '/special-char', label: '특수문자표' },
                { path: '/ascii-table', label: '아스키 코드표' },
                { path: '/string-converter', label: '문자열 변환' },
                { path: '/html-view', label: 'HTML 포맷터' },
                { path: '/diff', label: '코드 비교' },
                { path: '/web-editor', label: '웹 에디터' },
                { path: '/ascii-art', label: '아스키아트' },
                { path: '/base64', label: 'Base64 인코딩' },
                { path: '/json-formatter', label: 'JSON 포맷터' },
                { path: '/hash-gen', label: '해시 생성기' },
                { path: '/html-encoder', label: 'HTML 인코딩' },
                { path: '/uuid-gen', label: 'UUID 생성기' },
                { path: '/base-converter', label: '진법 변환기' },
                { path: '/markdown-editor', label: '마크다운 에디터' },
            ]
        },
        {
            title: '유틸리티',
            items: [
                { path: '/color-picker', label: '색상표' },
                { path: '/ip-address', label: 'IP 주소 확인' },
                { path: '/flashlight', label: '손전등' },
                { path: '/qr-gen', label: 'QR코드 생성기' },
                { path: '/barcode-gen', label: '바코드 생성기' },
                { path: '/checklist', label: '체크리스트' },
                { path: '/image-base64', label: '이미지 Base64' },
                { path: '/password-gen', label: '비밀번호 생성기' },
                { path: '/timer', label: '타이머/스톱워치' },
                { path: '/image-resize', label: '이미지 리사이즈' },
                { path: '/youtube-thumbnail', label: '유튜브 썸네일' },
            ]
        },
        {
            title: '재미',
            items: [
                { path: '/blood-type', label: '혈액형 성격' },
                { path: '/mbti-test', label: 'MBTI 테스트' },
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
            <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
                <div className="container-custom h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                            U
                        </div>
                        <span className="hidden sm:inline">Utility Hub</span>
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
                                <div className="absolute top-full left-0 w-48 bg-card/95 backdrop-blur-md border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
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
            </main>

            {/* Footer */}
            <footer className="border-t border-border py-8 mt-auto bg-muted/30">
                <div className="container-custom text-center text-muted-foreground text-sm">
                    <div className="flex justify-center gap-4 mb-4">
                        <Link to="/terms" className="hover:text-foreground">이용약관</Link>
                        <Link to="/privacy" className="hover:text-foreground">개인정보처리방침</Link>
                        <Link to="/contact" className="hover:text-foreground">문의하기</Link>
                    </div>
                    <p>© 2024 Utility Hub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
