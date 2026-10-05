import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export type Crumb = { name: string; path: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className={styles.nav} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.path} style={{ display: "contents" }}>
              {i > 0 && (
                <span className={styles.sep} aria-hidden="true">
                  /
                </span>
              )}
              {last ? (
                <span aria-current="page">{it.name}</span>
              ) : (
                <Link href={it.path}>{it.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
