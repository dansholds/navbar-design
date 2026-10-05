import Link from "next/link";
import styles from "./CategoryTabs.module.css";

export type Tab = { label: string; href: string };

type Props = {
  tabs: Tab[];
  activeHref: string;
};

export default function CategoryTabs({ tabs, activeHref }: Props) {
  return (
    <section className={styles.section} aria-label="Categories">
      <div className={styles.container}>
        <nav className={styles.nav}>
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`${styles.tab} ${t.href === activeHref ? styles.active : ""}`}
              aria-current={t.href === activeHref ? "page" : undefined}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
