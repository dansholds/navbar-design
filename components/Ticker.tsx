import Image from "next/image";
import { tickerRows } from "@/lib/content";
import styles from "./Ticker.module.css";

const COPIES = 4;

/** The skewed three-row marquee of site screenshots behind the home hero. */
export default function Ticker() {
  const rowClasses = [
    `${styles.track} ${styles.gap4} ${styles.r1}`,
    `${styles.track} ${styles.gap44} ${styles.r2}`,
    `${styles.track} ${styles.gap44} ${styles.r3}`,
  ];
  return (
    <div className={styles.ticker} aria-hidden="true">
      {tickerRows.map((row, r) => (
        <div key={r} className={`${styles.row} ${r === 1 ? styles.rowMid : ""}`}>
          <ul className={rowClasses[r]}>
            {Array.from({ length: COPIES }).flatMap((_, c) =>
              row.map((src, i) => (
                <li key={`${c}-${i}`} className={styles.item}>
                  <Image src={src} alt="" width={320} height={180} sizes="320px" priority={c === 0 && r === 0} />
                </li>
              )),
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
