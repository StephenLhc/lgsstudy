import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
// import { SupabaseAdapter } from "@next-auth/supabase-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    // 簡單的測試帳戶
    CredentialsProvider({
      name: "測試帳戶",
      credentials: {
        username: {
          label: "用戶名",
          type: "text",
          placeholder: "請輸入用戶名",
        },
        password: {
          label: "密碼",
          type: "password",
          placeholder: "請輸入密碼",
        },
      },
      async authorize(credentials) {
        // 添加調試信息
        console.log("認證嘗試:", {
          receivedUsername: credentials?.username,
          receivedPassword: credentials?.password,
          expectedUsername: "123",
          expectedPassword: "abc123",
          usernameMatch: credentials?.username === "123",
          passwordMatch: credentials?.password === "abc123",
        });

        // 簡單的測試帳戶驗證
        if (
          credentials?.username === "123" &&
          credentials?.password === "abc123"
        ) {
          console.log("認證成功！");
          return {
            id: "123",
            name: "123",
            email: "123@test.com",
            image: null,
          };
        }
        console.log("認證失敗 - 用戶名或密碼不匹配");
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "temp-google-client-id",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "temp-google-client-secret",
    }),
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID || "temp-microsoft-client-id",
      clientSecret:
        process.env.MICROSOFT_CLIENT_SECRET || "temp-microsoft-client-secret",
      tenantId: process.env.MICROSOFT_TENANT_ID || "temp-microsoft-tenant-id",
    }),
  ],
  // 暫時註釋掉 Supabase adapter 直到正確配置
  // adapter: SupabaseAdapter({
  //   url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  // }),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      // 如果是憑證提供者（我們的測試帳戶），確保用戶在數據庫中存在
      if (account?.provider === "credentials") {
        try {
          // 檢查用戶是否已存在
          const existingUser = await prisma.user.findUnique({
            where: { id: user.id },
          });

          if (!existingUser) {
            // 創建新用戶
            await prisma.user.create({
              data: {
                id: user.id,
                email: user.email || "",
                name: user.name,
                image: user.image,
                displayName: user.name,
              },
            });
          }
        } catch (error) {
          console.error("創建用戶失敗:", error);
          // 即使創建失敗也允許登錄，這樣可以避免登錄阻塞
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        // 為特定管理員郵箱設置 admin 角色
        if (
          session.user.email === "admin@example.com" ||
          session.user.email === "your-admin@gmail.com" ||
          session.user.name === "123" // 為測試帳戶添加 admin 權限
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (session.user as any).role = "admin";
        }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
      }
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};
