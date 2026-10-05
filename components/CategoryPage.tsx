import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryTabs, { type Tab } from "@/components/CategoryTabs";
import JsonLd from "@/components/JsonLd";
import NavbarGrid from "@/components/NavbarGrid";
import PageHero from "@/components/PageHero";
import type { Navbar } from "@/lib/content";
import { breadcrumbLd, collectionLd, graph } from "@/lib/seo";
import styles from "@/app/list.module.css";

type Props = {
  kind: "style" | "type";
  slug: string;
  title: string;
  lead: string;
  seoTitle: string;
  seoDescription: string;
  tabs: Tab[];
  navbars: Navbar[];
  explainer: string[];
};

export default function CategoryPage({ kind, slug, title, lead, seoTitle, seoDescription, tabs, navbars, explainer }: Props) {
  const path = `/${kind}/${slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Navbars", path: "/navbars" },
    { name: `${title} ${kind === "type" ? "navbars" : "style"}`, path },
  ];
  return (
    <>
      <JsonLd data={graph(collectionLd({ path, name: seoTitle, description: seoDescription, navbars }), breadcrumbLd(crumbs))} />
      <Breadcrumbs items={crumbs} />
      <PageHero title={title} subtitle="navbars" lead={lead} />
      <CategoryTabs tabs={tabs} activeHref={path} />
      <section className={styles.websites}>
        <div className={styles.container}>
          {navbars.length > 0 ? (
            <NavbarGrid navbars={navbars} priorityCount={3} />
          ) : (
            <p className={styles.empty}>No {title.toLowerCase()} navbars yet. Know one? Submit it.</p>
          )}
        </div>
      </section>
      <section className={styles.explainer} aria-labelledby="about-category">
        <div className={styles.explainerInner}>
          <h2 id="about-category" className={styles.explainerHeading}>
            About {title.toLowerCase()} navbars
          </h2>
          <div className={styles.explainerBody}>
            {explainer.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
