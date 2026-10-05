import type { Metadata } from "next";
import ThanksPage from "@/components/ThanksPage";
import { DEFAULT_DESCRIPTION, OG_IMAGE } from "@/lib/content";

const TITLE = "Thank you";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/newsletter" },
  openGraph: { type: "website", title: TITLE, description: DEFAULT_DESCRIPTION, url: "/newsletter", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DEFAULT_DESCRIPTION, images: [OG_IMAGE.url] },
};

export default function NewsletterPage() {
  return (
    <ThanksPage message="Thanks for signing up to the newsletter! Make sure you check your inbox to confirm your opt in!" />
  );
}
