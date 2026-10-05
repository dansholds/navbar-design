import Button from "./Button";
import styles from "./ThanksPage.module.css";

export default function ThanksPage({ message }: { message: string }) {
  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <h1 className="display">hurray!</h1>
        <div className={styles.text}>
          <p className={styles.lead}>{message}</p>
          <Button href="/" variant="primary" size="large" arrow>
            Discover navbars
          </Button>
        </div>
      </div>
    </section>
  );
}
