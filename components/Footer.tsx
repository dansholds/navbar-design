import Link from "next/link";
import { latestNavbars, styles as styleCats, types as typeCats } from "@/lib/content";
import styles from "./Footer.module.css";

export default function Footer() {
  const latest = latestNavbars(6);
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <p className={styles.heading}>Style</p>
              <div className={styles.list}>
                {styleCats.map((s) => (
                  <p key={s.slug}>
                    <Link href={`/style/${s.slug}`} prefetch={false}>{s.title}</Link>
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.column}>
              <p className={styles.heading}>Type</p>
              <div className={styles.list}>
                {typeCats.map((t) => (
                  <p key={t.slug}>
                    <Link href={`/type/${t.slug}`} prefetch={false}>{t.title}</Link>
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.column}>
              <p className={styles.heading}>Latest Navbars</p>
              <div className={styles.list}>
                {latest.map((n) => (
                  <p key={n.slug}>
                    <Link href={`/navbars/${n.slug}`} prefetch={false}>{n.title}</Link>
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.column}>
              <p className={styles.heading}>Resources</p>
              <div className={styles.list}>
                <p>
                  <a href="https://www.footer.design?ref=navbar.design" target="_blank" rel="noopener">
                    Footer.design
                  </a>
                </p>
                <p>
                  <a href="https://www.404s.design?ref=navbar.design" target="_blank" rel="noopener">
                    404s.design
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.project}>
          <a href="https://happypizza.studio" target="_blank" rel="noopener">
            A Happy Pizza Studio Project
          </a>
        </p>
        <p>© navbar.design</p>
      </div>
    </footer>
  );
}
