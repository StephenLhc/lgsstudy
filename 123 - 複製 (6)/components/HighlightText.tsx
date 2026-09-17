'use client';

interface HighlightTextProps {
    text: string;
    highlight: string;
    className?: string;
    highlightClassName?: string;
}

export default function HighlightText({
    text,
    highlight,
    className = '',
    highlightClassName = 'bg-yellow-200 dark:bg-yellow-700 font-medium'
}: HighlightTextProps) {
    if (!highlight || !text) {
        return <span className={className}>{text}</span>;
    }

    // 轉義特殊字符以避免 RegExp 錯誤
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    try {
        const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));

        return (
            <span className={className}>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <mark key={index} className={highlightClassName}>
                            {part}
                        </mark>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </span>
        );
    } catch (error) {
        // 如果 RegExp 失敗，返回原始文字
        console.warn('HighlightText RegExp error:', error);
        return <span className={className}>{text}</span>;
    }
}
