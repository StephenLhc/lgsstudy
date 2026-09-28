import { NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
  getAdminToken,
  isAdminRequest,
  isPasswordCorrect,
} from "../auth";
import {
  createAdminLoginToken,
  findAdminUserByEmail,
  hasRecentAdminLoginToken,
} from "@/lib/admin-users";
import { sendAdminLoginLink } from "@/lib/mailer";
import { getSiteUrl } from "@/lib/site";

// 確認目前是否已登入（供後台頁面開啟時檢查 cookie）
export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}

// 作者後台登入：核對密碼，成功後設定 httpOnly cookie
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = typeof body?.password === "string" ? body.password : "";
    if (password) {
      if (!isPasswordCorrect(password)) {
        return NextResponse.json({ error: "密碼不正確" }, { status: 401 });
      }
      const response = NextResponse.json({ ok: true });
      response.cookies.set(ADMIN_COOKIE, getAdminToken(), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: ADMIN_COOKIE_MAX_AGE,
      });
      return response;
    }

    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email) {
      return NextResponse.json({ error: "請輸入電郵地址" }, { status: 400 });
    }

    const user = await findAdminUserByEmail(email);
    if (!user) {
      return NextResponse.json({
        message: "如果電郵已註冊，登入連結將寄到你的信箱",
      });
    }
    if (await hasRecentAdminLoginToken(user.email)) {
      return NextResponse.json({
        message: "如果電郵已註冊，登入連結將寄到你的信箱",
      });
    }

    const token = randomBytes(32).toString("base64url");
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await createAdminLoginToken({
      email: user.email,
      tokenHash: createHash("sha256").update(token).digest("hex"),
      expiresAt,
    });
    const loginUrl = `${getSiteUrl()}/api/admin/login/verify?token=${encodeURIComponent(token)}`;
    const sent = await sendAdminLoginLink({ email: user.email, loginUrl });
    if (!sent) {
      return NextResponse.json(
        { error: "登入電郵暫時無法寄出，請聯絡網站管理員" },
        { status: 503 },
      );
    }
    return NextResponse.json({ message: "登入連結已寄出，請查看你的電郵" });
  } catch (error) {
    console.error("❌ 後台登入失敗:", error);
    return NextResponse.json({ error: "登入要求格式錯誤" }, { status: 400 });
  }
}
