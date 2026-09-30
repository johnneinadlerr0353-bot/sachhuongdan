// Căn cứ tham chiếu khi biên soạn. Chỉ ghi văn bản đã kiểm tra số hiệu và ngày.
// Ưu tiên văn bản 2025-2026 và định hướng đến 2030.
const GROUPS = [
  ['G1', 'Định hướng quốc gia đến năm 2030'],
  ['G2', 'Luật mới có hiệu lực năm 2026'],
  ['G3', 'Hướng dẫn của ngành Giáo dục 2025-2026'],
  ['G4', 'Văn bản chuyên môn đang áp dụng khi soạn bài, ra đề'],
];
const DOCS = [
  // [mã, nhóm, tên ngắn, số hiệu và ngày, nội dung sách dựa vào, bài liên quan]
  ['N2', 'G1', 'Chiến lược quốc gia về trí tuệ nhân tạo đến năm 2030, tầm nhìn 2045', 'Quyết định 1671/QĐ-TTg ngày 28/8/2026', 'Chuyển đổi AI quốc gia: AI trở thành năng lực cốt lõi, trong đó có giáo dục.', 'Toàn bộ sách'],
  ['N3', 'G1', 'Chương trình phát triển nhân lực trí tuệ nhân tạo đến năm 2030', 'Quyết định 1528/QĐ-TTg năm 2026', 'Nâng năng lực AI của người lao động, trong đó có đội ngũ giáo viên.', 'Toàn bộ sách'],
  ['N4', 'G1', 'Nghị quyết về đột phá phát triển giáo dục và đào tạo', 'Nghị quyết 71-NQ/TW ngày 22/8/2025 của Bộ Chính trị', 'Mục tiêu giáo dục đến 2030, 2035, 2045.', 'Toàn bộ sách'],
  ['N1', 'G1', 'Nghị quyết về đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia', 'Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị', 'Định hướng chuyển đổi số, ứng dụng công nghệ mới.', 'Toàn bộ sách'],
  ['L1', 'G2', 'Luật Trí tuệ nhân tạo', 'Luật số 134/2025/QH15, thông qua 10/12/2025, hiệu lực 01/3/2026', 'AI là công cụ hỗ trợ, con người quyết định cuối cùng. Nội dung do AI tạo ra cần có dấu hiệu nhận biết.', '{{A1:s}}, {{PART:D}}, {{PART:F}}'],
  ['L2', 'G2', 'Luật Bảo vệ dữ liệu cá nhân', 'Luật số 91/2025/QH15, thông qua 26/6/2025, hiệu lực 01/1/2026', 'Không đưa dữ liệu cá nhân của học sinh vào công cụ AI.', '{{E4:s}} đến {{E6:s}}, {{F2:s}}'],
  ['T1', 'G3', 'Khung năng lực số cho người học', 'Thông tư 02/2025/TT-BGDĐT ngày 24/01/2025', 'Học sinh dùng công nghệ và AI an toàn, có trách nhiệm.', '{{E4:s}}, {{E5:s}}, {{PART:F}}'],
  ['C1', 'G3', 'Triển khai tài liệu Hướng dẫn sử dụng ứng dụng AI trong dạy và học', 'Công văn 2250/BGDĐT-GDPT ngày 12/5/2025', 'Dùng AI để nâng hiệu quả, chất lượng dạy và học.', 'Toàn bộ sách'],
  ['C4', 'G3', 'Hướng dẫn nhiệm vụ ứng dụng CNTT, chuyển đổi số năm học 2025-2026', 'Công văn 5835/BGDĐT-KHCNTT ngày 29/9/2025', 'Bồi dưỡng giáo viên về ứng dụng AI, STEM/STEAM.', '{{B7:s}}, {{C2:s}}, {{PART:E}}'],
  ['Q1', 'G3', 'Khung nội dung thí điểm giáo dục AI cho học sinh phổ thông', 'Quyết định 3439/QĐ-BGDĐT ngày 15/12/2025', 'Bốn mạch: tư duy lấy con người làm trung tâm, đạo đức AI, kỹ thuật và ứng dụng AI, thiết kế hệ thống AI.', '{{F1:s}}'],
  ['U1', 'G3', 'Khung năng lực AI cho giáo viên (UNESCO)', 'UNESCO, 2024', '5 lĩnh vực, 3 cấp độ năng lực AI của giáo viên.', '{{F1:s}}'],
  ['T2', 'G4', 'Chương trình giáo dục phổ thông', 'Thông tư 32/2018/TT-BGDĐT (chương trình đang áp dụng)', 'Nội dung, yêu cầu cần đạt khi soạn bài và ra đề.', '{{PART:B}}, {{PART:C}}'],
  ['T3', 'G4', 'Chương trình giáo dục mầm non', 'Văn bản hợp nhất 01/VBHN-BGDĐT ngày 13/4/2021', 'Câu lệnh cho Mầm non theo hoạt động chơi, trải nghiệm.', 'Dòng Mầm non trong mọi bảng Đổi cho lớp'],
  ['C3', 'G4', 'Hướng dẫn kiểm tra, đánh giá cấp THCS, THPT', 'Công văn 7991/BGDĐT-GDTrH ngày 17/12/2024', 'Đề định kỳ đi kèm ma trận, bản đặc tả, hướng dẫn chấm.', '{{C5:s}}, {{C6:s}}'],
  ['T5', 'G4', 'Đánh giá học sinh THCS, THPT', 'Thông tư 22/2021/TT-BGDĐT', 'Đánh giá thường xuyên, định kỳ.', '{{C3:s}} đến {{C7:s}}'],
  ['T4', 'G4', 'Đánh giá học sinh tiểu học', 'Thông tư 27/2020/TT-BGDĐT', 'Đánh giá vì sự tiến bộ, kết hợp nhận xét và điểm số.', '{{C4:s}}, {{C7:s}}'],
  ['L3', 'G4', 'Luật Sở hữu trí tuệ (sửa đổi 2022)', 'Điều 25: sử dụng tác phẩm không phải xin phép, không phải trả tiền', 'Dùng SGK, tài liệu để minh họa giảng dạy hợp lý, ghi tên tác giả và nguồn.', '{{C4:s}}, {{C5:s}}, {{E4:s}}, {{E5:s}}'],
];

const PER_LESSON = {
  A1: ['L1', 'N2'],
  B7: ['C4', 'T2'],
  C1: ['T2', 'T3'],
  C2: ['C4', 'T2'],
  C3: ['T5', 'T2'],
  C4: ['T4', 'L3'],
  C5: ['C3', 'T5', 'L3'],
  C6: ['C3', 'T5'],
  C7: ['T4', 'T5'],
  D1: ['L1'],
  D5: ['L1', 'T3'],
  D7: ['L1'],
  D8: ['L1'],
  E1: ['C4'],
  E4: ['T1', 'L2', 'L3'],
  E5: ['T1', 'L2', 'L3'],
  E6: ['L2'],
  F1: ['U1', 'Q1', 'L1'],
  F2: ['L2', 'L3'],
};
module.exports = { GROUPS, DOCS, PER_LESSON };
