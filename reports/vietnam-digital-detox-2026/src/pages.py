"""Find the page on which each section opens in the rendered PDF (for the Contents page)."""
import subprocess, json, sys
pdf = sys.argv[1]
n = int([l for l in subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout.splitlines() if l.startswith("Pages")][0].split()[-1])
keys = {"exec": "EXECUTIVE SUMMARY", "intro": "Introduction", "design": "How Social Media Platforms Are Designed",
        "why": "What Is Digital Detox and Why", "policy": "Advancing Digital Detox", "banking": "The Implications of Digital Detox",
        "view": "ABrighter Research View", "refs": "References"}
pages = {}
for i in range(3, n + 1):
    t = subprocess.run(["pdftotext", "-f", str(i), "-l", str(i), pdf, "-"], capture_output=True, text=True).stdout
    lines = [l.strip() for l in t.strip().splitlines()[:8]]
    head = " ".join(lines)
    for k, v in keys.items():
        if k in ("refs", "intro"):
            hit = v in lines
        else:
            hit = v in head
        if k not in pages and hit:
            pages[k] = i
print(pages)
json.dump(pages, open(sys.argv[2], "w"))
