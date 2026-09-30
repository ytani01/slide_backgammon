# 4 枚目のカードと写真を測る。使い方: .venv の python で cards.py
import json
from playwright.sync_api import sync_playwright
JS="""()=>{const c=(document.getElementById('slideCanvas')||document.querySelector('.slide-fade-enter'));const R=e=>{const r=e.getBoundingClientRect();return {top:+r.top.toFixed(1),bottom:+r.bottom.toFixed(1),left:+r.left.toFixed(1),right:+r.right.toFixed(1),h:+r.height.toFixed(1)}};
const grid=c.querySelector('.grid.grid-cols-2');const cards=[...grid.children];
const lines=e=>{const rg=document.createRange();rg.selectNodeContents(e);return new Set([...rg.getClientRects()].map(x=>Math.round(x.top/4))).size};
return {frame:R(c),cards:cards.map(R),photo:[...c.querySelectorAll('img')].map(i=>({src:i.getAttribute('src'),nw:i.naturalWidth,nh:i.naturalHeight,r:R(i)})),
 texts:cards.map(cd=>[...cd.children[1].children].map(d=>[d.textContent.trim(),d.getBoundingClientRect().height.toFixed(1),lines(d)]))}}"""
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h in [(1280,720),(412,915)]:
        pg=b.new_page(viewport={'width':w,'height':h})
        pg.goto('http://localhost:8715/player.html?slides=backgammon'); pg.wait_for_load_state('networkidle'); pg.wait_for_timeout(1000)
        pg.evaluate("()=>renderSlide(3,true)"); pg.wait_for_timeout(2500)
        print(w,json.dumps(pg.evaluate(JS),ensure_ascii=False))
    b.close()
