import type { Metadata } from "next";
import Faq from "@/components/Faq";
import Scramble from "@/components/Scramble";
import SubmitForm from "@/components/SubmitForm";
import { DEFAULT_DESCRIPTION, OG_IMAGE } from "@/lib/content";
import styles from "./submit.module.css";

const TITLE = "Navbar Design / Submit";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/submit" },
  openGraph: { type: "website", title: TITLE, description: DEFAULT_DESCRIPTION, url: "/submit", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DEFAULT_DESCRIPTION, images: [OG_IMAGE.url] },
};

const FAQ = [
  { question: "What sort of navbars can I submit?", answer: "Any! We will sort out the tagging etc too!" },
  {
    question: "How do you select which ones get featured?",
    answer: "Honestly it's personal preference, but we will rotate them often.",
  },
  {
    question: "Can I ask you to remove my navbar?",
    answer: "Sure, just send us an email or DM on X or email dan@navbar.design and we'll remove it!",
  },
];

export default function SubmitPage() {
  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <Scramble as="h1" text="Navbar Submission" className={styles.heading} />
        <SubmitForm />
        <div className={styles.faq}>
          <Scramble as="h2" text="FAQ" className={styles.faqHeading} />
          <Faq items={FAQ} />
        </div>
      </div>
    </section>
  );
}
