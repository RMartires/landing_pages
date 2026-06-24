import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AttributionCapture } from "@/components/AttributionCapture";
import { getLandingPage } from "@/landing-pages/registry";

type SitePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: SitePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);

  if (!page) {
    return { title: "Not found" };
  }

  return {
    title: page.meta.title,
    description: page.meta.description,
    icons: page.meta.icon
      ? {
          icon: [{ url: page.meta.icon, type: "image/svg+xml" }],
          apple: [{ url: page.meta.icon, type: "image/svg+xml" }],
        }
      : undefined,
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      images: page.meta.ogImage ? [page.meta.ogImage] : undefined,
    },
  };
}

export default async function SitePage({ params }: SitePageProps) {
  const { slug } = await params;
  const page = getLandingPage(slug);

  if (!page) {
    notFound();
  }

  const PageComponent = page.component;

  return (
    <>
      <AttributionCapture />
      <PageComponent slug={slug} />
      {page.meta.umamiSiteId && (
        <script
          defer
          src={
            page.meta.umamiScriptSrc ??
            "https://cloud.umami.is/script.js"
          }
          data-website-id={page.meta.umamiSiteId}
        />
      )}
    </>
  );
}
