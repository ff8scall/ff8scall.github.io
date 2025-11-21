import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Clock, Copy, Check } from 'lucide-react';

const CronGenerator = () => {
    const [cronType, setCronType] = useState('simple');
    const [minute, setMinute] = useState('*');
    const [hour, setHour] = useState('*');
    const [dayOfMonth, setDayOfMonth] = useState('*');
    const [month, setMonth] = useState('*');
    const [dayOfWeek, setDayOfWeek] = useState('*');
    const [cronExpression, setCronExpression] = useState('* * * * *');
    const [description, setDescription] = useState('');
    const [copied, setCopied] = useState(false);

    // Simple mode states
    const [simpleType, setSimpleType] = useState('everyMinute');
    const [simpleMinute, setSimpleMinute] = useState('0');
    const [simpleHour, setSimpleHour] = useState('0');
    const [simpleDayOfWeek, setSimpleDayOfWeek] = useState('1');

    useEffect(() => {
        if (cronType === 'simple') {
            generateSimpleCron();
        } else {
            generateAdvancedCron();
        }
    }, [cronType, simpleType, simpleMinute, simpleHour, simpleDayOfWeek, minute, hour, dayOfMonth, month, dayOfWeek]);

    const generateSimpleCron = () => {
        let cron = '';
        switch (simpleType) {
            case 'everyMinute':
                cron = '* * * * *';
                break;
            case 'everyHour':
                cron = `${simpleMinute} * * * *`;
                break;
            case 'everyDay':
                cron = `${simpleMinute} ${simpleHour} * * *`;
                break;
            case 'everyWeek':
                cron = `${simpleMinute} ${simpleHour} * * ${simpleDayOfWeek}`;
                break;
            case 'everyMonth':
                cron = `${simpleMinute} ${simpleHour} 1 * *`;
                break;
            default:
                cron = '* * * * *';
        }
        setCronExpression(cron);
        setDescription(describeCron(cron));
    };

    const generateAdvancedCron = () => {
        const cron = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
        setCronExpression(cron);
        setDescription(describeCron(cron));
    };

    const describeCron = (cron) => {
        const parts = cron.split(' ');
        const [min, hr, dom, mon, dow] = parts;

        let desc = '';

        // Minute
        if (min === '*') desc += '매 분';
        else if (min.includes('/')) desc += `${min.split('/')[1]}분마다`;
        else desc += `${min}분`;

        // Hour
        if (hr === '*') desc += ', 매 시간';
        else if (hr.includes('/')) desc += `, ${hr.split('/')[1]}시간마다`;
        else desc += `, ${hr}시`;

        // Day of Month
        if (dom !== '*') {
            if (dom.includes('/')) desc += `, ${dom.split('/')[1]}일마다`;
            else desc += `, ${dom}일`;
        }

        // Month
        if (mon !== '*') {
            const months = ['', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
            desc += `, ${months[parseInt(mon)]}`;
        }

        // Day of Week
        if (dow !== '*') {
            const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
            desc += `, ${days[parseInt(dow)]}`;
        }

        return desc + '에 실행';
    };

    const copyCron = () => {
        navigator.clipboard.writeText(cronExpression);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const presets = [
        { label: '매 분', value: '* * * * *' },
        { label: '매 시간', value: '0 * * * *' },
        { label: '매일 자정', value: '0 0 * * *' },
        { label: '매일 오전 9시', value: '0 9 * * *' },
        { label: '매주 월요일 오전 9시', value: '0 9 * * 1' },
        { label: '매월 1일 오전 9시', value: '0 9 1 * *' },
    ];

    const applyPreset = (preset) => {
        const parts = preset.split(' ');
        setMinute(parts[0]);
        setHour(parts[1]);
        setDayOfMonth(parts[2]);
        setMonth(parts[3]);
        setDayOfWeek(parts[4]);
        setCronType('advanced');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="CRON 표현식 생성기 - 스케줄링 도구"
                description="CRON 표현식을 시각적으로 생성하고 해석하세요. 개발자와 시스템 관리자를 위한 필수 도구입니다."
                keywords={['cron', 'cron expression', 'cron generator', '크론', '스케줄링', 'scheduler']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Clock className="w-8 h-8 text-blue-500" />
                    CRON 표현식 생성기
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    작업 스케줄링을 위한 CRON 표현식을 쉽게 생성하세요
                </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex justify-center gap-2">
                <button
                    onClick={() => setCronType('simple')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${cronType === 'simple'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                >
                    간단 모드
                </button>
                <button
                    onClick={() => setCronType('advanced')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${cronType === 'advanced'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                >
                    고급 모드
                </button>
            </div>

            <div className="card p-6 space-y-6">
                {/* Simple Mode */}
                {cronType === 'simple' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">실행 주기</label>
                            <select
                                value={simpleType}
                                onChange={(e) => setSimpleType(e.target.value)}
                                className="input w-full"
                            >
                                <option value="everyMinute">매 분</option>
                                <option value="everyHour">매 시간</option>
                                <option value="everyDay">매일</option>
                                <option value="everyWeek">매주</option>
                                <option value="everyMonth">매월</option>
                            </select>
                        </div>

                        {simpleType !== 'everyMinute' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">분</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="59"
                                        value={simpleMinute}
                                        onChange={(e) => setSimpleMinute(e.target.value)}
                                        className="input w-full"
                                    />
                                </div>
                                {(simpleType === 'everyDay' || simpleType === 'everyWeek' || simpleType === 'everyMonth') && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">시</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="23"
                                            value={simpleHour}
                                            onChange={(e) => setSimpleHour(e.target.value)}
                                            className="input w-full"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {simpleType === 'everyWeek' && (
                            <div>
                                <label className="block text-sm font-medium mb-2">요일</label>
                                <select
                                    value={simpleDayOfWeek}
                                    onChange={(e) => setSimpleDayOfWeek(e.target.value)}
                                    className="input w-full"
                                >
                                    <option value="0">일요일</option>
                                    <option value="1">월요일</option>
                                    <option value="2">화요일</option>
                                    <option value="3">수요일</option>
                                    <option value="4">목요일</option>
                                    <option value="5">금요일</option>
                                    <option value="6">토요일</option>
                                </select>
                            </div>
                        )}
                    </div>
                )}

                {/* Advanced Mode */}
                {cronType === 'advanced' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">분 (0-59)</label>
                                <input
                                    type="text"
                                    value={minute}
                                    onChange={(e) => setMinute(e.target.value)}
                                    className="input w-full font-mono"
                                    placeholder="*"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">시 (0-23)</label>
                                <input
                                    type="text"
                                    value={hour}
                                    onChange={(e) => setHour(e.target.value)}
                                    className="input w-full font-mono"
                                    placeholder="*"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">일 (1-31)</label>
                                <input
                                    type="text"
                                    value={dayOfMonth}
                                    onChange={(e) => setDayOfMonth(e.target.value)}
                                    className="input w-full font-mono"
                                    placeholder="*"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">월 (1-12)</label>
                                <input
                                    type="text"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    className="input w-full font-mono"
                                    placeholder="*"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">요일 (0-6)</label>
                                <input
                                    type="text"
                                    value={dayOfWeek}
                                    onChange={(e) => setDayOfWeek(e.target.value)}
                                    className="input w-full font-mono"
                                    placeholder="*"
                                />
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm">
                            <p className="font-medium mb-2">사용 가능한 특수 문자:</p>
                            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                                <li><code className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded">*</code> - 모든 값</li>
                                <li><code className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded">,</code> - 값 목록 (예: 1,3,5)</li>
                                <li><code className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded">-</code> - 범위 (예: 1-5)</li>
                                <li><code className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded">/</code> - 증분 (예: */5 = 5마다)</li>
                            </ul>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">프리셋</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {presets.map((preset, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => applyPreset(preset.value)}
                                        className="btn btn-ghost text-sm"
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Result */}
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                        <label className="block text-sm font-medium mb-2">CRON 표현식</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={cronExpression}
                                readOnly
                                className="input flex-1 font-mono text-lg font-bold bg-gray-50 dark:bg-gray-900"
                            />
                            <button
                                onClick={copyCron}
                                className="btn btn-primary flex items-center gap-2"
                            >
                                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                {copied ? '복사됨!' : '복사'}
                            </button>
                        </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">설명</p>
                        <p className="text-green-700 dark:text-green-300 font-medium">{description}</p>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-sm space-y-2">
                <p className="font-bold">CRON 표현식 형식</p>
                <div className="font-mono bg-white dark:bg-gray-900 p-3 rounded">
                    분(0-59) 시(0-23) 일(1-31) 월(1-12) 요일(0-6)
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    요일: 0=일요일, 1=월요일, ..., 6=토요일
                </p>
            </div>
        </div>
    );
};

export default CronGenerator;
