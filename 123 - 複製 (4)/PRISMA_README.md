# Prisma 設置指南

## 📋 概述

本項目使用 Prisma 作為 ORM，連接 PostgreSQL 數據庫。

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 設置數據庫

首先需要設置 PostgreSQL 數據庫。您可以使用：

- 本地 PostgreSQL
- Supabase (推薦)
- 其他雲端 PostgreSQL 服務

### 3. 配置環境變數

複製 `.env.local.example` 為 `.env.local` 並更新數據庫連接：

```env
DATABASE_URL="postgresql://username:password@localhost:5432/bible_study_db"
```

或者使用 Supabase：

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

### 4. 生成 Prisma 客戶端

```bash
npm run db:generate
```

### 5. 推送數據庫架構

```bash
npm run db:push
```

### 6. 運行種子數據

```bash
npm run db:seed
```

## 📚 Prisma 腳本

- `npm run db:generate` - 生成 Prisma 客戶端
- `npm run db:push` - 推送架構到數據庫
- `npm run db:migrate` - 創建和應用遷移
- `npm run db:seed` - 運行種子數據
- `npm run db:studio` - 打開 Prisma Studio

## 🗄️ 數據模型

### 核心模型

- **Author** - 作者 (牧者/學者/平信徒)
- **Post** - 文章
- **Category** - 分類 (聖經書卷分類)
- **BibleBook** - 聖經書卷
- **Tag** - 標籤 (神學主題)
- **Comment** - 評論 (支援三層嵌套)
- **User** - 用戶 (基於 NextAuth)

### 互動模型

- **PostLike** - 文章點讚
- **PostBookmark** - 文章收藏
- **PostShare** - 文章分享
- **ReadingRecord** - 閱讀記錄

### 系統模型

- **SensitiveWord** - 敏感詞過濾
- **SiteSetting** - 網站設定

## 🔄 種子數據

種子數據包含：

- 聖經書卷分類 (律法書、歷史書、詩歌智慧書等)
- 主要聖經書卷
- 神學標籤
- 示範作者
- 基本網站設定

## 🛠️ 開發

### 修改數據模型

1. 編輯 `prisma/schema.prisma`
2. 運行 `npm run db:push` 應用變更
3. 運行 `npm run db:generate` 更新客戶端

### 添加種子數據

編輯 `prisma/seed.ts` 文件並運行：

```bash
npm run db:seed
```

## 📖 使用範例

```typescript
import { prisma } from "@/lib/prisma";

// 獲取所有文章
const posts = await prisma.post.findMany({
  include: {
    author: true,
    category: true,
    tags: {
      include: {
        tag: true,
      },
    },
  },
});

// 創建新評論
const comment = await prisma.comment.create({
  data: {
    content: "很好的文章！",
    postId: "post-id",
    userId: "user-id",
    status: "PENDING",
  },
});
```

## 🔗 相關資源

- [Prisma 文檔](https://www.prisma.io/docs)
- [PostgreSQL 文檔](https://www.postgresql.org/docs)
- [Supabase 文檔](https://supabase.com/docs)
