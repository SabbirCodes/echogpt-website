"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";

type Props = { disabled: boolean; onSend: (text: string) => void };

export function ChatInput({ disabled, onSend }: Props) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSend(value);
        setValue("");
      }}
      className="m-3 flex items-center gap-2 rounded-xl border border-line py-1.5 pl-3 pr-1.5 transition-colors focus-within:border-brand"
    >
      <label htmlFor="hero-input" className="sr-only">
        Ask a question
      </label>
      <input
        id="hero-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask a question..."
        autoComplete="off"
        className="h-8 flex-1 bg-transparent text-sm placeholder:text-sub focus-visible:outline-none!"
      />
      <motion.button
        type="submit"
        whileTap={{ scale: 0.92 }}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="grid size-8 place-items-center rounded-lg bg-brand text-brand-ink transition-opacity disabled:opacity-30"
      >
        <ArrowUp size={16} />
      </motion.button>
    </form>
  );
}
