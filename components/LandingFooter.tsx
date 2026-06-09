import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Join the waitlist to get early access when we launch.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-zinc-900">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-zinc-900">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
