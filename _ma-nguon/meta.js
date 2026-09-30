// Đánh số, tên phần, lời dẫn cho từng bài. Giọng tác giả ngồi cạnh thầy cô.
const PARTS = {
  A: { no: 1, title: 'Làm quen với AI', intro: 'Phần này dành cho thầy cô chưa từng mở một công cụ AI nào. Thầy cô cứ đi chậm, đọc từng bài theo thứ tự. Xong 3 bài này, thầy cô đã tự gõ được câu lệnh đầu tiên và hiểu vì sao có câu lệnh AI trả lời hay, có câu lệnh AI trả lời dở.' },
  B: { no: 2, title: 'Viết câu lệnh cho AI hiểu ý mình', intro: 'Ở phần này, tôi chỉ thầy cô 4 cách hỏi AI, từ đơn giản đến đầy đủ. Mỗi bài có câu lệnh mẫu để thầy cô sao chép và chạy thử ngay. Thầy cô không cần nhớ tên kỹ thuật, chỉ cần nhớ cách làm.' },
  C: { no: 3, title: 'Soạn bài và ra đề cùng AI', intro: 'Đây là phần giúp thầy cô tiết kiệm thời gian nhiều nhất: soạn giáo án, ra đề tự luận, đề trắc nghiệm, bảng tiêu chí chấm điểm. Câu lệnh dài hơn các phần trước nhưng tôi sẽ tách từng dòng để thầy cô hiểu dòng nào làm việc gì.' },
  D: { no: 4, title: 'Làm ảnh, trò chơi, bài hát, giọng đọc', intro: 'Những thứ trước đây phải nhờ người biết đồ họa, biết lập trình mới làm được, giờ thầy cô tự làm bằng lời nói thường. Mỗi bài chỉ rõ mở trang web nào, bấm vào đâu.' },
  E: { no: 5, title: 'Tìm tài liệu và tạo trợ giảng ảo', intro: 'Phần này giúp thầy cô giao cho AI đọc hàng chục nguồn tài liệu và tự tạo một "trợ giảng ảo" để học sinh hỏi bài. Tôi luôn nhắc thầy cô bước kiểm tra lại, vì đây là chỗ dễ sai nhất.' },
  F: { no: 6, title: 'Dùng AI an toàn, đúng luật', intro: 'Phần cuối nói về những điều cần giữ để AI giúp mình mà không gây hại cho học sinh. Phần này ngắn nhưng tôi mong thầy cô đọc kỹ.' },
  P: { no: 0, title: 'Phụ lục: tra nhanh và mẫu điền sẵn', intro: 'Mở phần này khi thầy cô cần làm ngay một việc mà không muốn đọc lại cả sách.' },
};

// Thứ tự bài: mã nội bộ -> số bài hiển thị
const ORDER = ['A1','A2','A3','B1','B2','B3','B4','B5','B6','B7','C1','C2','C3','C4','C5','C6','C7','C8','C9','D1','D2','D3','D4','D5','D6','D7','D8','E1','E2','E3','E4','E5','E6','F1','F2','F3'];
const APPX = ['P1','P2','P3','P4'];

// goal: bài này giúp gì · time: thời gian · say: lời tác giả mở đầu
const LESSON = {
  A1: { goal: 'hiểu AI là gì và vì sao mình luôn là người quyết định cuối cùng', time: '5 phút', say: 'Nếu thầy cô đang hơi lo vì nghe nói AI khó, AI thay thế giáo viên, thì tôi mong thầy cô yên tâm. AI chỉ là một người trợ lý viết rất nhanh. Người hiểu học sinh, người chọn cái gì đúng, cái gì dùng được, vẫn là thầy cô.' },
  A2: { goal: 'mở được ChatGPT hoặc Gemini và gõ câu lệnh đầu tiên', time: '15 phút', say: 'Bài này tôi đi cùng thầy cô từng cú bấm. Thầy cô mở sẵn máy tính, làm song song với sách. Nếu có chỗ nào không giống hình, thầy cô đừng lo, xem ô "Nếu bị kẹt" ở cuối bài.' },
  A3: { goal: 'biết 6 thứ cần có trong một câu lệnh để AI trả lời đúng ý', time: '10 phút', say: 'Hỏi AI giống như nhờ một đồng nghiệp mới vào trường. Mình nói càng rõ, họ làm càng đúng. Bài này chỉ thầy cô 6 điều cần nói rõ.' },
  B1: { goal: 'hỏi AI kiểu đơn giản nhất và biết lúc nào nên dùng', time: '5 phút', say: 'Đây là cách hỏi thầy cô vừa làm ở {{A2}}. Giờ mình gọi đúng tên nó và biết điểm yếu của nó.' },
  B2: { goal: 'giao cho AI một vai để câu trả lời sinh động hơn', time: '5 phút', say: 'Học sinh thích nghe chuyện hơn nghe định nghĩa. Kỹ thuật này giúp AI kể chuyện thay vì đọc sách.' },
  B3: { goal: 'nhờ AI hỏi lại mình, hoặc nhờ AI viết câu lệnh giúp mình', time: '10 phút', say: 'Khi thầy cô chưa biết phải viết câu lệnh thế nào cho đủ, cứ để AI hỏi mình trước. Đây là kỹ thuật tôi hay dùng nhất khi bắt đầu một việc mới.' },
  B4: { goal: 'viết một câu lệnh có đủ vai, đối tượng, yêu cầu và khung trình bày', time: '10 phút', say: 'Bài này gộp các bài trước lại. Kết quả là một đoạn dẫn nhập bài học mà thầy cô có thể dán thẳng vào giáo án.' },
  B5: { goal: 'tự chấm một câu lệnh và sửa cho tốt hơn', time: '10 phút', say: 'Thầy cô sẽ thấy tận mắt: chỉ thêm vài cụm từ, câu trả lời của AI khác hẳn.' },
  B6: { goal: 'nhờ AI soạn khung bài giảng 10 slide và tìm học liệu', time: '10 phút', say: 'Đây là việc nhiều thầy cô dùng AI nhiều nhất. Câu lệnh mẫu dưới đây có đủ số liệu cụ thể để AI không trả lời lan man.' },
  B7: { goal: 'dùng mô hình TPACK để AI đề xuất ý tưởng dạy học có công nghệ', time: '10 phút', say: 'Tên mô hình nghe khó nhưng cách dùng rất đơn giản: thầy cô điền 3 dòng, AI làm phần còn lại.' },
  C1: { goal: 'nhờ AI soạn giáo án theo kỹ thuật góc trạm', time: '10 phút', say: 'Giáo án 90 phút thường mất cả buổi tối để soạn. Với câu lệnh này, thầy cô có bản nháp trong vài phút, rồi chỉ việc sửa cho hợp lớp mình.' },
  C2: { goal: 'nhờ AI soạn giáo án STEM theo quy trình thiết kế kỹ thuật', time: '10 phút', say: 'STEM không khó bằng cái tên của nó. Câu lệnh chỉ cần nói rõ chủ đề và quy trình, AI sẽ chia bước giúp thầy cô.' },
  C3: { goal: 'ra 3 đề tự luận ở 3 mức độ khác nhau', time: '10 phút', say: 'Cái hay của câu lệnh này là nó tách từng đề và gắn mỗi đề với một mức độ. Thầy cô sẽ không bị 3 đề cùng một độ khó.' },
  C4: { goal: 'ra đề trắc nghiệm dựa trên tài liệu mình tải lên', time: '15 phút', say: 'Lần đầu tiên thầy cô đính kèm tệp cho AI đọc. Tôi chỉ từng bước bấm, thầy cô làm theo là được.' },
  C5: { goal: 'viết câu lệnh dài bằng cách chia 4 ngăn có tiêu đề #', time: '15 phút', say: 'Câu lệnh dài dễ làm AI rối. Bài này chỉ cách chia câu lệnh thành 4 ngăn, giống như chia hồ sơ vào 4 bìa kẹp.' },
  C6: { goal: 'ra đề theo ma trận và bản đặc tả của nhà trường', time: '20 phút', say: 'Đây là bài khó nhất trong phần này. Thầy cô đọc chậm, làm từng dòng. Làm được bài này, những bài sau sẽ thấy rất nhẹ.' },
  C7: { goal: 'nhờ AI kẻ bảng tiêu chí chấm điểm (rubric)', time: '10 phút', say: 'Bảng tiêu chí giúp chấm nhanh và công bằng. AI kẻ sẵn khung, thầy cô chỉ đọc lại và chỉnh.' },
  C8: { goal: 'ra đề có công thức toán đẹp bằng Overleaf', time: '15 phút', say: 'Bài này dành cho thầy cô dạy Toán, Lý, Hóa. Thầy cô không cần biết mã LaTeX, chỉ cần sao chép và dán.' },
  C9: { goal: 'nhờ AI tìm và so sánh thông tin có nguồn', time: '10 phút', say: 'Khi tìm thông tin, điều quan trọng nhất là nguồn. Bài này chỉ thầy cô cách bắt AI ghi nguồn và cách kiểm tra lại.' },
  D1: { goal: 'tạo ảnh minh họa theo phong cách mình muốn', time: '10 phút', say: 'Đây là bài vui nhất. Thầy cô sẽ thấy cùng một câu chuyện được vẽ theo 3 kiểu hoàn toàn khác nhau.' },
  D2: { goal: 'biến hình vẽ tay thành ảnh đẹp và nhờ AI viết câu lệnh tạo ảnh', time: '10 phút', say: 'Thầy cô không cần vẽ đẹp. Một hình vẽ nguệch ngoạc kèm vài chữ ghi chú là đủ để AI hiểu.' },
  D3: { goal: 'tạo trò chơi học tập bấm được mà không cần lập trình', time: '15 phút', say: 'Thầy cô chỉ cần kể luật chơi bằng lời. Phần viết mã để AI lo.' },
  D4: { goal: 'làm truyện tranh nhiều cảnh với nhân vật giữ nguyên dáng vẻ', time: '15 phút', say: 'Khó nhất của truyện tranh AI là nhân vật mỗi cảnh một kiểu. Bài này có cách xử lý chuyện đó.' },
  D5: { goal: 'sáng tác bài hát cho trẻ', time: '15 phút', say: 'Thầy cô không cần biết nhạc lý. Chỉ cần tả con vật, nhịp điệu, AI sẽ viết lời và hát.' },
  D6: { goal: 'tạo bài đọc mẫu và tập phát hiện câu lệnh bị lỗi', time: '10 phút', say: 'Bài này có một câu lệnh cố ý để lỗi. Tôi muốn thầy cô tập thói quen đọc lại trước khi gửi.' },
  D7: { goal: 'tạo giọng đọc thơ, đọc bài có cảm xúc', time: '10 phút', say: 'Giọng máy đọc đều đều sẽ làm hỏng bài thơ. Bài này chỉ cách tả giọng để máy đọc có hồn.' },
  D8: { goal: 'tạo đoạn hội thoại hai giọng và cho AI đóng vai trò chuyện với học sinh', time: '15 phút', say: 'Học sinh sẽ rất thích nghe hai nhân vật nói chuyện với nhau. Làm theo 4 bước là có tệp âm thanh.' },
  E1: { goal: 'giao cho AI đọc nhiều nguồn và viết báo cáo phục vụ giảng dạy', time: '15 phút', say: 'Deep Research giống như nhờ một người đi thư viện giúp mình. Nhưng người này đôi khi ghi nhầm, nên thầy cô luôn phải kiểm lại.' },
  E2: { goal: 'nhờ AI kiểm tra lại độ chính xác của một đoạn thông tin', time: '10 phút', say: 'Bài ngắn nhưng rất quan trọng. Thầy cô tập thói quen này, sẽ tránh được nhiều lỗi khi đưa số liệu cho học sinh.' },
  E3: { goal: 'dùng Deep Research cho việc riêng và cho nghiên cứu khoa học', time: '10 phút', say: 'AI không chỉ giúp việc lớp. Bài này có 2 ví dụ để thầy cô thấy cách dùng rộng hơn.' },
  E4: { goal: 'tạo trợ giảng ảo trên Gemini để học sinh hỏi bài', time: '20 phút', say: 'Đây là sản phẩm mà nhiều thầy cô tự hào nhất sau khóa học. Thầy cô làm đủ 5 bước, rồi tự đóng vai học sinh để thử.' },
  E5: { goal: 'tạo chatbot trên Poe chỉ trả lời trong phạm vi môn học', time: '15 phút', say: 'Cách làm gần giống {{E4}}. Điểm khác là câu "hàng rào" để chatbot không trả lời chuyện ngoài lề.' },
  E6: { goal: 'dùng các công cụ làm sẵn cho giáo viên trên Magic School', time: '15 phút', say: 'Magic School có sẵn nhiều ô để điền. Thầy cô chỉ cần nhớ một câu: luôn thêm "Trình bày bằng tiếng Việt".' },
  F1: { goal: 'biết Khung năng lực số của giáo viên theo Thông tư 18/2026 và vị trí của mình trong đó', time: '5 phút', say: 'Thầy cô không cần thuộc khung này. Chỉ cần biết mình đang ở đâu và bước tiếp theo là gì.' },
  F2: { goal: 'biết thông tin nào được dán vào AI, thông tin nào tuyệt đối không', time: '5 phút', say: 'Nếu chỉ nhớ một bài trong phần này, tôi mong thầy cô nhớ bài này.' },
  F3: { goal: 'tự kiểm tra sản phẩm của AI trước khi đưa cho học sinh', time: '5 phút', say: 'Thầy cô in trang này ra, mỗi lần dùng sản phẩm AI thì đánh dấu từng ô.' },
  P1: { goal: 'tìm nhanh bài cần đọc theo việc cần làm', time: '', say: '' },
  P2: { goal: 'có sẵn 3 mẫu câu lệnh điền vào là dùng', time: '', say: '' },
  P3: { goal: 'biết gõ thêm câu gì khi AI trả lời chưa ưng', time: '', say: '' },
  P4: { goal: 'tìm các tệp tài liệu thực hành', time: '', say: '' },
};
module.exports = { PARTS, ORDER, APPX, LESSON };
