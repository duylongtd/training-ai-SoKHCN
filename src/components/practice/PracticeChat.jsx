import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, User, Sparkles, ExternalLink, CheckCircle2, X,
  Settings, Loader2, Zap, ZapOff, AlertCircle, Key,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ChatGPTLogo, GeminiLogo } from "../ToolLogos";
import useGeminiKey, { callGemini } from "../../hooks/useGeminiKey";

// ============================================
// CHẤM OFFLINE (regex fallback khi chưa có API key)
// ============================================

function analyzePromptOffline(prompt) {
  const text = prompt.toLowerCase();
  const checks = {
    vaiTro: /đóng vai|nhập vai|bạn là|hãy là|với vai trò|tôi là|chuyên viên|chuyên gia|cán bộ|nhà nghiên cứu|biên tập|giáo viên/.test(text),
    yeuCau: /(hãy|vui lòng|soạn|viết|tạo|tóm tắt|phân tích|đề xuất|liệt kê|so sánh|dịch|kiểm tra|đánh giá|tổng hợp|lập|xây dựng)/.test(text),
    mucTieu: /(để|nhằm|với mục đích|mục tiêu|phục vụ|giúp)/.test(text),
    boiCanh: /(đối tượng|người đọc|trong bối cảnh|dành cho|cho cán bộ|cho người dân|trong tình huống|tại|trên địa bàn|của xã|của phường)/.test(text),
    duLieu: /(dữ liệu|tài liệu|đính kèm|theo|dựa trên|dựa vào|sau đây|dưới đây|gồm|với các số liệu|với nội dung|bao gồm)/.test(text),
  };
  const labels = {
    vaiTro: "Vai trò", yeuCau: "Yêu cầu", mucTieu: "Mục tiêu",
    boiCanh: "Bối cảnh", duLieu: "Dữ liệu đầu vào",
  };
  const components = Object.keys(checks).map((k) => ({
    name: labels[k],
    has: checks[k],
    evidence: checks[k] ? "Phát hiện được từ khóa liên quan" : "Chưa có",
  }));
  const score = components.filter((c) => c.has).length;
  return {
    score,
    components,
    feedback:
      score >= 4
        ? "Xuất sắc — câu lệnh đã đủ thành phần cốt lõi. AI sẽ trả lời chi tiết và chính xác."
        : score >= 2
        ? "Tạm ổn — còn thiếu vài thành phần quan trọng. Bổ sung sẽ giúp AI hiểu rõ hơn."
        : "Câu lệnh còn quá chung chung. Hãy thêm Vai trò + Bối cảnh + Dữ liệu cụ thể.",
    improved: null,
    offline: true,
  };
}

// ============================================
// CHẤM BẰNG GEMINI THẬT
// ============================================

const GRADER_SYSTEM = `Bạn là giảng viên dạy CÁN BỘ XÃ/PHƯỜNG Việt Nam viết câu lệnh AI (prompt) hiệu quả. Người học vừa gửi 1 câu lệnh — nhiệm vụ của bạn là CHẤM ĐIỂM câu lệnh đó theo CÔNG THỨC 5 THÀNH PHẦN:

1. **Vai trò (Role)**: Câu lệnh có yêu cầu AI đóng vai cụ thể không? (chuyên viên, biên tập, giáo viên, MC...)
2. **Yêu cầu (Task)**: AI cần làm gì cụ thể? (soạn, tóm tắt, phân tích, đề xuất, so sánh, liệt kê...)
3. **Mục tiêu (Goal)**: Câu lệnh có nêu mục đích / phục vụ ai không?
4. **Bối cảnh (Context)**: Có thông tin tình huống / đối tượng đọc / địa bàn không?
5. **Dữ liệu đầu vào (Input)**: Có cung cấp dữ liệu / tài liệu / số liệu cụ thể không?

NGUYÊN TẮC CHẤM:
- Chấm THẬT, không cho điểm khi không có dấu hiệu. Câu lệnh hời hợt thì cho điểm thấp.
- Câu "Tóm tắt Nghị quyết 57" chỉ có Yêu cầu — 1/5 điểm.
- Câu có vai trò rõ + yêu cầu rõ + bối cảnh rõ thì cho 3-4/5.
- Câu đầy đủ 5 thành phần và cụ thể thì cho 5/5.

Trả về DUY NHẤT 1 JSON object (không markdown fence, không text khác) theo schema:
{
  "score": <số nguyên 0-5>,
  "components": [
    {"name": "Vai trò", "has": true|false, "evidence": "<trích đoạn câu lệnh nếu có, hoặc 'Chưa có'>"},
    {"name": "Yêu cầu", "has": true|false, "evidence": "..."},
    {"name": "Mục tiêu", "has": true|false, "evidence": "..."},
    {"name": "Bối cảnh", "has": true|false, "evidence": "..."},
    {"name": "Dữ liệu đầu vào", "has": true|false, "evidence": "..."}
  ],
  "feedback": "<1-2 câu nhận xét tổng quan, tiếng Việt, giọng thân thiện như giáo viên>",
  "improved": "<gợi ý 1 phiên bản câu lệnh cải tiến nếu chưa đạt 5/5, đầy đủ ngữ cảnh cán bộ xã/phường. Nếu đã 5/5 thì viết: null>"
}`;

async function gradeWithGemini(apiKey, prompt) {
  const result = await callGemini(apiKey, GRADER_SYSTEM, prompt, {
    jsonMode: true,
    temperature: 0.3,
    maxTokens: 1000,
  });
  // Validate cấu trúc
  if (typeof result.score !== "number" || !Array.isArray(result.components)) {
    throw new Error("Phản hồi từ Gemini không đúng định dạng");
  }
  return { ...result, offline: false };
}

const samplePrompts = [
  "Tóm tắt Nghị quyết 57",
  "Đóng vai chuyên viên văn phòng. Hãy tóm tắt Nghị quyết 57 dành cho cán bộ Đảng địa phương, gồm 5 ý chính theo gạch đầu dòng.",
  "Đóng vai chuyên viên truyền thông UBND xã. Hãy soạn tin nhắn Zalo thông báo lịch tiêm chủng cho bà con thôn Hạ, mục tiêu để 100% gia đình có trẻ em đăng ký. Bối cảnh: thôn vùng sâu, người lớn tuổi nhiều. Dữ liệu: lịch tiêm từ 7-11h ngày 25/11 tại Trạm Y tế xã.",
];

// ============================================
// COMPONENT BREAKDOWN UI
// ============================================

function ScoreBreakdown({ data }) {
  return (
    <div className="space-y-2.5">
      {/* Components grid */}
      <div className="grid grid-cols-1 gap-1.5">
        {data.components.map((c, i) => (
          <div
            key={i}
            className={`flex items-start gap-2.5 px-3 py-2 rounded-xl border ${
              c.has
                ? "bg-accent-lime/10 border-accent-lime/40"
                : "bg-accent-coral/5 border-accent-coral/20"
            }`}
          >
            <div
              className={`flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center mt-0.5 ${
                c.has ? "bg-accent-lime" : "bg-accent-coral/30"
              }`}
            >
              {c.has ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-ink-900" strokeWidth={3} />
              ) : (
                <X className="w-3.5 h-3.5 text-accent-coral" strokeWidth={3} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-ink-900">{c.name}</div>
              <div className={`text-xs leading-relaxed mt-0.5 ${c.has ? "text-ink-700" : "text-ink-900/55"}`}>
                {c.evidence}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback */}
      {data.feedback && (
        <div className="px-3 py-2.5 rounded-xl bg-ink-900 text-paper text-xs leading-relaxed">
          <span className="text-accent-gold font-bold">💬 Nhận xét:</span>{" "}
          {data.feedback}
        </div>
      )}

      {/* Improved version */}
      {data.improved && data.improved !== "null" && (
        <div className="px-3 py-2.5 rounded-xl bg-accent-gold/10 border border-accent-gold/30">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-900/65 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Phiên bản cải tiến gợi ý
          </div>
          <div className="text-xs text-ink-900/85 italic leading-relaxed font-mono">
            "{data.improved}"
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// API KEY SETTINGS PANEL
// ============================================

function ApiKeyPanel({ hasKey, saveKey, onClose }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Hãy dán API key vào ô bên trên");
      return;
    }
    if (!trimmed.startsWith("AIza") || trimmed.length < 30) {
      setError("API key Gemini thường bắt đầu bằng 'AIza' và dài 39 ký tự");
      return;
    }
    saveKey(trimmed);
    setInput("");
    setError("");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="border-b border-ink-900/10 bg-ink-900 text-paper px-5 py-4"
    >
      <div className="flex items-start gap-2 mb-3">
        <Key className="w-4 h-4 text-accent-gold mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="vn-heading text-sm">Thiết lập Gemini API key</div>
          <p className="text-xs text-paper/75 mt-1">
            Lấy API key MIỄN PHÍ tại{" "}
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noreferrer"
              className="underline text-accent-gold hover:text-accent-gold/80 inline-flex items-center gap-1"
            >
              Google AI Studio <ExternalLink className="w-3 h-3" />
            </a>
            . Key lưu cục bộ trong máy bạn, không gửi lên đâu khác.
          </p>
        </div>
        <button onClick={onClose} className="text-paper/60 hover:text-paper flex-shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>

      {hasKey && (
        <div className="mb-3 px-3 py-2 rounded-lg bg-accent-lime/10 border border-accent-lime/30 text-xs text-paper/90 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent-lime" />
            Đã có API key — đang dùng chế độ AI thật
          </span>
          <button
            onClick={() => saveKey("")}
            className="text-accent-coral hover:underline font-semibold"
          >
            Xoá key
          </button>
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
          placeholder="Dán API key vào đây (AIza...)"
          className="flex-1 bg-paper/10 border border-paper/20 rounded-lg px-3 py-2 text-sm text-paper placeholder:text-paper/40 outline-none focus:border-accent-gold font-mono"
        />
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-accent-gold hover:bg-accent-gold/90 text-ink-900 font-semibold text-sm transition-colors"
        >
          Lưu key
        </button>
      </div>
      {error && (
        <div className="mt-2 text-xs text-accent-coral flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </div>
      )}
    </motion.div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function PracticeChat({ onMissionDone, isMissionDone }) {
  const { apiKey, saveKey, hasKey } = useGeminiKey();
  const [showSettings, setShowSettings] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      type: "intro",
      content:
        "Chào bạn! Đây là khung thực hành **viết câu lệnh AI**.\n\nMỗi câu lệnh bạn gửi sẽ được AI chấm theo **công thức 5 thành phần**:\n\n- **Vai trò** AI đóng (chuyên viên, biên tập, MC...)\n- **Yêu cầu** AI cần làm gì\n- **Mục tiêu** để làm gì\n- **Bối cảnh** tình huống cụ thể\n- **Dữ liệu** đầu vào\n\nHãy thử gõ một câu lệnh — hoặc bấm vào câu mẫu bên dưới.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [highScoreCount, setHighScoreCount] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async (text) => {
    const prompt = (text ?? input).trim();
    if (!prompt || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setInput("");
    setLoading(true);

    let result;
    let errorMsg = null;

    try {
      if (hasKey) {
        result = await gradeWithGemini(apiKey, prompt);
      } else {
        result = analyzePromptOffline(prompt);
      }
    } catch (e) {
      console.error("Grading failed:", e);
      errorMsg = e.message || String(e);
      result = analyzePromptOffline(prompt);
      result.fallbackReason = "Gemini lỗi, dùng tạm chấm offline";
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        type: "grade",
        data: result,
        errorMsg,
      },
    ]);
    setLoading(false);

    const newSent = sentCount + 1;
    const newHigh = result.score >= 4 ? highScoreCount + 1 : highScoreCount;
    setSentCount(newSent);
    setHighScoreCount(newHigh);

    if (newSent === 1) onMissionDone("first-prompt", "Đã gửi câu lệnh đầu tiên!");
    if (newHigh === 1) onMissionDone("good-prompt", "Viết được câu lệnh chuẩn 4/5!");
    if (newSent === 3) onMissionDone("practice-prompt", "Đã luyện tập đủ 3 câu lệnh!");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Missions tracker */}
      <div className="border-b border-ink-900/10 bg-cream px-5 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-900/60">
            3 nhiệm vụ
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${
              hasKey
                ? "bg-accent-lime/20 text-ink-700 border border-accent-lime/40"
                : "bg-ink-900/5 text-ink-900/60 hover:bg-ink-900/10 border border-ink-900/15"
            }`}
            title={hasKey ? "Đang dùng AI thật" : "Bấm để thêm API key Gemini"}
          >
            {hasKey ? (
              <>
                <Zap className="w-3 h-3" /> AI thật
              </>
            ) : (
              <>
                <ZapOff className="w-3 h-3" /> Chấm offline
              </>
            )}
            <Settings className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {[
            { id: "first-prompt", label: "Gửi câu lệnh đầu" },
            { id: "good-prompt", label: "Đạt 4/5 thành phần" },
            { id: "practice-prompt", label: "Luyện 3 lần" },
          ].map((m) => {
            const done = isMissionDone(m.id);
            return (
              <div
                key={m.id}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${
                  done
                    ? "bg-accent-lime/20 border-accent-lime/50 text-ink-700"
                    : "bg-white border-ink-900/10 text-ink-900/60"
                }`}
              >
                <CheckCircle2
                  className={`w-3.5 h-3.5 flex-shrink-0 ${done ? "text-ink-700" : "text-ink-900/25"}`}
                />
                <span className="truncate">{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <ApiKeyPanel
            hasKey={hasKey}
            saveKey={saveKey}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>

      {/* Banner gợi ý thêm API key */}
      {!hasKey && !showSettings && (
        <div className="border-b border-accent-gold/30 bg-accent-gold/10 px-5 py-2.5 flex items-center gap-2 text-xs text-ink-900">
          <Zap className="w-4 h-4 text-accent-gold flex-shrink-0" />
          <span className="flex-1">
            Đang chấm bằng <strong>regex offline</strong>. Thêm API key Gemini (miễn phí) để AI thật chấm chi tiết hơn.
          </span>
          <button
            onClick={() => setShowSettings(true)}
            className="font-bold text-ink-900 hover:underline whitespace-nowrap"
          >
            Thêm key →
          </button>
        </div>
      )}

      {/* Logo bar */}
      <div className="border-b border-ink-900/10 bg-paper px-5 py-3 flex flex-wrap items-center gap-2 md:gap-3">
        <span className="text-xs text-ink-900/60 font-medium">Thử ngay trên AI thật →</span>
        <a
          href="https://chat.openai.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 px-3 py-1.5 rounded-full bg-white border border-ink-900/15 hover:border-ink-900/40 hover:bg-emerald-50 transition-colors"
        >
          <ChatGPTLogo className="w-4 h-4" />
          ChatGPT
          <ExternalLink className="w-3 h-3 text-ink-900/40" />
        </a>
        <a
          href="https://gemini.google.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 px-3 py-1.5 rounded-full bg-white border border-ink-900/15 hover:border-ink-900/40 hover:bg-blue-50 transition-colors"
        >
          <GeminiLogo className="w-4 h-4" />
          Gemini
          <ExternalLink className="w-3 h-3 text-ink-900/40" />
        </a>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-paper">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "assistant" && (
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-ink-900 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent-gold" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-ink-900 text-paper rounded-br-sm"
                  : "bg-cream text-ink-900 rounded-bl-sm border border-ink-900/10"
              }`}
            >
              {/* Intro / text message */}
              {msg.role === "user" && <div>{msg.content}</div>}

              {msg.role === "assistant" && msg.type === "intro" && (
                <div className="prose-chat">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              )}

              {/* Grade message */}
              {msg.role === "assistant" && msg.type === "grade" && msg.data && (
                <>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <div
                      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        msg.data.score >= 4
                          ? "bg-accent-lime text-ink-900"
                          : msg.data.score >= 2
                          ? "bg-accent-gold text-ink-900"
                          : "bg-accent-coral text-paper"
                      }`}
                    >
                      Điểm: {msg.data.score}/5
                    </div>
                    <div
                      className={`inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        msg.data.offline
                          ? "bg-ink-900/10 text-ink-900/60"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {msg.data.offline ? (
                        <>
                          <ZapOff className="w-3 h-3" /> Offline
                        </>
                      ) : (
                        <>
                          <Zap className="w-3 h-3" /> Gemini
                        </>
                      )}
                    </div>
                    {msg.data.fallbackReason && (
                      <div className="text-[10px] text-accent-coral italic">
                        ⚠ {msg.data.fallbackReason}
                      </div>
                    )}
                  </div>
                  <ScoreBreakdown data={msg.data} />
                  {msg.errorMsg && (
                    <details className="mt-3 text-xs">
                      <summary className="cursor-pointer text-accent-coral font-semibold">
                        Chi tiết lỗi API
                      </summary>
                      <pre className="mt-1 p-2 bg-ink-900/5 rounded-lg overflow-x-auto text-[10px]">
                        {msg.errorMsg}
                      </pre>
                    </details>
                  )}
                </>
              )}
            </div>
            {msg.role === "user" && (
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-accent-gold flex items-center justify-center">
                <User className="w-4 h-4 text-ink-900" />
              </div>
            )}
          </motion.div>
        ))}

        {/* Loading state */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2.5"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-ink-900 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-accent-gold animate-spin" />
            </div>
            <div className="bg-cream rounded-2xl rounded-bl-sm border border-ink-900/10 px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-ink-900/65">
                <span>{hasKey ? "Gemini đang chấm câu lệnh..." : "Đang phân tích..."}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Sample prompts */}
      {messages.length <= 1 && !loading && (
        <div className="border-t border-ink-900/5 px-5 py-3 bg-paper">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-900/55 mb-2">
            Câu lệnh mẫu để thử
          </div>
          <div className="flex flex-col gap-1.5">
            {samplePrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="text-left text-xs px-3 py-2 rounded-lg bg-cream hover:bg-accent-gold/15 border border-ink-900/10 text-ink-900/85 transition-colors"
              >
                <span className="font-mono">"{p}"</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-ink-900/10 bg-paper p-3">
        <div className="flex items-end gap-2 bg-cream rounded-2xl p-1.5 pl-4 border border-ink-900/10 focus-within:border-ink-900/30 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={hasKey ? "Viết câu lệnh — Gemini sẽ chấm chi tiết..." : "Viết câu lệnh của bạn..."}
            rows={2}
            disabled={loading}
            className="flex-1 bg-transparent resize-none outline-none text-sm py-2 max-h-32 text-ink-900 placeholder:text-ink-900/40 disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-full bg-ink-900 hover:bg-ink-800 disabled:bg-ink-900/30 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 text-accent-gold animate-spin" />
            ) : (
              <Send className="w-4 h-4 text-accent-gold" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
