-- 001_init: products, variants, collections, orders, reviews, customers
-- Netlify DB applies this automatically on deploy and on `netlify dev`.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Products ───
CREATE TABLE IF NOT EXISTS products (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  tagline         TEXT,
  description     TEXT,
  price           NUMERIC(10,2) NOT NULL,
  compare_at_price NUMERIC(10,2),
  category        TEXT,
  image_url       TEXT,
  images          JSONB DEFAULT '[]'::jsonb,
  status          TEXT DEFAULT 'active' CHECK (status IN ('active','draft','archived')),
  inventory       INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS products_status_idx   ON products(status);
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);

-- ─── Variants (size/color/SKU) ───
CREATE TABLE IF NOT EXISTS product_variants (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  name        TEXT NOT NULL,
  sku         TEXT UNIQUE,
  price       NUMERIC(10,2),
  inventory   INTEGER DEFAULT 0,
  attributes  JSONB DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS variants_product_idx ON product_variants(product_id);

-- ─── Collections ───
CREATE TABLE IF NOT EXISTS collections (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  image_url   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS collection_products (
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES products(id) ON DELETE CASCADE,
  position      INTEGER DEFAULT 0,
  PRIMARY KEY (collection_id, product_id)
);

-- ─── Customers (synced from Stripe) ───
CREATE TABLE IF NOT EXISTS customers (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email               TEXT UNIQUE,
  name                TEXT,
  stripe_customer_id  TEXT UNIQUE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Orders ───
CREATE TABLE IF NOT EXISTS orders (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_session_id   TEXT UNIQUE,
  customer_id         UUID REFERENCES customers(id),
  customer_email      TEXT,
  customer_name       TEXT,
  amount_total        INTEGER NOT NULL,
  currency            TEXT DEFAULT 'usd',
  status              TEXT DEFAULT 'pending',
  items               JSONB DEFAULT '[]'::jsonb,
  shipping_address    JSONB,
  metadata            JSONB DEFAULT '{}'::jsonb,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS orders_email_idx  ON orders(customer_email);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);

-- ─── Reviews (verified by email match against paid orders) ───
CREATE TABLE IF NOT EXISTS reviews (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id         UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  reviewer_email     TEXT NOT NULL,
  reviewer_name      TEXT,
  rating             INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title              TEXT NOT NULL,
  body               TEXT NOT NULL,
  verified_purchase  BOOLEAN DEFAULT FALSE,
  status             TEXT DEFAULT 'published' CHECK (status IN ('published','hidden','flagged')),
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (product_id, reviewer_email)
);
CREATE INDEX IF NOT EXISTS reviews_product_idx ON reviews(product_id);
