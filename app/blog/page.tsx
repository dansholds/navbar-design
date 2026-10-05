import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_IMAGE } from "@/lib/content";
import styles from "@/app/list.module.css";

export const metadata: Metadata = {
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, url: "/blog", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, images: [OG_IMAGE.url] },
};

export default function BlogPage() {
  return (
    <>
      <PageHero title="Blog" subtitle="articles" lead="Coming soon." />
      <section className={styles.websites}>
        <div className={styles.container} style={{ minHeight: 80 }} />
      </section>
    </>
  );
}
