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

// Logo Sở KH&CN Hà Tĩnh — ưu tiên file local /logo-skhcn.png (đặt trong public/),
// fallback sang URL gốc của Sở, fallback cuối cùng là icon Sparkles.
const LOGO_LOCAL = "/logo-skhcn.png";
const LOGO_REMOTE = "https://skhcn.hatinh.gov.vn/img/logo1.png";

function BrandLogo() {
  // 0 = local, 1 = remote, 2 = sparkles fallback
  const [stage, setStage] = useState(0);

  if (stage === 2) {
    return (
      <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden md:w-11 md:h-11 rounded-xl bg-ink-900">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-700" />
        <Sparkles className="relative w-5 h-5 text-accent-gold" strokeWidth={2.5} />
      </div>
    );
  }

  return (
      <img
        src={stage === 0 ? LOGO_LOCAL : LOGO_REMOTE}
        alt="Sở KH&amp;CN Hà Tĩnh"
        className="object-contain w-12 h-12 p-1"
        onError={() => setStage(stage + 1)}
      />
  );
}

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
      <div className="flex items-center justify-between h-16 container-x md:h-20">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3 group">
          <BrandLogo />
          <div className="flex flex-col">
            <span className="text-base leading-none vn-heading md:text-lg text-ink-900">
              Tập huấn AI
            </span>
            <span className="text-[10px] md:text-[11px] text-ink-900/60 uppercase tracking-widest font-medium">
              Sở KH&amp;CN Hà Tĩnh
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="items-center hidden gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-4 py-2 text-sm font-medium transition-colors rounded-full text-ink-900/80 hover:text-ink-900 hover:bg-ink-900/5"
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
            className="flex items-center justify-center w-10 h-10 bg-white border lg:hidden rounded-xl border-ink-900/15"
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
            className="overflow-hidden border-t lg:hidden bg-paper border-ink-900/10"
          >
            <div className="flex flex-col gap-1 py-4 container-x">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="px-4 py-3 text-base font-medium text-left transition-colors text-ink-900 hover:bg-ink-900/5 rounded-xl"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenMindmap();
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 mt-2 text-base font-semibold rounded-xl bg-ink-900 text-paper"
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
