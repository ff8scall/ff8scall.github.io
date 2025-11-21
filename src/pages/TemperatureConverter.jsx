import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Thermometer, RefreshCw } from 'lucide-react';

const TemperatureConverter = () => {
    const [values, setValues] = useState({
        celsius: '',
        fahrenheit: '',
        kelvin: ''
    });

    const convert = (type, value) => {
        if (value === '') {
            setValues({ celsius: '', fahrenheit: '', kelvin: '' });
            return;
        }

        const val = parseFloat(value);
        if (isNaN(val)) return;

        let c, f, k;

        if (type === 'celsius') {
            c = val;
            f = (val * 9 / 5) + 32;
            k = val + 273.15;
        } else if (type === 'fahrenheit') {
            f = val;
            c = (val - 32) * 5 / 9;
            k = (val - 32) * 5 / 9 + 273.15;
        } else if (type === 'kelvin') {
            k = val;
            c = val - 273.15;
            f = (val - 273.15) * 9 / 5 + 32;
        }

        setValues({
            celsius: type === 'celsius' ? value : c.toFixed(2).replace(/\.00$/, ''),
            fahrenheit: type === 'fahrenheit' ? value : f.toFixed(2).replace(/\.00$/, ''),
            kelvin: type === 'kelvin' ? value : k.toFixed(2).replace(/\.00$/, '')
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        convert(name, value);
    };

    const reset = () => {
        setValues({ celsius: '', fahrenheit: '', kelvin: '' });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="온도 변환기 - 섭씨, 화씨, 켈빈 변환"
                description="섭씨(℃), 화씨(℉), 켈빈(K) 온도를 실시간으로 변환하는 무료 도구입니다."
                keywords={['온도 변환', '섭씨 화씨 변환', '켈빈 변환', 'temperature converter', 'celsius', 'fahrenheit', 'kelvin']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Thermometer className="w-8 h-8 text-red-500" />
                    온도 변환기
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    섭씨, 화씨, 켈빈 온도를 쉽고 빠르게 변환하세요.
                </p>
            </div>

            <div className="card p-6 space-y-6">
                <div className="grid gap-6">
                    {/* Celsius */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            섭씨 (Celsius, °C)
                        </label>
                        <input
                            type="number"
                            name="celsius"
                            value={values.celsius}
                            onChange={handleChange}
                            placeholder="0"
                            className="input w-full text-lg"
                        />
                    </div>

                    {/* Fahrenheit */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            화씨 (Fahrenheit, °F)
                        </label>
                        <input
                            type="number"
                            name="fahrenheit"
                            value={values.fahrenheit}
                            onChange={handleChange}
                            placeholder="32"
                            className="input w-full text-lg"
                        />
                    </div>

                    {/* Kelvin */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            켈빈 (Kelvin, K)
                        </label>
                        <input
                            type="number"
                            name="kelvin"
                            value={values.kelvin}
                            onChange={handleChange}
                            placeholder="273.15"
                            className="input w-full text-lg"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={reset}
                        className="btn btn-secondary flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        초기화
                    </button>
                </div>
            </div>

            <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    ℹ️ 온도 변환 공식
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>• <strong>섭씨 → 화씨:</strong> (°C × 9/5) + 32 = °F</li>
                    <li>• <strong>화씨 → 섭씨:</strong> (°F − 32) × 5/9 = °C</li>
                    <li>• <strong>섭씨 → 켈빈:</strong> °C + 273.15 = K</li>
                    <li>• <strong>켈빈 → 섭씨:</strong> K − 273.15 = °C</li>
                </ul>
            </div>
        </div>
    );
};

export default TemperatureConverter;
