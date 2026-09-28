"use client";

import { MotionConfig, Variants, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../ui/button";
import { ImChrome } from "react-icons/im";

const ease = [0.22, 1, 0.36, 1] as const;
const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Cta() {
  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="cta-h" className="mx-auto max-w-6xl px-5 py-12">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-3xl bg-brand px-6 py-16 text-center text-brand-ink sm:px-12 sm:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative">
            <h2
              id="cta-h"
              className="mx-auto max-w-xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Try every model in one chat
            </h2>
            <p className="mx-auto mt-4 max-w-md text-brand-ink/85">
              Free to start. Your first answer is seconds away.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink
                href="https://echogpt.live"
                className="bg-white! text-[#3a1a99]! shadow-sm"
              >
                Start chatting free <ArrowRight size={16} />
              </ButtonLink>
              <ButtonLink
                href="https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj"
                className="border! border-white/30! bg-transparent! text-brand-ink! hover:bg-white/10!"
              >
                <ImChrome size={16} /> Add to Chrome
              </ButtonLink>
            </div>

            <p className="mt-6 text-xs text-brand-ink/70">
              No credit card needed · Cancel anytime
            </p>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
