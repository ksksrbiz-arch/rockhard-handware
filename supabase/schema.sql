-- ─────────────────────────────────────────
-- Headless Commerce Schema
-- Run once in your Supabase SQL editor.
-- ─────────────────────────────────────────

create extension if not exists "uuid-ossp";

-- Products
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  category text,
  image_url text,
  images jsonb default '[]'::jsonb,
  status text default 'active' check (status in ('active','draft','archived')),
  inventory int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists products_status_idx on public.products(status);
create index if not exists products_category_idx on public.products(category);

-- Variants (size, color, etc.)
create table if not exists public.product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  name text not null,
  sku text unique,
  price numeric(10,2),
  inventory int default 0,
  attributes jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Collections
create table if not exists public.collections (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists public.collection_products (
  collection_id uuid references public.collections(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  position int default 0,
  primary key (collection_id, product_id)
);

-- Customers
create table if not exists public.customers (
  id uuid primary key default uuid_generate_v4(),
  email text unique,
  name text,
  stripe_customer_id text unique,
  created_at timestamptz default now()
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  stripe_session_id text unique,
  customer_id uuid references public.customers(id),
  customer_email text,
  customer_name text,
  amount_total int not null,
  currency text default 'usd',
  status text default 'pending',
  items jsonb default '[]'::jsonb,
  shipping_address jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
create index if not exists orders_email_idx on public.orders(customer_email);
create index if not exists orders_status_idx on public.orders(status);

-- ─────── Row Level Security ───────
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.collections enable row level security;
alter table public.collection_products enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;

-- Public read for catalog
create policy "Public read products" on public.products for select using (status = 'active');
create policy "Public read variants" on public.product_variants for select using (true);
create policy "Public read collections" on public.collections for select using (true);
create policy "Public read collection_products" on public.collection_products for select using (true);

-- Service role has full access (used by webhook to insert orders)
-- All write paths must go through API routes using SUPABASE_SERVICE_ROLE_KEY.

-- Customers can read their own data
create policy "Users read own customer record" on public.customers
  for select using (auth.email() = email);
create policy "Users read own orders" on public.orders
  for select using (auth.email() = customer_email);
