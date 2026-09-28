import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, ADMIN_COOKIE_MAX_AGE, getUserToken } from "../../auth";
import { consumeAdminLoginToken } from "@/lib/admin-users";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  if (!token) {
    return NextResponse.redirect(
      new URL("/admin?error=invalid-login-link", request.url),
    );
  }

  const user = await consumeAdminLoginToken(
    createHash("sha256").update(token).digest("hex"),
  );
  if (!user) {
    return NextResponse.redirect(
      new URL("/admin?error=expired-login-link", request.url),
    );
  }

  const response = NextResponse.redirect(new URL("/admin", request.url));
  response.cookies.set(ADMIN_COOKIE, getUserToken(user.username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return response;
}
