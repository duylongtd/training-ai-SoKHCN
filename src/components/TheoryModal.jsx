import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Check, ArrowRight } from "lucide-react";
import Section from "./Section";
import useProgress from "../hooks/useProgress";
import { showCongrats } from "./CongratsToast";

export default function TheoryModal({ open, section, onClose, onGoPractice }) {
  const { markTheoryRead, isTheoryRead } = useProgress();
  const alreadyRead = section ? isTheoryRead(section.id) : false;

  // Auto đánh dấu đã đọc sau khi mở popup 3 giây
  useEffect(() => {
    if (!open || !section) return;
    const timer = setTimeout(() => {
      if (!isTheoryRead(section.id)) {
        markTheoryRead(section.id);
        showCongrats({
          title: "Đã hoàn thành phần lý thuyết",
          desc: section.title,
        });
      }
    }, 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, section]);

  // Khoá scroll trang chính khi popup mở
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && section && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-950/70 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-2 md:inset-6 lg:inset-10 bg-paper rounded-3xl z-50 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-ink-900/10 bg-paper sticky top-0 z-10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-ink-900" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] md:text-xs uppercase tracking-widest text-ink-900/55 font-semibold">
                    Lý thuyết · Chuyên đề {section.no}
                  </div>
                  <div className="vn-heading text-base md:text-xl text-ink-900 truncate">
                    {section.title}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {alreadyRead && (
                  <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-ink-700 bg-accent-lime/20 px-3 py-1.5 rounded-full">
                    <Check className="w-3.5 h-3.5" />
                    Đã đọc
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-ink-900/5 hover:bg-ink-900/10 flex items-center justify-center transition-colors"
                  aria-label="Đóng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body — re-use Section component */}
            <div className="flex-1 overflow-y-auto">
              <div className="pt-2">
                <Section section={section} />
              </div>

              {/* Footer call-to-action */}
              <div className="container-x pb-10 md:pb-14">
                <div className="card-base p-6 md:p-8 bg-ink-900 border-ink-900 text-paper flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-accent-gold flex items-center justify-center">
                        <Check className="w-4 h-4 text-ink-900" strokeWidth={3} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-paper/70">
                        Đã đọc xong lý thuyết
                      </span>
                    </div>
                    <h3 className="vn-heading text-2xl md:text-3xl text-paper">
                      Sẵn sàng thực hành?
                    </h3>
                    <p className="text-paper/70 mt-2 text-sm md:text-base max-w-md">
                      Bấm "Vào thực hành" để áp dụng ngay những gì vừa học vào tình huống cụ thể.
                    </p>
                  </div>
                  <button
                    onClick={onGoPractice}
                    className="inline-flex items-center gap-2 rounded-full bg-accent-gold hover:bg-accent-gold/90 px-6 py-3.5 font-semibold text-ink-900 transition-all hover:scale-[1.02] flex-shrink-0"
                  >
                    Vào thực hành
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
