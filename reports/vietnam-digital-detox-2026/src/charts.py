"""Charts and diagrams for 'Digital Detox: Restoring Balance in Vietnam's Digital Age' (ABrighter Research).

Run from the report folder: PYTHONPATH=src python3 src/charts.py
"""
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle, FancyArrowPatch
from style import *


def ex_vietnam_world():
    fig, (a, b) = plt.subplots(1, 2, figsize=(W, 2.7), gridspec_kw={"width_ratios": [1, 1.25]})
    names = ["World\n(Apr 2026)", "Thailand\n(Oct 2025)", "Vietnam\n(2026)"]
    vals = [69.9, 79.1, 77.6]
    cols = [SILVER, SILVER, BLUE]
    x = np.arange(3)
    a.bar(x, vals, color=cols, width=0.56)
    for xi, v, c in zip(x, vals, cols):
        a.text(xi, v + 2, f"{v:.1f}%", ha="center", fontsize=8.5, fontweight="bold", color=BLUE if c == BLUE else INK)
    a.set_xticks(x, names, fontsize=7.8)
    a.set_yticks([])
    a.set_ylim(0, 95)
    clean(a, left=False)
    a.set_title("A. Social media users as % of population", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)

    plats = ["Facebook", "Zalo", "TikTok (18+)", "YouTube"][::-1]
    users = [79.0, 78.3, 76.1, 62.1][::-1]
    y = np.arange(4)
    b.barh(y, users, color=[SKY, BLUE, NAVY, BLUE][::-1], height=0.58)
    for yi, v in zip(y, users):
        b.text(v + 1, yi, f"{v:.1f} m", va="center", fontsize=8.5)
    b.set_yticks(y, plats)
    b.set_xlim(0, 95)
    b.set_xticks([])
    clean(b, bottom=False)
    b.set_title("B. Users of the largest platforms in Vietnam (million)", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)
    b.text(0, -1.0, "Zalo is the only top-four platform built in Vietnam", fontsize=7.6, color=BLUE, fontweight="bold")
    fig.tight_layout(w_pad=2.5)
    save(fig, "ex_vn_world")


def ex_activities():
    acts = ["Scrolling social media", "Watching streaming content", "Online shopping", "Compulsively browsing news", "Excessive gaming",
            "Checking work emails after hours", "Checking messaging apps", "Checking financial apps", "Following influencers (comparison)",
            "Watching too much adult content", "Over-indulging in self-help content", "Excessive use of dating apps", "Overuse of fitness apps"]
    vals = [64.2, 39.1, 33.8, 33.7, 30.2, 25.3, 22.9, 14.5, 13.2, 13.1, 12.3, 7.3, 5.8]
    fig, ax = plt.subplots(figsize=(W, 3.6))
    y = np.arange(len(acts))[::-1]
    cols = [NAVY if i == 0 else (BLUE if acts[i] == "Checking financial apps" else SKY) for i in range(len(acts))]
    ax.barh(y, vals, color=cols, height=0.62)
    for yi, v, a_ in zip(y, vals, acts):
        ax.text(v + 0.8, yi, f"{v:.1f}%", va="center", fontsize=8, fontweight="bold" if a_ in ("Scrolling social media", "Checking financial apps") else "normal")
    ax.set_yticks(y, acts, fontsize=8)
    ax.set_xlim(0, 75)
    ax.set_xticks([])
    clean(ax, bottom=False)
    ax.annotate("One user in seven wants a break\nfrom financial apps too", xy=(21.5, y[7]), xytext=(40, y[7] + 1.3), fontsize=7.8, color=BLUE,
                fontweight="bold", arrowprops=dict(arrowstyle="-", color=BLUE, lw=0.8))
    save(fig, "ex_activities")


def ex_age():
    fig, ax = plt.subplots(figsize=(W, 2.2))
    groups = ["Teenagers (13-19)", "Young adults (20-29)", "Adults (30-49)", "Older adults (50+)"]
    mins = [197, 177, 113, 62]
    labs = ["3h 17m", "2h 57m", "1h 53m", "1h 02m"]
    x = np.arange(4)
    ax.bar(x, mins, color=[NAVY, BLUE, SKY, ICE], width=0.56, edgecolor=[NAVY, BLUE, SKY, SKY])
    for xi, m, l in zip(x, mins, labs):
        ax.text(xi, m + 6, l, ha="center", fontsize=9, fontweight="bold")
    ax.set_xticks(x, groups, fontsize=8)
    ax.set_yticks([])
    ax.set_ylim(0, 230)
    clean(ax, left=False)
    save(fig, "ex_age")


def ex_banking():
    fig, (a, b) = plt.subplots(1, 2, figsize=(W, 2.5), gridspec_kw={"width_ratios": [1, 1.15]})
    lab = ["Volume", "Value"]
    v = [42, 23]
    a.bar([0, 1], v, color=[BLUE, NAVY], width=0.5)
    for xi, vv in zip([0, 1], v):
        a.text(xi, vv + 1.5, f"+{vv}%", ha="center", fontsize=10, fontweight="bold")
    a.set_xticks([0, 1], lab)
    a.set_yticks([])
    a.set_ylim(0, 55)
    clean(a, left=False)
    a.set_title("A. Growth of cashless payments, 2025", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)
    yrs = ["2024", "2025"]
    loss = [20.0, 8.0]
    b.bar([0, 1], loss, color=[RED, "#F09A9D"], width=0.5)
    for xi, vv in zip([0, 1], loss):
        b.text(xi, vv + 0.6, f"VND {vv:.0f} tn", ha="center", fontsize=9.5, fontweight="bold")
    b.set_xticks([0, 1], ["2024\n(estimate)", "2025\n(Ministry of\nPublic Security)"], fontsize=7.6)
    b.set_yticks([])
    b.set_ylim(0, 25)
    clean(b, left=False)
    b.set_title("B. Losses to online fraud (VND trillion)", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)
    fig.tight_layout(w_pad=2.5)
    save(fig, "ex_banking")


def ex_matrix():
    fig, ax = plt.subplots(figsize=(W, 3.9))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 6.2)
    ax.axis("off")
    x0, y0, w, h = 1.2, 0.5, 8.4, 5.2
    quads = [
        (x0, y0 + h / 2, "CALM BANKING", "High value in little time:\nanswers, alerts that matter,\none-tap actions", BLUE, "white"),
        (x0 + w / 2, y0 + h / 2, "CHOSEN DEPTH", "High value worth the time:\nadvice, planning and big\ndecisions the customer starts", ICE, NAVY),
        (x0, y0, "UTILITY", "Fast but forgettable:\ncheck balance, pay, leave", MIST, NAVY),
        (x0 + w / 2, y0, "ATTENTION TRAP", "Long sessions, many nudges\nand little value added", "#FCE4E5", "#B3262D"),
    ]
    for (qx, qy, t, d, fc, tc) in quads:
        ax.add_patch(Rectangle((qx, qy), w / 2 - 0.05, h / 2 - 0.05, fc=fc, ec="none"))
        ax.text(qx + 0.25, qy + h / 2 - 0.35, t, fontsize=8.5, fontweight="bold", color=tc, va="top")
        ax.text(qx + 0.25, qy + h / 2 - 0.85, d, fontsize=8, color=tc, va="top", linespacing=1.35)
    # axes
    ax.add_patch(FancyArrowPatch((x0, y0 - 0.25), (x0 + w + 0.2, y0 - 0.25), arrowstyle="-|>", mutation_scale=10, color=NAVY, lw=0.8))
    ax.add_patch(FancyArrowPatch((x0 - 0.25, y0 + h), (x0 - 0.25, y0 - 0.05), arrowstyle="-", color=NAVY, lw=0.8))
    ax.add_patch(FancyArrowPatch((x0 - 0.25, y0), (x0 - 0.25, y0 + h + 0.2), arrowstyle="-|>", mutation_scale=10, color=NAVY, lw=0.8))
    ax.text(x0 + w / 2, y0 - 0.5, "Time and attention the customer must give", ha="center", fontsize=8, color=NAVY, fontweight="bold")
    ax.text(x0 - 0.45, y0 + h / 2, "Value the customer receives", rotation=90, ha="center", va="center", fontsize=8, color=NAVY, fontweight="bold")
    ax.text(x0 + 0.1, y0 - 0.48, "Low", fontsize=7, color=GREY)
    ax.text(x0 + w - 0.1, y0 - 0.48, "High", fontsize=7, color=GREY, ha="right")
    # flip: value high at top -> quadrants: top row = high value
    # arrow showing the move
    ax.add_patch(FancyArrowPatch((x0 + w * 0.88, y0 + h * 0.07), (x0 + w * 0.3, y0 + h * 0.6), arrowstyle="-|>", mutation_scale=14,
                                 color=CYAN, lw=2.2, connectionstyle="arc3,rad=-0.25", zorder=5))
    ax.text(x0 + w * 0.5, y0 + h * 0.5, "The shift digital\ndetox demands", ha="center", fontsize=8, color=NAVY, fontweight="bold",
            bbox=dict(boxstyle="square,pad=0.3", fc="white", ec=CYAN, lw=0.8), zorder=6)
    save(fig, "ex_matrix")


if __name__ == "__main__":
    ex_vietnam_world()
    ex_activities()
    ex_age()
    ex_banking()
    ex_matrix()
    print("charts done")
