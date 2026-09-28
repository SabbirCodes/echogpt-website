"use client";

import { useState, useRef, useEffect, useId, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check } from "lucide-react";
import type { Model } from "@/lib/content";

type Props = {
  models: Model[];
  value: number;
  onChange: (i: number) => void;
};

export function ModelSelect({ models, value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedModel = models[value] ?? models[0];

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(value);
    }
  }, [isOpen, value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Full Keyboard Accessibility Logic
  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement | HTMLUListElement>,
  ) => {
    if (!isOpen) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % models.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + models.length) % models.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onChange(activeIndex);
        setIsOpen(false);
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative inline-block w-full sm:w-auto">
      <span className="sr-only" id={`${listboxId}-label`}>
        Select AI model
      </span>

      <motion.button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${listboxId}-label`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        whileTap={{ scale: 0.98 }}
        className="flex h-9 w-full sm:w-auto items-center justify-between gap-2 rounded-lg bg-transparent px-2.5 text-sm font-semibold text-ink transition-colors hover:bg-muted focus-visible:bg-muted outline-none"
      >
        <span className="truncate">{selectedModel?.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex items-center justify-center text-sub shrink-0"
        >
          <ChevronDown size={14} aria-hidden />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-xs sm:hidden"
            />

            {/* Options Menu */}
            <motion.ul
              id={listboxId}
              role="listbox"
              tabIndex={-1}
              aria-activedescendant={`${listboxId}-opt-${activeIndex}`}
              onKeyDown={handleKeyDown}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed inset-x-3 bottom-3 z-50 max-h-[60vh] overflow-y-auto rounded-xl border border-line bg-surface p-1.5 shadow-xl sm:absolute sm:inset-auto sm:left-0 sm:top-full sm:mt-1.5 sm:w-52 sm:max-h-60"
            >
              {models.map((m, i) => {
                const isSelected = value === i;
                const isFocused = activeIndex === i;

                return (
                  <motion.li
                    key={m.tag ?? i}
                    id={`${listboxId}-opt-${i}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(i);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`relative flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors select-none ${
                      isSelected ? "text-brand font-semibold" : "text-ink"
                    } ${isFocused ? "bg-muted" : ""}`}
                  >
                    <span className="truncate">{m.name}</span>

                    {isSelected && (
                      <motion.span
                        layoutId="active-check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className="text-brand shrink-0 ml-2"
                      >
                        <Check size={14} aria-hidden />
                      </motion.span>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
