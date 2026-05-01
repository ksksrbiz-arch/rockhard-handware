import { createBrowserClient } from './supabase';
import type { Product } from './types';

const STATIC_PRODUCTS: Product[] = [
  {
    "slug": "heavy-duty-glove",
    "name": "HEAVY DUTY",
    "tagline": "Built for the toughest jobs.",
    "price": 48,
    "category": "Heavy Duty",
    "status": "active"
  },
  {
    "slug": "cut-resistant-glove",
    "name": "CUT RESISTANT",
    "tagline": "Protection when it matters.",
    "price": 52,
    "category": "Cut Resistant",
    "status": "active"
  },
  {
    "slug": "cold-weather-glove",
    "name": "COLD WEATHER",
    "tagline": "Stay warm. Keep working.",
    "price": 58,
    "category": "Cold Weather",
    "status": "active"
  },
  {
    "slug": "mechanic-glove",
    "name": "MECHANIC",
    "tagline": "Precision and performance.",
    "price": 42,
    "category": "Mechanic",
    "status": "active"
  },
  {
    "slug": "framer-glove",
    "name": "FRAMER PRO",
    "tagline": "Built for the job site.",
    "price": 46,
    "category": "Heavy Duty",
    "status": "active"
  },
  {
    "slug": "welder-glove",
    "name": "WELDER GAUNTLET",
    "tagline": "Heat-rated. Sparks-ready.",
    "price": 68,
    "category": "Heavy Duty",
    "status": "active"
  },
  {
    "slug": "winter-lined-glove",
    "name": "ARCTIC LINED",
    "tagline": "Sub-zero rated.",
    "price": 64,
    "category": "Cold Weather",
    "status": "active"
  },
  {
    "slug": "impact-glove",
    "name": "IMPACT PRO",
    "tagline": "Knuckle armor. Full grip.",
    "price": 54,
    "category": "Mechanic",
    "status": "active"
  }
];

export async function getProducts(opts?: { limit?: number; category?: string }): Promise<Product[]> {
  const supabase = createBrowserClient();
  if (supabase) {
    let q = supabase.from('products').select('*').eq('status', 'active');
    if (opts?.category) q = q.eq('category', opts.category);
    if (opts?.limit) q = q.limit(opts.limit);
    const { data, error } = await q;
    if (!error && data?.length) return data as Product[];
  }
  // Fallback to static seed data when Supabase isn't configured yet
  let list = STATIC_PRODUCTS;
  if (opts?.category) list = list.filter((p) => p.category === opts.category);
  if (opts?.limit) list = list.slice(0, opts.limit);
  return list;
}

export async function getProduct(slug: string): Promise<Product | null> {
  const supabase = createBrowserClient();
  if (supabase) {
    const { data } = await supabase.from('products').select('*').eq('slug', slug).single();
    if (data) return data as Product;
  }
  return STATIC_PRODUCTS.find((p) => p.slug === slug) ?? null;
}
