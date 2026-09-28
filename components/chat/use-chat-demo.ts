"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { fallbackReply, topics, type Model } from "@/lib/content";

export type Message = {
  id: number;
  role: "user" | "ai";
  text: string;
  model?: string;
};
type Pending = { text: string; model: string };

const THINK_MS = 350;
const TYPE_MS = 22;
const TYPE_STEP = 3;
const GREETING = "Hi! Pick a model, then ask me anything or try a suggestion.";

function makeReply(prompt: string, style: string) {
  const q = prompt.toLowerCase();
  const hit = topics.find((t) => t.keys.some((k) => q.includes(k)));
  return `${style} ${hit ? hit.text : fallbackReply}`;
}

export function useChatDemo(model: Model) {
  const reduce = useReducedMotion();
  const nextId = useRef(1);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "ai", model: model.name, text: GREETING },
  ]);
  const [pending, setPending] = useState<Pending | null>(null);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!pending) return;

    const finish = () => {
      setMessages((m) => [
        ...m,
        {
          id: nextId.current++,
          role: "ai",
          text: pending.text,
          model: pending.model,
        },
      ]);
      setPending(null);
      setTyped("");
    };
    if (reduce) {
      finish();
      return;
    }

    let interval: ReturnType<typeof setInterval> | undefined;
    let i = 0;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += TYPE_STEP;
        setTyped(pending.text.slice(0, i));
        if (i >= pending.text.length) {
          clearInterval(interval);
          finish();
        }
      }, TYPE_MS);
    }, THINK_MS);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [pending, reduce]);

  const send = useCallback(
    (text: string) => {
      const t = text.trim();
      if (!t || pending) return;
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "user", text: t },
      ]);
      setPending({ text: makeReply(t, model.style), model: model.name });
    },
    [model, pending],
  );

  return {
    messages,
    typed,
    busy: pending !== null,
    pendingModel: pending?.model,
    send,
  };
}
