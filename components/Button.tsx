import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "./Icons";
import styles from "./Button.module.css";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "large";
  arrow?: boolean;
  block?: boolean;
  className?: string;
  external?: boolean;
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  arrow = false,
  block = false,
  className,
  external,
}: Props) {
  const cls = [
    styles.button,
    styles[variant],
    size === "large" ? styles.large : "",
    block ? styles.block : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className={styles.icon}>
          <ArrowUpRight size={16} />
        </span>
      )}
    </>
  );

  const isExternal = external ?? /^(https?:|mailto:)/.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        className={cls}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener" : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
