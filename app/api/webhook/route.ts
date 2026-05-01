import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getDb } from '@/lib/db';
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
    const db = getDb();
    if (!db) return NextResponse.json({ received: true, warning: 'DB not configured' });

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
      expand: ['data.price.product'],
    });
    const email = session.customer_details?.email ?? null;
    const name = session.customer_details?.name ?? null;
    const stripeCustomerId = typeof session.customer === 'string' ? session.customer : null;

    // Upsert customer
    let customerId: string | null = null;
    if (email) {
      const [c] = await db.sql`
        INSERT INTO customers (email, name, stripe_customer_id)
        VALUES (${email}, ${name}, ${stripeCustomerId})
        ON CONFLICT (email) DO UPDATE SET
          name = EXCLUDED.name,
          stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, customers.stripe_customer_id)
        RETURNING id
      `;
      customerId = c?.id ?? null;
    }

    // Build items array
    const items = lineItems.data.map((li) => {
      const product = (li.price as any)?.product;
      const meta = typeof product === 'object' ? (product?.metadata ?? {}) : {};
      return {
        name: li.description,
        quantity: li.quantity,
        amount: li.amount_total,
        slug: meta.slug,
        variant_id: meta.variant_id,
      };
    });

    // Insert order
    await db.sql`
      INSERT INTO orders
        (stripe_session_id, customer_id, customer_email, customer_name, amount_total, currency, status, items, shipping_address, metadata)
      VALUES
        (${session.id}, ${customerId}, ${email}, ${name}, ${session.amount_total ?? 0}, ${session.currency ?? 'usd'},
         'paid', ${JSON.stringify(items)}::jsonb, ${session.shipping_details?.address ? JSON.stringify(session.shipping_details.address) : null}::jsonb,
         ${JSON.stringify(session.metadata ?? {})}::jsonb)
      ON CONFLICT (stripe_session_id) DO NOTHING
    `;

    // Decrement inventory
    for (const it of items) {
      if (!it.slug) continue;
      const qty = it.quantity ?? 1;
      if (it.variant_id) {
        await db.sql`
          UPDATE product_variants SET inventory = GREATEST(0, inventory - ${qty}) WHERE id = ${it.variant_id}
        `;
      } else {
        await db.sql`
          UPDATE products SET inventory = GREATEST(0, inventory - ${qty}) WHERE slug = ${it.slug}
        `;
      }
    }
  }

  return NextResponse.json({ received: true });
}
