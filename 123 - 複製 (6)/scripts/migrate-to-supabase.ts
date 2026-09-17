/**
 * Supabase 遷移腳本
 *
 * 這個腳本會：
 * 1. 匯出現有 SQLite 資料
 * 2. 轉換格式適配 Supabase
 * 3. 保持所有現有 API 接口不變
 * 4. 不影響暗亮模式、RWD、登入功能
 */

import { prisma } from "../lib/prisma";
import { createServerSupabaseClient } from "../lib/supabase";
import fs from "fs";
import path from "path";

export async function exportPrismaData() {
  console.log("🔄 開始匯出 Prisma 資料...");

  try {
    // 匯出所有資料
    const data = {
      authors: await prisma.author.findMany(),
      categories: await prisma.category.findMany(),
      bibleBooks: await prisma.bibleBook.findMany(),
      tags: await prisma.tag.findMany(),
      posts: await prisma.post.findMany({
        include: {
          author: true,
          category: true,
          bibleBook: true,
          tags: true,
        },
      }),
      postTags: await prisma.postTag.findMany(),
      users: await prisma.user.findMany(),
      comments: await prisma.comment.findMany(),
      postLikes: await prisma.postLike.findMany(),
      postBookmarks: await prisma.postBookmark.findMany(),
      postShares: await prisma.postShare.findMany(),
    };

    // 保存到檔案
    const exportPath = path.join(
      process.cwd(),
      "database",
      "prisma-export.json"
    );
    fs.writeFileSync(exportPath, JSON.stringify(data, null, 2));

    console.log("✅ 資料匯出完成:", exportPath);
    return data;
  } catch (error) {
    console.error("❌ 匯出失敗:", error);
    throw error;
  }
}

export async function importToSupabase(data: any) {
  console.log("🔄 開始匯入到 Supabase...");

  const supabase = createServerSupabaseClient();

  try {
    // 按依賴順序匯入資料

    // 1. Authors
    if (data.authors?.length > 0) {
      const { error } = await supabase.from("authors").insert(
        data.authors.map((author: any) => ({
          id: author.id,
          email: author.email,
          name: author.name,
          display_name: author.displayName,
          avatar: author.avatar,
          bio: author.bio,
          title: author.title,
          church: author.church,
          denomination: author.denomination,
          website: author.website,
          social_links: author.socialLinks,
          created_at: author.createdAt,
          updated_at: author.updatedAt,
        }))
      );
      if (error) throw error;
      console.log("✅ Authors 匯入完成");
    }

    // 2. Categories
    if (data.categories?.length > 0) {
      const { error } = await supabase.from("categories").insert(
        data.categories.map((category: any) => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          testament: category.testament,
          book_type: category.bookType,
          order: category.order,
          is_active: category.isActive,
          created_at: category.createdAt,
          updated_at: category.updatedAt,
        }))
      );
      if (error) throw error;
      console.log("✅ Categories 匯入完成");
    }

    // 3. Bible Books
    if (data.bibleBooks?.length > 0) {
      const { error } = await supabase.from("bible_books").insert(
        data.bibleBooks.map((book: any) => ({
          id: book.id,
          name: book.name,
          english_name: book.englishName,
          abbreviation: book.abbreviation,
          chapter_count: book.chapterCount,
          testament: book.testament,
          book_type: book.bookType,
          order: book.order,
          description: book.description,
          category_id: book.categoryId,
          created_at: book.createdAt,
          updated_at: book.updatedAt,
        }))
      );
      if (error) throw error;
      console.log("✅ Bible Books 匯入完成");
    }

    // 4. Tags
    if (data.tags?.length > 0) {
      const { error } = await supabase.from("tags").insert(
        data.tags.map((tag: any) => ({
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
          description: tag.description,
          color: tag.color,
          tag_type: tag.tagType,
          created_at: tag.createdAt,
          updated_at: tag.updatedAt,
        }))
      );
      if (error) throw error;
      console.log("✅ Tags 匯入完成");
    }

    // 5. Users (如果有的話)
    if (data.users?.length > 0) {
      const { error } = await supabase.from("users").insert(
        data.users.map((user: any) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          email_verified: user.emailVerified,
          display_name: user.displayName,
          username: user.username,
          bio: user.bio,
          website: user.website,
          location: user.location,
          gender: user.gender,
          age_group: user.ageGroup,
          faith_years: user.faithYears,
          church: user.church,
          denomination: user.denomination,
          interests: user.interests,
          created_at: user.createdAt,
          updated_at: user.updatedAt,
        }))
      );
      if (error) throw error;
      console.log("✅ Users 匯入完成");
    }

    // 6. Posts
    if (data.posts?.length > 0) {
      const { error } = await supabase.from("posts").insert(
        data.posts.map((post: any) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          cover_image: post.coverImage,
          bible_book_id: post.bibleBookId,
          bible_chapter: post.bibleChapter,
          bible_verse: post.bibleVerse,
          category_id: post.categoryId,
          author_id: post.authorId,
          difficulty: post.difficulty,
          reading_time: post.readingTime,
          language: post.language,
          status: post.status,
          published_at: post.publishedAt,
          featured: post.featured,
          meta_title: post.metaTitle,
          meta_description: post.metaDescription,
          og_image: post.ogImage,
          view_count: post.viewCount,
          like_count: post.likeCount,
          comment_count: post.commentCount,
          share_count: post.shareCount,
          created_at: post.createdAt,
          updated_at: post.updatedAt,
        }))
      );
      if (error) throw error;
      console.log("✅ Posts 匯入完成");
    }

    // 7. Post Tags
    if (data.postTags?.length > 0) {
      const { error } = await supabase.from("post_tags").insert(
        data.postTags.map((pt: any) => ({
          id: pt.id,
          post_id: pt.postId,
          tag_id: pt.tagId,
        }))
      );
      if (error) throw error;
      console.log("✅ Post Tags 匯入完成");
    }

    console.log("🎉 Supabase 匯入完成！");
  } catch (error) {
    console.error("❌ Supabase 匯入失敗:", error);
    throw error;
  }
}

export async function migrateToSupabase() {
  console.log("🚀 開始完整 Supabase 遷移...");

  try {
    // 1. 匯出現有資料
    const data = await exportPrismaData();

    // 2. 匯入到 Supabase
    await importToSupabase(data);

    console.log("✅ 遷移完成！");
    console.log("📝 接下來請：");
    console.log("   1. 更新 .env.local 中的 Supabase 憑證");
    console.log("   2. 在 Supabase 控制台中執行 database/supabase-schema.sql");
    console.log("   3. 運行這個遷移腳本");
    console.log("   4. 測試網站功能");
  } catch (error) {
    console.error("❌ 遷移失敗:", error);
    console.log("🔧 請檢查：");
    console.log("   1. Supabase 憑證是否正確");
    console.log("   2. 資料庫 Schema 是否已建立");
    console.log("   3. 網路連接是否正常");
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  migrateToSupabase();
}
