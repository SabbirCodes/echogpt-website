"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  type Variants,
} from "motion/react";
import {
  BriefcaseBusiness,
  Check,
  GitCompare,
  History,
  ImageIcon,
  ListChecks,
  Plug,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { FaGithub, FaGoogleDrive } from "react-icons/fa6";
import { SiNotion } from "react-icons/si";
import { features } from "@/lib/content";
import { Section } from "../ui/section";

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring", stiffness: 500, damping: 32 } as const;
const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

function BentoCard({
  icon: Icon,
  title,
  body,
  className = "",
  children,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.li
      variants={card}
      className={`group flex flex-col rounded-2xl border border-line bg-surface p-3 transition-colors duration-200 hover:border-brand/50 ${className}`}
    >
      <div className="flex-1 overflow-hidden rounded-xl bg-muted p-4">
        {children}
      </div>
      <div className="px-2 pt-5 pb-2">
        <div className="flex items-center gap-2.5">
          <Icon
            size={18}
            aria-hidden
            className="text-brand transition-transform duration-300 group-hover:scale-110"
          />
          <h3 className="font-display font-semibold">{title}</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-sub">{body}</p>
      </div>
    </motion.li>
  );
}

const Line = ({ w }: { w: string }) => (
  <div className={`h-1.5 rounded-full bg-line ${w}`} />
);
const rowBase =
  "flex w-full items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2.5 text-left transition-colors hover:border-brand/60";

function Counter({ value }: { value: number }) {
  const [n, setN] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const c = animate(from.current, value, {
      duration: 0.6,
      ease,
      onUpdate: (v) => setN(Math.round(v)),
    });
    from.current = value;
    return () => c.stop();
  }, [value]);
  return <>{n}%</>;
}

function CompareVisual() {
  const answers = ["GPT-5.6 Sol", "Kimi K3", "Qwen 3.8 Max"];
  const [best, setBest] = useState(1);
  return (
    <div
      role="radiogroup"
      aria-label="Pick the best answer"
      className="grid h-full grid-cols-3 gap-2.5"
    >
      {answers.map((model, i) => (
        <motion.button
          key={model}
          role="radio"
          aria-checked={best === i}
          onClick={() => setBest(i)}
          whileTap={{ scale: 0.97 }}
          className="relative flex flex-col gap-2 rounded-lg border border-line bg-surface p-3 text-left"
        >
          {best === i && (
            <motion.span
              layoutId="best-answer"
              transition={spring}
              className="absolute -inset-px rounded-lg border-2 border-brand"
            />
          )}
          <span className="relative flex items-center justify-between gap-1">
            <span className="truncate font-mono text-[11px] text-sub">
              {model}
            </span>
            <AnimatePresence>
              {best === i && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={spring}
                >
                  <Check size={13} className="text-brand" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <Line w="w-full" />
          <Line w="w-4/5" />
          <Line w="w-3/5" />
        </motion.button>
      ))}
    </div>
  );
}

function ImageVisual() {
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  useEffect(() => {
    if (phase !== "loading") return;
    const t = setTimeout(() => setPhase("done"), 1300);
    return () => clearTimeout(t);
  }, [phase]);
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2 rounded-lg border border-line bg-surface py-1.5 pr-1.5 pl-3">
        <span className="flex-1 truncate text-xs text-sub">
          A calm mountain lake at dawn
        </span>
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={phase === "loading"}
          onClick={() => setPhase("loading")}
          className="inline-flex h-7 items-center gap-1.5 rounded-md bg-brand px-2.5 text-xs font-semibold text-brand-ink disabled:opacity-60"
        >
          <Sparkles size={12} aria-hidden />
          {phase === "loading"
            ? "Generating"
            : phase === "done"
              ? "Again"
              : "Generate"}
        </motion.button>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2" aria-live="polite">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`grid min-h-12 place-items-center rounded-lg ${phase === "idle" ? "border border-dashed border-line" : phase === "loading" ? "animate-pulse bg-line" : "bg-soft"}`}
          >
            <AnimatePresence>
              {phase === "done" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, ...spring }}
                  className="text-brand"
                >
                  <ImageIcon size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConnectorsVisual() {
  const rows = [
    { icon: FaGoogleDrive, name: "Drive" },
    { icon: SiNotion, name: "Notion" },
    { icon: FaGithub, name: "GitHub" },
  ];
  const [on, setOn] = useState<Record<string, boolean>>({
    Drive: true,
    Notion: true,
    GitHub: false,
  });
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {rows.map(({ icon: Icon, name }) => (
        <button
          key={name}
          role="switch"
          aria-checked={on[name]}
          onClick={() => setOn((s) => ({ ...s, [name]: !s[name] }))}
          className={rowBase}
        >
          <Icon size={16} aria-hidden />
          <span className="flex-1 text-sm">{name}</span>
          <span className="text-xs text-sub">
            {on[name] ? "Connected" : "Connect"}
          </span>
          <span
            aria-hidden
            className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${on[name] ? "justify-end bg-brand" : "justify-start bg-line"}`}
          >
            <motion.span
              layout
              transition={spring}
              className="size-4 rounded-full bg-white shadow-sm"
            />
          </span>
        </button>
      ))}
    </div>
  );
}

function JobVisual() {
  const all = ["React", "TypeScript", "Testing"];
  const [have, setHave] = useState<string[]>(["React", "TypeScript"]);
  const score = 54 + have.length * 14;
  const toggle = (s: string) =>
    setHave((h) => (h.includes(s) ? h.filter((x) => x !== s) : [...h, s]));
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="flex items-end justify-between">
        <span className="text-xs text-sub">Resume match</span>
        <span
          className="font-display text-3xl leading-none font-extrabold tabular-nums"
          aria-live="polite"
        >
          <Counter value={score} />
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-line">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.6, ease }}
          className="h-full rounded-full bg-brand"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {all.map((s) => {
          const ok = have.includes(s);
          return (
            <motion.button
              key={s}
              aria-pressed={ok}
              onClick={() => toggle(s)}
              whileTap={{ scale: 0.94 }}
              className={`rounded-md px-2.5 py-1 text-xs transition-colors ${ok ? "bg-soft text-brand" : "border border-dashed border-line text-sub hover:border-brand hover:text-brand"}`}
            >
              {ok ? s : `+ ${s}`}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function TasksVisual() {
  const tasks = ["Weekly report", "Summarize inbox", "Draft follow-ups"];
  const [done, setDone] = useState<string[]>([
    "Weekly report",
    "Summarize inbox",
  ]);
  const toggle = (t: string) =>
    setDone((d) => (d.includes(t) ? d.filter((x) => x !== t) : [...d, t]));
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {tasks.map((t) => {
        const on = done.includes(t);
        return (
          <motion.button
            key={t}
            role="checkbox"
            aria-checked={on}
            onClick={() => toggle(t)}
            whileTap={{ scale: 0.98 }}
            className={rowBase}
          >
            <span
              className={`grid size-4 place-items-center rounded-full border transition-colors ${on ? "border-brand bg-brand text-brand-ink" : "border-line"}`}
            >
              <AnimatePresence>
                {on && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={spring}
                  >
                    <Check size={10} strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span
              className={`text-sm transition-colors ${on ? "text-sub line-through" : ""}`}
            >
              {t}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

const chats = [
  ["Contract review", "2m ago"],
  ["React bug notes", "Yesterday"],
  ["Resume feedback", "Mon"],
  ["Weekly report draft", "Mon"],
  ["Translate email", "Last week"],
];

function HistoryVisual() {
  const [q, setQ] = useState("");
  const shown = chats.filter(([t]) =>
    t.toLowerCase().includes(q.trim().toLowerCase()),
  );
  return (
    <div className="flex h-full flex-col gap-2">
      <label className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 transition-colors focus-within:border-brand">
        <Search size={13} aria-hidden className="text-sub" />
        <span className="sr-only">Search chats</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search chats"
          className="h-9 flex-1 bg-transparent text-xs outline-none placeholder:text-sub focus-visible:outline-none!"
        />
      </label>
      <ul className="min-h-28" aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map(([title, time]) => (
            <motion.li
              key={title}
              layout
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between rounded-md px-3 py-1.5 transition-colors hover:bg-surface"
            >
              <span className="text-sm">{title}</span>
              <span className="text-xs text-sub">{time}</span>
            </motion.li>
          ))}
        </AnimatePresence>
        {shown.length === 0 && (
          <li className="px-3 py-2 text-xs text-sub">No chats found</li>
        )}
      </ul>
    </div>
  );
}

type Key = (typeof features)[number]["icon"];
const layout: {
  key: Key;
  icon: LucideIcon;
  visual: React.ReactNode;
  className?: string;
}[] = [
  {
    key: "compare",
    icon: GitCompare,
    visual: <CompareVisual />,
    className: "md:col-span-2",
  },
  { key: "image", icon: ImageIcon, visual: <ImageVisual /> },
  { key: "plug", icon: Plug, visual: <ConnectorsVisual /> },
  {
    key: "job",
    icon: BriefcaseBusiness,
    visual: <JobVisual />,
    className: "md:col-span-2",
  },
  { key: "tasks", icon: ListChecks, visual: <TasksVisual /> },
  {
    key: "history",
    icon: History,
    visual: <HistoryVisual />,
    className: "lg:col-span-2",
  },
];

export function Features() {
  return (
    <MotionConfig reducedMotion="user">
      <Section
        id="features"
        title="Everything you need, in the same place"
        intro="Fewer tabs, fewer copy-pastes, better answers. Try the demos below."
      >
        <motion.ul
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {layout.map(({ key, icon, visual, className }) => {
            const { title, body } = features.find((f) => f.icon === key)!;
            return (
              <BentoCard
                key={key}
                icon={icon}
                title={title}
                body={body}
                className={className}
              >
                {visual}
              </BentoCard>
            );
          })}
        </motion.ul>
      </Section>
    </MotionConfig>
  );
}
