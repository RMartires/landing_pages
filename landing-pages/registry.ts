import DemoLandingPage from "@/landing-pages/demo";
import { demoMeta } from "@/landing-pages/demo/meta";
import FacelessLandingPage from "@/landing-pages/faceless";
import { facelessMeta } from "@/landing-pages/faceless/meta";
import type { LandingPageEntry } from "@/landing-pages/types";

export const landingPages: LandingPageEntry[] = [
  {
    slug: "demo",
    meta: demoMeta,
    component: DemoLandingPage,
  },
  {
    slug: "faceless",
    meta: facelessMeta,
    component: FacelessLandingPage,
  },
];

export function getLandingPage(slug: string): LandingPageEntry | undefined {
  return landingPages.find((page) => page.slug === slug);
}

export function getAllLandingPageSlugs(): string[] {
  return landingPages.map((page) => page.slug);
}
