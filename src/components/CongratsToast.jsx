import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Trophy } from "lucide-react";

// Singleton-style toast manager
let pushFn = null;

export function showCongrats(payload) {
  if (pushFn) pushFn(payload);
}

export default function CongratsToast() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    pushFn = (payload) => {
      const id = Date.now() + Math.random();
      setItems((prev) => [...prev, { id, ...payload }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== id));
      }, 3500);
    };
    return () => {
      pushFn = null;
    };
  }, []);

  return (
    <div className="fixed bottom-24 right-5 md:bottom-7 md:right-28 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {items.map((it) => {
          const Icon = it.big ? Trophy : Check;
          return (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ type: "spring", damping: 18 }}
              className="pointer-events-auto"
            >
              <div
                className={`relative flex items-center gap-3 rounded-2xl px-5 py-3 shadow-2xl border ${
                  it.big
                    ? "bg-ink-900 text-paper border-ink-900"
                    : "bg-white text-ink-900 border-accent-lime/50"
                }`}
              >
                {/* Pulse halo */}
                <div className="absolute inset-0 rounded-2xl bg-accent-lime/30 animate-ping opacity-50" />
                <div
                  className={`relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    it.big ? "bg-accent-gold" : "bg-accent-lime"
                  }`}
                >
                  <Icon className="w-5 h-5 text-ink-900" strokeWidth={2.5} />
                </div>
                <div className="relative">
                  <div className={`vn-heading text-base ${it.big ? "text-paper" : "text-ink-900"}`}>
                    {it.title || "Xuất sắc!"}
                  </div>
                  {it.desc && (
                    <div className={`text-xs ${it.big ? "text-paper/70" : "text-ink-900/65"}`}>
                      {it.desc}
                    </div>
                  )}
                </div>
                {it.big && <Sparkles className="relative w-5 h-5 text-accent-gold" />}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
