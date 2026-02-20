-- ═══════════════════════════════════════════════════════════════
-- Phase 4: Lesson Progress Table
-- Run this in Supabase Dashboard > SQL Editor if not already done
-- (Safe to run again — uses IF NOT EXISTS)
-- ═══════════════════════════════════════════════════════════════

create table if not exists public.lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  module_num integer not null,
  lesson_num integer not null,
  completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, module_num, lesson_num)
);

alter table public.lesson_progress enable row level security;

-- Safe: Policies use IF NOT EXISTS equivalent via DO blocks
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own progress' AND tablename = 'lesson_progress'
  ) THEN
    CREATE POLICY "Users can view own progress" ON public.lesson_progress FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own progress' AND tablename = 'lesson_progress'
  ) THEN
    CREATE POLICY "Users can insert own progress" ON public.lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own progress' AND tablename = 'lesson_progress'
  ) THEN
    CREATE POLICY "Users can update own progress" ON public.lesson_progress FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;
