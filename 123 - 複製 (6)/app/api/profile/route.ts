import { createServerSupabaseClient } from "../../../lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export interface UserProfile {
  username: string;
  displayName: string;
  avatar: string;
  gender: "男" | "女" | "";
  ageGroup: "18歲以下" | "19至30歲" | "31至50歲" | "51歲或以上" | "";
  faithYears: "10年以下" | "11至20年" | "21年以上" | "";
  church: string;
  denomination: string;
  interests: string[];
}

// GET - 獲取用戶資料
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "未授權訪問" }, { status: 401 });
    }

    const supabase = createServerSupabaseClient();

    const { data: profile, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 是找不到記錄的錯誤
      console.error("Database error:", error);
      return NextResponse.json({ error: "資料庫錯誤" }, { status: 500 });
    }

    // 如果沒有找到資料，返回預設值
    if (!profile) {
      return NextResponse.json({
        username: session.user.name || "",
        displayName: session.user.name || "",
        avatar: session.user.image || "",
        gender: "",
        ageGroup: "",
        faithYears: "",
        church: "",
        denomination: "",
        interests: [],
      });
    }

    return NextResponse.json({
      username: profile.username || session.user.name || "",
      displayName: profile.display_name || session.user.name || "",
      avatar: profile.avatar || session.user.image || "",
      gender: profile.gender || "",
      ageGroup: profile.age_group || "",
      faithYears: profile.faith_years || "",
      church: profile.church || "",
      denomination: profile.denomination || "",
      interests: profile.interests || [],
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}

// POST/PUT - 保存用戶資料
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "未授權訪問" }, { status: 401 });
    }

    const body = await request.json();
    const {
      username,
      displayName,
      avatar,
      gender,
      ageGroup,
      faithYears,
      church,
      denomination,
      interests,
    }: UserProfile = body;

    // 驗證必填欄位
    if (!displayName) {
      return NextResponse.json({ error: "稱呼為必填欄位" }, { status: 400 });
    }

    // 驗證資料
    const validGenders = ["男", "女", ""];
    const validAgeGroups = [
      "18歲以下",
      "19至30歲",
      "31至50歲",
      "51歲或以上",
      "",
    ];
    const validFaithYears = ["10年以下", "11至20年", "21年以上", ""];

    if (gender && !validGenders.includes(gender)) {
      return NextResponse.json({ error: "無效的性別選項" }, { status: 400 });
    }

    if (ageGroup && !validAgeGroups.includes(ageGroup)) {
      return NextResponse.json({ error: "無效的年齡層選項" }, { status: 400 });
    }

    if (faithYears && !validFaithYears.includes(faithYears)) {
      return NextResponse.json(
        { error: "無效的信主年數選項" },
        { status: 400 }
      );
    }

    if (!Array.isArray(interests)) {
      return NextResponse.json(
        { error: "興趣必須是陣列格式" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // 使用 upsert 來插入或更新資料
    const { data, error } = await supabase
      .from("user_profiles")
      .upsert(
        {
          email: session.user.email,
          name: session.user.name,
          username: username || session.user.name,
          display_name: displayName,
          avatar: avatar || session.user.image,
          gender: gender || null,
          age_group: ageGroup || null,
          faith_years: faithYears || null,
          church: church || null,
          denomination: denomination || null,
          interests: interests || [],
        },
        {
          onConflict: "email",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "保存資料失敗" }, { status: 500 });
    }

    return NextResponse.json({
      message: "資料保存成功",
      profile: {
        gender: data.gender || "",
        ageGroup: data.age_group || "",
        faithYears: data.faith_years || "",
        church: data.church || "",
        denomination: data.denomination || "",
        interests: data.interests || [],
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}
