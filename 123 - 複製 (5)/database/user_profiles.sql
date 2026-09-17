-- 用戶資料表結構（Supabase）
-- 在 Supabase 的 SQL 編輯器中執行以下 SQL 來創建用戶資料表

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    username VARCHAR(255),
    display_name VARCHAR(10) CHECK (display_name IN ('牧者', '弟兄', '姊妹' , '')),
    avatar TEXT, -- 頭像 URL
    gender VARCHAR(10) CHECK (gender IN ('男', '女', '')),
    age_group VARCHAR(20) CHECK (age_group IN ('18歲以下', '19至30歲', '31至50歲', '51歲或以上', '')),
    faith_years VARCHAR(20) CHECK (faith_years IN ('10年或以下', '11至20年', '21年或以上', '')),
    church VARCHAR(255),
    denomination VARCHAR(255),
    interests TEXT[], -- PostgreSQL 數組類型
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建更新時間觸發器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 創建索引以提高查詢性能
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_created_at ON user_profiles(created_at);

-- 啟用行級安全性（RLS）
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 創建 RLS 政策（用戶只能訪問自己的資料）
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (email = auth.jwt() ->> 'email');

CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (email = auth.jwt() ->> 'email');

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (email = auth.jwt() ->> 'email')
    WITH CHECK (email = auth.jwt() ->> 'email');

-- 註釋
COMMENT ON TABLE user_profiles IS '用戶個人資料表';
COMMENT ON COLUMN user_profiles.display_name IS '用戶稱呼/顯示名稱';
COMMENT ON COLUMN user_profiles.age_group IS '年齡層：18歲以下、19至30歲、31至50歲、51歲或以上';
COMMENT ON COLUMN user_profiles.faith_years IS '信主年數：10年以下、11至20年、21年以上';
COMMENT ON COLUMN user_profiles.interests IS '興趣愛好數組';
