import { useState } from "react";
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
} from "lucide-react";
import { folders, downloadAsText } from "../../data/notebookFiles";

function FilePreviewModal({ file, onClose, onDownload }) {
  return (
    <AnimatePresence>
      {file && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-950/70 z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-12 bg-paper rounded-3xl z-[60] flex flex-col overflow-hidden shadow-2xl"
          >
            <div
              className={`px-5 py-4 flex items-center justify-between border-b ${
                file.sensitive
                  ? "bg-accent-coral/10 border-accent-coral/30"
                  : "bg-cream border-ink-900/10"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {file.sensitive ? (
                  <ShieldAlert className="w-5 h-5 text-accent-coral flex-shrink-0" />
                ) : (
                  <FileText className="w-5 h-5 text-ink-900 flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="vn-heading text-sm md:text-base text-ink-900 truncate">
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
                  className="w-9 h-9 rounded-full bg-ink-900/5 hover:bg-ink-900/10 flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 rotate-45" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 md:p-8 bg-white">
              <pre className="font-mono text-[13px] md:text-sm text-ink-900 leading-relaxed whitespace-pre-wrap">
                {file.content}
              </pre>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
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
    downloadAsText(file.name, file.content);
    onMissionDone("download-file", "Đã tải tài liệu về máy");
  };

  const handleUploadToNotebookLM = (file) => {
    if (file.sensitive) {
      setPendingFile(file);
      setShowSensitiveWarning(true);
      // Đây là mission "nhận diện tài liệu nhạy cảm"
      onMissionDone("identify-sensitive", "Tốt! Bạn đã nhận ra tài liệu nhạy cảm cần cẩn trọng");
      return;
    }
    // Mở NotebookLM
    window.open("https://notebooklm.google.com", "_blank");
    onMissionDone("open-notebooklm", "Đã mở NotebookLM để thực hành");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Mission tracker */}
      <div className="border-b border-ink-900/10 bg-cream px-5 py-3">
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

      <div className="flex-1 overflow-y-auto p-5 md:p-7 bg-paper">
        {/* Video hướng dẫn */}
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-3">
            <Play className="w-4 h-4 text-accent-coral" />
            <h3 className="vn-heading text-lg text-ink-900">Video hướng dẫn</h3>
            <span className="text-xs text-ink-900/55">(Tiếng Anh có phụ đề)</span>
          </div>
          <div
            className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-ink-900"
            onClick={() => onMissionDone("watch-video", "Đã xem video hướng dẫn")}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/1A9o-MalN0k?rel=0"
              title="NotebookLM tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-xs text-ink-900/55 mt-2 italic">
            💡 Mẹo: Bấm vào video để đánh dấu "Đã xem". Có thể bật phụ đề tiếng Việt trong YouTube.
          </p>
        </div>

        {/* Folder view */}
        {!activeFolder ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="vn-heading text-lg text-ink-900">Kho tài liệu để thực hành</h3>
              <span className="text-xs text-ink-900/55">{folders.length} thư mục</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
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
                  <div className="vn-heading text-base text-ink-900 mb-1">{f.name}</div>
                  <p className="text-xs text-ink-900/65 leading-relaxed">{f.desc}</p>
                  <div className="mt-3 text-[11px] font-bold uppercase tracking-widest text-ink-900/55">
                    {f.files.length} file
                  </div>
                </button>
              ))}
            </div>

            {/* CTA NotebookLM */}
            <div className="mt-6 card-base p-5 md:p-6 bg-ink-900 border-ink-900 text-paper flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="vn-heading text-lg md:text-xl mb-1">Mở NotebookLM thật</div>
                <p className="text-sm text-paper/75">
                  Tải file từ thư mục "Tham khảo" về máy → mở NotebookLM → kéo file vào để hỏi đáp thật.
                </p>
              </div>
              <a
                href="https://notebooklm.google.com"
                target="_blank"
                rel="noreferrer"
                onClick={() => onMissionDone("open-notebooklm", "Đã mở NotebookLM!")}
                className="inline-flex items-center gap-2 rounded-full bg-accent-gold hover:bg-accent-gold/90 px-5 py-3 font-semibold text-ink-900 transition-all flex-shrink-0 whitespace-nowrap"
              >
                Mở NotebookLM
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : (
          <div>
            {/* Back */}
            <button
              onClick={() => setActiveFolder(null)}
              className="inline-flex items-center gap-2 text-sm text-ink-900/70 hover:text-ink-900 mb-4"
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
                <h3 className="vn-heading text-xl md:text-2xl text-ink-900">{activeFolder.name}</h3>
                <p className="text-sm text-ink-900/65 mt-1">{activeFolder.desc}</p>
              </div>
            </div>

            {activeFolder.sensitive && (
              <div className="mb-5 p-4 rounded-2xl bg-accent-coral/10 border-2 border-accent-coral/30 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-accent-coral flex-shrink-0 mt-0.5" />
                <div className="text-sm text-ink-900">
                  <strong>Cảnh báo:</strong> Các tài liệu trong thư mục này chứa thông tin nhạy cảm.
                  Thử bấm "Đưa vào NotebookLM" để xem điều gì xảy ra.
                </div>
              </div>
            )}

            <div className="space-y-2">
              {activeFolder.files.map((file) => (
                <div
                  key={file.id}
                  className="card-base p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <FileText
                    className={`w-8 h-8 flex-shrink-0 ${file.sensitive ? "text-accent-coral" : "text-ink-900/70"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-ink-900 text-sm truncate">{file.name}</div>
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

      {/* File preview modal */}
      <FilePreviewModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
        onDownload={handleDownload}
      />

      {/* Sensitive warning */}
      <AnimatePresence>
        {showSensitiveWarning && pendingFile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink-950/80 z-[70]"
              onClick={() => setShowSensitiveWarning(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[92%] max-w-lg bg-paper rounded-3xl p-7 shadow-2xl border-2 border-accent-coral"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-accent-coral/20 flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-7 h-7 text-accent-coral" />
                </div>
                <div>
                  <h3 className="vn-heading text-xl text-ink-900 mb-1">⚠ Dừng lại — Tài liệu nhạy cảm!</h3>
                  <p className="text-xs text-ink-900/60 font-mono">{pendingFile.name}</p>
                </div>
              </div>
              <div className="text-sm text-ink-900/85 leading-relaxed space-y-2 mb-6">
                <p>Tài liệu này chứa <strong>thông tin nội bộ / dữ liệu cá nhân của công dân</strong>.</p>
                <p className="font-semibold text-accent-coral">
                  TUYỆT ĐỐI KHÔNG được nạp lên NotebookLM, ChatGPT, Gemini hay bất kỳ AI công cộng nào.
                </p>
                <p>
                  Lý do: dữ liệu bạn nạp sẽ được lưu trên server Google. Nếu lộ thông tin cá nhân
                  công dân hoặc tài liệu mật, bạn có thể vi phạm:
                </p>
                <ul className="list-disc pl-5 text-xs text-ink-900/75 space-y-1">
                  <li>Luật Bảo vệ Dữ liệu cá nhân (NĐ 13/2023/NĐ-CP)</li>
                  <li>Luật An ninh mạng</li>
                  <li>Quy chế bảo mật của cơ quan</li>
                </ul>
              </div>
              <div className="bg-accent-lime/15 border border-accent-lime/40 rounded-2xl p-4 mb-5 text-sm text-ink-900">
                ✓ <strong>Tốt!</strong> Bạn đã nhận ra tài liệu nhạy cảm và dừng lại đúng lúc.
                Đây chính là phản xạ an toàn cần có khi dùng AI.
              </div>
              <button
                onClick={() => {
                  setShowSensitiveWarning(false);
                  setPendingFile(null);
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 font-semibold text-paper hover:bg-ink-800 transition-colors"
              >
                Đã hiểu — quay lại
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
