create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text not null,
  display_name text not null,
  avatar_url text,
  bio text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint profiles_handle_format check (handle ~ '^[a-z0-9_]{3,30}$'),
  constraint profiles_display_name_not_blank check (length(btrim(display_name)) between 1 and 80),
  constraint profiles_bio_length check (bio is null or length(bio) <= 280)
);
create unique index profiles_handle_lower_key on public.profiles (lower(handle));

create table public.projects (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.profiles(id) on delete cascade,
  slug text not null, name text not null, description text, category text not null, technology text, status text not null default 'in-progress',
  accent_color text, avatar_url text, cover_url text,
  created_at timestamptz not null default timezone('utc', now()), updated_at timestamptz not null default timezone('utc', now()),
  constraint projects_name_not_blank check (length(btrim(name)) between 1 and 120),
  constraint projects_category_not_blank check (length(btrim(category)) between 1 and 80),
  constraint projects_description_length check (description is null or length(description) <= 2000),
  constraint projects_status_check check (status in ('in-progress', 'on-hold', 'completed'))
);
create unique index projects_owner_slug_key on public.projects(owner_id, slug);
create index projects_owner_updated_idx on public.projects(owner_id, updated_at desc);
create index projects_updated_idx on public.projects(updated_at desc);

create table public.posts (
  id uuid primary key default gen_random_uuid(), author_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null, type text not null, title text, body text not null,
  tags text[] not null default '{}', ai_assisted boolean not null default false, media_url text, media_metadata jsonb,
  created_at timestamptz not null default timezone('utc', now()), updated_at timestamptz not null default timezone('utc', now()),
  constraint posts_type_check check (type in ('update', 'question', 'resource', 'milestone')),
  constraint posts_body_not_blank check (length(btrim(body)) > 0 or (title is not null and length(btrim(title)) > 0)),
  constraint posts_title_length check (title is null or length(title) <= 160), constraint posts_body_length check (length(body) <= 10000)
);
create index posts_created_idx on public.posts(created_at desc);
create index posts_project_created_idx on public.posts(project_id, created_at desc);
create index posts_author_created_idx on public.posts(author_id, created_at desc);

create or replace function public.set_updated_at() returns trigger language plpgsql security invoker set search_path = public as $$ begin new.updated_at = timezone('utc', now()); return new; end; $$;
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger projects_set_updated_at before update on public.projects for each row execute function public.set_updated_at();
create trigger posts_set_updated_at before update on public.posts for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.posts enable row level security;

create policy "Public profiles are readable" on public.profiles for select to anon, authenticated using (true);
create policy "Users can create their own profile" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy "Users can update their own profile" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "Public projects are readable" on public.projects for select to anon, authenticated using (true);
create policy "Users can create their own projects" on public.projects for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "Users can update their own projects" on public.projects for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy "Users can delete their own projects" on public.projects for delete to authenticated using ((select auth.uid()) = owner_id);
create policy "Public posts are readable" on public.posts for select to anon, authenticated using (true);
create policy "Users can create their own posts" on public.posts for insert to authenticated with check ((select auth.uid()) = author_id and (project_id is null or exists (select 1 from public.projects p where p.id = project_id and p.owner_id = (select auth.uid()))));
create policy "Users can update their own posts" on public.posts for update to authenticated using ((select auth.uid()) = author_id) with check ((select auth.uid()) = author_id and (project_id is null or exists (select 1 from public.projects p where p.id = project_id and p.owner_id = (select auth.uid()))));
create policy "Users can delete their own posts" on public.posts for delete to authenticated using ((select auth.uid()) = author_id);

grant select on public.profiles, public.projects, public.posts to anon, authenticated;
grant insert, update on public.profiles to authenticated;
grant insert, update, delete on public.projects, public.posts to authenticated;
