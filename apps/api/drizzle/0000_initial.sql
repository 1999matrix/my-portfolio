-- Initial portfolio schema for Supabase Postgres

DO $$ BEGIN
  CREATE TYPE "publish_status" AS ENUM('draft', 'published', 'scheduled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "profiles" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "headline" text NOT NULL,
  "summary" text NOT NULL,
  "location" text,
  "email" text NOT NULL,
  "phone" text,
  "linkedin_url" text,
  "github_url" text,
  "updated_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "experience" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "company" text NOT NULL,
  "role" text NOT NULL,
  "location" text,
  "start_date" text NOT NULL,
  "end_date" text,
  "bullets" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "status" "publish_status" DEFAULT 'published' NOT NULL
);

CREATE TABLE IF NOT EXISTS "projects" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" text NOT NULL,
  "title" text NOT NULL,
  "summary" text NOT NULL,
  "body" text,
  "tech_stack" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "repo_url" text,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "status" "publish_status" DEFAULT 'published' NOT NULL,
  "seo_title" text,
  "seo_description" text,
  "published_at" timestamp with time zone,
  CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);

CREATE TABLE IF NOT EXISTS "achievements" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "title" text NOT NULL,
  "body" text NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "status" "publish_status" DEFAULT 'published' NOT NULL
);

CREATE TABLE IF NOT EXISTS "skill_groups" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "group" text NOT NULL,
  "skills" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "proof_metrics" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "label" text NOT NULL,
  "value" text NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL
);
