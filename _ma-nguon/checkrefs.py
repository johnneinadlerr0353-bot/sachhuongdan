import pymupdf as fitz,re,json
book=fitz.open('book.pdf'); real={}
for i,p in enumerate(book):
    t=p.get_text()
    for m in re.finditer(r'PHẦN (\d) · BÀI (\d+)\n',t): real.setdefault('B'+m.group(2),i+1)
    for m in re.finditer(r'^PHỤ LỤC (\d)\n',t,re.M): real.setdefault('P'+m.group(1),i+1)
    for m in re.finditer(r'^PHẦN (\d)\n',t,re.M): real.setdefault('PH'+m.group(1),i+1)
bad=tot=0
for n in ['book','guide','lib']:
    for i,p in enumerate(fitz.open(n+'.pdf')):
        t=re.sub(r'\s+',' ',p.get_text())
        for m in re.finditer(r'(Bài|Phụ lục) (\d+) \((?:trang|tr\.) (\d+)\)',t):
            k=('B' if m.group(1)=='Bài' else 'P')+m.group(2); tot+=1
            if real.get(k)!=int(m.group(3)): bad+=1; print('SAI',n,i+1,m.group(0),'thật:',real.get(k))
        for m in re.finditer(r'Phần (\d) \(trang (\d+)\)',t):
            tot+=1
            if real.get('PH'+m.group(1))!=int(m.group(2)): bad+=1; print('SAI',n,i+1,m.group(0))
print('tổng tham chiếu',tot,'sai',bad,'| số bài tìm thấy',len([k for k in real if k.startswith('B')]))
