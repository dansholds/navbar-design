import type { Metadata } from "next";
import ThanksPage from "@/components/ThanksPage";
import { DEFAULT_DESCRIPTION, OG_IMAGE } from "@/lib/content";

const TITLE = "Thank you";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/thank-you" },
  openGraph: { type: "website", title: TITLE, description: DEFAULT_DESCRIPTION, url: "/thank-you", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DEFAULT_DESCRIPTION, images: [OG_IMAGE.url] },
};

export default function ThankYouPage() {
  return <ThanksPage message="Thanks for submitting a new navbar! We'll give it a look, and if it's cool, we'll add it!" />;
}
