// Dữ liệu cho Practice Apps Script + AI
// Code demo và prompt mẫu

export const SHEET_TEMPLATE_URL =
  "https://docs.google.com/spreadsheets/d/10TbHKfp9A1oSKuSNuKNM4XM9W2MYbhIVei4otQa70Ho/copy";

export const PROMPT_MAU = `Bạn là chuyên gia Google Apps Script.

Hãy viết cho tôi một hàm Apps Script có chức năng:
- Đọc danh sách nhân viên từ Google Sheet (tên file: "Bảng lương tháng")
- Mỗi dòng gồm: Họ tên (cột A), Chức vụ (cột B), Lương (cột C), Email (cột D), Trạng thái (cột E)
- Gửi email cho từng nhân viên thông báo mức lương kỳ này
- Email có giao diện HTML đẹp, có bảng thông tin, màu sắc chuyên nghiệp
- Sau khi gửi thành công, ghi "Đã gửi thành công" vào cột E và tô màu xanh
- Nếu gửi lỗi, ghi "Lỗi: ..." vào cột E và tô màu đỏ
- Có nghỉ 0,5 giây giữa các lần gửi để tránh bị Google chặn
- Cuối cùng hiển thị popup tổng kết: số email gửi thành công và thất bại

Yêu cầu thêm:
- Code có chú thích tiếng Việt rõ ràng cho người mới
- Bỏ qua dòng đã có trạng thái "Đã gửi thành công"
- Định dạng tiền tệ Việt Nam (VNĐ, dấu phẩy ngăn cách nghìn)`;

export const CODE_DEMO = `/**
 * HỆ THỐNG GỬI EMAIL LƯƠNG TỰ ĐỘNG
 * Phiên bản ổn định - không lỗi getUi()
 */

// ===============================
// ĐIỀN LINK GOOGLE SHEETS
// ===============================
var DUONG_LINK_GGSHEET =
  'DUONG_LINK_GGSHEET';


// ===============================
// HÀM THÔNG BÁO AN TOÀN
// ===============================
function thongBao(msg) {
  try {
    SpreadsheetApp.getUi().alert(msg);
  } catch (e) {
    Logger.log(msg);
  }
}


// ===============================
// HÀM GỬI EMAIL LƯƠNG
// ===============================
function guiThuNhapLuong() {

  // Kiểm tra link Sheets
  if (!DUONG_LINK_GGSHEET || DUONG_LINK_GGSHEET === "") {
    thongBao("Lỗi: Bạn chưa điền đường link Google Sheets!");
    return;
  }

  try {

    // Mở Google Sheets
    var ss = SpreadsheetApp.openByUrl(DUONG_LINK_GGSHEET);

    // Lấy sheet theo tên
    var sheet = ss.getSheetByName("Danh sách lương");

    // Nếu không có thì lấy sheet đầu tiên
    if (!sheet) {
      sheet = ss.getSheets()[0];
    }

    // Kiểm tra dữ liệu
    var lastRow = sheet.getLastRow();

    if (lastRow < 2) {
      thongBao("Bảng tính chưa có dữ liệu!");
      return;
    }

    // Lấy dữ liệu từ dòng 2
    // A: Tên
    // B: Chức vụ
    // C: Lương
    // D: Email
    // E: Trạng thái
    var data = sheet.getRange(2, 1, lastRow - 1, 5).getValues();

    var emailThanhCong = 0;
    var emailLoi = 0;

    // Duyệt từng nhân viên
    for (var i = 0; i < data.length; i++) {

      var dong = data[i];

      var tenNhanVien = dong[0];
      var chucVu = dong[1];
      var luong = dong[2];
      var emailNhanVien = dong[3];
      var trangThaiGui = dong[4];

      // Bỏ qua nếu thiếu dữ liệu
      if (!tenNhanVien || !emailNhanVien) {
        continue;
      }

      // Bỏ qua nếu đã gửi
      if (trangThaiGui === "Đã gửi thành công") {
        continue;
      }

      // Format lương
      var luongDinhDang = luong;

      if (typeof luong === "number") {
        luongDinhDang =
          luong.toLocaleString("vi-VN") + " VNĐ";
      }

      // Tiêu đề email
      var tieuDeEmail = "Thông báo nhận lương tháng này";

      // Nội dung HTML
      var noiDungHtml =
        '<div style="font-family:Arial;max-width:600px;padding:20px;border:1px solid #ddd;border-radius:8px;">' +

        '<h2 style="color:#1a73e8;border-bottom:2px solid #1a73e8;padding-bottom:10px;">' +
        'THÔNG BÁO NHẬN LƯƠNG' +
        '</h2>' +

        '<p>Xin chào <strong>' + tenNhanVien + '</strong>,</p>' +

        '<p>Thông tin lương kỳ này như sau:</p>' +

        '<table style="width:100%;border-collapse:collapse;">' +

        '<tr style="background:#f8f9fa;">' +
        '<td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Họ và tên</td>' +
        '<td style="padding:10px;border:1px solid #ddd;">' + tenNhanVien + '</td>' +
        '</tr>' +

        '<tr>' +
        '<td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Chức vụ</td>' +
        '<td style="padding:10px;border:1px solid #ddd;">' + chucVu + '</td>' +
        '</tr>' +

        '<tr style="background:#f8f9fa;">' +
        '<td style="padding:10px;border:1px solid #ddd;font-weight:bold;color:#d93025;">Thực nhận</td>' +
        '<td style="padding:10px;border:1px solid #ddd;font-weight:bold;color:#d93025;">' +
        luongDinhDang +
        '</td>' +
        '</tr>' +

        '</table>' +

        '<p>Vui lòng kiểm tra tài khoản ngân hàng.</p>' +

        '<p>Trân trọng,<br><strong>Phòng Nhân Sự</strong></p>' +

        '</div>';

      try {

        // Gửi email
        GmailApp.sendEmail(
          emailNhanVien,
          tieuDeEmail,
          "Vui lòng xem email dạng HTML.",
          {
            htmlBody: noiDungHtml,
            name: "Phòng Nhân Sự"
          }
        );

        // Ghi trạng thái thành công
        var cellThanhCong = sheet.getRange(i + 2, 5);

        cellThanhCong.setValue("Đã gửi thành công");
        cellThanhCong.setFontColor("#0f9d58");
        cellThanhCong.setFontWeight("bold");

        emailThanhCong++;

      } catch (loiGuiMail) {

        // Ghi lỗi
        var cellLoi = sheet.getRange(i + 2, 5);

        cellLoi.setValue("Lỗi: " + loiGuiMail.message);
        cellLoi.setFontColor("#d93025");
        cellLoi.setFontWeight("bold");

        emailLoi++;
      }

      // Nghỉ 0.5 giây tránh spam
      Utilities.sleep(500);
    }

    // Tổng kết
    var thongBaoTongKet =
      "Hoàn thành gửi email lương!\\n\\n" +
      "Gửi thành công: " + emailThanhCong + "\\n" +
      "Gửi thất bại: " + emailLoi;

    thongBao(thongBaoTongKet);

  } catch (e) {

    thongBao("Có lỗi xảy ra:\\n" + e.message);
  }
}
`;

export const DICH_VU_GOOGLE = [
  {
    icon: "mail",
    name: "Gmail",
    desc: "Gửi/đọc email tự động, lập lịch nhắc nhở, lọc thư theo từ khoá",
    examples: [
      "Gửi email hàng loạt cho cán bộ",
      "Gửi báo cáo định kỳ thứ Hai hàng tuần",
      "Tự trả lời thư khi đi công tác",
    ],
  },
  {
    icon: "sheet",
    name: "Sheets",
    desc: "Đọc/ghi dữ liệu bảng tính, tự động tính toán, tạo báo cáo",
    examples: [
      "Tổng hợp dữ liệu nhập từ Form về 1 bảng",
      "Tự động đánh số thứ tự, tô màu theo điều kiện",
      "Xuất báo cáo Excel theo tuần",
    ],
  },
  {
    icon: "drive",
    name: "Drive",
    desc: "Tạo/sao chép/sắp xếp file, đổi quyền truy cập, chia sẻ tự động",
    examples: [
      "Tự sao chép template thành file mới cho mỗi đơn vị",
      "Sắp xếp file theo tháng vào thư mục riêng",
      "Tạo link chia sẻ cho danh sách email",
    ],
  },
  {
    icon: "doc",
    name: "Docs",
    desc: "Tạo văn bản từ template + dữ liệu, ghép thư hàng loạt",
    examples: [
      "Tạo công văn tự động từ danh sách trong Sheets",
      "Soạn giấy mời theo template",
      "Trộn thư cho buổi hội nghị",
    ],
  },
  {
    icon: "calendar",
    name: "Calendar",
    desc: "Tạo/sửa/xoá sự kiện lịch, nhắc nhở qua email",
    examples: [
      "Tự lên lịch họp hàng tuần",
      "Tạo lịch nhắc nộp báo cáo",
      "Đồng bộ lịch họp với cán bộ liên quan",
    ],
  },
  {
    icon: "form",
    name: "Forms",
    desc: "Đọc phản hồi Form, gửi email xác nhận tự động khi có đăng ký",
    examples: [
      "Gửi email xác nhận đăng ký tập huấn",
      "Tổng hợp số liệu khảo sát hàng tuần",
      "Tạo Form tự sinh mã số định danh",
    ],
  },
];