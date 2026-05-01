create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password_hash text not null,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists users_email_idx on users (lower(email));

create table if not exists password_reset_tokens (
  token text primary key,
  user_id uuid not null references users(id) on delete cascade,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz default now()
);
create index if not exists prt_user_idx on password_reset_tokens (user_id);

create table if not exists products (
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
create index if not exists products_status_idx on products(status);
create index if not exists products_category_idx on products(category);

create table if not exists product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  name text not null,
  sku text unique,
  price numeric(10,2),
  inventory int default 0,
  attributes jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
create index if not exists variants_product_idx on product_variants(product_id);

create table if not exists collections (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists collection_products (
  collection_id uuid references collections(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  position int default 0,
  primary key (collection_id, product_id)
);

create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  email text unique,
  name text,
  stripe_customer_id text unique,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  stripe_session_id text unique,
  user_id uuid references users(id) on delete set null,
  customer_id uuid references customers(id),
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
create index if not exists orders_email_idx on orders(customer_email);
create index if not exists orders_user_idx on orders(user_id);
create index if not exists orders_status_idx on orders(status);
create index if not exists orders_items_gin on orders using gin (items);

create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  reviewer_id uuid references users(id) on delete set null,
  reviewer_name text,
  rating int not null check (rating between 1 and 5),
  title text not null,
  body text not null,
  verified_purchase boolean default false,
  status text default 'published' check (status in ('published','hidden','flagged')),
  created_at timestamptz default now(),
  unique (product_id, reviewer_id)
);
create index if not exists reviews_product_idx on reviews(product_id);
