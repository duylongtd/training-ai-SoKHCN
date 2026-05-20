import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, BookOpen, Wand2, Briefcase, Shield, Sparkles } from "lucide-react";

const roadmap = [
  {
    phase: "01",
    title: "Hiểu nền tảng",
    color: "bg-accent-gold",
    icon: BookOpen,
    duration: "1 tuần",
    nodes: [
      { id: "ai-co-ban", label: "AI tạo sinh là gì?", desc: "Khái niệm cơ bản, nguyên lý" },
      { id: "ao-giac", label: "Cảnh báo ảo giác", desc: "AI có thể bịa — phải kiểm tra" },
      { id: "cong-cu", label: "Các công cụ chính", desc: "ChatGPT, Gemini, Deepseek" },
    ],
  },
  {
    phase: "02",
    title: "Học kỹ năng",
    color: "bg-accent-lime",
    icon: Wand2,
    duration: "1 tuần",
    nodes: [
      { id: "cau-lenh", label: "Công thức 5 thành phần", desc: "Vai trò · Yêu cầu · Mục tiêu · Bối cảnh · Dữ liệu" },
      { id: "ky-thuat-nang-cao", label: "Kỹ thuật nâng cao", desc: "Cung cấp ví dụ, hướng dẫn từng bước" },
    ],
  },
  {
    phase: "03",
    title: "Áp dụng thực tế",
    color: "bg-accent-coral",
    icon: Briefcase,
    duration: "2 tuần",
    nodes: [
      { id: "ung-dung", label: "5 nhóm công việc", desc: "Tóm tắt, nghiên cứu, kế hoạch, tổng hợp, báo cáo" },
      { id: "gemini", label: "Gemini Canvas", desc: "Soạn slide, tạo app, tạo video" },
      { id: "notebooklm", label: "NotebookLM", desc: "Tra cứu chính xác có trích dẫn" },
      { id: "ket-hop", label: "Quy trình kết hợp", desc: "NotebookLM + Gemini = giảm 70% thời gian" },
    ],
  },
  {
    phase: "04",
    title: "Sử dụng an toàn",
    color: "bg-ink-700",
    icon: Shield,
    duration: "Liên tục",
    nodes: [
      { id: "an-toan", label: "Luật AI Việt Nam", desc: "134/2025/QH15 — hiệu lực 01/03/2026" },
      { id: "an-toan", label: "Nguyên tắc 3-2-1", desc: "3 KHÔNG · 2 CÓ · 1 quy trình" },
    ],
  },
];

export default function MindmapModal({ open, onClose }) {
  const handleJump = (id) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-950/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-2 md:inset-6 lg:inset-10 bg-paper rounded-3xl z-50 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 md:px-8 py-4 md:py-5 border-b border-ink-900/10 bg-ink-900 text-paper">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-gold flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-ink-900" />
                </div>
                <div>
                  <h2 className="vn-heading text-lg md:text-2xl text-paper">
                    Lộ trình học AI cho cán bộ
                  </h2>
                  <p className="text-xs md:text-sm text-paper/60">
                    Bấm vào bất kỳ nhánh nào để đi tới phần đó
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-paper/10 hover:bg-paper/20 flex items-center justify-center transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 md:p-8 lg:p-10">
              <div className="max-w-6xl mx-auto">
                {/* Intro */}
                <div className="text-center mb-10">
                  <div className="display-heading text-4xl md:text-6xl text-ink-900 mb-3">
                    4 chặng — 4 tuần
                  </div>
                  <p className="text-ink-900/70 max-w-2xl mx-auto">
                    Lộ trình được thiết kế cho cán bộ chưa từng dùng AI. Mỗi chặng
                    xây dựng dựa trên chặng trước. Học xong chặng 1 đã có thể tóm tắt
                    văn bản dài. Học hết 4 chặng có thể thay thế 70% công việc soạn thảo thông thường.
                  </p>
                </div>

                {/* Tree */}
                <div className="space-y-8 md:space-y-12">
                  {roadmap.map((phase, pi) => {
                    const Icon = phase.icon;
                    return (
                      <motion.div
                        key={pi}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: pi * 0.15 }}
                        className="relative"
                      >
                        {/* Connector to next */}
                        {pi < roadmap.length - 1 && (
                          <div className="absolute left-7 md:left-9 top-20 bottom-0 w-0.5 bg-gradient-to-b from-ink-900/20 to-transparent -mb-12" />
                        )}

                        <div className="flex items-start gap-4 md:gap-6">
                          {/* Phase badge */}
                          <div className="flex-shrink-0">
                            <div className={`w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl ${phase.color} flex items-center justify-center relative`}>
                              <Icon className="w-6 h-6 md:w-8 md:h-8 text-ink-900" />
                              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-ink-900 flex items-center justify-center">
                                <span className="text-[10px] font-bold text-paper">{phase.phase}</span>
                              </div>
                            </div>
                          </div>

                          {/* Phase content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-baseline gap-2 md:gap-3 mb-4">
                              <h3 className="vn-heading text-2xl md:text-3xl text-ink-900">
                                {phase.title}
                              </h3>
                              <span className="text-xs font-semibold uppercase tracking-widest text-ink-900/55 px-2.5 py-1 rounded-full border border-ink-900/15 bg-white">
                                {phase.duration}
                              </span>
                            </div>

                            {/* Nodes */}
                            <div className="grid sm:grid-cols-2 gap-3">
                              {phase.nodes.map((node, ni) => (
                                <motion.button
                                  key={ni}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: pi * 0.15 + ni * 0.05 + 0.2 }}
                                  onClick={() => handleJump(node.id)}
                                  className="group text-left card-base p-4 md:p-5 hover:-translate-y-0.5 hover:border-ink-900/25"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="vn-heading text-base md:text-lg text-ink-900 mb-1">
                                        {node.label}
                                      </h4>
                                      <p className="text-xs md:text-sm text-ink-900/65 leading-relaxed">
                                        {node.desc}
                                      </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-ink-900/30 group-hover:text-accent-gold group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer note */}
                <div className="mt-12 text-center">
                  <div className="inline-flex items-center gap-2 text-sm text-ink-900/55 px-4 py-2 rounded-full bg-cream">
                    <Sparkles className="w-4 h-4 text-accent-gold" />
                    <span>Mẹo: Có thể nhảy thẳng tới chặng phù hợp với trình độ của bạn</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
