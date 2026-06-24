import type { ComponentType } from "react";

export type LandingPageMeta = {
  title: string;
  description: string;
  ogImage?: string;
  icon?: string;
  umamiSiteId?: string;
  umamiScriptSrc?: string;
  googleTagId?: string;
};

export type LandingPageProps = {
  slug: string;
};

export type LandingPageEntry = {
  slug: string;
  meta: LandingPageMeta;
  component: ComponentType<LandingPageProps>;
};
