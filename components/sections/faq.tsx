"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import { Section } from "../ui/section";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" title="Questions, answered">
      <div className="max-w-3xl divide-y divide-line border-y border-line">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <h3>
                <button
                  id={`faq-b-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-p-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-display font-semibold"
                >
                  {f.q}
                  <Plus
                    size={18}
                    aria-hidden
                    className={`shrink-0 text-brand transition-transform ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-p-${i}`}
                    role="region"
                    aria-labelledby={`faq-b-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed text-sub">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
