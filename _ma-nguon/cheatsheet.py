# Thẻ tra nhanh 1 trang. Số bài, số trang lấy từ pages.json của sách.
import json, re, subprocess
M = json.loads(subprocess.run(['node', '-e', "console.log(JSON.stringify(require('./meta.js')))"], capture_output=True, text=True, check=True).stdout)
P = json.load(open('pages.json'))
def ref(code):
    n = M['ORDER'].index(code) + 1
    return f'Sách: Bài {n}, trang {P[code]}'

G, MINT, W, MT = '#2E3A67', '#CFE8E0', '#FFFFFF', '#EAF5F1'
html = f"""<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><title>Thẻ tra nhanh</title>
<style>
@font-face{{font-family:BVP;src:url(file:///root/.fonts/BeVietnamPro-400.ttf);font-weight:400}}
@font-face{{font-family:BVP;src:url(file:///root/.fonts/BeVietnamPro-500.ttf);font-weight:500}}
@font-face{{font-family:BVP;src:url(file:///root/.fonts/BeVietnamPro-700.ttf);font-weight:700}}
@font-face{{font-family:BVP;src:url(file:///root/.fonts/BeVietnamPro-800.ttf);font-weight:800}}
@page{{size:A4;margin:0}}
*{{box-sizing:border-box}}
body{{margin:0;font-family:BVP,sans-serif;color:{G};background:{W}}}
.page{{width:210mm;height:297mm;padding:9mm 11mm 7mm;display:flex;flex-direction:column;gap:2.4mm}}
.top{{display:flex;justify-content:space-between;align-items:flex-end}}
h1{{margin:0;font-size:22pt;font-weight:800;line-height:1}}
.pill{{background:{MINT};font-weight:700;font-size:8.5pt;padding:1.4mm 3mm;border-radius:99px;display:inline-block}}
h2{{margin:0 0 1.6mm;font-size:12pt;font-weight:800}}
.ref{{font-size:8pt;font-weight:700;background:{MINT};padding:.6mm 2mm;border-radius:99px;display:inline-block;margin-bottom:1.6mm}}
.dark .ref{{background:{W};color:{G}}}
.box{{background:{MT};border-radius:3mm;padding:2.6mm 3.2mm}}
.dark{{background:{G};color:{W}}}
.mint{{background:{MINT}}}
.line{{background:{W};border:.4mm solid {G}}}
.g2{{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:3.5mm}}
.g3{{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:3mm}}
.chip{{background:{W};border-radius:2mm;padding:1.8mm 2.6mm;font-size:8.6pt;line-height:1.35}}
.chip b{{display:block;font-size:10pt}}
p,li{{font-size:9pt;line-height:1.36;margin:0}}
ul{{margin:0;padding-left:4.5mm}}
.mono{{background:{W};border-radius:2mm;padding:2.6mm 3mm;font-size:9pt;line-height:1.55}}
table{{width:100%;border-collapse:collapse;font-size:9pt}}
td{{padding:.7mm 2mm;border-bottom:.3mm solid rgba(46,58,103,.2);vertical-align:top}}
td:first-child{{font-weight:700;width:34%}}
.steps{{display:flex;gap:2.5mm}}
.steps div{{flex:1;background:{W};color:{G};border-radius:2mm;padding:2.2mm;font-size:9pt;text-align:center}}
.steps b{{display:block;font-size:13pt}}
.foot{{margin-top:auto;font-size:8pt;display:flex;justify-content:space-between;gap:6mm}}
</style></head><body><div class="page">
<div class="top"><div><span class="pill">TỆP 02 · THẺ TRA NHANH · DẠY CÙNG AI</span><h1 style="margin-top:3mm">Viết câu lệnh cho AI</h1></div><div style="font-size:10pt;font-weight:700;text-align:right">In ra, dán cạnh máy tính.<br>Quên chỗ nào: mở sách đúng trang ghi trong ô.</div></div>

<div class="box dark"><span class="ref">{ref('A1')}</span><h2>Vòng làm việc 4 bước</h2>
<div class="steps"><div><b>1 · Hỏi</b>Gõ câu lệnh rõ ràng</div><div><b>2 · Đọc</b>Đọc hết câu trả lời</div><div><b>3 · Sửa</b>Gõ tiếp yêu cầu sửa</div><div style="background:{MINT}"><b>4 · Kiểm</b>Đối chiếu SGK, nguồn</div></div></div>

<div class="box"><span class="ref">{ref('A3')}</span><h2>6 mảnh ghép của câu lệnh tốt</h2>
<div class="g3">
<div class="chip"><b>1 · Vai trò</b>Bạn là giáo viên Địa lý nhiều năm kinh nghiệm...</div>
<div class="chip"><b>2 · Nhiệm vụ</b>Hãy liệt kê 3 nguyên nhân chính...</div>
<div class="chip"><b>3 · Đối tượng</b>cho học sinh lớp 4, trẻ 5 tuổi...</div>
<div class="chip"><b>4 · Mục đích</b>để dùng cho bài thuyết trình...</div>
<div class="chip"><b>5 · Độ dài, định dạng</b>10 slide, bảng, 2-3 câu mỗi ý...</div>
<div class="chip"><b>6 · Giọng điệu</b>thân thiện, vui tươi, dễ nhớ...</div>
</div></div>

<div class="g2">
<div class="box"><span class="ref">{ref('C5')}</span><h2>Câu lệnh dài: chia 4 ngăn</h2>
<div class="mono"><b>#NGỮ CẢNH</b> bạn là ai, môn, lớp, bộ sách<br><b>#HƯỚNG DẪN</b> đọc gì trước, dựa vào đâu<br><b>#DỮ LIỆU</b> ##Tên tài liệu: tệp đính kèm<br><b>#YÊU CẦU</b> số câu, mức độ, trình bày, điều cấm</div>
<p style="margin-top:2mm">Tên ## phải viết <b>giống hệt</b> ở mọi chỗ.</p></div>
<div class="box"><span class="ref">Sách: Bài 4 (trang {P['B1']}) đến Bài 7 (trang {P['B4']})</span><h2>4 cách hỏi AI</h2><ul>
<li><b>Hỏi thẳng (Zero-shot):</b> không đưa ví dụ.</li>
<li><b>Nhập vai:</b> "Hãy tưởng tượng bạn là..."</li>
<li><b>Đảo ngược:</b> "Bạn cần biết gì để giúp tôi...?"</li>
<li><b>Kết hợp:</b> vai + đối tượng + yêu cầu + khung trình bày.</li>
</ul><p style="margin-top:2mm"><b>Ảnh:</b> Nội dung + Phong cách ({ref('D1')}).</p></div>
</div>

<div class="g2">
<div class="box"><span class="ref">Sách: Phụ lục 3, trang {P['P3']}</span><h2>Chưa ưng thì gõ tiếp</h2><table>
<tr><td>Quá dài</td><td>Rút gọn còn một nửa, giữ ý chính.</td></tr>
<tr><td>Quá khó</td><td>Viết lại cho học sinh lớp [...], câu ngắn.</td></tr>
<tr><td>Chung chung</td><td>Thêm ví dụ thực tế ở Việt Nam cho mỗi ý.</td></tr>
<tr><td>Sai định dạng</td><td>Trình bày lại dạng bảng gồm các cột [...].</td></tr>
<tr><td>Tiếng Anh</td><td>Trình bày bằng tiếng Việt.</td></tr>
<tr><td>Bị cắt ngang</td><td>Viết tiếp.</td></tr>
<tr><td>Nghi sai số liệu</td><td>Cho biết nguồn kèm đường link.</td></tr>
</table></div>
<div class="box"><span class="ref">{ref('E4')}</span><h2>Chatbot cho học sinh: 3 câu phải có</h2><ul>
<li>Chỉ trả lời về <b>[môn, lớp]</b> dựa trên tài liệu đính kèm.</li>
<li>Không trả lời các câu hỏi khác.</li>
<li>Khi học sinh hỏi đáp án bài tập, <b>không đưa ra ngay đáp án</b>: hướng dẫn từng bước, đặt câu hỏi gợi mở.</li>
</ul><p style="margin-top:2mm"><b>Trước khi gửi link:</b> tự đóng vai học sinh hỏi thử 5 câu, có cả câu "xin đáp án".</p></div>
</div>

<div style="font-size:9pt;font-weight:700">Trước khi dán thông tin vào AI · {ref('F2')}</div>
<div class="g3" style="margin-top:-1.5mm">
<div class="box line"><h2>ĐƯỢC dán</h2><p>SGK, chương trình, đề cương, ý tưởng bài dạy, văn bản đã công khai.</p></div>
<div class="box mint"><h2>CẨN THẬN</h2><p>Bài làm học sinh: xóa họ tên, lớp, trường. Tài liệu có bản quyền: chỉ dùng trong lớp.</p></div>
<div class="box dark"><h2>KHÔNG dán</h2><p>Họ tên kèm điểm, số điện thoại, địa chỉ, ảnh học sinh, hồ sơ sức khỏe, đề thi chưa công bố.</p></div>
</div>

<div class="foot"><span>Xuống dòng trong ô nhập: Shift + Enter · Việc mới: bấm Trò chuyện mới</span><span>Căn cứ: Thông tư 18/2026/TT-BGDĐT · Luật Bảo vệ dữ liệu cá nhân 91/2025</span></div>
</div></body></html>
"""
assert 'Bài 4 đến Bài 7' and M['ORDER'].index('B1') == 3 and M['ORDER'].index('B4') == 6
open('cheatsheet.html', 'w').write(html)
print('ok')
