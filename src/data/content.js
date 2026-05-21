// Toàn bộ nội dung tập huấn AI cho cán bộ cấp xã
// Tổng hợp từ tài liệu của Lê Việt Tùng — Sở KH&CN Hà Tĩnh

export const sections = [
  {
    id: "ai-co-ban",
    no: "01",
    title: "AI tạo sinh là gì?",
    kicker: "Khởi đầu",
    summary:
      "AI tạo sinh (Generative AI) là loại trí tuệ nhân tạo có khả năng tự tạo ra nội dung mới — văn bản, hình ảnh, video, âm thanh — thay vì chỉ phân tích dữ liệu có sẵn.",
    blocks: [
      {
        type: "definition",
        title: "Định nghĩa dễ hiểu",
        body: "Hãy hình dung AI tạo sinh như một người trợ lý đã đọc hàng triệu cuốn sách, sau đó có thể viết một bài mới hoặc vẽ một bức ảnh chỉ từ một câu mô tả ngắn của bạn.",
      },
      {
        type: "list",
        title: "Có thể tạo ra những gì?",
        items: [
          "Văn bản: báo cáo, công văn, tóm tắt nghị quyết, soạn email",
          "Hình ảnh: poster tuyên truyền, infographic, banner",
          "Âm thanh: bản tin truyền thanh, podcast tóm tắt tài liệu",
          "Video: phóng sự ngắn, video hướng dẫn thủ tục",
          "Bảng biểu, mã lập trình, dịch thuật đa ngôn ngữ",
        ],
      },
      {
        type: "principle",
        title: "Nguyên lý hoạt động",
        body: "AI được \"học\" từ một lượng dữ liệu khổng lồ để nhận biết các mẫu, quy tắc và tri thức. Khi nhận được câu lệnh (prompt), AI sẽ phân tích, suy luận rồi tạo ra câu trả lời dựa trên những gì đã học.",
      },
    ],
  },
  {
    id: "ao-giac",
    no: "02",
    title: "Cảnh báo: Hiện tượng ảo giác",
    kicker: "Lưu ý quan trọng",
    summary:
      "AI có thể bịa ra thông tin nghe có vẻ rất hợp lý nhưng hoàn toàn sai sự thật. Đây là rủi ro lớn nhất khi sử dụng AI — bắt buộc phải kiểm tra trước khi dùng.",
    blocks: [
      {
        type: "warning",
        title: "Ảo giác (Hallucination) là gì?",
        body: "Là hiện tượng AI tạo ra thông tin không đúng, không có căn cứ, hoặc không tồn tại trong thực tế — nhưng câu trả lời lại trông rất thuyết phục.",
      },
      {
        type: "example",
        title: "Ví dụ minh hoạ",
        question: "Nguyễn Du có từng nhận giải Nobel Văn học không?",
        wrong: "Có, ông nhận Nobel vì Truyện Kiều.",
        truth: "Không thể — Nguyễn Du mất năm 1820, giải Nobel bắt đầu từ 1901. Đến nay chưa có nhà văn Việt Nam nào nhận Nobel Văn học.",
      },
      {
        type: "list",
        title: "Vì sao AI dễ bịa?",
        items: [
          "Quá trình học chưa đủ tốt trên một số chủ đề chuyên sâu",
          "Người dùng đặt câu hỏi mơ hồ, thiếu ngữ cảnh",
          "Kiến thức của AI có thể đã lỗi thời, chưa cập nhật",
          "AI cố \"nối vần\" để câu trả lời nghe có vẻ logic",
        ],
      },
    ],
  },
  {
    id: "cong-cu",
    no: "03",
    title: "ChatGPT, Gemini & các công cụ phổ biến",
    kicker: "Lựa chọn công cụ",
    summary:
      "Mỗi công cụ AI có thế mạnh riêng. Hiểu rõ điểm khác nhau giúp cán bộ chọn đúng công cụ cho từng việc — từ tóm tắt tài liệu đến tạo video tuyên truyền.",
    blocks: [
      {
        type: "tools",
        items: [
          {
            id: "chatgpt",
            name: "ChatGPT",
            maker: "OpenAI",
            version: "GPT-5",
            strength: "Giao tiếp tự nhiên, viết và tóm tắt văn bản vượt trội",
            free: "Có — giới hạn dung lượng",
            paid: "~500K/tháng (ChatGPT Plus)",
          },
          {
            id: "gemini",
            name: "Gemini",
            maker: "Google",
            version: "2.5 Pro, 2.5 Flash",
            strength: "Tích hợp hệ sinh thái Google, đa phương thức mạnh, tạo video & app",
            free: "Có — giới hạn dung lượng",
            paid: "Pro 500K/tháng, Ultra 5M/tháng",
          },
          {
            id: "deepseek",
            name: "Deepseek",
            maker: "Cộng đồng mã nguồn mở",
            version: "V3.1",
            strength: "Mã nguồn mở, có thể tự host, miễn phí",
            free: "Có",
            paid: "Có (dịch vụ thương mại)",
          },
        ],
      },
    ],
  },
  {
    id: "cau-lenh",
    no: "04",
    title: "Cách viết câu lệnh hiệu quả",
    kicker: "Kỹ năng cốt lõi",
    summary:
      "Một câu lệnh (prompt) tốt sẽ cho ra câu trả lời chất lượng. Hãy ghi nhớ công thức 5 thành phần và áp dụng vào mọi yêu cầu quan trọng.",
    blocks: [
      {
        type: "formula",
        title: "Công thức 5 thành phần",
        items: [
          { key: "Vai trò", desc: "AI cần \"nhập vai\" gì? Ví dụ: chuyên viên văn phòng, nhà nghiên cứu chính sách…" },
          { key: "Yêu cầu", desc: "Việc cụ thể cần AI làm là gì? Tóm tắt? Soạn? Phân tích?" },
          { key: "Mục tiêu", desc: "Kết quả cuối cùng phục vụ điều gì?" },
          { key: "Bối cảnh", desc: "Đối tượng đọc là ai? Tình huống ra sao? Có ràng buộc nào?" },
          { key: "Dữ liệu đầu vào", desc: "Đính kèm tài liệu, số liệu, ví dụ mẫu nếu có" },
        ],
      },
      {
        type: "comparison",
        title: "So sánh: Câu lệnh kém vs. câu lệnh tốt",
        bad: "Tóm tắt Nghị quyết 57",
        good: "Đóng vai trò chuyên viên văn phòng Đảng uỷ. Hãy tóm tắt Nghị quyết số 57-NQ/TW ngày 22/12/2024 thành 5 ý chính. Đối tượng đọc là cán bộ cơ quan Đảng địa phương. Trình bày dưới dạng gạch đầu dòng, mỗi ý không quá 2 câu.",
      },
    ],
  },
  {
    id: "ung-dung",
    no: "05",
    title: "Ứng dụng trong công tác văn phòng",
    kicker: "Thực hành",
    summary:
      "5 nhóm công việc thường gặp nhất của cán bộ xã/phường — kèm câu lệnh mẫu để áp dụng ngay vào công việc thực tế.",
    blocks: [
      {
        type: "usecases",
        items: [
          {
            icon: "FileText",
            title: "Phân tích & tóm tắt tài liệu",
            desc: "Tóm tắt nghị quyết, báo cáo, công văn dài hàng chục trang thành điểm chính trong 1 phút.",
            sample: "Tóm tắt nội dung chính của Nghị quyết 57 của Bộ Chính trị. Nêu bật 3 nhiệm vụ trọng tâm, các mốc thời gian quan trọng, và những số liệu chính được đề cập.",
          },
          {
            icon: "Search",
            title: "Nghiên cứu & tham mưu",
            desc: "Khảo sát tình hình, phân tích số liệu, đề xuất giải pháp cho lãnh đạo.",
            sample: "Phân tích thực trạng giải quyết hồ sơ hành chính trực tuyến tại phường trong 6 tháng qua. Nhận diện nguyên nhân khiến tỷ lệ người dân sử dụng dịch vụ công trực tuyến còn thấp. Đề xuất giải pháp khả thi.",
          },
          {
            icon: "Calendar",
            title: "Xây dựng kế hoạch",
            desc: "Lập kế hoạch công tác theo tuần/tháng, phân công nhiệm vụ rõ ràng.",
            sample: "Soạn kế hoạch công tác tháng 11 của Chi bộ Xã Đại Nam, gồm: tổ chức sinh hoạt chuyên đề về Nghị quyết 57; triển khai thi đua chào mừng 80 năm Quốc khánh 2/9. Sắp xếp theo tuần và nêu dự kiến kết quả.",
          },
          {
            icon: "Users",
            title: "Tổng hợp ý kiến",
            desc: "Hệ thống hoá ý kiến cử tri, biên bản họp thành báo cáo gọn gàng.",
            sample: "Tổng hợp 15 ý kiến cử tri về việc xây dựng nhà văn hoá. Phân thành 2 nhóm: (1) đóng góp kinh phí, (2) thiết kế và vị trí. Tóm tắt kiến nghị chính của mỗi nhóm.",
          },
          {
            icon: "FileBarChart",
            title: "Xây dựng báo cáo",
            desc: "Soạn báo cáo tổng kết, sơ kết theo văn phong hành chính chuẩn.",
            sample: "Soạn báo cáo tổng kết công tác kiểm tra giám sát năm 2024 của Chi bộ. Gồm: (I) Đánh giá chung, (II) Bài học kinh nghiệm, (III) Phương hướng năm 2025. Văn phong báo cáo Đảng.",
          },
        ],
      },
    ],
  },
  {
    id: "ky-thuat-nang-cao",
    no: "06",
    title: "Kỹ thuật nâng cao chất lượng câu trả lời",
    kicker: "Cấp độ chuyên sâu",
    summary:
      "Khi câu trả lời của AI chưa đủ tốt, hãy áp dụng 4 kỹ thuật chuyên nghiệp này để \"điều khiển\" AI làm việc chính xác hơn.",
    blocks: [
      {
        type: "techniques",
        items: [
          {
            name: "Cung cấp ví dụ",
            desc: "Đính kèm một mẫu báo cáo đã chuẩn cho AI tham khảo trước khi yêu cầu soạn báo cáo mới.",
            sample: "Dưới đây là mẫu báo cáo rà soát hộ nghèo năm 2023 đã được phê duyệt. Dựa theo cấu trúc và văn phong này, hãy soạn báo cáo rà soát năm 2024 với số liệu mới sau...",
          },
          {
            name: "Hướng dẫn từng bước",
            desc: "Yêu cầu AI suy nghĩ theo từng bước, tránh trả lời ẩu khi xử lý vấn đề phức tạp.",
            sample: "Hãy thực hiện theo các bước: (1) Đọc và tóm tắt bài viết, (2) Liệt kê các giải pháp, (3) Phân loại theo nhóm, (4) Trình bày dưới dạng bảng 3 cột.",
          },
          {
            name: "Phân tích đa chiều",
            desc: "Yêu cầu AI cho nhiều góc nhìn khác nhau cùng một vấn đề để có đánh giá toàn diện.",
            sample: "Hãy phân tích Nghị quyết 57 theo 3 góc nhìn: (a) chiến lược quốc gia, (b) cơ chế thể chế, (c) tác động đến cán bộ địa phương.",
          },
          {
            name: "Lùi lại nhìn tổng thể",
            desc: "Trước khi đi vào chi tiết, yêu cầu AI làm rõ các khái niệm và nguyên lý cơ bản.",
            sample: "Trước khi tham mưu giải pháp nâng cao chất lượng sinh hoạt Chi bộ, hãy trả lời: (1) Mục đích cốt lõi của sinh hoạt Chi bộ là gì? (2) Yếu tố nào quyết định chất lượng? (3) Thách thức lớn nhất hiện nay?",
          },
        ],
      },
    ],
  },
  {
    id: "gemini",
    no: "07",
    title: "Gemini & Canvas — Trợ lý đa năng",
    kicker: "Công cụ của Google",
    summary:
      "Ngoài chức năng như ChatGPT, Gemini còn có Canvas (không gian làm việc), tạo video, tạo app nội bộ — đặc biệt mạnh cho cán bộ làm truyền thông và số hoá quy trình.",
    blocks: [
      {
        type: "features",
        items: [
          {
            title: "Canvas — Soạn thảo chuyên nghiệp",
            desc: "Một trình soạn thảo riêng thay vì khung chat. Tạo dàn ý slide báo cáo, kịch bản phát thanh, dịch và soát lỗi văn bản, đổi tông giọng (trang trọng ↔ thân thiện) chỉ với 1 click.",
          },
          {
            title: "Tạo Slide thuyết trình",
            desc: "Dán số liệu thô vào, Canvas sẽ chuyển thành slide chuyên nghiệp, xuất được sang Google Slides hoặc PowerPoint.",
          },
          {
            title: "Tạo App nội bộ — Code Canvas",
            desc: "Tự tạo form điểm danh, app quản lý trực ban kết nối với Google Sheets mà không cần biết lập trình. Chỉ cần mô tả bằng lời.",
          },
          {
            title: "Tạo ảnh & video tuyên truyền",
            desc: "Tích hợp Nano Banana (ảnh) và Veo (video) ngay trong khung chat. Tạo infographic tỷ lệ 9:16 cho Zalo OA, video clip tuyên truyền an toàn giao thông.",
          },
        ],
      },
    ],
  },
  {
    id: "notebooklm",
    no: "08",
    title: "NotebookLM — Trợ lý nghiên cứu chống ảo giác",
    kicker: "Vũ khí riêng cho cán bộ",
    summary:
      "Khác với ChatGPT/Gemini, NotebookLM chỉ trả lời dựa trên tài liệu bạn nạp vào, có trích dẫn nguồn rõ ràng. Cực kỳ phù hợp khi tra cứu luật, quy định, văn bản chính thức.",
    blocks: [
      {
        type: "highlight",
        title: "Điểm khác biệt vượt trội",
        body: "NotebookLM \"khoá\" mình trong các tài liệu bạn cung cấp — không bịa thông tin từ internet. Mỗi câu trả lời đều có số trích dẫn [1] [2] [3] chỉ thẳng đến đoạn văn gốc trong tài liệu của bạn.",
      },
      {
        type: "panels",
        title: "Giao diện 3 bảng đơn giản",
        items: [
          {
            name: "Sources (Nguồn)",
            desc: "Nạp tới 50 tài liệu / notebook (tổng 500.000 từ). Hỗ trợ PDF, Word, Google Drive, link YouTube, file ghi âm cuộc họp.",
          },
          {
            name: "Chat (Trò chuyện)",
            desc: "Hỏi đáp với tài liệu. Mỗi câu trả lời có số trích dẫn chỉ về đoạn văn gốc.",
          },
          {
            name: "Studio (Xưởng)",
            desc: "Biến tài liệu thành: podcast 2 người dẫn, video tóm tắt, mind map, infographic, slide bài giảng, FAQ, briefing doc cho lãnh đạo.",
          },
        ],
      },
      {
        type: "usecases-light",
        title: "Ứng dụng thực tế",
        items: [
          "Nạp Luật Đất đai 2024 + các Nghị định → tra cứu nhanh, trích dẫn chính xác điều, khoản",
          "Tải biên bản họp cử tri (kể cả file ghi âm) → tổng hợp ý kiến theo nhóm vấn đề",
          "Nạp hướng dẫn app i-HaTinh → tạo podcast 5–10 phút để phát trên loa truyền thanh thôn",
          "Tải các báo cáo lẻ → tạo briefing doc 1 trang A4 cho Chủ tịch xã mang đi họp huyện",
        ],
      },
    ],
  },
  {
    id: "ket-hop",
    no: "09",
    title: "Quy trình kết hợp Gemini + NotebookLM",
    kicker: "Workflow thông minh",
    summary:
      "Sức mạnh thực sự đến khi kết hợp cả hai: NotebookLM lo phần \"đọc hiểu chính xác\", Gemini lo phần \"sáng tạo và soạn thảo\". Giảm 70% thời gian xử lý văn bản.",
    blocks: [
      {
        type: "workflow",
        items: [
          {
            step: "01",
            name: "Thu thập",
            desc: "Tải PDF công văn, báo cáo, luật vào NotebookLM",
          },
          {
            step: "02",
            name: "Phân tích",
            desc: "Yêu cầu NotebookLM tóm tắt ý chính và trích xuất số liệu",
          },
          {
            step: "03",
            name: "Sáng tạo",
            desc: "Dùng Gemini soạn dự thảo dựa trên các ý chính từ bước 2",
          },
          {
            step: "04",
            name: "Hoàn thiện",
            desc: "Kiểm tra thể thức, chỉnh sửa và phát hành văn bản",
          },
        ],
      },
    ],
  },
  {
    id: "an-toan",
    no: "10",
    title: "Pháp lý & An toàn khi dùng AI",
    kicker: "Bắt buộc tuân thủ",
    summary:
      "Luật Trí tuệ nhân tạo 134/2025/QH15 đã có hiệu lực. Cán bộ cần nắm rõ nguyên tắc an toàn để sử dụng AI đúng pháp luật và không gây rủi ro cho cơ quan, người dân.",
    blocks: [
      {
        type: "law",
        title: "Luật Trí tuệ nhân tạo Việt Nam",
        items: [
          { label: "Luật số", value: "134/2025/QH15", note: "Hiệu lực 01/03/2026" },
          { label: "Nghị định", value: "142/2026/NĐ-CP", note: "Hiệu lực 01/05/2026" },
        ],
        body: "Mục tiêu: kiến tạo hệ sinh thái AI an toàn, minh bạch, lấy con người làm trung tâm và không cản trở đổi mới sáng tạo.",
      },
      {
        type: "rule-321",
        title: "Nguyên tắc 3-2-1",
        no: [
          "Không cung cấp dữ liệu mật cho AI",
          "Không tin 100% câu trả lời",
          "Không dùng đầu ra nguyên trạng",
        ],
        yes: [
          "Có bối cảnh và yêu cầu rõ ràng",
          "Có kiểm tra pháp lý và phê duyệt nội bộ",
        ],
        flow: "Rà soát → Đối chiếu nguồn → Ghi chú điều chỉnh → Phê duyệt",
      },
      {
        type: "checklist",
        title: "Bảo mật & đạo đức",
        items: [
          "Chỉ cung cấp thông tin thật cần — tránh sức khoẻ, tài chính, danh tính công dân",
          "Ẩn danh hoá khi chia sẻ dữ liệu nhạy cảm",
          "AI có thể bịa — luôn kiểm chứng với việc hệ trọng (y tế, pháp lý)",
          "Nhận biết AI có thể mang thiên lệch — đánh giá đa chiều",
          "Gắn nhãn rõ nội dung do AI hỗ trợ tạo (theo Luật AI mới)",
          "Kiểm tra quyền bản quyền khi dùng nội dung tạo sinh thương mại",
        ],
      },
    ],
  },
];

// FAQ cho chatbot
export const faqData = [
  {
    keywords: ["ai là gì", "ai tạo sinh", "generative", "trí tuệ nhân tạo"],
    answer:
      "**AI tạo sinh** là loại trí tuệ nhân tạo có thể tự tạo ra nội dung mới — văn bản, hình ảnh, video, âm thanh — từ những câu lệnh đơn giản của bạn.\n\nVí dụ: ChatGPT viết báo cáo, Gemini tạo ảnh infographic, NotebookLM tóm tắt nghị quyết.",
  },
  {
    keywords: ["ảo giác", "bịa", "sai", "hallucination", "không đúng"],
    answer:
      "**Ảo giác** là hiện tượng AI bịa ra thông tin nghe có vẻ rất hợp lý nhưng hoàn toàn sai sự thật.\n\n**3 nguyên nhân chính:**\n- Quá trình học chưa đủ tốt\n- Người dùng đặt câu hỏi mơ hồ\n- Kiến thức của AI đã lỗi thời\n\n**Cách phòng tránh:** Luôn kiểm tra với nguồn chính thức trước khi sử dụng — đặc biệt là với việc liên quan pháp lý, y tế.",
  },
  {
    keywords: ["chatgpt", "openai", "gpt"],
    answer:
      "**ChatGPT** do OpenAI phát triển, ra mắt cuối 2022. Phiên bản hiện tại: GPT-5.\n\n**Điểm mạnh:** Giao tiếp tự nhiên, viết và tóm tắt văn bản rất giỏi.\n\n**Truy cập:** chat.openai.com — có bản miễn phí và bản trả phí khoảng 500K/tháng.",
  },
  {
    keywords: ["gemini", "google"],
    answer:
      "**Gemini** do Google phát triển. Phiên bản hiện tại: 2.5 Pro và 2.5 Flash.\n\n**Điểm mạnh:**\n- Canvas (không gian soạn thảo chuyên nghiệp)\n- Tạo video, tạo app nội bộ\n- Tạo ảnh chất lượng cao\n- Tích hợp với hệ sinh thái Google\n\n**Truy cập:** gemini.google.com",
  },
  {
    keywords: ["notebooklm", "notebook lm", "trợ lý nghiên cứu"],
    answer:
      "**NotebookLM** là công cụ AI miễn phí của Google, hoạt động như trợ lý nghiên cứu cá nhân.\n\n**Điểm khác biệt lớn nhất:** Chỉ trả lời dựa trên tài liệu bạn nạp vào, kèm trích dẫn nguồn → **gần như không bịa**.\n\n**Giao diện 3 bảng:**\n- Sources: Nạp tài liệu (tối đa 50 nguồn)\n- Chat: Hỏi đáp có trích dẫn\n- Studio: Tạo podcast, video, mind map, infographic\n\n**Truy cập:** notebooklm.google.com",
  },
  {
    keywords: ["câu lệnh", "prompt", "viết câu", "hỏi sao"],
    answer:
      "**Công thức câu lệnh hiệu quả — 5 thành phần:**\n\n- **Vai trò:** AI nhập vai gì? (vd: chuyên viên văn phòng)\n- **Yêu cầu:** Việc cụ thể cần làm\n- **Mục tiêu:** Để làm gì?\n- **Bối cảnh:** Đối tượng đọc là ai?\n- **Dữ liệu đầu vào:** Tài liệu, số liệu kèm theo\n\nCâu lệnh càng cụ thể → câu trả lời càng chất lượng.",
  },
  {
    keywords: ["báo cáo", "soạn báo", "viết báo"],
    answer:
      "**Mẫu câu lệnh soạn báo cáo:**\n\n*\"Đóng vai chuyên viên văn phòng UBND xã. Soạn báo cáo tổng kết công tác [...] năm 2024 gồm 3 phần: (I) Đánh giá chung, (II) Bài học kinh nghiệm, (III) Phương hướng năm 2025. Văn phong báo cáo hành chính. Dữ liệu: [đính kèm số liệu]\"*\n\n**Mẹo:** Đính kèm mẫu báo cáo cũ đã chuẩn để AI bắt chước văn phong.",
  },
  {
    keywords: ["tóm tắt", "tom tat", "nghị quyết", "tài liệu"],
    answer:
      "**Mẫu câu lệnh tóm tắt:**\n\n*\"Tóm tắt nội dung chính của [tên tài liệu]. Nêu bật: (1) 3 nhiệm vụ trọng tâm, (2) các mốc thời gian quan trọng, (3) những số liệu chính. Đối tượng đọc: cán bộ cơ quan Đảng địa phương. Trình bày: gạch đầu dòng, mỗi ý không quá 2 câu.\"*\n\n**Mẹo:** Với văn bản dài, dùng **NotebookLM** sẽ chính xác hơn vì có trích dẫn.",
  },
  {
    keywords: ["an toàn", "bảo mật", "rủi ro", "pháp lý", "luật"],
    answer:
      "**Nguyên tắc 3-2-1:**\n\n**3 KHÔNG:**\n- Không cung cấp dữ liệu mật\n- Không tin 100%\n- Không dùng đầu ra nguyên trạng\n\n**2 CÓ:**\n- Có bối cảnh và yêu cầu rõ\n- Có kiểm tra pháp lý và phê duyệt nội bộ\n\n**1 QUY TRÌNH:** Rà soát → Đối chiếu nguồn → Điều chỉnh → Phê duyệt.\n\n**Lưu ý:** Luật AI Việt Nam 134/2025/QH15 đã có hiệu lực từ 01/03/2026.",
  },
  {
    keywords: ["miễn phí", "phí", "trả tiền", "giá"],
    answer:
      "**Các công cụ AI và chi phí:**\n\n- **ChatGPT:** Có bản miễn phí (giới hạn). Plus ~500K/tháng\n- **Gemini:** Có bản miễn phí. Pro 500K/tháng. Ultra 5M/tháng\n- **NotebookLM:** **Hoàn toàn miễn phí** ✨\n- **Deepseek:** Miễn phí (mã nguồn mở)\n\n**Gợi ý cho cán bộ:** Bắt đầu với bản miễn phí của Gemini + NotebookLM là đủ cho hầu hết công việc văn phòng.",
  },
  {
    keywords: ["bắt đầu", "học từ đâu", "mới dùng", "newbie"],
    answer:
      "**Lộ trình 4 bước cho người mới:**\n\n1. **Tuần 1:** Hiểu AI là gì, cảnh giác về ảo giác\n2. **Tuần 2:** Học viết câu lệnh theo công thức 5 thành phần\n3. **Tuần 3:** Áp dụng vào 5 việc thường gặp (tóm tắt, báo cáo, kế hoạch...)\n4. **Tuần 4:** Học kỹ thuật nâng cao + dùng NotebookLM cho công việc chính xác\n\n**Mẹo:** Bấm vào nút **\"Lộ trình học\"** ở góc dưới để xem mind map chi tiết!",
  },
];

export const quickQuestions = [
  "AI tạo sinh là gì?",
  "Cách viết câu lệnh hiệu quả?",
  "NotebookLM khác ChatGPT thế nào?",
  "Mẫu câu lệnh soạn báo cáo?",
  "Có an toàn không?",
];

// Chi tiết các nền tảng AI — hiển thị trong popup khi bấm vào logo
export const toolDetails = {
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    maker: "OpenAI",
    version: "GPT-5",
    url: "https://chat.openai.com",
    tagline: "Trợ lý AI hàng đầu thế giới",
    description:
      "ChatGPT là chatbot AI do OpenAI phát triển, ra mắt cuối năm 2022 và là sản phẩm đột phá đầu tiên đưa AI tạo sinh đến với hàng tỷ người dùng trên toàn cầu. Phiên bản hiện tại GPT-5 vượt trội về giao tiếp tự nhiên, tóm tắt văn bản và hỗ trợ tiếng Việt rất tốt.",
    strengths: [
      "Văn phong tự nhiên, gần với cách nói của người Việt",
      "Tóm tắt văn bản dài (nghị quyết, báo cáo) rất nhanh và chính xác",
      "Có app trên iOS, Android và máy tính (Windows/Mac)",
      "Hỗ trợ giọng nói (Voice mode) — nói chuyện như với người thật",
      "Có thể đọc và phân tích ảnh, file PDF, Excel",
    ],
    plans: [
      {
        name: "Miễn phí",
        price: "0 đ",
        priceNote: "Có giới hạn",
        features: ["GPT-5 (giới hạn lượt)", "Hỏi đáp cơ bản", "Tải ảnh để phân tích"],
        highlight: false,
      },
      {
        name: "Plus",
        price: "~500K",
        priceNote: "/tháng",
        features: [
          "GPT-5 đầy đủ tính năng",
          "Tạo ảnh không giới hạn",
          "Voice Mode nâng cao",
          "Code Interpreter, phân tích dữ liệu",
        ],
        highlight: true,
      },
      {
        name: "Pro",
        price: "~5M",
        priceNote: "/tháng",
        features: [
          "Tất cả tính năng Plus",
          "Model o1 Pro — suy luận nâng cao",
          "Không giới hạn lượt hỏi hoàn toàn",
        ],
        highlight: false,
      },
    ],
  },

  gemini: {
    id: "gemini",
    name: "Gemini",
    maker: "Google",
    version: "2.5 Pro / 2.5 Flash",
    url: "https://gemini.google.com",
    tagline: "Đa năng — ảnh, video, slide, app",
    description:
      "Gemini là chatbot AI của Google, kế thừa từ Bard. Điểm mạnh nhất là tích hợp sâu với hệ sinh thái Google (Drive, Docs, Gmail, YouTube) và khả năng tạo nội dung đa phương tiện như ảnh, video, slide thuyết trình hoàn toàn tự động. Đặc biệt phù hợp cho cán bộ làm công tác truyền thông và soạn thảo văn bản.",
    strengths: [
      "Tích hợp Google Workspace (Drive, Docs, Gmail) — dùng được luôn",
      "Canvas — không gian soạn thảo chuyên nghiệp, xuất ra Google Slides/Word",
      "Tạo ảnh chất lượng cao (Imagen / Nano Banana)",
      "Tạo video tuyên truyền tự động (Veo)",
      "Tạo app nội bộ không cần biết lập trình (Code Canvas)",
    ],
    plans: [
      {
        name: "Miễn phí",
        price: "0 đ",
        priceNote: "Có giới hạn",
        features: [
          "Gemini 2.5 Flash",
          "1500 yêu cầu/ngày",
          "Tạo ảnh giới hạn số lượng",
        ],
        highlight: false,
      },
      {
        name: "AI Pro",
        price: "~500K",
        priceNote: "/tháng",
        features: [
          "Gemini 2.5 Pro đầy đủ",
          "Veo — tạo video tuyên truyền",
          "Canvas + Code Canvas",
          "2TB Google Drive miễn phí",
        ],
        highlight: true,
      },
      {
        name: "AI Ultra",
        price: "~5M",
        priceNote: "/tháng",
        features: [
          "Tất cả tính năng AI Pro",
          "Model 2.5 Ultra — mạnh nhất hiện tại",
          "Deep Research nâng cao",
          "30TB lưu trữ Google",
        ],
        highlight: false,
      },
    ],
  },

  deepseek: {
    id: "deepseek",
    name: "Deepseek",
    maker: "Cộng đồng mã nguồn mở",
    version: "V3.1",
    url: "https://chat.deepseek.com",
    tagline: "Mã nguồn mở — miễn phí, tự host được",
    description:
      "Deepseek là một trong những mô hình AI mã nguồn mở mạnh nhất hiện nay, do startup Trung Quốc phát triển. Điểm đặc biệt là mã nguồn được công bố hoàn toàn, có thể tải về tự host trên máy chủ cơ quan để đảm bảo bảo mật tuyệt đối cho dữ liệu nhạy cảm — rất phù hợp với cơ quan nhà nước.",
    strengths: [
      "Hoàn toàn MIỄN PHÍ trên trang chat.deepseek.com",
      "Mã nguồn mở — có thể tự host trên máy chủ riêng của cơ quan",
      "Khả năng lập luận (reasoning) rất tốt — phù hợp phân tích vấn đề phức tạp",
      "Hỗ trợ tiếng Việt ở mức khá",
      "Lựa chọn an toàn nhất khi cần xử lý dữ liệu mật của cơ quan",
    ],
    plans: [
      {
        name: "Web Chat",
        price: "0 đ",
        priceNote: "Miễn phí 100%",
        features: [
          "Truy cập chat.deepseek.com",
          "Không giới hạn lượt hỏi",
          "Không cần API key, đăng ký nhanh",
        ],
        highlight: true,
      },
      {
        name: "API",
        price: "Theo dùng",
        priceNote: "Tính theo token",
        features: [
          "Tích hợp vào ứng dụng riêng",
          "Giá thấp hơn OpenAI ~10 lần",
          "Phù hợp dự án nội bộ nhỏ",
        ],
        highlight: false,
      },
      {
        name: "Self-host",
        price: "Miễn phí",
        priceNote: "+ chi phí server",
        features: [
          "Chạy trên máy chủ riêng của cơ quan",
          "Toàn quyền kiểm soát dữ liệu",
          "Phù hợp với dữ liệu mật, tuyệt mật",
        ],
        highlight: false,
      },
    ],
  },
};
