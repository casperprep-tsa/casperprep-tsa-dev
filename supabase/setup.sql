-- ═══════════════════════════════════════════════════════════════
-- CASPer Prep by TSA — Database Setup
-- Run this in Supabase Dashboard > SQL Editor > New Query
-- ═══════════════════════════════════════════════════════════════

-- 1. Profiles table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  has_access boolean default false,
  access_granted_at timestamptz,
  access_expires_at timestamptz,
  stripe_customer_id text,
  stripe_payment_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Enable Row Level Security
alter table public.profiles enable row level security;

-- 3. RLS Policies — users can only read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 4. Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email
  );
  return new;
end;
$$;

-- Create trigger (drop first if re-running)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. Auto-update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_profile_updated on public.profiles;
create trigger on_profile_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- 6. Course progress table (for Phase 4)
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

create policy "Users can view own progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════
-- Done! Your database is ready.
-- ═══════════════════════════════════════════════════════════════
