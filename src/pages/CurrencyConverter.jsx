import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { DollarSign, RefreshCw, TrendingUp, Calendar, Edit2, Save, ArrowRightLeft, Globe, AlertCircle } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const CurrencyConverter = () => {
    // Default rates (Fallback)
    const DEFAULT_RATES = {
        KRW: 1,
        USD: 0.00075,
        JPY: 0.11,
        CNY: 0.0054,
        EUR: 0.00069,
        GBP: 0.00059,
        AUD: 0.0011,
        CAD: 0.0010,
        CHF: 0.00066,
        HKD: 0.0058,
        SGD: 0.0010,
    };

    const CURRENCY_INFO = {
        KRW: { name: '대한민국 원', symbol: '₩', flag: '🇰🇷' },
        USD: { name: '미국 달러', symbol: '$', flag: '🇺🇸' },
        JPY: { name: '일본 엔', symbol: '¥', flag: '🇯🇵' },
        CNY: { name: '중국 위안', symbol: '¥', flag: '🇨🇳' },
        EUR: { name: '유로', symbol: '€', flag: '🇪🇺' },
        GBP: { name: '영국 파운드', symbol: '£', flag: '🇬🇧' },
        AUD: { name: '호주 달러', symbol: 'A$', flag: '🇦🇺' },
        CAD: { name: '캐나다 달러', symbol: 'C$', flag: '🇨🇦' },
        CHF: { name: '스위스 프랑', symbol: 'CHF', flag: '🇨🇭' },
        HKD: { name: '홍콩 달러', symbol: 'HK$', flag: '🇭🇰' },
        SGD: { name: '싱가포르 달러', symbol: 'S$', flag: '🇸🇬' },
    };

    // State
    const [rates, setRates] = useState(DEFAULT_RATES);
    const [lastUpdate, setLastUpdate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('KRW');
    const [amount, setAmount] = useState('1');
    const [result, setResult] = useState('');

    // Advanced Mode (Manual Edit)
    const [editMode, setEditMode] = useState(false);
    const [editRates, setEditRates] = useState({});

    // Fetch Rates
    const fetchRates = async (force = false) => {
        setIsLoading(true);
        setError(null);
        try {
            // Check cache first
            const cachedData = localStorage.getItem('currency_cache');
            if (!force && cachedData) {
                const { rates: cachedRates, timestamp } = JSON.parse(cachedData);
                const now = Date.now();
                // Cache valid for 24 hours
                if (now - timestamp < 24 * 60 * 60 * 1000) {
                    setRates(cachedRates);
                    setLastUpdate(new Date(timestamp).toLocaleDateString());
                    setIsLoading(false);
                    return;
                }
            }

            // Fetch from API (Base: KRW)
            const response = await fetch('https://open.er-api.com/v6/latest/KRW');
            const data = await response.json();

            if (data.result === 'success') {
                // Filter only supported currencies
                const newRates = { KRW: 1 };
                Object.keys(CURRENCY_INFO).forEach(code => {
                    if (code !== 'KRW' && data.rates[code]) {
                        newRates[code] = data.rates[code];
                    }
                });

                setRates(newRates);
                setLastUpdate(new Date(data.time_last_update_utc).toLocaleDateString());

                // Save to cache
                localStorage.setItem('currency_cache', JSON.stringify({
                    rates: newRates,
                    timestamp: Date.now()
                }));
            } else {
                throw new Error('API Error');
            }
        } catch (err) {
            console.error('Failed to fetch rates:', err);
            setError('최신 환율을 가져오는데 실패했습니다. 기본값을 사용합니다.');
            // Fallback is already set in initial state or previous state
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    useEffect(() => {
        calculateConversion();
    }, [amount, fromCurrency, toCurrency, rates]);

    const calculateConversion = () => {
        const amt = parseFloat(amount) || 0;
        if (amt === 0) {
            setResult('');
            return;
        }

        // Logic: Convert From -> KRW -> To
        // Since rates are based on KRW (1 KRW = x Foreign Currency)
        // Amount (From) / Rate (From) = Amount in KRW
        // Amount in KRW * Rate (To) = Amount in To

        // Example: 1 USD -> KRW
        // rates[USD] = 0.00075 (1 KRW = 0.00075 USD)
        // 1 USD / 0.00075 = 1333 KRW

        // Example: 1000 KRW -> USD
        // 1000 * 0.00075 = 0.75 USD

        const rateFrom = rates[fromCurrency]; // 1 KRW = x From
        const rateTo = rates[toCurrency];     // 1 KRW = y To

        if (!rateFrom || !rateTo) return;

        // Convert 'From' to KRW first
        // If From is KRW, valInKrw = amt
        // If From is USD, valInKrw = amt / rateFrom
        const valInKrw = amt / rateFrom;

        // Convert KRW to 'To'
        // valInTo = valInKrw * rateTo
        const converted = valInKrw * rateTo;

        setResult(converted);
    };

    const formatNumber = (num) => {
        if (!num) return '';
        return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    // Manual Edit Functions
    const startEdit = () => {
        // Prepare edit rates: Show as "1 Foreign = x KRW" for easier editing
        // Current rates are "1 KRW = x Foreign"
        const userFriendlyRates = {};
        Object.keys(rates).forEach(code => {
            if (code !== 'KRW') {
                userFriendlyRates[code] = 1 / rates[code];
            }
        });
        setEditRates(userFriendlyRates);
        setEditMode(true);
    };

    const saveRates = () => {
        const newRates = { KRW: 1 };
        Object.keys(editRates).forEach(code => {
            newRates[code] = 1 / parseFloat(editRates[code]);
        });
        setRates(newRates);
        setEditMode(false);
        // Update cache with manual data to persist locally
        localStorage.setItem('currency_cache', JSON.stringify({
            rates: newRates,
            timestamp: Date.now() // Treat as fresh
        }));
        setLastUpdate('사용자 지정');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title="실시간 환율 계산기"
                description="실시간 환율 정보를 바탕으로 전 세계 주요 통화를 간편하게 변환하세요."
                keywords="환율, 환율계산기, 달러, 엔화, 실시간환율, 환전"
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-2">
                    <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                    실시간 환율 계산기
                </h1>
                <p className="text-muted-foreground">
                    최신 환율 정보를 기반으로 정확하게 계산하세요.
                </p>
            </div>

            {/* Status Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-secondary/30 p-4 rounded-xl text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>기준일: <span className="font-medium text-foreground">{lastUpdate || '업데이트 중...'}</span></span>
                </div>
                <div className="flex items-center gap-2">
                    {error && (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {error}
                        </span>
                    )}
                    <button
                        onClick={() => fetchRates(true)}
                        disabled={isLoading}
                        className="btn btn-sm btn-ghost flex items-center gap-2"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        {isLoading ? '업데이트 중...' : '환율 새로고침'}
                    </button>
                </div>
            </div>

            {/* Converter */}
            <div className="card p-8 space-y-8">
                <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
                    {/* From */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">보낼 금액</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="input flex-1 text-xl font-bold"
                                placeholder="1"
                                min="0"
                            />
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="input w-32 text-lg"
                            >
                                {Object.keys(CURRENCY_INFO).map((code) => (
                                    <option key={code} value={code}>
                                        {CURRENCY_INFO[code].flag} {code}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-sm text-muted-foreground text-right">
                            {CURRENCY_INFO[fromCurrency].name}
                        </div>
                    </div>

                    {/* Swap */}
                    <div className="flex justify-center">
                        <button
                            onClick={swapCurrencies}
                            className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                        >
                            <ArrowRightLeft className="w-5 h-5" />
                        </button>
                    </div>

                    {/* To */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">받을 금액</label>
                        <div className="flex gap-2">
                            <div className="input flex-1 text-xl font-bold bg-secondary/50 flex items-center text-primary">
                                {formatNumber(result)}
                            </div>
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="input w-32 text-lg"
                            >
                                {Object.keys(CURRENCY_INFO).map((code) => (
                                    <option key={code} value={code}>
                                        {CURRENCY_INFO[code].flag} {code}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-sm text-muted-foreground text-right">
                            {CURRENCY_INFO[toCurrency].name}
                        </div>
                    </div>
                </div>

                {/* Rate Info */}
                <div className="bg-primary/5 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">적용 환율</p>
                    <div className="text-lg font-bold flex items-center justify-center gap-2">
                        <span>1 {fromCurrency}</span>
                        <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                        <span>
                            {rates[fromCurrency] && rates[toCurrency]
                                ? formatNumber((1 / rates[fromCurrency]) * rates[toCurrency])
                                : '...'} {toCurrency}
                        </span>
                    </div>
                </div>
            </div>

            {/* Advanced: Manual Edit */}
            <div className="card p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Edit2 className="w-5 h-5" /> 환율 수동 설정
                    </h3>
                    {!editMode ? (
                        <button onClick={startEdit} className="btn btn-sm btn-outline">
                            수정하기
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button onClick={() => setEditMode(false)} className="btn btn-sm btn-ghost">취소</button>
                            <button onClick={saveRates} className="btn btn-sm btn-primary">저장</button>
                        </div>
                    )}
                </div>

                {editMode ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.keys(editRates).map(code => (
                            <div key={code} className="space-y-1">
                                <label className="text-xs text-muted-foreground flex items-center gap-1">
                                    {CURRENCY_INFO[code].flag} 1 {code} = ? KRW
                                </label>
                                <input
                                    type="number"
                                    value={editRates[code]}
                                    onChange={(e) => setEditRates({ ...editRates, [code]: e.target.value })}
                                    className="input w-full text-sm"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        API 환율이 정확하지 않거나 특정 환율을 적용하고 싶을 때 직접 수정할 수 있습니다.
                    </p>
                )}
            </div>


        </div>
    );
};

export default CurrencyConverter;
