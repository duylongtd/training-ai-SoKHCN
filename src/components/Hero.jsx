import { motion } from "framer-motion";
import { ArrowDown, Sparkles, BookOpen, MessageCircle } from "lucide-react";

export default function Hero({ onOpenMindmap, onOpenChat }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="top"
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 grid-bg opacity-40 -z-10" />
      <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-accent-gold/20 rounded-full blur-3xl -z-10 animate-blob" />
      <div className="absolute -top-10 -left-20 w-[400px] h-[400px] bg-ink-700/15 rounded-full blur-3xl -z-10" />

      <div className="container-x relative">
        {/* Top pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="pill">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
            <span>Phòng CNTT &amp; CĐS · Trần Đình Duy Long</span>
          </span>
        </motion.div>

        {/* Big heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="vn-heading mt-6 md:mt-8 text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] text-ink-900 max-w-5xl"
        >
          Ứng dụng <span className="highlight">trí tuệ nhân tạo</span> trong công tác văn phòng cấp xã
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 md:mt-8 text-lg md:text-xl text-ink-900/70 max-w-2xl leading-relaxed"
        >
          Hướng dẫn từng bước cho cán bộ và nhân dân — từ ChatGPT, Gemini đến
          NotebookLM. Học cách viết câu lệnh, ứng dụng vào báo cáo, kế hoạch, và
          sử dụng AI an toàn theo pháp luật.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 md:gap-4"
        >
          <button
            onClick={onOpenMindmap}
            className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 md:px-7 py-3.5 text-base font-semibold text-paper hover:bg-ink-800 transition-all hover:scale-[1.02] shadow-lg shadow-ink-900/20"
          >
            <Sparkles className="w-5 h-5 text-accent-gold" />
            Xem lộ trình học
          </button>
          <button
            onClick={() => scrollToSection("ai-co-ban")}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink-900/15 bg-white/60 backdrop-blur px-6 py-3.5 text-base font-semibold text-ink-900 hover:bg-ink-900/5 transition-all"
          >
            <BookOpen className="w-5 h-5" />
            Bắt đầu đọc
          </button>
          <button
            onClick={onOpenChat}
            className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-6 py-3.5 text-base font-semibold text-ink-900 hover:bg-accent-gold/90 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Hỏi trợ lý AI
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-14 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0 lg:divide-x lg:divide-ink-900/10"
        >
          {[
            { num: "10", label: "Chuyên đề" },
            { num: "5", label: "Bước viết câu lệnh" },
            { num: "70%", label: "Giảm thời gian xử lý" },
            { num: "3-2-1", label: "Nguyên tắc an toàn" },
          ].map((s, i) => (
            <div key={i} className="px-2 lg:px-6 first:lg:pl-0">
              <div className="display-heading text-4xl md:text-5xl text-ink-900">
                {s.num}
              </div>
              <div className="text-sm text-ink-900/60 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-ink-900/40"
        >
          <span className="text-[11px] uppercase tracking-widest font-medium">Cuộn xuống</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
