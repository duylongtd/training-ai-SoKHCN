import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles, ExternalLink, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ChatGPTLogo, GeminiLogo } from "../ToolLogos";

// Offline AI: phân tích prompt để chấm điểm theo công thức 5 thành phần
function analyzePrompt(prompt) {
  const text = prompt.toLowerCase();
  const scores = {
    vaiTro: /đóng vai|nhập vai|bạn là|hãy là|với vai trò|tôi là|chuyên viên|chuyên gia|cán bộ|nhà nghiên cứu|biên tập|giáo viên/.test(text),
    yeuCau: /(hãy|vui lòng|soạn|viết|tạo|tóm tắt|phân tích|đề xuất|liệt kê|so sánh|dịch|kiểm tra|đánh giá|tổng hợp|lập|xây dựng)/.test(text),
    mucTieu: /(để|nhằm|với mục đích|mục tiêu|phục vụ|giúp)/.test(text),
    boiCanh: /(đối tượng|người đọc|trong bối cảnh|dành cho|cho cán bộ|cho người dân|trong tình huống|tại|trên địa bàn|của xã|của phường)/.test(text),
    duLieu: /(dữ liệu|tài liệu|đính kèm|theo|dựa trên|dựa vào|sau đây|dưới đây|gồm|với các số liệu|với nội dung|bao gồm)/.test(text),
  };

  const count = Object.values(scores).filter(Boolean).length;
  return { scores, count };
}

function feedbackMessage(prompt) {
  const { scores, count } = analyzePrompt(prompt);
  const wordCount = prompt.trim().split(/\s+/).length;

  const labels = {
    vaiTro: "Vai trò",
    yeuCau: "Yêu cầu",
    mucTieu: "Mục tiêu",
    boiCanh: "Bối cảnh",
    duLieu: "Dữ liệu đầu vào",
  };

  const have = Object.keys(scores).filter((k) => scores[k]).map((k) => labels[k]);
  const lack = Object.keys(scores).filter((k) => !scores[k]).map((k) => labels[k]);

  let body = "";
  let level = "low";

  if (wordCount < 5) {
    body = `**Câu lệnh quá ngắn (${wordCount} từ).** Cố gắng viết đầy đủ hơn — câu lệnh càng cụ thể, kết quả càng chất lượng. Hãy thử lại với công thức 5 thành phần.`;
    level = "low";
  } else if (count >= 4) {
    body = `**Xuất sắc!** Câu lệnh của bạn đã có **${count}/5** thành phần của công thức chuẩn:\n\n- Có: ${have.join(", ")}\n${lack.length ? `- Thiếu: ${lack.join(", ")}` : "- Đã đủ cả 5 thành phần! 🎉"}\n\n→ Với câu lệnh này, ChatGPT/Gemini sẽ cho ra câu trả lời rất chất lượng.`;
    level = "high";
  } else if (count >= 2) {
    body = `Câu lệnh tạm ổn — có **${count}/5** thành phần.\n\n- Có: ${have.join(", ")}\n- **Nên bổ sung:** ${lack.join(", ")}\n\n*Gợi ý:* Hãy nêu rõ AI cần "đóng vai" gì và "dành cho ai" để câu trả lời chính xác hơn.`;
    level = "mid";
  } else {
    body = `Câu lệnh còn quá chung chung — chỉ có **${count}/5** thành phần.\n\n${have.length ? `- Đã có: ${have.join(", ")}\n` : ""}- **Cần bổ sung:** ${lack.join(", ")}\n\n**Ví dụ mẫu:** *"Đóng vai chuyên viên văn phòng UBND xã. Hãy soạn báo cáo tổng kết quý III nhằm phục vụ cuộc họp Đảng uỷ. Đối tượng đọc là Bí thư xã. Dữ liệu đính kèm phía dưới."*`;
    level = "low";
  }

  return { body, level, count };
}

const samplePrompts = [
  "Tóm tắt Nghị quyết 57",
  "Đóng vai chuyên viên văn phòng. Hãy tóm tắt Nghị quyết 57 dành cho cán bộ Đảng địa phương, gồm 5 ý chính theo gạch đầu dòng.",
  "Đóng vai chuyên viên truyền thông UBND xã. Hãy soạn tin nhắn Zalo thông báo lịch tiêm chủng cho bà con thôn Hạ, mục tiêu để 100% gia đình có trẻ em đăng ký. Bối cảnh: thôn vùng sâu, người lớn tuổi nhiều. Dữ liệu: lịch tiêm từ 7-11h ngày 25/11 tại Trạm Y tế xã.",
];

export default function PracticeChat({ onMissionDone, isMissionDone }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Chào bạn! Đây là khung thực hành **viết câu lệnh AI**.\n\nTôi sẽ đóng vai một AI để bạn luyện viết prompt. Sau mỗi câu lệnh bạn gửi, tôi sẽ:\n\n- **Chấm điểm** câu lệnh theo công thức 5 thành phần\n- Chỉ ra thiếu sót cần bổ sung\n- Gợi ý cách viết tốt hơn\n\nHãy thử gõ một câu lệnh — hoặc bấm vào câu mẫu bên dưới.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sentCount, setSentCount] = useState(0);
  const [highScoreCount, setHighScoreCount] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = (text) => {
    const prompt = (text ?? input).trim();
    if (!prompt) return;
    const { body, count } = feedbackMessage(prompt);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: prompt },
      { role: "assistant", content: body, score: count },
    ]);
    setInput("");

    const newSent = sentCount + 1;
    const newHigh = count >= 4 ? highScoreCount + 1 : highScoreCount;
    setSentCount(newSent);
    setHighScoreCount(newHigh);

    // Mission 1: Gửi 1 câu lệnh đầu tiên
    if (newSent === 1) onMissionDone("first-prompt", "Đã gửi câu lệnh đầu tiên!");
    // Mission 2: Đạt câu lệnh tốt (>=4/5)
    if (newHigh === 1) onMissionDone("good-prompt", "Viết được câu lệnh chuẩn 4/5!");
    // Mission 3: Gửi 3 câu trở lên
    if (newSent === 3) onMissionDone("practice-prompt", "Đã luyện tập đủ 3 câu lệnh!");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Missions tracker */}
      <div className="border-b border-ink-900/10 bg-cream px-5 py-3">
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-900/60 mb-2">
          3 nhiệm vụ
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
                <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${done ? "text-ink-700" : "text-ink-900/25"}`} />
                <span className="truncate">{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>

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
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-ink-900 text-paper rounded-br-sm"
                  : "bg-cream text-ink-900 rounded-bl-sm border border-ink-900/10"
              }`}
            >
              {msg.score !== undefined && (
                <div
                  className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 ${
                    msg.score >= 4
                      ? "bg-accent-lime/30 text-ink-700"
                      : msg.score >= 2
                      ? "bg-accent-gold/30 text-ink-900"
                      : "bg-accent-coral/30 text-ink-900"
                  }`}
                >
                  Điểm: {msg.score}/5
                </div>
              )}
              <div className="prose-chat">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
            {msg.role === "user" && (
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-accent-gold flex items-center justify-center">
                <User className="w-4 h-4 text-ink-900" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Sample prompts */}
      {messages.length <= 1 && (
        <div className="border-t border-ink-900/5 px-5 py-3">
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
            placeholder="Viết câu lệnh của bạn..."
            rows={2}
            className="flex-1 bg-transparent resize-none outline-none text-sm py-2 max-h-32 text-ink-900 placeholder:text-ink-900/40"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-ink-900 hover:bg-ink-800 disabled:bg-ink-900/30 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4 text-accent-gold" />
          </button>
        </div>
      </div>
    </div>
  );
}
