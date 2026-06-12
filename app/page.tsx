import Link from "next/link";
import { headers } from "next/headers";
import { getAllLandingPageSlugs } from "@/landing-pages/registry";
import { buildPageUrl, displayHost } from "@/lib/site-url";

export default async function HomePage() {
  const slugs = getAllLandingPageSlugs();
  const host = (await headers()).get("host") ?? "localhost:3000";

  return (
    <main className="mx-auto flex min-h-full max-w-4xl flex-col px-6 py-16 sm:py-24">
      <p className="text-sm font-medium text-zinc-500">Landing Pages Platform</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
        Validate SaaS ideas with subdomain landing pages
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
        Host multiple waitlist landing pages from one Next.js app. Each idea gets
        its own subdomain, attribution tracking, and a shared dashboard.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/dashboard"
          className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Open dashboard
        </Link>
        <Link
          href="/privacy"
          className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
        >
          Privacy Policy
        </Link>
      </div>

      <section className="mt-14 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="text-base font-medium text-zinc-900">Live demo pages</h2>
        <ul className="mt-4 space-y-2 text-sm text-zinc-700">
          {slugs.map((slug) => {
            const url = buildPageUrl(host, slug);
            return (
              <li key={slug}>
                <a href={url} className="underline underline-offset-2">
                  {displayHost(url)}
                </a>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-xs text-zinc-500">
          Local dev uses subdomain routing. In production, use{" "}
          <code className="rounded bg-white px-1 py-0.5">{`{slug}.yourdomain.com`}</code>.
        </p>
      </section>
    </main>
  );
}
