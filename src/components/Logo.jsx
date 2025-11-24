import React from 'react';

const Logo = ({ className = "" }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Icon */}
            <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary rounded-lg shadow-sm rotate-3 opacity-20"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-primary to-blue-600 rounded-lg shadow-md flex items-center justify-center text-white">
                    <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M7 4v10a5 5 0 0 0 10 0V4" />
                    </svg>
                </div>
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center">
                <span className="font-bold text-lg leading-none tracking-tight text-foreground">
                    Utility Hub
                </span>
            </div>
        </div>
    );
};

export default Logo;
