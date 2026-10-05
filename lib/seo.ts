import { SITE_NAME, SITE_URL, type Category, type Navbar } from "./content";

export const ORG = {
  "@type": "Organization",
  "@id": "https://happypizza.studio/#organization",
  name: "Happy Pizza Studio",
  url: "https://happypizza.studio",
};

export const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  description:
    "A hand-picked directory of the best website navigation bars on the internet, with screenshots, styles and types for every entry.",
  inLanguage: "en",
  publisher: { "@id": ORG["@id"] },
};

/** Share-card image served through the image optimiser at 1200px instead of the raw source file. */
export function shareImage(n: Navbar) {
  const width = Math.min(1200, n.imageWidth);
  const height = Math.round((n.imageHeight / n.imageWidth) * width);
  return {
    url: `${SITE_URL}/_next/image?url=${encodeURIComponent(n.image)}&w=1200&q=75`,
    width,
    height,
    alt: `${n.title} navbar`,
  };
}

export function abs(path: string): string {
  return `${SITE_URL}${path}`;
}

/** Trim a description to a search-snippet length at a sentence or word boundary. */
export function snippet(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const sentence = cut.lastIndexOf(". ");
  if (sentence > max * 0.6) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function list(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} & ${items[items.length - 1]}`;
}

const STYLE_ADJECTIVE: Record<string, string> = {
  minimalism: "minimalist",
  "3d": "3D",
  animated: "animated",
  grid: "grid",
  illustrated: "illustrated",
  loud: "loud",
  monochromatic: "monochromatic",
  retro: "retro",
  typographic: "typographic",
};

export function navbarTitle(n: Navbar, styleNames: string[], typeNames: string[]): string {
  void styleNames;
  const adjectives = n.styles.map((s) => STYLE_ADJECTIVE[s] ?? s);
  const kind = [list(adjectives), list(typeNames.map((t) => t.toLowerCase()))].filter(Boolean).join(" ");
  return `${n.title} navbar: ${kind} navigation example`;
}

export function navbarDescription(n: Navbar, styleNames: string[], typeNames: string[]): string {
  const host = (() => {
    try {
      return new URL(n.website).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  })();
  const context = `${list(styleNames)} ${list(typeNames).toLowerCase()} navbar from ${host}, with screenshot and link, on ${SITE_NAME}.`;
  const base = n.description.replace(/\s+/g, " ").trim();
  const sentence = /[.!?…]$/.test(base) ? base : `${base}.`;
  return snippet(`${sentence} ${context}`);
}

export function categoryTitle(c: Category, kind: "style" | "type", count: number): string {
  const noun = count === 1 ? "site" : "sites";
  const what = kind === "type" ? "navbar examples" : "navbar designs";
  return count > 0 ? `${c.title} ${what} & inspiration (${count} ${noun})` : `${c.title} ${what} & inspiration`;
}

export function categoryDescription(c: Category, kind: "style" | "type", count: number): string {
  const word = kind === "type" ? c.title.toLowerCase() : `${c.title.toLowerCase()}-style`;
  const tail =
    count > 0
      ? `${count} hand-picked ${word} navbar ${count === 1 ? "example" : "examples"} with screenshots and links.`
      : `Hand-picked ${word} navbar examples with screenshots and links.`;
  return snippet(`${c.description} ${tail}`, 160);
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function navbarLd(n: Navbar, styleNames: string[], typeNames: string[]) {
  return {
    "@type": ["WebPage", "CreativeWork"],
    "@id": abs(`/navbars/${n.slug}`),
    url: abs(`/navbars/${n.slug}`),
    name: `${n.title} navbar`,
    headline: `${n.title} navbar`,
    description: n.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE["@id"] },
    publisher: { "@id": ORG["@id"] },
    about: { "@type": "WebSite", name: n.title, url: n.website.split("?")[0] },
    image: { "@type": "ImageObject", url: abs(n.image), width: n.imageWidth, height: n.imageHeight },
    primaryImageOfPage: { "@type": "ImageObject", url: abs(n.image) },
    keywords: [...styleNames.map((s) => `${s} navbar`), ...typeNames.map((t) => `${t} navbar`), "navigation design"].join(
      ", ",
    ),
    genre: [...styleNames, ...typeNames],
  };
}

export function collectionLd(opts: { path: string; name: string; description: string; navbars: Navbar[] }) {
  return {
    "@type": "CollectionPage",
    "@id": abs(opts.path),
    url: abs(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE["@id"] },
    publisher: { "@id": ORG["@id"] },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.navbars.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: opts.navbars.map((n, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${n.title} navbar`,
        url: abs(`/navbars/${n.slug}`),
        image: abs(n.image),
      })),
    },
  };
}

export function faqLd(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
