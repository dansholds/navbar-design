import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import { Code, Figma, PenTool } from "@/components/Icons";
import { DEFAULT_DESCRIPTION, OG_IMAGE } from "@/lib/content";
import styles from "./about.module.css";

const TITLE = "Navbar Design / About";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { type: "website", title: TITLE, description: DEFAULT_DESCRIPTION, url: "/about", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DEFAULT_DESCRIPTION, images: [OG_IMAGE.url] },
};

const CONTACT = "mailto:dan@navbar.design";

export default function AboutPage() {
  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <h1 className="display">About</h1>
          <div className={styles.introText}>
            <p className={styles.lead}>Navbars are cool so we made a directory</p>
            <p className={styles.body}>
              Navbar.design is a casually curated directory of the best navbars on the internet. Whether you&apos;re
              a designer looking for inspiration, a brand looking for designers, or just on a random deep dive into
              navbars, you can find it here.
            </p>
            <div className={styles.buttons}>
              <Button href="/submit" variant="primary" size="large">
                Submit navbar
              </Button>
              <Button href={CONTACT} variant="secondary" size="large" arrow>
                Contact us
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.illustration}>
          <Image
            src="/images/about-illustration.png"
            alt="Illustration of the two people behind Navbar Design"
            width={1920}
            height={1080}
            sizes="(max-width: 1199px) 100vw, 1360px"
          />
        </div>

        <div className={styles.stats}>
          {["Monthly visitors", "Return rate", "Monthly page views", "Email subscribers"].map((label) => (
            <div key={label} className={styles.stat}>
              <div className={styles.statText}>
                <p className={styles.statValue}>-</p>
                <p className={styles.statLabel}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.curated}>
          <div className={styles.curatedLeft}>
            <p className={styles.eyebrow}>About</p>
            <h2 className={styles.h2}>Curated by hand, not by bots.</h2>
          </div>
          <div className={styles.curatedRight}>
            <div>
              <p>
                Each featured site is hand-picked by experienced designers who know what great design feels like. We
                value intention over trend, clarity over clutter, and craft over hype.
              </p>
              <p>We believe good design deserves a stage — and Directory is that stage.</p>
              <p>Huge shoutout to 404s.design &amp; footer.design for the inspiration.</p>
            </div>
            <div>
              <Button href={CONTACT} variant="secondary" arrow>
                Contact us
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.users}>
          <h2 className={styles.h2}>Who uses navbar.design?</h2>
          <div className={styles.usersGrid}>
            <div className={styles.user}>
              <span className={styles.userIcon}>
                <PenTool size={24} />
              </span>
              <div className={styles.userText}>
                <h3>Designers</h3>
                <p>Looking for inspiration or ideas.</p>
              </div>
            </div>
            <div className={styles.user}>
              <span className={styles.userIcon}>
                <Code size={24} />
              </span>
              <div className={styles.userText}>
                <h3>Developers</h3>
                <p>Diving into the how&apos;s and why&apos;s.</p>
              </div>
            </div>
            <div className={styles.user}>
              <span className={styles.userIcon}>
                <Figma size={24} />
              </span>
              <div className={styles.userText}>
                <h3>Studios</h3>
                <p>Putting together moodboards for client projects.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.offers}>
          <div className={styles.offer}>
            <p className={styles.eyebrow}>Listing</p>
            <h2 className={styles.h2}>Get featured</h2>
            <p className={styles.body}>
              We accept submissions from anyone, if we like one navbar over others then we will add it to the featured
              list and rotate them weekly. Weekly featured navbars will also be featured on the weekly newsletter.
            </p>
            <div className={styles.cta}>
              <Button href="/submit" variant="primary" arrow>
                Submit website
              </Button>
            </div>
          </div>
          <div className={styles.offer}>
            <p className={styles.eyebrow}>Advertise</p>
            <h2 className={styles.h2}>Promote your product</h2>
            <p className={styles.body}>
              Want to get your product or brand in front of a design focused audience? We reserve areas of the website
              for appropriate ads so reach out.
            </p>
            <div className={styles.cta}>
              <Button href={CONTACT} variant="primary" arrow>
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
