import {
    Ruler, Weight, Calculator, Calendar, Type, Coins, Binary,
    Hash, Barcode, Edit, Zap, Palette, GitCompare, CheckSquare,
    FileCode, Globe, Lightbulb, QrCode, Sparkles, Key, Heart, Lock, Clock, Shield,
    TrendingUp, Cake, Code, Timer, Brain, Image as ImageIcon, Youtube, FileText
} from 'lucide-react';

export const tools = [
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
