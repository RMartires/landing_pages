import Link from "next/link";
import {
  Calendar,
  Clapperboard,
  Mic2,
  Play,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";
import type { LandingPageProps } from "@/landing-pages/types";
import { ExampleVideoGallery } from "./ExampleVideoGallery";
import { ExampleVideoShowcase } from "./ExampleVideoShowcase";

const features = [
  {
    icon: Wand2,
    title: "Prompt to finished video",
    description:
      "Describe your topic once. AI writes the script, picks clips, adds voiceover, music, and captions.",
  },
  {
    icon: Clapperboard,
    title: "Proven niche templates",
    description:
      "Start with formats that already work — motivation, facts, storytelling, product reviews, and more.",
  },
  {
    icon: Mic2,
    title: "Human-sounding voiceovers",
    description:
      "Choose voice, language, and tone. No mic, no studio, no awkward AI reads.",
  },
  {
    icon: Calendar,
    title: "Schedule & post on autopilot",
    description:
      "Queue drafts, review before they go live, or let ReelForge publish while you sleep.",
  },
  {
    icon: Sparkles,
    title: "Every video is unique",
    description:
      "Fresh scripts and visuals for each post so your channel never feels copy-pasted.",
  },
  {
    icon: Zap,
    title: "Built for short-form",
    description:
      "Export in 9:16, 1:1, or 16:9 — ready for TikTok, Reels, Shorts, and YouTube.",
  },
];

const steps = [
  {
    step: "01",
    title: "Pick a niche",
    description: "Choose a proven format or enter your own topic in plain English.",
  },
  {
    step: "02",
    title: "Generate",
    description: "AI drafts script, visuals, voiceover, and music in under a minute.",
  },
  {
    step: "03",
    title: "Refine",
    description: "Edit scenes, swap clips, change voice, or tweak the hook before publishing.",
  },
  {
    step: "04",
    title: "Publish",
    description: "Download or schedule posts to keep your channel consistent every day.",
  },
];

const niches = [
  "Motivation",
  "True crime",
  "Finance tips",
  "Health facts",
  "Travel stories",
  "Product reviews",
  "History shorts",
  "Gaming clips",
  "AI news",
  "Dropshipping",
];

const faqs = [
  {
    question: "Do I need to show my face or record anything?",
    answer:
      "No. ReelForge is built for fully faceless channels. You never need a camera, mic, or editing timeline.",
  },
  {
    question: "Can I edit videos before they go live?",
    answer:
      "Yes. Every draft is fully editable — change the script, swap scenes, pick a different voice, then publish or schedule.",
  },
  {
    question: "Which platforms does it support?",
    answer:
      "TikTok, YouTube Shorts, Instagram Reels, and standard YouTube videos. Aspect ratios are handled automatically.",
  },
  {
    question: "Is it really free to try?",
    answer:
      "Join the waitlist for early access. Launch pricing will include a free tier so you can test before committing.",
  },
];

const stats = [
  { value: "60s", label: "Average time to first draft" },
  { value: "16M+", label: "Stock clips in library" },
  { value: "50+", label: "Video styles & workflows" },
  { value: "0", label: "Recording equipment needed" },
];

export default function FacelessLandingPage({ slug }: LandingPageProps) {
  return (
    <div className="flex min-h-full flex-col bg-[#07060f] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600">
              <Play className="h-4 w-4 fill-white text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">ReelForge</span>
          </div>
          <a
            href="#waitlist"
            className="rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            Get early access
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.35),_transparent_55%)]" />
          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
                <Sparkles className="h-3.5 w-3.5" />
                AI faceless video generator
              </div>

              <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Faceless videos on{" "}
                <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  autopilot
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">
                ReelForge creates, edits, and schedules short-form videos for
                TikTok, Reels, and YouTube Shorts — so you can grow a channel
                without ever turning on a camera.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  Auto-generate scripts, voiceover, visuals &amp; music
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  Review every draft before it posts
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  No credit card required to join the waitlist
                </li>
              </ul>

              <div id="waitlist" className="mt-10 scroll-mt-24">
                <WaitlistForm
                  pageSlug={slug}
                  buttonLabel="Start free"
                  placeholder="you@email.com"
                  className="max-w-lg [&_input]:border-white/15 [&_input]:bg-white/5 [&_input]:text-white [&_input]:placeholder:text-zinc-500 [&_button]:bg-violet-600 [&_button]:hover:bg-violet-500 [&_p]:text-zinc-400 [&_a]:text-violet-300"
                />
              </div>
            </div>

            <ExampleVideoShowcase />
          </div>
        </section>

        <ExampleVideoGallery />

        {/* Stats */}
        <section className="border-y border-white/10 bg-white/[0.02] px-6 py-12">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-violet-300">Why ReelForge</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Your AI-powered content system for short-form video
              </h2>
              <p className="mt-4 text-lg text-zinc-400">
                Create, edit, and schedule faceless videos in one place — inspired
                by the best of autopilot posting, agent workflows, and
                prompt-based generation.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-violet-500/30 hover:bg-white/[0.05]"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/20 text-violet-300">
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

        {/* How it works */}
        <section className="border-t border-white/10 bg-white/[0.02] px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-medium text-violet-300">How it works</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                From idea to published video in four steps
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-white/10 bg-[#0d0b18] p-6"
                >
                  <span className="text-sm font-bold text-violet-400">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Niches */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-medium text-violet-300">Any niche</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Create faceless videos on any topic
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              Pick a proven format or enter your own idea. ReelForge handles the
              rest — from educational explainers to viral storytime shorts.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {niches.map((niche) => (
                <span
                  key={niche}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300"
                >
                  {niche}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/10 bg-white/[0.02] px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>

            <div className="mt-10 space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-white/10 bg-[#0d0b18] px-5 py-4"
                >
                  <summary className="cursor-pointer list-none font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.question}
                      <span className="text-violet-400 transition group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl rounded-3xl border border-violet-500/30 bg-gradient-to-b from-violet-600/20 to-fuchsia-600/10 px-6 py-12 text-center sm:px-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Start your faceless channel today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-300">
              Join the waitlist and be first to create viral shorts without
              showing your face, buying gear, or learning an editor.
            </p>
            <WaitlistForm
              pageSlug={slug}
              buttonLabel="Join the waitlist"
              placeholder="you@email.com"
              className="mx-auto mt-8 max-w-lg [&_input]:border-white/15 [&_input]:bg-white/5 [&_input]:text-white [&_input]:placeholder:text-zinc-500 [&_button]:bg-violet-600 [&_button]:hover:bg-violet-500 [&_p]:text-zinc-400 [&_a]:text-violet-300"
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>ReelForge — AI faceless video generator. Join the waitlist for early access.</p>
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
