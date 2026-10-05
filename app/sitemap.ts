import type { MetadataRoute } from "next";
import { SITE_URL, navbars, styles, types } from "@/lib/content";

/** Same URL set (and order) as the original Framer sitemap, so nothing already indexed changes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/submit", "/about", "/404", "/thank-you", "/newsletter", "/navbars", "/blog"];
  const paths = [
    ...staticPaths,
    ...types.map((t) => `/type/${t.slug}`),
    ...styles.map((s) => `/style/${s.slug}`),
    ...navbars.map((n) => `/navbars/${n.slug}`),
  ];
  return paths.map((p) => ({ url: p === "" ? `${SITE_URL}/` : `${SITE_URL}${p}` }));
}
