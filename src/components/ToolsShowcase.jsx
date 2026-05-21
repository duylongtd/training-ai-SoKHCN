import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, CheckCircle2, Crown, Star } from "lucide-react";

// ============================================
// BRAND LOGOS (inline SVG)
// ============================================

export function ChatGPTLogo({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-label="ChatGPT">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.66zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.84-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v3l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

export function GeminiLogo({ className = "w-6 h-6" }) {
  // Use stable random ID to avoid duplicate gradient defs causing render issues
  const id = "gem-grad-" + Math.random().toString(36).slice(2, 8);
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Gemini">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4796E3" />
          <stop offset="40%" stopColor="#9168C0" />
          <stop offset="75%" stopColor="#E94989" />
          <stop offset="100%" stopColor="#FF8B26" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M12 1.5c.6 4.5 1.6 7.5 3.8 9.7C18 13.4 21 14.4 22.5 12c-4.5 0-7.5 1.6-9.7 3.8C10.6 18 9.6 21 9 22.5c0-4.5-1.6-7.5-3.8-9.7C3 11 1.5 12 1.5 12c4.5 0 7.5-1.6 9.7-3.8C13.4 6 14.4 3 12 1.5z"
      />
    </svg>
  );
}

export function DeepseekLogo({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#4D6BFE" aria-label="DeepSeek">
      <path d="M23.748 4.482c-.254-.124-.364.113-.514.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 0 1-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458-.221-.169-.452-.328-.689-.471-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684-.149.061-.306.108-.465.137-.91-.171-1.855-.21-2.883-.102-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 0 0 1.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592.512-.077 1.02-.06 1.529-.039 2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 0 1 .415-.287.302.302 0 0 1 .2.288.306.306 0 0 1-.31.307.303.303 0 0 1-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16-.296.013-.62-.106-.798-.254-.274-.23-.47-.358-.552-.758-.035-.171-.015-.435.016-.588.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 0 1-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z" />
    </svg>
  );
}

// ============================================
// TOOLS DATA — chi tiết gói
// ============================================

export const TOOLS_DATA = {
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    maker: "OpenAI",
    version: "GPT-5",
    url: "https://chat.openai.com",
    bgGradient: "from-emerald-600 to-emerald-800",
    Logo: ChatGPTLogo,
    tagline: "Trợ lý văn bản hàng đầu — giao tiếp tự nhiên, viết và tóm tắt vượt trội",
    strengths: [
      "Văn phong tự nhiên, gần với người Việt",
      "Hỗ trợ tiếng Việt rất tốt",
      "Ứng dụng điện thoại có sẵn",
      "Voice mode — hỏi đáp bằng giọng nói",
    ],
    plans: [
      {
        name: "Miễn phí",
        price: "0đ",
        for: "Người dùng thử, học sinh, nhân dân",
        features: [
          "Truy cập GPT-5 mini, GPT-4o với giới hạn",
          "Khoảng 10 tin nhắn / 3 giờ với model nâng cao",
          "Voice mode cơ bản",
          "Tạo ảnh có giới hạn",
        ],
      },
      {
        name: "Plus",
        price: "~500.000đ/tháng ($20)",
        for: "Cán bộ dùng thường xuyên cho công việc",
        highlight: true,
        features: [
          "GPT-5 đầy đủ, không giới hạn",
          "DALL-E 3 — tạo ảnh chất lượng cao",
          "Phân tích file, biểu đồ, code interpreter",
          "Voice mode nâng cao",
          "Truy cập Sora video model",
        ],
      },
      {
        name: "Pro",
        price: "~5 triệu/tháng ($200)",
        for: "Nghiên cứu chuyên sâu, làm việc đa nhiệm",
        features: [
          "GPT-5 Pro — chế độ suy luận sâu",
          "Sora tạo video không giới hạn",
          "Deep Research — báo cáo nhiều giờ",
          "Ưu tiên truy cập model mới nhất",
        ],
      },
    ],
  },
  gemini: {
    id: "gemini",
    name: "Gemini",
    maker: "Google",
    version: "2.5 Pro · Flash",
    url: "https://gemini.google.com",
    bgGradient: "from-blue-500 via-purple-500 to-pink-500",
    Logo: GeminiLogo,
    tagline: "Đa năng — tạo ảnh, video, slide, app nội bộ + tích hợp Google",
    strengths: [
      "Tích hợp Google Workspace (Gmail, Docs, Drive)",
      "Canvas — không gian soạn thảo chuyên nghiệp",
      "Veo — tạo video AI chất lượng cao",
      "Cửa sổ ngữ cảnh 1 triệu token",
    ],
    plans: [
      {
        name: "Miễn phí",
        price: "0đ",
        for: "Người dùng cá nhân, người dân",
        features: [
          "Gemini 2.5 Flash — nhanh, dùng hàng ngày",
          "Có hạn mức tin nhắn / ngày",
          "Tạo ảnh và phân tích file cơ bản",
          "Audio Overview cho NotebookLM",
        ],
      },
      {
        name: "Pro",
        price: "~500.000đ/tháng",
        for: "Cán bộ văn phòng + cơ quan vừa",
        highlight: true,
        features: [
          "Gemini 2.5 Pro không giới hạn",
          "Canvas chuyên nghiệp + Code Canvas",
          "2 TB Google Drive đi kèm",
          "Tích hợp vào Gmail, Docs, Sheets, Slides",
          "Nano Banana — tạo ảnh và Veo cơ bản",
        ],
      },
      {
        name: "Ultra",
        price: "~5 triệu/tháng",
        for: "Cơ quan lớn, nghiên cứu chuyên sâu",
        features: [
          "Veo 3 — tạo video 4K, có âm thanh",
          "Imagen 4 — ảnh chuyên nghiệp",
          "Deep Think — suy luận đa bước",
          "30 TB lưu trữ Google Drive",
        ],
      },
    ],
  },
  deepseek: {
    id: "deepseek",
    name: "DeepSeek",
    maker: "Mã nguồn mở (Trung Quốc)",
    version: "V3.1",
    url: "https://chat.deepseek.com",
    bgGradient: "from-blue-600 to-indigo-700",
    Logo: DeepseekLogo,
    tagline: "Mã nguồn mở — có thể tự host miễn phí, không phụ thuộc nền tảng đóng",
    strengths: [
      "MÃ NGUỒN MỞ — tải về host trên máy chủ riêng",
      "Khả năng suy luận, toán học rất mạnh",
      "Hỗ trợ tiếng Việt tốt",
      "Chi phí API cực thấp so với ChatGPT/Gemini",
    ],
    plans: [
      {
        name: "Web Free",
        price: "0đ",
        for: "Tất cả người dùng cá nhân",
        highlight: true,
        features: [
          "Truy cập chat.deepseek.com miễn phí",
          "Không giới hạn tin nhắn cơ bản",
          "Có chế độ DeepThink — suy luận sâu",
          "Tải app điện thoại có sẵn",
        ],
      },
      {
        name: "API trả phí",
        price: "Theo lượng dùng (rất rẻ)",
        for: "Lập trình viên, ứng dụng riêng",
        features: [
          "~7.000đ / triệu token đầu vào",
          "~30.000đ / triệu token đầu ra",
          "Rẻ hơn ChatGPT API 10-20 lần",
          "Tích hợp được vào app/script riêng",
        ],
      },
      {
        name: "Tự host (Self-hosted)",
        price: "0đ phần mềm (chi phí GPU)",
        for: "Cơ quan có máy chủ và muốn bảo mật",
        features: [
          "Tải model từ HuggingFace miễn phí",
          "Chạy trên máy chủ riêng của cơ quan",
          "KHÔNG lộ dữ liệu — phù hợp văn bản nhạy cảm",
          "Cần GPU mạnh (vài chục triệu) hoặc thuê",
        ],
      },
    ],
  },
};

export const TOOLS_LIST = [TOOLS_DATA.chatgpt, TOOLS_DATA.gemini, TOOLS_DATA.deepseek];

// ============================================
// TOOL DETAIL MODAL
// ============================================

export function ToolDetailModal({ tool, onClose, onVisit }) {
  // Khoá scroll khi mở
  useEffect(() => {
    if (tool) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [tool]);

  return (
    <AnimatePresence>
      {tool && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-950/80 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-2 md:inset-x-0 md:top-1/2 md:left-1/2 md:bottom-auto md:right-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-[92%] md:max-w-3xl md:max-h-[90vh] bg-paper rounded-3xl z-[80] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header với logo + branding */}
            <div className={`relative bg-gradient-to-br ${tool.bgGradient} px-6 md:px-8 py-6 md:py-8 text-white overflow-hidden flex-shrink-0`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/95 flex items-center justify-center flex-shrink-0 shadow-xl">
                  <tool.Logo className="w-10 h-10 md:w-12 md:h-12 text-ink-900" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest font-bold text-white/70 mb-1">
                    {tool.maker} · {tool.version}
                  </div>
                  <h2 className="vn-heading text-3xl md:text-4xl">{tool.name}</h2>
                </div>
              </div>

              <p className="mt-4 text-sm md:text-base text-white/90 leading-relaxed max-w-2xl">
                {tool.tagline}
              </p>
            </div>

            {/* Body — scrollable */}
            <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6">
              {/* Strengths */}
              <div className="mb-7">
                <h3 className="vn-heading text-lg text-ink-900 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent-gold fill-accent-gold" />
                  Điểm mạnh
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {tool.strengths.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-3 rounded-xl bg-cream"
                    >
                      <CheckCircle2 className="w-4 h-4 text-ink-700 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-ink-900/85">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plans */}
              <div>
                <h3 className="vn-heading text-lg text-ink-900 mb-3 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-accent-gold" />
                  Các gói sử dụng
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {tool.plans.map((p, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl p-5 border-2 ${
                        p.highlight
                          ? "border-accent-gold bg-accent-gold/5 relative"
                          : "border-ink-900/10 bg-white"
                      }`}
                    >
                      {p.highlight && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-accent-gold text-ink-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          Khuyên dùng
                        </div>
                      )}
                      <div className="vn-heading text-lg text-ink-900 mb-1">
                        {p.name}
                      </div>
                      <div className="font-mono text-sm font-semibold text-ink-900 mb-1">
                        {p.price}
                      </div>
                      <div className="text-xs text-ink-900/55 mb-4 italic">
                        Cho: {p.for}
                      </div>
                      <ul className="space-y-1.5">
                        {p.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2 text-xs text-ink-900/80">
                            <span className="text-accent-gold mt-0.5 flex-shrink-0">•</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer — sticky CTA */}
            <div className="flex-shrink-0 border-t border-ink-900/10 bg-paper px-5 md:px-8 py-4 flex items-center justify-between gap-3">
              <div className="text-xs text-ink-900/55 hidden sm:block">
                {tool.url.replace(/^https?:\/\//, "")}
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => onVisit && onVisit(tool)}
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 hover:bg-ink-800 px-6 py-3 font-semibold text-paper transition-all hover:scale-[1.02] w-full sm:w-auto justify-center"
              >
                Đi tới {tool.name}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// TOOL CARD — dùng được ở landing + practice
// ============================================

export function ToolCard({ tool, onOpen, done }) {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4500);
    return () => clearTimeout(t);
  }, []);

  return (
    <button
      onClick={() => onOpen(tool)}
      className="group relative card-base overflow-hidden text-left hover:-translate-y-1 transition-transform w-full"
    >
      {/* Tooltip "Bấm vào để xem chi tiết" */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          >
            <div className="bg-ink-900 text-paper text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
              👆 Bấm vào để xem chi tiết
            </div>
            <div className="w-2 h-2 bg-ink-900 rotate-45 mx-auto -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo banner */}
      <div className={`bg-gradient-to-br ${tool.bgGradient} px-6 py-7 md:py-9 flex flex-col items-center justify-center text-white relative`}>
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/95 flex items-center justify-center shadow-xl mb-3">
          <tool.Logo className="w-10 h-10 md:w-12 md:h-12 text-ink-900" />
        </div>
        <div className="vn-heading text-2xl md:text-3xl drop-shadow">{tool.name}</div>
        <div className="text-xs text-white/80 uppercase tracking-widest mt-1">{tool.version}</div>
        {done && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-accent-lime flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-ink-900" strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="text-xs text-ink-900/55 uppercase tracking-wider font-medium mb-2">
          by {tool.maker}
        </div>
        <p className="text-sm text-ink-900/80 leading-relaxed mb-4">{tool.tagline}</p>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-900 px-3 py-1.5 rounded-full bg-accent-gold/20 group-hover:bg-accent-gold/40 transition-colors">
          Xem chi tiết & các gói
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </button>
  );
}
