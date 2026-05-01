export interface Product {
  id?: string;
  slug: string;
  name: string;
  tagline: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  inventory?: number;
  status?: 'active' | 'draft' | 'archived';
}

export interface Variant {
  id: string;
  product_id: string;
  name: string;
  sku?: string;
  price?: number;
  inventory?: number;
  attributes?: { size?: string; color?: string; [k: string]: any };
}

export interface Review {
  id: string;
  product_id: string;
  reviewer_name: string;
  rating: number;
  title: string;
  body: string;
  verified_purchase: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  stripe_session_id: string;
  customer_email: string | null;
  amount_total: number;
  status: string;
  items: any[];
  created_at: string;
}
