# Rockhard Handware

> Built for Glory.

Headless commerce storefront. Next.js 14 (App Router) + Supabase + Stripe + Netlify. Zero Shopify or GoDaddy dependency.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router, RSC, TypeScript) |
| Styling | Tailwind CSS, brand tokens in `tailwind.config.ts` |
| Catalog / Orders / Customers | Supabase (Postgres + RLS) |
| Payments | Stripe Checkout (hosted, PCI-offloaded) |
| State | Zustand (cart, localStorage-persisted) |
| Hosting | Netlify with `@netlify/plugin-nextjs` |
| Email | MailerLite (optional) |

## Local setup

```bash
# 1. Clone + install
git clone https://github.com/ksksrbiz-arch/rockhard-handware.git
cd rockhard-handware
npm install

# 2. Env vars
cp .env.example .env.local
# Fill in Supabase + Stripe keys

# 3. Database (one-time)
# In Supabase SQL editor, run:
#   supabase/schema.sql      (creates tables + RLS)
#   supabase/seed.sql        (loads starter products)

# 4. Run
npm run dev   # http://localhost:3000
```

## Deploy to Netlify

```bash
# Option A: CLI
netlify init
netlify deploy --build --prod

# Option B: UI
# 1. Push to GitHub (already wired)
# 2. New site from Git → select this repo
# 3. Build cmd: npm run build / Publish: .next
# 4. Add env vars from .env.example
# 5. Deploy
```

The `netlify.toml` already configures the Next.js plugin, security headers, and CDN cache for `_next/static/*`.

## Stripe webhook

After first deploy, register the webhook endpoint in Stripe Dashboard:

```
https://YOUR_DOMAIN.netlify.app/api/webhook
```

Subscribe to: `checkout.session.completed`. Copy the signing secret into `STRIPE_WEBHOOK_SECRET` on Netlify.

## Project structure

```
app/
  layout.tsx              Root layout (fonts, metadata)
  page.tsx                Homepage (hero + features + grid + story)
  shop/
    page.tsx              Catalog (all products + filter by category)
    [slug]/page.tsx       Product detail + add-to-cart
  cart/page.tsx           Cart page
  checkout/
    success/page.tsx      Post-Stripe success
  api/
    checkout/route.ts     Creates Stripe Checkout Session
    webhook/route.ts      Handles Stripe events → writes orders to Supabase
components/
  Header.tsx              Logo + nav + cart icon
  Footer.tsx              Footer w/ newsletter
  AnnouncementBar.tsx     Top bar
  Hero.tsx                Homepage hero
  ProductCard.tsx         Card for grid
  ProductGrid.tsx         Responsive grid
  CartDrawer.tsx          Slide-out cart
  FeatureGrid.tsx         4-up benefits grid
  Story.tsx               Brand story section
lib/
  supabase.ts             Browser + server clients
  stripe.ts               Stripe SDK init
  cart-store.ts           Zustand store
  types.ts                Domain types
  data.ts                 Static fallback for dev
supabase/
  schema.sql              Tables + RLS policies
  seed.sql                Starter products
```

## Brand tokens

Edit `tailwind.config.ts` to change the entire brand palette in one file. Display + body fonts swap in `app/layout.tsx`.

## What's done vs. what's next

**Done (this scaffold):**
- Production-ready Next.js 14 setup
- Homepage matching mockup
- Catalog + product detail + cart + checkout flow
- Stripe Checkout integration (server route + webhook handler)
- Supabase schema (products, variants, collections, orders, customers) with RLS
- Netlify config with security headers + CDN caching
- TypeScript strict mode

**Next (fill these in):**
- Real product photos → Supabase Storage or Cloudinary
- Account pages (login/orders) — Supabase Auth scaffolding ready
- Inventory tracking on variant level
- Tax + shipping rates (Stripe Tax recommended)
- Reviews module (real reviews only — FTC compliance)
- Sitemap + robots.txt + JSON-LD product schema
- MailerLite signup → newsletter automation

Built by 1Commerce LLC for D & V Enterprises.
