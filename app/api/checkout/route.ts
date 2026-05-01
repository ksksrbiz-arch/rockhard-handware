import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export const runtime = 'nodejs';

interface CartItem { slug: string; name: string; price: number; qty: number; image_url?: string }

export async function POST(req: NextRequest) {
  try {
    const { items } = (await req.json()) as { items: CartItem[] };
    if (!items?.length) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });

    const stripe = getStripe();
    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: items.map((it) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: it.name,
            images: it.image_url ? [it.image_url] : [],
            metadata: { slug: it.slug },
          },
          unit_amount: Math.round(it.price * 100),
        },
        quantity: it.qty,
      })),
      shipping_address_collection: { allowed_countries: ['US', 'CA'] },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      automatic_tax: { enabled: false },
      metadata: { source: 'storefront' },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error('checkout error', e);
    return NextResponse.json({ error: e.message ?? 'Checkout error' }, { status: 500 });
  }
}
