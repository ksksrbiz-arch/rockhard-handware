import { getDb } from './db';
import type { Product } from './types';

const STATIC_PRODUCTS: Product[] = [
  {
    "id": "ironclad-tactical-gloves",
    "slug": "ironclad-tactical-gloves",
    "name": "Ironclad Tactical Gloves",
    "tagline": "Cut-resistant. Knuckle-armored. Bombproof.",
    "price": 48,
    "category": "Tactical",
    "status": "active",
    "inventory": 100,
    "compare_at_price": 58
  },
  {
    "id": "framer-pro-work-glove",
    "slug": "framer-pro-work-glove",
    "name": "Framer Pro Work Glove",
    "tagline": "Padded palm. Reinforced fingertips.",
    "price": 38,
    "category": "Work Gloves",
    "status": "active",
    "inventory": 100
  },
  {
    "id": "anvil-leather-glove",
    "slug": "anvil-leather-glove",
    "name": "Anvil Leather Glove",
    "tagline": "Cowhide everything. Built to outlast.",
    "price": 42,
    "category": "Work Gloves",
    "status": "active",
    "inventory": 100
  },
  {
    "id": "ranger-impact-glove",
    "slug": "ranger-impact-glove",
    "name": "Ranger Impact Glove",
    "tagline": "TPR knuckles. Touch-screen tips.",
    "price": 44,
    "category": "Tactical",
    "status": "active",
    "inventory": 100
  },
  {
    "id": "demolition-grip-glove",
    "slug": "demolition-grip-glove",
    "name": "Demolition Grip Glove",
    "tagline": "Goatskin palm. Vibration dampening.",
    "price": 46,
    "category": "Work Gloves",
    "status": "active",
    "inventory": 100
  },
  {
    "id": "cold-storm-glove",
    "slug": "cold-storm-glove",
    "name": "Cold Storm Glove",
    "tagline": "Insulated. Waterproof. Sub-zero ready.",
    "price": 52,
    "category": "Work Gloves",
    "status": "active",
    "inventory": 100
  },
  {
    "id": "site-foreman-cap",
    "slug": "site-foreman-cap",
    "name": "Site Foreman Cap",
    "tagline": "Hi-vis trim. Sweat-wicking band.",
    "price": 26,
    "category": "Accessories",
    "status": "active",
    "inventory": 100
  },
  {
    "id": "trade-day-tee",
    "slug": "trade-day-tee",
    "name": "Trade Day Tee",
    "tagline": "Heavyweight cotton. Built for Mondays.",
    "price": 32,
    "category": "Accessories",
    "status": "active",
    "inventory": 100
  }
];

export async function getProducts(opts?: { limit?: number; category?: string }): Promise<Product[]> {
  const db = getDb();
  if (db) {
    try {
      const rows = opts?.category
        ? await db.sql`SELECT * FROM products WHERE status='active' AND category=${opts.category} ORDER BY created_at DESC ${opts.limit ? db.sql`LIMIT ${opts.limit}` : db.sql``}`
        : opts?.limit
        ? await db.sql`SELECT * FROM products WHERE status='active' ORDER BY created_at DESC LIMIT ${opts.limit}`
        : await db.sql`SELECT * FROM products WHERE status='active' ORDER BY created_at DESC`;
      if (rows.length > 0) return rows.map(normalize);
    } catch { /* fall through */ }
  }
  let list = STATIC_PRODUCTS;
  if (opts?.category) list = list.filter((p) => p.category === opts.category);
  if (opts?.limit) list = list.slice(0, opts.limit);
  return list;
}

export async function getProduct(slug: string): Promise<Product | null> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db.sql`SELECT * FROM products WHERE slug=${slug}`;
      if (rows.length > 0) return normalize(rows[0]);
    } catch { /* fall through */ }
  }
  return STATIC_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

function normalize(row: any): Product {
  return {
    ...row,
    price: Number(row.price),
    compare_at_price: row.compare_at_price != null ? Number(row.compare_at_price) : undefined,
  };
}
