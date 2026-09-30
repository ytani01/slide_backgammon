# usage: verify.py [出力ディレクトリ] [枚数...]  例: verify.py archives/agents/TODO-014 5 6 7
# usage: /home/ytani/work/ytsched/.venv/bin/python verify.py [slides...]  (既定 1 2 3 4)
import sys, json
from playwright.sync_api import sync_playwright
URL='http://localhost:8715/player.html?slides=backgammon'
D=sys.argv[1] if len(sys.argv)>1 and not sys.argv[1].isdigit() else 'archives/agents/TODO-013'
Ns=[int(a) for a in sys.argv[1:] if a.isdigit()] or [1,2,3,4]
JS="""()=>{
 const c=document.getElementById('slideCanvas')||document.querySelector('.slide-fade-enter');
 const R=e=>{const r=e.getBoundingClientRect();return [r.left,r.top,r.right,r.bottom].map(v=>+v.toFixed(1))};
 const root=c.firstElementChild;
 const bg=root.querySelector('img.absolute');
 const out={frameBottom:R(c)[3], bg: bg?{nw:bg.naturalWidth,src:bg.getAttribute('src'),opacity:getComputedStyle(bg).opacity}:null};
 const h2=root.querySelector('h2'); out.h2=h2?R(h2):null;
 // 本文で一番下の要素: 見出し込みの内容ブロック（absolute でない最後の子）の子孫の bottom の最大
 const flow=[...root.children].filter(e=>getComputedStyle(e).position!=='absolute');
 const blk=root.children[2]&&getComputedStyle(root.children[2]).position==='relative'&&root.children[2].classList.contains('flex')?root.children[2]:flow[flow.length-1];
 let mb=0; for(const e of blk.querySelectorAll('*')) mb=Math.max(mb,e.getBoundingClientRect().bottom);
 out.lines=[...blk.querySelectorAll('*')].filter(e=>[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())).map(e=>{const rg=document.createRange();rg.selectNodeContents(e);return [e.textContent.trim().slice(0,22),new Set([...rg.getClientRects()].map(x=>Math.round(x.top/3))).size]});
 out.maxBottom=+mb.toFixed(1);
 const cr=[...c.querySelectorAll('div.absolute')].filter(e=>e.textContent.trim()&&!e.querySelector('*'));
 out.credit=cr.map(e=>({t:e.textContent,r:R(e),fs:getComputedStyle(e).fontSize,color:getComputedStyle(e).color}));
 // 2 枚目: h2 の次の要素構造で点を取る
 const cont=root.children[2];
 if(cont){const grids=[...cont.children].filter(x=>x.classList.contains('grid'));
   if(grids.length>1){const tl=grids[0].nextElementSibling; const dots=[...tl.children[2].children];
     out.dotsCx=dots.map(d=>{const r=d.getBoundingClientRect();return +(r.left+r.width/2).toFixed(2)})}}
 return out}"""
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h in [(1280,720),(412,915)]:
        pg=b.new_page(viewport={'width':w,'height':h})
        pg.goto(URL); pg.wait_for_load_state('networkidle'); pg.wait_for_timeout(1000)
        for n in Ns:
            pg.evaluate(f"()=>renderSlide({n-1},true)"); pg.wait_for_timeout(2500)
            r=pg.evaluate(JS); print(w,n,json.dumps(r,ensure_ascii=False))
            pg.screenshot(path=f'{D}/slide{n}-{w if w==1280 else 412}.png')
    b.close()
