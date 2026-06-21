import Link from "next/link";
import { Bird, Compass, Feather, Zap } from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-50 text-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white">
              <Bird className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-zinc-950">
              Soonbird
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-20 sm:py-32 lg:py-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.zinc.100),theme(colors.zinc.50))]" />
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-xs">
              <span className="flex h-1.5 w-1.5 rounded-full bg-zinc-900 animate-pulse" />
              Coming soon — Join the waitlist
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-950 sm:text-6xl">
              The early bird gets the focus.
            </h1>

            <p className="mt-6 text-lg leading-8 text-zinc-600 max-w-2xl mx-auto">
              Soonbird is a minimal, distraction-free workspace designed to help you organize your thoughts, plan your projects, and launch your ideas. Beautifully crafted for modern creators.
            </p>

            <div className="mt-10 max-w-md mx-auto">
              <WaitlistForm
                pageSlug="soonbird"
                buttonLabel="Get early access"
                placeholder="Enter your email address"
                className="[&_input]:bg-white [&_input]:border-zinc-200 [&_button]:bg-zinc-900 [&_button]:hover:bg-zinc-800"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-zinc-200 bg-white px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                Everything you need, nothing you don&apos;t.
              </h2>
              <p className="mt-4 text-lg text-zinc-600">
                We stripped away the clutter so you can focus on building your next big thing.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-zinc-300">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white">
                  <Feather className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-950">Minimalist Design</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  A clean, quiet workspace that keeps you focused on your thoughts and ideas, not on complex menus.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-zinc-300">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-950">Lightning Fast</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Built for speed with instant search, keyboard shortcuts, and offline-first syncing.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-zinc-300">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-950">Stay on Track</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Intelligent prioritization and simple progress tracking to guide your projects from start to finish.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              Frequently asked questions
            </h2>

            <div className="mt-12 space-y-4">
              <details className="group rounded-xl border border-zinc-200 bg-white px-6 py-4">
                <summary className="cursor-pointer list-none font-medium text-zinc-900 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    What is Soonbird?
                    <span className="text-zinc-400 transition group-open:rotate-45 font-semibold">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Soonbird is a minimal, distraction-free productivity workspace built for creators, developers, and founders who want to stay organized, plan their projects, and launch their ideas.
                </p>
              </details>

              <details className="group rounded-xl border border-zinc-200 bg-white px-6 py-4">
                <summary className="cursor-pointer list-none font-medium text-zinc-900 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    When will Soonbird launch?
                    <span className="text-zinc-400 transition group-open:rotate-45 font-semibold">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  We are currently in private beta, iterating on feedback from our early users. We plan to open public access later this year. Join the waitlist to be first in line!
                </p>
              </details>

              <details className="group rounded-xl border border-zinc-200 bg-white px-6 py-4">
                <summary className="cursor-pointer list-none font-medium text-zinc-900 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    Is my data secure?
                    <span className="text-zinc-400 transition group-open:rotate-45 font-semibold">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Yes, absolutely. We take privacy and security seriously. All your data is encrypted in transit and at rest, and you can export or delete your data at any time.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Soonbird. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-900 transition-colors">
              Terms
            </Link>
            <Link href="/dashboard" className="hover:text-zinc-900 transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
