"use client";

import { useEffect, useRef } from "react";

export type StatFormat = "compact" | "percent" | "plain";

export function formatStat(value: number, format: StatFormat): string {
  if (format === "percent") return `${value % 1 === 0 ? value : value.toFixed(1)}%`;
  if (format === "compact") {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return Math.round(value).toLocaleString("en-GB");
}

type Props = { value: number; format: StatFormat; className?: string; duration?: number };

/** Renders the final figure on the server, then counts up from zero the first time it scrolls into view. */
export default function CountUp({ value, format, className, duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = formatStat(value * eased, format);
        if (t < 1) frame = requestAnimationFrame(tick);
        else el.textContent = formatStat(value, format);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, format, duration]);

  return (
    <span ref={ref} className={className}>
      {formatStat(value, format)}
    </span>
  );
}
