"use client";

import { useEffect, useRef, type ElementType } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** total duration in ms */
  duration?: number;
};

/**
 * Renders the final text on the server (so crawlers always see it) and, after
 * hydration, plays a short decode/scramble animation like the Framer original.
 */
export default function Scramble({ text, as: Tag = "span", className, duration = 900 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const start = performance.now();
    const len = text.length;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const resolved = Math.floor(t * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        const ch = text[i];
        if (ch === " " || i < resolved) out += ch;
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = out;
      if (t < 1) frame = requestAnimationFrame(tick);
      else el.textContent = text;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, duration]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text}
    </Tag>
  );
}
