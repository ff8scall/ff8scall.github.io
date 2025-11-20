import React, { useState, useEffect } from 'react';
import { Globe, Copy, Check, RefreshCw } from 'lucide-react';
import SEO from '../components/SEO';

const IpAddress = () => {
    const [ipInfo, setIpInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const fetchIpInfo = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();

            // Get additional info from ipapi.co
            const infoResponse = await fetch(`https://ipapi.co/${data.ip}/json/`);
            const infoData = await infoResponse.json();

            setIpInfo({
                ip: data.ip,
                city: infoData.city || '알 수 없음',
                region: infoData.region || '알 수 없음',
                country: infoData.country_name || '알 수 없음',
                timezone: infoData.timezone || '알 수 없음',
                isp: infoData.org || '알 수 없음'
            });
        } catch (err) {
            setError('IP 정보를 가져오는데 실패했습니다.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIpInfo();
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="IP 주소 확인 - Utility Hub"
                description="현재 사용 중인 공인 IP 주소와 위치 정보를 확인할 수 있습니다."
                keywords="IP주소, 아이피조회, 공인IP, 위치정보"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Globe className="w-8 h-8 text-blue-500" />
                    IP 주소 확인
                </h1>
                <p className="text-muted-foreground">
                    현재 사용 중인 공인 IP 주소
                </p>
            </header>

            {loading && (
                <div className="bg-card border border-border rounded-xl p-12 text-center">
                    <RefreshCw className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                    <p className="text-muted-foreground">IP 정보를 가져오는 중...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center">
                    <p className="text-red-500">{error}</p>
                    <button
                        onClick={fetchIpInfo}
                        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all"
                    >
                        다시 시도
                    </button>
                </div>
            )}

            {ipInfo && !loading && (
                <div className="space-y-4">
                    {/* IP Address */}
                    <div className="bg-card border border-border rounded-xl p-8 text-center">
                        <div className="text-sm text-muted-foreground mb-2">내 IP 주소</div>
                        <div className="text-4xl font-bold font-mono mb-4">{ipInfo.ip}</div>
                        <button
                            onClick={() => copyToClipboard(ipInfo.ip)}
                            className="flex items-center gap-2 mx-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    복사됨
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    복사하기
                                </>
                            )}
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-card border border-border rounded-xl p-6 space-y-3">
                        <h2 className="text-lg font-bold mb-4">상세 정보</h2>

                        <div className="flex justify-between p-3 bg-secondary rounded-lg">
                            <span className="text-muted-foreground">도시</span>
                            <span className="font-semibold">{ipInfo.city}</span>
                        </div>

                        <div className="flex justify-between p-3 bg-secondary rounded-lg">
                            <span className="text-muted-foreground">지역</span>
                            <span className="font-semibold">{ipInfo.region}</span>
                        </div>

                        <div className="flex justify-between p-3 bg-secondary rounded-lg">
                            <span className="text-muted-foreground">국가</span>
                            <span className="font-semibold">{ipInfo.country}</span>
                        </div>

                        <div className="flex justify-between p-3 bg-secondary rounded-lg">
                            <span className="text-muted-foreground">시간대</span>
                            <span className="font-semibold">{ipInfo.timezone}</span>
                        </div>

                        <div className="flex justify-between p-3 bg-secondary rounded-lg">
                            <span className="text-muted-foreground">ISP</span>
                            <span className="font-semibold text-sm">{ipInfo.isp}</span>
                        </div>
                    </div>

                    <button
                        onClick={fetchIpInfo}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary hover:bg-accent rounded-lg transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        새로고침
                    </button>
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>공인 IP 주소는 인터넷에 접속할 때 사용되는 고유한 주소입니다.</li>
                    <li>VPN이나 프록시를 사용하는 경우 실제 위치와 다를 수 있습니다.</li>
                    <li>위치 정보는 대략적인 정보이며 정확하지 않을 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default IpAddress;
