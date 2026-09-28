"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../ui/button";
import { InteractiveGrid } from "../ui/interactive-grid";
import { ChatDemo } from "../chat/chat-demo";
import { Highlighter } from "../ui/highlighter";
import { ImChrome } from "react-icons/im";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,black_50%,transparent_80%)]">
        <InteractiveGrid />
      </div>

      <div className="pointer-events-none relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-20 sm:pt-28 lg:grid-cols-2">
        <div className="pointer-events-auto">
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
            Every top AI model.
            <br />
            <span className="text-brand">One calm workspace.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-sub">
            Chat,
            <Highlighter action="underline" color="#6d3df5">
              <span>compare answers side by side</span>
            </Highlighter>
            , and finish real work with{" "}
            <span className="text-ink font-semibold">40+ models</span> including
            GPT, DeepSeek, Qwen, Kimi, and Gemini.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="https://echogpt.live">
              Start chatting free <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href="https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj" variant="ghost">
              <ImChrome size={16} /> Add to Chrome
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-sub">
            No credit card needed. Sign in with Google, X, GitHub or email.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto flex justify-center lg:justify-end"
        >
          <ChatDemo />
        </motion.div>
      </div>
    </section>
  );
}
