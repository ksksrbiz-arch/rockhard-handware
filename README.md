# Rockhard Handware

> Built for Glory.

Headless commerce. **Zero third-party SaaS for the data plane** — Netlify DB (Neon Postgres),
Netlify Blobs (image storage), and a hand-rolled JWT auth layer. Stripe for payments only.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 App Router (TypeScript strict) |
| Styling | Tailwind, brand tokens in `tailwind.config.ts` |
| Database | **Netlify DB** (Neon Postgres, auto-provisioned, branched per deploy) |
| Storage | **Netlify Blobs** (product image uploads) |
| Auth | Hand-rolled — `jose` JWT in httpOnly cookie + `bcryptjs` |
| Payments | Stripe Checkout (hosted) |
| State | Zustand (cart, persisted to localStorage) |
| Hosting | Netlify with `@netlify/plugin-nextjs` |

## Local setup

```bash
npm install --legacy-peer-deps
cp .env.example .env.local
# Generate AUTH_SECRET: openssl rand -base64 32
# Add Stripe keys

npx netlify login
npx netlify link
npm run dev   # netlify dev → http://localhost:8888
```

## Deploying

1. Push to GitHub (already wired)
2. Netlify auto-detects `netlify.toml`
3. Migrations in `netlify/database/migrations/` auto-run before each deploy publishes
4. Add env vars from `.env.example` (Netlify auto-injects `NETLIFY_DATABASE_URL`)

## Bootstrap admin

After signing up at `/signup`, in the Netlify DB SQL editor:

```sql
update users set role = 'admin' where email = 'you@example.com';
```

## Stripe webhook

Stripe Dashboard → Webhooks → register `https://YOUR_DOMAIN/api/webhook` for
`checkout.session.completed`, copy signing secret to `STRIPE_WEBHOOK_SECRET`.

Built by 1Commerce LLC for D & V Enterprises.
