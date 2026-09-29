import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { put, type PutBlobResult } from "@vercel/blob";
import { isPasswordCorrect } from "../auth";
import { createAdminUser, validateAdminAccount } from "@/lib/admin-users";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};
const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

async function saveAvatar(file: File): Promise<string> {
  const extension = ALLOWED_TYPES[file.type];
  if (!extension || file.size > MAX_AVATAR_BYTES) return "";
  const safeName = file.name.replace(/[^\w.-]/g, "_").slice(0, 60);
  const blobName = `avatars/${Date.now()}-${safeName || `avatar.${extension}`}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob: PutBlobResult = await put(blobName, file, {
      access: "public",
      contentType: file.type,
    });
    return blob.url;
  }

  const path = await import("node:path");
  const fs = await import("node:fs/promises");
  const { randomBytes } = await import("node:crypto");
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  const fileName = `avatar-${Date.now()}-${randomBytes(4).toString("hex")}.${extension}`;
  await fs.writeFile(
    path.join(uploadDir, fileName),
    Buffer.from(await file.arrayBuffer()),
  );
  return `/uploads/${fileName}`;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const username = String(form.get("username") || "").trim();
    const displayName = String(form.get("displayName") || username).trim();
    const email = String(form.get("email") || "")
      .trim()
      .toLowerCase();
    const masterPassword = String(form.get("masterPassword") || "");
    const file = form.get("avatar");

    if (!isPasswordCorrect(masterPassword)) {
      return NextResponse.json(
        { error: "請輸入正確的現有後台密碼" },
        { status: 401 },
      );
    }
    if (displayName.length < 1 || displayName.length > 80) {
      return NextResponse.json(
        { error: "請輸入 1 至 80 個字的顯示名稱" },
        { status: 400 },
      );
    }
    const validationError = validateAdminAccount({ username, email });
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }
    if (
      file instanceof File &&
      file.size > 0 &&
      (!ALLOWED_TYPES[file.type] || file.size > MAX_AVATAR_BYTES)
    ) {
      return NextResponse.json(
        { error: "頭像只支援 JPG、PNG、GIF 或 WebP，大小不超過 2MB" },
        { status: 400 },
      );
    }

    const avatarUrl =
      file instanceof File && file.size > 0 ? await saveAvatar(file) : null;
    const result = await createAdminUser({
      username,
      displayName,
      email,
      password: randomBytes(32).toString("base64url"),
      avatarUrl,
    });
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch (error) {
    console.error("建立後台帳戶失敗:", error);
    return NextResponse.json(
      { error: "建立帳戶失敗，請稍後再試" },
      { status: 500 },
    );
  }
}
