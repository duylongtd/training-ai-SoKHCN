import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  FileText,
  Download,
  ExternalLink,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  Play,
  ShieldAlert,
  Upload,
  Loader2,
} from "lucide-react";
import { folders, downloadAsText } from "../../data/notebookFiles";

// ★ Component render DOCX bằng Mammoth.js
function DocxViewer({ url }) {
  const [html, setHtml] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mammoth = await import("mammoth");
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Không tải được file (${res.status})`);
        const arrayBuffer = await res.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        if (!cancelled) {
          setHtml(result.value);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Lỗi không xác định");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-ink-900/60">
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        <span className="text-sm">Đang đọc file Word...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <AlertTriangle className="w-10 h-10 mb-3 text-accent-coral" />
        <div className="mb-1 text-sm text-ink-900/80">Không hiển thị được file Word</div>
        <div className="text-xs text-ink-900/55">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-white">
      <div
        className="max-w-3xl p-6 mx-auto docx-content md:p-10 text-ink-900"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function FilePreviewModal({ file, onClose, onDownload }) {
  return createPortal(
    <AnimatePresence>
      {file && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-950/70 z-[90]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-12 bg-paper rounded-3xl z-[91] flex flex-col overflow-hidden shadow-2xl"
          >
            <div
              className={`px-5 py-4 flex items-center justify-between border-b ${
                file.sensitive
                  ? "bg-accent-coral/10 border-accent-coral/30"
                  : "bg-cream border-ink-900/10"
              }`}
            >
              <div className="flex items-center min-w-0 gap-3">
                {file.sensitive ? (
                  <ShieldAlert className="flex-shrink-0 w-5 h-5 text-accent-coral" />
                ) : (
                  <FileText className="flex-shrink-0 w-5 h-5 text-ink-900" />
                )}
                <div className="min-w-0">
                  <div className="text-sm truncate vn-heading md:text-base text-ink-900">
                    {file.name}
                  </div>
                  <div className="text-xs text-ink-900/60">{file.size}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDownload(file)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-ink-900 text-paper hover:bg-ink-800 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Tải về
                </button>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center rounded-full w-9 h-9 bg-ink-900/5 hover:bg-ink-900/10"
                >
                  <ArrowLeft className="w-4 h-4 rotate-45" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden bg-white">
              {file.pdfUrl ? (
                <iframe
                  src={file.pdfUrl}
                  title={file.name}
                  className="w-full h-full border-0"
                />
              ) : file.docxUrl ? (
                <DocxViewer key={file.docxUrl} url={file.docxUrl} />
              ) : (
                <div className="h-full p-5 overflow-y-auto md:p-8">
                  <pre className="font-mono text-[13px] md:text-sm text-ink-900 leading-relaxed whitespace-pre-wrap">
                    {file.content}
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function PracticeNotebookLM({ onMissionDone, isMissionDone }) {
  const [activeFolder, setActiveFolder] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [showSensitiveWarning, setShowSensitiveWarning] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);

  const handleOpenFolder = (folder) => {
    setActiveFolder(folder);
    if (folder.id === "huong-dan") {
      onMissionDone("open-guide", "Đã mở folder hướng dẫn");
    }
  };

  const handleOpenFile = (file) => {
    setPreviewFile(file);
    onMissionDone("read-file", "Đã xem nội dung tài liệu");
  };

  const handleDownload = (file) => {
    if (file.pdfUrl || file.docxUrl) {
      const link = document.createElement("a");
      link.href = file.pdfUrl || file.docxUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      downloadAsText(file.name, file.content);
    }
    onMissionDone("download-file", "Đã tải tài liệu về máy");
  };

  const handleUploadToNotebookLM = (file) => {
    if (file.sensitive) {
      setPendingFile(file);
      setShowSensitiveWarning(true);
      onMissionDone("identify-sensitive", "Tốt! Bạn đã nhận ra tài liệu nhạy cảm cần cẩn trọng");
      return;
    }
    window.open("https://notebooklm.google.com", "_blank");
    onMissionDone("open-notebooklm", "Đã mở NotebookLM để thực hành");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 py-3 border-b border-ink-900/10 bg-cream">
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-900/60 mb-2">
          5 nhiệm vụ
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-1.5 text-[11px]">
          {[
            { id: "watch-video", label: "Xem video" },
            { id: "open-guide", label: "Mở hướng dẫn" },
            { id: "read-file", label: "Xem tài liệu" },
            { id: "identify-sensitive", label: "Nhận diện file nhạy cảm" },
            { id: "open-notebooklm", label: "Mở NotebookLM thật" },
          ].map((m) => {
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
                <CheckCircle2 className={`w-3 h-3 flex-shrink-0 ${done ? "text-ink-700" : "text-ink-900/25"}`} />
                <span className="truncate">{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 p-5 overflow-y-auto md:p-7 bg-paper">
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-3">
            <Play className="w-4 h-4 text-accent-coral" />
            <h3 className="text-lg vn-heading text-ink-900">Video hướng dẫn</h3>
            <span className="text-xs text-ink-900/55">(Tiếng Anh có phụ đề)</span>
          </div>
          <div className="relative overflow-hidden shadow-xl aspect-video rounded-2xl bg-ink-900">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/1A9o-MalN0k?rel=0"
              title="NotebookLM tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col items-start justify-between gap-3 mt-3 sm:flex-row sm:items-center">
            <p className="text-xs italic text-ink-900/55">
              💡 Mẹo: Có thể bật phụ đề tiếng Việt trong cài đặt YouTube. Xem xong bấm nút bên phải để đánh dấu.
            </p>
            {isMissionDone("watch-video") ? (
              <div className="inline-flex items-center flex-shrink-0 gap-2 px-4 py-2 text-sm font-semibold border rounded-full bg-accent-lime/20 border-accent-lime/50 text-ink-700">
                <CheckCircle2 className="w-4 h-4" />
                Đã xem video
              </div>
            ) : (
              <button
                onClick={() => onMissionDone("watch-video", "Đã đánh dấu xem video")}
                className="inline-flex items-center flex-shrink-0 gap-2 px-4 py-2 text-sm font-semibold transition-colors rounded-full bg-ink-900 hover:bg-ink-800 text-paper"
              >
                <CheckCircle2 className="w-4 h-4 text-accent-gold" />
                Đánh dấu "Đã xem"
              </button>
            )}
          </div>
        </div>

        {!activeFolder ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg vn-heading text-ink-900">Kho tài liệu để thực hành</h3>
              <span className="text-xs text-ink-900/55">{folders.length} thư mục</span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {folders.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleOpenFolder(f)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all hover:-translate-y-1 ${
                    f.sensitive
                      ? "border-accent-coral/40 bg-accent-coral/5 hover:border-accent-coral"
                      : "border-ink-900/10 bg-white hover:border-ink-900/30"
                  }`}
                >
                  <div className={`inline-flex w-12 h-12 rounded-xl ${f.color} items-center justify-center mb-3`}>
                    {f.sensitive ? (
                      <ShieldAlert className="w-6 h-6 text-ink-900" />
                    ) : (
                      <Folder className="w-6 h-6 text-ink-900" />
                    )}
                  </div>
                  <div className="mb-1 text-base vn-heading text-ink-900">{f.name}</div>
                  <p className="text-xs leading-relaxed text-ink-900/65">{f.desc}</p>
                  <div className="mt-3 text-[11px] font-bold uppercase tracking-widest text-ink-900/55">
                    {f.files.length} file
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-col items-start justify-between gap-4 p-5 mt-6 card-base md:p-6 bg-ink-900 border-ink-900 text-paper md:flex-row md:items-center">
              <div>
                <div className="mb-1 text-lg vn-heading md:text-xl">Mở NotebookLM thật</div>
                <p className="text-sm text-paper/75">
                  Tải file từ thư mục "Tham khảo" về máy → mở NotebookLM → kéo file vào để hỏi đáp thật.
                </p>
              </div>
              <a
                href="https://notebooklm.google.com"
                target="_blank"
                rel="noreferrer"
                onClick={() => onMissionDone("open-notebooklm", "Đã mở NotebookLM!")}
                className="inline-flex items-center flex-shrink-0 gap-2 px-5 py-3 font-semibold transition-all rounded-full bg-accent-gold hover:bg-accent-gold/90 text-ink-900 whitespace-nowrap"
              >
                Mở NotebookLM
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setActiveFolder(null)}
              className="inline-flex items-center gap-2 mb-4 text-sm text-ink-900/70 hover:text-ink-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại các thư mục
            </button>

            <div className="flex items-start gap-3 mb-5">
              <div className={`w-12 h-12 rounded-xl ${activeFolder.color} flex items-center justify-center flex-shrink-0`}>
                {activeFolder.sensitive ? (
                  <ShieldAlert className="w-6 h-6 text-ink-900" />
                ) : (
                  <Folder className="w-6 h-6 text-ink-900" />
                )}
              </div>
              <div>
                <h3 className="text-xl vn-heading md:text-2xl text-ink-900">{activeFolder.name}</h3>
                <p className="mt-1 text-sm text-ink-900/65">{activeFolder.desc}</p>
              </div>
            </div>

            {activeFolder.sensitive && (
              <div className="flex items-start gap-3 p-4 mb-5 border-2 rounded-2xl bg-accent-coral/10 border-accent-coral/30">
                <AlertTriangle className="w-5 h-5 text-accent-coral flex-shrink-0 mt-0.5" />
                <div className="text-sm text-ink-900">
                  <strong>Cảnh báo:</strong> Các tài liệu trong thư mục này chứa thông tin nhạy cảm.
                  Thử bấm "Đưa vào NotebookLM" để xem điều gì xảy ra.
                </div>
              </div>
            )}

            <div className="space-y-2">
              {activeFolder.files.map((file) => (
                <div key={file.id} className="flex flex-col gap-3 p-4 card-base sm:flex-row sm:items-center">
                  <FileText
                    className={`w-8 h-8 flex-shrink-0 ${file.sensitive ? "text-accent-coral" : "text-ink-900/70"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate text-ink-900">{file.name}</div>
                    <div className="text-xs text-ink-900/55">{file.size} · {file.type.toUpperCase()}</div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => handleOpenFile(file)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-ink-900/5 hover:bg-ink-900/10 text-ink-900 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> Xem
                    </button>
                    <button
                      onClick={() => handleDownload(file)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-ink-900/5 hover:bg-ink-900/10 text-ink-900 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Tải
                    </button>
                    <button
                      onClick={() => handleUploadToNotebookLM(file)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full transition-colors ${
                        file.sensitive
                          ? "bg-accent-coral/20 hover:bg-accent-coral/30 text-ink-900"
                          : "bg-ink-900 hover:bg-ink-800 text-paper"
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {file.sensitive ? "Thử nạp..." : "Vào NotebookLM"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FilePreviewModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
        onDownload={handleDownload}
      />

      {createPortal(
        <AnimatePresence>
          {showSensitiveWarning && pendingFile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink-950/80 z-[100] flex items-center justify-center p-4 sm:p-6"
              onClick={() => setShowSensitiveWarning(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col w-full max-w-lg max-h-full overflow-hidden border-2 shadow-2xl bg-paper rounded-3xl border-accent-coral"
              >
                <div className="flex-1 min-h-0 p-6 overflow-y-auto md:p-7">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex items-center justify-center flex-shrink-0 w-14 h-14 rounded-2xl bg-accent-coral/20">
                      <ShieldAlert className="w-7 h-7 text-accent-coral" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-xl vn-heading text-ink-900">⚠ Dừng lại — Tài liệu nhạy cảm!</h3>
                      <p className="font-mono text-xs break-words text-ink-900/60">{pendingFile.name}</p>
                    </div>
                  </div>
                  <div className="mb-5 space-y-2 text-sm leading-relaxed text-ink-900/85">
                    <p>Tài liệu này chứa <strong>thông tin nội bộ / dữ liệu cá nhân của công dân</strong>.</p>
                    <p className="font-semibold text-accent-coral">
                      TUYỆT ĐỐI KHÔNG được nạp lên NotebookLM, ChatGPT, Gemini hay bất kỳ AI công cộng nào.
                    </p>
                    <p>
                      Lý do: dữ liệu bạn nạp sẽ được lưu trên server Google. Nếu lộ thông tin cá nhân
                      công dân hoặc tài liệu mật, bạn có thể vi phạm:
                    </p>
                    <ul className="pl-5 space-y-1 text-xs list-disc text-ink-900/75">
                      <li>Luật Bảo vệ Dữ liệu cá nhân (NĐ 13/2023/NĐ-CP)</li>
                      <li>Luật An ninh mạng</li>
                      <li>Quy chế bảo mật của cơ quan</li>
                    </ul>
                  </div>
                  <div className="p-4 text-sm border bg-accent-lime/15 border-accent-lime/40 rounded-2xl text-ink-900">
                    ✓ <strong>Tốt!</strong> Bạn đã nhận ra tài liệu nhạy cảm và dừng lại đúng lúc.
                    Đây chính là phản xạ an toàn cần có khi dùng AI.
                  </div>
                </div>

                <div className="flex-shrink-0 p-4 border-t border-ink-900/10 bg-paper">
                  <button
                    onClick={() => {
                      setShowSensitiveWarning(false);
                      setPendingFile(null);
                    }}
                    className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold transition-colors rounded-full bg-ink-900 text-paper hover:bg-ink-800"
                  >
                    Đã hiểu — quay lại
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}