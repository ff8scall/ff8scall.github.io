import { useState, useEffect } from 'react';

const STORAGE_KEY = 'utility-hub-tool-analytics';

/**
 * Hook for tracking tool usage analytics
 * Stores click counts in localStorage for each tool
 */
const useToolAnalytics = () => {
    const [analytics, setAnalytics] = useState({});

    // Load analytics from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setAnalytics(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load analytics:', error);
        }
    }, []);

    // Track tool click
    const trackToolClick = (toolId) => {
        setAnalytics(prev => {
            const updated = {
                ...prev,
                [toolId]: {
                    clicks: (prev[toolId]?.clicks || 0) + 1,
                    lastAccessed: new Date().toISOString()
                }
            };

            // Save to localStorage
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (error) {
                console.error('Failed to save analytics:', error);
            }

            return updated;
        });

        // Send to Google Analytics if available
        if (window.gtag) {
            window.gtag('event', 'tool_click', {
                event_category: 'Tool Usage',
                event_label: toolId,
                value: 1
            });
        }
    };

    // Get click count for a specific tool
    const getToolClicks = (toolId) => {
        return analytics[toolId]?.clicks || 0;
    };

    // Get all analytics sorted by clicks
    const getPopularTools = () => {
        return Object.entries(analytics)
            .map(([toolId, data]) => ({ toolId, ...data }))
            .sort((a, b) => b.clicks - a.clicks);
    };

    // Clear all analytics (for debugging/testing)
    const clearAnalytics = () => {
        localStorage.removeItem(STORAGE_KEY);
        setAnalytics({});
    };

    return {
        trackToolClick,
        getToolClicks,
        getPopularTools,
        clearAnalytics,
        analytics
    };
};

export default useToolAnalytics;
