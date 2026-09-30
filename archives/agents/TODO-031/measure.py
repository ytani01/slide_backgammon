#!/usr/bin/env python3
"""使い方: measure.py <コミット> <ポート> [出力先]  worktree /tmp/.../wt を <コミット> に切替え、8枚を測る。
http.server は <ポート> で wt を配信している前提。"""
import sys, subprocess, json, os
from playwright.sync_api import sync_playwright
commit, port = sys.argv[1], sys.argv[2]
out = sys.argv[3] if len(sys.argv) > 3 else os.path.dirname(os.path.abspath(__file__))
wt = "/tmp/claude-649/-home-ytani-work-slide-ytsched/839f8e2f-a88b-48e9-9e93-0d7c701e1c70/scratchpad/wt"
subprocess.run(["git","-C",wt,"checkout","--detach",commit],check=True,capture_output=True)
JS = """() => { const c=document.querySelector('#slide-canvas'); const r=c.getBoundingClientRect();
 const h=c.querySelector('h2'); const i=h&&h.querySelector('i');
 return {sh:c.scrollHeight, ch:c.clientHeight,
  broken:[...c.querySelectorAll('img')].filter(m=>m.naturalWidth===0).map(m=>m.src),
  imgs:[...c.querySelectorAll('img')].map(m=>{const b=m.getBoundingClientRect();return [m.src.split('/').pop(),Math.round(b.bottom-r.top),Math.round(b.right-r.left),Math.round(b.width)>=Math.round(r.width)-1]}),
  h2top:h? h.getBoundingClientRect().top-r.top : null,
  iw:i? i.getBoundingClientRect().width : null,
  icls:i? i.className : null,
  iglyph:i? getComputedStyle(i,'::before').content : null,
  ifont:i? getComputedStyle(i).fontFamily : null}; }"""
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width":1280,"height":720})
    for n in range(1,int(os.environ.get("N","8"))+1):
        pg.goto("about:blank")
        pg.goto(f"http://127.0.0.1:{port}/player.html?slides=backgammon#{n}")
        pg.wait_for_timeout(1300)
        pg.locator("#slide-canvas").screenshot(path=f"{out}/s{n}.png")
        d = pg.evaluate(JS)
        out_ = [(a,b) for a,b,rgt,full in d["imgs"] if not full and (b > d["ch"] + 0.5 or rgt > r_w + 0.5)] if False else [(a,b) for a,b,rgt,full in d["imgs"] if not full and b > d["ch"] + 0.5]
        print(n, json.dumps(d, ensure_ascii=False), "OUTSIDE:", out_)
    b.close()
