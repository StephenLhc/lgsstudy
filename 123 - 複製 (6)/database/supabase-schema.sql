-- ====================================
-- Supabase Schema for Bible Study CMS
-- ====================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================
-- ENUMS
-- ====================================

CREATE TYPE author_title AS ENUM (
  'PASTOR',
  'SCHOLAR', 
  'THEOLOGIAN',
  'TEACHER',
  'LAYPERSON',
  'MISSIONARY',
  'ELDER',
  'DEACON'
);

CREATE TYPE testament AS ENUM (
  'OLD_TESTAMENT',
  'NEW_TESTAMENT'
);

CREATE TYPE book_type AS ENUM (
  'TORAH',
  'HISTORY',
  'WISDOM',
  'MAJOR_PROPHETS',
  'MINOR_PROPHETS',
  'GOSPELS',
  'PAULINE',
  'GENERAL',
  'PROPHECY'
);

CREATE TYPE tag_type AS ENUM (
  'THEOLOGY',
  'DOCTRINE',
  'PRACTICE',
  'BIBLICAL',
  'DEVOTIONAL',
  'SEASONAL'
);

CREATE TYPE post_status AS ENUM (
  'DRAFT',
  'PUBLISHED',
  'ARCHIVED',
  'SCHEDULED'
);

CREATE TYPE difficulty AS ENUM (
  'BEGINNER',
  'INTERMEDIATE',
  'ADVANCED'
);

CREATE TYPE comment_status AS ENUM (
  'PENDING',
  'APPROVED',
  'REJECTED',
  'SPAM'
);

CREATE TYPE share_platform AS ENUM (
  'WHATSAPP',
  'FACEBOOK',
  'TELEGRAM',
  'WECHAT',
  'EMAIL',
  'COPY_LINK'
);

-- ====================================
-- TABLES
-- ====================================

-- Authors table
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  display_name VARCHAR,
  avatar VARCHAR,
  bio TEXT,
  title author_title DEFAULT 'LAYPERSON',
  church VARCHAR,
  denomination VARCHAR,
  website VARCHAR,
  social_links JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR UNIQUE NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  description TEXT,
  testament testament NOT NULL,
  book_type book_type NOT NULL,
  "order" INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bible books table
CREATE TABLE bible_books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR UNIQUE NOT NULL,
  english_name VARCHAR UNIQUE NOT NULL,
  abbreviation VARCHAR UNIQUE NOT NULL,
  chapter_count INTEGER NOT NULL,
  testament testament NOT NULL,
  book_type book_type NOT NULL,
  "order" INTEGER NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR UNIQUE NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR,
  tag_type tag_type DEFAULT 'THEOLOGY',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (extends NextAuth)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  image VARCHAR,
  email_verified TIMESTAMP WITH TIME ZONE,
  display_name VARCHAR,
  username VARCHAR UNIQUE,
  bio TEXT,
  website VARCHAR,
  location VARCHAR,
  gender VARCHAR,
  age_group VARCHAR,
  faith_years VARCHAR,
  church VARCHAR,
  denomination VARCHAR,
  interests JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image VARCHAR,
  bible_book_id UUID REFERENCES bible_books(id),
  bible_chapter VARCHAR,
  bible_verse VARCHAR,
  category_id UUID REFERENCES categories(id) NOT NULL,
  author_id UUID REFERENCES authors(id) NOT NULL,
  difficulty difficulty DEFAULT 'BEGINNER',
  reading_time INTEGER,
  language VARCHAR DEFAULT 'zh-TW',
  status post_status DEFAULT 'DRAFT',
  published_at TIMESTAMP WITH TIME ZONE,
  featured BOOLEAN DEFAULT false,
  meta_title VARCHAR,
  meta_description TEXT,
  og_image VARCHAR,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post tags junction table
CREATE TABLE post_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  UNIQUE(post_id, tag_id)
);

-- NextAuth tables
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR NOT NULL,
  provider VARCHAR NOT NULL,
  provider_account_id VARCHAR NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type VARCHAR,
  scope VARCHAR,
  id_token TEXT,
  session_state VARCHAR,
  UNIQUE(provider, provider_account_id)
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token VARCHAR UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE verification_tokens (
  identifier VARCHAR NOT NULL,
  token VARCHAR UNIQUE NOT NULL,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE(identifier, token)
);

-- Comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  guest_name VARCHAR,
  guest_email VARCHAR,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  status comment_status DEFAULT 'PENDING',
  is_approved BOOLEAN DEFAULT false,
  is_reported BOOLEAN DEFAULT false,
  report_count INTEGER DEFAULT 0,
  ip_address VARCHAR,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post likes table
CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Post bookmarks table
CREATE TABLE post_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Post shares table
CREATE TABLE post_shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  platform share_platform NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reading records table
CREATE TABLE reading_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 0,
  last_position VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Sensitive words table
CREATE TABLE sensitive_words (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  word VARCHAR UNIQUE NOT NULL,
  category VARCHAR NOT NULL,
  severity INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR UNIQUE NOT NULL,
  value TEXT NOT NULL,
  type VARCHAR NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- INDEXES
-- ====================================

CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at);
CREATE INDEX idx_posts_featured ON posts(featured);
CREATE INDEX idx_posts_category_id ON posts(category_id);
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_status ON comments(status);
CREATE INDEX idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX idx_post_bookmarks_user_id ON post_bookmarks(user_id);

-- ====================================
-- FUNCTIONS AND TRIGGERS
-- ====================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bible_books_updated_at BEFORE UPDATE ON bible_books FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reading_records_updated_at BEFORE UPDATE ON reading_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sensitive_words_updated_at BEFORE UPDATE ON sensitive_words FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================
-- ROW LEVEL SECURITY (RLS)
-- ====================================

-- Enable RLS on user-related tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_records ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (can be customized)
CREATE POLICY "Public posts are viewable by everyone" ON posts FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Users can insert their own comments" ON comments FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view their own data" ON post_likes FOR ALL USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view their own bookmarks" ON post_bookmarks FOR ALL USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can manage their reading records" ON reading_records FOR ALL USING (auth.uid()::text = user_id::text);

-- ====================================
-- INITIAL DATA SETUP
-- ====================================

-- This will be populated separately with your existing data
