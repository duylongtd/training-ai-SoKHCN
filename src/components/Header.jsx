import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "ai-co-ban", label: "AI cơ bản" },
  { id: "cau-lenh", label: "Câu lệnh" },
  { id: "ung-dung", label: "Ứng dụng" },
  { id: "notebooklm", label: "NotebookLM" },
  { id: "an-toan", label: "An toàn" },
];

export default function Header({ onOpenMindmap }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-ink-900/10"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl bg-ink-900 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-700" />
            <Sparkles className="relative w-5 h-5 text-accent-gold" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="vn-heading text-base md:text-lg text-ink-900 leading-none">
              Tập huấn AI
            </span>
            <span className="text-[10px] md:text-[11px] text-ink-900/60 uppercase tracking-widest font-medium">
              Sở KH&amp;CN Hà Tĩnh
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-4 py-2 text-sm font-medium text-ink-900/80 hover:text-ink-900 hover:bg-ink-900/5 rounded-full transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMindmap}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 lg:px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ink-800 transition-all hover:scale-[1.02]"
          >
            <Map className="w-4 h-4" />
            <span className="hidden lg:inline">Lộ trình học</span>
            <span className="lg:hidden">Lộ trình</span>
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-ink-900/15 bg-white"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-paper border-t border-ink-900/10"
          >
            <div className="container-x py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left px-4 py-3 text-base font-medium text-ink-900 hover:bg-ink-900/5 rounded-xl transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenMindmap();
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-4 py-3 text-base font-semibold text-paper"
              >
                <Map className="w-5 h-5" />
                Xem lộ trình học
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
