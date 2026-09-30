# Đọc book.pdf, tìm trang bắt đầu của từng bài, phần, trang đầu sách. Ghi pages.json.
import json, re, subprocess, sys
import pymupdf as fitz

meta = subprocess.run(['node', '-e', "const m=require('./meta.js');console.log(JSON.stringify(m))"], capture_output=True, text=True, check=True)
M = json.loads(meta.stdout)
ORDER, APPX, PARTS = M['ORDER'], M['APPX'], M['PARTS']

doc = fitz.open(sys.argv[1] if len(sys.argv) > 1 else 'book.pdf')
lines = [[l.strip() for l in p.get_text().split('\n')] for p in doc]
found = {}

def first(pred, key):
    for i, ls in enumerate(lines):
        if pred(ls):
            found[key] = i + 1
            return
    print('KHÔNG TÌM THẤY', key)

first(lambda ls: 'THƯ GỬI THẦY CÔ' in ls, 'LETTER')
first(lambda ls: 'CÁCH DÙNG SÁCH' in ls, 'HOWTO')
first(lambda ls: 'MỤC LỤC' in ls, 'TOC')
first(lambda ls: 'CĂN CỨ BIÊN SOẠN' in ls, 'BASIS')
for letter, pt in PARTS.items():
    if letter == 'P':
        first(lambda ls, t=pt['title']: 'PHỤ LỤC' in ls and t in ls, 'PART_P')
    else:
        first(lambda ls, n=pt['no'], t=pt['title']: f'PHẦN {n}' in ls and t in ls, 'PART_' + letter)
part_of = {}
for code in ORDER:
    part_of[code] = PARTS[code[0]]['no']
for i, code in enumerate(ORDER):
    first(lambda ls, k=f"PHẦN {part_of[code]} · BÀI {i+1}": k in ls, code)
for i, code in enumerate(APPX):
    first(lambda ls, k=f"PHỤ LỤC {i+1}": k in ls, code)
found['TOTAL'] = len(doc)
old = json.load(open('pages.json')) if __import__('os').path.exists('pages.json') else {}
json.dump(found, open('pages.json', 'w'), ensure_ascii=False, indent=0)
print('stable' if old == found else 'changed', found['TOTAL'], 'trang')
