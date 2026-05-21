// Dữ liệu các file giả lập trong NotebookLM Practice
// Người dùng sẽ "tải" các file này về máy như tài liệu thực

export const folders = [
  {
    id: "huong-dan",
    name: "Hướng dẫn dùng NotebookLM",
    desc: "Tài liệu chính thức từ phòng CNTT — đọc trước khi bắt đầu",
    color: "bg-accent-gold",
    files: [
      {
        id: "hd-notebooklm",
        name: "Cẩm nang NotebookLM cho cán bộ xã.pdf",
        size: "1.2 MB",
        type: "pdf",
        sensitive: false,
        content: `CẨM NANG SỬ DỤNG NOTEBOOKLM
DÀNH CHO CÁN BỘ XÃ/PHƯỜNG
=============================

Phòng CNTT & Chuyển đổi số — Sở KH&CN Hà Tĩnh
Biên soạn: Trần Đình Duy Long

PHẦN 1. GIỚI THIỆU
==================
NotebookLM là công cụ AI miễn phí của Google, chuyên dùng để
nghiên cứu, tra cứu, tổng hợp tài liệu. Khác với ChatGPT/Gemini:
NotebookLM CHỈ trả lời dựa trên tài liệu bạn nạp vào, KÈM TRÍCH DẪN.

→ Truy cập: https://notebooklm.google.com
→ Đăng nhập bằng tài khoản Google (gmail) của cơ quan.

PHẦN 2. CÁC BƯỚC SỬ DỤNG
========================

Bước 1: Tạo Notebook mới
  - Bấm nút "Create new" hoặc "Tạo mới"
  - Đặt tên notebook (ví dụ: "Luật Đất đai 2024")

Bước 2: Nạp tài liệu (Sources)
  - Bấm "+ Add source" ở cột bên trái
  - Hỗ trợ: PDF, Word, Google Docs, link web, YouTube, file ghi âm
  - Tối đa 50 nguồn / notebook, tổng 500.000 từ

Bước 3: Đặt câu hỏi (Chat)
  - Gõ câu hỏi vào ô chính giữa
  - Câu trả lời sẽ có số trích dẫn [1] [2] [3]
  - Bấm vào số → nhảy tới đoạn gốc trong tài liệu

Bước 4: Tạo sản phẩm (Studio)
  - Audio Overview: tạo podcast 5-10 phút
  - Mind Map: vẽ sơ đồ tư duy
  - Briefing Doc: báo cáo tóm tắt 1 trang
  - Slide Deck: bản trình bày tự động

PHẦN 3. LƯU Ý AN TOÀN
=====================
- KHÔNG nạp tài liệu MẬT, TUYỆT MẬT của cơ quan
- KHÔNG nạp thông tin cá nhân của công dân
- Tài liệu lưu trên server Google, có thể truy cập từ tài khoản
- Luôn KIỂM TRA câu trả lời với nguồn gốc trước khi sử dụng

PHẦN 4. CÂU LỆNH MẪU
====================

Mẫu 1 — Tra cứu pháp lý:
  "Dựa trên các tài liệu đã nạp, người dân cần chuẩn bị
  giấy tờ gì để làm thủ tục cấp đổi sổ đỏ? Trích rõ điều, khoản."

Mẫu 2 — Tóm tắt cho lãnh đạo:
  "Tạo bản tóm tắt 1 trang A4 cho Chủ tịch UBND xã,
  nêu 3 điểm mới quan trọng nhất và đề xuất 2 câu hỏi
  cần thảo luận tại cuộc họp huyện."

Mẫu 3 — Tổng hợp ý kiến cử tri:
  "Phân loại các ý kiến trong biên bản thành 3 nhóm:
  giao thông, an ninh, môi trường. Đánh dấu các ý kiến
  lặp lại từ 3 cử tri trở lên là 'cấp bách'."

—HẾT—`,
      },
    ],
  },
  {
    id: "tham-khao",
    name: "Tài liệu tham khảo",
    desc: "Tài liệu công khai — cán bộ có thể nạp vào NotebookLM để luyện tập",
    color: "bg-accent-lime",
    files: [
      {
        id: "ke-hoach-ntmm",
        name: "Kế hoạch xây dựng Nông thôn mới kiểu mẫu 2026.docx",
        size: "85 KB",
        type: "docx",
        sensitive: false,
        content: `UBND XÃ ĐẠI VIỆT                          CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
Số: 142/KH-UBND                            Độc lập – Tự do – Hạnh phúc

KẾ HOẠCH
Thực hiện chương trình xây dựng Nông thôn mới kiểu mẫu
giai đoạn 2026-2028 trên địa bàn xã Đại Việt

I. MỤC TIÊU TỔNG QUÁT
=====================
Phấn đấu đến cuối năm 2028, xã Đại Việt đạt chuẩn Nông thôn mới
kiểu mẫu theo Quyết định số 211/QĐ-TTg ngày 01/03/2024 của
Thủ tướng Chính phủ.

II. CHỈ TIÊU CỤ THỂ
===================
1. Tỷ lệ hộ nghèo: giảm còn dưới 1%
2. Thu nhập bình quân đầu người: đạt 75 triệu đồng/năm
3. Tỷ lệ hộ dùng nước sạch: 100%
4. Tỷ lệ đường giao thông được bê tông hoá: 98%
5. Tỷ lệ hộ có internet cáp quang: trên 85%
6. Tỷ lệ người dân tham gia BHYT: trên 95%

III. NHIỆM VỤ TRỌNG TÂM
=======================

1. Phát triển hạ tầng:
   - Hoàn thành nâng cấp 8,5 km đường liên thôn
   - Lắp đặt thêm 120 bóng đèn cao áp tại các tuyến đường
   - Xây mới nhà văn hoá thôn Hạ với kinh phí 2,3 tỷ đồng

2. Phát triển kinh tế:
   - Hỗ trợ 25 hộ nghèo tham gia mô hình nuôi gà đồi
   - Đào tạo nghề cho 80 lao động nông thôn
   - Thành lập 3 tổ hợp tác sản xuất nông sản sạch

3. Văn hoá - xã hội:
   - 100% trường học đạt chuẩn quốc gia mức độ 1
   - Tổ chức 4 lớp xoá mù chữ AI cho người cao tuổi
   - Duy trì 95% các tổ dân phố đạt danh hiệu văn hoá

IV. PHÂN CÔNG TRÁCH NHIỆM
=========================
- Đồng chí Chủ tịch UBND xã: chỉ đạo chung
- Đồng chí Phó Chủ tịch phụ trách KT-XH: phụ trách kinh tế, hạ tầng
- Văn phòng UBND: theo dõi, tổng hợp báo cáo định kỳ
- Các thôn: chủ động xây dựng kế hoạch chi tiết của thôn

V. KINH PHÍ THỰC HIỆN
=====================
Tổng dự toán: 18,5 tỷ đồng
- Ngân sách nhà nước: 12 tỷ đồng
- Xã hội hoá: 4,5 tỷ đồng
- Đóng góp của nhân dân: 2 tỷ đồng

VI. TỔ CHỨC THỰC HIỆN
=====================
Giao Văn phòng UBND xã làm đầu mối theo dõi, hằng tháng báo cáo
tiến độ; quý báo cáo Đảng uỷ, HĐND; năm sơ kết, tổng kết.


                                              Đại Việt, ngày … tháng … năm 2026
                                                    CHỦ TỊCH UBND XÃ


                                                       (đã ký)
                                                   Nguyễn Văn A`,
      },
      {
        id: "bao-cao-cchc",
        name: "Báo cáo công tác CCHC quý III năm 2026.docx",
        size: "62 KB",
        type: "docx",
        sensitive: false,
        content: `UBND XÃ ĐẠI VIỆT                          CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
Số: 287/BC-UBND                            Độc lập – Tự do – Hạnh phúc

BÁO CÁO
Kết quả công tác Cải cách hành chính quý III năm 2026

I. KẾT QUẢ ĐẠT ĐƯỢC
====================

1. Về thủ tục hành chính:
   - Tiếp nhận tổng cộng 1.247 hồ sơ trên các lĩnh vực
   - Tỷ lệ giải quyết đúng hạn: 96,5% (vượt chỉ tiêu 90%)
   - Tỷ lệ hồ sơ trực tuyến: 64% (tăng 12% so với quý II)

2. Về ứng dụng AI và chuyển đổi số:
   - 100% cán bộ Bộ phận Một cửa được tập huấn sử dụng AI
   - Triển khai chatbot tự động trên Zalo OA của xã
   - Trung bình tiết kiệm 4,2 giờ/cán bộ/tuần nhờ AI hỗ trợ soạn thảo

3. Về sự hài lòng của người dân:
   - Khảo sát 380 lượt: 94% hài lòng và rất hài lòng
   - 12 ý kiến phàn nàn đã được xử lý dứt điểm

II. KHÓ KHĂN, VƯỚNG MẮC
========================
- Một số người cao tuổi chưa quen sử dụng dịch vụ trực tuyến
- Đường truyền internet tại 2 thôn miền núi còn chập chờn
- Phần mềm dịch vụ công đôi lúc bị quá tải vào giờ cao điểm

III. PHƯƠNG HƯỚNG QUÝ IV
========================
1. Tổ chức 3 buổi hướng dẫn tại nhà văn hoá thôn
2. Đề nghị Sở TT&TT nâng cấp đường truyền 2 thôn miền núi
3. Phấn đấu tỷ lệ hồ sơ trực tuyến đạt 75% vào cuối năm

—HẾT BÁO CÁO—`,
      },
      {
        id: "tham-luan",
        name: "Bài tham luận hội thảo Chuyển đổi số.docx",
        size: "45 KB",
        type: "docx",
        sensitive: false,
        content: `THAM LUẬN
"Vai trò của AI trong nâng cao hiệu quả công tác văn phòng cấp xã"

(Hội thảo Chuyển đổi số cấp huyện — tháng 11/2026)

Người trình bày: Trần Thị B — Chánh Văn phòng UBND xã Đại Việt

—

Kính thưa Đoàn Chủ tịch hội thảo, các đồng chí lãnh đạo và toàn thể đại biểu!

Trong 6 tháng triển khai ứng dụng AI vào công tác văn phòng tại xã, chúng tôi
đã rút ra một số bài học kinh nghiệm xin được chia sẻ:

THỨ NHẤT, AI không thay thế con người mà giúp cán bộ làm việc hiệu quả gấp 2-3
lần. Cụ thể, việc soạn thảo một báo cáo tổng kết trước đây mất 4-5 giờ, nay
chỉ còn 1,5 giờ nhờ Gemini Canvas và NotebookLM.

THỨ HAI, cần đầu tư nghiêm túc vào KỸ NĂNG VIẾT CÂU LỆNH. Công thức 5 thành
phần (Vai trò - Yêu cầu - Mục tiêu - Bối cảnh - Dữ liệu) là kim chỉ nam. Cán bộ
nào nắm vững công thức này thì kết quả công việc được nâng cao rõ rệt.

THỨ BA, NotebookLM là vũ khí riêng cho công tác tra cứu pháp lý. Với việc Luật
Đất đai 2024 vừa ban hành, NotebookLM giúp cán bộ tra cứu chính xác từng điều
khoản chỉ trong 30 giây thay vì đọc thủ công cả ngày.

THỨ TƯ, vấn đề AN TOÀN THÔNG TIN cần được đặt lên hàng đầu. Tuyệt đối không nạp
tài liệu mật, thông tin cá nhân của công dân vào AI. Luôn kiểm tra lại câu trả
lời trước khi đưa vào văn bản chính thức.

THỨ NĂM, cần xã hội hoá việc học AI cho người dân. Tổ công nghệ số cộng đồng
nên tổ chức các buổi hướng dẫn ngắn cho bà con biết cách dùng AI vào sản xuất
nông nghiệp, tra cứu thủ tục.

Đề xuất với cấp huyện:
(1) Tổ chức tập huấn AI sâu hơn cho cán bộ chuyên trách
(2) Cấp ngân sách mua gói Gemini Pro cho UBND xã
(3) Xây dựng kho prompt mẫu chung cho toàn huyện

Xin cảm ơn các đồng chí đã lắng nghe!`,
      },
    ],
  },
  {
    id: "nhay-cam",
    name: "Tài liệu nhạy cảm",
    desc: "⚠ Chứa thông tin nội bộ — TUYỆT ĐỐI KHÔNG nạp vào NotebookLM hay AI công cộng",
    color: "bg-accent-coral",
    sensitive: true,
    files: [
      {
        id: "danh-sach-ho-ngheo",
        name: "[MẬT] Danh sách hộ nghèo có hoàn cảnh đặc biệt 2026.docx",
        size: "32 KB",
        type: "docx",
        sensitive: true,
        content: `⚠ TÀI LIỆU MẬT — KHÔNG SAO CHÉP, PHÁT TÁN ⚠

UBND XÃ ĐẠI VIỆT
Phòng LĐ-TB&XH

DANH SÁCH HỘ NGHÈO CÓ HOÀN CẢNH ĐẶC BIỆT KHÓ KHĂN
Năm 2026

| STT | Họ tên chủ hộ    | Địa chỉ        | Số CCCD          | Hoàn cảnh                |
|-----|------------------|----------------|------------------|--------------------------|
| 01  | Nguyễn Văn X    | Thôn Hạ        | 042xxxxxxxxx     | Bệnh hiểm nghèo          |
| 02  | Trần Thị Y      | Thôn Trung     | 042xxxxxxxxx     | Khuyết tật nặng          |
| 03  | Lê Văn Z        | Thôn Thượng    | 042xxxxxxxxx     | Mẹ đơn thân, 3 con nhỏ   |
...

⚠ CẢNH BÁO NHẠY CẢM ⚠
=====================
Tài liệu này chứa:
- Số CCCD đầy đủ của công dân
- Thông tin sức khoẻ (bệnh hiểm nghèo, khuyết tật)
- Hoàn cảnh gia đình riêng tư

→ TUYỆT ĐỐI KHÔNG được:
   ✗ Nạp file này vào ChatGPT, Gemini, NotebookLM
   ✗ Chụp ảnh gửi qua Zalo, Messenger
   ✗ In sao gửi cho người không có thẩm quyền
   ✗ Lưu trên các dịch vụ cloud công cộng

→ ĐƯỢC PHÉP:
   ✓ Xử lý trên máy tính cơ quan, đã mã hoá
   ✓ Lưu trong tủ hồ sơ có khoá tại Văn phòng
   ✓ Báo cáo qua hệ thống chuyên dùng của nhà nước

Mọi vi phạm sẽ bị xử lý theo Luật Bảo vệ Dữ liệu cá nhân
và Luật An ninh mạng hiện hành.

(Văn bản này là MẪU mô phỏng để TẬP HUẤN, KHÔNG phải dữ liệu thật)`,
      },
      {
        id: "ngan-sach-nb",
        name: "[NỘI BỘ] Dự toán ngân sách nhạy cảm Q4-2026.docx",
        size: "28 KB",
        type: "docx",
        sensitive: true,
        content: `⚠ TÀI LIỆU NỘI BỘ — KHÔNG PHỔ BIẾN ⚠

UBND XÃ ĐẠI VIỆT
Bộ phận Tài chính - Kế toán

DỰ TOÁN CHI TIẾT NGÂN SÁCH QUÝ IV/2026
(Phần chi nhạy cảm — tiếp đoàn, hỗ trợ đột xuất)

| Khoản       | Nội dung                              | Dự kiến      |
|-------------|---------------------------------------|--------------|
| 1110.01    | Hỗ trợ đột xuất gia đình chính sách   | 145.000.000 |
| 1110.02    | Quà Tết cho hộ nghèo                  | 280.000.000 |
| 1110.03    | Hỗ trợ thiên tai dự phòng              | 500.000.000 |
| 1120.01    | Tiếp đoàn công tác cấp trên           | 85.000.000  |
| 1120.02    | Hội nghị, hội thảo cấp xã              | 67.000.000  |
| ...

THÔNG TIN TÀI KHOẢN NGÂN SÁCH
=============================
Số tài khoản nhận: 0421000xxxxxxx
Tên tài khoản: UBND xã Đại Việt
Mở tại: Kho bạc Nhà nước huyện

⚠ NHẠY CẢM VÌ SAO?
==================
File này chứa:
- Số tài khoản ngân sách nhà nước
- Dự toán chi nhạy cảm có thể bị suy diễn chính trị
- Thông tin đối tượng được hỗ trợ đột xuất

→ TUYỆT ĐỐI KHÔNG nạp lên AI công cộng vì có thể:
   ✗ Bị các bên không thiện chí phân tích, suy diễn
   ✗ Lộ thông tin tài khoản gây rủi ro lừa đảo
   ✗ Ảnh hưởng uy tín cơ quan

→ NẾU CẦN PHÂN TÍCH AI:
   ✓ Tạo bản EXTRACT chỉ giữ số liệu tổng, ẩn tên người, số tài khoản
   ✓ Hoặc dùng AI on-premise của cơ quan (nếu có)
   ✓ Tham khảo ý kiến phụ trách an ninh thông tin trước khi xử lý

(Văn bản này là MẪU mô phỏng để TẬP HUẤN, KHÔNG phải dữ liệu thật)`,
      },
    ],
  },
];

// Helper download
export function downloadAsText(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  // Đổi đuôi pdf/docx thành txt vì là blob text
  const safeName = filename.replace(/\.(pdf|docx?)$/i, ".txt");
  a.download = safeName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}
