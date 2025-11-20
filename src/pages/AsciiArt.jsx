import React, { useState } from 'react';
import { Type } from 'lucide-react';
import SEO from '../components/SEO';

const AsciiArt = () => {
    const [text, setText] = useState('');
    const [art, setArt] = useState('');
    const [style, setStyle] = useState('standard');

    const fonts = {
        standard: {
            A: ['  A  ', ' A A ', 'AAAAA', 'A   A', 'A   A'],
            B: ['BBBB ', 'B   B', 'BBBB ', 'B   B', 'BBBB '],
            C: [' CCC ', 'C   C', 'C    ', 'C   C', ' CCC '],
            D: ['DDDD ', 'D   D', 'D   D', 'D   D', 'DDDD '],
            E: ['EEEEE', 'E    ', 'EEE  ', 'E    ', 'EEEEE'],
            F: ['FFFFF', 'F    ', 'FFF  ', 'F    ', 'F    '],
            G: [' GGG ', 'G    ', 'G  GG', 'G   G', ' GGG '],
            H: ['H   H', 'H   H', 'HHHHH', 'H   H', 'H   H'],
            I: ['IIIII', '  I  ', '  I  ', '  I  ', 'IIIII'],
            J: ['JJJJJ', '    J', '    J', 'J   J', ' JJJ '],
            K: ['K   K', 'K  K ', 'KKK  ', 'K  K ', 'K   K'],
            L: ['L    ', 'L    ', 'L    ', 'L    ', 'LLLLL'],
            M: ['M   M', 'MM MM', 'M M M', 'M   M', 'M   M'],
            N: ['N   N', 'NN  N', 'N N N', 'N  NN', 'N   N'],
            O: [' OOO ', 'O   O', 'O   O', 'O   O', ' OOO '],
            P: ['PPPP ', 'P   P', 'PPPP ', 'P    ', 'P    '],
            Q: [' QQQ ', 'Q   Q', 'Q   Q', 'Q  Q ', ' QQ Q'],
            R: ['RRRR ', 'R   R', 'RRRR ', 'R  R ', 'R   R'],
            S: [' SSS ', 'S    ', ' SSS ', '    S', 'SSSS '],
            T: ['TTTTT', '  T  ', '  T  ', '  T  ', '  T  '],
            U: ['U   U', 'U   U', 'U   U', 'U   U', ' UUU '],
            V: ['V   V', 'V   V', 'V   V', ' V V ', '  V  '],
            W: ['W   W', 'W   W', 'W W W', 'WW WW', 'W   W'],
            X: ['X   X', ' X X ', '  X  ', ' X X ', 'X   X'],
            Y: ['Y   Y', ' Y Y ', '  Y  ', '  Y  ', '  Y  '],
            Z: ['ZZZZZ', '   Z ', '  Z  ', ' Z   ', 'ZZZZZ'],
            ' ': ['     ', '     ', '     ', '     ', '     ']
        }
    };

    const generateArt = () => {
        const upperText = text.toUpperCase();
        const lines = ['', '', '', '', ''];

        for (let char of upperText) {
            const charArt = fonts[style][char] || fonts[style][' '];
            for (let i = 0; i < 5; i++) {
                lines[i] += charArt[i] + ' ';
            }
        }

        setArt(lines.join('\n'));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="아스키아트 생성 - Utility Hub"
                description="텍스트를 아스키 아트로 변환할 수 있습니다. 큰 글자 텍스트 아트를 만들어보세요."
                keywords="아스키아트, ASCII아트, 텍스트아트, 문자그림"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Type className="w-8 h-8" />
                    아스키아트 생성
                </h1>
                <p className="text-muted-foreground">
                    텍스트를 아스키 아트로 변환하세요
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        변환할 텍스트 (영문, 최대 20자 권장)
                    </label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value.slice(0, 20))}
                        placeholder="HELLO"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <button
                    onClick={generateArt}
                    disabled={!text.trim()}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:brightness-110 transition-all disabled:opacity-50"
                >
                    아스키 아트 생성
                </button>
            </div>

            {/* Output */}
            {art && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <h2 className="text-lg font-bold">결과</h2>
                    <div className="bg-background rounded-lg p-6 overflow-x-auto">
                        <pre className="font-mono text-sm whitespace-pre">
                            {art}
                        </pre>
                    </div>
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>영문 알파벳과 공백만 지원됩니다.</li>
                    <li>텍스트가 길수록 아스키 아트도 길어집니다.</li>
                    <li>생성된 아트를 복사하여 메시지, 문서 등에 사용할 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default AsciiArt;
