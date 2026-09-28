"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Message } from "./use-chat-demo";

type Props = {
  messages: Message[];
  typed: string;
  busy: boolean;
  pendingModel?: string;
};

const enter = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25 },
};

export function MessageList({ messages, typed, busy, pendingModel }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [messages.length, typed, reduce]);

  return (
    <div
      ref={ref}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      className="h-72 space-y-5 overflow-y-auto p-5 scrollbar-none [&::-webkit-scrollbar]:hidden"
    >
      {messages.map((m) =>
        m.role === "user" ? (
          <motion.p
            key={m.id}
            {...enter}
            className="ml-auto w-fit max-w-[85%] rounded-2xl bg-muted px-4 py-2.5 text-sm"
          >
            {m.text}
          </motion.p>
        ) : (
          <motion.div key={m.id} {...enter} className="max-w-[92%]">
            <p className="mb-1 font-mono text-xs text-sub">{m.model}</p>
            <p className="text-sm leading-relaxed">{m.text}</p>
          </motion.div>
        ),
      )}
      {busy && (
        <div className="max-w-[92%]">
          <p className="mb-1 font-mono text-xs text-sub">{pendingModel}</p>
          <p className="text-sm leading-relaxed">
            {typed || <span className="text-sub">Thinking...</span>}
          </p>
        </div>
      )}
    </div>
  );
}
