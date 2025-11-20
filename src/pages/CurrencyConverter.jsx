import { Coins, ArrowRightLeft, RefreshCw, Clock, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';
import useHistory from '../hooks/useHistory';
import RelatedTools from '../components/RelatedTools';

const CurrencyConverter = () => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    const [amount, setAmount] = useState('1');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('KRW');
    const [result, setResult] = useState('');

    const { history, saveHistory, clearHistory } = useHistory('currency-converter-history');

    // Currency names in Korean
    const currencyNames = {
        'KRW': '한국 원',
        'USD': '미국 달러',
        'EUR': '유로',
        'JPY': '일본 엔',
        'CNY': '중국 위안',
        'GBP': '영국 파운드',
        'AUD': '호주 달러',
        'CAD': '캐나다 달러',
        'CHF': '스위스 프랑',
        'HKD': '홍콩 달러',
        'SGD': '싱가포르 달러',
        'THB': '태국 바트',
        'VND': '베트남 동',
        'INR': '인도 루피',
        'RUB': '러시아 루블',
        'BRL': '브라질 헤알',
        'MXN': '멕시코 페소',
        'ZAR': '남아공 랜드',
        'TRY': '터키 리라',
        'NZD': '뉴질랜드 달러'
    };

    const getCurrencyDisplay = (code) => {
        return currencyNames[code] ? `${code} (${currencyNames[code]})` : code;
    };

    const formatNumber = (num) => {
        return parseFloat(num).toLocaleString('ko-KR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const fetchRates = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            if (!response.ok) throw new Error('환율 정보를 가져오는데 실패했습니다.');
            const data = await response.json();
            setRates(data.rates);
            setLastUpdated(new Date(data.time_last_updated * 1000).toLocaleString('ko-KR'));
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    useEffect(() => {
        if (!rates[fromCurrency] || !rates[toCurrency] || amount === '' || isNaN(amount)) {
            setResult('');
            return;
        }

        const rateFrom = rates[fromCurrency];
        const rateTo = rates[toCurrency];
        const converted = (parseFloat(amount) / rateFrom) * rateTo;
        const formattedResult = converted.toFixed(2);
        setResult(formattedResult);

        // Auto-save to history after 2 seconds of inactivity
        const timer = setTimeout(() => {
            if (amount && formattedResult) {
                saveHistory({
                    from: `${formatNumber(amount)} ${fromCurrency}`,
                    to: `${formatNumber(formattedResult)} ${toCurrency}`,
                    date: new Date().toLocaleString(),
                    rawAmount: amount,
                    rawFrom: fromCurrency,
                    rawTo: toCurrency
                });
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [amount, fromCurrency, toCurrency, rates]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleHistoryClick = (item) => {
        if (item.rawAmount) {
            setAmount(item.rawAmount);
            setFromCurrency(item.rawFrom);
            setToCurrency(item.rawTo);
        }
    };

    const commonCurrencies = ['KRW', 'USD', 'EUR', 'JPY', 'CNY', 'GBP'];
    const allCurrencies = Object.keys(rates).sort();
    const sortedCurrencies = [
        ...commonCurrencies.filter(c => allCurrencies.includes(c)),
        ...allCurrencies.filter(c => !commonCurrencies.includes(c))
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title="실시간 환율 변환기 | 유틸리티 허브"
                description="실시간 환율 정보를 바탕으로 전 세계 통화 가치를 비교하고 변환하세요."
                keywords="환율 변환, 환율 계산, 달러 환율, 엔화 환율, 유로 환율"
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
                    <Coins className="w-8 h-8 text-primary" />
                    실시간 환율 변환기
                </h1>
                <p className="text-muted-foreground">
                    전 세계 통화의 실시간 환율을 확인하고 변환하세요.
                </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 space-y-8 relative">
                {loading && (
                    <div className="absolute inset-0 bg-card/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
                        <div className="flex flex-col items-center gap-4">
                            <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                            <p>환율 정보를 불러오는 중...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="text-center p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                        <p className="text-red-500">{error}</p>
                        <button onClick={fetchRates} className="mt-2 text-sm underline hover:brightness-110">
                            다시 시도
                        </button>
                    </div>
                )}

                <div className="space-y-2">
                    <label className="block text-sm font-medium">금액</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="금액을 입력하세요"
                        className="w-full px-4 py-4 text-2xl font-bold bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">에서</label>
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={loading}
                        >
                            {sortedCurrencies.map((c) => (
                                <option key={c} value={c}>{getCurrencyDisplay(c)}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleSwap}
                        className="p-3 rounded-full hover:bg-secondary text-primary transition-colors mt-6"
                        title="통화 바꾸기"
                    >
                        <ArrowRightLeft className="w-5 h-5" />
                    </button>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">로</label>
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={loading}
                        >
                            {sortedCurrencies.map((c) => (
                                <option key={c} value={c}>{getCurrencyDisplay(c)}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {result && (
                    <div className="text-center p-8 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-2">변환 결과</p>
                        <p className="text-4xl font-bold text-primary">
                            {formatNumber(result)} {toCurrency}
                        </p>
                    </div>
                )}

                {lastUpdated && (
                    <p className="text-xs text-center text-muted-foreground">
                        기준 시간: {lastUpdated}
                    </p>
                )}
            </div>

            {/* History Section */}
            {history.length > 0 && (
                <div className="card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold flex items-center gap-2">
                            <Clock className="w-5 h-5 text-text-secondary" />
                            최근 변환 기록
                        </h3>
                        <button
                            onClick={clearHistory}
                            className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                            <Trash2 className="w-3 h-3" />
                            기록 삭제
                        </button>
                    </div>
                    <div className="space-y-2">
                        {history.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleHistoryClick(item)}
                                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-bg-card-hover transition-colors text-sm group"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{item.from}</span>
                                    <ArrowRightLeft className="w-3 h-3 text-text-tertiary" />
                                    <span className="font-bold text-primary">{item.to}</span>
                                </div>
                                <span className="text-xs text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.date}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>실시간 환율 정보를 제공합니다.</li>
                    <li>주요 통화는 목록 상단에 표시됩니다.</li>
                    <li>환율은 USD를 기준으로 계산됩니다.</li>
                </ul>
            </div>

            <RelatedTools relatedIds={['length', 'weight', 'age-calc']} />
        </div>
    );
};

export default CurrencyConverter;
