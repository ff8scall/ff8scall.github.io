import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import SEO from '../components/SEO';

const BloodType = () => {
    const [selectedType, setSelectedType] = useState('A');

    const bloodTypes = {
        'A': {
            title: 'A형',
            color: 'bg-red-500',
            personality: {
                positive: ['성실하고 책임감이 강함', '섬세하고 배려심이 많음', '계획적이고 조직적', '완벽주의 성향', '타인의 감정을 잘 이해함'],
                negative: ['걱정이 많고 스트레스를 잘 받음', '우유부단한 면이 있음', '고집이 센 편', '비판을 민감하게 받아들임', '변화를 두려워함'],
                love: '상대방을 배려하고 헌신적이지만, 때로는 자신의 감정 표현에 서툴 수 있습니다.',
                work: '꼼꼼하고 체계적인 업무 스타일로 신뢰를 받지만, 완벽주의로 인해 스트레스를 받을 수 있습니다.',
                health: '스트레스에 민감하므로 충분한 휴식과 규칙적인 생활이 중요합니다.'
            }
        },
        'B': {
            title: 'B형',
            color: 'bg-blue-500',
            personality: {
                positive: ['자유롭고 창의적', '낙천적이고 긍정적', '호기심이 많고 모험적', '솔직하고 직설적', '적응력이 뛰어남'],
                negative: ['집중력이 부족할 수 있음', '변덕스러운 면이 있음', '규칙을 싫어함', '타인의 시선에 무관심', '계획성이 부족함'],
                love: '자유로운 연애를 선호하며, 솔직한 감정 표현으로 상대방을 편안하게 만듭니다.',
                work: '창의적인 아이디어가 많지만, 루틴한 업무에는 쉽게 지루함을 느낄 수 있습니다.',
                health: '활동적인 생활을 즐기지만, 불규칙한 생활 패턴에 주의가 필요합니다.'
            }
        },
        'O': {
            title: 'O형',
            color: 'bg-yellow-500',
            personality: {
                positive: ['리더십이 강함', '사교적이고 외향적', '목표 지향적', '현실적이고 실용적', '자신감이 넘침'],
                negative: ['고집이 세고 독단적', '질투심이 강할 수 있음', '감정 기복이 있음', '타협을 어려워함', '경쟁심이 강함'],
                love: '열정적이고 주도적인 연애 스타일로, 상대방을 리드하는 것을 좋아합니다.',
                work: '목표를 향해 추진력 있게 일하며, 팀을 이끄는 리더 역할에 적합합니다.',
                health: '에너지가 넘치지만, 과도한 스트레스와 경쟁으로 인한 피로에 주의하세요.'
            }
        },
        'AB': {
            title: 'AB형',
            color: 'bg-purple-500',
            personality: {
                positive: ['합리적이고 논리적', '예술적 감각이 뛰어남', '객관적인 판단력', '독창적이고 개성적', '다재다능함'],
                negative: ['이중적인 면이 있음', '감정 표현이 서툴', '우유부단할 수 있음', '타인과 거리를 둠', '예민하고 민감함'],
                love: '이성적이면서도 감성적인 면을 동시에 가지고 있어, 복잡한 매력을 발산합니다.',
                work: '창의적이고 분석적인 능력을 동시에 발휘하며, 독특한 시각으로 문제를 해결합니다.',
                health: '스트레스에 민감하므로 정신적 안정과 균형 잡힌 생활이 중요합니다.'
            }
        }
    };

    const currentType = bloodTypes[selectedType];

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <SEO
                title="혈액형별 성격 - Utility Hub"
                description="A형, B형, O형, AB형 혈액형별 성격과 특징을 알아보세요. 재미있는 혈액형 성격 테스트입니다."
                keywords="혈액형, 혈액형 성격, A형 성격, B형 성격, O형 성격, AB형 성격"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Heart className="w-8 h-8 text-red-500" />
                    혈액형별 성격
                </h1>
                <p className="text-muted-foreground">
                    혈액형으로 알아보는 나의 성격과 특징
                </p>
            </header>

            {/* Blood Type Selector */}
            <div className="grid grid-cols-4 gap-3">
                {Object.keys(bloodTypes).map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`py-6 rounded-xl font-bold text-2xl transition-all ${selectedType === type
                                ? `${bloodTypes[type].color} text-white scale-105 shadow-lg`
                                : 'bg-card border border-border hover:scale-105'
                            }`}
                    >
                        {bloodTypes[type].title}
                    </button>
                ))}
            </div>

            {/* Personality Details */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                <div className={`text-center py-4 rounded-lg ${currentType.color} text-white`}>
                    <h2 className="text-2xl font-bold">{currentType.title}의 성격</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold text-lg mb-2 text-green-600 dark:text-green-400">✨ 장점</h3>
                        <ul className="space-y-2">
                            {currentType.personality.positive.map((trait, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>{trait}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-2 text-orange-600 dark:text-orange-400">⚠️ 단점</h3>
                        <ul className="space-y-2">
                            {currentType.personality.negative.map((trait, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-orange-500 mt-1">•</span>
                                    <span>{trait}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-border space-y-3">
                        <div>
                            <h3 className="font-bold mb-1">💕 연애 스타일</h3>
                            <p className="text-muted-foreground">{currentType.personality.love}</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">💼 업무 스타일</h3>
                            <p className="text-muted-foreground">{currentType.personality.work}</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">🏥 건강 관리</h3>
                            <p className="text-muted-foreground">{currentType.personality.health}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>혈액형 성격은 과학적 근거가 부족한 재미 요소입니다.</li>
                    <li>모든 사람은 고유한 개성을 가지고 있습니다.</li>
                    <li>혈액형보다는 개인의 경험과 환경이 성격 형성에 더 큰 영향을 미칩니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default BloodType;
