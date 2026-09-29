"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUp,
  ChevronDown,
  FileText,
  Languages,
  PenLine,
} from "lucide-react";
import { models } from "@/lib/content";
import { Logo } from "../logo";
import { ButtonLink } from "../ui/button";
import { ImChrome } from "react-icons/im";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

const SELECTED = "Teams lose hours every week copying answers between tabs.";
const actions = [
  {
    icon: FileText,
    label: "Summarize page",
    marks: false,
    text: "Summary: comparing several models on one prompt saves time. The article covers three habits: compare first, keep your history, and reuse good prompts.",
  },
  {
    icon: Languages,
    label: "Translate",
    marks: true,
    text: "Translated to Spanish: “Los equipos pierden horas cada semana copiando respuestas entre pestañas.”",
  },
  {
    icon: PenLine,
    label: "Rewrite selection",
    marks: true,
    text: "Rewritten: “Copying answers between tabs costs teams hours every week.”",
  },
] as const;
const ASK_REPLY =
  "From this page: the main point is that side-by-side comparison saves time. Try a summary, translation or rewrite.";
const steps = [
  "Click the toolbar icon or press the shortcut",
  "Pick an action or ask a question",
  "Get the result without leaving the tab",
];

function useTyped(full: string) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!full) {
      setOut("");
      return;
    }
    if (reduce) {
      setOut(full);
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      i += 3;
      setOut(full.slice(0, i));
      if (i >= full.length) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [full, reduce]);
  return out;
}

type Job = { label: string; text: string } | null;

function Popup({
  onRun,
  job,
  phase,
}: {
  onRun: (label: string, text: string, marks: boolean) => void;
  job: Job;
  phase: "idle" | "loading" | "done";
}) {
  const [modelIdx, setModelIdx] = useState(0);
  const [input, setInput] = useState("");
  const model = models[modelIdx];
  const typed = useTyped(phase === "done" && job ? job.text : "");
  const style = (t: string) => `${model.style} ${t}`;

  return (
    <motion.div
      role="region"
      aria-label="EchoGPT extension popup"
      id="ext-popup"
      initial={{ opacity: 0, scale: 0.96, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -6 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "top right" }}
      className="absolute top-12 right-3 z-10 w-72 rounded-2xl border border-line bg-surface p-3 shadow-xl"
    >
      <div className="flex items-center justify-between">
        <Logo />
        <label className="relative">
          <span className="sr-only">AI model</span>
          <select
            value={modelIdx}
            onChange={(e) => setModelIdx(Number(e.target.value))}
            className="h-8 appearance-none rounded-md bg-muted pr-6 pl-2 font-mono text-[11px] outline-none"
          >
            {models.map((m, i) => (
              <option key={m.tag} value={i}>
                {m.tag}
              </option>
            ))}
          </select>
          <ChevronDown
            size={12}
            aria-hidden
            className="pointer-events-none absolute top-2.5 right-2 text-sub"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {actions.map(({ icon: Icon, label, marks, text }) => (
          <motion.button
            key={label}
            whileTap={{ scale: 0.95 }}
            disabled={phase === "loading"}
            onClick={() => onRun(label, style(text), marks)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-60 ${job?.label === label ? "bg-brand text-brand-ink" : "bg-soft text-brand hover:brightness-95"}`}
          >
            <Icon size={13} aria-hidden />
            {label}
          </motion.button>
        ))}
      </div>

      <div
        className="mt-3 min-h-28 rounded-xl bg-muted p-3 text-xs leading-relaxed"
        aria-live="polite"
      >
        {phase === "idle" && (
          <p className="text-sub">Choose an action, or ask about this page.</p>
        )}
        {phase === "loading" && (
          <p className="animate-pulse text-sub">Working on it...</p>
        )}
        {phase === "done" && (
          <>
            <p className="mb-1 font-mono text-[11px] text-sub">
              {job?.label} · {model.name}
            </p>
            <p>{typed}</p>
          </>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() && phase !== "loading") {
            onRun("Ask", style(ASK_REPLY), false);
            setInput("");
          }
        }}
        className="mt-3 flex items-center gap-2 rounded-lg border border-line py-1 pr-1 pl-3 transition-colors focus-within:border-brand"
      >
        <label htmlFor="ext-input" className="sr-only">
          Ask about this page
        </label>
        <input
          id="ext-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this page..."
          autoComplete="off"
          className="h-7 flex-1 bg-transparent text-xs focus-visible:outline-none! placeholder:text-sub"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!input.trim() || phase === "loading"}
          className="grid size-7 place-items-center rounded-md bg-brand text-brand-ink disabled:opacity-30"
        >
          <ArrowUp size={14} />
        </button>
      </form>
    </motion.div>
  );
}

function BrowserDemo() {
  const [open, setOpen] = useState(true);
  const [job, setJob] = useState<Job>(null);
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [marked, setMarked] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const run = (label: string, text: string, marks: boolean) => {
    if (timer.current) clearTimeout(timer.current);
    setJob({ label, text });
    setMarked(marks);
    setPhase("loading");
    timer.current = setTimeout(() => setPhase("done"), 800);
  };

  return (
    <div className="relative min-h-104 overflow-hidden rounded-2xl border border-line bg-bg">
      <div className="flex h-11 items-center gap-2 border-b border-line bg-muted px-3">
        <span aria-hidden className="flex gap-1.5">
          <i className="size-2.5 rounded-full bg-line" />
          <i className="size-2.5 rounded-full bg-line" />
          <i className="size-2.5 rounded-full bg-line" />
        </span>
        <span
          aria-hidden
          className="mx-2 flex-1 truncate rounded-md bg-surface px-3 py-1 font-mono text-xs text-sub"
        >
          blog.example.com/compare-models
        </span>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="ext-popup"
          aria-label="Toggle EchoGPT extension"
          className={`grid size-8 place-items-center rounded-lg transition-colors ${
            open ? "bg-soft" : "hover:bg-line/60"
          }`}
        >
          <span
            aria-hidden
            className="grid size-5 place-items-center rounded-md bg-brand text-brand-ink"
          >
            <IoExtensionPuzzleOutline size={13} />
          </span>
        </motion.button>
      </div>

      <div className="max-w-md space-y-3 p-6">
        <div aria-hidden className="h-4 w-2/3 rounded-full bg-line" />
        <div aria-hidden className="h-2 w-full rounded-full bg-line/70" />
        <motion.p
          animate={{
            backgroundColor: marked ? "var(--soft)" : "rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.3 }}
          className="-mx-1 rounded px-1 text-sm leading-relaxed"
        >
          {SELECTED}
        </motion.p>
        <div aria-hidden className="h-2 w-4/5 rounded-full bg-line/70" />
        <div aria-hidden className="h-2 w-full rounded-full bg-line/70" />
        <div aria-hidden className="h-2 w-3/5 rounded-full bg-line/70" />
      </div>

      <AnimatePresence>
        {open && <Popup onRun={run} job={job} phase={phase} />}
      </AnimatePresence>
    </div>
  );
}

export function Extension() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="extension"
        aria-labelledby="ext-h"
        className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1fr_1.15fr]"
      >
        <div>
          <h2
            id="ext-h"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Your AI, one shortcut away
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-sub">
            Summarize a page, translate a paragraph or rewrite a selection
            without leaving the tab. Chats sync with the web app.
          </p>
          <ol className="mt-6 space-y-3 text-sm">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-6 shrink-0 place-items-center rounded-full bg-soft font-mono text-xs text-brand"
                >
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj">
              <ImChrome size={16} /> Add to Chrome
            </ButtonLink>
            <p className="flex items-center gap-1.5 text-xs text-sub">
              <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono">
                Ctrl
              </kbd>
              <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono">
                Shift
              </kbd>
              <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono">
                E
              </kbd>
            </p>
          </div>
        </div>
        <BrowserDemo />
      </section>
    </MotionConfig>
  );
}
