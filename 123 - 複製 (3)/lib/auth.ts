import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
// import { SupabaseAdapter } from "@next-auth/supabase-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
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
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
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
