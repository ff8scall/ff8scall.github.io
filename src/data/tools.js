import {
    Calculator, Type, FileText, Code, Image, Palette, Clock, Globe,
    Lock, Hash, QrCode, List, Calendar, Search, Moon, Star, Wand2, Sparkles,
    CloudRain, Activity, Flame, Zap, Keyboard, Gamepad2, DollarSign,
    Heart, Brain, Scroll, Gift, PenTool, Timer, CheckSquare, Lightbulb,
    Binary, FileCode, Edit, GitCompare, Barcode, Youtube, ImageIcon,
    Ruler, Weight, FileDigit, Key, Thermometer, Link, Trophy, MousePointer2, Crosshair, Target, Bomb, Disc, GitCommit,
    ArrowLeftRight, FileJson, Droplet, Gauge, Percent, Divide, Dices, Utensils
} from 'lucide-react';

export const toolCategories = {
    unit: '단위 변환',
    finance: '생활/금융',
    text: '텍스트',
    dev: '개발',
    utility: '유틸리티',
    health: '건강',
    games: '게임',
    fun: '운세/재미'
};

export const tools = [
    // Unit Converters
    {
        id: 'length',
        title: '길이 변환기',
        description: '미터, 피트, 인치 등 길이 단위 변환',
        path: '/length',
        category: 'unit',
        icon: Ruler,
        color: 'bg-sky-500',
        keywords: ['길이', '단위', '미터', '피트', 'length', 'converter']
    },
    {
        id: 'weight',
        title: '무게 변환기',
        description: '킬로그램, 파운드 등 무게 단위 변환',
        path: '/weight',
        category: 'unit',
        icon: Weight,
        color: 'bg-sky-600',
        keywords: ['무게', '단위', '킬로그램', '파운드', 'weight', 'converter']
    },
    {
        id: 'currency',
        title: '환율 계산기',
        description: '실시간 환율 변환 및 계산',
        path: '/currency',
        category: 'unit',
        icon: DollarSign,
        color: 'bg-sky-700',
        keywords: ['환율', '통화', '달러', 'currency', 'exchange']
    },
    {
        id: 'temperature-converter',
        title: '온도 변환기',
        description: '섭씨, 화씨, 켈빈 온도 변환',
        path: '/temperature-converter',
        category: 'unit',
        icon: Thermometer,
        color: 'bg-red-500',
        keywords: ['온도', '섭씨', '화씨', '켈빈', 'temperature', 'converter']
    },
    {
        id: 'lunch',
        title: '점심 메뉴 추천기',
        description: '오늘 뭐 먹지? 점심 메뉴 랜덤 추천',
        path: '/lunch',
        category: 'fun',
        icon: Utensils,
        color: 'bg-orange-500',
        keywords: ['점심', '메뉴', '추천', '랜덤', 'lunch', 'food']
    },

    // Health
    {
        id: 'bmi',
        title: 'BMI 계산기',
        description: '체질량 지수 계산 및 건강 상태 확인',
        path: '/bmi',
        category: 'health',
        icon: Activity,
        color: 'bg-green-500',
        keywords: ['bmi', '체질량', '비만도', '건강', 'health']
    },
    {
        id: 'bmr',
        title: 'BMR 계산기',
        description: '기초대사량 및 하루 권장 칼로리 계산',
        path: '/bmr',
        category: 'health',
        icon: Flame,
        color: 'bg-orange-500',
        keywords: ['bmr', '기초대사량', '칼로리', 'tdee', 'diet']
    },

    // Games
    {
        id: 'reaction-test',
        title: '반응속도 테스트',
        description: '나의 순발력은 몇 ms? 반응속도 측정 게임',
        path: '/reaction-test',
        category: 'games',
        icon: Zap,
        color: 'bg-yellow-500',
        keywords: ['반응속도', '순발력', '게임', 'reaction', 'test']
    },
    {
        id: 'typing-test',
        title: '타자 속도 테스트',
        description: '한글/영어 타자 속도(WPM)와 정확도 측정',
        path: '/typing-test',
        category: 'games',
        icon: Keyboard,
        color: 'bg-indigo-500',
        keywords: ['타자', '영타', '한타', 'wpm', 'typing', 'test', '한글', '영어']
    },
    {
        id: 'one-to-fifty',
        title: '1 to 50',
        description: '1부터 50까지 빠르게 터치하기',
        path: '/one-to-fifty',
        category: 'games',
        icon: Trophy,
        color: 'bg-yellow-500',
        keywords: ['1to50', 'game', 'speed', 'touch']
    },
    {
        id: 'cps-test',
        title: 'CPS 테스트',
        description: '초당 마우스 클릭 속도 측정',
        path: '/cps-test',
        category: 'games',
        icon: MousePointer2,
        color: 'bg-blue-500',
        keywords: ['cps', 'click', 'speed', 'test']
    },
    {
        id: 'aim-trainer',
        title: '에임 트레이너',
        description: '마우스 정확도 및 반응속도 훈련',
        path: '/aim-trainer',
        category: 'games',
        icon: Crosshair,
        color: 'bg-red-500',
        keywords: ['aim', 'fps', 'training', 'mouse']
    },
    {
        id: 'number-memory',
        title: '숫자 기억하기',
        description: '순간 기억력 테스트 (침팬지 테스트)',
        path: '/number-memory',
        category: 'games',
        icon: Brain,
        color: 'bg-pink-500',
        keywords: ['memory', 'number', 'brain', 'test']
    },
    {
        id: 'number-baseball',
        title: '숫자 야구',
        description: '숫자와 위치를 맞추는 추리 게임',
        path: '/number-baseball',
        category: 'games',
        icon: Target,
        color: 'bg-green-500',
        keywords: ['baseball', 'number', 'game', 'bulls', 'cows']
    },
    {
        id: 'minesweeper',
        title: '지뢰찾기',
        description: '지뢰를 피해 모든 칸을 여는 퍼즐',
        path: '/minesweeper',
        category: 'games',
        icon: Bomb,
        color: 'bg-gray-600',
        keywords: ['minesweeper', 'mine', 'puzzle', 'game']
    },
    {
        id: 'roulette',
        title: '돌림판 돌리기',
        description: '랜덤 추첨을 위한 룰렛 게임',
        path: '/roulette',
        category: 'games',
        icon: Disc,
        color: 'bg-purple-500',
        keywords: ['roulette', 'random', 'choice', 'game']
    },
    {
        id: 'ladder-game',
        title: '사다리 타기',
        description: '내기할 때 좋은 사다리 게임',
        path: '/ladder-game',
        category: 'games',
        icon: GitCommit,
        color: 'bg-green-600',
        keywords: ['ladder', 'random', 'game', 'bet']
    },

    // Finance/Life
    {
        id: 'loan',
        title: '대출금 계산기',
        description: '원리금 균등상환 방식의 대출 이자 계산',
        path: '/loan',
        category: 'finance',
        icon: Calculator,
        color: 'bg-blue-500',
        keywords: ['대출', '이자', '원리금', '상환', 'loan']
    },
    {
        id: 'salary',
        title: '연봉 실수령액',
        description: '4대 보험과 세금을 제외한 실수령액 계산',
        path: '/salary-calc',
        category: 'finance',
        icon: DollarSign,
        color: 'bg-green-600',
        keywords: ['연봉', '실수령액', '세금', '4대보험', 'salary']
    },
    {
        id: 'compound-interest',
        title: '복리 계산기',
        description: '복리 이자 및 투자 수익 계산',
        path: '/compound-interest',
        category: 'finance',
        icon: Calculator,
        color: 'bg-blue-600',
        keywords: ['복리', '이자', '투자', '수익', 'compound', 'interest']
    },
    {
        id: 'work-hours',
        title: '근무시간 계산기',
        description: '근무 시간 및 급여 계산',
        path: '/work-hours',
        category: 'finance',
        icon: Clock,
        color: 'bg-blue-700',
        keywords: ['근무시간', '급여', '시급', 'work', 'hours']
    },
    {
        id: 'age-calc',
        title: '나이 계산기',
        description: '만 나이, 연 나이 계산',
        path: '/age-calc',
        category: 'finance',
        icon: Calendar,
        color: 'bg-cyan-600',
        keywords: ['나이', '만나이', '연나이', 'age', 'calculator']
    },
    {
        id: 'date',
        title: '날짜 계산기',
        description: '날짜 차이 및 D-day 계산',
        path: '/date',
        category: 'finance',
        icon: Calendar,
        color: 'bg-cyan-500',
        keywords: ['날짜', 'dday', '디데이', 'date', 'calculator']
    },

    // Text Tools
    {
        id: 'word-count',
        title: '글자 수 세기',
        description: '글자, 단어, 문장 수 계산',
        path: '/word-count',
        category: 'text',
        icon: FileText,
        color: 'bg-violet-500',
        keywords: ['글자수', '단어수', 'word', 'count', 'character']
    },
    {
        id: 'unicode',
        title: '유니코드 변환기',
        description: '텍스트와 유니코드 상호 변환',
        path: '/unicode',
        category: 'text',
        icon: Code,
        color: 'bg-violet-600',
        keywords: ['유니코드', 'unicode', 'converter', 'text']
    },
    {
        id: 'string-converter',
        title: '문자열 변환기',
        description: '대소문자, 카멜케이스 등 변환',
        path: '/string-converter',
        category: 'text',
        icon: Type,
        color: 'bg-violet-700',
        keywords: ['문자열', 'string', 'case', 'converter']
    },
    {
        id: 'base64',
        title: 'Base64 도구',
        description: 'Base64 인코딩 및 디코딩',
        path: '/base64',
        category: 'text',
        icon: FileDigit,
        color: 'bg-purple-600',
        keywords: ['base64', 'encode', 'decode', 'text']
    },
    {
        id: 'html-encoder',
        title: 'HTML 인코더',
        description: 'HTML 엔티티 인코딩/디코딩',
        path: '/html-encoder',
        category: 'text',
        icon: Code,
        color: 'bg-purple-700',
        keywords: ['html', 'encoder', 'entity', 'escape']
    },

    // Dev Tools
    {
        id: 'base-converter',
        title: '진법 변환기',
        description: '2진수, 8진수, 10진수, 16진수 변환',
        path: '/base-converter',
        category: 'dev',
        icon: Binary,
        color: 'bg-green-600',
        keywords: ['진법', 'binary', 'hex', 'decimal']
    },
    {
        id: 'json-formatter',
        title: 'JSON 포맷터',
        description: 'JSON 데이터 정리 및 검증',
        path: '/json-formatter',
        category: 'dev',
        icon: FileCode,
        color: 'bg-green-700',
        keywords: ['json', 'formatter', 'validator']
    },
    {
        id: 'markdown-editor',
        title: '마크다운 에디터',
        description: '실시간 미리보기 마크다운 편집기',
        path: '/markdown-editor',
        category: 'dev',
        icon: FileText,
        color: 'bg-emerald-600',
        keywords: ['markdown', 'editor', 'preview']
    },
    {
        id: 'html-view',
        title: 'HTML 포맷터',
        description: 'HTML 코드 정리 및 미리보기',
        path: '/html-view',
        category: 'dev',
        icon: FileCode,
        color: 'bg-emerald-500',
        keywords: ['html', 'formatter', 'preview']
    },
    {
        id: 'diff',
        title: '코드 비교',
        description: '두 텍스트/코드의 차이점 비교',
        path: '/diff',
        category: 'dev',
        icon: GitCompare,
        color: 'bg-lime-600',
        keywords: ['diff', 'compare', 'code']
    },
    {
        id: 'web-editor',
        title: '웹 에디터',
        description: 'HTML/CSS/JS 실시간 편집 및 미리보기',
        path: '/web-editor',
        category: 'dev',
        icon: Edit,
        color: 'bg-teal-500',
        keywords: ['web', 'editor', 'html', 'css', 'javascript']
    },
    {
        id: 'hash-gen',
        title: '해시 생성기',
        description: 'MD5, SHA-1, SHA-256 등 해시 생성',
        path: '/hash-gen',
        category: 'dev',
        icon: Hash,
        color: 'bg-teal-600',
        keywords: ['hash', 'md5', 'sha', 'generator']
    },
    {
        id: 'uuid-gen',
        title: 'UUID 생성기',
        description: 'UUID v4 생성',
        path: '/uuid-gen',
        category: 'dev',
        icon: Key,
        color: 'bg-teal-700',
        keywords: ['uuid', 'guid', 'generator', 'unique']
    },
    {
        id: 'url-encoder',
        title: 'URL 인코더/디코더',
        description: 'URL 인코딩 및 디코딩',
        path: '/url-encoder',
        category: 'dev',
        icon: Link,
        color: 'bg-blue-500',
        keywords: ['url', 'encoder', 'decoder', 'encode', 'decode']
    },
    {
        id: 'jwt-decoder',
        title: 'JWT 디코더',
        description: 'JWT 토큰 디코딩 및 확인',
        path: '/jwt-decoder',
        category: 'dev',
        icon: Key,
        color: 'bg-yellow-500',
        keywords: ['jwt', 'decoder', 'token', 'json', 'web']
    },
    {
        id: 'regex-tester',
        title: '정규식 테스터',
        description: '정규표현식 테스트 및 검증',
        path: '/regex-tester',
        category: 'dev',
        icon: Search,
        color: 'bg-purple-500',
        keywords: ['regex', 'regular', 'expression', 'tester']
    },
    {
        id: 'ascii-art',
        title: '아스키아트',
        description: '텍스트를 아스키 아트로 변환',
        path: '/ascii-art',
        category: 'dev',
        icon: Type,
        color: 'bg-green-800',
        keywords: ['ascii', 'art', 'text']
    },
    {
        id: 'ascii-table',
        title: '아스키 코드표',
        description: 'ASCII 코드 참조표',
        path: '/ascii-table',
        category: 'dev',
        icon: FileCode,
        color: 'bg-lime-800',
        keywords: ['ascii', 'table', 'code']
    },
    {
        id: 'special-char',
        title: '특수문자표',
        description: '자주 쓰는 특수문자 모음',
        path: '/special-char',
        category: 'dev',
        icon: Hash,
        color: 'bg-emerald-800',
        keywords: ['special', 'character', 'symbol']
    },
    {
        id: 'cron-generator',
        title: 'CRON 표현식 생성기',
        description: 'CRON 스케줄링 표현식 생성',
        path: '/cron-generator',
        category: 'dev',
        icon: Clock,
        color: 'bg-blue-600',
        keywords: ['cron', 'schedule', 'expression', 'generator', '스케줄']
    },
    {
        id: 'csv-json',
        title: 'CSV ↔ JSON 변환기',
        description: 'CSV와 JSON 상호 변환',
        path: '/csv-json',
        category: 'dev',
        icon: ArrowLeftRight,
        color: 'bg-purple-600',
        keywords: ['csv', 'json', 'converter', '변환', 'data']
    },

    // Utility
    {
        id: 'qr-gen',
        title: 'QR코드 생성기',
        description: 'URL이나 텍스트를 QR코드로 변환',
        path: '/qr-gen',
        category: 'utility',
        icon: QrCode,
        color: 'bg-orange-500',
        keywords: ['qr', 'code', 'generator']
    },
    {
        id: 'barcode-gen',
        title: '바코드 생성기',
        description: '숫자를 바코드로 변환',
        path: '/barcode-gen',
        category: 'utility',
        icon: Barcode,
        color: 'bg-orange-600',
        keywords: ['barcode', 'generator']
    },
    {
        id: 'password-gen',
        title: '비밀번호 생성기',
        description: '안전한 랜덤 비밀번호 생성',
        path: '/password-gen',
        category: 'utility',
        icon: Lock,
        color: 'bg-red-600',
        keywords: ['password', 'generator', 'random']
    },
    {
        id: 'color-picker',
        title: '색상표',
        description: '컬러 피커 및 색상 코드 변환',
        path: '/color-picker',
        category: 'utility',
        icon: Palette,
        color: 'bg-amber-600',
        keywords: ['color', 'picker', 'hex', 'rgb']
    },
    {
        id: 'image-base64',
        title: '이미지 Base64',
        description: '이미지를 Base64로 인코딩',
        path: '/image-base64',
        category: 'utility',
        icon: Lightbulb,
        color: 'bg-yellow-700',
        keywords: ['image', 'base64', 'encode']
    },
    {
        id: 'ip-address',
        title: 'IP 주소 확인',
        description: '내 IP 주소 및 위치 정보 확인',
        path: '/ip-address',
        category: 'utility',
        icon: Globe,
        color: 'bg-orange-700',
        keywords: ['ip', 'address', 'location']
    },
    {
        id: 'timer',
        title: '타이머/스톱워치',
        description: '온라인 타이머 및 스톱워치',
        path: '/timer',
        category: 'utility',
        icon: Timer,
        color: 'bg-amber-700',
        keywords: ['timer', 'stopwatch', 'alarm']
    },
    {
        id: 'pomodoro-timer',
        title: '포모도로 타이머',
        description: '25분 집중/5분 휴식 타이머',
        path: '/pomodoro-timer',
        category: 'utility',
        icon: Timer,
        color: 'bg-red-500',
        keywords: ['pomodoro', 'timer', 'focus', 'study']
    },
    {
        id: 'checklist',
        title: '체크리스트',
        description: '간단한 할 일 목록',
        path: '/checklist',
        category: 'utility',
        icon: CheckSquare,
        color: 'bg-yellow-600',
        keywords: ['checklist', 'todo', 'task']
    },
    {
        id: 'flashlight',
        title: '손전등',
        description: '화면을 밝게 켜서 손전등으로 사용',
        path: '/flashlight',
        category: 'utility',
        icon: Zap,
        color: 'bg-amber-500',
        keywords: ['flashlight', 'light', 'torch']
    },
    {
        id: 'image-resize',
        title: '이미지 리사이즈',
        description: '이미지 크기 조절 및 압축',
        path: '/image-resize',
        category: 'utility',
        icon: ImageIcon,
        color: 'bg-orange-700',
        keywords: ['image', 'resize', 'compress']
    },
    {
        id: 'youtube-thumbnail',
        title: '유튜브 썸네일',
        description: '유튜브 영상 썸네일 다운로드',
        path: '/youtube-thumbnail',
        category: 'utility',
        icon: Youtube,
        color: 'bg-red-600',
        keywords: ['youtube', 'thumbnail', 'download']
    },

    // Fun/Fortune
    {
        id: 'blood-type',
        title: '혈액형 성격',
        description: '혈액형별 성격 분석',
        path: '/blood-type',
        category: 'fun',
        icon: Heart,
        color: 'bg-pink-600',
        keywords: ['혈액형', 'blood', 'type', 'personality']
    },
    {
        id: 'mbti-test',
        title: 'MBTI 테스트',
        description: '간단한 MBTI 성격 유형 검사',
        path: '/mbti-test',
        category: 'fun',
        icon: Brain,
        color: 'bg-pink-700',
        keywords: ['mbti', 'personality', 'test']
    },
    {
        id: 'saju',
        title: '무료 만세력',
        description: '생년월일로 사주팔자 확인',
        path: '/saju',
        category: 'fun',
        icon: Scroll,
        color: 'bg-pink-800',
        keywords: ['사주', 'saju', '만세력', 'fortune']
    },
    {
        id: 'zodiac-fortune',
        title: '띠별 운세',
        description: '12띠 오늘의 운세',
        path: '/zodiac-fortune',
        category: 'fun',
        icon: Star,
        color: 'bg-purple-700',
        keywords: ['띠', 'zodiac', 'fortune', '운세']
    },
    {
        id: 'horoscope',
        title: '별자리 운세',
        description: '12별자리 오늘의 운세',
        path: '/horoscope',
        category: 'fun',
        icon: Moon,
        color: 'bg-indigo-600',
        keywords: ['별자리', 'horoscope', 'fortune']
    },
    {
        id: 'dream-interpretation',
        title: '꿈해몽',
        description: '꿈 내용으로 해몽 검색',
        path: '/dream-interpretation',
        category: 'fun',
        icon: CloudRain,
        color: 'bg-indigo-500',
        keywords: ['꿈', 'dream', '해몽', 'interpretation']
    },
    {
        id: 'name-analysis',
        title: '성명학',
        description: '이름 획수로 운세 분석',
        path: '/name-analysis',
        category: 'fun',
        icon: PenTool,
        color: 'bg-indigo-600',
        keywords: ['이름', 'name', '성명학', 'fortune']
    },
    {
        id: 'biorhythm',
        title: '바이오리듬',
        description: '신체/감성/지성 리듬 확인',
        path: '/biorhythm',
        category: 'fun',
        icon: Activity,
        color: 'bg-green-600',
        keywords: ['바이오리듬', 'biorhythm', 'cycle']
    },
    {
        id: 'birth-gen',
        title: '탄생석/탄생화',
        description: '월별 탄생석과 탄생화 확인',
        path: '/birth-gen',
        category: 'fun',
        icon: Gift,
        color: 'bg-pink-500',
        keywords: ['탄생석', 'birthstone', '탄생화', 'flower']
    },
    {
        id: 'tarot',
        title: '타로 카드',
        description: '오늘의 타로 운세',
        path: '/tarot',
        category: 'fun',
        icon: Sparkles,
        color: 'bg-purple-600',
        keywords: ['타로', 'tarot', 'card', 'fortune']
    },
    {
        id: 'lotto',
        title: '로또 번호 생성기',
        description: '행운의 로또 번호 자동 생성',
        path: '/lotto',
        category: 'fun',
        icon: Sparkles,
        color: 'bg-yellow-500',
        keywords: ['로또', 'lotto', '번호', 'number', 'random']
    },
    {
        id: 'discount-calculator',
        title: '할인율 계산기',
        description: '원가와 할인율로 최종 가격 계산',
        path: '/discount-calculator',
        category: 'finance',
        icon: Calculator,
        color: 'bg-red-500',
        keywords: ['할인', '할인율', '세일', '가격계산', 'discount', 'sale']
    },
    {
        id: 'color-extractor',
        title: '색상 추출기',
        description: '이미지에서 컬러 팔레트 추출',
        path: '/color-extractor',
        category: 'utility',
        icon: Palette,
        color: 'bg-pink-500',
        keywords: ['색상', '팔레트', '이미지', 'color', 'palette', 'extractor']
    },
    {
        id: 'area-converter',
        title: '면적 변환기',
        description: '제곱미터, 평, 에이커 등 면적 단위 변환',
        path: '/area-converter',
        category: 'unit',
        icon: Ruler,
        color: 'bg-blue-600',
        keywords: ['면적', '평', '제곱미터', 'area', 'converter']
    },
    {
        id: 'volume-converter',
        title: '부피 변환기',
        description: '리터, 갤런, 세제곱미터 등 부피 단위 변환',
        path: '/volume-converter',
        category: 'unit',
        icon: Droplet,
        color: 'bg-cyan-600',
        keywords: ['부피', '리터', '갤런', 'volume', 'converter']
    },
    {
        id: 'speed-converter',
        title: '속도 변환기',
        description: 'km/h, mph, m/s 등 속도 단위 변환',
        path: '/speed-converter',
        category: 'unit',
        icon: Gauge,
        color: 'bg-orange-600',
        keywords: ['속도', 'kmh', 'mph', 'speed', 'converter']
    },
    {
        id: 'world-clock',
        title: '세계 시계',
        description: '전 세계 주요 도시의 현재 시간',
        path: '/world-clock',
        category: 'utility',
        icon: Globe,
        color: 'bg-indigo-600',
        keywords: ['세계시계', '시간', '시차', 'world', 'clock']
    },
    {
        id: 'percent-calculator',
        title: '퍼센트 계산기',
        description: '백분율, 증감률, 비율 계산',
        path: '/percent-calculator',
        category: 'finance',
        icon: Percent,
        color: 'bg-green-600',
        keywords: ['퍼센트', '백분율', '증감률', 'percent', 'calculator']
    },
    {
        id: 'fraction-calculator',
        title: '분수 계산기',
        description: '분수 사칙연산 및 기약분수 변환',
        path: '/fraction-calculator',
        category: 'dev',
        icon: Divide,
        color: 'bg-violet-600',
        keywords: ['분수', '기약분수', 'fraction', 'calculator']
    },
    {
        id: 'encryption-tool',
        title: '암호화/복호화',
        description: 'AES 알고리즘 기반 텍스트 암호화',
        path: '/encryption-tool',
        category: 'dev',
        icon: Lock,
        color: 'bg-red-600',
        keywords: ['암호화', '복호화', 'AES', 'encryption']
    },
    {
        id: 'dice-roller',
        title: '주사위 굴리기',
        description: 'D4, D6, D8, D10, D12, D20, D100 주사위',
        path: '/dice-roller',
        category: 'games',
        icon: Dices,
        color: 'bg-purple-600',
        keywords: ['주사위', 'dice', 'roller', 'd20', 'rpg']
    },
    {
        id: 'severance-calc',
        title: '퇴직금 계산기',
        description: '입사일과 퇴사일, 급여를 입력하여 예상 퇴직금을 계산합니다.',
        path: '/severance-calc',
        category: 'finance',
        icon: Calculator,
        keywords: ['퇴직금', 'severance', '퇴사', '급여']
    },
    {
        id: 'min-wage-calc',
        title: '최저임금 계산기',
        description: '내 급여가 최저임금 기준을 준수하는지 확인합니다.',
        path: '/min-wage-calc',
        category: 'finance',
        icon: DollarSign,
        keywords: ['최저임금', 'minimum wage', '시급', '급여']
    }
];
