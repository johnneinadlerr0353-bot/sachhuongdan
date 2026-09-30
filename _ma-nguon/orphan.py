# Tìm trang chỉ có dòng "Bài tiếp theo", thêm bài đó vào nohint.json
import pymupdf as f, re, json, os, subprocess
M = json.loads(subprocess.run(['node','-e',"console.log(JSON.stringify(require('./meta.js')))"],capture_output=True,text=True).stdout)
nh = json.load(open('nohint.json')) if os.path.exists('nohint.json') else []
added = 0
for p in f.open('book.pdf'):
    lines = [l for l in p.get_text().split('\n') if l.strip() and not re.fullmatch(r'\d+', l.strip())]
    if len(lines) <= 2 and lines and 'Bài tiếp theo' in ' '.join(lines):
        m = re.search(r'Bài tiếp theo: (Bài|Phụ lục) (\d+)', ' '.join(lines))
        allc = M['ORDER'] + M['APPX']
        idx = (int(m.group(2)) - 1) if m.group(1) == 'Bài' else len(M['ORDER']) + int(m.group(2)) - 1
        code = allc[idx - 1]
        if code not in nh: nh.append(code); added += 1
json.dump(nh, open('nohint.json', 'w'))
print('orphan thêm', added, nh)
