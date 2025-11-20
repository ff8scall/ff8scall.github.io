import React, { useState } from 'react';
import { Solar, Lunar } from 'lunar-javascript';
import { Scroll, Calendar, Info, RefreshCw, User, TrendingUp, Sparkles, Heart } from 'lucide-react';
import SEO from '../components/SEO';
import ShareButtons from '../components/ShareButtons';
import { sipsinAnalysis, deepAnalysis, analysisData, shinsalData } from '../data/SajuData.js';
import SajuBasic from './saju_components/SajuBasic';
import SajuFlow from './saju_components/SajuFlow';
import SajuShinsal from './saju_components/SajuShinsal';
import SajuCompatibility from './saju_components/SajuCompatibility';
import SajuCalendar from './saju_components/SajuCalendar';

const Saju = () => {
    const [birthDate, setBirthDate] = useState('');
    const [birthTime, setBirthTime] = useState('');
    const [calendarType, setCalendarType] = useState('solar'); // solar, lunar
    const [isLeapMonth, setIsLeapMonth] = useState(false);
    const [gender, setGender] = useState('male'); // male, female
    const [result, setResult] = useState(null);
    const [activeTab, setActiveTab] = useState('basic'); // basic, flow, shinsal

    // 오행 매핑
    const getWuXing = (char) => {
        const map = {
            '甲': '목', '乙': '목', '寅': '목', '卯': '목',
            '丙': '화', '丁': '화', '巳': '화', '午': '화',
            '戊': '토', '己': '토', '辰': '토', '戌': '토', '丑': '토', '未': '토',
            '庚': '금', '辛': '금', '申': '금', '酉': '금',
            '壬': '수', '癸': '수', '亥': '수', '子': '수'
        };
        return map[char] || '';
    };

    // 십성(Ten Gods) 계산 로직
    const getSipsin = (dayMaster, target) => {
        const wuxingMap = { '목': 0, '화': 1, '토': 2, '금': 3, '수': 4 };
        const dayIdx = wuxingMap[dayMaster];
        const targetIdx = wuxingMap[target];

        if (dayIdx === undefined || targetIdx === undefined) return '';

        // 오행 상생상극 관계 계산 (0: 비겁, 1: 식상, 2: 재성, 3: 관성, 4: 인성)
        const diff = (targetIdx - dayIdx + 5) % 5;

        const relations = ['비겁', '식상', '재성', '관성', '인성'];
        return relations[diff];
    };

    // 대운 3단계 상세 스토리텔링 생성
    const generateDaewoonStory = (stage, sipsins) => {
        const counts = sipsins.reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {});

        const sortedSipsins = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
        const dominant = sortedSipsins[0];
        const secondary = sortedSipsins[1];

        let story = "";
        let keywords = [];

        if (deepAnalysis[stage] && deepAnalysis[stage][dominant]) {
            const mainData = deepAnalysis[stage][dominant];
            story += mainData.desc;
            keywords.push(mainData.theme.split(', ')[0]);
        }

        if (secondary && deepAnalysis[stage][secondary]) {
            const subData = deepAnalysis[stage][secondary];
            story += `\n\n또한, **${sipsinAnalysis[secondary].title.split(' ')[0]}**의 영향도 함께 받게 됩니다. ${subData.theme}의 기운이 더해져, ${dominant}의 성향과 어우러집니다. `;
            story += `주된 흐름 속에서도 ${subData.desc.substring(0, 50)}... 등의 양상이 함께 나타날 수 있습니다. 두 기운의 조화를 통해 더욱 다채로운 삶의 경험을 하게 될 것입니다.`;
        }

        if (deepAnalysis[stage] && deepAnalysis[stage][dominant]) {
            story += `\n\n💡 **조언**: ${deepAnalysis[stage][dominant].advice}`;
        }

        return { story, keywords };
    };

    // 한글 변환 함수
    const getHangul = (char) => {
        const hangulMap = {
            '甲': '갑', '乙': '을', '丙': '병', '丁': '정', '戊': '무', '己': '기', '庚': '경', '辛': '신', '壬': '임', '癸': '계',
            '子': '자', '丑': '축', '寅': '인', '卯': '묘', '辰': '진', '巳': '사', '午': '오', '未': '미', '申': '신', '酉': '유', '戌': '술', '亥': '해'
        };
        return hangulMap[char] || char;
    };

    const calculateSaju = (e) => {
        e.preventDefault();
        if (!birthDate) return;

        try {
            const [year, month, day] = birthDate.split('-').map(Number);
            const [hour, minute] = birthTime ? birthTime.split(':').map(Number) : [12, 0];

            let targetLunar;
            if (calendarType === 'lunar') {
                targetLunar = Lunar.fromYmdHms(year, month, day, hour, minute, 0);
                targetLunar.setIsLeap(isLeapMonth);
            } else {
                const targetSolar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
                targetLunar = targetSolar.getLunar();
            }

            const eightChar = targetLunar.getEightChar();
            const pillars = {
                year: { gan: eightChar.getYearGan(), zhi: eightChar.getYearZhi() },
                month: { gan: eightChar.getMonthGan(), zhi: eightChar.getMonthZhi() },
                day: { gan: eightChar.getDayGan(), zhi: eightChar.getDayZhi() },
                hour: { gan: eightChar.getTimeGan(), zhi: eightChar.getTimeZhi() }
            };

            const dayMaster = pillars.day.gan;
            const dayMasterWuXing = getWuXing(dayMaster);

            // 대운 계산 (간단한 수동 계산)
            const birthYear = year;
            const birthMonth = month;
            const isMale = gender === 'male';
            const yearGanIndex = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'].indexOf(pillars.year.gan);
            const isYangYear = yearGanIndex % 2 === 0;
            const isForward = (isMale && isYangYear) || (!isMale && !isYangYear);

            const ganOrder = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
            const zhiOrder = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

            let currentGanIdx = ganOrder.indexOf(pillars.month.gan);
            let currentZhiIdx = zhiOrder.indexOf(pillars.month.zhi);

            const daewoonPeriods = [];
            let startAge = 1;

            for (let i = 0; i < 9; i++) {
                if (isForward) {
                    currentGanIdx = (currentGanIdx + 1) % 10;
                    currentZhiIdx = (currentZhiIdx + 1) % 12;
                } else {
                    currentGanIdx = (currentGanIdx - 1 + 10) % 10;
                    currentZhiIdx = (currentZhiIdx - 1 + 12) % 12;
                }

                const gan = ganOrder[currentGanIdx];
                const zhi = zhiOrder[currentZhiIdx];
                const ganWuXing = getWuXing(gan);
                const sipsin = getSipsin(dayMasterWuXing, ganWuXing);

                daewoonPeriods.push({
                    age: startAge,
                    gan,
                    zhi,
                    ganWuXing,
                    sipsin
                });

                startAge += 10;
            }

            // 3단계로 분류
            const daewoon3Stage = {
                '초년': {
                    ageRange: `${daewoonPeriods[0].age}-${daewoonPeriods[2].age + 9}세`,
                    periods: daewoonPeriods.slice(0, 3),
                    sipsins: daewoonPeriods.slice(0, 3).map(p => p.sipsin)
                },
                '중년': {
                    ageRange: `${daewoonPeriods[3].age}-${daewoonPeriods[5].age + 9}세`,
                    periods: daewoonPeriods.slice(3, 6),
                    sipsins: daewoonPeriods.slice(3, 6).map(p => p.sipsin)
                },
                '말년': {
                    ageRange: `${daewoonPeriods[6].age}-${daewoonPeriods[8].age + 9}세`,
                    periods: daewoonPeriods.slice(6, 9),
                    sipsins: daewoonPeriods.slice(6, 9).map(p => p.sipsin)
                }
            };

            // 오늘의 일진 계산
            const today = Solar.fromDate(new Date());
            const todayLunar = today.getLunar();
            const todayEightChar = todayLunar.getEightChar();
            const todayGan = todayEightChar.getDayGan();
            const todayZhi = todayEightChar.getDayZhi();
            const todayGanWuXing = getWuXing(todayGan);
            const todaySipsin = getSipsin(dayMasterWuXing, todayGanWuXing);

            // 세운(년운) 계산
            const currentYear = new Date().getFullYear();
            const thisYearLunar = Lunar.fromYmd(currentYear, 1, 1);
            const thisYearGan = thisYearLunar.getYearGan();
            const thisYearZhi = thisYearLunar.getYearZhi();
            const thisYearGanWuXing = getWuXing(thisYearGan);
            const thisYearSipsin = getSipsin(dayMasterWuXing, thisYearGanWuXing);

            // 신살 계산
            const getShinsal = (standardZhi, targetZhi) => {
                const samhap = {
                    '申': '수', '子': '수', '辰': '수',
                    '寅': '화', '午': '화', '戌': '화',
                    '巳': '금', '酉': '금', '丑': '금',
                    '亥': '목', '卯': '목', '未': '목'
                };

                const group = samhap[standardZhi];
                if (!group) return null;

                if (group === '수' && targetZhi === '酉') return '도화살';
                if (group === '화' && targetZhi === '卯') return '도화살';
                if (group === '금' && targetZhi === '午') return '도화살';
                if (group === '목' && targetZhi === '子') return '도화살';

                if (group === '수' && targetZhi === '寅') return '역마살';
                if (group === '화' && targetZhi === '申') return '역마살';
                if (group === '금' && targetZhi === '亥') return '역마살';
                if (group === '목' && targetZhi === '巳') return '역마살';

                if (group === '수' && targetZhi === '辰') return '화개살';
                if (group === '화' && targetZhi === '戌') return '화개살';
                if (group === '금' && targetZhi === '丑') return '화개살';
                if (group === '목' && targetZhi === '未') return '화개살';

                return null;
            };

            const myShinsals = new Set();
            const pillarsList = [pillars.year.zhi, pillars.month.zhi, pillars.day.zhi, pillars.hour.zhi];

            pillarsList.forEach(zhi => {
                const shinsal = getShinsal(pillars.year.zhi, zhi);
                if (shinsal) myShinsals.add(shinsal);
            });
            pillarsList.forEach(zhi => {
                const shinsal = getShinsal(pillars.day.zhi, zhi);
                if (shinsal) myShinsals.add(shinsal);
            });

            // 추가 신살 검사 (귀문관살, 백호대살, 현침살, 천을귀인, 문창귀인)

            // 귀문관살: 년지나 일지가 辰(진)이고 시지가 戌(술)이거나, 년지나 일지가 戌이고 시지가 辰인 경우
            if ((pillars.year.zhi === '辰' && pillars.hour.zhi === '戌') ||
                (pillars.year.zhi === '戌' && pillars.hour.zhi === '辰') ||
                (pillars.day.zhi === '辰' && pillars.hour.zhi === '戌') ||
                (pillars.day.zhi === '戌' && pillars.hour.zhi === '辰')) {
                myShinsals.add('귀문관살');
            }

            // 백호대살: 년지나 일지가 申(신), 酉(유), 戌(술) 중 하나이고, 시지가 午(오)인 경우
            if ((['申', '酉', '戌'].includes(pillars.year.zhi) || ['申', '酉', '戌'].includes(pillars.day.zhi)) &&
                pillars.hour.zhi === '午') {
                myShinsals.add('백호대살');
            }

            // 현침살: 일간이 甲(갑)이고 일지가 午(오)인 경우, 또는 일간이 庚(경)이고 일지가 子(자)인 경우
            if ((pillars.day.gan === '甲' && pillars.day.zhi === '午') ||
                (pillars.day.gan === '庚' && pillars.day.zhi === '子')) {
                myShinsals.add('현침살');
            }

            // 천을귀인: 일간 기준으로 특정 지지가 있는 경우
            const cheoneulMap = {
                '甲': ['丑', '未'], '乙': ['子', '申'], '丙': ['亥', '酉'], '丁': ['亥', '酉'],
                '戊': ['丑', '未'], '己': ['子', '申'], '庚': ['丑', '未'], '辛': ['寅', '午'],
                '壬': ['卯', '巳'], '癸': ['卯', '巳']
            };
            const cheoneulZhis = cheoneulMap[pillars.day.gan] || [];
            if (pillarsList.some(zhi => cheoneulZhis.includes(zhi))) {
                myShinsals.add('천을귀인');
            }

            // 문창귀인: 일간 기준으로 특정 지지가 있는 경우
            const munchangMap = {
                '甲': '巳', '乙': '午', '丙': '申', '丁': '酉',
                '戊': '申', '己': '酉', '庚': '亥', '辛': '子',
                '壬': '寅', '癸': '卯'
            };
            const munchangZhi = munchangMap[pillars.day.gan];
            if (munchangZhi && pillarsList.includes(munchangZhi)) {
                myShinsals.add('문창귀인');
            }


            const data = {
                pillars: [
                    { label: '시주', gan: pillars.hour.gan, zhi: pillars.hour.zhi },
                    { label: '일주', gan: pillars.day.gan, zhi: pillars.day.zhi },
                    { label: '월주', gan: pillars.month.gan, zhi: pillars.month.zhi },
                    { label: '년주', gan: pillars.year.gan, zhi: pillars.year.zhi }
                ].map(p => ({
                    ...p,
                    ganHangul: getHangul(p.gan),
                    zhiHangul: getHangul(p.zhi),
                    ganWuXing: getWuXing(p.gan),
                    zhiWuXing: getWuXing(p.zhi)
                })),
                dayMaster,
                dayMasterWuXing,
                solarDate: `${year}년 ${month}월 ${day}일`,
                lunarDate: `${targetLunar.getYear()}년 ${targetLunar.getMonth()}월 ${targetLunar.getDay()}일`,
                zodiac: getHangul(targetLunar.getYearZhi()),
                daewoon: daewoon3Stage,
                dailyFortune: {
                    date: today.toYmd(),
                    gan: todayGan,
                    zhi: todayZhi,
                    ganHangul: getHangul(todayGan),
                    zhiHangul: getHangul(todayZhi),
                    ganWuXing: todayGanWuXing,
                    sipsin: todaySipsin
                },
                seun: {
                    year: currentYear,
                    gan: thisYearGan,
                    zhi: thisYearZhi,
                    ganHangul: getHangul(thisYearGan),
                    zhiHangul: getHangul(thisYearZhi),
                    sipsin: thisYearSipsin
                },
                shinsals: Array.from(myShinsals)
            };

            // 오행 통계
            const wuxingStats = { '목': 0, '화': 0, '토': 0, '금': 0, '수': 0 };
            data.pillars.forEach(p => {
                if (p.ganWuXing) wuxingStats[p.ganWuXing]++;
                if (p.zhiWuXing) wuxingStats[p.zhiWuXing]++;
            });
            data.wuxingStats = wuxingStats;

            setResult(data);
            setActiveTab('basic'); // Reset to basic tab on new calculation
        } catch (error) {
            console.error(error);
            alert('사주 계산 중 오류가 발생했습니다. 날짜를 확인해주세요.');
        }
    };

    const tabs = [
        { id: 'basic', label: '기본 분석', icon: User },
        { id: 'flow', label: '인생 흐름', icon: TrendingUp },
        { id: 'shinsal', label: '신살', icon: Sparkles },
        { id: 'compatibility', label: '궁합', icon: Heart },
        { id: 'calendar', label: '달력', icon: Calendar }
    ];

    // 공유 기능
    const handleShare = () => {
        if (!result) return;

        const shareText = `🌟 나의 사주팔자 분석 (무료 만세력)

📅 생년월일: ${result.solarDate}
🌙 음력: ${result.lunarDate}
🐾 띠: ${result.zodiac}

📊 사주팔자:
년주: ${result.pillars[3].ganHangul}${result.pillars[3].zhiHangul}
월주: ${result.pillars[2].ganHangul}${result.pillars[2].zhiHangul}
일주: ${result.pillars[1].ganHangul}${result.pillars[1].zhiHangul}
시주: ${result.pillars[0].ganHangul}${result.pillars[0].zhiHangul}

🌱 일간(본원): ${result.dayMaster} (${result.dayMasterWuXing})

✨ 주요 신살: ${result.shinsals.length > 0 ? result.shinsals.map(s => shinsalData[s].name).join(', ') : '없음'}

📌 Utility Hub에서 더 자세한 분석을 확인하세요!`;

        navigator.clipboard.writeText(shareText).then(() => {
            alert('클립보드에 복사되었습니다!');
        }).catch(() => {
            alert('복사에 실패했습니다.');
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title="무료 만세력 (사주팔자) - 궁합, 신살, 운세달력 | Utility Hub"
                description="정확한 사주팔자 계산과 상세한 운세 분석을 제공합니다. 대운, 세운, 신살(8종), 궁합 분석, 월별 운세 달력까지! 전문적인 명리학 해석을 무료로 확인하세요."
                keywords="사주, 사주팔자, 만세력, 운세, 대운, 세운, 신살, 명리학, 궁합, 궁합보기, 사주궁합, 도화살, 역마살, 화개살, 천을귀인, 문창귀인, 운세달력, 일진, 오행, 십성, 무료사주, 무료만세력"
            />

            <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    <Scroll className="w-4 h-4" />
                    <span>무료 만세력</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">사주팔자 (四柱八字)</h1>
                <p className="text-muted-foreground">생년월일시를 입력하면 정확한 사주와 운세를 확인할 수 있습니다.</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4">
                <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900 dark:text-blue-100 space-y-1">
                        <p className="font-bold">사주팔자란?</p>
                        <p>태어난 년(年), 월(月), 일(日), 시(時)를 천간(天干)과 지지(地支)로 표현한 것으로, 총 8개의 글자로 이루어져 있습니다. 이를 통해 타고난 성향과 인생의 흐름을 파악할 수 있습니다.</p>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
                <form onSubmit={calculateSaju} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">생년월일</label>
                            <input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">태어난 시간</label>
                            <input
                                type="time"
                                value={birthTime}
                                onChange={(e) => setBirthTime(e.target.value)}
                                className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                            <p className="text-xs text-muted-foreground">* 시간을 모르면 정확한 시주를 알 수 없습니다.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium block">양력/음력</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="calendarType"
                                        value="solar"
                                        checked={calendarType === 'solar'}
                                        onChange={(e) => setCalendarType(e.target.value)}
                                        className="w-4 h-4 text-primary"
                                    />
                                    <span>양력</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="calendarType"
                                        value="lunar"
                                        checked={calendarType === 'lunar'}
                                        onChange={(e) => setCalendarType(e.target.value)}
                                        className="w-4 h-4 text-primary"
                                    />
                                    <span>음력</span>
                                </label>
                            </div>
                        </div>

                        {calendarType === 'lunar' && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium block">윤달 여부</label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isLeapMonth}
                                        onChange={(e) => setIsLeapMonth(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span>윤달임</span>
                                </label>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium block">성별</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-4 h-4 text-primary"
                                    />
                                    <span>남성</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={gender === 'female'}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-4 h-4 text-primary"
                                    />
                                    <span>여성</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-5 h-5" />
                        사주팔자 확인하기
                    </button>
                </form>
            </div>

            {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Tab Navigation */}
                    <div className="bg-card border border-border rounded-xl p-2">
                        <div className="flex gap-2">
                            {tabs.map(tab => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'text-muted-foreground hover:bg-muted'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="hidden sm:inline">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="animate-in fade-in duration-300">
                        {activeTab === 'basic' && <SajuBasic result={result} />}
                        {activeTab === 'flow' && <SajuFlow result={result} generateDaewoonStory={generateDaewoonStory} />}
                        {activeTab === 'shinsal' && <SajuShinsal result={result} />}
                        {activeTab === 'compatibility' && <SajuCompatibility userResult={result} getWuXing={getWuXing} getHangul={getHangul} />}
                        {activeTab === 'calendar' && <SajuCalendar result={result} getWuXing={getWuXing} getHangul={getHangul} getSipsin={getSipsin} />}
                    </div>

                    {/* Share Buttons */}
                    <div className="mt-6 bg-card border border-border rounded-xl p-6">
                        <ShareButtons
                            title="나의 사주팔자 분석 결과"
                            description={`${result.solarDate} 출생 | 일간: ${result.dayMaster} (${result.dayMasterWuXing}) | 신살: ${result.shinsals.length > 0 ? result.shinsals.map(s => shinsalData[s].name).join(', ') : '없음'}`}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Saju;
