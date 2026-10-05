import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import { ArrowUpRight } from "@/components/Icons";
import NavbarGrid from "@/components/NavbarGrid";
import Scramble from "@/components/Scramble";
import Ticker from "@/components/Ticker";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, featuredNavbars, latestNavbars, navbars, styles as styleCats, types, OG_IMAGE } from "@/lib/content";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, url: "/", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, images: [OG_IMAGE.url] },
};

export default function HomePage() {
  const styleCount = styleCats.length;
  const featured = featuredNavbars();
  const latest = latestNavbars(9);

  return (
    <>
      <section className={styles.hero}>
        <Ticker />
        <div className={styles.heroFade} />
        <div className={styles.heroContainer}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>Navbar Design</h1>
            <p className={styles.heroLead}>
              A hand-picked directory of the best website navigation bars on the internet.
            </p>
            <div className={styles.heroActions}>
              <Button href="/navbars" variant="primary" size="large" arrow>
                Browse navbars
              </Button>
              <Button href="/submit" variant="secondary" size="large">
                Submit a navbar
              </Button>
            </div>
          </div>
          <Scramble
            as="p"
            className={styles.heroStats}
            text={`${navbars.length} navbars · ${styleCount} styles · ${types.length} types`}
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <Scramble as="h2" text="Featured" className={styles.heading} />
        </div>
        <div className={styles.container}>
          <NavbarGrid navbars={featured} columns={2} sizes="(max-width: 1199px) 100vw, 50vw" priorityCount={2} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.headingRow}>
            <Scramble as="h2" text="All Navbars" className={styles.heading} />
            <Button href="/navbars" variant="secondary">
              All
            </Button>
          </div>
          <NavbarGrid navbars={latest} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.headingRow}>
            <Scramble as="h2" text="Categories" className={styles.heading} />
            <Button href="/navbars" variant="secondary">
              All
            </Button>
          </div>
          <div className={styles.categories}>
            {types.map((t) => (
              <Link key={t.slug} href={`/type/${t.slug}`} className={styles.category}>
                <span className={styles.categoryIcon}>
                  <ArrowUpRight size={24} />
                </span>
                <span className={styles.categoryText}>
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
