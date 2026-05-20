import { Sparkles, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-paper pt-16 md:pt-24 pb-8 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-ink-800 rounded-full blur-3xl opacity-50" />

      <div className="container-x relative">
        {/* CTA */}
        <div className="text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper/10 border border-paper/15 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
            <span className="text-xs font-semibold uppercase tracking-widest text-paper/80">
              Bắt đầu ngay hôm nay
            </span>
          </div>
          <h2 className="vn-heading text-4xl md:text-6xl text-paper mb-5 max-w-3xl mx-auto leading-[1.05]">
            AI không thay thế cán bộ —<br />
            nhưng cán bộ biết dùng AI sẽ làm việc nhanh hơn gấp 3 lần
          </h2>
          <p className="text-paper/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Bắt đầu từ Gemini và NotebookLM — cả hai đều miễn phí — để giải quyết
            70% công việc soạn thảo văn bản hàng ngày.
          </p>
        </div>

        {/* Links */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 pb-10 border-b border-paper/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-gold flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-ink-900" />
              </div>
              <div>
                <div className="vn-heading text-paper">Tập huấn AI</div>
                <div className="text-xs text-paper/55 uppercase tracking-widest">
                  Sở KH&amp;CN Hà Tĩnh
                </div>
              </div>
            </div>
            <p className="text-sm text-paper/65 leading-relaxed max-w-xs">
              Tài liệu tập huấn AI cho cán bộ và nhân dân — Phòng CNTT và Chuyển đổi số,
              Trung tâm KH&amp;CN và CĐS.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-paper/55 mb-4">
              Công cụ AI chính thức
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "ChatGPT (OpenAI)", url: "https://chat.openai.com" },
                { name: "Gemini (Google)", url: "https://gemini.google.com" },
                { name: "NotebookLM (Google)", url: "https://notebooklm.google.com" },
                { name: "Deepseek", url: "https://chat.deepseek.com" },
              ].map((l, i) => (
                <li key={i}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-paper/75 hover:text-accent-gold transition-colors"
                  >
                    {l.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-paper/55 mb-4">
              Tham khảo nhanh
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#ai-co-ban" className="text-paper/75 hover:text-accent-gold transition-colors">
                  AI tạo sinh là gì
                </a>
              </li>
              <li>
                <a href="#cau-lenh" className="text-paper/75 hover:text-accent-gold transition-colors">
                  Công thức viết câu lệnh
                </a>
              </li>
              <li>
                <a href="#notebooklm" className="text-paper/75 hover:text-accent-gold transition-colors">
                  Hướng dẫn NotebookLM
                </a>
              </li>
              <li>
                <a href="#an-toan" className="text-paper/75 hover:text-accent-gold transition-colors">
                  Pháp lý &amp; an toàn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-paper/50">
          <div>
            © {new Date().getFullYear()} Sở Khoa học và Công nghệ Hà Tĩnh · Lê Việt Tùng
          </div>
          <div className="flex items-center gap-4">
            <span>Phát triển bởi Phòng CNTT &amp; CĐS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
