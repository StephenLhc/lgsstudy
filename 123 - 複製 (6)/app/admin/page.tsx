import { prisma } from "../../lib/prisma";

export default async function AdminDashboard() {
    // 獲取統計數據
    const stats = await Promise.all([
        prisma.post.count(),
        prisma.post.count({ where: { status: 'PUBLISHED' } }),
        prisma.post.count({ where: { status: 'DRAFT' } }),
        prisma.author.count(),
        prisma.category.count(),
        prisma.tag.count(),
        prisma.comment.count(),
        prisma.postLike.count(),
    ]);

    const [
        totalPosts,
        publishedPosts,
        draftPosts,
        totalAuthors,
        totalCategories,
        totalTags,
        totalComments,
        totalLikes,
    ] = stats;

    // 獲取最近的文章
    const recentPosts = await prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            author: true,
            category: true,
            _count: {
                select: {
                    likes: true,
                    comments: true,
                }
            }
        }
    });

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">管理總覽</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    聖經研讀平台管理系統
                </p>
            </div>

            {/* 統計卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm">📝</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                        總文章數
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                        {totalPosts}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm">✅</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                        已發布
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                        {publishedPosts}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm">📋</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                        草稿
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                        {draftPosts}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm">❤️</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                        總點讚數
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                        {totalLikes}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 其他統計 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-5">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">內容統計</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">作者</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{totalAuthors}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">分類</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{totalCategories}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">標籤</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{totalTags}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">評論</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{totalComments}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700 md:col-span-2">
                    <div className="p-5">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">最近文章</h3>
                        <div className="space-y-3">
                            {recentPosts.map((post) => (
                                <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {post.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {post.author.displayName || post.author.name} • {post.category.name}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span>❤️ {post._count.likes}</span>
                                        <span>💬 {post._count.comments}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.status === 'PUBLISHED'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            }`}>
                                            {post.status === 'PUBLISHED' ? '已發布' : '草稿'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
