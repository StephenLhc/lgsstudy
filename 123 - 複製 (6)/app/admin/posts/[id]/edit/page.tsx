'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Category {
    id: string;
    name: string;
}

interface Tag {
    id: string;
    name: string;
}

interface Author {
    id: string;
    name: string;
}

interface Post {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    status: 'DRAFT' | 'PUBLISHED';
    difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    readingTime: number;
    categoryId: string;
    authorId: string;
    tags: Tag[];
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const [post, setPost] = useState<Post | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [tags, setTags] = useState<Tag[]>([])
    const [authors, setAuthors] = useState<Author[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    // 表單狀態
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        content: '',
        status: 'DRAFT' as 'DRAFT' | 'PUBLISHED',
        difficulty: 'BEGINNER' as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
        readingTime: 5,
        categoryId: '',
        authorId: ''
    })

    useEffect(() => {
        const loadData = async () => {
            try {
                const resolvedParams = await params
                const postId = resolvedParams.id

                // 並行載入所有數據
                const [postRes, categoriesRes, tagsRes, authorsRes] = await Promise.all([
                    fetch(`/api/blog/posts/${postId}`),
                    fetch('/api/blog/categories'),
                    fetch('/api/blog/tags'),
                    fetch('/api/admin/authors')
                ])

                if (postRes.ok) {
                    const postData = await postRes.json()
                    setPost(postData)
                    setFormData({
                        title: postData.title,
                        slug: postData.slug,
                        description: postData.description,
                        content: postData.content,
                        status: postData.status,
                        difficulty: postData.difficulty,
                        readingTime: postData.readingTime,
                        categoryId: postData.categoryId,
                        authorId: postData.authorId
                    })
                    setSelectedTags(postData.tags.map((tag: Tag) => tag.id))
                }

                if (categoriesRes.ok) {
                    const categoriesData = await categoriesRes.json()
                    setCategories(categoriesData)
                }

                if (tagsRes.ok) {
                    const tagsData = await tagsRes.json()
                    setTags(tagsData)
                }

                if (authorsRes.ok) {
                    const authorsData = await authorsRes.json()
                    setAuthors(authorsData)
                }
            } catch (error) {
                console.error('載入數據失敗:', error)
                alert('載入數據失敗')
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [params])

    // 生成 slug
    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
    }

    // 處理表單提交
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.content || !formData.categoryId || !formData.authorId) {
            alert('請填寫所有必填字段')
            return
        }

        setSaving(true)
        try {
            const resolvedParams = await params
            const postId = resolvedParams.id

            const response = await fetch(`/api/admin/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    tagIds: selectedTags
                })
            })

            if (response.ok) {
                alert('文章更新成功')
                router.push('/admin/posts')
            } else {
                const error = await response.json()
                alert(error.error || '更新失敗')
            }
        } catch (error) {
            console.error('更新文章失敗:', error)
            alert('更新失敗，請稍後再試')
        } finally {
            setSaving(false)
        }
    }

    // 處理標籤選擇
    const handleTagToggle = (tagId: string) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        )
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">文章不存在</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">編輯文章</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">修改文章內容和設定</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 標題 */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        標題 *
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => {
                            const title = e.target.value
                            setFormData(prev => ({
                                ...prev,
                                title,
                                slug: generateSlug(title)
                            }))
                        }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>

                {/* Slug */}
                <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        URL Slug *
                    </label>
                    <input
                        id="slug"
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>

                {/* 描述 */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        描述 *
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>

                {/* 內容 */}
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        內容 * (Markdown 格式)
                    </label>
                    <textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        rows={20}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white font-mono"
                        required
                    />
                </div>

                {/* 設定區域 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 分類 */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            分類 *
                        </label>
                        <select
                            id="category"
                            value={formData.categoryId}
                            onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                            required
                        >
                            <option value="">選擇分類</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 作者 */}
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            作者 *
                        </label>
                        <select
                            id="author"
                            value={formData.authorId}
                            onChange={(e) => setFormData(prev => ({ ...prev, authorId: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                            required
                        >
                            <option value="">選擇作者</option>
                            {authors.map(author => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 難度 */}
                    <div>
                        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            難度
                        </label>
                        <select
                            id="difficulty"
                            value={formData.difficulty}
                            onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' }))}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="BEGINNER">初級</option>
                            <option value="INTERMEDIATE">中級</option>
                            <option value="ADVANCED">高級</option>
                        </select>
                    </div>

                    {/* 閱讀時間 */}
                    <div>
                        <label htmlFor="readingTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            閱讀時間 (分鐘)
                        </label>
                        <input
                            id="readingTime"
                            type="number"
                            min="1"
                            max="120"
                            value={formData.readingTime}
                            onChange={(e) => setFormData(prev => ({ ...prev, readingTime: parseInt(e.target.value) }))}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>

                {/* 標籤 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        標籤
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={() => handleTagToggle(tag.id)}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedTags.includes(tag.id)
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 狀態 */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        發布狀態
                    </label>
                    <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'DRAFT' | 'PUBLISHED' }))}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="DRAFT">草稿</option>
                        <option value="PUBLISHED">已發布</option>
                    </select>
                </div>

                {/* 按鈕區域 */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/posts')}
                        className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        取消
                    </button>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? '更新中...' : '更新文章'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
