import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot, User, Settings, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { faqData, quickQuestions } from "../data/content";
import useGeminiKey from "../hooks/useGeminiKey";

// Tìm câu trả lời từ FAQ
function findAnswer(input) {
  const lower = input.toLowerCase();
  for (const item of faqData) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.answer;
    }
  }
  return null;
}

// Gọi Gemini qua server proxy /api/gemini — key chỉ ở server
async function askGemini(history, question) {
  const systemPrompt = `Bạn là trợ lý AI hỗ trợ cán bộ xã/phường Việt Nam học cách sử dụng ChatGPT, Gemini và NotebookLM trong công tác văn phòng. 
Trả lời ngắn gọn, dễ hiểu, dùng tiếng Việt. 
Dùng định dạng Markdown: **đậm**, dấu đầu dòng, để câu trả lời dễ đọc.
Nếu câu hỏi không liên quan đến AI hoặc công tác văn phòng, lịch sự gợi ý quay lại chủ đề.`;

  // Ghép history vào userPrompt vì proxy hiện chỉ nhận single message
  const historyText = history
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n\n");
  const fullPrompt = historyText
    ? `${historyText}\n\nUser: ${question}`
    : question;

  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemPrompt,
      userPrompt: fullPrompt,
      temperature: 0.7,
      maxTokens: 800,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Server lỗi ${res.status}`);
    err.serverNotConfigured = res.status === 503;
    throw err;
  }
  return data.text || "Xin lỗi, tôi chưa có câu trả lời.";
}

export default function Chatbot({ open, onClose, onOpen }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Xin chào! Tôi là trợ lý AI giúp bạn tìm hiểu về **ChatGPT, Gemini và NotebookLM**.\n\nBạn có thể hỏi tôi bất kỳ điều gì về cách dùng AI trong công tác văn phòng — hoặc bấm vào một câu hỏi gợi ý bên dưới.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { hasKey, checked } = useGeminiKey();
  const [showSettings, setShowSettings] = useState(false);
  const scrollRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (text) => {
    const question = (text ?? input).trim();
    if (!question || loading) return;

    const newMessages = [...messages, { role: "user", content: question }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Thử Gemini API qua server proxy nếu server có key
      let answer = null;
      if (hasKey) {
        try {
          answer = await askGemini(messages, question);
        } catch (e) {
          console.warn("Gemini failed, fallback to FAQ", e);
        }
      }

      // Fallback FAQ
      if (!answer) {
        answer = findAnswer(question);
        if (!answer) {
          answer = `Tôi chưa có câu trả lời sẵn cho câu hỏi này. Bạn có thể:\n\n- Hỏi cụ thể hơn về **AI, ChatGPT, Gemini, NotebookLM**, câu lệnh, ứng dụng văn phòng, an toàn\n- Cuộn trang để xem nội dung chi tiết\n- Bấm **"Lộ trình học"** để xem mind map`;
        }
      }

      // Simulate streaming feel
      await new Promise((r) => setTimeout(r, 300));
      setMessages([...newMessages, { role: "assistant", content: answer }]);
    } catch (e) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Có lỗi xảy ra. Vui lòng thử lại." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            onClick={onOpen}
            className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-30 group"
            aria-label="Mở chatbot"
          >
            <div className="absolute inset-0 bg-accent-gold rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity animate-pulse" />
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-ink-900 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-accent-gold" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-lime border-2 border-paper" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 250 }}
            className="fixed inset-0 md:inset-auto md:bottom-5 md:right-5 z-40 md:w-[420px] md:h-[640px] md:max-h-[calc(100vh-2.5rem)] bg-paper md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-ink-900/10"
          >
            {/* Header */}
            <div className="bg-ink-900 text-paper px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-accent-gold flex items-center justify-center">
                    <Bot className="w-5 h-5 text-ink-900" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent-lime border-2 border-ink-900" />
                </div>
                <div>
                  <div className="vn-heading text-base text-paper">Trợ lý AI Tập huấn</div>
                  <div className="text-[11px] text-paper/60">
                    {!checked
                      ? "Đang kết nối..."
                      : hasKey
                      ? "Gemini · Trực tuyến"
                      : "Chế độ FAQ · Server chưa có key"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-paper/10 hover:bg-paper/20 flex items-center justify-center transition-colors"
                  aria-label="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-paper"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink-900 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-accent-gold" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-ink-900 text-paper rounded-br-sm"
                        : "bg-cream text-ink-900 rounded-bl-sm border border-ink-900/10"
                    }`}
                  >
                    <div className="prose-chat">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                  {msg.role === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-gold flex items-center justify-center">
                      <User className="w-4 h-4 text-ink-900" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Loading dots */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink-900 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-accent-gold" />
                  </div>
                  <div className="bg-cream border border-ink-900/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-ink-900/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-ink-900/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-ink-900/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3 border-t border-ink-900/5 pt-3">
                <div className="text-[10px] font-bold text-ink-900/55 uppercase tracking-widest mb-2">
                  Câu hỏi gợi ý
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="text-xs px-3 py-1.5 rounded-full bg-cream hover:bg-accent-gold/20 border border-ink-900/10 text-ink-900 transition-colors"
                    >
                      {q}
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
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập câu hỏi..."
                  rows={1}
                  className="flex-1 bg-transparent resize-none outline-none text-sm py-2 max-h-32 text-ink-900 placeholder:text-ink-900/40"
                  style={{ minHeight: "36px" }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-full bg-ink-900 hover:bg-ink-800 disabled:bg-ink-900/30 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Gửi"
                >
                  <Send className="w-4 h-4 text-accent-gold" />
                </button>
              </div>
              <div className="text-[10px] text-ink-900/40 mt-2 text-center">
                AI có thể bịa thông tin · Luôn kiểm chứng với việc quan trọng
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
