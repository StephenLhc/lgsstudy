'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import BlogSearch from '../../components/BlogSearch'
import LikeButton from '../../components/LikeButton'

interface Author {
    name: string
}

interface Category {
    id: string
    name: string
    description: string | null
}

interface Tag {
    id: string
    name: string
    color: string
}

interface BlogPost {
    id: string
    title: string
    slug: string
    description: string
    category: Category
    tags: Tag[]
    author: Author
    publishedAt: Date
    readingTime: number
    viewCount: number
    likeCount: number
    commentCount: number
    shareCount: number
    difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
}interface SearchFilters {
    searchTerm: string
    categoryId: string
    tagId: string
    difficulty: string
}

const DIFFICULTY_LABELS = {
    BEGINNER: '初級',
    INTERMEDIATE: '中級',
    ADVANCED: '高級'
}

const DIFFICULTY_COLORS = {
    BEGINNER: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    INTERMEDIATE: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    ADVANCED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

export default function BlogWithSearch() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [tags, setTags] = useState<Tag[]>([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState<SearchFilters>({
        searchTerm: '',
        categoryId: '',
        tagId: '',
        difficulty: ''
    })

    // 載入初始資料
    const loadData = useCallback(async () => {
        try {
            setLoading(true)

            // 並行載入所有資料
            const [postsRes, categoriesRes, tagsRes] = await Promise.all([
                fetch('/api/blog/posts'),
                fetch('/api/blog/categories'),
                fetch('/api/blog/tags')
            ])

            if (postsRes.ok) {
                const postsData = await postsRes.json()
                setPosts(postsData)
                setFilteredPosts(postsData)
            }

            if (categoriesRes.ok) {
                const categoriesData = await categoriesRes.json()
                setCategories(categoriesData)
            }

            if (tagsRes.ok) {
                const tagsData = await tagsRes.json()
                setTags(tagsData)
            }
        } catch (error) {
            console.error('載入資料時發生錯誤:', error)
        } finally {
            setLoading(false)
        }
    }, [])

    // 過濾文章
    const filterPosts = useCallback((filters: SearchFilters) => {
        let filtered = [...posts]

        // 關鍵字搜索
        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase()
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchLower) ||
                post.description.toLowerCase().includes(searchLower) ||
                post.tags.some(tag => tag.name.toLowerCase().includes(searchLower))
            )
        }

        // 分類過濾
        if (filters.categoryId) {
            filtered = filtered.filter(post => post.category.id === filters.categoryId)
        }

        // 標籤過濾
        if (filters.tagId) {
            filtered = filtered.filter(post =>
                post.tags.some(tag => tag.id === filters.tagId)
            )
        }

        // 難度過濾
        if (filters.difficulty) {
            filtered = filtered.filter(post => post.difficulty === filters.difficulty)
        }

        setFilteredPosts(filtered)
    }, [posts])

    // 處理搜索
    const handleSearch = useCallback((newFilters: SearchFilters) => {
        setFilters(newFilters)
        filterPosts(newFilters)
    }, [filterPosts])

    // 清除過濾
    const handleClear = useCallback(() => {
        const emptyFilters = {
            searchTerm: '',
            categoryId: '',
            tagId: '',
            difficulty: ''
        }
        setFilters(emptyFilters)
        setFilteredPosts(posts)
    }, [posts])

    // 初始載入
    useEffect(() => {
        loadData()
    }, [loadData])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">載入中...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* 頁面標題 */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        博客文章
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        探索技術、信仰與生活的深度思考
                    </p>
                </div>

                {/* 搜索和過濾組件 */}
                <div className="mb-8">
                    <BlogSearch
                        categories={categories}
                        tags={tags}
                        onSearch={handleSearch}
                        onClear={handleClear}
                    />
                </div>

                {/* 搜索結果統計 */}
                <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                        找到 {filteredPosts.length} 篇文章
                        {filters.searchTerm && (
                            <span className="ml-2">
                                搜索關鍵字: <span className="font-semibold text-orange-600 dark:text-orange-400">&ldquo;{filters.searchTerm}&rdquo;</span>
                            </span>
                        )}
                    </p>
                </div>

                {/* 文章列表 */}
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            沒有找到符合條件的文章
                        </p>
                        <button
                            onClick={handleClear}
                            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                        >
                            清除過濾條件
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                            >
                                <div className="p-6">
                                    {/* 文章分類 */}
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="inline-block bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {post.category.name}
                                        </span>
                                        <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded ${DIFFICULTY_COLORS[post.difficulty]}`}>
                                            {DIFFICULTY_LABELS[post.difficulty]}
                                        </span>
                                    </div>

                                    {/* 文章標題 */}
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>

                                    {/* 文章描述 */}
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                        {post.description}
                                    </p>

                                    {/* 標籤 */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag.id}
                                                className={`inline-block text-xs px-2 py-1 rounded-full opacity-20`}
                                                data-color={tag.color}
                                            >
                                                #{tag.name}
                                            </span>
                                        ))}
                                        {post.tags.length > 3 && (
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                +{post.tags.length - 3} 更多
                                            </span>
                                        )}
                                    </div>

                                    {/* 文章資訊 */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>
                                            {post.author.name}
                                        </span>
                                        <div className="flex items-center space-x-4">
                                            <span>{post.readingTime} 分鐘閱讀</span>
                                            <span>{post.viewCount} 次觀看</span>
                                        </div>
                                    </div>

                                    {/* 發布日期 */}
                                    <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                                        {new Date(post.publishedAt).toLocaleDateString('zh-TW', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>

                                    {/* 互動按鈕 */}
                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <LikeButton postId={post.id} className="text-xs" />
                                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3">
                                                <span>{post.likeCount} 點讚</span>
                                                <span>{post.commentCount} 評論</span>
                                                <span>{post.shareCount} 分享</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
