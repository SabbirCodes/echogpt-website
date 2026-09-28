"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Check, Quote, Trash2 } from "lucide-react";
import { why, quotes } from "@/lib/content";
import { Section } from "../ui/section";

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring", stiffness: 500, damping: 36 } as const;
const rowClass = "flex w-full items-center justify-between gap-4 border-b border-line py-4 text-left";

const SEGMENT = 60; 
const TOP_OFFSET = 96; 


function usePinnedSteps(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 96px", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(v * count)));
    setActive((cur) => (cur === next ? cur : next));
  });

  const goTo = (index: number) => {
    const el = ref.current;
    if (!el) return;
    const start = el.getBoundingClientRect().top + window.scrollY - TOP_OFFSET;
    const distance = el.offsetHeight - (window.innerHeight - TOP_OFFSET);
    window.scrollTo({ top: start + distance * ((index + 0.5) / count), behavior: reduce ? "auto" : "smooth" });
  };

  return { ref, active, progress: scrollYProgress, goTo };
}

function LockInVisual() {
  const models = ["GPT-5.6 Sol", "Kimi K3", "Qwen 3.8 Max"];
  const [active, setActive] = useState(0);
  return (
    <div>
      <div role="radiogroup" aria-label="Model" className="flex flex-wrap gap-x-6 border-b border-line">
        {models.map((m, i) => (
          <button key={m} role="radio" aria-checked={i === active} onClick={() => setActive(i)}
            className={`relative pb-3 font-mono text-xs transition-colors ${i === active ? "text-ink" : "text-sub hover:text-ink"}`}>
            {m}
            {i === active && <motion.span layoutId="lockin-line" transition={spring} className="absolute inset-x-0 -bottom-px h-0.5 bg-brand" />}
          </button>
        ))}
      </div>
      <p className="mt-8 text-sm text-sub">Draft a launch email.</p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} aria-live="polite"
          className="mt-3 max-w-sm font-display text-xl leading-snug font-semibold">
          Same chat, new model. Your history stays right here.
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

const shortcuts = [
  { keys: ["Ctrl", "K"], label: "Search chats" },
  { keys: ["Ctrl", "Shift", "E"], label: "Open the extension" },
  { keys: ["/"], label: "Focus the prompt" },
];

function SpeedVisual() {
  const [hit, setHit] = useState<number | null>(null);
  useEffect(() => {
    if (hit === null) return;
    const t = setTimeout(() => setHit(null), 900);
    return () => clearTimeout(t);
  }, [hit]);

  return (
    <div className="border-t border-line">
      {shortcuts.map(({ keys, label }, i) => (
        <button key={label} onClick={() => setHit(i)} className={`${rowClass} group`}>
          <span className="text-sm transition-colors group-hover:text-brand">{label}</span>
          <span className="flex items-center gap-1">
            {hit === i
              ? <Check size={14} className="text-brand" aria-label="Done" />
              : keys.map((k) => <kbd key={k} className="rounded border border-line px-1.5 py-0.5 font-mono text-xs text-sub">{k}</kbd>)}
          </span>
        </button>
      ))}
    </div>
  );
}

const seedChats = ["Contract review", "Resume feedback", "Weekly report"];

function PrivacyVisual() {
  const [chats, setChats] = useState(seedChats);
  return (
    <div className="border-t border-line">
      <ul>
        <AnimatePresence initial={false} mode="popLayout">
          {chats.map((c) => (
            <motion.li key={c} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} className={rowClass}>
              <span className="text-sm">{c}</span>
              <button onClick={() => setChats((list) => list.filter((x) => x !== c))} aria-label={`Delete ${c}`} className="text-sub transition-colors hover:text-brand">
                <Trash2 size={15} />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {chats.length === 0 && (
        <p className="flex items-center justify-between py-4 text-sm text-sub">
          Nothing stored.
          <button onClick={() => setChats(seedChats)} className="font-medium text-brand">Restore demo</button>
        </p>
      )}
    </div>
  );
}

function SyncVisual() {
  const [count, setCount] = useState(2);
  return (
    <div>
      <div className="grid grid-cols-2 divide-x divide-line">
        {["Web app", "Chrome extension"].map((name, i) => (
          <div key={name} className={i ? "pl-6" : "pr-6"}>
            <p className="text-xs text-sub">{name}</p>
            <div className="mt-3 h-14 overflow-hidden font-display text-5xl leading-14 font-extrabold tabular-nums">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={count} className="block" initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -28, opacity: 0 }} transition={{ duration: 0.3, ease }}>
                  {count}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="text-sm text-sub">messages</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-line pt-4">
        <span className="flex items-center gap-2 text-xs text-sub">
          <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-brand" />Synced
        </span>
        <button onClick={() => setCount((v) => v + 1)} className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand">
          Send a message <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

const visuals = [<LockInVisual key="lock-in" />, <SpeedVisual key="speed" />, <PrivacyVisual key="privacy" />, <SyncVisual key="sync" />];

function ReasonList({ active, progress, onSelect }: { active: number; progress: MotionValue<number>; onSelect: (i: number) => void }) {
  return (
    <div className="relative border-l border-line">
      <motion.span aria-hidden style={{ scaleY: progress }} className="absolute inset-y-0 -left-px w-0.5 origin-top bg-brand" />
      {why.map((r, i) => {
        const on = i === active;
        return (
          <button key={r.title} onClick={() => onSelect(i)} aria-current={on ? "true" : undefined} className="block w-full py-3 pl-6 text-left lg:py-5">
            <span className="font-mono text-xs text-sub">{String(i + 1).padStart(2, "0")}</span>
            <span className={`block font-display text-xl font-semibold tracking-tight transition-colors sm:text-3xl ${on ? "text-ink" : "text-sub/60 hover:text-ink"}`}>{r.title}</span>
            <AnimatePresence initial={false}>
              {on && (
                <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }} className="block overflow-hidden">
                  <span className="block max-w-sm pt-2 leading-relaxed text-sub">{r.body}</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

function ReasonStage({ active }: { active: number }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="min-h-64 lg:pt-6" aria-label="Interactive preview">
      <p className="mb-6 font-mono text-xs text-sub">{pad(active + 1)} / {pad(why.length)}</p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22, ease }}>
          {visuals[active]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


const initials = (name: string) => name.split(" ").map((p) => p[0]).join("").slice(0, 2);

function TestimonialCard({ text, name, role }: { text: string; name: string; role: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 65%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <motion.figure ref={ref} style={{ opacity, y }}
      className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-brand/50">
      <div>
        <Quote size={20} aria-hidden className="text-brand" />
        <blockquote className="mt-4 leading-relaxed">{text}</blockquote>
      </div>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-5">
        <span aria-hidden className="grid size-9 place-items-center rounded-full bg-soft text-xs font-semibold text-brand">{initials(name)}</span>
        <span className="text-sm">
          <span className="block font-semibold">{name}</span>
          <span className="text-sub">{role}</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

/* ============================== Section ============================== */
export function Why() {
  const { ref, active, progress, goTo } = usePinnedSteps(why.length);

  return (
    <MotionConfig reducedMotion="user">
      <Section id="why" title="Why people choose EchoGPT">
        {/* Tall wrapper creates the scroll distance; the inner stage stays pinned. */}
        <div ref={ref} style={{ height: `calc(${why.length * SEGMENT}svh + 100svh - 6rem)` }}>
          <div className="sticky top-24 flex h-[calc(100svh-6rem)] flex-col justify-center">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
              <ReasonList active={active} progress={progress} onSelect={goTo} />
              <ReasonStage active={active} />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-xl font-semibold tracking-tight">What people say</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {quotes.map((q) => <TestimonialCard key={q.name} {...q} />)}
          </div>
        </div>
      </Section>
    </MotionConfig>
  );
}