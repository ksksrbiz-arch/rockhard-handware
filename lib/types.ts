export interface Product {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  category: string;
  image_url?: string;
  status?: 'active' | 'draft' | 'archived';
}

export interface Order {
  id: string;
  stripe_session_id: string;
  customer_email: string | null;
  amount_total: number;
  status: string;
  created_at: string;
}
