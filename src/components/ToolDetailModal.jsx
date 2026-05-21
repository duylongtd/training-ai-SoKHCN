import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Check, Sparkles } from "lucide-react";
import { getToolLogo, TOOL_BRAND } from "./ToolLogos";

export default function ToolDetailModal({ open, tool, onClose }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!tool) return null;
  const Logo = getToolLogo(tool.id);
  const brand = TOOL_BRAND[tool.id] || {};

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-950/70 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-2 md:inset-6 lg:inset-10 bg-paper rounded-3xl z-[81] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-ink-900/10 flex-shrink-0">
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${brand.bg || "bg-ink-900/5"}`}>
                  {Logo && <Logo className="w-10 h-10 md:w-12 md:h-12" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h2 className="vn-heading text-2xl md:text-3xl text-ink-900">{tool.name}</h2>
                    <span className="text-xs font-mono text-ink-900/55">{tool.version}</span>
                  </div>
                  <div className="text-xs uppercase tracking-widest text-ink-900/55 font-medium">
                    {tool.maker}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-ink-900/5 hover:bg-ink-900/10 flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6 md:py-8">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white/70 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-900 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                  {tool.tagline}
                </div>

                <p className="text-base md:text-lg text-ink-900/80 leading-relaxed mb-8">
                  {tool.description}
                </p>

                <h3 className="vn-heading text-lg md:text-xl text-ink-900 mb-4">
                  Điểm mạnh nổi bật
                </h3>
                <ul className="space-y-2 mb-8">
                  {tool.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-md bg-accent-gold/20 flex items-center justify-center mt-0.5">
                        <Check className="w-3.5 h-3.5 text-ink-900" strokeWidth={2.5} />
                      </div>
                      <span className="text-ink-900/85 leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="vn-heading text-lg md:text-xl text-ink-900 mb-4">
                  Các gói dịch vụ
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {tool.plans.map((plan, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl p-5 border-2 ${
                        plan.highlight
                          ? "border-ink-900 bg-ink-900 text-paper"
                          : "border-ink-900/10 bg-white text-ink-900"
                      }`}
                    >
                      <div
                        className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                          plan.highlight ? "text-accent-gold" : "text-ink-900/55"
                        }`}
                      >
                        {plan.name}
                      </div>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="vn-heading text-2xl">{plan.price}</span>
                        <span
                          className={`text-xs ${
                            plan.highlight ? "text-paper/60" : "text-ink-900/55"
                          }`}
                        >
                          {plan.priceNote}
                        </span>
                      </div>
                      <ul className="mt-4 space-y-1.5">
                        {plan.features.map((f, j) => (
                          <li
                            key={j}
                            className={`text-xs flex items-start gap-1.5 ${
                              plan.highlight ? "text-paper/85" : "text-ink-900/75"
                            }`}
                          >
                            <Check
                              className={`w-3 h-3 mt-0.5 flex-shrink-0 ${
                                plan.highlight ? "text-accent-gold" : "text-ink-700"
                              }`}
                              strokeWidth={3}
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-ink-900/10 px-5 md:px-8 py-4 bg-cream">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs md:text-sm text-ink-900/65">
                  <strong>Lưu ý:</strong> Giá có thể thay đổi theo thời gian — kiểm tra trang chính thức.
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 hover:bg-ink-800 px-6 py-3 text-sm font-semibold text-paper transition-all hover:scale-[1.02] whitespace-nowrap"
                >
                  Đi tới {tool.name}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
