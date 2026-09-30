# -*- coding: utf-8 -*-
# Sinh các hình minh họa (HTML) dùng chung cho sách, slide và ảnh bán hàng.
import os, json
OUT = os.path.join(os.path.dirname(__file__), "illus_html")
os.makedirs(OUT, exist_ok=True)

G = "#2E3A67"   # xanh chàm dịu
Y = "#CFE8E0"   # xanh bạc hà nhạt
W = "#FFFFFF"   # trắng giấy
GT = "rgba(46,58,103,.08)"   # sắc nhạt của xanh
GT2 = "rgba(46,58,103,.16)"
YT = "rgba(207,232,224,.55)"  # sắc nhạt của vàng

CSS = f"""
@font-face{{font-family:BVP;src:url(file:///root/.fonts/BeVietnamPro-400.ttf);font-weight:400}}
@font-face{{font-family:BVP;src:url(file:///root/.fonts/BeVietnamPro-500.ttf);font-weight:500}}
@font-face{{font-family:BVP;src:url(file:///root/.fonts/BeVietnamPro-700.ttf);font-weight:700}}
@font-face{{font-family:BVP;src:url(file:///root/.fonts/BeVietnamPro-800.ttf);font-weight:800}}
*{{box-sizing:border-box}}
body{{margin:0;font-family:BVP,sans-serif;color:{G};background:{W}}}
.frame{{width:1600px;height:900px;padding:64px 72px;display:flex;flex-direction:column;gap:28px;background:{W};position:relative;overflow:hidden}}
.kicker{{font-size:24px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:{G}}}
h1{{margin:0;font-size:58px;line-height:1.12;font-weight:800}}
.hl{{background:linear-gradient(transparent 58%,{Y} 58%);padding:0 6px}}
.row{{display:flex;gap:28px}}
.card{{background:{GT};border-radius:28px;padding:32px;flex:1;display:flex;flex-direction:column;gap:14px}}
.card.dark{{background:{G};color:{W}}}
.card.yel{{background:{Y};color:{G}}}
.num{{width:64px;height:64px;border-radius:50%;background:{Y};color:{G};display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;flex:none}}
.dark .num{{background:{Y}}}
.t{{font-size:36px;font-weight:800;line-height:1.2}}
.d{{font-size:27px;line-height:1.4;font-weight:500}}
.pill{{display:inline-block;padding:8px 20px;border-radius:999px;background:{Y};color:{G};font-weight:700;font-size:22px}}
.arrow{{font-size:56px;font-weight:800;color:{G};align-self:center}}
.foot{{margin-top:auto;font-size:24px;font-weight:600;opacity:.85}}
.mono{{font-family:BVP;font-weight:500}}
"""

def page(name, body, w=1600, h=900, extra=""):
    html = f"<!doctype html><html lang='vi'><head><meta charset='utf-8'><style>{CSS}{extra}</style></head><body>{body}</body></html>"
    with open(os.path.join(OUT, name + ".html"), "w", encoding="utf-8") as f:
        f.write(html)
    return (name, w, h)

items = []

# 1. AI là trợ lý: vòng làm việc
items.append(page("h01-vong-lam-viec", f"""
<div class="frame">
 <div class="kicker">Hiểu đúng trước khi dùng</div>
 <h1>AI là <span class="hl">trợ lý</span>. Thầy cô vẫn là <span class="hl">người quyết định</span>.</h1>
 <div class="row" style="margin-top:24px;align-items:stretch;flex:1">
  <div class="card"><div class="num">1</div><div class="t">Hỏi</div><div class="d">Thầy cô gõ câu lệnh (prompt): nói rõ mình cần gì.</div></div>
  <div class="card"><div class="num">2</div><div class="t">Đọc</div><div class="d">AI trả lời trong vài giây. Đọc hết một lượt.</div></div>
  <div class="card"><div class="num">3</div><div class="t">Sửa</div><div class="d">Chưa ưng? Gõ tiếp yêu cầu để AI sửa lại.</div></div>
  <div class="card dark"><div class="num">4</div><div class="t">Kiểm</div><div class="d">Đối chiếu SGK, chương trình. Chỉ dùng khi đã đúng.</div></div>
 </div>
 <div class="foot">Quy tắc nhớ nhanh: HỎI · ĐỌC · SỬA · KIỂM</div>
</div>"""))

# 2. Khung chat chung (không mô phỏng thương hiệu nào)
items.append(page("h02-khung-chat", f"""
<div class="frame" style="flex-direction:row;gap:48px;align-items:center">
 <div style="width:560px;display:flex;flex-direction:column;gap:22px">
  <div class="kicker">Màn hình trò chuyện với AI</div>
  <h1 style="font-size:50px">6 chỗ cần biết trên <span class="hl">mọi</span> công cụ AI</h1>
  <div class="d" style="display:flex;flex-direction:column;gap:12px">
   <div><b>1</b> Trò chuyện mới: mỗi việc mới, mở một cuộc mới.</div>
   <div><b>2</b> Câu trả lời của AI hiện ở đây.</div>
   <div><b>3</b> Nút sao chép: chép câu trả lời sang Word.</div>
   <div><b>4</b> Dấu <b>+</b> hoặc kẹp giấy: đính kèm tệp, ảnh.</div>
   <div><b>5</b> Ô nhập: gõ hoặc dán câu lệnh vào đây.</div>
   <div><b>6</b> Nút gửi: bấm để gửi (máy thật thường vẽ hình mũi tên).</div>
  </div>
 </div>
 <div style="flex:1;height:760px;border:4px solid {G};border-radius:32px;display:flex;overflow:hidden;position:relative">
  <div style="width:200px;background:{GT};padding:24px;display:flex;flex-direction:column;gap:16px">
   <div style="background:{G};color:{W};border-radius:14px;padding:12px 14px;font-weight:700;font-size:20px;position:relative">+ Trò chuyện mới<span class="num" style="position:absolute;right:-26px;top:-24px;width:48px;height:48px;font-size:24px">1</span></div>
   <div style="height:14px;background:{GT2};border-radius:7px"></div><div style="height:14px;width:70%;background:{GT2};border-radius:7px"></div><div style="height:14px;width:85%;background:{GT2};border-radius:7px"></div>
  </div>
  <div style="flex:1;padding:32px;display:flex;flex-direction:column;gap:20px">
   <div style="align-self:flex-end;background:{YT};border-radius:22px;padding:16px 22px;font-size:21px;max-width:420px">Cho tôi gợi ý bài giảng về chủ đề quá trình quang hợp.</div>
   <div style="position:relative;border-radius:22px;padding:22px;background:{GT};font-size:20px;line-height:1.5">
    <b>Gợi ý bài giảng: Quá trình quang hợp</b><br>1. Khởi động: Vì sao cây cần ánh sáng?<br>2. Hình thành kiến thức: nguyên liệu và sản phẩm...<br>3. Luyện tập...
    <span class="num" style="position:absolute;left:-22px;top:-22px;width:48px;height:48px;font-size:24px">2</span>
    <div style="margin-top:12px;display:flex;gap:10px;align-items:center"><span style="border:2px solid {G};border-radius:10px;padding:4px 12px;font-size:17px;font-weight:700">Sao chép</span><span class="num" style="width:44px;height:44px;font-size:22px">3</span></div>
   </div>
   <div style="margin-top:auto;border:3px solid {G};border-radius:26px;padding:18px 18px;display:flex;align-items:center;gap:14px;position:relative">
    <div style="width:44px;height:44px;border-radius:50%;border:3px solid {G};display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800">+</div>
    <div style="flex:1;font-size:21px;opacity:.6">Nhập câu lệnh của thầy cô...</div>
    <div style="width:52px;height:52px;border-radius:50%;background:{G};color:{Y};display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:800">Gửi</div>
    <span class="num" style="position:absolute;left:-10px;top:-40px;width:48px;height:48px;font-size:24px">4</span>
    <span class="num" style="position:absolute;left:300px;top:-40px;width:48px;height:48px;font-size:24px">5</span>
    <span class="num" style="position:absolute;right:-10px;top:-40px;width:48px;height:48px;font-size:24px">6</span>
   </div>
  </div>
 </div>
</div>"""))

# 3. Công thức prompt tốt
items.append(page("h03-cong-thuc-prompt", f"""
<div class="frame">
 <div class="kicker">Thành tố của prompt tốt</div>
 <h1>Một câu lệnh tốt có <span class="hl">6 mảnh ghép</span></h1>
 <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;flex:1">
  <div class="card dark"><div class="pill" style="align-self:flex-start">1 · Vai trò</div><div class="d">Đóng vai trò như một gia sư giỏi...</div></div>
  <div class="card"><div class="pill" style="align-self:flex-start">2 · Nhiệm vụ</div><div class="d">Tôi muốn bạn giải thích quá trình quang hợp</div></div>
  <div class="card"><div class="pill" style="align-self:flex-start">3 · Đối tượng</div><div class="d">cho một học sinh 14 tuổi</div></div>
  <div class="card"><div class="pill" style="align-self:flex-start">4 · Mục đích</div><div class="d">để hỗ trợ chuẩn bị cho kỳ thi sinh học</div></div>
  <div class="card"><div class="pill" style="align-self:flex-start">5 · Độ dài, định dạng</div><div class="d">Câu trả lời của bạn nên có 300 từ</div></div>
  <div class="card"><div class="pill" style="align-self:flex-start">6 · Giọng điệu</div><div class="d">được viết bằng giọng điệu thân thiện và giáo dục</div></div>
 </div>
 <div class="foot">Thiếu mảnh nào, AI phải tự đoán mảnh đó. Đoán sai thì thầy cô mất công sửa.</div>
</div>"""))

# 4. Bốn kỹ thuật prompt
items.append(page("h04-ky-thuat-prompt", f"""
<div class="frame">
 <div class="kicker">Buổi 1 · Kỹ thuật viết câu lệnh</div>
 <h1>4 cách hỏi AI, từ <span class="hl">dễ</span> đến <span class="hl">đủ</span></h1>
 <div class="row" style="flex:1">
  <div class="card"><div class="num">1</div><div class="t">Zero-shot</div><div class="d">Hỏi thẳng, không ví dụ.</div><div class="d" style="margin-top:auto;font-style:italic">"Cho tôi gợi ý bài giảng về chủ đề quá trình quang hợp."</div></div>
  <div class="card"><div class="num">2</div><div class="t">Nhập vai</div><div class="d">Giao cho AI một vai.</div><div class="d" style="margin-top:auto;font-style:italic">"Hãy tưởng tượng bạn là Isaac Newton..."</div></div>
  <div class="card"><div class="num">3</div><div class="t">Đảo ngược</div><div class="d">Để AI hỏi lại mình, hoặc AI viết câu lệnh giúp mình.</div><div class="d" style="margin-top:auto;font-style:italic">"Bạn cần biết gì để giúp tôi..."</div></div>
  <div class="card dark"><div class="num">4</div><div class="t">Kết hợp nhiều yếu tố</div><div class="d">Vai + đối tượng + yêu cầu + cấu trúc trình bày.</div><div class="d" style="margin-top:auto;font-style:italic">"Bạn là một nhà thám hiểm... lớp 6... Trình bày theo cấu trúc..."</div></div>
 </div>
</div>"""))

# 5. Trước / sau
items.append(page("h05-truoc-sau", f"""
<div class="frame">
 <div class="kicker">Đánh giá prompt và cải thiện</div>
 <h1>Cùng một việc. Câu lệnh <span class="hl">rõ hơn</span>, kết quả <span class="hl">dùng được ngay</span>.</h1>
 <div class="row" style="flex:1;align-items:stretch">
  <div class="card" style="flex:1"><div class="pill" style="align-self:flex-start;background:{GT2}">TRƯỚC</div>
   <div class="d" style="font-size:27px">Tìm cho tôi 3 nguyên nhân chính gây ra ô nhiễm không khí ở các thành phố lớn để sử dụng trong bài thuyết trình.</div>
   <div class="d" style="margin-top:auto;opacity:.8">Thiếu: vai trò · độ dài mỗi ý · đối tượng học sinh · cách trình bày</div></div>
  <div class="card dark" style="flex:1.35"><div class="pill" style="align-self:flex-start">SAU</div>
   <div class="d" style="font-size:24px">Hãy <b style="color:{Y}">nhập vai một giáo viên môn Địa lý</b>, nhiệt tình và dễ hiểu. Giúp tôi liệt kê 3 nguyên nhân chính gây ra ô nhiễm không khí ở các thành phố lớn, <b style="color:{Y}">kèm theo mỗi nguyên nhân là một mô tả ngắn từ 2-3 câu</b>. Nội dung sẽ được tôi sử dụng cho bài thuyết trình trong lớp học, vì vậy hãy <b style="color:{Y}">trình bày ngắn gọn, rõ ràng và dễ nhớ</b> cho <b style="color:{Y}">học sinh cấp 3</b>.</div></div>
 </div>
</div>"""))

# 6. TPACK
items.append(page("h06-tpack", f"""
<div class="frame" style="flex-direction:row;align-items:center;gap:40px">
 <div style="width:620px;display:flex;flex-direction:column;gap:22px">
  <div class="kicker">Mô hình TPACK</div>
  <h1>Dạy tốt với công nghệ là <span class="hl">giao nhau</span> của 3 hiểu biết</h1>
  <div class="d" style="font-size:28px"><b>CK</b> · Kiến thức nội dung: dạy cái gì.</div>
  <div class="d"><b>PK</b> · Kiến thức sư phạm: dạy bằng cách nào.</div>
  <div class="d"><b>TK</b> · Kiến thức công nghệ: dùng công cụ gì.</div>
  <div class="d" style="background:{YT};padding:18px 22px;border-radius:18px">Khi viết prompt TPACK, thầy cô điền đủ 3 dòng CK, PK, TK. AI sẽ đề xuất ý tưởng ở chỗ giao nhau.</div>
 </div>
 <div style="flex:1;height:760px;position:relative">
  <div style="position:absolute;left:150px;top:20px;width:420px;height:420px;border-radius:50%;background:rgba(46,58,103,.18);border:4px solid {G}"></div>
  <div style="position:absolute;left:0;top:300px;width:420px;height:420px;border-radius:50%;background:rgba(207,232,224,.30);border:4px solid {G}"></div>
  <div style="position:absolute;left:300px;top:300px;width:420px;height:420px;border-radius:50%;background:rgba(46,58,103,.10);border:4px solid {G}"></div>
  <div style="position:absolute;left:300px;top:110px;font-size:40px;font-weight:800">CK</div>
  <div style="position:absolute;left:90px;top:540px;font-size:40px;font-weight:800">PK</div>
  <div style="position:absolute;left:560px;top:540px;font-size:40px;font-weight:800">TK</div>
  <div style="position:absolute;left:290px;top:390px;background:{G};color:{Y};font-weight:800;font-size:30px;padding:10px 20px;border-radius:999px">TPACK</div>
 </div>
</div>"""))

# 7. Cấu trúc 4 mục
items.append(page("h07-cau-truc-4-muc", f"""
<div class="frame">
 <div class="kicker">Buổi 2 · Câu lệnh nâng cao</div>
 <h1>Câu lệnh dài? Chia thành <span class="hl">4 ngăn</span> có tiêu đề <span class="hl">#</span></h1>
 <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px;flex:1">
  <div class="card dark"><div class="t" style="color:{Y}">#NGỮ CẢNH</div><div class="d">Bạn là ai, dạy môn gì, lớp mấy, bộ sách nào.</div></div>
  <div class="card"><div class="t">#HƯỚNG DẪN</div><div class="d">AI phải làm theo thứ tự nào: đọc gì trước, dựa vào đâu để ra đề.</div></div>
  <div class="card"><div class="t">#DỮ LIỆU</div><div class="d">Tài liệu đính kèm. Mỗi tài liệu một nhãn <b>##</b> riêng, ví dụ ##Nội dung bài học.</div></div>
  <div class="card yel"><div class="t">#YÊU CẦU</div><div class="d">Kết quả cuối: bao nhiêu câu, mức độ nào, trình bày ra sao, điều gì không được làm.</div></div>
 </div>
 <div class="foot">Dấu # là tiêu đề lớn. Dấu ## là tên riêng của một tài liệu để AI biết đang nói tới tệp nào.</div>
</div>"""))

# 8. Mức độ nhận thức
items.append(page("h08-muc-do-nhan-thuc", f"""
<div class="frame">
 <div class="kicker">4 mức độ nhận thức</div>
 <h1>Nói cho AI biết <span class="hl">mỗi mức nghĩa là gì</span></h1>
 <div style="display:flex;align-items:flex-end;gap:20px;flex:1">
  <div class="card" style="height:300px"><div class="t">Nhận biết</div><div class="d">Nhắc lại được kiến thức, kĩ năng đã học.</div></div>
  <div class="card" style="height:400px;background:{GT2}"><div class="t">Thông hiểu</div><div class="d">Trình bày, giải thích được kiến thức theo cách hiểu của cá nhân.</div></div>
  <div class="card yel" style="height:500px"><div class="t">Vận dụng</div><div class="d">Vận dụng kiến thức, kĩ năng đã học để giải quyết vấn đề quen thuộc, tương tự trong học tập, cuộc sống.</div></div>
  <div class="card dark" style="height:600px"><div class="t" style="color:{Y}">Vận dụng cao</div><div class="d">Giải quyết vấn đề mới hoặc đưa ra phản hồi hợp lý trong học tập, cuộc sống một cách linh hoạt.</div></div>
 </div>
</div>"""))

# 9. Rubric
cells = ""
for lv, pt in [("Rất tốt", "4"), ("Tốt", "3"), ("Trung bình", "2"), ("Chưa đạt yêu cầu", "1")]:
    cells += f"<div style='background:{G};color:{W};border-radius:14px;padding:14px;font-size:22px;font-weight:700;text-align:center'>{lv}<br><span style='color:{Y}'>{pt} điểm</span></div>"
rows = ""
for crit in ["Kiến thức môn học", "Kỹ năng lập trình", "Giao diện, tương tác", "Tính sáng tạo", "Mức độ hoàn thiện"]:
    rows += f"<div style='background:{YT};border-radius:14px;padding:14px;font-size:22px;font-weight:700'>{crit}</div>" + "".join(f"<div style='background:{GT};border-radius:14px'></div>" for _ in range(4))
items.append(page("h09-rubric", f"""
<div class="frame">
 <div class="kicker">Xây dựng tiêu chí đánh giá</div>
 <h1>AI kẻ sẵn <span class="hl">bảng tiêu chí 4 mức</span>. Thầy cô chỉ duyệt.</h1>
 <div style="display:grid;grid-template-columns:1.3fr repeat(4,minmax(0,1fr));gap:12px;flex:1;grid-auto-rows:1fr">
  <div style="font-size:22px;font-weight:800;padding:14px">Tiêu chí</div>{cells}{rows}
 </div>
</div>"""))

# 10. Ảnh: công thức + phác thảo
items.append(page("h10-tao-anh", f"""
<div class="frame">
 <div class="kicker">Buổi 3 · Tạo hình ảnh</div>
 <h1>Câu lệnh tạo ảnh = <span class="hl">Nội dung</span> + <span class="hl">Phong cách</span></h1>
 <div class="card dark" style="flex:none"><div class="d" style="font-size:30px">Tạo hình ảnh minh họa cho <span style="background:{Y};color:{G};padding:0 10px;border-radius:8px">câu chuyện Hai Bà Trưng cưỡi voi</span> theo phong cách <span style="background:{W};color:{G};padding:0 10px;border-radius:8px">[Pixar / Anime / Ghibli Studio]</span></div></div>
 <div class="row" style="flex:1">
  <div class="card"><div class="t">Pixar</div><div class="d">Hoạt hình 3D, nhân vật tròn trịa, mắt to, ánh sáng mềm.</div></div>
  <div class="card"><div class="t">Anime</div><div class="d">Nét vẽ Nhật Bản, đường viền rõ, màu phẳng.</div></div>
  <div class="card"><div class="t">Ghibli Studio</div><div class="d">Màu nước dịu, cảnh thiên nhiên chi tiết, cảm giác ấm áp.</div></div>
  <div class="card yel"><div class="t">Phác thảo thành ảnh thật</div><div class="d">Chụp hình vẽ tay, đính kèm, rồi dán câu lệnh "Hãy chuyển phác thảo này thành một ảnh chân thật..."</div></div>
 </div>
</div>"""))

# 11. Bản đồ công cụ đa phương tiện
def tool(t, d, dark=False):
    cls = "card dark" if dark else "card"
    return f"<div class='{cls}'><div class='t'>{t}</div><div class='d'>{d}</div></div>"
items.append(page("h11-ban-do-cong-cu", f"""
<div class="frame">
 <div class="kicker">Tạo sản phẩm đa phương tiện</div>
 <h1>Muốn làm gì, <span class="hl">mở công cụ nào</span>?</h1>
 <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;flex:1">
  {tool("Ảnh minh họa", "ChatGPT, Gemini: gõ câu lệnh tả cảnh và phong cách.")}
  {tool("Trò chơi, mô phỏng", "Canva (Canva Code) hoặc Gemini (Canvas): tả luật chơi, AI viết thành trò chơi.", True)}
  {tool("Truyện tranh", "Google AI Studio, ChatGPT: chia truyện thành cảnh, giữ nhân vật đồng bộ.")}
  {tool("Bài hát", "Suno: dán lời bài hát và phần Style (thể loại, nhịp, nhạc cụ).")}
  {tool("Giọng đọc, hội thoại", "Google AI Studio: chỉ định giọng, cảm xúc, Speaker 1 và Speaker 2.")}
  {tool("Bài đọc", "ChatGPT, Gemini: cấu trúc #NGỮ CẢNH #HƯỚNG DẪN #YÊU CẦU.", True)}
 </div>
 <div class="foot">Tên nút và vị trí menu có thể thay đổi theo từng phiên bản. Hãy tìm theo chức năng, không cần nhớ vị trí.</div>
</div>"""))

# 12. Chatbot
items.append(page("h12-chatbot", f"""
<div class="frame">
 <div class="kicker">Buổi 4 · Trợ lý chatbot AI</div>
 <h1>Tự tạo <span class="hl">trợ giảng ảo</span> trong 4 bước</h1>
 <div class="row" style="flex:1;align-items:stretch">
  <div class="card"><div class="num">1</div><div class="t">Đặt tên</div><div class="d">Ví dụ: "Trợ giảng Vật lý 7".</div></div>
  <div class="card dark"><div class="num">2</div><div class="t">Dán hướng dẫn</div><div class="d">System prompt: vai trò, phạm vi, giọng điệu, điều không được làm.</div></div>
  <div class="card"><div class="num">3</div><div class="t">Đính kèm tài liệu</div><div class="d">SGK, đề cương. AI chỉ trả lời trong phạm vi này.</div></div>
  <div class="card yel"><div class="num" style="background:{G};color:{Y}">4</div><div class="t">Thử rồi chia sẻ</div><div class="d">Tự đóng vai học sinh hỏi thử 5 câu. Ổn mới gửi link.</div></div>
 </div>
 <div class="foot">Câu quan trọng nhất: "Khi học sinh hỏi đáp án trực tiếp các bài tập, không đưa ra ngay đáp án."</div>
</div>"""))

# 13. Deep Research
items.append(page("h13-deep-research", f"""
<div class="frame">
 <div class="kicker">Deep Research · Nghiên cứu sâu</div>
 <h1>Giao AI đọc hàng chục nguồn. <span class="hl">Thầy cô kiểm lại nguồn.</span></h1>
 <div class="row" style="flex:1;align-items:stretch">
  <div class="card"><div class="num">1</div><div class="t">Giao đề bài</div><div class="d">Chủ đề, các mục cần có, nguồn ưu tiên, năm của số liệu.</div></div>
  <div class="card"><div class="num">2</div><div class="t">Duyệt kế hoạch</div><div class="d">AI đưa kế hoạch tìm kiếm. Bấm bắt đầu hoặc sửa.</div></div>
  <div class="card"><div class="num">3</div><div class="t">Chờ báo cáo</div><div class="d">Thường mất vài phút. Kết quả có danh sách nguồn.</div></div>
  <div class="card dark"><div class="num">4</div><div class="t">Kiểm chứng</div><div class="d">Mở từng link. Số liệu phải khớp đúng trang nguồn.</div></div>
 </div>
</div>"""))

# 14. UNESCO
items.append(page("h14-unesco", f"""
<div class="frame">
 <div class="kicker">Khung năng lực AI cho giáo viên của UNESCO</div>
 <h1>5 lĩnh vực năng lực, 3 cấp độ <span class="hl">Tiếp thu · Đào sâu · Sáng tạo</span></h1>
 <div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:18px;flex:1">
  <div class="card dark"><div class="num">1</div><div class="t" style="font-size:28px">Tư duy lấy con người làm trung tâm</div></div>
  <div class="card"><div class="num">2</div><div class="t" style="font-size:28px">Đạo đức AI</div></div>
  <div class="card"><div class="num">3</div><div class="t" style="font-size:28px">Nền tảng và ứng dụng AI</div></div>
  <div class="card"><div class="num">4</div><div class="t" style="font-size:28px">Sư phạm AI</div></div>
  <div class="card yel"><div class="num" style="background:{G};color:{Y}">5</div><div class="t" style="font-size:28px">AI cho phát triển nghề nghiệp</div></div>
 </div>
</div>"""))

# 15. Đèn giao thông an toàn
items.append(page("h15-an-toan", f"""
<div class="frame">
 <div class="kicker">Dùng AI có trách nhiệm</div>
 <h1>Trước khi dán vào AI, <span class="hl">tự hỏi 3 màu đèn</span></h1>
 <div class="row" style="flex:1">
  <div class="card"><div style="width:70px;height:70px;border-radius:50%;background:{G}"></div><div class="t">ĐƯỢC dán</div><div class="d">Nội dung SGK, chương trình, đề cương, ý tưởng bài dạy, văn bản đã công khai.</div></div>
  <div class="card yel"><div style="width:70px;height:70px;border-radius:50%;background:{W};border:6px solid {G}"></div><div class="t">CẨN THẬN</div><div class="d">Bài làm của học sinh: xóa họ tên, lớp, trường trước khi dán. Tài liệu có bản quyền: chỉ dùng trong lớp.</div></div>
  <div class="card dark"><div style="width:70px;height:70px;border-radius:50%;background:{Y}"></div><div class="t">KHÔNG dán</div><div class="d">Họ tên kèm điểm số, số điện thoại, địa chỉ, ảnh chân dung học sinh, hồ sơ sức khỏe, đề thi chưa công bố.</div></div>
 </div>
</div>"""))

# 16. Chọn công cụ theo cấp học
items.append(page("h16-cap-hoc", f"""
<div class="frame">
 <div class="kicker">Bắt đầu từ đâu?</div>
 <h1>Mỗi cấp học, <span class="hl">3 việc làm được ngay</span> tuần này</h1>
 <div class="row" style="flex:1">
  <div class="card"><div class="t">Mầm non</div><div class="d">· Bài hát về con vật (Suno)<br>· Trò chơi kéo thả hình học (Canva)<br>· Truyện tranh 4 cảnh</div></div>
  <div class="card dark"><div class="t" style="color:{Y}">Tiểu học</div><div class="d">· Bài giảng 10 slide kèm Quiz<br>· Giáo án góc trạm 90 phút<br>· Trắc nghiệm Tiếng Anh 5 câu</div></div>
  <div class="card"><div class="t">THCS</div><div class="d">· Đề trắc nghiệm theo ma trận<br>· Bảng tiêu chí chấm sản phẩm<br>· Chatbot ôn tập theo SGK</div></div>
 </div>
</div>"""))

json.dump(items, open(os.path.join(OUT, "list.json"), "w"))
print(len(items), "illustrations")
