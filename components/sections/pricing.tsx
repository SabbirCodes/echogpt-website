"use client";

import { MotionConfig, motion, type Variants } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { includedModels, plans } from "@/lib/content";
import { Section } from "../ui/section";
import { ButtonLink } from "../ui/button";

const ease = [0.22, 1, 0.36, 1] as const;
const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const perMonth = (price: number, months: number) => (price / months).toFixed(2);
const cheapest = Math.min(...plans.map((p) => p.price / p.months));

export function Pricing() {
  return (
    <MotionConfig reducedMotion="user">
      <Section
        id="pricing"
        title="Simple pricing"
        intro="Every plan unlocks the same Pro models. Pick the billing cycle that fits, and pay less per month the longer you commit."
      >
        <div className="mb-10 rounded-2xl border border-line bg-surface p-6">
          <p className="text-sm font-semibold">Included in every plan</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {includedModels.map((m) => (
              <li
                key={m}
                className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-sub"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {plans.map((p) => {
            const monthly = perMonth(p.price, p.months);
            const isCheapest = Number(monthly) === cheapest;
            return (
              <motion.div
                key={p.id}
                variants={card}
                className={`flex flex-col rounded-2xl border p-6 ${p.featured ? "border-brand bg-soft" : "border-line bg-surface"}`}
              >
                {p.featured && (
                  <span className="mb-4 inline-flex w-fit items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-brand-ink">
                    <Sparkles size={12} aria-hidden /> Best value
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-xs text-sub">{p.billedAs}</p>

                <p className="mt-4 font-display text-3xl font-extrabold">
                  ${p.price}
                  <span className="ml-1.5 text-sm font-medium text-sub">
                    /{p.months === 1 ? "mo" : `${p.months} mo`}
                  </span>
                </p>
                <p
                  className={`mt-1 text-xs ${isCheapest ? "font-semibold text-brand" : "text-sub"}`}
                >
                  {p.months > 1 ? `= $${monthly}/mo` : "billed monthly"}
                </p>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-sub">
                  {p.blurb}
                </p>

                <ButtonLink
                  href="https://echogpt.live/login"
                  variant={p.featured ? "primary" : "ghost"}
                  className="mt-6"
                >
                  {p.cta}
                </ButtonLink>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="mt-6 flex items-center gap-1.5 text-xs text-sub">
          <Check size={13} className="text-brand" aria-hidden /> Cancel anytime.
          No hidden fees.
        </p>
      </Section>
    </MotionConfig>
  );
}
