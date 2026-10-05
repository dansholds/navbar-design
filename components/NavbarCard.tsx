import Image from "next/image";
import Link from "next/link";
import type { Navbar } from "@/lib/content";
import styles from "./NavbarCard.module.css";

type Props = {
  navbar: Navbar;
  sizes?: string;
  priority?: boolean;
};

export default function NavbarCard({ navbar, sizes, priority }: Props) {
  return (
    <Link href={`/navbars/${navbar.slug}`} className={styles.card} aria-label={navbar.title}>
      <div className={styles.imageWrap}>
        <figure className={styles.figure}>
          <Image
            src={navbar.image}
            alt={`${navbar.title} navbar`}
            width={navbar.imageWidth}
            height={navbar.imageHeight}
            sizes={sizes ?? "(max-width: 809px) 50vw, (max-width: 1199px) 50vw, 33vw"}
            priority={priority}
          />
        </figure>
      </div>
      <div className={styles.text}>
        <p className={styles.title}>{navbar.title}</p>
        <p className={styles.titleHover} aria-hidden="true">
          {navbar.title}
        </p>
      </div>
    </Link>
  );
}
