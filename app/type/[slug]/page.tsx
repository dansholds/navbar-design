import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPage from "@/components/CategoryPage";
import { getType, navbarsByType, types, SITE_NAME } from "@/lib/content";
import { categoryDescription, categoryTitle, shareImage } from "@/lib/seo";
import copy from "@/content/category-copy.json";
import { typeTabs } from "@/lib/tabs";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return types.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const type = getType(slug);
  if (!type) return {};
  const items = navbarsByType(slug);
  const title = categoryTitle(type, "type", items.length);
  const description = categoryDescription(type, "type", items.length);
  const image = items[0] ? shareImage(items[0]) : { url: "/og-image.png", width: 1200, height: 630 };
  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    alternates: { canonical: `/type/${slug}` },
    openGraph: { type: "website", title, description, url: `/type/${slug}`, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export default async function TypePage({ params }: { params: Params }) {
  const { slug } = await params;
  const type = getType(slug);
  if (!type) notFound();
  const items = navbarsByType(slug);
  const explainer = (copy.types as Record<string, string[]>)[slug] ?? [];
  return (
    <CategoryPage
      kind="type"
      slug={slug}
      title={type.title}
      lead={type.description}
      seoTitle={categoryTitle(type, "type", items.length)}
      seoDescription={categoryDescription(type, "type", items.length)}
      tabs={typeTabs}
      navbars={items}
      explainer={explainer}
    />
  );
}
