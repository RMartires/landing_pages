"use client";

import { useState } from "react";
import { readStoredAttribution } from "@/lib/attribution";
import { trackGenerateLead } from "@/lib/gtag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type WaitlistFormProps = {
  pageSlug: string;
  buttonLabel?: string;
  placeholder?: string;
  className?: string;
};

type FormState = "idle" | "loading" | "success" | "error";

export function WaitlistForm({
  pageSlug,
  buttonLabel = "Join waitlist",
  placeholder = "Enter your email",
  className,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const attribution = readStoredAttribution();

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          page_slug: pageSlug,
          utm_source: attribution?.utm_source ?? null,
          utm_medium: attribution?.utm_medium ?? null,
          utm_campaign: attribution?.utm_campaign ?? null,
          utm_content: attribution?.utm_content ?? null,
          utm_term: attribution?.utm_term ?? null,
          referrer: attribution?.referrer ?? null,
          landing_path: attribution?.landing_path ?? null,
          user_agent: navigator.userAgent,
          website: "",
        }),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      trackGenerateLead(pageSlug);

      setState("success");
      setMessage(data.message ?? "You're on the list!");
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (state === "success") {
    return (
      <div className={className}>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {message}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={placeholder}
            disabled={state === "loading"}
            className="sm:flex-1"
          />
          <Button type="submit" disabled={state === "loading"} className="sm:shrink-0">
            {state === "loading" ? "Joining..." : buttonLabel}
          </Button>
        </div>

        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <p className="text-xs text-zinc-500">
          By joining the waitlist, you agree to receive product updates. See our{" "}
          <a href="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>

        {state === "error" && message ? (
          <p className="text-sm text-red-600">{message}</p>
        ) : null}
      </form>
    </div>
  );
}
