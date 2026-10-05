import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import { ChevronRight } from "@/components/Icons";
import NavbarGrid from "@/components/NavbarGrid";
import Scramble from "@/components/Scramble";
import { SITE_NAME, getNavbar, getStyle, getType, navbars, nextNavbar, relatedNavbars } from "@/lib/content";
import { breadcrumbLd, graph, navbarDescription, navbarLd, navbarTitle } from "@/lib/seo";
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
  const styleNames = navbar.styles.map((x) => getStyle(x)?.title ?? x);
  const typeNames = navbar.types.map((x) => getType(x)?.title ?? x);
  const title = navbarTitle(navbar, styleNames, typeNames);
  const description = navbarDescription(navbar, styleNames, typeNames);
  const image = { url: navbar.image, width: navbar.imageWidth, height: navbar.imageHeight, alt: `${navbar.title} navbar` };
  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    alternates: { canonical: `/navbars/${slug}` },
    openGraph: { type: "article", title, description, url: `/navbars/${slug}`, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export default async function NavbarPage({ params }: { params: Params }) {
  const { slug } = await params;
  const navbar = getNavbar(slug);
  if (!navbar) notFound();
  const next = nextNavbar(slug);
  const related = relatedNavbars(slug);
  const styleNames = navbar.styles.map((x) => getStyle(x)?.title ?? x);
  const typeNames = navbar.types.map((x) => getType(x)?.title ?? x);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Navbars", path: "/navbars" },
    { name: navbar.title, path: `/navbars/${slug}` },
  ];

  return (
    <>
      <JsonLd data={graph(navbarLd(navbar, styleNames, typeNames), breadcrumbLd(crumbs))} />
      <Breadcrumbs items={crumbs} />
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
