import { sql, safeQuery, safeOne } from './db';
import type { Product } from './types';

const STATIC_PRODUCTS: Product[] = [
  {
    "id": "heavy-duty-glove",
    "slug": "heavy-duty-glove",
    "name": "HEAVY DUTY",
    "tagline": "Built for the toughest jobs.",
    "price": 48,
    "category": "Heavy Duty",
    "status": "active",
    "inventory": 100
  },
  {
    "id": "cut-resistant-glove",
    "slug": "cut-resistant-glove",
    "name": "CUT RESISTANT",
    "tagline": "Protection when it matters.",
    "price": 52,
    "category": "Cut Resistant",
    "status": "active",
    "inventory": 100
  },
  {
    "id": "cold-weather-glove",
    "slug": "cold-weather-glove",
    "name": "COLD WEATHER",
    "tagline": "Stay warm. Keep working.",
    "price": 58,
    "category": "Cold Weather",
    "status": "active",
    "inventory": 100
  },
  {
    "id": "mechanic-glove",
    "slug": "mechanic-glove",
    "name": "MECHANIC",
    "tagline": "Precision and performance.",
    "price": 42,
    "category": "Mechanic",
    "status": "active",
    "inventory": 100
  },
  {
    "id": "framer-glove",
    "slug": "framer-glove",
    "name": "FRAMER PRO",
    "tagline": "Built for the job site.",
    "price": 46,
    "category": "Heavy Duty",
    "status": "active",
    "inventory": 100
  },
  {
    "id": "welder-glove",
    "slug": "welder-glove",
    "name": "WELDER GAUNTLET",
    "tagline": "Heat-rated. Sparks-ready.",
    "price": 68,
    "category": "Heavy Duty",
    "status": "active",
    "inventory": 100
  },
  {
    "id": "winter-lined-glove",
    "slug": "winter-lined-glove",
    "name": "ARCTIC LINED",
    "tagline": "Sub-zero rated.",
    "price": 64,
    "category": "Cold Weather",
    "status": "active",
    "inventory": 100
  },
  {
    "id": "impact-glove",
    "slug": "impact-glove",
    "name": "IMPACT PRO",
    "tagline": "Knuckle armor. Full grip.",
    "price": 54,
    "category": "Mechanic",
    "status": "active",
    "inventory": 100
  }
];

export async function getProducts(opts?: { limit?: number; category?: string }): Promise<Product[]> {
  const limit = opts?.limit ?? 100;
  const dbResults = await safeQuery<Product>(async () => {
    if (opts?.category) {
      return await sql<Product>`
        select * from products
        where status = 'active' and category = ${opts.category}
        order by created_at desc limit ${limit}
      `;
    }
    return await sql<Product>`
      select * from products
      where status = 'active'
      order by created_at desc limit ${limit}
    `;
  });
  if (dbResults.length > 0) return dbResults;

  let list = STATIC_PRODUCTS;
  if (opts?.category) list = list.filter((p) => p.category === opts.category);
  if (opts?.limit) list = list.slice(0, opts.limit);
  return list;
}

export async function getProduct(slug: string): Promise<Product | null> {
  const row = await safeOne<Product>(() => sql<Product>`select * from products where slug = ${slug}`);
  if (row) return row;
  return STATIC_PRODUCTS.find((p) => p.slug === slug) ?? null;
}
