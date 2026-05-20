import { motion } from "framer-motion";
import {
  BookOpen,
  AlertTriangle,
  X,
  Check,
  Sparkles,
  FileText,
  Search,
  Calendar,
  Users,
  FileBarChart,
} from "lucide-react";

// Map icon name string -> component
const IconMap = {
  BookOpen,
  AlertTriangle,
  X,
  Check,
  Sparkles,
  FileText,
  Search,
  Calendar,
  Users,
  FileBarChart,
};

// Render từng loại block
function Block({ block }) {
  switch (block.type) {
    case "definition":
      return (
        <div className="card-base p-7 md:p-9">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-ink-900" />
            </div>
            <div>
              <h4 className="vn-heading text-xl md:text-2xl text-ink-900 mb-3">
                {block.title}
              </h4>
              <p className="text-ink-900/75 leading-relaxed">{block.body}</p>
            </div>
          </div>
        </div>
      );

    case "list":
      return (
        <div className="card-base p-7 md:p-9">
          <h4 className="vn-heading text-xl md:text-2xl text-ink-900 mb-5">
            {block.title}
          </h4>
          <ul className="space-y-3">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="display-heading text-accent-coral mt-1 text-base">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink-900/80 leading-relaxed flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "principle":
      return (
        <div className="card-base p-7 md:p-9 bg-ink-900 text-paper border-ink-900">
          <h4 className="vn-heading text-xl md:text-2xl text-paper mb-3">
            {block.title}
          </h4>
          <p className="text-paper/85 leading-relaxed">{block.body}</p>
        </div>
      );

    case "warning":
      return (
        <div className="card-base p-7 md:p-9 bg-accent-coral/10 border-accent-coral/30">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-accent-coral/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-accent-coral" />
            </div>
            <div>
              <h4 className="vn-heading text-xl md:text-2xl text-ink-900 mb-3">
                {block.title}
              </h4>
              <p className="text-ink-900/80 leading-relaxed">{block.body}</p>
            </div>
          </div>
        </div>
      );

    case "example":
      return (
        <div className="card-base p-7 md:p-9 bg-cream border-ink-900/15">
          <div className="text-xs uppercase tracking-widest font-semibold text-ink-900/60 mb-4">
            {block.title}
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-ink-900/60 uppercase mb-1">Câu hỏi</div>
              <p className="text-ink-900 italic">"{block.question}"</p>
            </div>
            <div className="border-l-4 border-accent-coral pl-4">
              <div className="text-xs font-semibold text-accent-coral uppercase mb-1 flex items-center gap-1.5">
                <X className="w-3.5 h-3.5" /> Câu trả lời sai (ảo giác)
              </div>
              <p className="text-ink-900/80">{block.wrong}</p>
            </div>
            <div className="border-l-4 border-accent-lime pl-4">
              <div className="text-xs font-semibold text-ink-700 uppercase mb-1 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Sự thật
              </div>
              <p className="text-ink-900/80">{block.truth}</p>
            </div>
          </div>
        </div>
      );

    case "tools":
      return (
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {block.items.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-base p-6 group hover:-translate-y-1"
            >
              <div className="flex items-baseline justify-between mb-3">
                <h4 className="vn-heading text-2xl text-ink-900">{tool.name}</h4>
                <span className="text-xs font-mono text-ink-900/50">{tool.version}</span>
              </div>
              <div className="text-xs text-ink-900/60 uppercase tracking-wider font-medium mb-4">
                {tool.maker}
              </div>
              <p className="text-sm text-ink-900/75 leading-relaxed mb-5">{tool.strength}</p>
              <div className="pt-4 border-t border-ink-900/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-ink-900/55">Miễn phí</span>
                  <span className="font-medium text-ink-900">{tool.free}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-900/55">Trả phí</span>
                  <span className="font-medium text-ink-900">{tool.paid}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );

    case "formula":
      return (
        <div className="card-base p-7 md:p-9 bg-ink-900 text-paper border-ink-900">
          <h4 className="vn-heading text-xl md:text-2xl text-paper mb-6">
            {block.title}
          </h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {block.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-paper/10 backdrop-blur border border-paper/15 rounded-2xl p-4"
              >
                <div className="display-heading text-3xl text-accent-gold mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-semibold text-paper mb-1">{item.key}</div>
                <div className="text-xs text-paper/70 leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case "comparison":
      return (
        <div className="card-base p-7 md:p-9">
          <h4 className="vn-heading text-xl md:text-2xl text-ink-900 mb-6">
            {block.title}
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-accent-coral/30 bg-accent-coral/5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <X className="w-4 h-4 text-accent-coral" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent-coral">
                  Câu lệnh kém
                </span>
              </div>
              <p className="text-ink-900/80 font-mono text-sm leading-relaxed">"{block.bad}"</p>
            </div>
            <div className="rounded-2xl border border-accent-lime/40 bg-accent-lime/10 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Check className="w-4 h-4 text-ink-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-ink-700">
                  Câu lệnh tốt
                </span>
              </div>
              <p className="text-ink-900/80 font-mono text-sm leading-relaxed">"{block.good}"</p>
            </div>
          </div>
        </div>
      );

    case "usecases":
      return (
        <div className="space-y-4 md:space-y-5">
          {block.items.map((uc, i) => {
            const Icon = IconMap[uc.icon] || Sparkles;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-base p-6 md:p-7"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-ink-900 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent-gold" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="vn-heading text-xl md:text-2xl text-ink-900 mb-2">
                      {uc.title}
                    </h4>
                    <p className="text-ink-900/70 mb-4">{uc.desc}</p>
                    <div className="rounded-xl bg-cream border border-ink-900/10 p-4">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-ink-900/55 mb-2">
                        Câu lệnh mẫu
                      </div>
                      <p className="text-sm text-ink-900/85 font-mono leading-relaxed">
                        {uc.sample}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      );

    case "techniques":
      return (
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {block.items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-base p-6 md:p-7 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 step-number opacity-100 group-hover:opacity-30 transition-opacity">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="relative">
                <h4 className="vn-heading text-xl text-ink-900 mb-2">{t.name}</h4>
                <p className="text-ink-900/70 text-sm mb-4">{t.desc}</p>
                <div className="rounded-xl bg-ink-900 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-accent-gold mb-2">
                    Ví dụ
                  </div>
                  <p className="text-sm text-paper/85 font-mono leading-relaxed">{t.sample}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );

    case "features":
      return (
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {block.items.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-base p-6 md:p-7"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-accent-gold mt-3" />
                <h4 className="vn-heading text-xl text-ink-900">{f.title}</h4>
              </div>
              <p className="text-ink-900/75 leading-relaxed text-[15px]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      );

    case "highlight":
      return (
        <div className="rounded-3xl bg-gradient-to-br from-ink-900 via-ink-800 to-ink-700 p-8 md:p-12 text-paper relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent-gold/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-lime/15 rounded-full blur-3xl" />
          <div className="relative">
            <div className="pill bg-paper/10 border-paper/20 text-paper mb-5">
              <Sparkles className="w-3.5 h-3.5 text-accent-gold" /> Điểm nổi bật
            </div>
            <h4 className="vn-heading text-2xl md:text-3xl text-paper mb-4">
              {block.title}
            </h4>
            <p className="text-paper/85 text-lg leading-relaxed max-w-3xl">{block.body}</p>
          </div>
        </div>
      );

    case "panels":
      return (
        <div>
          <h4 className="vn-heading text-xl md:text-2xl text-ink-900 mb-5">
            {block.title}
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            {block.items.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-base p-5 md:p-6"
              >
                <div className="display-heading text-3xl text-accent-gold mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h5 className="vn-heading text-lg text-ink-900 mb-2">{p.name}</h5>
                <p className="text-sm text-ink-900/70 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case "usecases-light":
      return (
        <div className="card-base p-7 md:p-9">
          <h4 className="vn-heading text-xl md:text-2xl text-ink-900 mb-5">
            {block.title}
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {block.items.map((u, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-cream transition-colors">
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-accent-gold/20 flex items-center justify-center mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-ink-900" />
                </div>
                <span className="text-sm text-ink-900/85 leading-relaxed">{u}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "workflow":
      return (
        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-12 right-12 h-0.5 bg-gradient-to-r from-transparent via-ink-900/15 to-transparent" />
          <div className="grid md:grid-cols-4 gap-4 md:gap-6 relative">
            {block.items.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 bg-accent-gold rounded-full animate-glow opacity-30 blur-xl" />
                  <div className="relative w-20 h-20 rounded-full bg-ink-900 flex items-center justify-center">
                    <span className="display-heading text-2xl text-accent-gold">{s.step}</span>
                  </div>
                </div>
                <h5 className="vn-heading text-lg text-ink-900 mb-2">{s.name}</h5>
                <p className="text-sm text-ink-900/65 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case "law":
      return (
        <div className="card-base p-7 md:p-9 bg-ink-900 border-ink-900 text-paper">
          <h4 className="vn-heading text-xl md:text-2xl text-paper mb-5">
            {block.title}
          </h4>
          <p className="text-paper/80 leading-relaxed mb-6">{block.body}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {block.items.map((item, i) => (
              <div key={i} className="rounded-2xl bg-paper/10 backdrop-blur border border-paper/15 p-5">
                <div className="text-xs text-paper/60 uppercase tracking-widest font-medium mb-2">
                  {item.label}
                </div>
                <div className="vn-heading text-2xl text-accent-gold mb-1">{item.value}</div>
                <div className="text-sm text-paper/75">{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "rule-321":
      return (
        <div className="card-base p-7 md:p-9">
          <h4 className="vn-heading text-xl md:text-2xl text-ink-900 mb-6">
            {block.title}
          </h4>
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <div className="rounded-2xl border-2 border-accent-coral/30 bg-accent-coral/5 p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="display-heading text-4xl text-accent-coral">3</span>
                <span className="vn-heading text-xl text-ink-900">KHÔNG</span>
              </div>
              <ul className="space-y-2">
                {block.no.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-900/80">
                    <X className="w-4 h-4 text-accent-coral mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-accent-lime/40 bg-accent-lime/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="display-heading text-4xl text-ink-700">2</span>
                <span className="vn-heading text-xl text-ink-900">CÓ</span>
              </div>
              <ul className="space-y-2">
                {block.yes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-900/80">
                    <Check className="w-4 h-4 text-ink-700 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-2xl bg-cream border border-ink-900/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="display-heading text-3xl text-ink-900">1</span>
              <span className="vn-heading text-lg text-ink-900">QUY TRÌNH KIỂM TRA</span>
            </div>
            <div className="font-mono text-sm text-ink-900/80 leading-relaxed">
              {block.flow}
            </div>
          </div>
        </div>
      );

    case "checklist":
      return (
        <div className="card-base p-7 md:p-9">
          <h4 className="vn-heading text-xl md:text-2xl text-ink-900 mb-5">
            {block.title}
          </h4>
          <ul className="space-y-3">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-cream transition-colors">
                <div className="flex-shrink-0 w-6 h-6 rounded-md border-2 border-ink-900/20 flex items-center justify-center mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent-gold" />
                </div>
                <span className="text-ink-900/85 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return null;
  }
}

export default function Section({ section, index }) {
  return (
    <section id={section.id} className="py-16 md:py-24 relative">
      <div className="container-x">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-10 md:mb-14">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-28"
            >
              <div className="display-heading text-7xl md:text-8xl text-accent-gold/40 mb-3 leading-none">
                {section.no}
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-ink-900/55 mb-3">
                {section.kicker}
              </div>
              <h2 className="vn-heading text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[1.05]">
                {section.title}
              </h2>
            </motion.div>
          </div>
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-ink-900/75 leading-relaxed lg:mt-24"
            >
              {section.summary}
            </motion.p>
          </div>
        </div>

        {/* Blocks */}
        <div className="space-y-5 md:space-y-6 lg:ml-[33.33%] lg:pl-12">
          {section.blocks.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <Block block={block} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
