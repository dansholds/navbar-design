import styles from "./PageHero.module.css";

type Props = {
  /** First line of the big heading (rendered as the page h1). */
  title: string;
  /** Optional second line under the h1 (e.g. "navbars"). */
  subtitle?: string;
  lead?: string;
};

export default function PageHero({ title, subtitle, lead }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{title}</h1>
          {subtitle && <div className={styles.line}>{subtitle}</div>}
        </div>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
    </section>
  );
}
