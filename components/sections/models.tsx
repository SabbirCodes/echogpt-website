"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, Check, Copy, Search } from "lucide-react";
import { models, moreModels } from "@/lib/content";
import { Section } from "../ui/section";
import { ButtonLink } from "../ui/button";

const ease = [0.22, 1, 0.36, 1] as const;
const allNames = [...models.map((m) => m.name), ...moreModels];

function MarqueeRow({
  items,
  reverse = false,
  duration = 70,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const controls = useRef<ReturnType<typeof animate> | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduce) return;
    const c = animate(
      ref.current,
      { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] },
      { duration, ease: "linear", repeat: Infinity },
    );
    controls.current = c;
    return () => c.stop();
  }, [reverse, duration, reduce]);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => controls.current?.pause()}
      onMouseLeave={() => controls.current?.play()}
    >
      <ul ref={ref} className="flex w-max gap-2 py-1">
        {[...items, ...items].map((n, i) => (
          <li
            key={i}
            className="rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs text-sub"
          >
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CopyId({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);
  return (
    <button
      onClick={() =>
        navigator.clipboard?.writeText(value).then(() => setCopied(true))
      }
      aria-label={`Copy model id ${value}`}
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-line px-3 font-mono text-xs text-sub transition-colors hover:border-brand hover:text-ink"
    >
      {value}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "ok" : "copy"}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.12 }}
        >
          {copied ? (
            <Check size={13} className="text-brand" />
          ) : (
            <Copy size={13} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function Explorer({
  active,
  setActive,
}: {
  active: number;
  setActive: (i: number) => void;
}) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const m = models[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = ["ArrowDown", "ArrowRight"].includes(e.key)
      ? 1
      : ["ArrowUp", "ArrowLeft"].includes(e.key)
        ? -1
        : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + models.length) % models.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-[280px_1fr]">
      <div
        role="tablist"
        aria-label="Featured models"
        onKeyDown={onKeyDown}
        className="flex gap-1 overflow-x-auto border-b border-line p-2 lg:flex-col lg:overflow-visible lg:border-r lg:border-b-0"
      >
        {models.map((x, i) => (
          <button
            key={x.tag}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`tab-${x.tag}`}
            aria-selected={i === active}
            aria-controls="model-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className="relative shrink-0 rounded-lg px-3 py-2.5 text-left whitespace-nowrap transition-colors hover:bg-muted/60"
          >
            {i === active && (
              <motion.span
                layoutId="model-tab"
                transition={{ type: "spring", stiffness: 500, damping: 36 }}
                className="absolute inset-0 rounded-lg bg-muted"
              />
            )}
            <span className="relative block text-sm font-semibold">
              {x.name}
            </span>
            <span className="relative block text-xs text-sub">{x.maker}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="model-panel"
        aria-labelledby={`tab-${m.tag}`}
        className="min-h-80 p-6 sm:p-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={m.tag}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease }}
            className="flex h-full flex-col"
          >
            <p className="text-xs text-sub">{m.maker}</p>
            <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">
              {m.name}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-sub">
              {m.blurb}
            </p>

            <div className="mt-6 space-y-3 rounded-xl bg-muted p-4">
              <p className="ml-auto w-fit rounded-xl bg-surface px-3 py-2 text-sm">
                Summarize this contract.
              </p>
              <div>
                <p className="mb-1 font-mono text-xs text-sub">{m.name}</p>
                <p className="text-sm leading-relaxed">{m.style}</p>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
              <ButtonLink href="https://echogpt.live">
                Chat with {m.name} <ArrowRight size={16} />
              </ButtonLink>
              <CopyId value={m.tag} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Models() {
  const [active, setActive] = useState(0);
  return (
    <MotionConfig reducedMotion="user">
      <Section
        id="models"
        title={`${allNames.length}+ models, one workspace`}
        intro="Switch any time. Your chat and history come with you."
      >
        <div aria-hidden className="mb-10 space-y-2">
          <MarqueeRow items={allNames.slice(0, 20)} />
          <MarqueeRow items={allNames.slice(20)} reverse duration={80} />
        </div>
        <Explorer active={active} setActive={setActive} />
      </Section>
    </MotionConfig>
  );
}
