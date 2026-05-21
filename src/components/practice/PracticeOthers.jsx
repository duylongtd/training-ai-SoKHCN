import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  CheckCircle2,
  Copy,
  ChevronRight,
  Sparkles,
  Star,
} from "lucide-react";

// ============================================
// 1. PRACTICE TOOLS — Section 03 (Công cụ AI)
// ============================================
export function PracticeTools({ onMissionDone, isMissionDone }) {
  const tools = [
    {
      id: "chatgpt",
      name: "ChatGPT",
      maker: "OpenAI",
      tagline: "Trợ lý văn bản hàng đầu — viết, tóm tắt, trò chuyện tự nhiên",
      url: "https://chat.openai.com",
      color: "from-emerald-600 to-emerald-800",
      strengths: ["Văn phong tự nhiên", "Hỗ trợ tiếng Việt tốt", "Có app điện thoại"],
    },
    {
      id: "gemini",
      name: "Gemini",
      maker: "Google",
      tagline: "Đa năng — tạo ảnh, video, slide, app nội bộ",
      url: "https://gemini.google.com",
      color: "from-blue-500 via-purple-500 to-pink-500",
      strengths: ["Tích hợp Google", "Canvas chuyên nghiệp", "Tạo ảnh tốt nhất"],
    },
    {
      id: "notebooklm",
      name: "NotebookLM",
      maker: "Google",
      tagline: "Trợ lý nghiên cứu chống ảo giác — chỉ trả lời theo tài liệu",
      url: "https://notebooklm.google.com",
      color: "from-amber-500 to-orange-600",
      strengths: ["Có trích dẫn", "Tạo podcast", "Miễn phí 100%"],
    },
  ];

  const [visited, setVisited] = useState({});

  const handleVisit = (tool) => {
    setVisited({ ...visited, [tool.id]: true });
    onMissionDone(`visit-${tool.id}`, `Đã truy cập ${tool.name}`);
    window.open(tool.url, "_blank");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-ink-900/10 bg-cream px-5 py-3">
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-900/60 mb-2">
          Nhiệm vụ
        </div>
        <p className="text-sm text-ink-900/80">
          Truy cập <strong>cả 3 công cụ</strong> để làm quen giao diện. Mỗi công cụ chỉ cần
          đăng nhập bằng tài khoản Google/Microsoft của bạn.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 md:p-7 bg-paper">
        <div className="grid md:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const done = isMissionDone(`visit-${tool.id}`);
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-base overflow-hidden"
              >
                <div className={`h-20 bg-gradient-to-br ${tool.color} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="display-heading text-3xl text-white drop-shadow-lg">
                      {tool.name}
                    </span>
                  </div>
                  {done && (
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-accent-lime flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-4 h-4 text-ink-900" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-xs text-ink-900/55 uppercase tracking-wider font-medium mb-2">
                    by {tool.maker}
                  </div>
                  <p className="text-sm text-ink-900/80 mb-4 leading-relaxed">{tool.tagline}</p>
                  <div className="space-y-1.5 mb-5">
                    {tool.strengths.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-ink-900/70">
                        <Star className="w-3 h-3 text-accent-gold fill-accent-gold flex-shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleVisit(tool)}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                      done
                        ? "bg-accent-lime/20 text-ink-700 hover:bg-accent-lime/30"
                        : "bg-ink-900 text-paper hover:bg-ink-800 hover:scale-[1.02]"
                    }`}
                  >
                    {done ? "Mở lại" : "Truy cập"}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================
// 2. PRACTICE USECASES — Section 05 (Ứng dụng)
// ============================================
export function PracticeUsecases({ usecases, onMissionDone, isMissionDone }) {
  const [copied, setCopied] = useState(null);

  const handleCopy = (uc, i) => {
    navigator.clipboard.writeText(uc.sample);
    setCopied(i);
    onMissionDone(`copy-${i}`, `Đã sao chép câu lệnh "${uc.title}"`);
    setTimeout(() => setCopied(null), 1500);
  };

  const copiedCount = usecases.filter((_, i) => isMissionDone(`copy-${i}`)).length;

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-ink-900/10 bg-cream px-5 py-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-900/60 mb-1">
            Nhiệm vụ: sao chép ít nhất 3 câu lệnh
          </div>
          <p className="text-sm text-ink-900/80">
            Đã sao chép <strong>{copiedCount}/{usecases.length}</strong> · sau đó mở
            ChatGPT/Gemini và dán câu lệnh để thử.
          </p>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(usecases.length)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                isMissionDone(`copy-${i}`) ? "bg-accent-lime" : "bg-ink-900/15"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 md:p-7 bg-paper space-y-3">
        {usecases.map((uc, i) => {
          const done = isMissionDone(`copy-${i}`);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`card-base p-5 ${done ? "border-accent-lime/40 bg-accent-lime/5" : ""}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="vn-heading text-lg text-ink-900">{uc.title}</h4>
                    {done && <CheckCircle2 className="w-5 h-5 text-ink-700" />}
                  </div>
                  <p className="text-sm text-ink-900/65 mt-1">{uc.desc}</p>
                </div>
              </div>
              <div className="rounded-xl bg-ink-900 p-4 relative group">
                <div className="text-[10px] font-bold uppercase tracking-widest text-accent-gold mb-2">
                  Câu lệnh mẫu
                </div>
                <p className="text-sm text-paper/90 font-mono leading-relaxed pr-12">
                  {uc.sample}
                </p>
                <button
                  onClick={() => handleCopy(uc, i)}
                  className="absolute top-3 right-3 px-2.5 py-1.5 rounded-full bg-paper/10 hover:bg-paper/20 text-paper text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  {copied === i ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" /> Đã chép
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Sao chép
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// 3. PRACTICE WORKFLOW — Section 09 (Workflow)
// ============================================
export function PracticeWorkflow({ steps, onMissionDone, isMissionDone }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleComplete = (idx) => {
    onMissionDone(`step-${idx}`, `Hoàn thành bước ${idx + 1}`);
    if (idx < steps.length - 1) {
      setTimeout(() => setActiveStep(idx + 1), 600);
    }
  };

  const completedCount = steps.filter((_, i) => isMissionDone(`step-${i}`)).length;

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-ink-900/10 bg-cream px-5 py-3">
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-900/60 mb-1">
          Tiến độ: {completedCount}/{steps.length} bước
        </div>
        <div className="h-1.5 bg-ink-900/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-ink-900"
            animate={{ width: `${(completedCount / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 md:p-7 bg-paper">
        <div className="max-w-3xl mx-auto space-y-3">
          {steps.map((step, i) => {
            const done = isMissionDone(`step-${i}`);
            const active = activeStep === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`card-base p-5 transition-all ${
                  active ? "border-ink-900/30 shadow-xl" : ""
                } ${done ? "bg-accent-lime/5 border-accent-lime/40" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                      done
                        ? "bg-accent-lime"
                        : active
                        ? "bg-ink-900 text-paper"
                        : "bg-ink-900/5"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="w-7 h-7 text-ink-900" strokeWidth={2.5} />
                    ) : (
                      <span
                        className={`display-heading text-2xl ${
                          active ? "text-accent-gold" : "text-ink-900/60"
                        }`}
                      >
                        {step.step}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="vn-heading text-lg text-ink-900 mb-1">{step.name}</h4>
                    <p className="text-sm text-ink-900/70 mb-3">{step.desc}</p>
                    {step.detail && (
                      <div className="rounded-xl bg-cream p-3 mb-3 text-sm text-ink-900/80 leading-relaxed">
                        {step.detail}
                      </div>
                    )}
                    {!done ? (
                      <button
                        onClick={() => handleComplete(i)}
                        disabled={!active}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-ink-900 text-paper hover:bg-ink-800 disabled:bg-ink-900/20 disabled:cursor-not-allowed transition-colors"
                      >
                        Đánh dấu hoàn thành
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-ink-700">✓ Đã hoàn thành</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================
// 4. PRACTICE CHECKLIST — Section 10 (An toàn)
// ============================================
export function PracticeChecklist({ items, onMissionDone, isMissionDone }) {
  const handleToggle = (i, txt) => {
    onMissionDone(`check-${i}`, `Đã hiểu: ${txt.slice(0, 40)}...`);
  };

  const checked = items.filter((_, i) => isMissionDone(`check-${i}`)).length;

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-ink-900/10 bg-cream px-5 py-3">
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-900/60 mb-1">
          Cam kết tuân thủ: {checked}/{items.length}
        </div>
        <p className="text-sm text-ink-900/80">
          Đọc kỹ từng điều và <strong>tick xác nhận</strong> bạn đã hiểu và sẽ tuân thủ.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 md:p-7 bg-paper">
        <div className="max-w-2xl mx-auto space-y-2.5">
          {items.map((item, i) => {
            const done = isMissionDone(`check-${i}`);
            return (
              <button
                key={i}
                onClick={() => handleToggle(i, item)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                  done
                    ? "border-accent-lime/40 bg-accent-lime/10"
                    : "border-ink-900/15 bg-white hover:border-ink-900/30"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 transition-colors ${
                    done
                      ? "border-accent-lime bg-accent-lime"
                      : "border-ink-900/25 bg-white"
                  }`}
                >
                  {done && <CheckCircle2 className="w-4 h-4 text-ink-900" strokeWidth={3} />}
                </div>
                <span className="text-sm text-ink-900 leading-relaxed flex-1">{item}</span>
              </button>
            );
          })}
        </div>

        {checked === items.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 max-w-2xl mx-auto p-5 rounded-2xl bg-ink-900 text-paper text-center"
          >
            <Sparkles className="w-8 h-8 mx-auto mb-2 text-accent-gold" />
            <div className="vn-heading text-lg mb-1">Xuất sắc!</div>
            <p className="text-sm text-paper/80">
              Bạn đã cam kết tuân thủ đầy đủ. Hãy giữ vững nguyên tắc này khi sử dụng AI hàng ngày.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
