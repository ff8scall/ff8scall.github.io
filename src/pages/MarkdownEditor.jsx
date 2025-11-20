import React, { useState, useEffect } from 'react';
import { FileText, Eye, Code, Copy } from 'lucide-react';
import { marked } from 'marked';
import SEO from '../components/SEO';

const MarkdownEditor = () => {
    const [markdown, setMarkdown] = useState(`# 마크다운 에디터에 오신 것을 환영합니다!

## 기능
- **굵은 글씨**와 *기울임 글씨*
- [링크](https://example.com)
- 리스트 작성

### 코드 블록
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> 인용문도 작성할 수 있습니다.

---

왼쪽에 마크다운을 입력하면 오른쪽에 미리보기가 표시됩니다.`);
    const [html, setHtml] = useState('');
    const [activeTab, setActiveTab] = useState('split'); // split, edit, preview

    useEffect(() => {
        // 마크다운을 HTML로 변환
        const convertedHtml = marked(markdown);
        setHtml(convertedHtml);
    }, [markdown]);

    const copyMarkdown = () => {
        navigator.clipboard.writeText(markdown);
    };

    const copyHtml = () => {
        navigator.clipboard.writeText(html);
    };

    const downloadMarkdown = () => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'document.md';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <SEO
                title="마크다운 에디터 - Utility Hub"
                description="온라인 마크다운 에디터. 실시간 미리보기와 함께 마크다운 문서를 작성하고 편집하세요."
                keywords="마크다운 에디터, markdown editor, md 에디터, 마크다운 미리보기"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <FileText className="w-8 h-8 text-primary" />
                    마크다운 에디터
                </h1>
                <p className="text-muted-foreground">
                    실시간 미리보기와 함께 마크다운 문서를 작성하세요
                </p>
            </header>

            {/* Toolbar */}
            <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex flex-wrap items-center gap-2">
                    {/* View Mode */}
                    <div className="flex gap-1 bg-secondary rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab('edit')}
                            className={`px-3 py-1 rounded-md text-sm transition-colors ${activeTab === 'edit' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                                }`}
                        >
                            <Code className="w-4 h-4 inline mr-1" />
                            편집
                        </button>
                        <button
                            onClick={() => setActiveTab('split')}
                            className={`px-3 py-1 rounded-md text-sm transition-colors ${activeTab === 'split' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                                }`}
                        >
                            분할
                        </button>
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`px-3 py-1 rounded-md text-sm transition-colors ${activeTab === 'preview' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                                }`}
                        >
                            <Eye className="w-4 h-4 inline mr-1" />
                            미리보기
                        </button>
                    </div>

                    <div className="flex-1" />

                    {/* Actions */}
                    <button
                        onClick={copyMarkdown}
                        className="px-3 py-1 bg-secondary hover:bg-accent rounded-md text-sm transition-colors"
                    >
                        <Copy className="w-4 h-4 inline mr-1" />
                        MD 복사
                    </button>
                    <button
                        onClick={copyHtml}
                        className="px-3 py-1 bg-secondary hover:bg-accent rounded-md text-sm transition-colors"
                    >
                        <Copy className="w-4 h-4 inline mr-1" />
                        HTML 복사
                    </button>
                    <button
                        onClick={downloadMarkdown}
                        className="px-3 py-1 bg-primary text-primary-foreground hover:brightness-110 rounded-md text-sm transition-all"
                    >
                        다운로드
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className={`grid ${activeTab === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} divide-x divide-border`}>
                    {/* Markdown Input */}
                    {(activeTab === 'edit' || activeTab === 'split') && (
                        <div className="flex flex-col">
                            <div className="px-4 py-2 bg-secondary border-b border-border">
                                <span className="text-sm font-medium">마크다운</span>
                            </div>
                            <textarea
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                className="flex-1 p-4 bg-background border-0 focus:outline-none font-mono text-sm resize-none min-h-[600px]"
                                placeholder="여기에 마크다운을 입력하세요..."
                            />
                        </div>
                    )}

                    {/* Preview */}
                    {(activeTab === 'preview' || activeTab === 'split') && (
                        <div className="flex flex-col">
                            <div className="px-4 py-2 bg-secondary border-b border-border">
                                <span className="text-sm font-medium">미리보기</span>
                            </div>
                            <div
                                className="flex-1 p-4 prose prose-sm dark:prose-invert max-w-none overflow-auto min-h-[600px]"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Guide */}
            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 마크다운 문법</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-medium text-foreground mb-1">제목</p>
                        <code className="block bg-background p-2 rounded"># H1<br />## H2<br />### H3</code>
                    </div>
                    <div>
                        <p className="font-medium text-foreground mb-1">강조</p>
                        <code className="block bg-background p-2 rounded">**굵게**<br />*기울임*<br />~~취소선~~</code>
                    </div>
                    <div>
                        <p className="font-medium text-foreground mb-1">리스트</p>
                        <code className="block bg-background p-2 rounded">- 항목 1<br />- 항목 2<br />  - 하위 항목</code>
                    </div>
                    <div>
                        <p className="font-medium text-foreground mb-1">링크 & 이미지</p>
                        <code className="block bg-background p-2 rounded">[링크](url)<br />![이미지](url)</code>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkdownEditor;
