/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 客戶端 Supabase 實例
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 服務端 Supabase 實例 (使用 service role key)
export const createServerSupabaseClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// 用於與現有 Prisma API 兼容的包裝器
export class SupabaseAdapter {
  private client = createServerSupabaseClient();

  // Post 相關操作
  async findPosts(
    options: {
      where?: {
        status?: string;
        featured?: boolean;
        categoryId?: string;
        authorId?: string;
      };
      include?: {
        author?: boolean;
        category?: boolean;
        tags?: boolean;
        _count?: boolean;
      };
      orderBy?: {
        publishedAt?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        title?: "asc" | "desc";
      };
      take?: number;
      skip?: number;
    } = {}
  ) {
    let query = this.client.from("posts").select(`
        *,
        author:authors(*),
        category:categories(*),
        bible_book:bible_books(*),
        tags:post_tags(tag:tags(*)),
        _count:post_stats(*)
      `);

    // 應用篩選條件
    if (options.where?.status) {
      query = query.eq("status", options.where.status);
    }

    if (options.where?.featured !== undefined) {
      query = query.eq("featured", options.where.featured);
    }

    // 應用排序
    if (options.orderBy?.publishedAt) {
      query = query.order("published_at", {
        ascending: options.orderBy.publishedAt !== "desc",
      });
    }

    // 應用分頁
    if (options.skip || options.take) {
      const from = options.skip || 0;
      const to = from + (options.take || 10) - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query;

    if (error) throw error;
    return this.transformPostsData(data);
  }

  async findPostBySlug(slug: string) {
    const { data, error } = await this.client
      .from("posts")
      .select(
        `
        *,
        author:authors(*),
        category:categories(*),
        bible_book:bible_books(*),
        tags:post_tags(tag:tags(*))
      `
      )
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return this.transformPostData(data);
  }

  async findPostById(id: string) {
    const { data, error } = await this.client
      .from("posts")
      .select(
        `
        *,
        author:authors(*),
        category:categories(*),
        bible_book:bible_books(*)
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return this.transformPostData(data);
  }

  // User interaction 操作
  async findPostLike(postId: string, userId: string) {
    const { data, error } = await this.client
      .from("post_likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .single();

    return { data, error };
  }

  async createPostLike(postId: string, userId: string) {
    const { data, error } = await this.client
      .from("post_likes")
      .insert({ post_id: postId, user_id: userId })
      .select()
      .single();

    if (!error) {
      // 更新點讚計數
      await this.incrementPostCount(postId, "like_count");
    }

    return { data, error };
  }

  async deletePostLike(postId: string, userId: string) {
    const { error } = await this.client
      .from("post_likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", userId);

    if (!error) {
      // 減少點讚計數
      await this.decrementPostCount(postId, "like_count");
    }

    return { error };
  }

  async findPostBookmark(postId: string, userId: string) {
    const { data, error } = await this.client
      .from("post_bookmarks")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .single();

    return { data, error };
  }

  async createPostBookmark(postId: string, userId: string) {
    const { data, error } = await this.client
      .from("post_bookmarks")
      .insert({ post_id: postId, user_id: userId })
      .select()
      .single();

    return { data, error };
  }

  async deletePostBookmark(postId: string, userId: string) {
    const { error } = await this.client
      .from("post_bookmarks")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", userId);

    return { error };
  }

  // Comments 操作
  async findComments(
    postId: string,
    options: {
      status?: "PENDING" | "APPROVED" | "REJECTED" | "SPAM";
      page?: number;
      limit?: number;
    } = {}
  ) {
    let query = this.client
      .from("comments")
      .select(
        `
        *,
        user:users(name, image),
        author:authors(name, avatar),
        replies:comments(
          *,
          user:users(name, image),
          author:authors(name, avatar)
        )
      `
      )
      .eq("post_id", postId)
      .is("parent_id", null); // 只獲取頂層評論

    if (options.status) {
      query = query.eq("status", options.status);
    }

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;
    return { data, error };
  }

  async createComment(commentData: {
    content: string;
    post_id: string;
    user_id?: string;
    author_id?: string;
    guest_name?: string;
    guest_email?: string;
    parent_id?: string;
    status?: "PENDING" | "APPROVED" | "REJECTED" | "SPAM";
    ip_address?: string;
    user_agent?: string;
  }) {
    const { data, error } = await this.client
      .from("comments")
      .insert(commentData)
      .select()
      .single();

    if (!error) {
      // 更新評論計數
      await this.incrementPostCount(commentData.post_id, "comment_count");
    }

    return { data, error };
  }

  // Categories 和 Tags
  async findCategories() {
    const { data, error } = await this.client
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("order");

    return { data, error };
  }

  async findTags() {
    const { data, error } = await this.client
      .from("tags")
      .select("*")
      .order("name");

    return { data, error };
  }

  // 輔助方法
  private async incrementPostCount(postId: string, field: string) {
    await this.client.rpc("increment_post_count", {
      post_id: postId,
      field_name: field,
    });
  }

  private async decrementPostCount(postId: string, field: string) {
    await this.client.rpc("decrement_post_count", {
      post_id: postId,
      field_name: field,
    });
  }

  private transformPostData(data: any) {
    if (!data) return null;

    return {
      ...data,
      publishedAt: data.published_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      viewCount: data.view_count,
      likeCount: data.like_count,
      commentCount: data.comment_count,
      shareCount: data.share_count,
      // 轉換關聯數據
      tags: data.tags?.map((pt: any) => pt.tag) || [],
      _count: {
        likes: data.like_count || 0,
        comments: data.comment_count || 0,
        bookmarks: 0, // 需要額外查詢
      },
    };
  }

  private transformPostsData(data: any[]) {
    return data?.map((item) => this.transformPostData(item)) || [];
  }
}

// 創建全局適配器實例
export const supabaseAdapter = new SupabaseAdapter();

// 與現有 Prisma 代碼兼容的導出
export const db = {
  post: {
    findMany: (options?: any) => supabaseAdapter.findPosts(options),
    findUnique: (options: { where: { id?: string; slug?: string } }) => {
      if (options.where.slug) {
        return supabaseAdapter.findPostBySlug(options.where.slug);
      }
      return supabaseAdapter.findPostById(options.where.id!);
    },
  },
  postLike: {
    findUnique: (options: {
      where: { postId_userId: { postId: string; userId: string } };
    }) =>
      supabaseAdapter.findPostLike(
        options.where.postId_userId.postId,
        options.where.postId_userId.userId
      ),
    create: (options: { data: { postId: string; userId: string } }) =>
      supabaseAdapter.createPostLike(options.data.postId, options.data.userId),
    delete: (options: {
      where: { postId_userId: { postId: string; userId: string } };
    }) =>
      supabaseAdapter.deletePostLike(
        options.where.postId_userId.postId,
        options.where.postId_userId.userId
      ),
  },
  postBookmark: {
    findUnique: (options: {
      where: { postId_userId: { postId: string; userId: string } };
    }) =>
      supabaseAdapter.findPostBookmark(
        options.where.postId_userId.postId,
        options.where.postId_userId.userId
      ),
    create: (options: { data: { postId: string; userId: string } }) =>
      supabaseAdapter.createPostBookmark(
        options.data.postId,
        options.data.userId
      ),
    delete: (options: {
      where: { postId_userId: { postId: string; userId: string } };
    }) =>
      supabaseAdapter.deletePostBookmark(
        options.where.postId_userId.postId,
        options.where.postId_userId.userId
      ),
  },
  comment: {
    findMany: (options: { where: { postId: string; status?: string } }) =>
      supabaseAdapter.findComments(options.where.postId, {
        status: options.where.status as
          | "PENDING"
          | "APPROVED"
          | "REJECTED"
          | "SPAM"
          | undefined,
      }),
    create: (options: { data: any }) =>
      supabaseAdapter.createComment(options.data),
  },
  category: {
    findMany: () => supabaseAdapter.findCategories(),
  },
  tag: {
    findMany: () => supabaseAdapter.findTags(),
  },
};
