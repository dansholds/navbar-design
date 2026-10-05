import type { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent";
import { DEFAULT_DESCRIPTION, OG_IMAGE } from "@/lib/content";

const TITLE = "404";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/404" },
  openGraph: { type: "website", title: TITLE, description: DEFAULT_DESCRIPTION, url: "/404", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DEFAULT_DESCRIPTION, images: [OG_IMAGE.url] },
};

/** The original site exposes its 404 design at /404 (it is in the sitemap), so keep that URL alive. */
export default function FourOhFourPage() {
  return <NotFoundContent />;
}
