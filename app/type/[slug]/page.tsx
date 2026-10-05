import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPage from "@/components/CategoryPage";
import { getType, navbarsByType, types, OG_IMAGE } from "@/lib/content";
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
  const title = `${type.title} Navbars`;
  return {
    title,
    description: type.description,
    alternates: { canonical: `/type/${slug}` },
    openGraph: { title, description: type.description, url: `/type/${slug}` },
    twitter: { card: "summary_large_image", title, description: type.description, images: [OG_IMAGE.url] },
  };
}

export default async function TypePage({ params }: { params: Params }) {
  const { slug } = await params;
  const type = getType(slug);
  if (!type) notFound();
  return (
    <CategoryPage
      title={type.title}
      lead={type.description}
      tabs={typeTabs}
      activeHref={`/type/${slug}`}
      navbars={navbarsByType(slug)}
    />
  );
}
