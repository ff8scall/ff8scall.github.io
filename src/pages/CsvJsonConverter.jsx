import React, { useState } from 'react';
import SEO from '../components/SEO';
import { ArrowLeftRight, Copy, Download, Check, FileJson, FileSpreadsheet } from 'lucide-react';

const CsvJsonConverter = () => {
    const [mode, setMode] = useState('csvToJson'); // csvToJson or jsonToCsv
    const [csvInput, setCsvInput] = useState('');
    const [jsonInput, setJsonInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const csvToJson = (csv) => {
        try {
            const lines = csv.trim().split('\n');
            if (lines.length < 2) {
                throw new Error('CSV는 최소 헤더와 1개 이상의 데이터 행이 필요합니다.');
            }

            const headers = lines[0].split(',').map(h => h.trim());
            const result = [];

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(v => v.trim());
                const obj = {};
                headers.forEach((header, index) => {
                    // Try to parse as number if possible
                    const value = values[index];
                    obj[header] = isNaN(value) ? value : Number(value);
                });
                result.push(obj);
            }

            return JSON.stringify(result, null, 2);
        } catch (err) {
            throw new Error(`CSV 변환 오류: ${err.message}`);
        }
    };

    const jsonToCsv = (json) => {
        try {
            const data = JSON.parse(json);

            if (!Array.isArray(data)) {
                throw new Error('JSON은 배열 형식이어야 합니다.');
            }

            if (data.length === 0) {
                throw new Error('빈 배열은 변환할 수 없습니다.');
            }

            // Get headers from first object
            const headers = Object.keys(data[0]);
            const csvLines = [headers.join(',')];

            // Convert each object to CSV row
            data.forEach(obj => {
                const values = headers.map(header => {
                    const value = obj[header];
                    // Wrap in quotes if contains comma
                    if (typeof value === 'string' && value.includes(',')) {
                        return `"${value}"`;
                    }
                    return value;
                });
                csvLines.push(values.join(','));
            });

            return csvLines.join('\n');
        } catch (err) {
            throw new Error(`JSON 변환 오류: ${err.message}`);
        }
    };

    const handleConvert = () => {
        setError('');
        try {
            if (mode === 'csvToJson') {
                if (!csvInput.trim()) {
                    setError('CSV 데이터를 입력해주세요.');
                    return;
                }
                const result = csvToJson(csvInput);
                setOutput(result);
            } else {
                if (!jsonInput.trim()) {
                    setError('JSON 데이터를 입력해주세요.');
                    return;
                }
                const result = jsonToCsv(jsonInput);
                setOutput(result);
            }
        } catch (err) {
            setError(err.message);
            setOutput('');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = mode === 'csvToJson' ? 'output.json' : 'output.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const loadSample = () => {
        if (mode === 'csvToJson') {
            setCsvInput(`name,age,city
John,30,Seoul
Jane,25,Busan
Bob,35,Incheon`);
        } else {
            setJsonInput(`[
  {
    "name": "John",
    "age": 30,
    "city": "Seoul"
  },
  {
    "name": "Jane",
    "age": 25,
    "city": "Busan"
  },
  {
    "name": "Bob",
    "age": 35,
    "city": "Incheon"
  }
]`);
        }
    };

    const switchMode = () => {
        setMode(mode === 'csvToJson' ? 'jsonToCsv' : 'csvToJson');
        setCsvInput('');
        setJsonInput('');
        setOutput('');
        setError('');
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <SEO
                title="CSV ↔ JSON 변환기 - 데이터 변환 도구"
                description="CSV와 JSON 형식을 상호 변환하세요. 데이터 처리와 API 작업에 필수적인 도구입니다."
                keywords={['csv', 'json', 'converter', '변환기', 'csv to json', 'json to csv', 'data']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <ArrowLeftRight className="w-8 h-8 text-purple-500" />
                    CSV ↔ JSON 변환기
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    CSV와 JSON 형식을 쉽게 변환하세요
                </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                    <div className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${mode === 'csvToJson' ? 'bg-white dark:bg-gray-700 shadow-md' : ''
                        }`}>
                        <FileSpreadsheet className="w-4 h-4" />
                        CSV
                    </div>
                    <button
                        onClick={switchMode}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <ArrowLeftRight className="w-5 h-5" />
                    </button>
                    <div className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${mode === 'jsonToCsv' ? 'bg-white dark:bg-gray-700 shadow-md' : ''
                        }`}>
                        <FileJson className="w-4 h-4" />
                        JSON
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Input */}
                <div className="card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            {mode === 'csvToJson' ? (
                                <>
                                    <FileSpreadsheet className="w-5 h-5 text-green-500" />
                                    CSV 입력
                                </>
                            ) : (
                                <>
                                    <FileJson className="w-5 h-5 text-blue-500" />
                                    JSON 입력
                                </>
                            )}
                        </h3>
                        <button
                            onClick={loadSample}
                            className="text-sm text-blue-500 hover:text-blue-600"
                        >
                            샘플 불러오기
                        </button>
                    </div>

                    <textarea
                        value={mode === 'csvToJson' ? csvInput : jsonInput}
                        onChange={(e) => mode === 'csvToJson' ? setCsvInput(e.target.value) : setJsonInput(e.target.value)}
                        className="input w-full h-[400px] font-mono text-sm"
                        placeholder={mode === 'csvToJson'
                            ? 'CSV 데이터를 입력하세요...\n예:\nname,age,city\nJohn,30,Seoul'
                            : 'JSON 배열을 입력하세요...\n예:\n[\n  {"name": "John", "age": 30}\n]'
                        }
                    />

                    <button
                        onClick={handleConvert}
                        className="btn btn-primary w-full flex items-center justify-center gap-2"
                    >
                        <ArrowLeftRight className="w-5 h-5" />
                        {mode === 'csvToJson' ? 'JSON으로 변환' : 'CSV로 변환'}
                    </button>
                </div>

                {/* Output */}
                <div className="card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            {mode === 'csvToJson' ? (
                                <>
                                    <FileJson className="w-5 h-5 text-blue-500" />
                                    JSON 출력
                                </>
                            ) : (
                                <>
                                    <FileSpreadsheet className="w-5 h-5 text-green-500" />
                                    CSV 출력
                                </>
                            )}
                        </h3>
                        {output && (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="btn btn-ghost btn-sm flex items-center gap-1"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? '복사됨' : '복사'}
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="btn btn-ghost btn-sm flex items-center gap-1"
                                >
                                    <Download className="w-4 h-4" />
                                    다운로드
                                </button>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <textarea
                        value={output}
                        readOnly
                        className="input w-full h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                        placeholder="변환 결과가 여기에 표시됩니다..."
                    />
                </div>
            </div>

            {/* Info */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-sm space-y-2">
                    <p className="font-bold text-blue-800 dark:text-blue-200">CSV 형식 안내</p>
                    <ul className="space-y-1 text-blue-700 dark:text-blue-300 list-disc list-inside">
                        <li>첫 번째 줄은 헤더(컬럼명)여야 합니다</li>
                        <li>각 값은 쉼표(,)로 구분됩니다</li>
                        <li>쉼표가 포함된 값은 따옴표로 감싸세요</li>
                    </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-sm space-y-2">
                    <p className="font-bold text-purple-800 dark:text-purple-200">JSON 형식 안내</p>
                    <ul className="space-y-1 text-purple-700 dark:text-purple-300 list-disc list-inside">
                        <li>배열 형식이어야 합니다 [ ]</li>
                        <li>각 객체는 동일한 키를 가져야 합니다</li>
                        <li>유효한 JSON 문법을 사용하세요</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CsvJsonConverter;
