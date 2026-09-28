"use client";

import { useState } from "react";
import { models, suggestions } from "@/lib/content";
import { useChatDemo } from "./use-chat-demo";
import { ModelSelect } from "./model-select";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";

export function ChatDemo() {
  const [modelIdx, setModelIdx] = useState(0);
  const model = models[modelIdx];
  const { messages, typed, busy, pendingModel, send } = useChatDemo(model);
  const isFresh = messages.length === 1 && !busy;

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <ModelSelect models={models} value={modelIdx} onChange={setModelIdx} />
        <span className="font-mono text-xs text-sub">{model.tag}</span>
      </div>

      <MessageList
        messages={messages}
        typed={typed}
        busy={busy}
        pendingModel={pendingModel}
      />

      {isFresh && (
        <div className="flex flex-wrap gap-2 px-4 pb-1">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-lg border border-line px-3 py-1.5 text-xs text-sub transition-colors hover:border-brand hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <ChatInput disabled={busy} onSend={send} />
    </div>
  );
}
