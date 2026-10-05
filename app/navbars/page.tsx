import type { Metadata } from "next";
import CategoryTabs from "@/components/CategoryTabs";
import LoadMoreGrid from "@/components/LoadMoreGrid";
import PageHero from "@/components/PageHero";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, navbars, OG_IMAGE } from "@/lib/content";
import { typeTabs } from "@/lib/tabs";
import styles from "@/app/list.module.css";

export const metadata: Metadata = {
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/navbars" },
  openGraph: { type: "website", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, url: "/navbars", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, images: [OG_IMAGE.url] },
};

export default function NavbarsPage() {
  return (
    <>
      <PageHero title="All" subtitle="Navbars" lead="Discover unique navbar designs from all over the internet" />
      <CategoryTabs tabs={typeTabs} activeHref="/navbars" />
      <section className={styles.websites}>
        <div className={styles.container}>
          <LoadMoreGrid navbars={navbars} pageSize={24} />
        </div>
      </section>
    </>
  );
}
