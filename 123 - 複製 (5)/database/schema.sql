-- 用戶資料表 SQL 結構
-- 這個檔案包含了創建用戶資料表的 SQL 語句
-- 在 Supabase SQL Editor 中執行這些語句來設置資料庫

-- 創建用戶資料表
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    email TEXT,
    name TEXT,
    gender TEXT CHECK (gender IN ('男', '女')),
    age_group TEXT CHECK (age_group IN ('18歲以下', '18-25歲', '26-35歲', '36-45歲', '46-55歲', '56-65歲', '65歲以上')),
    faith_years TEXT CHECK (faith_years IN ('1年以下', '1-3年', '4-6年', '7-10年', '10年以上')),
    church TEXT,
    denomination TEXT,
    interests JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建用戶閱讀記錄表
CREATE TABLE IF NOT EXISTS user_reading_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    article_slug TEXT NOT NULL,
    article_title TEXT,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reading_progress INTEGER DEFAULT 100, -- 閱讀進度百分比
    reading_time INTEGER DEFAULT 0, -- 閱讀時間（秒）
    UNIQUE(user_id, article_slug)
);

-- 創建用戶收藏表
CREATE TABLE IF NOT EXISTS user_bookmarks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    article_slug TEXT NOT NULL,
    article_title TEXT,
    bookmarked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, article_slug)
);

-- 創建用戶筆記表
CREATE TABLE IF NOT EXISTS user_notes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    article_slug TEXT NOT NULL,
    note_content TEXT NOT NULL,
    verse_reference TEXT, -- 經文引用
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建用戶學習統計表
CREATE TABLE IF NOT EXISTS user_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    total_articles_read INTEGER DEFAULT 0,
    total_bookmarks INTEGER DEFAULT 0,
    consecutive_days INTEGER DEFAULT 0,
    last_read_date DATE,
    total_reading_time INTEGER DEFAULT 0, -- 總閱讀時間（秒）
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 設置 RLS (Row Level Security) 政策
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reading_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- 用戶資料表的 RLS 政策
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- 閱讀記錄表的 RLS 政策
CREATE POLICY "Users can view own reading records" ON user_reading_records
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading records" ON user_reading_records
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reading records" ON user_reading_records
    FOR UPDATE USING (auth.uid() = user_id);

-- 收藏表的 RLS 政策
CREATE POLICY "Users can view own bookmarks" ON user_bookmarks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks" ON user_bookmarks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks" ON user_bookmarks
    FOR DELETE USING (auth.uid() = user_id);

-- 筆記表的 RLS 政策
CREATE POLICY "Users can view own notes" ON user_notes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes" ON user_notes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes" ON user_notes
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes" ON user_notes
    FOR DELETE USING (auth.uid() = user_id);

-- 統計表的 RLS 政策
CREATE POLICY "Users can view own stats" ON user_stats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats" ON user_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON user_stats
    FOR UPDATE USING (auth.uid() = user_id);

-- 創建自動更新 updated_at 的函數
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language plpgsql;

-- 為需要的表添加自動更新觸發器
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_notes_updated_at
    BEFORE UPDATE ON user_notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at
    BEFORE UPDATE ON user_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 創建初始化用戶統計的函數
CREATE OR REPLACE FUNCTION init_user_stats()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_stats (user_id)
    VALUES (NEW.user_id)
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ language plpgsql;

-- 當創建用戶資料時，自動初始化統計
CREATE TRIGGER init_user_stats_trigger
    AFTER INSERT ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION init_user_stats();
