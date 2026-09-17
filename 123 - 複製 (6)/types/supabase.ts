// Supabase Database Types
export type Database = {
  public: {
    Tables: {
      authors: {
        Row: {
          id: string;
          email: string;
          name: string;
          display_name: string | null;
          avatar: string | null;
          bio: string | null;
          title:
            | "PASTOR"
            | "SCHOLAR"
            | "THEOLOGIAN"
            | "TEACHER"
            | "LAYPERSON"
            | "MISSIONARY"
            | "ELDER"
            | "DEACON";
          church: string | null;
          denomination: string | null;
          website: string | null;
          social_links: Record<string, string | null> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          display_name?: string | null;
          avatar?: string | null;
          bio?: string | null;
          title?:
            | "PASTOR"
            | "SCHOLAR"
            | "THEOLOGIAN"
            | "TEACHER"
            | "LAYPERSON"
            | "MISSIONARY"
            | "ELDER"
            | "DEACON";
          church?: string | null;
          denomination?: string | null;
          website?: string | null;
          social_links?: Record<string, string | null> | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          display_name?: string | null;
          avatar?: string | null;
          bio?: string | null;
          title?:
            | "PASTOR"
            | "SCHOLAR"
            | "THEOLOGIAN"
            | "TEACHER"
            | "LAYPERSON"
            | "MISSIONARY"
            | "ELDER"
            | "DEACON";
          church?: string | null;
          denomination?: string | null;
          website?: string | null;
          social_links?: Record<string, string | null> | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          testament: "OLD_TESTAMENT" | "NEW_TESTAMENT";
          book_type:
            | "TORAH"
            | "HISTORY"
            | "WISDOM"
            | "MAJOR_PROPHETS"
            | "MINOR_PROPHETS"
            | "GOSPELS"
            | "PAULINE"
            | "GENERAL"
            | "PROPHECY";
          order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          testament: "OLD_TESTAMENT" | "NEW_TESTAMENT";
          book_type:
            | "TORAH"
            | "HISTORY"
            | "WISDOM"
            | "MAJOR_PROPHETS"
            | "MINOR_PROPHETS"
            | "GOSPELS"
            | "PAULINE"
            | "GENERAL"
            | "PROPHECY";
          order: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          testament?: "OLD_TESTAMENT" | "NEW_TESTAMENT";
          book_type?:
            | "TORAH"
            | "HISTORY"
            | "WISDOM"
            | "MAJOR_PROPHETS"
            | "MINOR_PROPHETS"
            | "GOSPELS"
            | "PAULINE"
            | "GENERAL"
            | "PROPHECY";
          order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string | null;
          cover_image: string | null;
          bible_book_id: string | null;
          bible_chapter: string | null;
          bible_verse: string | null;
          category_id: string;
          author_id: string;
          difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
          reading_time: number | null;
          language: string;
          status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SCHEDULED";
          published_at: string | null;
          featured: boolean;
          meta_title: string | null;
          meta_description: string | null;
          og_image: string | null;
          view_count: number;
          like_count: number;
          comment_count: number;
          share_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          excerpt?: string | null;
          cover_image?: string | null;
          bible_book_id?: string | null;
          bible_chapter?: string | null;
          bible_verse?: string | null;
          category_id: string;
          author_id: string;
          difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
          reading_time?: number | null;
          language?: string;
          status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SCHEDULED";
          published_at?: string | null;
          featured?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image?: string | null;
          view_count?: number;
          like_count?: number;
          comment_count?: number;
          share_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string;
          excerpt?: string | null;
          cover_image?: string | null;
          bible_book_id?: string | null;
          bible_chapter?: string | null;
          bible_verse?: string | null;
          category_id?: string;
          author_id?: string;
          difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
          reading_time?: number | null;
          language?: string;
          status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SCHEDULED";
          published_at?: string | null;
          featured?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image?: string | null;
          view_count?: number;
          like_count?: number;
          comment_count?: number;
          share_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      post_likes: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      post_bookmarks: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          content: string;
          post_id: string;
          user_id: string | null;
          author_id: string | null;
          guest_name: string | null;
          guest_email: string | null;
          parent_id: string | null;
          status: "PENDING" | "APPROVED" | "REJECTED" | "SPAM";
          is_approved: boolean;
          is_reported: boolean;
          report_count: number;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          content: string;
          post_id: string;
          user_id?: string | null;
          author_id?: string | null;
          guest_name?: string | null;
          guest_email?: string | null;
          parent_id?: string | null;
          status?: "PENDING" | "APPROVED" | "REJECTED" | "SPAM";
          is_approved?: boolean;
          is_reported?: boolean;
          report_count?: number;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          content?: string;
          post_id?: string;
          user_id?: string | null;
          author_id?: string | null;
          guest_name?: string | null;
          guest_email?: string | null;
          parent_id?: string | null;
          status?: "PENDING" | "APPROVED" | "REJECTED" | "SPAM";
          is_approved?: boolean;
          is_reported?: boolean;
          report_count?: number;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          color: string | null;
          tag_type:
            | "THEOLOGY"
            | "DOCTRINE"
            | "PRACTICE"
            | "BIBLICAL"
            | "DEVOTIONAL"
            | "SEASONAL";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          color?: string | null;
          tag_type?:
            | "THEOLOGY"
            | "DOCTRINE"
            | "PRACTICE"
            | "BIBLICAL"
            | "DEVOTIONAL"
            | "SEASONAL";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          color?: string | null;
          tag_type?:
            | "THEOLOGY"
            | "DOCTRINE"
            | "PRACTICE"
            | "BIBLICAL"
            | "DEVOTIONAL"
            | "SEASONAL";
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          image: string | null;
          email_verified: string | null;
          display_name: string | null;
          username: string | null;
          bio: string | null;
          website: string | null;
          location: string | null;
          gender: string | null;
          age_group: string | null;
          faith_years: string | null;
          church: string | null;
          denomination: string | null;
          interests: Record<string, string | boolean> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          image?: string | null;
          email_verified?: string | null;
          display_name?: string | null;
          username?: string | null;
          bio?: string | null;
          website?: string | null;
          location?: string | null;
          gender?: string | null;
          age_group?: string | null;
          faith_years?: string | null;
          church?: string | null;
          denomination?: string | null;
          interests?: Record<string, string | boolean> | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          image?: string | null;
          email_verified?: string | null;
          display_name?: string | null;
          username?: string | null;
          bio?: string | null;
          website?: string | null;
          location?: string | null;
          gender?: string | null;
          age_group?: string | null;
          faith_years?: string | null;
          church?: string | null;
          denomination?: string | null;
          interests?: Record<string, string | boolean> | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

// 常用類型別名
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
export type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];

export type Author = Database["public"]["Tables"]["authors"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];

export type PostLike = Database["public"]["Tables"]["post_likes"]["Row"];
export type PostBookmark =
  Database["public"]["Tables"]["post_bookmarks"]["Row"];
