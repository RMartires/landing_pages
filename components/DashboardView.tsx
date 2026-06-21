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
import { buildPageUrl, displayHost } from "@/lib/site-url";

type PageSummary = {
  slug: string;
  signups: SignupRow[];
  total: number;
  bySource: Record<string, number>;
  byCampaign: Record<string, number>;
};

function summarizeByPage(
  signups: SignupRow[],
  registeredSlugs: string[],
): PageSummary[] {
  const grouped = new Map<string, PageSummary>();

  for (const slug of registeredSlugs) {
    grouped.set(slug, {
      slug,
      signups: [],
      total: 0,
      bySource: {},
      byCampaign: {},
    });
  }

  for (const signup of signups) {
    const existing = grouped.get(signup.page_slug) ?? {
      slug: signup.page_slug,
      signups: [],
      total: 0,
      bySource: {},
      byCampaign: {},
    };

    existing.signups.push(signup);
    existing.total += 1;

    const source = signup.utm_source ?? "direct";
    existing.bySource[source] = (existing.bySource[source] ?? 0) + 1;

    const campaign = signup.utm_campaign ?? "none";
    existing.byCampaign[campaign] = (existing.byCampaign[campaign] ?? 0) + 1;

    grouped.set(signup.page_slug, existing);
  }

  for (const summary of grouped.values()) {
    summary.signups.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }

  return Array.from(grouped.values()).sort((a, b) => b.total - a.total);
}

function formatSignupDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function DashboardView() {
  const registeredSlugs = getAllLandingPageSlugs();
  const [signups, setSignups] = useState<SignupRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [host, setHost] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"signups" | "platform">("signups");

  useEffect(() => {
    setHost(window.location.host);
  }, []);

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

  const summaries = useMemo(
    () => summarizeByPage(signups, registeredSlugs),
    [signups, registeredSlugs],
  );

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

      {/* Tabs */}
      <div className="mt-6 flex border-b border-zinc-200">
        <button
          onClick={() => setActiveTab("signups")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
            activeTab === "signups"
              ? "border-zinc-900 text-zinc-900"
              : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300"
          }`}
        >
          Signups
        </button>
        <button
          onClick={() => setActiveTab("platform")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
            activeTab === "platform"
              ? "border-zinc-900 text-zinc-900"
              : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300"
          }`}
        >
          Platform Overview
        </button>
      </div>

      {activeTab === "signups" ? (
        <>
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

                  {summary.total > 0 ? (
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
                  ) : null}

                  <div>
                    <h3 className="text-sm font-medium text-zinc-700">Signups</h3>
                    {summary.signups.length > 0 ? (
                      <div className="mt-3 overflow-x-auto rounded-lg border border-zinc-200">
                        <table className="min-w-full text-left text-sm">
                          <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-500">
                            <tr>
                              <th className="px-4 py-2 font-medium">Email</th>
                              <th className="px-4 py-2 font-medium">Signed up</th>
                              <th className="px-4 py-2 font-medium">Source</th>
                              <th className="px-4 py-2 font-medium">Campaign</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-200 text-zinc-700">
                            {summary.signups.map((signup) => (
                              <tr key={signup.id}>
                                <td className="px-4 py-2 font-medium">{signup.email}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                  {formatSignupDate(signup.created_at)}
                                </td>
                                <td className="px-4 py-2">
                                  {signup.utm_source ?? "direct"}
                                </td>
                                <td className="px-4 py-2">
                                  {signup.utm_campaign ?? "—"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-zinc-500">No signups yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-8 space-y-8">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">Landing Pages Platform</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              Validate SaaS ideas with subdomain landing pages
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
              Host multiple waitlist landing pages from one Next.js app. Each idea gets
              its own subdomain, attribution tracking, and a shared dashboard.
            </p>
          </div>

          <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
            <h3 className="text-lg font-medium text-zinc-900">Live demo pages</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-700">
              {registeredSlugs.map((slug) => {
                const url = host ? buildPageUrl(host, slug) : null;
                return (
                  <li key={slug} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-zinc-900 underline underline-offset-2 hover:text-zinc-700"
                      >
                        {displayHost(url)}
                      </a>
                    ) : (
                      <span>{slug}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-xs text-zinc-500">
              Local dev uses subdomain routing. In production, use{" "}
              <code className="rounded bg-white px-1 py-0.5 border border-zinc-200">{`{slug}.yourdomain.com`}</code>.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}
