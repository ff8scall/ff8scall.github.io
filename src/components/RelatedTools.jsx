import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { tools } from '../data/tools';
import { ArrowRight } from 'lucide-react';

const RelatedTools = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // Memoize the related tools calculation
    const relatedTools = useMemo(() => {
        // 1. Find current tool
        const currentTool = tools.find(t => t.path === currentPath);

        if (!currentTool) return [];

        // 2. Filter by same category, exclude current
        let candidates = tools.filter(t =>
            t.category === currentTool.category && t.id !== currentTool.id
        );

        // 3. If less than 4, fill with random popular tools (excluding current and already selected)
        if (candidates.length < 4) {
            const others = tools.filter(t =>
                t.id !== currentTool.id && !candidates.includes(t)
            );
            // Shuffle others
            const shuffled = others.sort(() => 0.5 - Math.random());
            candidates = [...candidates, ...shuffled.slice(0, 4 - candidates.length)];
        }

        // 4. Limit to 4 items
        return candidates.slice(0, 4);
    }, [currentPath]);

    if (relatedTools.length === 0) return null;

    return (
        <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    함께 보면 좋은 도구
                </h3>
                <Link to="/" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                    전체 보기 <ArrowRight className="w-3 h-3" />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {relatedTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                        <Link
                            key={tool.id}
                            to={tool.path}
                            className="group flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all duration-200"
                        >
                            <div className={`p-2 rounded-lg ${tool.color} bg-opacity-10 text-opacity-100`}>
                                {/* Note: We use the color class for bg but with opacity, or text color. 
                                   Since tool.color is like 'bg-red-500', we need to handle it carefully for icons.
                                   Let's just use the tool.color for the icon background with low opacity.
                                */}
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${tool.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                                    {tool.title}
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                    {tool.description}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedTools;
