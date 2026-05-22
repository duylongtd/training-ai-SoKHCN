import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Trophy } from "lucide-react";
import PracticeChat from "./practice/PracticeChat";
import PracticeQuiz from "./practice/PracticeQuiz";
import PracticeNotebookLM from "./practice/PracticeNotebookLM";
import PracticeAppsScript from "./practice/PracticeAppsScript";
import {
  PracticeTools,
  PracticeUsecases,
  PracticeWorkflow,
  PracticeChecklist,
} from "./practice/PracticeOthers";
import useProgress from "../hooks/useProgress";
import { showCongrats } from "./CongratsToast";
import { sections } from "../data/content";

// Cấu hình practice cho mỗi section
const PRACTICE_CONFIG = {
  "ai-co-ban": {
    type: "quiz",
    totalMissions: 1,
    quiz: [
      {
        question: "AI tạo sinh khác AI thông thường ở điểm nào?",
        options: [
          "Chỉ phân tích dữ liệu có sẵn, không tạo nội dung mới",
          "Tự tạo ra nội dung mới (văn bản, ảnh, video) từ câu lệnh",
          "Chỉ chạy được trên máy tính có cấu hình cao",
          "Bắt buộc phải có kết nối với cơ sở dữ liệu của nhà nước",
        ],
        correct: 1,
        explain:
          "AI tạo sinh (Generative AI) có khả năng tạo ra nội dung HOÀN TOÀN MỚI dựa trên những gì đã học, thay vì chỉ phân tích dữ liệu có sẵn.",
      },
      {
        question: "Câu lệnh đưa vào AI thường được gọi là gì?",
        options: ["Query", "Prompt", "Algorithm", "Dataset"],
        correct: 1,
        explain:
          "Prompt (đọc là 'prom-pt') là thuật ngữ chuẩn cho câu lệnh người dùng đưa cho AI. Một prompt tốt = câu trả lời tốt.",
      },
      {
        question:
          "Trong các công cụ sau, đâu là AI tạo sinh phổ biến nhất hiện nay?",
        options: [
          "Microsoft Excel",
          "ChatGPT, Gemini, NotebookLM",
          "Google Drive",
          "Facebook Messenger",
        ],
        correct: 1,
        explain:
          "ChatGPT (OpenAI), Gemini (Google) và NotebookLM (Google) là 3 công cụ AI tạo sinh phổ biến và miễn phí cho công tác văn phòng.",
      },
      {
        question: "AI tạo sinh có thể tạo ra những loại nội dung nào?",
        options: [
          "Chỉ văn bản",
          "Chỉ hình ảnh",
          "Văn bản, hình ảnh, video, âm thanh, code lập trình",
          "Chỉ bảng biểu Excel",
        ],
        correct: 2,
        explain:
          "AI tạo sinh là 'đa năng' — tạo được nhiều loại nội dung khác nhau, miễn là bạn diễn đạt yêu cầu rõ ràng.",
      },
    ],
  },

  "ao-giac": {
    type: "quiz",
    totalMissions: 1,
    quiz: [
      {
        question: "Hiện tượng ảo giác (hallucination) trong AI là gì?",
        options: [
          "AI tự ngắt kết nối không trả lời",
          "AI bịa ra thông tin sai nhưng trông có vẻ rất hợp lý",
          "AI hiển thị màu sắc lạ trên màn hình",
          "AI chậm phản hồi khi nhiều người dùng",
        ],
        correct: 1,
        explain:
          "Ảo giác là rủi ro lớn nhất khi dùng AI: nó tự tin nói sai. Vì vậy LUÔN phải kiểm tra với nguồn chính thức cho việc quan trọng.",
      },
      {
        question:
          "Đâu KHÔNG phải nguyên nhân khiến AI bị ảo giác?",
        options: [
          "Quá trình học chưa đủ tốt với chủ đề chuyên sâu",
          "Người dùng đặt câu hỏi mơ hồ, thiếu ngữ cảnh",
          "Kiến thức của AI đã lỗi thời",
          "Người dùng dùng quá nhiều dấu câu",
        ],
        correct: 3,
        explain:
          "Dấu câu không phải nguyên nhân. 3 nguyên nhân chính là: học chưa đủ, câu hỏi mơ hồ, kiến thức cũ.",
      },
      {
        question:
          "Câu trả lời nào sau đây CHẮC CHẮN là ảo giác? AI nói: 'Nguyễn Du nhận giải Nobel Văn học năm 1810'",
        options: [
          "Đúng — Nguyễn Du là nhà thơ vĩ đại",
          "Không xác định — cần kiểm tra thêm",
          "Sai — giải Nobel chỉ có từ năm 1901, Nguyễn Du mất năm 1820",
          "Sai — Nguyễn Du chưa từng viết tác phẩm nào",
        ],
        correct: 2,
        explain:
          "Đây là ví dụ kinh điển. AI 'nối vần' giữa tác phẩm vĩ đại và giải thưởng danh giá. Nhưng giải Nobel bắt đầu năm 1901, không thể trao cho người đã mất từ 1820.",
      },
      {
        question: "Cách phòng tránh ảo giác hiệu quả nhất là gì?",
        options: [
          "Hỏi AI nhiều lần cho đến khi câu trả lời giống nhau",
          "Luôn kiểm tra câu trả lời với nguồn chính thức, đặc biệt cho việc hệ trọng",
          "Chỉ dùng AI bản trả phí",
          "Tắt AI khi không cần thiết",
        ],
        correct: 1,
        explain:
          "Đặc biệt với pháp lý, y tế, tài chính — bắt buộc đối chiếu với văn bản gốc, chuyên gia hoặc nguồn chính thống.",
      },
    ],
  },

  "cong-cu": {
    type: "tools",
    totalMissions: 3, // visit cả 3 tools
  },

  "cau-lenh": {
    type: "chat",
    totalMissions: 3, // first-prompt, good-prompt, practice-prompt
  },

  "ung-dung": {
    type: "usecases",
    totalMissions: 3, // chỉ cần copy 3 trên 5
  },

  "ky-thuat-nang-cao": {
    type: "quiz",
    totalMissions: 1,
    quiz: [
      {
        question:
          "Kỹ thuật nào giúp AI bắt chước đúng văn phong báo cáo của cơ quan?",
        options: [
          "Cung cấp ví dụ mẫu (báo cáo cũ đã chuẩn)",
          "Yêu cầu AI tự sáng tạo phong cách",
          "Sử dụng câu lệnh ngắn nhất có thể",
          "Yêu cầu trả lời bằng tiếng Anh",
        ],
        correct: 0,
        explain:
          "Kỹ thuật 'few-shot' — đính kèm 1-2 mẫu chuẩn — giúp AI bắt chước văn phong chính xác. Đây là cách hiệu quả nhất cho văn bản hành chính.",
      },
      {
        question:
          "Khi nào nên dùng kỹ thuật 'Hướng dẫn từng bước'?",
        options: [
          "Khi câu hỏi rất đơn giản",
          "Khi muốn AI trả lời nhanh",
          "Khi xử lý vấn đề phức tạp, nhiều bước",
          "Khi không có nhiều thời gian",
        ],
        correct: 2,
        explain:
          "Với vấn đề phức tạp (phân tích đa chiều, so sánh nhiều tài liệu), yêu cầu AI làm theo các bước giúp giảm lỗi logic và cho kết quả chính xác hơn.",
      },
      {
        question:
          "'Phân tích đa chiều' nghĩa là gì khi viết câu lệnh AI?",
        options: [
          "Yêu cầu AI trả lời thật dài",
          "Yêu cầu AI trả lời cùng câu hỏi từ nhiều góc nhìn khác nhau",
          "Yêu cầu AI dùng font chữ nhiều màu",
          "Yêu cầu AI dịch sang nhiều ngôn ngữ",
        ],
        correct: 1,
        explain:
          "Ví dụ: 'Phân tích Nghị quyết 57 theo 3 góc nhìn: (a) chiến lược quốc gia, (b) thể chế, (c) tác động đến địa phương'. Giúp có đánh giá toàn diện.",
      },
    ],
  },

  gemini: {
    type: "tools-light",
    totalMissions: 2,
    items: [
      {
        id: "gemini-main",
        name: "Gemini (gemini.google.com)",
        desc: "Trang chính của Gemini — đăng nhập bằng Gmail là dùng được ngay",
        url: "https://gemini.google.com",
      },
      {
        id: "aistudio",
        name: "Google AI Studio (lấy API Key)",
        desc: "Lấy API Key MIỄN PHÍ để dùng Gemini trong ứng dụng/script tự động",
        url: "https://aistudio.google.com/apikey",
      },
    ],
  },

  notebooklm: {
    type: "notebooklm",
    totalMissions: 5, // 5 missions trong PracticeNotebookLM
  },

  "ket-hop": {
    type: "workflow",
    totalMissions: 4,
    steps: [
      {
        step: "01",
        name: "Thu thập tài liệu",
        desc: "Tải PDF công văn, báo cáo, luật vào NotebookLM",
        detail:
          "Mở notebooklm.google.com → tạo notebook mới → bấm '+ Add source' → tải các file PDF/Word cần phân tích. NotebookLM cho phép tới 50 nguồn, 500.000 từ.",
      },
      {
        step: "02",
        name: "Phân tích trên NotebookLM",
        desc: "Yêu cầu NotebookLM tóm tắt ý chính và trích xuất số liệu",
        detail:
          "Hỏi: 'Tóm tắt 3 nhiệm vụ trọng tâm trong tài liệu này, kèm trích dẫn nguồn'. NotebookLM sẽ trả lời với số [1] [2] dẫn về đoạn gốc → đảm bảo chính xác, không bịa.",
      },
      {
        step: "03",
        name: "Sáng tạo trên Gemini",
        desc: "Dùng Gemini soạn dự thảo dựa trên các ý chính từ bước 2",
        detail:
          "Copy phần tóm tắt từ NotebookLM → mở gemini.google.com → bấm 'Canvas' → dán nội dung và yêu cầu: 'Soạn lại thành báo cáo tổng kết quý theo văn phong hành chính, có cấu trúc 3 phần: kết quả, hạn chế, giải pháp.'",
      },
      {
        step: "04",
        name: "Hoàn thiện và phát hành",
        desc: "Kiểm tra thể thức và phát hành văn bản",
        detail:
          "Xuất từ Canvas sang Word/Google Docs → kiểm tra: thể thức theo NĐ 30/2020, số liệu chính xác, dấu câu tiếng Việt → trình lãnh đạo phê duyệt → phát hành.",
      },
    ],
  },

  "an-toan": {
    type: "checklist",
    totalMissions: 8,
    items: [
      "Tôi cam kết KHÔNG nạp tài liệu mật, tuyệt mật của cơ quan vào AI công cộng (ChatGPT, Gemini, NotebookLM)",
      "Tôi cam kết KHÔNG nạp thông tin cá nhân của công dân (số CCCD, số điện thoại, địa chỉ chi tiết) vào AI",
      "Tôi sẽ luôn KIỂM TRA câu trả lời của AI với nguồn chính thức trước khi đưa vào văn bản phát hành",
      "Tôi hiểu AI có thể BỊA THÔNG TIN (ảo giác) — đặc biệt với pháp lý, y tế, tài chính",
      "Tôi sẽ ẨN DANH HOÁ dữ liệu khi cần phân tích trên AI (thay tên thật bằng 'ông X', 'bà Y')",
      "Tôi sẽ GẮN NHÃN rõ những nội dung do AI hỗ trợ tạo theo Luật AI số 134/2025/QH15",
      "Tôi cam kết tuân thủ nguyên tắc 3-2-1: 3 KHÔNG · 2 CÓ · 1 quy trình kiểm tra",
      "Tôi sẽ chỉ dùng AI là CÔNG CỤ HỖ TRỢ, không thay thế trách nhiệm cá nhân của cán bộ",
    ],
  },

  appsscript: {
    type: "appsscript",
    totalMissions: 5,
  },
};

export default function PracticeModal({ open, section, onClose, onGoTheory }) {
  const { markMissionDone, isMissionDone, missionsCompleted } = useProgress();

  // Khoá scroll trang khi popup mở
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!section) return null;
  const config = PRACTICE_CONFIG[section.id];

  // Wrapper truyền vào practice components
  const handleMissionDone = (missionId, msg) => {
    const isNew = markMissionDone(section.id, missionId);
    if (isNew) {
      showCongrats({
        title: "Mở khoá thành tựu!",
        desc: msg,
      });

      // Check nếu vừa hoàn thành toàn bộ
      setTimeout(() => {
        const { complete } = missionsCompleted(section.id, config?.totalMissions || 1);
        if (complete) {
          setTimeout(() => {
            showCongrats({
              title: "🏆 Hoàn thành chuyên đề!",
              desc: section.title,
              big: true,
            });
          }, 1000);
        }
      }, 100);
    }
  };

  const handleIsMissionDone = (missionId) => isMissionDone(section.id, missionId);

  // Lấy usecases từ section (nếu có)
  const getUsecases = () => {
    const ucBlock = section.blocks.find((b) => b.type === "usecases");
    return ucBlock?.items || [];
  };

  let practiceBody = null;
  if (!config) {
    practiceBody = (
      <div className="flex items-center justify-center flex-1 p-10 text-center">
        <div>
          <Zap className="w-12 h-12 mx-auto mb-4 text-ink-900/30" />
          <p className="text-ink-900/60">Chưa có phần thực hành cho chuyên đề này.</p>
        </div>
      </div>
    );
  } else {
    switch (config.type) {
      case "quiz":
        practiceBody = (
          <PracticeQuiz
            questions={config.quiz}
            onMissionDone={handleMissionDone}
            isMissionDone={handleIsMissionDone}
          />
        );
        break;
      case "chat":
        practiceBody = (
          <PracticeChat
            onMissionDone={handleMissionDone}
            isMissionDone={handleIsMissionDone}
          />
        );
        break;
      case "tools":
        practiceBody = (
          <PracticeTools
            onMissionDone={handleMissionDone}
            isMissionDone={handleIsMissionDone}
          />
        );
        break;
      case "tools-light":
        practiceBody = (
          <div className="flex-1 p-5 overflow-y-auto md:p-8 bg-paper">
            <h3 className="mb-4 text-xl vn-heading text-ink-900">
              Truy cập các đường link chính thức
            </h3>
            <div className="space-y-3">
              {config.items.map((item) => {
                const done = isMissionDone(section.id, `visit-${item.id}`);
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleMissionDone(`visit-${item.id}`, `Đã mở ${item.name}`)}
                    className={`block card-base p-5 hover:-translate-y-0.5 transition-all ${
                      done ? "border-accent-lime/40 bg-accent-lime/5" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="mb-1 text-lg vn-heading text-ink-900">
                          {item.name}
                        </div>
                        <p className="text-sm text-ink-900/65">{item.desc}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {done ? (
                          <Trophy className="w-7 h-7 text-accent-gold" />
                        ) : (
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-ink-900 text-paper">
                            →
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        );
        break;
      case "usecases":
        practiceBody = (
          <PracticeUsecases
            usecases={getUsecases()}
            onMissionDone={handleMissionDone}
            isMissionDone={handleIsMissionDone}
          />
        );
        break;
      case "notebooklm":
        practiceBody = (
          <PracticeNotebookLM
            onMissionDone={handleMissionDone}
            isMissionDone={handleIsMissionDone}
          />
        );
        break;
      case "appsscript":
        practiceBody = (
          <PracticeAppsScript
            onMissionDone={handleMissionDone}
            isMissionDone={handleIsMissionDone}
          />
        );
        break;
      case "workflow":
        practiceBody = (
          <PracticeWorkflow
            steps={config.steps}
            onMissionDone={handleMissionDone}
            isMissionDone={handleIsMissionDone}
          />
        );
        break;
      case "checklist":
        practiceBody = (
          <PracticeChecklist
            items={config.items}
            onMissionDone={handleMissionDone}
            isMissionDone={handleIsMissionDone}
          />
        );
        break;

      default:
        practiceBody = null;
    }
  }

  const { done, total } = config
    ? missionsCompleted(section.id, config.totalMissions)
    : { done: 0, total: 0 };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed z-50 flex flex-col overflow-hidden shadow-2xl inset-2 md:inset-6 lg:inset-10 bg-paper rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b md:px-6 md:py-4 border-ink-900/10 bg-ink-900 text-paper">
              <div className="flex items-center min-w-0 gap-3">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl bg-accent-gold">
                  <Zap className="w-5 h-5 text-ink-900" fill="currentColor" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-paper/55 font-semibold">
                    Thực hành · Chuyên đề {section.no}
                  </div>
                  <div className="text-sm truncate vn-heading md:text-lg text-paper">
                    {section.title}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {total > 0 && (
                  <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-paper/10">
                    <Trophy className="w-3.5 h-3.5 text-accent-gold" />
                    {done}/{total}
                  </div>
                )}
                <button
                  onClick={onGoTheory}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-paper/10 hover:bg-paper/20 transition-colors"
                >
                  Đọc lý thuyết
                </button>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center transition-colors rounded-full w-9 h-9 bg-paper/10 hover:bg-paper/20"
                  aria-label="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden">{practiceBody}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}