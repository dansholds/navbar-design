import type { Tab } from "@/components/CategoryTabs";
import { styles, types } from "./content";

export const typeTabs: Tab[] = [
  { label: "All", href: "/navbars" },
  ...types.map((t) => ({ label: t.title, href: `/type/${t.slug}` })),
];

export const styleTabs: Tab[] = styles.map((s) => ({ label: s.title, href: `/style/${s.slug}` }));
