import type { MetadataRoute } from "next";
import { SITE_URL, navbars, styles, types } from "@/lib/content";

/** Same URL set (and order) as the original Framer sitemap, plus image entries for Google Images. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/submit", "/about", "/404", "/thank-you", "/newsletter", "/navbars", "/blog"];
  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}`,
    changeFrequency: p === "/" || p === "/navbars" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p === "/navbars" ? 0.9 : 0.4,
  }));
  for (const t of types) {
    entries.push({
      url: `${SITE_URL}/type/${t.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
      images: navbars.filter((n) => n.types.includes(t.slug)).map((n) => `${SITE_URL}${n.image}`),
    });
  }
  for (const s of styles) {
    entries.push({
      url: `${SITE_URL}/style/${s.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
      images: navbars.filter((n) => n.styles.includes(s.slug)).map((n) => `${SITE_URL}${n.image}`),
    });
  }
  for (const n of navbars) {
    entries.push({
      url: `${SITE_URL}/navbars/${n.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${SITE_URL}${n.image}`],
    });
  }
  return entries;
}
