import type { Navbar } from "@/lib/content";
import NavbarCard from "./NavbarCard";
import styles from "./Grid.module.css";

type Props = {
  navbars: Navbar[];
  columns?: 2 | 3;
  sizes?: string;
  priorityCount?: number;
};

export default function NavbarGrid({ navbars, columns = 3, sizes, priorityCount = 0 }: Props) {
  return (
    <div className={`${styles.grid} ${columns === 2 ? styles.two : ""}`}>
      {navbars.map((n, i) => (
        <NavbarCard key={n.slug} navbar={n} sizes={sizes} priority={i < priorityCount} />
      ))}
    </div>
  );
}
