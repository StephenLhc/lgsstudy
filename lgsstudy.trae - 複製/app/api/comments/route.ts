import { NextResponse } from "next/server";
import { withDbRetry } from "@/lib/db";

// 讀者提交文章回應（公開端點，無需登入）。
// 資料寫入 comments 表；文章列表的 comment_count 一律以即時 COUNT 計算，提交成功後計數自動 +1。
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const postId = Number(body?.postId);
    const userName = String(body?.userName ?? "").trim().slice(0, 50);
    const salutation = String(body?.salutation ?? "").trim().slice(0, 10);
    const ageGroup = String(body?.ageGroup ?? "").trim().slice(0, 20);
    const faithYears = String(body?.faithYears ?? "").trim().slice(0, 20);
    const churchName = String(body?.churchName ?? "").trim().slice(0, 100);
    const commentText = String(body?.commentText ?? "").trim().slice(0, 5000);
    const isPublic = Boolean(body?.isPublic);

    if (!Number.isInteger(postId)) {
      return NextResponse.json({ error: "缺少有效的文章編號（postId）" }, { status: 400 });
    }
    if (!userName) {
      return NextResponse.json({ error: "請填寫姓名／暱稱" }, { status: 400 });
    }
    if (!commentText) {
      return NextResponse.json({ error: "請填寫回應內容" }, { status: 400 });
    }

    // 確認文章存在且未刪除
    const target = await withDbRetry(
      (sql) => sql`SELECT id FROM posts WHERE id = ${postId} AND is_deleted = false`,
      { retryAfterSent: false },
    );
    if (target.length === 0) {
      return NextResponse.json({ error: "找不到這篇文章，可能已被移除" }, { status: 404 });
    }

    const inserted = await withDbRetry(
      (sql) => sql`
        INSERT INTO comments (post_id, user_name, salutation, age_group, faith_years, church_name, comment_text, is_public)
        VALUES (${postId}, ${userName}, ${salutation}, ${ageGroup}, ${faithYears}, ${churchName}, ${commentText}, ${isPublic})
        RETURNING id
      `,
      { retryAfterSent: false },
    );

    return NextResponse.json({ ok: true, id: inserted[0].id });
  } catch (error) {
    console.error("❌ 回應寫入失敗:", error);
    return NextResponse.json(
      { error: "回應送出失敗，請稍後再試一次" },
      { status: 500 },
    );
  }
}
