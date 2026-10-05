import CategoryTabs, { type Tab } from "@/components/CategoryTabs";
import NavbarGrid from "@/components/NavbarGrid";
import PageHero from "@/components/PageHero";
import type { Navbar } from "@/lib/content";
import styles from "@/app/list.module.css";

type Props = {
  title: string;
  lead: string;
  tabs: Tab[];
  activeHref: string;
  navbars: Navbar[];
};

export default function CategoryPage({ title, lead, tabs, activeHref, navbars }: Props) {
  return (
    <>
      <PageHero title={title} subtitle="navbars" lead={lead} />
      <CategoryTabs tabs={tabs} activeHref={activeHref} />
      <section className={styles.websites}>
        <div className={styles.container}>
          <NavbarGrid navbars={navbars} priorityCount={3} />
        </div>
      </section>
    </>
  );
}
