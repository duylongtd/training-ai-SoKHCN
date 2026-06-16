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
      className="relative pb-16 overflow-hidden pt-28 md:pt-36 md:pb-24"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 grid-bg opacity-40 -z-10" />
      <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-accent-gold/20 rounded-full blur-3xl -z-10 animate-blob" />
      <div className="absolute -top-10 -left-20 w-[400px] h-[400px] bg-ink-700/15 rounded-full blur-3xl -z-10" />

      <div className="relative container-x">
        {/* Top pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block group cursor-help">
            {/* Trigger */}
            <span className="pill transition-transform duration-200 group-hover:scale-[1.03]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
              <span>Phòng CNTT &amp; CĐS · Trần Đình Duy Long</span>
            </span>

            {/* ─── PROFILE HOVER CARD ─── */}
            <div
              className="
        absolute top-full left-0 pt-4 z-50 w-[360px]
        opacity-0 invisible translate-y-1
        group-hover:opacity-100
        group-hover:visible
        group-hover:translate-y-0
        transition-all duration-300 ease-out
      "
            >
              {/* Arrow pointer */}
              <div className="absolute top-[10px] left-8 w-3 h-3 bg-white rotate-45 ring-1 ring-ink-900/8 z-10" />

              {/* Card body */}
              <div className="relative overflow-hidden shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-ink-900/20 ring-1 ring-ink-900/8">
                {/* Decorative blobs */}
                <div className="absolute w-40 h-40 rounded-full pointer-events-none -top-16 -right-16 bg-accent-gold/25 blur-3xl" />
                <div className="absolute w-32 h-32 rounded-full pointer-events-none -bottom-12 -left-12 bg-accent-lime/20 blur-3xl" />
                <div className="absolute right-0 w-24 h-24 rounded-full pointer-events-none top-1/2 bg-accent-coral/10 blur-2xl" />

                {/* Header */}
                <div className="relative p-5">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute transition-opacity rounded-full -inset-1 bg-gradient-to-br from-accent-gold via-accent-coral to-accent-lime opacity-70 blur-sm group-hover:opacity-100" />

                      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-accent-gold via-accent-coral to-accent-lime" />

                      <img
                        src="https://res.cloudinary.com/dlrisakha/image/upload/v1780021439/IMG_0942_pggllv.jpg"
                        alt="Trần Đình Duy Long"
                        className="relative w-20 h-20 rounded-full object-cover ring-[3px] ring-white"
                      />

                      {/* Online dot */}
                      <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-accent-lime rounded-full ring-2 ring-white">
                        <div className="absolute inset-0 rounded-full bg-accent-lime animate-ping opacity-60" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="text-lg leading-tight vn-heading text-ink-900">
                        Trần Đình Duy Long
                      </div>

                      <div className="mt-1 text-xs font-medium leading-snug text-ink-900/65">
                        Chuyên viên · Phòng CNTT &amp; CĐS
                      </div>

                      <div className="text-[11px] text-ink-900/50 leading-snug">
                        Sở Khoa học và Công nghệ Hà Tĩnh
                      </div>

                      {/* Status */}
                      <span className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-full bg-accent-lime/15 border border-accent-lime/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />

                        <span className="text-[10px] font-bold text-ink-700 uppercase tracking-wider">
                          Đang trực tuyến
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="mt-4 text-[13px] text-ink-900/75 leading-relaxed">
                    Tác giả chương trình tập huấn AI cho cán bộ cấp xã —{" "}
                    <span className="font-semibold text-ink-900">
                      chuyển đổi số gắn với thực tiễn địa phương
                    </span>
                    .
                  </p>
                </div>

                {/* Stats */}
                <div className="relative grid grid-cols-3 border-t border-ink-900/5 bg-gradient-to-r from-cream/60 via-white to-cream/60">
                  <div className="py-3 text-center">
                    <div className="text-xl vn-heading text-ink-900">11</div>

                    <div className="text-[9px] text-ink-900/55 uppercase tracking-widest mt-0.5 font-semibold">
                      Chuyên đề
                    </div>
                  </div>

                  <div className="py-3 text-center border-x border-ink-900/5">
                    <div className="text-xl vn-heading text-ink-900">100+</div>

                    <div className="text-[9px] text-ink-900/55 uppercase tracking-widest mt-0.5 font-semibold">
                      Cán bộ
                    </div>
                  </div>

                  <div className="py-3 text-center">
                    <div className="text-xl vn-heading text-accent-gold">
                      2026
                    </div>

                    <div className="text-[9px] text-ink-900/55 uppercase tracking-widest mt-0.5 font-semibold">
                      Niên khoá
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="relative flex gap-2 p-3 border-t border-ink-900/5 bg-white/60">
                  {/* Email */}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=tranlong280403@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-ink-900 text-paper text-xs font-bold hover:bg-ink-800 transition-all hover:scale-[1.03] shadow-md shadow-ink-900/10"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Email
                  </a>

                  {/* Zalo */}
                  <a
                    href="https://zalo.me/0965186137"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-br from-accent-gold to-accent-gold/85 text-ink-900 text-xs font-bold hover:scale-[1.03] transition-transform shadow-md shadow-accent-gold/20"
                  >
                    <span className="font-black text-[13px]">Z</span>
                    Zalo
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:0965186137"
                    title="Gọi điện"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-ink-900/5 text-ink-900 hover:bg-ink-900/10 transition-all hover:scale-[1.05]"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            {/* ─── /PROFILE HOVER CARD ─── */}
          </div>
        </motion.div>

        {/* Big heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="vn-heading mt-6 md:mt-8 text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] text-ink-900 max-w-5xl"
        >
          Ứng dụng <span className="highlight">trí tuệ nhân tạo</span> trong
          công tác văn phòng cấp xã
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mt-6 text-lg leading-relaxed md:mt-8 md:text-xl text-ink-900/70"
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
          className="flex flex-wrap items-center gap-3 mt-8 md:mt-10 md:gap-4"
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
          className="grid grid-cols-2 gap-4 mt-14 md:mt-20 lg:grid-cols-4 md:gap-0 lg:divide-x lg:divide-ink-900/10"
        >
          {[
            { num: "10", label: "Chuyên đề" },
            { num: "5", label: "Bước viết câu lệnh" },
            { num: "70%", label: "Giảm thời gian xử lý" },
            { num: "3-2-1", label: "Nguyên tắc an toàn" },
          ].map((s, i) => (
            <div key={i} className="px-2 lg:px-6 first:lg:pl-0">
              <div className="text-4xl display-heading md:text-5xl text-ink-900">
                {s.num}
              </div>
              <div className="mt-1 text-sm text-ink-900/60">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute flex-col items-center hidden gap-2 -translate-x-1/2 md:flex bottom-4 left-1/2 text-ink-900/40"
        >
          <span className="text-[11px] uppercase tracking-widest font-medium">
            Cuộn xuống
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
