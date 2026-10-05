import { SITE_URL, navbars, styles, types } from "@/lib/content";

export const dynamic = "force-static";

/** llms.txt: a plain-text map of the directory for AI crawlers and assistants. */
export async function GET() {
  const byStyle = (slug: string) => navbars.filter((n) => n.styles.includes(slug));
  const byType = (slug: string) => navbars.filter((n) => n.types.includes(slug));
  const lines: string[] = [
    "# Navbar Design",
    "",
    "> A hand-picked directory of the best website navigation bars on the internet, run by Happy Pizza Studio. Every entry has a screenshot, a short write-up, style and type tags and a link to the live site.",
    "",
    `Site: ${SITE_URL}/`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "Submit a navbar: " + `${SITE_URL}/submit`,
    "Contact: https://x.com/pizzaboy",
    "",
    "## Navbar types",
    "",
    ...types.map((t) => `- [${t.title} navbars](${SITE_URL}/type/${t.slug}): ${t.description} (${byType(t.slug).length} sites)`),
    "",
    "## Navbar styles",
    "",
    ...styles.map((s) => `- [${s.title} navbars](${SITE_URL}/style/${s.slug}): ${s.description} (${byStyle(s.slug).length} sites)`),
    "",
    `## All navbars (${navbars.length}, newest first)`,
    "",
    ...navbars.map((n) => {
      const tags = [...n.styles, ...n.types].join(", ");
      const desc = n.description.replace(/\s+/g, " ").trim();
      return `- [${n.title}](${SITE_URL}/navbars/${n.slug}) — ${desc} Tags: ${tags}. Site: ${n.website.split("?")[0]}`;
    }),
    "",
    "## Other pages",
    "",
    `- [About](${SITE_URL}/about): who curates the directory and who uses it`,
    `- [Submit](${SITE_URL}/submit): how to submit a navbar, with FAQ`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
