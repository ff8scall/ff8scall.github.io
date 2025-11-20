import { useState, useEffect } from 'react';

const useHistory = (key, maxItems = 10) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedHistory = localStorage.getItem(key);
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error('Failed to parse history', e);
            }
        }
    }, [key]);

    const saveHistory = (item) => {
        setHistory((prev) => {
            // 중복 제거 (내용이 같은 경우 최신으로 갱신)
            const filtered = prev.filter(i => JSON.stringify(i) !== JSON.stringify(item));
            const newHistory = [item, ...filtered].slice(0, maxItems);

            localStorage.setItem(key, JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(key);
    };

    return { history, saveHistory, clearHistory };
};

export default useHistory;
