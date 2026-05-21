# 🎓 Tập huấn AI · Sở KH&CN Hà Tĩnh

Website tài liệu tập huấn AI cho cán bộ xã/phường và nhân dân — hướng dẫn sử dụng ChatGPT, Gemini, NotebookLM trong công tác văn phòng.

---

## ✨ Tính năng

- 📚 **10 chuyên đề** từ AI cơ bản đến kỹ thuật nâng cao
- 🗺️ **Mindmap lộ trình học** dạng popup — 4 chặng, 4 tuần
- 🤖 **Chatbot trợ lý** tích hợp sẵn — có thể kết nối Gemini API thật
- 📱 **Responsive hoàn toàn** — tối ưu cho điện thoại của bà con
- 🎨 **Thiết kế hiện đại** — font Be Vietnam Pro + Bricolage Grotesque, animation Framer Motion
- ⚡ **Bundle nhỏ** — ~155KB gzipped, tải nhanh trên 3G

## 🛠️ Tech Stack

- **React 19** + **Vite 8** (rolldown build)
- **TailwindCSS 3** với theme tùy chỉnh
- **Framer Motion** cho animation
- **Lucide React** cho icon
- **React Markdown** cho chatbot bubbles

---

## 🚀 Chạy ở local

```bash
# Cài dependencies
npm install

# Chạy dev server (http://localhost:5173)
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

---

## 📦 Deploy lên GitHub + Vercel

### Bước 1 — Push lên GitHub

```bash
# Khởi tạo git nếu chưa có
git init
git add .
git commit -m "Initial commit: AI training website"

# Tạo repo trống trên GitHub (ví dụ tên: tap-huan-ai)
# Sau đó liên kết và push
git remote add origin https://github.com/<username>/tap-huan-ai.git
git branch -M main
git push -u origin main
```

### Bước 2 — Deploy lên Vercel

**Cách 1: Qua giao diện Vercel (khuyên dùng)**

1. Truy cập [vercel.com](https://vercel.com) → đăng nhập bằng GitHub
2. Bấm **"Add New..." → "Project"**
3. Chọn repo `tap-huan-ai` vừa push
4. Vercel tự nhận diện Vite project — giữ nguyên cấu hình mặc định:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Bấm **"Deploy"** — chờ ~1 phút là xong

**Cách 2: Qua CLI**

```bash
npm i -g vercel
vercel login
vercel              # deploy preview
vercel --prod       # deploy production
```

### Bước 3 — Cập nhật nội dung

Sau này muốn sửa nội dung tập huấn, chỉ cần:

1. Sửa file `src/data/content.js`
2. Commit + push lên GitHub
3. Vercel **tự deploy lại** trong ~30 giây

---

## 🤖 Cấu hình Chatbot

Chatbot hoạt động ở **2 chế độ**:

### Chế độ FAQ (mặc định, không cần cấu hình)
- Trả lời các câu hỏi cơ bản dựa trên kho FAQ trong `src/data/content.js`
- Người dùng bấm vào câu hỏi gợi ý → nhận câu trả lời ngay
- Phù hợp khi không có ngân sách / không muốn lộ API key

### Chế độ Gemini AI (thông minh hơn)
- Người dùng tự nhập **Gemini API Key** ở nút ⚙️ trong cửa sổ chat
- API key lưu trong `localStorage` của trình duyệt người dùng (an toàn, không gửi về server)
- Trả lời thông minh hơn, tiếp nhận mọi câu hỏi

**Lấy API key miễn phí:** [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

> 💡 **Mẹo:** Nếu muốn website dùng sẵn một API key dùng chung (không cần người dùng nhập), chỉnh `src/components/Chatbot.jsx` — dòng `useState("")` → `useState("YOUR_KEY")`. **Lưu ý:** API key sẽ lộ trong source code công khai.

---

## 📝 Tùy chỉnh nội dung

### Thêm/sửa chuyên đề

Mở `src/data/content.js`, thêm object vào mảng `sections`:

```js
{
  id: "ten-id",        // dùng cho anchor link, không dấu
  no: "11",            // số thứ tự
  title: "Tên chuyên đề",
  kicker: "Nhãn nhỏ",
  summary: "Mô tả ngắn...",
  blocks: [
    {
      type: "definition", // hoặc: list, principle, warning, example, tools,
                          // formula, comparison, usecases, techniques, features,
                          // highlight, panels, usecases-light, workflow, law,
                          // rule-321, checklist
      title: "...",
      body: "...",
    },
  ],
}
```

### Thêm FAQ cho chatbot

Mở `src/data/content.js`, thêm vào mảng `faqData`:

```js
{
  keywords: ["từ khoá 1", "từ khoá 2"],
  answer: "Câu trả lời Markdown — **đậm**, dấu đầu dòng",
},
```

### Đổi màu / font

Mở `tailwind.config.js`:
- Sửa `colors.ink` (xanh chủ đạo), `colors.accent` (gold/lime/coral)
- Sửa `fontFamily.display` / `fontFamily.sans`

---

## 📂 Cấu trúc thư mục

```
ai-taphuan/
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Thanh navigation responsive
│   │   ├── Hero.jsx          # Trang đầu
│   │   ├── Section.jsx       # Render các chuyên đề
│   │   ├── MindmapModal.jsx  # Popup lộ trình học
│   │   ├── Chatbot.jsx       # Trợ lý AI (FAQ + Gemini)
│   │   └── Footer.jsx
│   ├── data/
│   │   └── content.js        # ⭐ Toàn bộ nội dung tập huấn ở đây
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── package.json
```

---

## 📄 License

Tài liệu nội dung © Sở Khoa học và Công nghệ Hà Tĩnh · Trần Đình Duy Long.
Mã nguồn website mở để tham khảo và mở rộng.

---

**Phát triển bởi:** Phòng CNTT và Chuyển đổi số · Trung tâm KH&CN và CĐS Hà Tĩnh
