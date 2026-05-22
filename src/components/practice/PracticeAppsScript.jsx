import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Highlight, themes } from "prism-react-renderer";
import {
  Code,
  Copy,
  Download,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Mail,
  FileSpreadsheet,
  FolderOpen,
  FileText,
  Calendar,
  ClipboardList,
  BookOpen,
  Play,
  ArrowLeft,
  Zap,
  Lightbulb,
} from "lucide-react";
import {
  CODE_DEMO,
  PROMPT_MAU,
  DICH_VU_GOOGLE,
  SHEET_TEMPLATE_URL,
} from "../../data/appsScriptData";

const ICON_MAP = {
  mail: Mail,
  sheet: FileSpreadsheet,
  drive: FolderOpen,
  doc: FileText,
  calendar: Calendar,
  form: ClipboardList,
};

function CodeViewerModal({ open, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE_DEMO);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([CODE_DEMO], {
      type: "text/javascript;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "guiThuNhapLuong.gs";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-ink-950/80 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col w-full max-w-4xl max-h-full overflow-hidden shadow-2xl bg-paper rounded-3xl"
          >
            <div className="flex items-center justify-between flex-shrink-0 px-5 py-4 border-b border-ink-900/10 bg-cream">
              <div className="flex items-center min-w-0 gap-3">
                <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl bg-ink-900">
                  <Code className="w-5 h-5 text-accent-gold" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm truncate vn-heading md:text-base text-ink-900">
                    Code Apps Script — Gửi email lương
                  </div>
                  <div className="text-xs text-ink-900/60">
                    guiThuNhapLuong.gs
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-ink-900/5 hover:bg-ink-900/10 text-ink-900 transition-colors"
                >
                  {copied ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-lime" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? "Đã copy!" : "Copy code"}
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-ink-900 text-paper hover:bg-ink-800 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Tải .gs
                </button>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center rounded-full w-9 h-9 bg-ink-900/5 hover:bg-ink-900/10"
                >
                  <ArrowLeft className="w-4 h-4 rotate-45" />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto bg-[#1e1e1e]">
              <Highlight
                code={CODE_DEMO}
                language="javascript"
                theme={themes.vsDark}
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps,
                }) => (
                  <pre
                    className={
                      className +
                      " text-xs md:text-sm p-4 md:p-5 leading-relaxed"
                    }
                    style={{ ...style, background: "transparent" }}
                  >
                    {tokens.map((line, i) => (
                      <div
                        key={i}
                        {...getLineProps({ line })}
                        className="table-row"
                      >
                        <span className="table-cell w-12 pr-4 text-right select-none text-ink-900/40">
                          {i + 1}
                        </span>
                        <span className="table-cell">
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </span>
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function PromptViewerModal({ open, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT_MAU);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-ink-950/80 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col w-full max-w-2xl max-h-full overflow-hidden shadow-2xl bg-paper rounded-3xl"
          >
            <div className="flex items-center justify-between flex-shrink-0 px-5 py-4 border-b border-ink-900/10 bg-cream">
              <div className="flex items-center min-w-0 gap-3">
                <Sparkles className="flex-shrink-0 w-5 h-5 text-accent-gold" />
                <div className="min-w-0">
                  <div className="text-sm vn-heading md:text-base text-ink-900">
                    Prompt mẫu — Yêu cầu Gemini/Claude viết code
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-ink-900 text-paper hover:bg-ink-800 transition-colors"
                >
                  {copied ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? "Đã copy!" : "Copy prompt"}
                </button>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center rounded-full w-9 h-9 bg-ink-900/5 hover:bg-ink-900/10"
                >
                  <ArrowLeft className="w-4 h-4 rotate-45" />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 p-5 overflow-y-auto md:p-6">
              <pre className="font-mono text-[13px] text-ink-900 leading-relaxed whitespace-pre-wrap bg-cream p-4 rounded-2xl border border-ink-900/10">
                {PROMPT_MAU}
              </pre>
              <div className="p-4 mt-4 text-sm border rounded-2xl bg-accent-lime/15 border-accent-lime/40 text-ink-900">
                <strong>💡 Mẹo:</strong> Anh có thể sửa prompt này theo nhu cầu
                — đổi tên cột, thay định dạng email, yêu cầu thêm tính năng
                (đính kèm file PDF, gửi qua Zalo OA, v.v.)
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default function PracticeAppsScript({ onMissionDone, isMissionDone }) {
  const [showCode, setShowCode] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const missions = [
    { id: "as-learn", label: "Đọc lý thuyết" },
    { id: "as-services", label: "Xem dịch vụ Google" },
    { id: "as-prompt", label: "Xem prompt mẫu" },
    { id: "as-code", label: "Xem code demo" },
    { id: "as-template", label: "Copy Sheet mẫu" },
  ];

  const handleViewCode = () => {
    setShowCode(true);
    onMissionDone("as-code", "Đã xem code demo");
  };

  const handleViewPrompt = () => {
    setShowPrompt(true);
    onMissionDone("as-prompt", "Đã xem prompt mẫu");
  };

  const handleCopyTemplate = () => {
    window.open(SHEET_TEMPLATE_URL, "_blank");
    onMissionDone("as-template", "Đã mở link copy Google Sheets mẫu");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Mission tracker */}
      <div className="flex-shrink-0 px-5 py-3 border-b border-ink-900/10 bg-cream">
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-900/60 mb-2">
          5 nhiệm vụ
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-1.5 text-[11px]">
          {missions.map((m) => {
            const done = isMissionDone(m.id);
            return (
              <div
                key={m.id}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border ${
                  done
                    ? "bg-accent-lime/20 border-accent-lime/50 text-ink-700"
                    : "bg-white border-ink-900/10 text-ink-900/60"
                }`}
              >
                <CheckCircle2
                  className={`w-3 h-3 flex-shrink-0 ${done ? "text-ink-700" : "text-ink-900/25"}`}
                />
                <span className="truncate">{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 p-5 overflow-y-auto md:p-7 bg-paper">
        {/* Hero */}
        <div className="p-5 mb-7 md:p-6 rounded-3xl bg-ink-900 text-paper">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl bg-accent-gold">
              <Code className="w-6 h-6 text-ink-900" />
            </div>
            <div>
              <h2 className="mb-1 text-xl vn-heading md:text-2xl">
                Apps Script + AI
              </h2>
              <p className="text-sm text-paper/75">
                Dùng AI viết code tự động hoá Gmail, Sheets, Drive — không cần
                học lập trình
              </p>
            </div>
          </div>
        </div>

        {/* Phần 1: Apps Script là gì */}
        <section
          className="mb-7"
          onMouseEnter={() => onMissionDone("as-learn", "Đã đọc lý thuyết")}
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-accent-coral" />
            <h3 className="text-lg vn-heading text-ink-900">
              Apps Script là gì?
            </h3>
          </div>
          <div className="p-5 space-y-3 text-sm leading-relaxed card-base text-ink-900/85">
            <p>
              <strong>Google Apps Script</strong> là ngôn ngữ lập trình miễn phí
              của Google, cho phép bạn viết "kịch bản" để Google tự làm việc
              thay bạn — gửi email, sắp xếp file, tạo lịch, soạn báo cáo... tất
              cả tự động.
            </p>
            <p>
              Nó giống như <strong>Excel macro</strong> nhưng mạnh hơn rất
              nhiều, vì kết nối được
              <em> tất cả các dịch vụ Google</em> trong cùng một tài khoản.
            </p>
            <div className="grid gap-3 mt-2 sm:grid-cols-3">
              <div className="p-3 rounded-xl bg-accent-gold/15">
                <div className="text-[11px] font-bold uppercase tracking-wider text-ink-900/60 mb-1">
                  Miễn phí
                </div>
                <div className="text-sm font-semibold">
                  Có sẵn trong mọi tài khoản Google
                </div>
              </div>
              <div className="p-3 rounded-xl bg-accent-lime/15">
                <div className="text-[11px] font-bold uppercase tracking-wider text-ink-900/60 mb-1">
                  Không cài đặt
                </div>
                <div className="text-sm font-semibold">
                  Viết code trực tiếp trên trình duyệt
                </div>
              </div>
              <div className="p-3 rounded-xl bg-accent-coral/15">
                <div className="text-[11px] font-bold uppercase tracking-wider text-ink-900/60 mb-1">
                  Chạy 24/7
                </div>
                <div className="text-sm font-semibold">
                  Tự chạy theo lịch, không cần mở máy
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Phần 2: Hệ sinh thái Google */}
        <section
          className="mb-7"
          onMouseEnter={() =>
            onMissionDone("as-services", "Đã xem các dịch vụ Google")
          }
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-accent-coral" />
            <h3 className="text-lg vn-heading text-ink-900">
              Apps Script tương tác với gì?
            </h3>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {DICH_VU_GOOGLE.map((dv) => {
              const Icon = ICON_MAP[dv.icon] || Code;
              return (
                <div key={dv.name} className="p-4 card-base">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl bg-ink-900">
                      <Icon className="w-5 h-5 text-accent-gold" />
                    </div>
                    <div>
                      <div className="text-base vn-heading text-ink-900">
                        {dv.name}
                      </div>
                      <div className="text-xs text-ink-900/65 mt-0.5">
                        {dv.desc}
                      </div>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {dv.examples.map((ex, i) => (
                      <li
                        key={i}
                        className="text-xs text-ink-900/75 flex items-start gap-1.5"
                      >
                        <span className="text-accent-gold mt-0.5">▸</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Phần 3: AI giúp như thế nào */}
        <section className="mb-7">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-accent-coral" />
            <h3 className="text-lg vn-heading text-ink-900">
              Vai trò của AI trong Apps Script
            </h3>
          </div>
          <div className="p-5 space-y-3 text-sm leading-relaxed card-base text-ink-900/85">
            <p>
              Trước đây phải biết lập trình mới dùng được Apps Script. Bây giờ
              có <strong>Gemini, Claude, ChatGPT</strong> — bạn chỉ cần{" "}
              <em>mô tả việc muốn làm bằng tiếng Việt</em>, AI sẽ viết code cho
              bạn.
            </p>
            <div className="p-4 border rounded-2xl bg-cream border-accent-gold/30">
              <div className="text-[11px] font-bold uppercase tracking-wider text-ink-900/60 mb-2">
                Quy trình 3 bước
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex gap-3">
                  <span className="text-lg vn-heading text-accent-gold">
                    1.
                  </span>
                  <span>
                    <strong>Mô tả nhu cầu</strong> với AI bằng tiếng Việt rõ
                    ràng (ví dụ: "Gửi email lương cho tất cả nhân viên")
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-lg vn-heading text-accent-gold">
                    2.
                  </span>
                  <span>
                    <strong>Copy code AI tạo ra</strong> vào trình soạn Apps
                    Script (script.google.com)
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-lg vn-heading text-accent-gold">
                    3.
                  </span>
                  <span>
                    <strong>Bấm Run</strong> — cấp quyền lần đầu — sau đó dùng
                    mãi mãi, có thể lên lịch chạy tự động
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Phần 4: Case study */}
        <section className="mb-7">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-accent-coral" />
            <h3 className="text-lg vn-heading text-ink-900">
              Tình huống thực tế: Gửi email lương
            </h3>
          </div>
          <div className="p-5 card-base">
            <div className="p-3 mb-4 text-sm rounded-xl bg-cream text-ink-900/85">
              <strong>Bối cảnh:</strong> Phòng Kế toán cần gửi email thông báo
              lương kỳ này cho 50 cán bộ nhân viên. Mỗi email có thông tin
              riêng: họ tên, chức vụ, số tiền cụ thể. Thông thường mất 1-2 tiếng
              copy/paste thủ công.
              <br />
              <br />
              <strong>Giải pháp:</strong> Hỏi Gemini/Claude viết code Apps
              Script đọc danh sách từ Sheets → tự động gửi email cá nhân hoá cho
              từng người. Chỉ mất 30 giây.
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <button
                onClick={handleViewPrompt}
                className="p-4 text-left transition-all rounded-2xl bg-ink-900 text-paper hover:bg-ink-800 group"
              >
                <Sparkles className="w-6 h-6 mb-2 text-accent-gold" />
                <div className="mb-1 text-sm vn-heading">1. Xem Prompt mẫu</div>
                <div className="text-xs text-paper/70">
                  Câu lệnh hỏi Gemini để có code đúng ý
                </div>
              </button>

              <button
                onClick={handleViewCode}
                className="p-4 text-left transition-all rounded-2xl bg-accent-gold hover:bg-accent-gold/90 group"
              >
                <Code className="w-6 h-6 mb-2 text-ink-900" />
                <div className="mb-1 text-sm vn-heading text-ink-900">
                  2. Xem Code demo
                </div>
                <div className="text-xs text-ink-900/80">
                  Code Apps Script AI sinh ra — có thể copy/tải
                </div>
              </button>

              <button
                onClick={handleCopyTemplate}
                className="p-4 text-left transition-all rounded-2xl bg-accent-lime hover:bg-accent-lime/90 group"
              >
                <FileSpreadsheet className="w-6 h-6 mb-2 text-ink-900" />
                <div className="mb-1 text-sm vn-heading text-ink-900">
                  3. Copy Sheet mẫu
                </div>
                <div className="text-xs text-ink-900/80">
                  Sao chép Google Sheets về Drive để thực hành
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Phần 5: 5 bước thực hành */}
        <section className="mb-7">
          <div className="flex items-center gap-2 mb-3">
            <Play className="w-4 h-4 text-accent-coral" />
            <h3 className="text-lg vn-heading text-ink-900">
              5 bước thực hành — Tự làm tại nhà
            </h3>
          </div>
          <div className="p-5 space-y-3 card-base">
            {[
              {
                title: "Copy Sheet mẫu về Drive",
                desc: 'Bấm nút "Copy Sheet mẫu" ở trên → đăng nhập Gmail của bạn → bấm "Tạo bản sao". Sheet sẽ vào Drive cá nhân.',
              },
              {
                title: "Sửa email trong Sheet thành email THẬT của bạn",
                desc: "Mở Sheet vừa copy → cột D thay 3 email mẫu thành email của bạn (để thử nghiệm gửi cho chính mình). Xoá cột E (trạng thái) cho sạch.",
              },
              {
                title: "Mở Extensions → Apps Script",
                desc: 'Trên thanh menu của Sheet → bấm "Extensions" (Tiện ích mở rộng) → "Apps Script". Cửa sổ code Editor sẽ mở ra.',
              },
              {
                title: "Dán code vào và đổi đường link",
                desc: 'Bấm nút "Xem Code demo" ở trên → Copy code → Dán vào Apps Script Editor (xoá code mẫu cũ trước). Đổi DUONG_LINK_SHEET thành URL Sheet của bạn.',
              },
              {
                title: "Bấm Run → Cấp quyền → Đợi email",
                desc: 'Bấm nút "Run" (▶) màu xanh. Lần đầu Google sẽ hỏi quyền — bấm "Cho phép". Đợi 5-10 giây, kiểm tra hộp thư đến của bạn.',
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-3 pb-3 border-b border-ink-900/10 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-center flex-shrink-0 text-sm rounded-full w-9 h-9 bg-ink-900 text-accent-gold vn-heading">
                  {i + 1}
                </div>
                <div>
                  <div className="mb-1 text-sm font-semibold text-ink-900">
                    {step.title}
                  </div>
                  <div className="text-xs leading-relaxed text-ink-900/70">
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA: External links */}
        <section className="mb-3">
          <div className="p-5 card-base bg-ink-900 border-ink-900 text-paper">
            <div className="mb-3 text-lg vn-heading">Liên kết hữu ích</div>
            <div className="grid gap-2 sm:grid-cols-3">
              <a
                href="https://script.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between gap-2 px-4 py-3 text-sm transition-colors rounded-2xl bg-paper/10 hover:bg-paper/15"
              >
                <span>script.google.com</span>
                <ExternalLink className="flex-shrink-0 w-4 h-4" />
              </a>

              <a
                href="https://developers.google.com/apps-script"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between gap-2 px-4 py-3 text-sm transition-colors rounded-2xl bg-paper/10 hover:bg-paper/15"
              >
                <span>Tài liệu chính thức</span>
                <ExternalLink className="flex-shrink-0 w-4 h-4" />
              </a>

              <a
                href="https://gemini.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between gap-2 px-4 py-3 text-sm transition-colors rounded-2xl bg-accent-gold/20 hover:bg-accent-gold/30 text-accent-gold"
              >
                <span>Gemini (hỏi viết code)</span>
                <ExternalLink className="flex-shrink-0 w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      <CodeViewerModal open={showCode} onClose={() => setShowCode(false)} />
      <PromptViewerModal
        open={showPrompt}
        onClose={() => setShowPrompt(false)}
      />
    </div>
  );
}
