import { createClient } from "@supabase/supabase-js";

// 簡化的環境變數檢查
export function checkEnvironmentVariables() {
  const config = {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };

  // 只檢查必要的環境變數
  if (!config.url || !config.anonKey) {
    console.warn("⚠️ 警告：缺少必要的 Supabase 環境變數");
    return { valid: false, config, issues: ["缺少必要的環境變數"] };
  }

  console.log("✅ Supabase 環境變數檢查通過");
  return { valid: true, config };
}

// 建立 Supabase 客戶端
export function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error("❌ 缺少必要的 Supabase 環境變數");
    throw new Error("NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY 是必需的");
  }

  try {
    const supabase = createClient(url, anonKey);
    console.log("✅ Supabase 客戶端建立成功");
    return supabase;
  } catch (error) {
    console.error("❌ Supabase 客戶端建立失敗:", error);
    throw error;
  }
}

// 測試 Supabase 連線
export async function testSupabaseConnection() {
  try {
    const supabase = createSupabaseClient();

    console.log("🔍 測試 Supabase 連線...");

    // 測試基本連線
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("❌ Supabase 連線失敗:", error);
      return { success: false, error, type: "connection" };
    }

    console.log("✅ Supabase 連線成功!");
    console.log("Session:", data.session ? "有會話" : "無會話");

    return { success: true, data, type: "connection" };
  } catch (error) {
    console.error("❌ 測試過程中發生錯誤:", error);
    return { success: false, error, type: "error" };
  }
}

// 測試用戶註冊
export async function testUserRegistration() {
  try {
    const supabase = createSupabaseClient();

    console.log("🔍 測試用戶註冊...");

    const testUser = {
      email: "test@example.com",
      password: "testpassword123",
      metadata: { full_name: "Test User" },
    };

    const { data, error } = await supabase.auth.signUp({
      email: testUser.email,
      password: testUser.password,
      options: {
        data: testUser.metadata,
      },
    });

    if (error) {
      console.error("❌ 用戶註冊失敗:", error);
      return { success: false, error, type: "registration" };
    }

    console.log("✅ 測試用戶註冊成功!");
    console.log("User ID:", data.user?.id);
    console.log("Email:", data.user?.email);

    return { success: true, data, type: "registration" };
  } catch (error) {
    console.error("❌ 註冊測試過程中發生錯誤:", error);
    return { success: false, error, type: "error" };
  }
}

// 測試用戶登入
export async function testUserLogin(email: string, password: string) {
  try {
    const supabase = createSupabaseClient();

    console.log("🔍 測試用戶登入...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("❌ 用戶登入失敗:", error);
      return { success: false, error, type: "login" };
    }

    console.log("✅ 測試用戶登入成功!");
    console.log("User ID:", data.user?.id);
    console.log("Email:", data.user?.email);

    return { success: true, data, type: "login" };
  } catch (error) {
    console.error("❌ 登入測試過程中發生錯誤:", error);
    return { success: false, error, type: "error" };
  }
}

// 完整診斷
export async function runFullDiagnostic() {
  console.log("🚀 開始 Supabase 完整診斷...\n");

  // 1. 檢查環境變數
  console.log("1️⃣ 檢查環境變數:");
  const envCheck = checkEnvironmentVariables();
  console.log("");

  if (!envCheck.valid) {
    console.log("❌ 環境變數檢查失敗，停止診斷");
    return { success: false, step: "environment" };
  }

  // 2. 測試連線
  console.log("2️⃣ 測試 Supabase 連線:");
  const connectionTest = await testSupabaseConnection();
  console.log("");

  if (!connectionTest.success) {
    console.log("❌ 連線測試失敗，停止診斷");
    return { success: false, step: "connection" };
  }

  // 3. 測試註冊
  console.log("3️⃣ 測試用戶註冊:");
  const registrationTest = await testUserRegistration();
  console.log("");

  // 4. 測試登入
  console.log("4️⃣ 測試用戶登入:");
  const loginTest = await testUserLogin("test@example.com", "testpassword123");
  console.log("");

  // 總結
  console.log("📊 診斷結果總結:");
  console.log(`環境變數: ${envCheck.valid ? "✅" : "❌"}`);
  console.log(`連線測試: ${connectionTest.success ? "✅" : "❌"}`);
  console.log(`註冊測試: ${registrationTest.success ? "✅" : "❌"}`);
  console.log(`登入測試: ${loginTest.success ? "✅" : "❌"}`);

  const allTestsPassed =
    envCheck.valid &&
    connectionTest.success &&
    registrationTest.success &&
    loginTest.success;

  if (allTestsPassed) {
    console.log("\n🎉 所有測試通過！Supabase 配置正常");
  } else {
    console.log("\n💥 部分測試失敗，請檢查上述錯誤訊息");
  }

  return {
    success: allTestsPassed,
    tests: {
      environment: envCheck.valid,
      connection: connectionTest.success,
      registration: registrationTest.success,
      login: loginTest.success,
    },
  };
}
