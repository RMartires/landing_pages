declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGenerateLead(pageSlug: string): void {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", "generate_lead", {
    event_category: "Waitlist",
    event_label: pageSlug,
  });
}
