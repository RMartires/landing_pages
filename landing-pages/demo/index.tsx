import { LandingFooter } from "@/components/LandingFooter";
import { WaitlistForm } from "@/components/WaitlistForm";
import type { LandingPageProps } from "@/landing-pages/types";

const features = [
  "Auto-prioritize emails that need a reply today",
  "One-line summaries for long threads",
  "Draft replies in your tone, ready to send",
];

export default function DemoLandingPage({ slug }: LandingPageProps) {
  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-sky-50 via-white to-white">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16 sm:py-24">
        <div className="mb-6 inline-flex w-fit items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
          Coming soon — join the waitlist
        </div>

        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          Stop drowning in email. Let AI triage your inbox.
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
          InboxPilot is an AI assistant that reads your inbox, surfaces what
          matters, and drafts replies so founders can stay focused on growth.
        </p>

        <ul className="mt-8 space-y-3 text-sm text-zinc-700">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-medium text-zinc-900">
            Get early access
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Join the waitlist and we&apos;ll notify you when InboxPilot launches.
          </p>
          <WaitlistForm pageSlug={slug} className="mt-4" />
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
