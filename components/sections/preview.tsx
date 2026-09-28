"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ImageOff } from "lucide-react";
import { previews } from "@/lib/content";
import { Section } from "../ui/section";

type Shot = (typeof previews)[number];

function Shot({ p }: { p: Shot }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className="grid h-48 place-items-center bg-muted text-center text-sm text-sub">
        <div>
          <ImageOff className="mx-auto mb-2" size={24} aria-hidden />
          Add <code className="font-mono">public{p.src}</code>
        </div>
      </div>
    );

  const img = (src: string, cls: string) => (
    <Image
      src={src}
      alt={p.alt}
      width={1920}
      height={1080}
      sizes="(min-width:1152px) 768px, 100vw"
      className={`h-auto w-full object-contain ${cls}`}
      onError={() => setFailed(true)}
    />
  );

  return p.srcDark ? (
    <>
      {img(p.src, "dark:hidden")}
      {img(p.srcDark, "hidden dark:block")}
    </>
  ) : (
    img(p.src, "")
  );
}

export function Preview() {
  const [active, setActive] = useState(0);
  const p = previews[active];

  return (
    <Section
      id="preview"
      title="See it in action"
      intro="A quick look at the workspace."
    >
      <div
        role="tablist"
        aria-label="Product screenshots"
        className="mb-6 flex gap-2 overflow-x-auto justify-center"
      >
        {previews.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={i === active}
            aria-controls="preview-panel"
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition ${
              i === active
                ? "bg-brand text-brand-ink"
                : "border border-line bg-surface text-sub hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <motion.div
        id="preview-panel"
        role="tabpanel"
        aria-labelledby={`tab-${p.id}`}
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-line bg-surface"
      >
        {/* Window Bar Header */}
        <div
          className="flex items-center gap-2 border-b border-line bg-muted px-4 py-3"
          aria-hidden
        >
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="ml-3 rounded-md bg-surface px-3 py-1 font-mono text-xs text-sub">
            echogpt.live
          </span>
        </div>


        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Shot p={p} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <p className="mt-4 text-center text-sm text-sub" aria-live="polite">
        {p.caption}
      </p>
    </Section>
  );
}