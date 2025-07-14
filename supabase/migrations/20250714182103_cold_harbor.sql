/*
  # Create blog tables for cross-device post sharing

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `author` (text)
      - `title` (text)
      - `content` (text)
      - `mood` (text, optional)
      - `tags` (text array)
      - `likes` (integer, default 0)
      - `liked_by` (text array, default empty)
      - `created_at` (timestamp)
    - `blog_comments`
      - `id` (uuid, primary key)
      - `post_id` (uuid, foreign key)
      - `author` (text)
      - `content` (text)
      - `likes` (integer, default 0)
      - `liked_by` (text array, default empty)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to create posts/comments
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author text NOT NULL DEFAULT 'Anonymous',
  title text NOT NULL,
  content text NOT NULL,
  mood text,
  tags text[] DEFAULT '{}',
  likes integer DEFAULT 0,
  liked_by text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create blog_comments table
CREATE TABLE IF NOT EXISTS blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  author text NOT NULL DEFAULT 'Anonymous',
  content text NOT NULL,
  likes integer DEFAULT 0,
  liked_by text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required)
CREATE POLICY "Anyone can read blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create blog posts"
  ON blog_posts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update blog posts"
  ON blog_posts
  FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read blog comments"
  ON blog_comments
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create blog comments"
  ON blog_comments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update blog comments"
  ON blog_comments
  FOR UPDATE
  TO anon, authenticated
  USING (true);