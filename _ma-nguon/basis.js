// Căn cứ biên soạn, xếp theo đúng đối tượng: giáo viên Mầm non, Tiểu học, THCS.
// Nhóm 1 là văn bản mới nhất của Bộ GDĐT năm 2026. Chỉ ghi văn bản đã kiểm tra số hiệu và ngày.
const GROUPS = [
  ['G1', 'Văn bản của Bộ GDĐT năm 2026 cho giáo viên và năm học 2026-2027'],
  ['G2', 'Văn bản chuyên môn của Bộ GDĐT đang áp dụng khi soạn bài, ra đề'],
  ['G3', 'Văn bản của Sở GDĐT'],
  ['G4', 'Luật và định hướng quốc gia có liên quan'],
];
const DOCS = [
  // [mã, nhóm, tên, số hiệu và ngày, sách dựa vào điểm nào, dùng ở]
  ['T18', 'G1', 'Khung năng lực số đối với giáo viên, cán bộ quản lý cơ sở giáo dục mầm non, phổ thông, giáo dục thường xuyên', 'Thông tư 18/2026/TT-BGDĐT ngày 27/3/2026, hiệu lực 12/5/2026', '6 miền năng lực, 20 năng lực thành phần, 3 mức. Lần đầu AI là một miền năng lực riêng: giáo viên ứng dụng AI trong dạy học, bảo đảm minh bạch, công bằng, bảo vệ dữ liệu cá nhân.', 'Toàn bộ sách, {{F1:s}}'],
  ['C5385', 'G1', 'Hướng dẫn thực hiện nhiệm vụ giáo dục mầm non năm học 2026-2027', 'Công văn 5385/BGDĐT-GDMN ngày 12/8/2026', 'Bồi dưỡng giáo viên mầm non ứng dụng chuyển đổi số và AI. Công nghệ số dùng để hỗ trợ thiết kế hoạt động giáo dục, phối hợp với gia đình, bảo đảm an toàn và riêng tư của trẻ.', 'Dòng Mầm non ở mọi bảng Đổi cho lớp, {{F2:s}}'],
  ['C5208', 'G1', 'Hướng dẫn thực hiện nhiệm vụ giáo dục phổ thông năm học 2026-2027', 'Công văn 5208/BGDĐT-GDPT ngày 07/8/2026', 'Đẩy mạnh chuyển đổi số. Học sinh dùng công nghệ và AI an toàn, có trách nhiệm, trung thực; không lệ thuộc, không lạm dụng.', '{{PART:C}}, {{E4:s}}, {{E5:s}}'],
  ['Q2422', 'G1', 'Khung nội dung giáo dục trí tuệ nhân tạo cho học sinh phổ thông', 'Quyết định 2422/QĐ-BGDĐT ngày 18/8/2026', 'Nội dung giáo dục AI chính thức cho học sinh phổ thông.', '{{F1:s}}'],
  ['C5588', 'G1', 'Hướng dẫn thực hiện nội dung giáo dục AI cho học sinh phổ thông từ năm học 2026-2027', 'Công văn 5588/BGDĐT-GDPT ngày 19/8/2026', 'Nội dung cốt lõi 12 tiết/lớp/năm học. Học sinh dùng AI an toàn, có đạo đức, có trách nhiệm.', '{{PART:E}}, {{F1:s}}'],
  ['CT31', 'G1', 'Chỉ thị của Thủ tướng về nhiệm vụ trọng tâm năm học 2026-2027', 'Chỉ thị 31/CT-TTg ngày 05/8/2026', 'Đẩy mạnh chuyển đổi số, ứng dụng AI có kiểm soát; mở rộng giáo dục STEM/STEAM, kỹ năng số.', '{{C2:s}}, toàn bộ sách'],
  ['T2', 'G2', 'Chương trình giáo dục phổ thông', 'Thông tư 32/2018/TT-BGDĐT (chương trình đang áp dụng)', 'Nội dung, yêu cầu cần đạt của môn học khi soạn bài và ra đề.', '{{PART:B}}, {{PART:C}}'],
  ['T3', 'G2', 'Chương trình giáo dục mầm non', 'Văn bản hợp nhất 01/VBHN-BGDĐT ngày 13/4/2021', 'Câu lệnh cho Mầm non theo hoạt động chơi, trải nghiệm.', 'Dòng Mầm non ở mọi bảng Đổi cho lớp'],
  ['T1', 'G2', 'Khung năng lực số cho người học', 'Thông tư 02/2025/TT-BGDĐT ngày 24/01/2025', 'Yêu cầu về năng lực số của học sinh khi cho học sinh dùng AI.', '{{E4:s}}, {{E5:s}}'],
  ['C1', 'G2', 'Triển khai tài liệu Hướng dẫn sử dụng ứng dụng AI trong dạy và học', 'Công văn 2250/BGDĐT-GDPT ngày 12/5/2025', 'Dùng AI để nâng hiệu quả, chất lượng dạy và học.', 'Toàn bộ sách'],
  ['C3', 'G2', 'Hướng dẫn kiểm tra, đánh giá cấp THCS, THPT', 'Công văn 7991/BGDĐT-GDTrH ngày 17/12/2024', 'Đề định kỳ đi kèm ma trận, bản đặc tả, hướng dẫn chấm.', '{{C5:s}}, {{C6:s}}'],
  ['T5', 'G2', 'Đánh giá học sinh THCS, THPT', 'Thông tư 22/2021/TT-BGDĐT', 'Đánh giá thường xuyên, định kỳ.', '{{C3:s}} đến {{C7:s}}'],
  ['T4', 'G2', 'Đánh giá học sinh tiểu học', 'Thông tư 27/2020/TT-BGDĐT', 'Đánh giá vì sự tiến bộ, kết hợp nhận xét và điểm số.', '{{C4:s}}, {{C7:s}}'],
  ['S1', 'G3', 'Kế hoạch, hướng dẫn nhiệm vụ năm học 2026-2027 của Sở GDĐT nơi thầy cô công tác', 'Mỗi Sở ban hành riêng, dựa trên văn bản của Bộ', 'Các Sở cụ thể hóa văn bản của Bộ cho địa phương, ví dụ Hà Nội triển khai giáo dục AI đồng bộ cho học sinh từ năm học 2026-2027. Thầy cô đối chiếu thêm văn bản của Sở mình.', 'Toàn bộ sách'],
  ['L1', 'G4', 'Luật Trí tuệ nhân tạo', 'Luật số 134/2025/QH15, hiệu lực 01/3/2026', 'AI là công cụ hỗ trợ, con người quyết định cuối cùng. Nội dung do AI tạo ra cần có dấu hiệu nhận biết.', '{{A1:s}}, {{PART:D}}, {{PART:F}}'],
  ['L2', 'G4', 'Luật Bảo vệ dữ liệu cá nhân', 'Luật số 91/2025/QH15, hiệu lực 01/1/2026', 'Không đưa dữ liệu cá nhân của học sinh vào công cụ AI.', '{{E4:s}} đến {{E6:s}}, {{F2:s}}'],
  ['L3', 'G4', 'Luật Sở hữu trí tuệ (sửa đổi 2022)', 'Điều 25: sử dụng tác phẩm không phải xin phép, không phải trả tiền', 'Dùng SGK, tài liệu để minh họa giảng dạy hợp lý, ghi tên tác giả và nguồn.', '{{C4:s}}, {{C5:s}}, {{E4:s}}, {{E5:s}}'],
  ['N4', 'G4', 'Nghị quyết về đột phá phát triển giáo dục và đào tạo', 'Nghị quyết 71-NQ/TW ngày 22/8/2025 của Bộ Chính trị', 'Mục tiêu giáo dục đến 2030, 2035, 2045.', 'Toàn bộ sách'],
  ['N2', 'G4', 'Chiến lược quốc gia về trí tuệ nhân tạo đến năm 2030, tầm nhìn 2045', 'Quyết định 1671/QĐ-TTg ngày 28/8/2026', 'Định hướng chuyển đổi AI quốc gia.', 'Toàn bộ sách'],
  ['U1', 'G4', 'Khung năng lực AI cho giáo viên (UNESCO, tham khảo quốc tế)', 'UNESCO, 2024', '5 lĩnh vực, 3 cấp độ năng lực AI của giáo viên.', '{{F1:s}}'],
];

const PER_LESSON = {
  A1: ['T18', 'L1'],
  B7: ['T18', 'T2'],
  C1: ['T2', 'T3', 'C5385'],
  C2: ['CT31', 'T2'],
  C3: ['T5', 'T2'],
  C4: ['T4', 'L3'],
  C5: ['C3', 'T5', 'L3'],
  C6: ['C3', 'T5'],
  C7: ['T4', 'T5'],
  D1: ['T18', 'L1'],
  D5: ['C5385', 'L1'],
  D7: ['L1'],
  D8: ['L1'],
  E1: ['T18'],
  E4: ['C5208', 'T1', 'L2'],
  E5: ['C5208', 'T1', 'L2'],
  E6: ['T18', 'L2'],
  F1: ['T18', 'Q2422', 'C5588'],
  F2: ['L2', 'T18', 'C5385'],
};
module.exports = { GROUPS, DOCS, PER_LESSON };
