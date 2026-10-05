import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPage from "@/components/CategoryPage";
import { getStyle, navbarsByStyle, styles, SITE_NAME } from "@/lib/content";
import { categoryDescription, categoryTitle } from "@/lib/seo";
import copy from "@/content/category-copy.json";
import { styleTabs } from "@/lib/tabs";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return styles.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const style = getStyle(slug);
  if (!style) return {};
  const items = navbarsByStyle(slug);
  const title = categoryTitle(style, "style", items.length);
  const description = categoryDescription(style, "style", items.length);
  const image = items[0]
    ? { url: items[0].image, width: items[0].imageWidth, height: items[0].imageHeight }
    : { url: "/og-image.png", width: 1200, height: 630 };
  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    alternates: { canonical: `/style/${slug}` },
    openGraph: { type: "website", title, description, url: `/style/${slug}`, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export default async function StylePage({ params }: { params: Params }) {
  const { slug } = await params;
  const style = getStyle(slug);
  if (!style) notFound();
  const items = navbarsByStyle(slug);
  const explainer = (copy.styles as Record<string, string[]>)[slug] ?? [];
  return (
    <CategoryPage
      kind="style"
      slug={slug}
      title={style.title}
      lead={style.description}
      seoTitle={categoryTitle(style, "style", items.length)}
      seoDescription={categoryDescription(style, "style", items.length)}
      tabs={styleTabs}
      navbars={items}
      explainer={explainer}
    />
  );
}
