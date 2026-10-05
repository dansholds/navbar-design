import navbarsJson from "@/content/navbars.json";
import categoriesJson from "@/content/categories.json";

export type Navbar = {
  slug: string;
  title: string;
  description: string;
  website: string;
  styles: string[];
  types: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  featured: boolean;
};

export type Category = {
  slug: string;
  title: string;
  description: string;
};

export const SITE_URL = "https://navbar.design";
export const SITE_NAME = "Navbar Design";
export const DEFAULT_TITLE = "Navbar Design – Curated Navbar Gallery & Inspiration";
export const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630 };
export const DEFAULT_DESCRIPTION =
  "Discover Navbar Design, a free inspiration hub featuring a handpicked directory of standout website navigation bars and menu designs from across the web.";

/** All navbars, newest first (the order they are listed in content/navbars.json). */
export const navbars: Navbar[] = navbarsJson as Navbar[];
export const styles: Category[] = categoriesJson.styles;
export const types: Category[] = categoriesJson.types;

export function getNavbar(slug: string): Navbar | undefined {
  return navbars.find((n) => n.slug === slug);
}

export function getStyle(slug: string): Category | undefined {
  return styles.find((s) => s.slug === slug);
}

export function getType(slug: string): Category | undefined {
  return types.find((t) => t.slug === slug);
}

export function navbarsByStyle(slug: string): Navbar[] {
  return navbars.filter((n) => n.styles.includes(slug));
}

export function navbarsByType(slug: string): Navbar[] {
  return navbars.filter((n) => n.types.includes(slug));
}

export function featuredNavbars(): Navbar[] {
  return navbars.filter((n) => n.featured);
}

export function latestNavbars(count: number): Navbar[] {
  return navbars.slice(0, count);
}

/** The arrow on a detail page points at the next-newest entry; the newest entry points at the one after it. */
export function nextNavbar(slug: string): Navbar | undefined {
  const i = navbars.findIndex((n) => n.slug === slug);
  if (i < 0) return undefined;
  return i === 0 ? navbars[1] : navbars[i - 1];
}

/** Related = the nine newest navbars, excluding the current one. */
export function relatedNavbars(slug: string, count = 9): Navbar[] {
  return navbars.filter((n) => n.slug !== slug).slice(0, count);
}

export function categoryTitle(c: Category, kind: "style" | "type"): string {
  void kind;
  return `${c.title} Navbars`;
}
