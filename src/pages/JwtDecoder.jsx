import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Key, AlertCircle, CheckCircle2 } from 'lucide-react';

const JwtDecoder = () => {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState(null);
    const [payload, setPayload] = useState(null);
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!token) {
            setHeader(null);
            setPayload(null);
            setError('');
            setIsValid(false);
            return;
        }

        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT format. A JWT must have 3 parts (Header, Payload, Signature).');
            }

            const decodePart = (part) => {
                try {
                    return JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/')));
                } catch (e) {
                    throw new Error('Failed to decode base64 string.');
                }
            };

            const decodedHeader = decodePart(parts[0]);
            const decodedPayload = decodePart(parts[1]);

            setHeader(decodedHeader);
            setPayload(decodedPayload);
            setError('');
            setIsValid(true);
        } catch (err) {
            setHeader(null);
            setPayload(null);
            setError(err.message);
            setIsValid(false);
        }
    }, [token]);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="JWT 디코더 - JSON Web Token Decode"
                description="JWT(JSON Web Token)를 디코딩하여 헤더와 페이로드 내용을 확인하는 무료 도구입니다. 서명 검증 없이 내용만 확인합니다."
                keywords={['JWT 디코더', 'JWT decode', 'JSON Web Token', 'token debugger', 'jwt viewer']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Key className="w-8 h-8 text-yellow-500" />
                    JWT 디코더
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    JWT 토큰을 입력하여 내용을 확인하세요. (서버로 전송되지 않으며 브라우저에서만 처리됩니다)
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="card p-4 space-y-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Encoded Token
                        </label>
                        <textarea
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                            className={`input w-full h-64 resize-none font-mono text-sm ${token && !isValid ? 'border-red-500 focus:ring-red-500' : ''
                                } ${token && isValid ? 'border-green-500 focus:ring-green-500' : ''}`}
                        />
                        {error && (
                            <div className="text-red-500 text-sm flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}
                        {isValid && (
                            <div className="text-green-500 text-sm flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                Valid JWT Format
                            </div>
                        )}
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                    {/* Header */}
                    <div className="card p-4 space-y-2">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Header</h3>
                            <span className="text-xs text-gray-500">Algorithm & Token Type</span>
                        </div>
                        <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm font-mono overflow-auto max-h-40">
                            {header ? JSON.stringify(header, null, 2) : <span className="text-gray-400">// Header will appear here</span>}
                        </pre>
                    </div>

                    {/* Payload */}
                    <div className="card p-4 space-y-2">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Payload</h3>
                            <span className="text-xs text-gray-500">Data & Claims</span>
                        </div>
                        <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm font-mono overflow-auto max-h-96">
                            {payload ? JSON.stringify(payload, null, 2) : <span className="text-gray-400">// Payload will appear here</span>}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JwtDecoder;
