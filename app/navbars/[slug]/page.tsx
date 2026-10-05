import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import { ChevronRight } from "@/components/Icons";
import NavbarGrid from "@/components/NavbarGrid";
import Scramble from "@/components/Scramble";
import { getNavbar, getStyle, getType, navbars, nextNavbar, relatedNavbars, OG_IMAGE } from "@/lib/content";
import styles from "./detail.module.css";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return navbars.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const navbar = getNavbar(slug);
  if (!navbar) return {};
  const title = `${navbar.title} — Directory`;
  return {
    title,
    description: navbar.description,
    alternates: { canonical: `/navbars/${slug}` },
    openGraph: { title, description: navbar.description, url: `/navbars/${slug}` },
    twitter: { card: "summary_large_image", title, description: navbar.description, images: [OG_IMAGE.url] },
  };
}

export default async function NavbarPage({ params }: { params: Params }) {
  const { slug } = await params;
  const navbar = getNavbar(slug);
  if (!navbar) notFound();
  const next = nextNavbar(slug);
  const related = relatedNavbars(slug);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.imageBox}>
            <div className={styles.image}>
              <Image
                src={navbar.image}
                alt={`${navbar.title} navbar`}
                width={navbar.imageWidth}
                height={navbar.imageHeight}
                sizes="(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 60vw"
                priority
              />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.text}>
              {next && (
                <nav aria-label="Next navbar">
                  <Link href={`/navbars/${next.slug}`} className={styles.nextLink} aria-label={`Next: ${next.title}`}>
                    <ChevronRight size={20} />
                  </Link>
                </nav>
              )}
              <div className={styles.top}>
                <h1 className={styles.title}>{navbar.title}</h1>
                <p className={styles.description}>{navbar.description}</p>
                <div className={styles.visit}>
                  <Button href={navbar.website} variant="primary" arrow external>
                    Visit website
                  </Button>
                </div>
              </div>
              <div className={styles.line} />
            </div>
            <div className={styles.tags}>
              <div className={styles.tagGroup}>
                <p className={styles.tagLabel}>Styles</p>
                <nav className={styles.tagList} aria-label="Styles">
                  {navbar.styles.map((s) => (
                    <Link key={s} href={`/style/${s}`}>
                      {getStyle(s)?.title ?? s}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className={styles.tagGroup}>
                <p className={styles.tagLabel}>Type</p>
                <nav className={styles.tagList} aria-label="Types">
                  {navbar.types.map((t) => (
                    <Link key={t} href={`/type/${t}`}>
                      {getType(t)?.title ?? t}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.related}>
        <div className={styles.relatedContainer}>
          <Scramble as="h2" text="Related Navbars" className={styles.relatedHeading} />
          <NavbarGrid navbars={related} />
        </div>
      </section>
    </>
  );
}
