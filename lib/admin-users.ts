import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { withDbRetry } from "./db";

const USERNAME_PATTERN = /^[\p{L}\p{N}]{2,24}$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAdminAccount(input: {
  username: string;
  email: string;
}): string | null {
  if (!USERNAME_PATTERN.test(input.username)) {
    return "使用者名稱請用 2 至 24 個中文、英文字母或數字";
  }
  if (!EMAIL_PATTERN.test(input.email)) {
    return "請輸入正確的 Google 或 Yahoo 電郵地址";
  }
  return null;
}

function hashPassword(password: string, salt: Buffer): string {
  return scryptSync(password, salt, 64).toString("hex");
}

export function createPasswordHash(password: string): string {
  const salt = randomBytes(16);
  return `${salt.toString("hex")}:${hashPassword(password, salt)}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  try {
    const expected = Buffer.from(hashHex, "hex");
    const actual = Buffer.from(
      hashPassword(password, Buffer.from(saltHex, "hex")),
      "hex",
    );
    return (
      expected.length === actual.length && timingSafeEqual(expected, actual)
    );
  } catch {
    return false;
  }
}

export async function ensureAdminUsersTable(): Promise<void> {
  await withDbRetry(
    (sql) => sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(24) NOT NULL UNIQUE,
        display_name VARCHAR(80) NOT NULL,
        email VARCHAR(320) NOT NULL,
        password_hash TEXT NOT NULL,
        avatar_url TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `,
    { retryAfterSent: false },
  );
}

export async function findAdminUserByEmail(email: string): Promise<{
  username: string;
  email: string;
} | null> {
  await ensureAdminUsersTable();
  const rows = await withDbRetry(
    (sql) => sql`
      SELECT username, email
      FROM admin_users
      WHERE LOWER(email) = LOWER(${email}) AND is_active = TRUE
      LIMIT 1
    `,
    { retryAfterSent: true },
  );
  return rows.length > 0
    ? (rows[0] as { username: string; email: string })
    : null;
}

export async function ensureAdminLoginTokensTable(): Promise<void> {
  await withDbRetry(
    (sql) => sql`
      CREATE TABLE IF NOT EXISTS admin_login_tokens (
        id SERIAL PRIMARY KEY,
        email VARCHAR(320) NOT NULL,
        token_hash CHAR(64) NOT NULL UNIQUE,
        expires_at TIMESTAMPTZ NOT NULL,
        used_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `,
    { retryAfterSent: false },
  );
  await withDbRetry(
    (sql) =>
      sql`ALTER TABLE admin_login_tokens ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`,
    { retryAfterSent: false },
  );
}

export async function hasRecentAdminLoginToken(
  email: string,
): Promise<boolean> {
  await ensureAdminLoginTokensTable();
  const rows = await withDbRetry(
    (sql) => sql`
      SELECT 1
      FROM admin_login_tokens
      WHERE LOWER(email) = LOWER(${email})
        AND created_at > NOW() - INTERVAL '5 minutes'
      LIMIT 1
    `,
    { retryAfterSent: true },
  );
  return rows.length > 0;
}

export async function createAdminLoginToken(input: {
  email: string;
  tokenHash: string;
  expiresAt: Date;
}): Promise<void> {
  await ensureAdminLoginTokensTable();
  await withDbRetry(
    (sql) => sql`
      INSERT INTO admin_login_tokens (email, token_hash, expires_at)
      VALUES (${input.email.toLowerCase()}, ${input.tokenHash}, ${input.expiresAt.toISOString()})
    `,
    { retryAfterSent: false },
  );
}

export async function consumeAdminLoginToken(
  tokenHash: string,
): Promise<{ username: string } | null> {
  await ensureAdminLoginTokensTable();
  const rows = await withDbRetry(
    (sql) => sql`
      UPDATE admin_login_tokens AS token
      SET used_at = NOW()
      FROM admin_users AS user_account
      WHERE token.token_hash = ${tokenHash}
        AND LOWER(token.email) = LOWER(user_account.email)
        AND user_account.is_active = TRUE
        AND token.used_at IS NULL
        AND token.expires_at > NOW()
      RETURNING user_account.username
    `,
    { retryAfterSent: false },
  );
  return rows.length > 0 ? (rows[0] as { username: string }) : null;
}

export async function findAdminUser(username: string): Promise<{
  username: string;
  display_name: string;
  email: string;
  password_hash: string;
  avatar_url: string | null;
} | null> {
  await ensureAdminUsersTable();
  const rows = await withDbRetry(
    (sql) => sql`
      SELECT username, display_name, email, password_hash, avatar_url
      FROM admin_users
      WHERE LOWER(username) = LOWER(${username}) AND is_active = TRUE
      LIMIT 1
    `,
    { retryAfterSent: true },
  );
  return rows.length > 0
    ? (rows[0] as {
        username: string;
        display_name: string;
        email: string;
        password_hash: string;
        avatar_url: string | null;
      })
    : null;
}

export async function createAdminUser(input: {
  username: string;
  displayName: string;
  email: string;
  password: string;
  avatarUrl: string | null;
}): Promise<{ ok: boolean; message: string }> {
  await ensureAdminUsersTable();
  try {
    const username = input.username.toLowerCase();
    await withDbRetry(
      (sql) => sql`
        INSERT INTO admin_users (username, display_name, email, password_hash, avatar_url)
        VALUES (${username}, ${input.displayName}, ${input.email}, ${createPasswordHash(input.password)}, ${input.avatarUrl})
      `,
      { retryAfterSent: false },
    );
    return { ok: true, message: "使用者建立成功，現在可以登入" };
  } catch (error) {
    const message = String(error);
    if (/duplicate key|unique constraint/i.test(message)) {
      return { ok: false, message: "這個使用者名稱已有人使用，請換另一個" };
    }
    console.error("建立後台使用者失敗:", error);
    return { ok: false, message: "建立使用者失敗，請稍後再試" };
  }
}
