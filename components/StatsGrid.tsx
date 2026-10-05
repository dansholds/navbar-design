"use client";

import { useEffect, useRef, useState } from "react";
import CountUp, { type StatFormat } from "./CountUp";
import styles from "./StatsGrid.module.css";

export type StatItem = { label: string; value: number; format: string; delta?: string };

type Props = { period: string; updated: string; items: StatItem[] };

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export default function StatsGrid({ period, updated, items }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.wrap} ${inView ? styles.in : ""}`}>
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <p className={styles.eyebrow}>Stats</p>
          <h2 className={styles.h2}>By the numbers</h2>
        </div>
        <p className={styles.period}>
          {period} · updated {formatDate(updated)}
        </p>
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.label} className={styles.cell}>
            <span className={styles.bar} aria-hidden="true" />
            <p className={styles.label}>{item.label}</p>
            <div className={styles.figure}>
              <p className={styles.value}>
                <CountUp value={item.value} format={item.format as StatFormat} />
              </p>
              {item.delta && <p className={styles.delta}>{item.delta}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
