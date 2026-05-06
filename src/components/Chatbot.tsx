'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';

type Msg = { role: 'user' | 'assistant'; content: string };

const greeting: Msg = {
  role: 'assistant',
  content:
    "Hey! I'm the Nautilus assistant. Ask me about classes, hours, training, or how to join — I'll point you in the right direction."
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    const next: Msg[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setBusy(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next })
      });
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content:
            "Sorry, I'm having trouble connecting right now. You can email us at hello@nautilusnsb.com and we'll get right back to you."
        }
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        aria-label={open ? 'Close chat' : 'Open chat'}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center bg-sky text-ink shadow-[0_8px_30px_rgba(108,187,222,0.4)] transition-transform hover:scale-105"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-5 z-40 flex h-[28rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col border border-white/15 bg-steel shadow-2xl"
          >
            {/* Header */}
            <div className="border-b border-white/10 bg-ink px-4 py-3">
              <div className="font-display text-base tracking-[0.04em] text-bone">
                NAUTILUS ASSISTANT
              </div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-sky">
                ◆ Online
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-[0.85rem] leading-relaxed"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 ${
                      m.role === 'user'
                        ? 'bg-sky text-ink'
                        : 'border border-white/10 bg-ink text-white/85'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 border border-white/10 bg-ink px-3 py-2 text-white/60">
                    <Loader2 size={12} className="animate-spin" />
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em]">
                      Thinking
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex border-t border-white/10"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about classes, hours, training…"
                className="flex-1 bg-transparent px-4 py-3 text-[0.85rem] text-bone placeholder:text-white/30 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="flex w-12 items-center justify-center bg-sky text-ink transition-opacity disabled:opacity-40"
              >
                <Send size={14} strokeWidth={2} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
