import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import SEO from '../components/SEO';

const WebEditor = () => {
    const [html, setHtml] = useState('<h1>Hello World!</h1>');
    const [css, setCss] = useState('h1 { color: #3b82f6; text-align: center; }');
    const [js, setJs] = useState('console.log("Hello from Web Editor!");');
    const [output, setOutput] = useState('');

    const runCode = () => {
        const combinedCode = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}<\/script>
            </body>
            </html>
        `;
        setOutput(combinedCode);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            runCode();
        }, 500);
        return () => clearTimeout(timer);
    }, [html, css, js]);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <SEO
                title="웹 에디터 - Utility Hub"
                description="HTML, CSS, JavaScript를 실시간으로 작성하고 미리보기할 수 있는 온라인 웹 에디터입니다."
                keywords="웹에디터, HTML에디터, 코드에디터, 온라인에디터"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">웹 에디터</h1>
                <p className="text-muted-foreground">
                    HTML, CSS, JavaScript를 실시간으로 작성하고 미리보기하세요
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* HTML */}
                <div className="bg-card border border-border rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold">HTML</label>
                        <span className="text-xs text-muted-foreground">자동 실행</span>
                    </div>
                    <textarea
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        className="w-full h-64 px-3 py-2 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="HTML 코드를 입력하세요..."
                    />
                </div>

                {/* CSS */}
                <div className="bg-card border border-border rounded-xl p-4 space-y-2">
                    <label className="text-sm font-bold">CSS</label>
                    <textarea
                        value={css}
                        onChange={(e) => setCss(e.target.value)}
                        className="w-full h-64 px-3 py-2 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="CSS 코드를 입력하세요..."
                    />
                </div>

                {/* JavaScript */}
                <div className="bg-card border border-border rounded-xl p-4 space-y-2">
                    <label className="text-sm font-bold">JavaScript</label>
                    <textarea
                        value={js}
                        onChange={(e) => setJs(e.target.value)}
                        className="w-full h-64 px-3 py-2 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="JavaScript 코드를 입력하세요..."
                    />
                </div>
            </div>

            {/* Preview */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">미리보기</h2>
                    <button
                        onClick={runCode}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all text-sm"
                    >
                        <Play className="w-4 h-4" />
                        실행
                    </button>
                </div>
                <div className="bg-white rounded-lg border-2 border-border min-h-96">
                    <iframe
                        srcDoc={output}
                        title="preview"
                        sandbox="allow-scripts"
                        className="w-full h-96 rounded-lg"
                    />
                </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>각 에디터에 HTML, CSS, JavaScript 코드를 입력하세요.</li>
                    <li>코드는 자동으로 실행되며, 미리보기 창에서 결과를 확인할 수 있습니다.</li>
                    <li>간단한 웹 페이지 프로토타입을 빠르게 만들고 테스트할 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default WebEditor;
