"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { SignupRow } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllLandingPageSlugs } from "@/landing-pages/registry";

type PageSummary = {
  slug: string;
  total: number;
  bySource: Record<string, number>;
  byCampaign: Record<string, number>;
};

function summarizeSignups(signups: SignupRow[]): PageSummary[] {
  const grouped = new Map<string, PageSummary>();

  for (const signup of signups) {
    const existing = grouped.get(signup.page_slug) ?? {
      slug: signup.page_slug,
      total: 0,
      bySource: {},
      byCampaign: {},
    };

    existing.total += 1;

    const source = signup.utm_source ?? "direct";
    existing.bySource[source] = (existing.bySource[source] ?? 0) + 1;

    const campaign = signup.utm_campaign ?? "none";
    existing.byCampaign[campaign] = (existing.byCampaign[campaign] ?? 0) + 1;

    grouped.set(signup.page_slug, existing);
  }

  return Array.from(grouped.values()).sort((a, b) => b.total - a.total);
}

export function DashboardView() {
  const [signups, setSignups] = useState<SignupRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSignups() {
      try {
        const response = await fetch("/api/dashboard/signups");
        if (!response.ok) {
          throw new Error("Unable to load signups");
        }

        const data = (await response.json()) as { signups: SignupRow[] };
        setSignups(data.signups);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load signups");
      } finally {
        setLoading(false);
      }
    }

    loadSignups();
  }, []);

  const summaries = useMemo(() => summarizeSignups(signups), [signups]);
  const registeredSlugs = getAllLandingPageSlugs();

  async function handleLogout() {
    await fetch("/api/dashboard/login", { method: "DELETE" });
    window.location.href = "/dashboard/login";
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            Waitlist dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Compare signups and attribution across landing page ideas.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/api/dashboard/export"
            className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Export CSV
          </a>
          <Button variant="ghost" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-500">
              Total signups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{signups.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-500">
              Live pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{registeredSlugs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-500">
              Pages with signups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{summaries.length}</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-zinc-500">Loading signups...</p>
      ) : null}

      {error ? <p className="mt-8 text-sm text-red-600">{error}</p> : null}

      <div className="mt-8 grid gap-4">
        {summaries.map((summary) => (
          <Card key={summary.slug}>
            <CardHeader>
              <CardTitle>{summary.slug}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-semibold">{summary.total} signups</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-zinc-700">By source</h3>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-600">
                    {Object.entries(summary.bySource).map(([source, count]) => (
                      <li key={source} className="flex justify-between gap-4">
                        <span>{source}</span>
                        <span>{count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-700">
                    By campaign
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-600">
                    {Object.entries(summary.byCampaign).map(([campaign, count]) => (
                      <li key={campaign} className="flex justify-between gap-4">
                        <span>{campaign}</span>
                        <span>{count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!loading && summaries.length === 0 ? (
        <Card className="mt-8">
          <CardContent className="py-8 text-sm text-zinc-600">
            No signups yet. Launch a landing page subdomain and send ad traffic with
            UTM parameters to start collecting data.
          </CardContent>
        </Card>
      ) : null}

      <div className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="text-sm font-medium text-zinc-900">Registered pages</h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-600">
          {registeredSlugs.map((slug) => (
            <li key={slug}>
              <Link href={`http://${slug}.localhost:3000`} className="underline">
                {slug}.localhost:3000
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
