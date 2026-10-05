"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./Button";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  // The menu is only "open" for the route it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);

  return (
    <header className={`${styles.header} ${open ? styles.open : ""}`}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <Link href="/" className={styles.logo} aria-label="Navbar Design home">
            <Image src="/icon-light.png" alt="" width={40} height={40} priority />
          </Link>
          <button
            type="button"
            className={styles.burger}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className={`${styles.line} ${styles.line1}`} />
            <span className={`${styles.line} ${styles.line2}`} />
          </button>
        </div>
        <nav className={styles.menu} aria-label="Main">
          <div className={styles.links}>
            <Link href="/navbars" className={styles.link}>
              Navbars
            </Link>
            <Link href="/about" className={styles.link}>
              About
            </Link>
          </div>
          <Button href="https://happypizza.studio" variant="secondary" size={open ? "large" : "default"}>
            Studio
          </Button>
          <Button href="/submit" variant="primary" size={open ? "large" : "default"}>
            Submit
          </Button>
        </nav>
      </div>
    </header>
  );
}
