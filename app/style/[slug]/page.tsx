import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPage from "@/components/CategoryPage";
import { getStyle, navbarsByStyle, styles, OG_IMAGE } from "@/lib/content";
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
  const title = `${style.title} Navbars`;
  return {
    title,
    description: style.description,
    alternates: { canonical: `/style/${slug}` },
    openGraph: { title, description: style.description, url: `/style/${slug}` },
    twitter: { card: "summary_large_image", title, description: style.description, images: [OG_IMAGE.url] },
  };
}

export default async function StylePage({ params }: { params: Params }) {
  const { slug } = await params;
  const style = getStyle(slug);
  if (!style) notFound();
  return (
    <CategoryPage
      title={style.title}
      lead={style.description}
      tabs={styleTabs}
      activeHref={`/style/${slug}`}
      navbars={navbarsByStyle(slug)}
    />
  );
}
