import Link from "next/link";
import {
  BarChart3,
  Briefcase,
  FileText,
  Import,
  LayoutTemplate,
  ScanSearch,
  Target,
  Wand2,
} from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";
import type { LandingPageProps } from "@/landing-pages/types";
import { ProductDemo } from "./ProductDemo";

const features = [
  {
    icon: Wand2,
    title: "AI resume writer",
    description:
      "Generate bullet points, summaries, and full first drafts from your experience or a pasted job description in seconds.",
  },
  {
    icon: ScanSearch,
    title: "ATS scoring & checker",
    description:
      "Real-time match scores and parse-safe formatting. Single-column templates that pass Workday, Greenhouse, Lever, and Taleo.",
  },
  {
    icon: Target,
    title: "Job description tailoring",
    description:
      "Paste any posting and get keyword gaps, match percentages, and suggested edits so each application is targeted — not copy-pasted.",
  },
  {
    icon: LayoutTemplate,
    title: "Professional templates",
    description:
      "ATS-friendly layouts plus polished designs. Switch between a corporate-safe version and a standout visual resume when you need both.",
  },
  {
    icon: FileText,
    title: "Cover letter generator",
    description:
      "Role-specific cover letters in seconds, synced with your resume content and the job description you're applying to.",
  },
  {
    icon: Import,
    title: "LinkedIn import",
    description:
      "Pull your profile into a structured resume instantly. Update once, export PDF or Word for every application.",
  },
  {
    icon: Briefcase,
    title: "Job application tracker",
    description:
      "Kanban-style pipeline from saved roles to interviews. Clip jobs from 50+ boards and keep resume versions attached to each.",
  },
  {
    icon: BarChart3,
    title: "Resume analytics",
    description:
      "See what's working — keyword density, quantified bullets, length, and section completeness before you hit submit.",
  },
];

const steps = [
  {
    step: "01",
    title: "Import or start fresh",
    description:
      "Upload a PDF, import LinkedIn, or answer a few prompts. AI builds your baseline in under a minute.",
  },
  {
    step: "02",
    title: "Tailor to the role",
    description:
      "Paste the job description. Get a match score, missing keywords, and AI rewrites you can edit in your voice.",
  },
  {
    step: "03",
    title: "Pass ATS, stay human",
    description:
      "Use parse-safe templates and quantified bullets. Edit AI output so it sounds like you — not a template.",
  },
  {
    step: "04",
    title: "Track & apply",
    description:
      "Export PDF or Word, generate a cover letter, and log the application in your job search tracker.",
  },
];

const stats = [
  { value: "60s", label: "To your first tailored draft" },
  { value: "8+", label: "Tools in one workflow" },
  { value: "ATS", label: "Optimized by default" },
  { value: "$0", label: "To join the waitlist" },
];

const included = [
  "AI bullet & summary writer",
  "ATS match scoring",
  "Job description keyword matching",
  "Cover letter generator",
  "LinkedIn profile import",
  "Application tracker",
  "PDF & Word export",
  "Free tier at launch",
];

const faqs = [
  {
    question: "What is ResumePilot?",
    answer:
      "ResumePilot is an AI resume builder that helps you write, tailor, and track applications in one place. You get AI writing, ATS scoring, job-description matching, cover letters, templates, and a job tracker without switching tools.",
  },
  {
    question: "Will my resume pass ATS filters?",
    answer:
      "ResumePilot uses single-column, parser-safe layouts and keyword matching built for modern applicant tracking systems. You also get a match score before you apply so you can fix gaps early.",
  },
  {
    question: "Can employers tell I used AI?",
    answer:
      "Generic AI output stands out for the wrong reasons. ResumePilot gives you drafts to edit, not finished copy. Add your metrics, tighten the wording, and make sure every line reflects your real experience.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. Join the waitlist for early access. Launch will include a free tier with core resume building and limited AI credits so you can try it before upgrading.",
  },
];

export default function ResumeBuilderLandingPage({ slug }: LandingPageProps) {
  return (
    <div className="flex min-h-full flex-col bg-[#060a09] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <img
              src="/icons/resumepilot.svg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <span className="text-lg font-semibold tracking-tight">ResumePilot</span>
          </div>
          <a
            href="#demo"
            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/30 hover:text-white sm:inline-flex"
          >
            See how it works
          </a>
          <a
            href="#waitlist"
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
          >
            Join waitlist
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 pb-12 pt-6 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.25),_transparent_55%)]" />
          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-teal-600/15 blur-3xl" />

          <div className="relative mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                <Wand2 className="h-3.5 w-3.5" />
                AI-powered resume builder
              </div>

              <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-6xl">
                Build resumes that{" "}
                <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  get past ATS and get noticed
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-300 sm:mt-5 sm:text-base sm:leading-7">
                ResumePilot analyzes, tailors, and improves your resume for every
                role — AI writing, ATS optimization, cover letters, and application
                tracking in one workflow.
              </p>

              <ul className="mt-6 space-y-2 text-sm text-zinc-300 sm:mt-8">
                {included.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <div id="waitlist" className="mt-8 scroll-mt-24 sm:mt-10">
                <WaitlistForm
                  pageSlug={slug}
                  buttonLabel="Get early access"
                  placeholder="you@email.com"
                  className="max-w-lg [&_input]:border-white/15 [&_input]:bg-white/5 [&_input]:text-white [&_input]:placeholder:text-zinc-500 [&_button]:bg-emerald-600 [&_button]:hover:bg-emerald-500 [&_p]:text-zinc-400 [&_a]:text-emerald-300"
                />
              </div>
            </div>

            <div id="demo" className="mt-10 scroll-mt-24 sm:mt-12 lg:mt-14">
              <ProductDemo className="w-full" size="large" />
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.02] px-6 py-12">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-emerald-300">Features</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need from first draft to offer
              </h2>
              <p className="mt-4 text-lg text-zinc-400">
                Write smarter, match each job description, and stay organized
                through every application — without juggling multiple tools.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-emerald-500/30 hover:bg-white/[0.05]"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-300">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-white/[0.02] px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-medium text-emerald-300">How it works</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                From blank page to tailored application in four steps
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-white/10 bg-[#0a100e] p-6"
                >
                  <span className="text-sm font-bold text-emerald-400">{item.step}</span>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-medium text-emerald-300">Everything included</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Your full job search toolkit
              </h2>
              <p className="mt-4 text-lg text-zinc-400">
                Build, tailor, export, and track every application from one
                dashboard. No add-ons, no extra subscriptions, no tab switching.
              </p>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-0">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-200"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-white/10 bg-white/[0.02] px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>

            <div className="mt-10 space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-white/10 bg-[#0a100e] px-5 py-4"
                >
                  <summary className="cursor-pointer list-none font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.question}
                      <span className="text-emerald-400 transition group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-600/20 to-teal-600/10 px-6 py-12 text-center sm:px-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to land your next role?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-300">
              Join the waitlist for ResumePilot — AI writing, ATS scoring, job
              tailoring, and tracking in one place. No credit card required.
            </p>
            <WaitlistForm
              pageSlug={slug}
              buttonLabel="Join the waitlist"
              placeholder="you@email.com"
              className="mx-auto mt-8 max-w-lg [&_input]:border-white/15 [&_input]:bg-white/5 [&_input]:text-white [&_input]:placeholder:text-zinc-500 [&_button]:bg-emerald-600 [&_button]:hover:bg-emerald-500 [&_p]:text-zinc-400 [&_a]:text-emerald-300"
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            ResumePilot — AI resume builder with ATS optimization. Join the
            waitlist for early access.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
