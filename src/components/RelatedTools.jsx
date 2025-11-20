import React from 'react';
import { Link } from 'react-router-dom';
import { tools } from '../data/tools';

const RelatedTools = ({ relatedIds }) => {
    const relatedTools = tools.filter(tool => relatedIds.includes(tool.id));

    if (relatedTools.length === 0) return null;

    return (
        <div className="space-y-4 pt-8 border-t border-border">
            <h3 className="text-xl font-bold text-foreground">함께 사용하면 좋은 도구</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {relatedTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                        <Link
                            key={tool.id}
                            to={tool.path}
                            className={`${tool.color} aspect-square rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-white hover:scale-105 transition-transform shadow-md hover:shadow-lg group`}
                        >
                            <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold text-center leading-tight">
                                {tool.title}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedTools;
