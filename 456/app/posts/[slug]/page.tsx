import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug, getRelatedPosts } from "@/lib/database";

interface PostPageProps {
    params: {
        slug: string;
    };
}

// 定義評論類型
interface Comment {
    id: string;
    content: string;
    author?: {
        name: string;
    };
    createdAt: string;
}

// 定義相關文章類型
interface RelatedPost {
    id: string;
    title: string;
    excerpt: string;
    author?: {
        name: string;
    };
    viewCount: number;
}

// 定義標籤類型
interface Tag {
    id: string;
    name: string;
}

export default async function PostPage({ params }: PostPageProps) {
    try {
        const post = await getPostBySlug(params.slug);

        if (!post) {
            notFound();
        }

        const relatedPosts = await getRelatedPosts(post.id, 3);

        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
                <Header />

                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-400/20"></div>
                    <div className="relative container mx-auto px-4 lg:px-8 py-16">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="mb-6">
                                <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                                    {post.bibleBook?.name || post.categories[0]?.name}
                                </span>
                            </div>
                            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                {post.excerpt}
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center justify-center space-x-4 mb-8">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                                    <span className="text-xl">👤</span>
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        {post.author?.name || "樂研集團隊"}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {new Date(post.publishedAt).toLocaleDateString('zh-TW')}
                                    </div>
                                </div>
                            </div>

                            {/* Post Stats */}
                            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center space-x-2">
                                    <span>👁️</span>
                                    <span>{post.viewCount} 次閱讀</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span>❤️</span>
                                    <span>{post.likeCount} 個讚</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span>💬</span>
                                    <span>{post.commentCount} 條評論</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 lg:px-8 py-16">
                    <div className="grid lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* Cover Image */}
                            {post.coverImage && (
                                <div className="mb-8">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        width={800}
                                        height={400}
                                        className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-soft"
                                    />
                                </div>
                            )}

                            {/* Article Content */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8 mb-8">
                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    {/* 這裡將來會顯示 MDX 內容 */}
                                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        <p className="mb-4">
                                            這是文章的內容區域。當 MDX 處理流程完成後，這裡將顯示完整的文章內容。
                                        </p>
                                        <p className="mb-4">
                                            目前顯示的是預覽內容，包含文章的基本信息和結構。
                                        </p>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                                            經文對照工具
                                        </h2>
                                        <p className="mb-4">
                                            這裡將顯示經文對照功能，讓讀者可以方便地查看相關的聖經經文。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Scripture Comparison Tool */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8 mb-8">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    經文對照工具
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            選擇書卷
                                        </label>
                                        <select
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                            aria-label="選擇聖經書卷"
                                        >
                                            <option>創世記</option>
                                            <option>出埃及記</option>
                                            <option>馬太福音</option>
                                            <option>約翰福音</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            章節
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="例如: 1:1"
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                        />
                                    </div>
                                </div>
                                <button className="w-full mt-4 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                                    查看經文
                                </button>
                            </div>

                            {/* Comments Section */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    評論區 ({post.commentCount})
                                </h3>

                                {/* Comment Form */}
                                <div className="mb-8">
                                    <textarea
                                        placeholder="分享您的想法..."
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-none"
                                    ></textarea>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            評論將經過審核後顯示
                                        </span>
                                        <button className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                                            發表評論
                                        </button>
                                    </div>
                                </div>

                                {/* Comments List */}
                                <div className="space-y-6">
                                    {post.comments && post.comments.length > 0 ? (
                                        post.comments.map((comment: Comment) => (
                                            <div key={comment.id} className="border-l-4 border-primary-500 pl-4">
                                                <div className="flex items-start space-x-3">
                                                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                                                        <span className="text-primary-600 dark:text-primary-400">👤</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                                {comment.author?.name || "匿名用戶"}
                                                            </span>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                {new Date(comment.createdAt).toLocaleDateString('zh-TW')}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                                                            {comment.content}
                                                        </p>
                                                        <div className="flex items-center space-x-4 text-sm">
                                                            <button className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                                                👍 讚 (0)
                                                            </button>
                                                            <button className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                                                💬 回覆
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            <div className="text-4xl mb-4">💬</div>
                                            <p>還沒有評論，來發表第一個評論吧！</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Related Posts */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 mb-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    相關文章
                                </h3>
                                <div className="space-y-4">
                                    {relatedPosts.map((relatedPost: RelatedPost) => (
                                        <div key={relatedPost.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                                {relatedPost.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                                <span>{relatedPost.author?.name}</span>
                                                <span>{relatedPost.viewCount} 閱讀</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    標籤
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag: Tag) => (
                                        <span
                                            key={tag.id}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/20 transition-colors cursor-pointer"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    } catch (error) {
        console.error('Error loading post:', error);
        notFound();
    }
}
