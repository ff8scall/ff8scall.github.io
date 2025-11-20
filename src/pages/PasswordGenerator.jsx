import React, { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import SEO from '../components/SEO';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        let charset = '';
        if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (options.numbers) charset += '0123456789';
        if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (charset === '') {
            setPassword('최소 하나의 옵션을 선택하세요');
            return;
        }

        let result = '';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            result += charset[array[i] % charset.length];
        }

        setPassword(result);
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const getStrength = () => {
        if (!password || password.includes('선택')) return { text: '', color: '' };

        let score = 0;
        if (password.length >= 12) score++;
        if (password.length >= 16) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        if (score <= 2) return { text: '약함', color: 'text-red-500' };
        if (score <= 4) return { text: '보통', color: 'text-yellow-500' };
        return { text: '강함', color: 'text-green-500' };
    };

    const strength = getStrength();

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="랜덤 비밀번호 생성기 - Utility Hub"
                description="강력한 랜덤 비밀번호를 생성하세요. 대소문자, 숫자, 특수문자를 조합하여 안전한 비밀번호를 만들 수 있습니다."
                keywords="비밀번호 생성기, 랜덤 비밀번호, 강력한 비밀번호, 패스워드 생성"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">랜덤 비밀번호 생성기</h1>
                <p className="text-muted-foreground">
                    강력하고 안전한 비밀번호를 생성하세요
                </p>
            </header>

            {/* Password Display */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">생성된 비밀번호</label>
                    {strength.text && (
                        <span className={`text-sm font-bold ${strength.color}`}>
                            강도: {strength.text}
                        </span>
                    )}
                </div>
                <div className="relative">
                    <input
                        type="text"
                        value={password}
                        readOnly
                        placeholder="비밀번호가 여기에 표시됩니다"
                        className="w-full px-4 py-4 pr-24 bg-background border border-border rounded-lg font-mono text-lg focus:outline-none"
                    />
                    {password && !password.includes('선택') && (
                        <button
                            onClick={copyToClipboard}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-secondary hover:bg-accent rounded-md transition-colors"
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-green-500" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Options */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">
                        길이: {length}자
                    </label>
                    <input
                        type="range"
                        min="8"
                        max="32"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>8</span>
                        <span>32</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={options.uppercase}
                            onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                            className="w-5 h-5 rounded border-border"
                        />
                        <span>대문자 포함 (A-Z)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={options.lowercase}
                            onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                            className="w-5 h-5 rounded border-border"
                        />
                        <span>소문자 포함 (a-z)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={options.numbers}
                            onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                            className="w-5 h-5 rounded border-border"
                        />
                        <span>숫자 포함 (0-9)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={options.symbols}
                            onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                            className="w-5 h-5 rounded border-border"
                        />
                        <span>특수문자 포함 (!@#$%^&*)</span>
                    </label>
                </div>

                <button
                    onClick={generatePassword}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:brightness-110 transition-all"
                >
                    <RefreshCw className="w-5 h-5" />
                    비밀번호 생성
                </button>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안전한 비밀번호 팁</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>최소 12자 이상 사용하세요.</li>
                    <li>대소문자, 숫자, 특수문자를 모두 포함하세요.</li>
                    <li>생일, 이름 등 추측 가능한 정보는 피하세요.</li>
                    <li>각 사이트마다 다른 비밀번호를 사용하세요.</li>
                </ul>
            </div>
        </div>
    );
};

export default PasswordGenerator;
