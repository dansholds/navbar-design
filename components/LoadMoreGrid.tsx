"use client";

import { useState } from "react";
import type { Navbar } from "@/lib/content";
import NavbarCard from "./NavbarCard";
import styles from "./Grid.module.css";

type Props = {
  navbars: Navbar[];
  pageSize?: number;
};

/** Grid with the same "Load more" pagination as the Framer original (24 per page). */
export default function LoadMoreGrid({ navbars, pageSize = 24 }: Props) {
  const [shown, setShown] = useState(pageSize);
  const visible = navbars.slice(0, shown);
  return (
    <>
      <div className={styles.grid}>
        {visible.map((n, i) => (
          <NavbarCard key={n.slug} navbar={n} priority={i < 3} />
        ))}
      </div>
      {shown < navbars.length && (
        <div className={styles.loadMoreWrap}>
          <button type="button" className={styles.loadMore} onClick={() => setShown((s) => s + pageSize)}>
            Load more
          </button>
        </div>
      )}
    </>
  );
}
