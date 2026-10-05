"use client";

import { useState } from "react";
import { Plus } from "./Icons";
import styles from "@/app/submit/submit.module.css";

export type FaqItem = { question: string; answer: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} className={`${styles.item} ${open ? styles.open : ""}`}>
            <button
              type="button"
              className={styles.question}
              aria-expanded={open}
              aria-controls={`faq-${i}`}
              onClick={() => setOpenIndex(open ? null : i)}
            >
              <span>{item.question}</span>
              <span className={styles.icon}>
                <Plus size={24} />
              </span>
            </button>
            <div id={`faq-${i}`} className={styles.answer} aria-hidden={!open}>
              <div className={styles.answerInner}>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
