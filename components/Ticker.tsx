import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { navbars } from "@/lib/content";
import styles from "./Ticker.module.css";

const ROWS = 3;
const COPIES = 2;

/**
 * The skewed marquee behind the home hero. Each tile is a real gallery entry
 * linking to its page; rows pause on hover.
 */
export default function Ticker() {
  const perRow = Math.ceil(navbars.length / ROWS);
  const rows = Array.from({ length: ROWS }, (_, r) => navbars.slice(r * perRow, (r + 1) * perRow));
  const rowClass = [styles.r1, styles.r2, styles.r3];

  return (
    <div className={styles.ticker} aria-hidden="true">
      {rows.map((row, r) => {
        // Width of one copy of the row: tiles plus the gap after each one.
        const style = {
          "--copy": `calc(${row.length} * (var(--tile, 420px) + var(--gap, 24px)))`,
        } as CSSProperties;
        return (
          <div key={r} className={styles.row}>
            <ul className={`${styles.track} ${rowClass[r]}`} style={style}>
              {Array.from({ length: COPIES }).flatMap((_, c) =>
                row.map((n, i) => (
                  <li key={`${c}-${n.slug}`}>
                    <Link href={`/navbars/${n.slug}`} className={styles.item} tabIndex={-1}>
                      <Image
                        src={n.image}
                        alt=""
                        width={n.imageWidth}
                        height={n.imageHeight}
                        sizes="(max-width: 809px) 220px, 420px"
                        priority={c === 0 && r === 0 && i < 3}
                      />
                    </Link>
                  </li>
                )),
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
