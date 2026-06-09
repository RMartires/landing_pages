# Landing Pages Platform — Build Plan

A single Next.js application that hosts many SaaS landing pages, each on its own
subdomain, each collecting waitlist emails with full ad attribution. Used to
validate SaaS ideas by running paid traffic (Meta, Google, etc.) and measuring
demand via signup conversion.

---

## 1. Goals & non-goals

### Goals
- Spin up a new landing page (a new "idea") in minutes.
- Each idea lives on its own subdomain: `idea-a.yoursite.com`.
- Capture waitlist emails reliably into a real database.
- Attribute every signup to its page + ad campaign (UTM params + referrer).
- A simple internal dashboard to compare conversion across ideas.
- Stay compliant with ad-platform policies (privacy policy, clear framing).

### Non-goals (for v1)
- No user accounts / auth for visitors.
- No payments.
- No full CMS — pages are code (React components), per the chosen approach.
- No A/B testing framework (can add later; UTM `content` can fake it for now).

---

## 2. Tech stack

| Concern        | Choice                          | Why |
|----------------|---------------------------------|-----|
| Framework      | Next.js (App Router) + TS       | SSR, middleware for subdomains, API routes |
| Styling        | Tailwind CSS + shadcn/ui        | Fast, good-looking, per-page flexibility |
| Database       | Supabase (Postgres)             | Free tier, real DB, easy querying, dashboard |
| Emails (opt)   | Resend                          | Confirmation / double opt-in emails |
| Hosting        | Vercel (wildcard subdomain)     | `*.yoursite.com` -> one app |
| Validation     | Zod                             | Validate email + payload on the API |
| Analytics      | Vercel Analytics + UTM capture  | Page views + signup attribution |

---

## 3. Architecture

### Subdomain routing (the core mechanism)
One Next.js app serves all subdomains. A `middleware.ts` reads the `Host`
header, extracts the subdomain (the "slug"), and rewrites the request to an
internal dynamic route. No separate apps per idea.

```
idea-a.yoursite.com  ─┐
idea-b.yoursite.com  ─┼─► middleware extracts slug ─► rewrite to /_sites/<slug>
idea-c.yoursite.com  ─┘

www.yoursite.com / yoursite.com  ─► marketing/index or redirect
dashboard.yoursite.com (or /dashboard)  ─► internal analytics (protected)
```

- Local dev: use `*.localhost:3000` (works in modern browsers) or
  `lvh.me`/`*.lvh.me` which resolves to 127.0.0.1.
- Production: add a wildcard domain `*.yoursite.com` in Vercel + a `*` CNAME in DNS.

### Page registry (code-driven pages)
Each idea is its own React component for full design freedom. A central
`registry.ts` maps a slug to its component + metadata.

```
landing-pages/
  idea-a/
    index.tsx          # the landing page component
    meta.ts            # title, description, OG image, theme
  idea-b/
    index.tsx
    meta.ts
  registry.ts          # slug -> { component, meta }
```

Adding an idea = create the folder, register the slug, point a subdomain at it.

### Proposed file structure
```
app/
  _sites/[slug]/
    page.tsx               # looks up slug in registry, renders the component
    not-found.tsx          # unknown slug
  api/
    waitlist/route.ts      # POST { email, slug, utm..., referrer } -> Supabase
  dashboard/
    page.tsx               # protected analytics view
  layout.tsx
  page.tsx                 # root marketing page (yoursite.com)
landing-pages/
  <idea>/index.tsx + meta.ts
  registry.ts
components/
  WaitlistForm.tsx         # shared email capture (overridable per page)
  ui/                      # shadcn components
lib/
  supabase.ts              # server + browser clients
  attribution.ts           # parse UTM params + referrer
  validation.ts            # zod schemas
middleware.ts              # subdomain -> slug rewrite
.env.local                 # secrets (not committed)
```

---

## 4. Data model (Supabase)

### `signups` table
| Column         | Type        | Notes |
|----------------|-------------|-------|
| id             | uuid (pk)   | default `gen_random_uuid()` |
| created_at     | timestamptz | default `now()` |
| email          | text        | validated, lowercased |
| page_slug      | text        | which idea/landing page |
| utm_source     | text null   | e.g. `facebook` |
| utm_medium     | text null   | e.g. `cpc` |
| utm_campaign   | text null   | ad campaign name |
| utm_content    | text null   | ad creative / variant |
| utm_term       | text null   | keyword (Google) |
| referrer       | text null   | document.referrer |
| landing_path   | text null   | full path incl. query |
| user_agent     | text null   | for bot filtering |
| ip_hash        | text null   | hashed IP (privacy-safe dedupe) |

- Unique constraint on `(email, page_slug)` to avoid duplicate signups per page.
- Row Level Security ON; inserts go through the server API only (service role key),
  never from the browser.

### `pages` table (optional, lightweight)
Track which slugs exist + status (live/paused) and goals. Optional for v1 since
pages are defined in code, but useful for the dashboard.

---

## 5. Attribution flow (since ad testing is the whole point)

1. Visitor lands via ad with `?utm_source=facebook&utm_campaign=...&utm_content=...`.
2. On first load, capture UTM params + `document.referrer` and store in
   `sessionStorage` (so they survive navigation but reset per session).
3. On waitlist submit, send `{ email, slug, ...utm, referrer, landing_path }`
   to `/api/waitlist`.
4. Server validates (Zod), hashes IP, inserts into Supabase.
5. Dashboard aggregates: signups per slug, per utm_source, per utm_campaign,
   and conversion rate (signups / page views from Vercel Analytics).

---

## 6. Internal dashboard (`/dashboard` or `dashboard.yoursite.com`)

- Protected by a simple password / Basic Auth via middleware (env var), or
  Supabase auth if you want it nicer later.
- Shows per idea:
  - total signups, signups over time (sparkline)
  - breakdown by `utm_source` and `utm_campaign`
  - conversion rate (needs page-view data)
  - export to CSV
- This keeps you out of the raw Supabase table day-to-day.

---

## 7. Ad-platform compliance (important — protects your ad accounts)

Every landing page must include:
- A clear **"Join the waitlist"** framing (not "Buy" / not implying a finished product).
- A short explainer of what the product *will* do (avoid "fake"-feeling pages).
- A **Privacy Policy** + **Terms** link (required by Meta/Google for lead collection).
- A consent line near the email field ("By joining you agree to receive updates").
- Cookie/analytics notice if running in the EU.

Build these as shared components so every new idea gets them automatically.

---

## 8. Build phases

### Phase 1 — Foundation
- Init Next.js + TS + Tailwind + shadcn/ui.
- Add `middleware.ts` for subdomain -> slug rewrite (with localhost support).
- Set up `registry.ts` + `/_sites/[slug]/page.tsx`.
- One example landing page (`landing-pages/demo`).

### Phase 2 — Data capture
- Supabase project + `signups` table + RLS.
- `lib/supabase.ts`, `lib/validation.ts`, `lib/attribution.ts`.
- `/api/waitlist` route.
- `WaitlistForm` component wired to the API with UTM capture.

### Phase 3 — Compliance + polish
- Shared Privacy Policy / Terms pages + footer.
- Consent copy, success/thank-you state, error handling, basic bot/honeypot guard.

### Phase 4 — Dashboard
- Protected `/dashboard` with per-idea signup counts + UTM breakdown + CSV export.

### Phase 5 — Deploy
- Push to GitHub, deploy on Vercel.
- Add wildcard domain `*.yoursite.com` + DNS `*` CNAME.
- Add env vars (Supabase URL/keys, dashboard password, Resend key).
- Test a real subdomain end-to-end.

### Phase 6 (optional, later)
- Double opt-in confirmation emails (Resend).
- Lightweight A/B variants per page.
- `pages` table + page status management.

---

## 9. "Add a new idea" checklist (the day-to-day workflow)
1. `landing-pages/<slug>/index.tsx` + `meta.ts`.
2. Register `<slug>` in `registry.ts`.
3. (Prod) point `<slug>.yoursite.com` — covered automatically by the wildcard domain.
4. Run Meta ad with `?utm_source=facebook&utm_campaign=<slug>-test&utm_content=<creative>`.
5. Watch `/dashboard` for signups + conversion.

---

## 10. Environment variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-only, for inserts
ROOT_DOMAIN=yoursite.com          # used by middleware to extract subdomain
DASHBOARD_PASSWORD=               # protects /dashboard
RESEND_API_KEY=                   # optional, confirmation emails
```

---

## 11. Open questions to confirm before/while building
- Root domain name? (needed for middleware + DNS)
- Do you want double opt-in emails in v1 or later?
- One Supabase project for everything (recommended) — confirmed.
- Dashboard auth: simple password (v1) vs Supabase auth (later)?
