import Script from "next/script";
import styles from "@/app/submit/submit.module.css";

/**
 * Submission form. When NEXT_PUBLIC_TALLY_FORM_ID is set the Tally form is
 * embedded (set the form's redirect-on-completion to /thank-you in Tally).
 * Without it, the form is rendered greyed out with an "offline" notice.
 */
export default function SubmitForm() {
  const formId = process.env.NEXT_PUBLIC_TALLY_FORM_ID;

  if (formId) {
    const src = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
    return (
      <div className={styles.formWrap}>
        <iframe
          className={styles.tally}
          data-tally-src={src}
          src={src}
          loading="lazy"
          title="Navbar submission"
          width="100%"
          height="240"
        />
        <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
      </div>
    );
  }

  return (
    <div className={styles.formWrap}>
      <form className={`${styles.form} ${styles.offline}`} aria-disabled="true">
        <label className={styles.field}>
          <span className="sr-only">Link</span>
          <input className={styles.input} type="url" name="website" placeholder="Link" disabled />
        </label>
        <label className={styles.field}>
          <span className="sr-only">Your email</span>
          <input className={styles.input} type="email" name="email" placeholder="Your email" disabled />
        </label>
        <button type="button" className={styles.submit} disabled>
          Submit
        </button>
      </form>
      <p className={styles.offlineNote} role="status">
        Submissions are currently offline
      </p>
    </div>
  );
}
