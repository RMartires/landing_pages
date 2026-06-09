import DemoLandingPage from "@/landing-pages/demo";
import { demoMeta } from "@/landing-pages/demo/meta";
import type { LandingPageEntry } from "@/landing-pages/types";

export const landingPages: LandingPageEntry[] = [
  {
    slug: "demo",
    meta: demoMeta,
    component: DemoLandingPage,
  },
];

export function getLandingPage(slug: string): LandingPageEntry | undefined {
  return landingPages.find((page) => page.slug === slug);
}

export function getAllLandingPageSlugs(): string[] {
  return landingPages.map((page) => page.slug);
}
