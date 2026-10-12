-- ============================================================
-- Supabase CMS Migration for Kelajak Markazi
-- Run this SQL in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ===================
-- 1. TABLES
-- ===================

-- News articles
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title JSONB NOT NULL DEFAULT '{"UZ":"","RU":"","EN":""}',
  category TEXT NOT NULL DEFAULT '',
  description JSONB NOT NULL DEFAULT '{"UZ":"","RU":"","EN":""}',
  image_url TEXT DEFAULT '',
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery photos
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  caption JSONB NOT NULL DEFAULT '{"UZ":"","RU":"","EN":""}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Events (informational only, no registration)
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title JSONB NOT NULL DEFAULT '{"UZ":"","RU":"","EN":""}',
  category TEXT NOT NULL DEFAULT '',
  description JSONB NOT NULL DEFAULT '{"UZ":"","RU":"","EN":""}',
  location JSONB NOT NULL DEFAULT '{"UZ":"","RU":"","EN":""}',
  event_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Site-wide settings (single row)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_name JSONB NOT NULL DEFAULT '{"UZ":"","RU":"","EN":""}',
  logo_url TEXT DEFAULT '',
  hero_title JSONB NOT NULL DEFAULT '{"UZ":"","RU":"","EN":""}',
  hero_subtitle JSONB NOT NULL DEFAULT '{"UZ":"","RU":"","EN":""}',
  contact_phone TEXT DEFAULT '',
  contact_email TEXT DEFAULT '',
  address JSONB NOT NULL DEFAULT '{"UZ":"","RU":"","EN":""}',
  google_maps_url TEXT DEFAULT '',
  facebook TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  telegram TEXT DEFAULT '',
  youtube TEXT DEFAULT '',
  footer_text JSONB NOT NULL DEFAULT '{"UZ":"","RU":"","EN":""}',
  primary_color TEXT DEFAULT '#1a3a6b',
  secondary_color TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMPTZ DEFAULT now()
);


-- ===================
-- 2. ROW LEVEL SECURITY
-- ===================

-- Enable RLS on all tables
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- NEWS policies
-- Anyone can read news articles
CREATE POLICY "Public can read news" ON news
  FOR SELECT USING (true);
-- Only authenticated admin can insert news
CREATE POLICY "Admin can insert news" ON news
  FOR INSERT TO authenticated WITH CHECK (true);
-- Only authenticated admin can update news
CREATE POLICY "Admin can update news" ON news
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
-- Only authenticated admin can delete news
CREATE POLICY "Admin can delete news" ON news
  FOR DELETE TO authenticated USING (true);

-- GALLERY policies
-- Anyone can view gallery images
CREATE POLICY "Public can read gallery" ON gallery
  FOR SELECT USING (true);
-- Only authenticated admin can insert gallery items
CREATE POLICY "Admin can insert gallery" ON gallery
  FOR INSERT TO authenticated WITH CHECK (true);
-- Only authenticated admin can update gallery items
CREATE POLICY "Admin can update gallery" ON gallery
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
-- Only authenticated admin can delete gallery items
CREATE POLICY "Admin can delete gallery" ON gallery
  FOR DELETE TO authenticated USING (true);

-- EVENTS policies
-- Anyone can read events
CREATE POLICY "Public can read events" ON events
  FOR SELECT USING (true);
-- Only authenticated admin can insert events
CREATE POLICY "Admin can insert events" ON events
  FOR INSERT TO authenticated WITH CHECK (true);
-- Only authenticated admin can update events
CREATE POLICY "Admin can update events" ON events
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
-- Only authenticated admin can delete events
CREATE POLICY "Admin can delete events" ON events
  FOR DELETE TO authenticated USING (true);

-- SITE_SETTINGS policies
-- Anyone can read site settings (needed for public website)
CREATE POLICY "Public can read site_settings" ON site_settings
  FOR SELECT USING (true);
-- Only authenticated admin can insert site settings
CREATE POLICY "Admin can insert site_settings" ON site_settings
  FOR INSERT TO authenticated WITH CHECK (true);
-- Only authenticated admin can update site settings
CREATE POLICY "Admin can update site_settings" ON site_settings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
-- Only authenticated admin can delete site settings
CREATE POLICY "Admin can delete site_settings" ON site_settings
  FOR DELETE TO authenticated USING (true);


-- ===================
-- 3. STORAGE BUCKET
-- ===================

-- Create a public storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can view/download files from the media bucket
CREATE POLICY "Public can read media" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

-- Only authenticated admin can upload files to the media bucket
CREATE POLICY "Admin can upload media" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');

-- Only authenticated admin can update files in the media bucket
CREATE POLICY "Admin can update media" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'media');

-- Only authenticated admin can delete files from the media bucket
CREATE POLICY "Admin can delete media" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'media');


-- ===================
-- 4. SEED DATA
-- ===================

-- Insert default site settings row
INSERT INTO site_settings (
  organization_name,
  logo_url,
  hero_title,
  hero_subtitle,
  contact_phone,
  contact_email,
  address,
  google_maps_url,
  facebook,
  instagram,
  telegram,
  youtube,
  footer_text,
  primary_color,
  secondary_color
) VALUES (
  '{"UZ":"Kelajak markazi","RU":"Центр будущего","EN":"Kelajak Markazi"}',
  '',
  '{"UZ":"Jizzax viloyati","RU":"Джизакская область","EN":"Jizzax Region"}',
  '{"UZ":"Jizzax viloyati","RU":"Джизакская область","EN":"Jizzax Region"}',
  '+998 73 000 00 00',
  'info@kelajak.uz',
  '{"UZ":"Kelajak ko''chasi, 1-uy,\nJizzax shahri, Jizzax viloyati,\nO''zbekiston","RU":"ул. Келажак, д. 1,\nгород Джизак, Джизакская область,\nУзбекистан","EN":"1 Kelajak Str.,\nJizzax City, Jizzax Region,\nUzbekistan"}',
  '',
  'https://www.facebook.com/share/17fNoGyhqt/',
  'https://www.instagram.com/jizzaxviloyatkelajakmarkazi/?__pwa=1',
  'https://t.me/jzzaxviloyatKelajakmarkazi',
  'https://www.youtube.com/channel/UCMzrtkWCZAjROw4xEry9heg',
  '{"UZ":"Barcha huquqlar himoyalangan.","RU":"Все права защищены.","EN":"All rights reserved."}',
  '#1a3a6b',
  '#3b82f6'
);
