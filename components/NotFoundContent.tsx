"use client";

import Image from "next/image";
import { useRef } from "react";
import Button from "./Button";
import styles from "./NotFoundContent.module.css";

/** 404 graphic (static render of the original 3D "404") that tilts with the pointer. */
export default function NotFoundContent() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-y * 14).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <div className={styles.scene} onMouseMove={onMove} onMouseLeave={onLeave}>
          <div ref={ref} className={styles.graphic}>
            <Image src="/images/404.png" alt="404" width={1200} height={800} sizes="(max-width: 640px) 100vw, 600px" priority />
          </div>
        </div>
        <Button href="/" variant="primary" size="large">
          Go back home
        </Button>
      </div>
    </section>
  );
}
