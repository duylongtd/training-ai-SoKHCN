import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight, RotateCw, Trophy } from "lucide-react";

export default function PracticeQuiz({ questions, onMissionDone, isMissionDone }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // {0: 2, 1: 0, ...}
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const cur = questions[idx];
  const selected = answers[idx];
  const isCorrect = selected === cur.correct;
  const isLast = idx === questions.length - 1;

  const reset = () => {
    setIdx(0);
    setAnswers({});
    setShowResult(false);
    setShowFeedback(false);
  };

  const handleSelect = (optionIdx) => {
    if (showFeedback) return;
    setAnswers({ ...answers, [idx]: optionIdx });
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (isLast) {
      // Tính điểm
      const score = questions.filter((q, i) => answers[i] === q.correct).length;
      const passed = score >= Math.ceil(questions.length * 0.7);
      setShowResult(true);
      if (passed) {
        onMissionDone("quiz-passed", `Hoàn thành quiz với điểm ${score}/${questions.length}!`);
      }
    } else {
      setIdx(idx + 1);
    }
  };

  if (showResult) {
    const score = questions.filter((q, i) => answers[i] === q.correct).length;
    const passed = score >= Math.ceil(questions.length * 0.7);

    return (
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md w-full"
        >
          <div
            className={`inline-flex w-24 h-24 rounded-full items-center justify-center mb-5 ${
              passed ? "bg-accent-lime/30" : "bg-accent-coral/20"
            }`}
          >
            {passed ? (
              <Trophy className="w-12 h-12 text-ink-900" />
            ) : (
              <XCircle className="w-12 h-12 text-accent-coral" />
            )}
          </div>
          <h3 className="vn-heading text-3xl md:text-4xl text-ink-900 mb-3">
            {passed ? "Xuất sắc!" : "Cần ôn lại nhé!"}
          </h3>
          <p className="text-ink-900/70 mb-6">
            Bạn trả lời đúng <strong>{score}/{questions.length}</strong> câu.
            {passed
              ? " Bạn đã nắm vững chuyên đề này — có thể chuyển sang phần tiếp theo."
              : " Hãy đọc lại lý thuyết và thử quiz lại nhé."}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {questions.map((q, i) => {
              const ok = answers[i] === q.correct;
              return (
                <div
                  key={i}
                  className={`text-xs px-2 py-1.5 rounded-lg ${
                    ok ? "bg-accent-lime/20 text-ink-700" : "bg-accent-coral/10 text-ink-900"
                  }`}
                >
                  Câu {i + 1}: {ok ? "✓ Đúng" : "✗ Sai"}
                </div>
              );
            })}
          </div>
          <button
            onClick={reset}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-paper hover:bg-ink-800 transition-colors"
          >
            <RotateCw className="w-4 h-4" />
            Làm lại quiz
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Progress */}
      <div className="border-b border-ink-900/10 px-5 py-3 bg-cream">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-ink-900/65 uppercase tracking-widest">
            Câu {idx + 1} / {questions.length}
          </span>
          {isMissionDone("quiz-passed") && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink-700">
              <CheckCircle2 className="w-3.5 h-3.5" /> Đã đạt
            </span>
          )}
        </div>
        <div className="h-1.5 bg-ink-900/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-ink-900"
            initial={false}
            animate={{ width: `${((idx + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6 md:py-8">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="display-heading text-5xl md:text-6xl text-accent-gold/40 mb-2 leading-none">
            {String(idx + 1).padStart(2, "0")}
          </div>
          <h3 className="vn-heading text-xl md:text-2xl text-ink-900 mb-6 leading-tight">
            {cur.question}
          </h3>

          <div className="space-y-2.5">
            {cur.options.map((opt, oi) => {
              const isSelected = selected === oi;
              const isAnswer = oi === cur.correct;
              const showRight = showFeedback && isAnswer;
              const showWrong = showFeedback && isSelected && !isAnswer;
              return (
                <button
                  key={oi}
                  onClick={() => handleSelect(oi)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                    showRight
                      ? "border-accent-lime bg-accent-lime/15"
                      : showWrong
                      ? "border-accent-coral bg-accent-coral/10"
                      : isSelected
                      ? "border-ink-900 bg-ink-900/5"
                      : "border-ink-900/10 bg-white hover:border-ink-900/30"
                  } ${showFeedback ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm mt-0.5 ${
                      showRight
                        ? "bg-accent-lime text-ink-900"
                        : showWrong
                        ? "bg-accent-coral text-paper"
                        : isSelected
                        ? "bg-ink-900 text-paper"
                        : "bg-ink-900/5 text-ink-900/60"
                    }`}
                  >
                    {String.fromCharCode(65 + oi)}
                  </div>
                  <span className="flex-1 text-ink-900 leading-relaxed">{opt}</span>
                  {showRight && <CheckCircle2 className="w-5 h-5 text-ink-700 flex-shrink-0 mt-0.5" />}
                  {showWrong && <XCircle className="w-5 h-5 text-accent-coral flex-shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-5 p-4 rounded-2xl border ${
                isCorrect
                  ? "bg-accent-lime/10 border-accent-lime/40"
                  : "bg-cream border-ink-900/15"
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-widest mb-2">
                {isCorrect ? "🎉 Chính xác!" : "💡 Giải thích"}
              </div>
              <p className="text-sm text-ink-900/85 leading-relaxed">{cur.explain}</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Next button */}
      {showFeedback && (
        <div className="border-t border-ink-900/10 p-4 bg-paper flex justify-end">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-paper hover:bg-ink-800 transition-colors"
          >
            {isLast ? "Xem kết quả" : "Câu tiếp theo"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
