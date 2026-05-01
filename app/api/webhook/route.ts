import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { sql } from '@/lib/db';
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
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100, expand: ['data.price.product'] });
    const email = session.customer_details?.email ?? null;
    const userId = (session.metadata as any)?.user_id ?? null;

    if (email) {
      try {
        await sql`
          insert into customers (email, name, stripe_customer_id)
          values (${email}, ${session.customer_details?.name ?? null}, ${typeof session.customer === 'string' ? session.customer : null})
          on conflict (email) do update set
            name = excluded.name,
            stripe_customer_id = excluded.stripe_customer_id
        `;
      } catch (e) { console.error('customer upsert', e); }
    }

    const items = lineItems.data.map((li) => {
      const product = (li.price as any)?.product;
      const meta = typeof product === 'object' ? (product?.metadata ?? {}) : {};
      return { name: li.description, quantity: li.quantity, amount: li.amount_total, slug: meta.slug, variant_id: meta.variant_id };
    });

    try {
      await sql`
        insert into orders
          (stripe_session_id, user_id, customer_email, customer_name,
           amount_total, currency, status, items, shipping_address, metadata)
        values
          (${session.id}, ${userId},
           ${email}, ${session.customer_details?.name ?? null},
           ${session.amount_total ?? 0}, ${session.currency ?? 'usd'}, 'paid',
           ${JSON.stringify(items)}::jsonb,
           ${session.shipping_details?.address ? JSON.stringify(session.shipping_details.address) : null}::jsonb,
           ${JSON.stringify(session.metadata ?? {})}::jsonb)
        on conflict (stripe_session_id) do nothing
      `;
    } catch (e) { console.error('order insert', e); }

    for (const it of items) {
      if (!it.slug) continue;
      try {
        if (it.variant_id) {
          await sql`update product_variants set inventory = greatest(0, inventory - ${it.quantity ?? 1}) where id = ${it.variant_id}`;
        } else {
          await sql`update products set inventory = greatest(0, inventory - ${it.quantity ?? 1}) where slug = ${it.slug}`;
        }
      } catch (e) { console.error('inventory', e); }
    }
  }

  return NextResponse.json({ received: true });
}
