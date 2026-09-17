'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Heart, ThumbsDown, MessageSquare, Search, Filter, Calendar, Tag, Loader2, Sun, Moon, Eye, LayoutDashboard, LogIn, Share2, Link2, Check } from 'lucide-react';

interface Post {
    id: number;
    title: string;
    scripture: string;
    category: string;
    content: string;
    post_date: string;
    like_count: number;
    dislike_count: number;
    comment_count: number;
    views: number;
    image_url: string | null;
}

export default function HomePage() {
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    // 只有已登入作者後台的訪客（帶有效 cookie）才看得到右下角的後台入口按鈕
    const [isAdmin, setIsAdmin] = useState(false);

    // 搜尋與篩選狀態
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('全部');
    const [sortBy, setSortBy] = useState<'date' | 'likes' | 'dislikes' | 'comments'>('date');
    const [selectedDate, setSelectedDate] = useState('');

    // 記錄本次造訪已計入閱讀的文章，避免 StrictMode 重掛載或切回文章時重複計數
    const countedViewsRef = useRef<Set<number>>(new Set());
    const currentPostId = selectedPost?.id;

    // 讀者對各文章的「讚 / 有待改善」按壓狀態，記錄於 localStorage，重新整理後仍保留
    const VOTE_STORAGE_KEY = 'lgsstudy_post_votes';
    const [votes, setVotes] = useState<Record<number, { liked: boolean; disliked: boolean }>>({});

    // 「複製連結」按鈕的成功提示狀態
    const [linkCopied, setLinkCopied] = useState(false);

    const saveVotes = (next: Record<number, { liked: boolean; disliked: boolean }>) => {
        setVotes(next);
        try {
            localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(next));
        } catch (err) {
            console.warn('無法寫入投票狀態:', err);
        }
    };

    // 確保元件在 Client 端載入完畢（避免 hydration  mismatch），並讀回先前的投票狀態
    useEffect(() => {
        setMounted(true);
        try {
            const raw = localStorage.getItem(VOTE_STORAGE_KEY);
            if (raw) setVotes(JSON.parse(raw));
        } catch (err) {
            console.warn('無法讀取投票狀態:', err);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 檢查訪客是否已通過作者後台密碼閘；只有通過才顯示隱藏的後台入口
    useEffect(() => {
        fetch('/api/admin/login')
            .then((res) => setIsAdmin(res.ok))
            .catch(() => setIsAdmin(false));
    }, []);

    // 從 API 撈取文章列表
    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/posts');
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setPosts(data);
                    // 支援分享連結 ?postId=ID：開啟時直接顯示指定文章
                    const paramId = Number(new URLSearchParams(window.location.search).get('postId'));
                    const target = Number.isInteger(paramId) ? data.find((p) => p.id === paramId) : undefined;
                    setSelectedPost(target ?? data[0]);
                }
            } catch (err) {
                console.error('讀取文章失敗:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    // 文章開啟後停留滿三分鐘即代表已閱讀，將閱讀人次加 1；切換文章會重新計時
    useEffect(() => {
        if (currentPostId === undefined || countedViewsRef.current.has(currentPostId)) {
            return;
        }

        const timer = setTimeout(async () => {
            countedViewsRef.current.add(currentPostId);
            try {
                const res = await fetch('/api/posts', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: currentPostId }),
                });
                const data = await res.json();
                const nextViews = typeof data.views === 'number' ? data.views : undefined;

                setPosts((prev) =>
                    prev.map((p) =>
                        p.id === currentPostId ? { ...p, views: nextViews ?? (p.views || 0) + 1 } : p,
                    ),
                );
                setSelectedPost((prev) =>
                    prev && prev.id === currentPostId
                        ? { ...prev, views: nextViews ?? (prev.views || 0) + 1 }
                        : prev,
                );
            } catch (err) {
                countedViewsRef.current.delete(currentPostId);
                console.error('更新閱讀人次失敗:', err);
            }
        }, 3 * 60 * 1000);

        return () => clearTimeout(timer);
    }, [currentPostId]);

    // 切換「讚 / 有待改善」：沒按過 → +1；已按過再按 → −1。兩者各自獨立切換。
    const toggleReaction = async (kind: 'like' | 'dislike') => {
        if (!selectedPost) return;
        const postId = selectedPost.id;
        const current = votes[postId] ?? { liked: false, disliked: false };
        const nextActive = kind === 'like' ? !current.liked : !current.disliked;
        const delta = nextActive ? 1 : -1;

        // 先記錄快照，失敗時完整回滾
        const snapshot = { posts, selectedPost, votes };

        const applyCount = (p: Post): Post =>
            kind === 'like'
                ? { ...p, like_count: Math.max((p.like_count || 0) + delta, 0) }
                : { ...p, dislike_count: Math.max((p.dislike_count || 0) + delta, 0) };

        setPosts((prev) => prev.map((p) => (p.id === postId ? applyCount(p) : p)));
        setSelectedPost((prev) => (prev && prev.id === postId ? applyCount(prev) : prev));

        const nextVotes = {
            ...votes,
            [postId]: {
                liked: kind === 'like' ? nextActive : current.liked,
                disliked: kind === 'dislike' ? nextActive : current.disliked,
            },
        };
        saveVotes(nextVotes);

        try {
            const res = await fetch('/api/posts', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: postId, type: kind, active: nextActive }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            // 以資料庫回傳的計數作為最終依據，覆蓋樂觀更新的推估值
            const syncCounts = (p: Post): Post =>
                p.id === postId
                    ? {
                          ...p,
                          like_count: typeof data.like_count === 'number' ? data.like_count : p.like_count,
                          dislike_count:
                              typeof data.dislike_count === 'number' ? data.dislike_count : p.dislike_count,
                      }
                    : p;
            setPosts((prev) => prev.map(syncCounts));
            setSelectedPost((prev) => (prev ? syncCounts(prev) : prev));
        } catch (err) {
            console.error('更新投票失敗，已還原:', err);
            setPosts(snapshot.posts);
            setSelectedPost(snapshot.selectedPost);
            saveVotes(snapshot.votes);
        }
    };

    // 點選文章時同步更新網址，方便隨時複製分享目前閱讀的文章
    const openPost = (p: Post) => {
        setSelectedPost(p);
        try {
            window.history.replaceState(null, '', `/reader?postId=${p.id}`);
        } catch {
            // 網址更新失敗不影響閱讀
        }
    };

    // 本篇文章的對外分享網址（統一用首頁連結，不論從哪個頁面分享）
    const buildShareUrl = (id: number) => `${window.location.origin}/?postId=${id}`;

    // 複製文章連結到剪貼簿（含舊瀏覽器備援）
    const copyShareLink = async () => {
        if (!selectedPost) return;
        const url = buildShareUrl(selectedPost.id);
        try {
            await navigator.clipboard.writeText(url);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = url;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); } catch { /* 忽略 */ }
            document.body.removeChild(ta);
        }
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2500);
    };

    // 開啟 WhatsApp 分享（手機自動跳 App，電腦開網頁版）
    const shareToWhatsApp = () => {
        if (!selectedPost) return;
        const url = buildShareUrl(selectedPost.id);
        const text = `【${selectedPost.title}】${selectedPost.scripture ? `\n${selectedPost.scripture}` : ''}\n誠意分享這篇讀經分享給你：\n${url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    };

    // 分類以「、」合併儲存（最多三個）；經文以「；」合併（最多兩段）——拆開以便顯示與篩選
    const splitCategories = (c?: string | null): string[] => {
        const parts = (c || '靈修默想').split('、').map((s) => s.trim()).filter(Boolean);
        return parts.length ? parts : ['靈修默想'];
    };
    const splitScriptures = (s?: string): string[] =>
        (s || '').split('；').map((t) => t.trim()).filter(Boolean);

    const categories = useMemo(() => {
        const list = posts.flatMap((p) => splitCategories(p.category));
        return ['全部', ...Array.from(new Set(list))];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posts]);

    const filteredAndSortedPosts = useMemo(() => {
        return posts
            .filter((p) => {
                const matchesKeyword =
                    p.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    p.scripture?.toLowerCase().includes(searchKeyword.toLowerCase());

                const matchesCategory =
                    selectedCategory === '全部' || splitCategories(p.category).includes(selectedCategory);
                const matchesDate = selectedDate ? p.post_date === selectedDate : true;

                return matchesKeyword && matchesCategory && matchesDate;
            })
            .sort((a, b) => {
                if (sortBy === 'likes') return (b.like_count || 0) - (a.like_count || 0);
                if (sortBy === 'dislikes') return (b.dislike_count || 0) - (a.dislike_count || 0);
                if (sortBy === 'comments') return (b.comment_count || 0) - (a.comment_count || 0);
                return new Date(b.post_date).getTime() - new Date(a.post_date).getTime();
            });
    }, [posts, searchKeyword, selectedCategory, selectedDate, sortBy]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] dark:bg-slate-950 flex items-center justify-center transition-colors">
                <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-400 text-2xl font-bold">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    載入靈修文章中...
                </div>
            </div>
        );
    }

    if (!selectedPost) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] dark:bg-slate-950 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl font-bold">
                目前資料庫中沒有靈修文章 😅
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#FDFBF7] dark:bg-slate-950 text-[#222222] dark:text-slate-100 font-sans p-4 md:p-8 max-w-7xl mx-auto transition-colors">

            {/* 頂部 Header（標題於大螢幕置中） */}
                <header className="relative mb-6 md:mb-8 border-b-2 border-emerald-700 dark:border-emerald-600 pb-4 flex flex-row justify-between items-center gap-2">
                    {/* 左上角：網站 Logo（隨深淺色模式切換）；手機／平板標題跟在 Logo 旁 */}
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        {mounted && (
                            <img
                                src={theme === 'dark' ? '/images/lgsDark.png' : '/images/lgsLight.png'}
                                alt="樂研集 lgscns"
                                className="h-9 sm:h-12 w-auto rounded-lg border border-emerald-800/15 dark:border-slate-700 shrink-0"
                            />
                        )}
                        <h1 className="text-xl sm:text-3xl font-bold text-emerald-900 dark:text-emerald-400 truncate lg:hidden">
                            讀經分享和心得
                        </h1>
                    </div>

                    {/* 大螢幕（lg 以上）：網站名稱置中 */}
                    <h1 className="hidden lg:block absolute left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-bold text-emerald-900 dark:text-emerald-400 max-w-[30%] truncate text-center">
                        讀經分享和心得
                    </h1>

                {/* 右上角：後台入口（未登入＝作者登入，已登入＝作者後台）＋主題切換按鈕 */}
                {mounted && (
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {isAdmin ? (
                            <button
                                onClick={() => router.push('/admin')}
                                title="返回作者後台"
                                aria-label="返回作者後台"
                                className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs sm:text-base hover:bg-emerald-800 transition shadow-sm border border-emerald-800 dark:border-emerald-500"
                            >
                                <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>作者後台</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => router.push('/admin')}
                                title="登入作者後台"
                                aria-label="登入作者後台"
                                className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs sm:text-base hover:bg-emerald-800 transition shadow-sm border border-emerald-800 dark:border-emerald-500"
                            >
                                <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>作者登入</span>
                            </button>
                        )}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-100 dark:bg-slate-800 text-amber-900 dark:text-amber-300 font-bold text-xs sm:text-base hover:opacity-80 transition shadow-sm border border-amber-300 dark:border-slate-700"
                            title="切換深色/淺色模式"
                        >
                            {theme === 'dark' ? (
                                <>
                                    <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                                    <span>明亮模式</span>
                                </>
                            ) : (
                                <>
                                    <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                                    <span>暗黑模式</span>
                                </>
                            )}
                        </button>
                    </div>
                )}
            </header>

            {/* 左右雙欄佈局（手機上上下堆疊，大螢幕時左右兩欄） */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                {/* 👈 左欄：主題文章閱讀欄 (加入 sm:, md: 微調間距與大小) */}
                <section className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl shadow-md border border-gray-200 dark:border-slate-800 min-h-[600px] flex flex-col justify-between transition-colors">
                    <div>
                        <div className="border-b dark:border-slate-800 pb-4 mb-6">
                            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                                <span className="text-amber-800 dark:text-amber-400 font-bold text-sm sm:text-base md:text-lg">📅 日期：{selectedPost.post_date}</span>
                                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm md:text-base flex items-center gap-1 border border-emerald-300 dark:border-emerald-800">
                                    <Tag className="w-3.5 h-3.5 sm:w-4 h-4" />
                                    {selectedPost.category || '靈修默想'}
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100 mt-1">
                                {selectedPost.title}
                            </h2>
                            <p className="text-xl sm:text-2xl text-amber-800 dark:text-amber-300 font-medium mt-3 bg-amber-50 dark:bg-amber-950/40 p-2 sm:p-3 rounded-xl border border-amber-200 dark:border-amber-800/60 inline-block">
                                📖 經文：{selectedPost.scripture}
                            </p>
                        </div>

                        {/* 文章頂部配圖（作者發文時加入，沒有配圖的文章不佔位） */}
                        {selectedPost.image_url && (
                            <div className="mb-6 sm:mb-8">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={selectedPost.image_url}
                                    alt={selectedPost.title}
                                    className="w-full max-h-[420px] object-cover rounded-2xl shadow-md border border-gray-200 dark:border-slate-700"
                                />
                            </div>
                        )}

                        {/* Markdown 文章內容 (加入 sm: 微調 prose 語法大小) */}
                        <article className="prose prose-slate prose-lg max-w-none text-xl md:text-2xl leading-relaxed text-gray-800 dark:text-slate-200 mb-8 transition-colors">
                            <ReactMarkdown
                                components={{
                                    h3: ({ node, ...props }) => <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-900 dark:text-emerald-400 mt-6 mb-3" {...props} />,
                                    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                                    blockquote: ({ node, ...props }) => (
                                        <blockquote className="border-l-4 border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 p-3 sm:p-4 rounded-r-xl italic my-4 text-amber-900 dark:text-amber-300 font-medium" {...props} />
                                    ),
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 sm:pl-6 mb-4 space-y-2" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold text-emerald-800 dark:text-emerald-400" {...props} />,
                                }}
                            >
                                {selectedPost.content}
                            </ReactMarkdown>
                        </article>
                    </div>

                    {/* 互動按鈕（手機版自動微調尺寸，避免擠壓超出畫面） */}
                    <div className="pt-4 sm:pt-6 border-t border-gray-200 dark:border-slate-800 flex justify-around items-center bg-gray-50/80 dark:bg-slate-800/60 p-2 sm:p-4 rounded-2xl gap-1 sm:gap-2">
                        {/* 閱讀人次（停留滿三分鐘自動加 1） */}
                        <div
                            className="flex flex-col items-center gap-1 text-sky-600 dark:text-sky-400 p-2 sm:p-3 rounded-xl"
                            title="閱讀人次"
                        >
                            <Eye className="w-6 h-6 sm:w-8 sm:h-8" />
                            <span className="text-xs sm:text-lg font-bold">{selectedPost.views || 0} 閱讀人次</span>
                        </div>

                        <button
                            onClick={() => toggleReaction('like')}
                            aria-pressed={votes[selectedPost.id]?.liked ?? false}
                            title={votes[selectedPost.id]?.liked ? '再按一次取消讚' : '我覺得這篇很得益處'}
                            className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-xl transition ${
                                votes[selectedPost.id]?.liked
                                    ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 ring-2 ring-rose-400 dark:ring-rose-500'
                                    : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                            }`}
                        >
                            <Heart
                                className={`w-6 h-6 sm:w-8 sm:h-8 stroke-rose-600 dark:stroke-rose-400 ${
                                    votes[selectedPost.id]?.liked
                                        ? 'fill-rose-500 dark:fill-rose-500'
                                        : 'fill-rose-100 dark:fill-rose-950'
                                }`}
                            />
                            <span className="text-xs sm:text-lg font-bold">{selectedPost.like_count || 0} 讚</span>
                        </button>

                        <button
                            onClick={() => toggleReaction('dislike')}
                            aria-pressed={votes[selectedPost.id]?.disliked ?? false}
                            title={votes[selectedPost.id]?.disliked ? '再按一次取消「有待改善」' : '我覺得這篇有待改善'}
                            className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-xl transition ${
                                votes[selectedPost.id]?.disliked
                                    ? 'bg-gray-300 dark:bg-slate-700 text-gray-800 dark:text-slate-200 ring-2 ring-gray-500 dark:ring-slate-400'
                                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                            }`}
                        >
                            <ThumbsDown className="w-6 h-6 sm:w-8 sm:h-8" />
                            <span className="text-xs sm:text-lg font-bold">{selectedPost.dislike_count || 0} 有待改善</span>
                        </button>

                        <button
                            onClick={() => router.push(`/respond?postId=${selectedPost.id}`)}
                            className="flex flex-col items-center gap-1 text-blue-700 dark:text-blue-400 hover:scale-105 transition p-2 sm:p-3 px-3 sm:px-6 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800"
                        >
                            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" />
                            <span className="text-xs sm:text-lg font-bold">回應 ({selectedPost.comment_count || 0})</span>
                        </button>
                    </div>

                    {/* 分享列：WhatsApp 教會群組分享 ／ 複製連結 */}
                    <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2 sm:gap-3 px-1">
                        <span className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-gray-600 dark:text-slate-300">
                            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            分享給親友：
                        </span>
                        <button
                            onClick={shareToWhatsApp}
                            title="透過 WhatsApp 分享這篇文章"
                            className="flex items-center gap-1.5 sm:gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-sm sm:text-base px-3 sm:px-5 py-2 rounded-full shadow-sm transition hover:scale-105"
                        >
                            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            WhatsApp 分享
                        </button>
                        <button
                            onClick={copyShareLink}
                            title="複製文章連結，可貼到任何地方"
                            className={`flex items-center gap-1.5 sm:gap-2 font-bold text-sm sm:text-base px-3 sm:px-5 py-2 rounded-full border shadow-sm transition hover:scale-105 ${
                                linkCopied
                                    ? 'bg-emerald-600 border-emerald-600 text-white'
                                    : 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700'
                            }`}
                        >
                            {linkCopied ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Link2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                            {linkCopied ? '已複製連結！' : '複製連結'}
                        </button>
                    </div>
                </section>

                {/* 👉 右欄：歷史內容與多功能搜尋庫 */}
                <aside className="lg:col-span-5 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl shadow-md border border-gray-200 dark:border-slate-800 transition-colors">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 pb-2 border-b dark:border-slate-800 flex items-center gap-2">
                        <Search className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
                        歷史靈修搜尋
                    </h2>

                    {/* 🔍 搜尋與篩選控制區 */}
                    <div className="space-y-4 mb-6 bg-amber-50/50 dark:bg-slate-800/50 p-4 rounded-xl border border-amber-200/80 dark:border-slate-700">

                        {/* 1. 關鍵字搜尋框 */}
                        <div>
                            <label className="block text-gray-700 dark:text-slate-300 font-bold mb-1.5 text-base sm:text-lg">搜尋經文或關鍵字：</label>
                            <input
                                type="text"
                                placeholder="例如：詩篇、箴言、馬太福音..."
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                className="w-full p-2 sm:p-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl text-base sm:text-lg outline-none focus:border-emerald-600 dark:focus:border-emerald-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                            />
                        </div>

                        {/* 2. 分類篩選器 */}
                        <div>
                            <label className="block text-gray-700 dark:text-slate-300 font-bold mb-1.5 text-base sm:text-lg flex items-center gap-1">
                                <Tag className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                                主題分類：
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-2 sm:p-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl text-base sm:text-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-600 dark:focus:border-emerald-500 font-medium"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat === '全部' ? '全部分類' : cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 3. 排序選項 */}
                        <div>
                            <label className="block text-gray-700 dark:text-slate-300 font-bold mb-1.5 text-base sm:text-lg flex items-center gap-1">
                                <Filter className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                                排序選項：
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="w-full p-2 sm:p-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl text-base sm:text-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-600 dark:focus:border-emerald-500 font-medium"
                            >
                                <option value="date">按發布日期 (最新在前)</option>
                                <option value="likes">最多讚 👍</option>
                                <option value="dislikes">最多有待改善 💬</option>
                                <option value="comments">最多回應 🔥</option>
                            </select>
                        </div>

                        {/* 4. 日期過濾器 */}
                        <div>
                            <label className="block text-gray-700 dark:text-slate-300 font-bold mb-1.5 text-base sm:text-lg flex items-center gap-1">
                                <Calendar className="w-5 h-5 text-amber-800 dark:text-amber-400" />
                                按指定日期搜尋：
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full p-2 sm:p-2.5 border-2 border-gray-300 dark:border-slate-600 rounded-xl text-base sm:text-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
                                />
                                {selectedDate && (
                                    <button
                                        onClick={() => setSelectedDate('')}
                                        className="px-3 py-1 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 font-bold rounded-xl text-xs sm:text-sm"
                                    >
                                        清除
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* 📜 文章搜尋結果清單 (手機微調間距與大小) */}
                    <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                        {filteredAndSortedPosts.length > 0 ? (
                            filteredAndSortedPosts.map((p) => {
                                const isSelected = p.id === selectedPost.id;
                                return (
                                    <button
                                        key={p.id}
                                        onClick={() => openPost(p)}
                                        className={`w-full text-left p-3 sm:p-4 rounded-xl transition border ${isSelected
                                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 dark:border-emerald-500 shadow-sm'
                                            : 'bg-gray-50 dark:bg-slate-800/40 border-gray-200 dark:border-slate-700/60 hover:bg-amber-50/60 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center mb-1 flex-wrap gap-1">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300'}`}>
                                                {p.post_date}
                                            </span>
                                            <span className="flex gap-1 flex-wrap">
                        {splitCategories(p.category).map((c) => (
                            <span key={c} className="text-xs bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-800">
                                {c}
                            </span>
                        ))}
                    </span>
                                        </div>

                                        <h3 className={`text-lg sm:text-xl font-bold mt-1.5 ${isSelected ? 'text-emerald-900 dark:text-emerald-300' : 'text-gray-800 dark:text-slate-200'}`}>
                                            {p.title}
                                        </h3>

                                        <div className="flex justify-between items-center mt-2.5 text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-medium flex-wrap gap-2">
                                            <span className="text-amber-800 dark:text-amber-400 font-bold">{p.scripture}</span>
                                            <div className="flex gap-2 sm:gap-3">
                                                <span>❤️ {p.like_count || 0}</span>
                                                <span>💬 {p.comment_count || 0}</span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })
                        ) : (
                            <p className="text-center text-gray-500 dark:text-slate-400 py-8 text-base sm:text-lg font-medium">
                                沒有找到符合條件的文章 😅
                            </p>
                        )}
                    </div>
                </aside>

            </div>
        </main>
    );
}