'use client';

import { useState, useEffect, useRef } from 'react';

interface SearchSuggestion {
    id: string;
    title: string;
    slug?: string;
    type: 'post' | 'tag' | 'category';
    name?: string;
    color?: string;
}

interface SearchSuggestionsProps {
    query: string;
    onSelect: (suggestion: SearchSuggestion) => void;
    onClose: () => void;
    className?: string;
}

export default function SearchSuggestions({
    query,
    onSelect,
    onClose,
    className = ''
}: SearchSuggestionsProps) {
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    // 獲取搜尋建議
    useEffect(() => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}&limit=8`);
                const data = await response.json();

                if (data.success) {
                    setSuggestions(data.suggestions || []);
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    // 鍵盤導航
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (suggestions.length === 0) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev =>
                        prev < suggestions.length - 1 ? prev + 1 : 0
                    );
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev =>
                        prev > 0 ? prev - 1 : suggestions.length - 1
                    );
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (selectedIndex >= 0) {
                        onSelect(suggestions[selectedIndex]);
                    }
                    break;
                case 'Escape':
                    onClose();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [suggestions, selectedIndex, onSelect, onClose]);

    // 點擊外部關閉
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    if (!query || query.length < 2) {
        return null;
    }

    return (
        <div
            ref={suggestionsRef}
            className={`absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg 
                 max-h-96 overflow-y-auto ${className}`}
        >
            {loading ? (
                <div className="p-4 text-center">
                    <div className="inline-flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 dark:border-blue-400"></div>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">搜尋中...</span>
                    </div>
                </div>
            ) : suggestions.length > 0 ? (
                <div className="py-2">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={`${suggestion.type}-${suggestion.id}`}
                            onClick={() => onSelect(suggestion)}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 
                         transition-colors duration-150 ${index === selectedIndex
                                    ? 'bg-gray-100 dark:bg-gray-700'
                                    : ''
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2">
                                        {/* 類型圖標 */}
                                        <span className={`flex-shrink-0 w-5 h-5 rounded text-xs font-medium 
                                    flex items-center justify-center ${suggestion.type === 'post'
                                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                                                : suggestion.type === 'tag'
                                                    ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                                                    : 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
                                            }`}>
                                            {suggestion.type === 'post' ? '文' : suggestion.type === 'tag' ? '標' : '類'}
                                        </span>

                                        {/* 標題/名稱 */}
                                        <span className="text-gray-900 dark:text-white truncate">
                                            {suggestion.title || suggestion.name}
                                        </span>
                                    </div>

                                    {/* 標籤顏色指示器 */}
                                    {suggestion.type === 'tag' && suggestion.color && (
                                        <div className="mt-1 flex items-center">
                                            <div
                                                className={`w-3 h-3 rounded-full mr-2 ${suggestion.color === '#ef4444' ? 'bg-red-500' :
                                                        suggestion.color === '#f97316' ? 'bg-orange-500' :
                                                            suggestion.color === '#eab308' ? 'bg-yellow-500' :
                                                                suggestion.color === '#22c55e' ? 'bg-green-500' :
                                                                    suggestion.color === '#3b82f6' ? 'bg-blue-500' :
                                                                        suggestion.color === '#8b5cf6' ? 'bg-purple-500' :
                                                                            suggestion.color === '#ec4899' ? 'bg-pink-500' :
                                                                                'bg-gray-500'
                                                    }`}
                                            ></div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                標籤
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* 類型標記 */}
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                    {suggestion.type === 'post' ? '文章' :
                                        suggestion.type === 'tag' ? '標籤' : '分類'}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    <div className="text-sm">
                        沒有找到 &ldquo;{query}&rdquo; 的相關建議
                    </div>
                    <div className="text-xs mt-1">
                        請嘗試其他關鍵字
                    </div>
                </div>
            )}
        </div>
    );
}
