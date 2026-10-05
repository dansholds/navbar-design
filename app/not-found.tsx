import type { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent";
import { DEFAULT_DESCRIPTION } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "404" },
  description: DEFAULT_DESCRIPTION,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundContent />;
}
