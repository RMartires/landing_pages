# Landing Pages Platform

Host multiple SaaS waitlist landing pages from one Next.js app. Each idea gets its own subdomain, email capture with UTM attribution, and a password-protected dashboard.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres)
- Vercel (wildcard subdomain deployment)

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Copy env file and fill in values:

```bash
cp .env.example .env.local
```

3. Create a Supabase project and run the SQL in [`supabase/schema.sql`](./supabase/schema.sql).

4. Start the dev server:

```bash
npm run dev
```

5. Open:

- Main site: [http://localhost:3000](http://localhost:3000)
- Demo landing page: [http://demo.localhost:3000](http://demo.localhost:3000)
- Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## Add a new landing page

1. Create `landing-pages/<slug>/index.tsx` and `landing-pages/<slug>/meta.ts`
2. Register the slug in `landing-pages/registry.ts`
3. Visit `http://<slug>.localhost:3000` locally
4. In production, `<slug>.yourdomain.com` works automatically via wildcard DNS

Example ad URL:

```text
https://demo.yourdomain.com/?utm_source=facebook&utm_campaign=demo-test&utm_content=creative-a
```

## Deployment (Vercel)

1. Push to GitHub and import the repo in Vercel
2. Add env vars from `.env.example`
3. Set `ROOT_DOMAIN=yourdomain.com`
4. Add domains:
   - `yourdomain.com`
   - `*.yourdomain.com`
5. Add DNS records:
   - Apex/root -> Vercel
   - `*` CNAME -> Vercel

## Project structure

```text
app/
  sites/[slug]/          # internal route for subdomain pages
  api/waitlist/          # email capture
  api/dashboard/         # login, signups, export
  dashboard/             # analytics UI
landing-pages/
  demo/                  # example page
  registry.ts            # slug registry
middleware.ts            # subdomain routing + dashboard auth
supabase/schema.sql      # database schema
```

## Notes

- Waitlist inserts use the Supabase service role key on the server only.
- Dashboard is protected by `DASHBOARD_PASSWORD`.
- Privacy and Terms pages are included for ad-platform compliance.
