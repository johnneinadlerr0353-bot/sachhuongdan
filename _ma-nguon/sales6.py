# -*- coding: utf-8 -*-
# 6 ảnh bán hàng theo trình tự người mua tự hỏi:
# 1 Cái gì? 2 Có đúng quy định không? 3 Mình có làm được không? 4 Có hợp lớp mình không?
# 5 Mua về nhận được gì? 6 Mua có an toàn không?
import os, json, subprocess
import pymupdf as fitz
B = os.path.dirname(os.path.abspath(__file__))
os.chdir(B)
G, M, W, MT = "#2E3A67", "#CFE8E0", "#FFFFFF", "#EAF5F1"
WW, HH = 1080, 1350
SANS = "'Be Vietnam Pro',sans-serif"
HAND = "'Patrick Hand',cursive"
PRICE, SHOP, EMAIL, AUTHOR = "220.000đ", "thebuilder.work", "[EMAIL CỦA BẠN]", "[Tên tác giả]"
P = json.load(open('pages.json'))
META = json.loads(subprocess.run(['node', '-e', "console.log(JSON.stringify(require('./meta.js')))"], capture_output=True, text=True, check=True).stdout)
LV = json.load(open('sales_assets/info.json'))['levels_page']
N = {k: len(fitz.open(f)) for k, f in [('book', 'book.pdf'), ('guide', 'guide.pdf'), ('lib', 'lib.pdf'), ('deck', 'deck.pdf')]}
def bai(code): return f"Bài {META['ORDER'].index(code) + 1}"
lv_code = max((c for c in META['ORDER'] if P[c] <= LV), key=lambda c: P[c])
IMGS = ["book-cover", "guide-cover", "lib-cover", "cheatsheet", "slide-1", "crop-a2", "crop-levels", "crop-basis", "illus-chat"]
shadow = "box-shadow:0 14px 34px rgba(46,58,103,.20),0 2px 6px rgba(46,58,103,.12)"

def build(src):
    def img(name, style): return f'<img src="{src[name]}" alt="" style="display:block;{style}">'
    base = f"width:{WW}px;height:{HH}px;box-sizing:border-box;background:{W};color:{G};font-family:{SANS};position:relative;overflow:hidden"
    hl = lambda t: f'<span style="background:{M};padding:0 10px;border-radius:10px">{t}</span>'
    def ask(n, q):  # câu người mua đang tự hỏi
        return f'<div style="position:absolute;left:72px;top:60px;right:72px;display:flex;justify-content:space-between;align-items:center"><div style="font-family:{HAND};font-size:34px">Thầy cô đang hỏi: “{q}”</div><div style="font-size:17px;font-weight:700">{n}/6</div></div>'
    def h1(t, top=120, size=56): return f'<h1 style="position:absolute;left:72px;right:72px;top:{top}px;margin:0;font-size:{size}px;line-height:1.12;font-weight:800">{t}</h1>'
    def cite(text, style): return f'<div style="position:absolute;background:{G};color:{W};font-size:17px;font-weight:700;padding:8px 16px;border-radius:8px;{style}">{text}</div>'
    def cta(): return f'<div style="position:absolute;left:0;right:0;bottom:0;height:100px;background:{G};color:{W};display:flex;align-items:center;justify-content:space-between;padding:0 72px"><div style="font-size:24px;font-weight:800">Trọn bộ {PRICE}</div><div style="font-size:21px">Bấm link trong bài đăng · mua trên <b>{SHOP}</b> →</div></div>'

    # 1. CÁI GÌ: nhìn là biết dạy AI, có căn cứ, giá, bấm mua
    s1 = f"""<div style="{base}">
<div style="position:absolute;left:72px;top:64px;background:{M};font-size:18px;font-weight:800;padding:9px 18px;border-radius:999px">SỔ TAY AI CHO GIÁO VIÊN MẦM NON · TIỂU HỌC · THCS</div>
<h1 style="position:absolute;left:72px;top:124px;margin:0;font-size:104px;line-height:1;font-weight:800">Dạy cùng AI</h1>
<div style="position:absolute;left:76px;top:246px;width:930px;font-size:38px;line-height:1.28;font-weight:700">Soạn bài, ra đề, làm học liệu bằng AI.<br/>{hl('Chưa biết gì cũng làm được.')}</div>
<div style="position:absolute;left:70px;top:420px;width:330px;transform:rotate(-3deg);{shadow}">{img('book-cover','width:330px')}</div>
<div style="position:absolute;left:430px;top:450px;width:580px;border:2px solid {G};background:{W};{shadow}">{img('illus-chat','width:580px')}</div>
{cite('Hình trong sách · ' + bai('A2') + ', trang ' + str(P['A2']), 'left:430px;top:410px')}
<div style="position:absolute;left:470px;top:800px;font-family:{HAND};font-size:30px;line-height:1.15">sách chỉ từng chỗ bấm,<br/>từng câu gõ vào AI</div>
<div style="position:absolute;left:72px;right:72px;top:930px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px">
<div style="background:{G};color:{W};border-radius:16px;padding:22px 20px"><div style="font-size:25px;font-weight:800;line-height:1.25">Soạn theo văn bản 2025-2026</div><div style="font-size:18px;margin-top:8px;color:{M}">Luật Trí tuệ nhân tạo, Thông tư 02/2025...</div></div>
<div style="background:{MT};border-radius:16px;padding:22px 20px"><div style="font-size:25px;font-weight:800;line-height:1.25">36 bài cầm tay chỉ việc</div><div style="font-size:18px;margin-top:8px">Mỗi bài một việc, làm theo là xong</div></div>
<div style="background:{MT};border-radius:16px;padding:22px 20px"><div style="font-size:25px;font-weight:800;line-height:1.25">Đổi sẵn cho 3 cấp học</div><div style="font-size:18px;margin-top:8px">Mầm non, Tiểu học, THCS</div></div>
</div>
<div style="position:absolute;left:72px;right:72px;top:1140px;font-size:19px;line-height:1.45">Sản phẩm cá nhân của tác giả {AUTHOR}. Vuốt sang để xem trang thật bên trong →</div>
{cta()}</div>"""

    # 2. CÓ ĐÚNG QUY ĐỊNH KHÔNG
    row = lambda a, b: f'<div style="padding:10px 0;border-top:2px solid {MT}"><div style="font-size:19px;font-weight:800">{a}</div><div style="font-size:18px;line-height:1.35">{b}</div></div>'
    s2 = f"""<div style="{base}">{ask(2, 'Tài liệu này có đúng quy định không?')}
{h1('Có. Soạn theo ' + hl('văn bản 2025-2026') + ', hướng tới năm 2030.', 118, 52)}
{cite('Trích nguyên văn · Sách, trang ' + str(P['BASIS']) + ': Sách dựa trên văn bản nào', 'left:72px;top:300px')}
<div style="position:absolute;left:72px;top:350px;width:560px;height:640px;overflow:hidden;border:2px solid {G};{shadow}">{img('crop-basis','width:560px')}</div>
<div style="position:absolute;left:660px;top:350px;width:348px">
<div style="font-size:22px;font-weight:800;margin-bottom:6px">17 văn bản, ví dụ:</div>
{row('Luật 134/2025/QH15', 'Luật Trí tuệ nhân tạo, hiệu lực 01/3/2026')}
{row('Luật 91/2025/QH15', 'Luật Bảo vệ dữ liệu cá nhân')}
{row('QĐ 1671/QĐ-TTg', 'Chiến lược quốc gia về AI đến 2030')}
{row('NQ 71-NQ/TW', 'Đột phá phát triển giáo dục')}
{row('TT 02/2025/TT-BGDĐT', 'Khung năng lực số cho người học')}
{row('CV 2250, CV 5835 (2025)', 'Hướng dẫn dùng AI, bồi dưỡng giáo viên')}
<div style="border-top:2px solid {MT}"></div>
</div>
<div style="position:absolute;left:72px;right:72px;top:1030px;background:{MT};border-radius:16px;padding:20px 24px;font-size:21px;line-height:1.45">Đầu mỗi bài có dòng <b>Căn cứ</b> ghi văn bản liên quan. Sách là tài liệu tham khảo của tác giả, không thay thế văn bản gốc.</div>
{cta()}</div>"""

    # 3. MÌNH CÓ LÀM ĐƯỢC KHÔNG
    num = lambda n, style: f'<div style="position:absolute;width:46px;height:46px;border-radius:50%;background:{G};color:{W};font-size:24px;font-weight:800;display:flex;align-items:center;justify-content:center;{style}">{n}</div>'
    card = lambda t, d: f'<div style="background:{MT};border-radius:16px;padding:20px"><div style="font-size:24px;font-weight:800">{t}</div><div style="font-size:19px;line-height:1.45;margin-top:6px">{d}</div></div>'
    s3 = f"""<div style="{base}">{ask(3, 'Mình chưa dùng AI bao giờ, có làm được không?')}
{h1('Được. Sách chỉ ' + hl('bấm vào đâu, gõ câu gì') + ', từng bước một.', 118, 50)}
{cite('Trích nguyên văn · Sách, ' + bai('A2') + ', trang ' + str(P['A2']), 'left:72px;top:290px')}
<div style="position:absolute;left:72px;right:72px;top:338px;border:2px solid {G};{shadow}">{img('crop-a2','width:932px')}</div>
{num(1, 'left:40px;top:440px')}{num(2, 'left:40px;top:610px')}{num(3, 'left:40px;top:770px')}
<div style="position:absolute;left:72px;right:72px;top:890px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px">
{card('① Biết trước', 'Bài này giúp gì, mất bao lâu, cần chuẩn bị gì.')}
{card('② Có người đi cùng', 'Lời tác giả viết như đang ngồi cạnh thầy cô.')}
{card('③ Từng bước', 'Bước 1, Bước 2... bấm nút nào, gõ chữ gì.')}
</div>
<div style="position:absolute;left:72px;right:72px;top:1122px;font-size:20px;line-height:1.5">Mỗi bài bắt đầu ở trang mới. Chỗ nào nhắc bài khác đều ghi <b>“Bài mấy (trang mấy)”</b>.</div>
{cta()}</div>"""

    # 4. CÓ HỢP LỚP MÌNH KHÔNG
    stat = lambda n, t, dark=False: f'<div style="background:{G if dark else MT};color:{W if dark else G};border-radius:16px;padding:22px;text-align:center"><div style="font-size:52px;font-weight:800">{n}</div><div style="font-size:20px">{t}</div></div>'
    s4 = f"""<div style="{base}">{ask(4, 'Có dùng được cho lớp của mình không?')}
{h1('Có. Mỗi câu lệnh ' + hl('đã đổi sẵn') + ' cho Mầm non, Tiểu học, THCS.', 118, 50)}
<div style="position:absolute;left:76px;top:300px;width:900px;font-size:23px;line-height:1.45">Không phải tự nghĩ lại từ đầu. Chọn đúng dòng cấp học của mình, sao chép, dán vào AI.</div>
{cite('Trích nguyên văn · Sách, ' + bai(lv_code) + ', trang ' + str(LV), 'left:72px;top:410px')}
<div style="position:absolute;left:72px;right:72px;top:460px;border:2px solid {G};{shadow}">{img('crop-levels','width:932px')}</div>
<div style="position:absolute;left:72px;right:72px;top:930px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px">
{stat('36', 'bài học', True)}{stat('51', 'câu lệnh mẫu sao chép được')}{stat('36', 'phiên bản đổi sẵn cho 3 cấp học')}
</div>
{cta()}</div>"""

    # 5. MUA VỀ NHẬN ĐƯỢC GÌ
    rows = [('00', 'guide-cover', 'Hướng dẫn đọc đầu tiên', f"{N['guide']} trang · mở đầu tiên, có lộ trình 7 ngày"),
            ('01', 'book-cover', 'Sách Dạy cùng AI', f"{N['book']} trang · 36 bài và 4 phụ lục"),
            ('02', 'cheatsheet', 'Thẻ tra nhanh', "1 trang · in ra, dán cạnh máy tính"),
            ('03', 'lib-cover', 'Thư viện câu lệnh', f"{N['lib']} trang · chỉ câu lệnh, ghi bài và trang"),
            ('04', 'slide-1', 'Slide tập huấn', f"{N['deck']} slide · dùng khi chia sẻ cho đồng nghiệp")]
    rr = ''.join(f'''<div style="display:flex;align-items:center;gap:24px;padding:14px 0;border-top:2px solid {MT}">
<div style="width:70px;height:70px;border-radius:50%;background:{G};color:{W};font-size:26px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none">{n}</div>
<div style="width:104px;height:{'59' if im=='slide-1' else '140'}px;overflow:hidden;flex:none;{shadow}">{img(im,'width:104px')}</div>
<div><div style="font-size:29px;font-weight:800">{t}</div><div style="font-size:20px;line-height:1.4;margin-top:4px">{d}</div></div></div>''' for n, im, t, d in rows)
    s5 = f"""<div style="{base}">{ask(5, 'Mua về nhận được những gì, đọc cái nào trước?')}
{h1('5 tệp có số. ' + hl('Mở từ 00 đến 04') + ' là đúng thứ tự.', 118, 52)}
<div style="position:absolute;left:72px;right:72px;top:290px">{rr}</div>
<div style="position:absolute;left:72px;right:72px;top:1130px;font-size:20px;line-height:1.5">Có bản PDF để đọc, bản Word và PowerPoint để chỉnh sửa. Tất cả gói trong một tệp nén.</div>
{cta()}</div>"""

    # 6. MUA CÓ AN TOÀN KHÔNG
    never = lambda t: f'<div style="display:flex;gap:14px;align-items:flex-start;padding:10px 0"><div style="width:34px;height:34px;border-radius:50%;background:{M};color:{G};font-size:22px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none">✕</div><div style="font-size:22px;line-height:1.4;padding-top:2px">{t}</div></div>'
    s6 = f"""<div style="{base}">{ask(6, 'Mua online sợ bị lừa lắm, có an toàn không?')}
{h1('Chỉ mua qua ' + hl('một đường link duy nhất') + ' trên thebuilder.work.', 118, 50)}
<div style="position:absolute;left:72px;right:72px;top:300px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px">
<div style="background:{MT};border-radius:16px;padding:22px"><div style="font-size:17px;font-weight:800">AI BÁN</div><div style="font-size:24px;font-weight:800;line-height:1.3;margin-top:6px">Tác giả {AUTHOR}</div><div style="font-size:18px;line-height:1.45;margin-top:6px">Sản phẩm cá nhân, không phải tài liệu của cơ quan nhà nước. Liên hệ: {EMAIL}</div></div>
<div style="background:{MT};border-radius:16px;padding:22px"><div style="font-size:17px;font-weight:800">BÁN Ở ĐÂU, TRẢ TIỀN THẾ NÀO</div><div style="font-size:24px;font-weight:800;line-height:1.3;margin-top:6px">The Builder · {SHOP}</div><div style="font-size:18px;line-height:1.45;margin-top:6px">Quét mã VietQR ngay trên trang. VietQR là chuẩn mã QR thanh toán của NAPAS và các ngân hàng.</div></div>
</div>
<div style="position:absolute;left:72px;right:72px;top:600px">
<div style="font-size:26px;font-weight:800;margin-bottom:4px">Tác giả không bao giờ:</div>
{never('Nhắn tin riêng xin chuyển khoản vào tài khoản cá nhân.')}
{never('Gửi đường link mua nào khác ngoài <b>thebuilder.work</b>.')}
{never('Hỏi mã OTP hay mật khẩu ngân hàng của thầy cô.')}
</div>
<div style="position:absolute;left:72px;right:72px;top:930px;background:{G};color:{W};border-radius:16px;padding:22px 26px">
<div style="font-size:18px;font-weight:800;color:{M}">TRƯỚC KHI QUÉT MÃ, THẦY CÔ NHÌN THANH ĐỊA CHỈ</div>
<div style="font-size:22px;line-height:1.45;margin-top:6px">Phải đúng <b>thebuilder.work</b>. Bộ Công an khuyến cáo chỉ giao dịch trên trang chính thức và tuyệt đối không đưa mã OTP cho người khác.</div></div>
<div style="position:absolute;left:72px;right:72px;top:1125px;font-size:19px;line-height:1.45">Nội dung đã xem ở ảnh 2, 3, 4 là trang chụp nguyên văn từ tài liệu thầy cô sẽ nhận.</div>
{cta()}</div>"""
    return [s1, s2, s3, s4, s5, s6]

GF = "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700;800&amp;family=Patrick+Hand&amp;display=swap"
FACES = """@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-400.ttf);font-weight:400}
@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-500.ttf);font-weight:500}
@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-700.ttf);font-weight:700}
@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-800.ttf);font-weight:800}
@font-face{font-family:'Patrick Hand';src:url(file:///root/.fonts/PatrickHand.ttf)}"""
NAMES = ["Main", "Ban-02-Dung-quy-dinh", "Ban-03-Lam-duoc-khong", "Ban-04-Hop-lop-minh", "Ban-05-Nhan-duoc-gi", "Ban-06-An-toan"]
TITLES = ["Ảnh 1 · Cái gì", "Ảnh 2 · Có đúng quy định không", "Ảnh 3 · Mình có làm được không", "Ảnh 4 · Có hợp lớp mình không", "Ảnh 5 · Nhận được gì", "Ảnh 6 · Có an toàn không"]
os.makedirs('sales_html', exist_ok=True); os.makedirs('canvas/project', exist_ok=True)
local = {n: f"file://{B}/sales_assets/{n}.png" for n in IMGS}
for i, body in enumerate(build(local)):
    open(f'sales_html/Anh-ban-{i+1:02d}.html', 'w').write(f"<!doctype html><html lang='vi'><head><meta charset='utf-8'><style>{FACES}\nbody{{margin:0}}</style></head><body>{body}</body></html>")
json.dump([[f'Anh-ban-{i+1:02d}', WW, HH] for i in range(6)], open('sales_html/list.json', 'w'))
blobs = json.load(open('sales_assets/blobs.json')) if os.path.exists('sales_assets/blobs.json') else {}
if all(k in blobs for k in IMGS):
    for i, body in enumerate(build(blobs)):
        open(f'canvas/project/{NAMES[i]}.dc.html', 'w').write(f"""<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<title>{TITLES[i]}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="{GF}">
<style>
body{{margin:0;font-family:{SANS};color:{G}}}
a{{color:{G}}}a:hover{{color:{G}}}
</style>
</helmet>
{body}
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{WW},"height":{HH}}}}}'>
class Component extends DCLogic {{
renderVals() {{ return {{}}; }}
}}
</script>
</body>
</html>
""")
    print('dc written')
print('ok', N)
