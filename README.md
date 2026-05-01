# Rockhard Handware

> Built for Glory. Worn for Work.

Headless commerce storefront. Next.js 14 + Netlify DB + Stripe.
**One vendor for hosting and database. No Supabase. No Shopify. No GoDaddy.**

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router, RSC, TypeScript strict) |
| Styling | Tailwind CSS, brand tokens in `tailwind.config.ts` |
| Database | **Netlify DB** (Neon Postgres, auto-provisioned) via `@netlify/database` |
| Auth | JWT cookies (`jose`) — admin only, env-var credentials |
| Payments | Stripe Checkout (hosted, PCI-offloaded) |
| State | Zustand (cart, localStorage-persisted) |
| Hosting | Netlify with `@netlify/plugin-nextjs` |
| Email | MailerLite (optional newsletter) |

## What's in here

- **Storefront** — homepage, catalog, product detail (variants + reviews), cart, Stripe checkout
- **Order tracking** — `/orders` lets customers look up past orders by email + ID. No signup required.
- **Admin dashboard** — `/admin`, JWT-gated, lists products + orders, edit/create products, see revenue
- **Reviews** — verified-purchase only (FTC-compliant). Verified by matching reviewer email to a paid order
- **Variants** — size + color selectors with per-variant inventory
- **Webhooks** — Stripe → Netlify DB orders + customer upsert + inventory decrement
- **SEO** — sitemap, robots, JSON-LD product schema with aggregate ratings
- **Migrations** — auto-applied on deploy and `netlify dev`

## Local setup

```bash
git clone https://github.com/ksksrbiz-arch/rockhard-handware.git
cd rockhard-handware
npm install --legacy-peer-deps
cp .env.example .env.local
# Fill in Stripe keys, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD_HASH
netlify dev
```

`netlify dev` provisions a local Netlify DB branch automatically. Migrations run on first start.

## Generating the admin password hash

```bash
node -e "console.log(require('bcryptjs').hashSync('your-strong-password', 10))"
```

Paste the output into `ADMIN_PASSWORD_HASH` (in Netlify env vars for production, `.env.local` for dev).

## Generating the JWT secret

```bash
openssl rand -base64 32
```

## Deploy to Netlify

1. Push to GitHub (already wired)
2. Netlify → Add new site → Import existing project → pick this repo
3. Build settings auto-detected from `netlify.toml`
4. Install the **Netlify DB** extension (one click) — it auto-creates the database
5. Add env vars:
    - `STRIPE_SECRET_KEY`
    - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
    - `STRIPE_WEBHOOK_SECRET` (after step 7 below)
    - `NEXT_PUBLIC_SITE_URL`
    - `ADMIN_EMAIL`
    - `ADMIN_PASSWORD_HASH`
    - `JWT_SECRET`
    - `MAILERLITE_API_KEY` (optional)
6. Deploy. Migrations apply automatically.
7. **Stripe webhook**: register `https://YOUR_DOMAIN.netlify.app/api/webhook` in Stripe Dashboard, subscribe to `checkout.session.completed`, copy the signing secret into `STRIPE_WEBHOOK_SECRET`, redeploy.

## Project structure

```
app/
  layout.tsx                  Root layout
  page.tsx                    Homepage
  shop/                       Catalog + product detail
  cart/                       Cart
  checkout/success/           Post-payment
  orders/                     Order lookup (no signup needed)
  contact/  about/            Info pages
  admin/                      Admin (JWT-gated)
    login/                    Admin login
    page.tsx                  Dashboard
    products/  orders/        Editors + lists
  api/
    auth/login, auth/logout   Admin session
    checkout/                 Stripe Session
    webhook/                  Stripe → Netlify DB
    orders/lookup/            Order tracking
    reviews/                  Submit review (verified-purchase)
    admin/products/           Admin CRUD
    contact/  subscribe/      Forms
components/                   AnnouncementBar, Header, Footer, Hero,
                              FeatureGrid, Story, ProductCard, ProductGrid,
                              AddToCart, VariantSelector, Reviews, ReviewForm,
                              StarRating, JsonLd, admin/ProductForm
lib/
  db.ts                       Netlify DB driver (graceful null fallback)
  auth.ts                     JWT sign/verify + bcrypt admin check
  data.ts                     Catalog reads w/ static fallback
  stripe.ts                   Stripe SDK
  cart-store.ts               Zustand
  types.ts                    Domain types
middleware.ts                 JWT verification, gates /admin/*
netlify/database/migrations/
  001_init/migration.sql      Tables + indexes
  002_seed/migration.sql      Starter products
```

## Design tokens

Edit `tailwind.config.ts` to change the entire brand palette in one file. Display + body fonts swap in `app/layout.tsx`.

## Status

✓ Production-ready scaffold
✓ Single-vendor stack (Netlify + Stripe)
✓ Admin auth + product editor
✓ Variants + reviews + inventory tracking
✓ Stripe end-to-end with webhook
✓ Auto-migrating database
✓ TypeScript strict, builds clean
✓ Graceful degradation when env missing (static seed catalog)

Built by [1Commerce LLC](https://1commerce.online) for D & V Enterprises.
