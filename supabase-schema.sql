-- ========================================================
-- Supabase Schema for El Hana Group (www.elahanasafari.com)
-- ========================================================

-- 1. Trips Table
create table if not exists public.trips (
  id text primary key,
  slug text unique not null,
  title text not null,
  title_ar text,
  category text not null,
  category_label text,
  short_description text,
  description text,
  images jsonb default '[]'::jsonb,
  duration text,
  location text,
  pickup_available boolean default true,
  pickup_time text default '08:00 AM (Hotel Pickup)',
  cancellation_policy text default 'Free cancellation up to 24 hours before pickup.',
  rating numeric(3, 2) default 4.9,
  reviews_count integer default 150,
  starting_price numeric(10, 2) not null,
  currency text default 'USD',
  is_featured boolean default false,
  is_popular boolean default false,
  suitable_for jsonb default '[]'::jsonb,
  available_times jsonb default '[]'::jsonb,
  highlights jsonb default '[]'::jsonb,
  included jsonb default '[]'::jsonb,
  excluded jsonb default '[]'::jsonb,
  translations jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for fast lookup by slug and category
create index if not exists idx_trips_slug on public.trips(slug);
create index if not exists idx_trips_category on public.trips(category);

-- Enable Row Level Security (RLS)
alter table public.trips enable row level security;

-- Policy 1: Anyone can read trips (public access)
create policy "Public trips are viewable by everyone"
  on public.trips for select
  using (true);

-- Policy 2: Only service_role (backend/admin API) can insert/update/delete
create policy "Service role can insert trips"
  on public.trips for insert
  with check (auth.role() = 'service_role' or auth.role() = 'authenticated');

create policy "Service role can update trips"
  on public.trips for update
  using (auth.role() = 'service_role' or auth.role() = 'authenticated');

create policy "Service role can delete trips"
  on public.trips for delete
  using (auth.role() = 'service_role' or auth.role() = 'authenticated');

-- 2. Storage Bucket for Trip Images
insert into storage.buckets (id, name, public)
values ('trip-images', 'trip-images', true)
on conflict (id) do nothing;

-- Public can view images in trip-images bucket
create policy "Trip images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'trip-images');

-- Authenticated / Service Role can upload to trip-images bucket
create policy "Service role can upload trip images"
  on storage.objects for insert
  with check (bucket_id = 'trip-images');
