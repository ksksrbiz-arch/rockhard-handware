import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

  const body = await req.text();
  const stripe = getStripe();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (e: any) {
    return NextResponse.json({ error: `Webhook signature failed: ${e.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const supabase = createServiceClient();
    if (supabase) {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
      await supabase.from('orders').insert({
        stripe_session_id: session.id,
        customer_email: session.customer_details?.email ?? null,
        customer_name: session.customer_details?.name ?? null,
        amount_total: session.amount_total ?? 0,
        currency: session.currency ?? 'usd',
        status: 'paid',
        items: lineItems.data.map((li) => ({
          name: li.description,
          quantity: li.quantity,
          amount: li.amount_total,
        })),
        shipping_address: session.shipping_details?.address ?? null,
      });
    }
  }

  return NextResponse.json({ received: true });
}
