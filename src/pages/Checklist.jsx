import React, { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import SEO from '../components/SEO';

const Checklist = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const addItem = () => {
        if (!newItem.trim()) return;
        setItems([...items, { id: Date.now(), text: newItem, completed: false }]);
        setNewItem('');
    };

    const toggleItem = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const clearCompleted = () => {
        setItems(items.filter(item => !item.completed));
    };

    const stats = {
        total: items.length,
        completed: items.filter(i => i.completed).length,
        remaining: items.filter(i => !i.completed).length
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="체크리스트 - Utility Hub"
                description="할 일 목록을 관리할 수 있는 간단한 체크리스트 도구입니다."
                keywords="체크리스트, 할일목록, TODO, 작업관리"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">체크리스트</h1>
                <p className="text-muted-foreground">
                    할 일을 체크하며 관리하세요
                </p>
            </header>

            {/* Stats */}
            {items.length > 0 && (
                <div className="flex gap-4 justify-center text-sm">
                    <div className="px-4 py-2 bg-secondary rounded-lg">
                        전체: {stats.total}
                    </div>
                    <div className="px-4 py-2 bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg">
                        완료: {stats.completed}
                    </div>
                    <div className="px-4 py-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
                        남음: {stats.remaining}
                    </div>
                </div>
            )}

            {/* Add Item */}
            <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem()}
                        placeholder="새로운 할 일을 입력하세요..."
                        className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        onClick={addItem}
                        disabled={!newItem.trim()}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        추가
                    </button>
                </div>
            </div>

            {/* Items List */}
            {items.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-3 p-3 bg-secondary rounded-lg group"
                        >
                            <button
                                onClick={() => toggleItem(item.id)}
                                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${item.completed
                                        ? 'bg-primary border-primary'
                                        : 'border-border hover:border-primary'
                                    }`}
                            >
                                {item.completed && <Check className="w-4 h-4 text-primary-foreground" />}
                            </button>
                            <span
                                className={`flex-1 ${item.completed
                                        ? 'line-through text-muted-foreground'
                                        : ''
                                    }`}
                            >
                                {item.text}
                            </span>
                            <button
                                onClick={() => deleteItem(item.id)}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}

                    {stats.completed > 0 && (
                        <button
                            onClick={clearCompleted}
                            className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                        >
                            완료된 항목 삭제
                        </button>
                    )}
                </div>
            )}

            {items.length === 0 && (
                <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground">
                    할 일을 추가해보세요!
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>입력창에 할 일을 입력하고 "추가" 버튼을 클릭하거나 Enter 키를 누르세요.</li>
                    <li>체크박스를 클릭하여 완료 상태를 변경할 수 있습니다.</li>
                    <li>항목에 마우스를 올리면 삭제 버튼이 나타납니다.</li>
                    <li>브라우저를 새로고침하면 목록이 초기화됩니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default Checklist;
