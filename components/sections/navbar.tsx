"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "../logo";
import { ThemeToggle } from "../theme-toggle";
import { ButtonLink } from "../ui/button";

const ease = [0.22, 1, 0.36, 1] as const;
const links = [
  ["Features", "#features"],
  ["Models", "#models"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-bg/80 backdrop-blur-lg transition-shadow duration-300 ${
        scrolled
          ? "border-line shadow-[0_1px_0_0_var(--line)]"
          : "border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
      >
        <a href="#top" aria-label="EchoGPT home" className="rounded-lg">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-sub transition-colors hover:text-ink"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink
            href="https://echogpt.live/login"
            className="hidden sm:inline-flex"
          >
            Sign in
          </ButtonLink>
          <button
            className="grid size-10 place-items-center rounded-xl border border-line transition-colors hover:bg-muted md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid place-items-center"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="overflow-hidden border-t border-line bg-bg md:hidden"
          >
            <ul className="px-5 py-2">
              {links.map(([label, href]) => (
                <li key={href}>
                  <a
                    onClick={() => setOpen(false)}
                    href={href}
                    className="block py-3 text-sm font-medium text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="border-t border-line py-3 sm:hidden">
                <ButtonLink
                  href="https://echogpt.live/login"
                  className="w-full justify-center"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </ButtonLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
