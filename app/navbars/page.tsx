import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryTabs from "@/components/CategoryTabs";
import JsonLd from "@/components/JsonLd";
import LoadMoreGrid from "@/components/LoadMoreGrid";
import PageHero from "@/components/PageHero";
import { SITE_NAME, navbars, OG_IMAGE } from "@/lib/content";
import { breadcrumbLd, collectionLd, graph, snippet } from "@/lib/seo";
import { typeTabs } from "@/lib/tabs";
import styles from "@/app/list.module.css";

const TITLE = `All navbar designs: ${navbars.length} website navigation examples`;
const DESCRIPTION = snippet(
  `Browse ${navbars.length} hand-picked website navbars with screenshots, filtered by type: dropdown, full screen, mega menu, mobile, side drawer, static and sticky navigation.`,
);

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ${SITE_NAME}` },
  description: DESCRIPTION,
  alternates: { canonical: "/navbars" },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: "/navbars", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE.url] },
};

export default function NavbarsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          collectionLd({ path: "/navbars", name: TITLE, description: DESCRIPTION, navbars }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Navbars", path: "/navbars" },
          ]),
        )}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Navbars", path: "/navbars" },
        ]}
      />
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
