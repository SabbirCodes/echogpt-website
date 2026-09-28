"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

const spring = { type: "spring", stiffness: 300, damping: 28 } as const;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-surface text-ink transition-colors hover:bg-muted"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? "sun" : "moon"}
            initial={{ rotate: -35, scale: 0.85, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 35, scale: 0.85, opacity: 0 }}
            transition={spring}
            className="grid place-items-center"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
