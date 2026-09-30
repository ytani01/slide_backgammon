import json, sys, pathlib
from playwright.sync_api import sync_playwright
ROOT = pathlib.Path('/home/ytani/work/slide_backgammon')
OUT = ROOT / 'archives/agents/TODO-043'
TITLE = '関内バックギャモンの会で始めよう'
JS = """() => {
 const r = e => { const b = e.getBoundingClientRect(); return [b.left,b.top,b.right,b.bottom].map(v=>Math.round(v*10)/10) };
 const c = document.getElementById('slide-canvas');
 const cards = [...c.querySelectorAll('a')];
 const lis = [...c.querySelectorAll('li')];
 const h = c.querySelector('h1,h2,h3');
 const credit = [...document.querySelectorAll('*')].filter(e=>e.children.length==0 && (e.textContent||'').includes('背景:')).map(e=>({t:e.textContent,r:r(e)}));
 return {canvas:r(c), cards:cards.map(r), lis:lis.map(r), title:h&&{t:h.textContent.trim(),r:r(h)}, credit,
  anchors:cards.map(a=>({href:a.href,target:a.target,rel:a.rel,td:getComputedStyle(a).textDecorationLine,
   cardScroll:[a.scrollWidth,a.clientWidth]})), isPlaying,
  labels:cards.map(a=>{const d=a.querySelector('div>div');const g=document.createRange();g.selectNodeContents(d);const tops=[...new Set([...g.getClientRects()].map(q=>Math.round(q.top)))];return {text:d.innerText,lines:d.getBoundingClientRect().height/parseFloat(getComputedStyle(d).lineHeight),rectTops:tops.length}})};
}"""
def inter(a,b): return a[0]<b[2] and b[0]<a[2] and a[1]<b[3] and b[1]<a[3]
with sync_playwright() as p:
    b = p.chromium.launch()
    for name,(w,h) in {'pc':(1280,900),'sp':(412,915)}.items():
        if len(sys.argv)>1 and name!=sys.argv[1]: continue
        ctx = b.new_context(viewport={'width':w,'height':h})
        ctx.route('https://x.com/**', lambda r: r.fulfill(status=200, body='stub'))
        ctx.route('https://kannaibg.wixsite.com/**', lambda r: r.fulfill(status=200, body='stub'))
        pg = ctx.new_page()
        pg.goto(f'file://{ROOT}/player.html?slides=backgammon')
        pg.wait_for_timeout(1500)
        pg.evaluate(f"renderSlide(slideData.findIndex(s => s.title === '{TITLE}'))")
        pg.wait_for_timeout(1500)
        d = pg.evaluate(JS)
        print('==', name, json.dumps(d, ensure_ascii=False))
        cv, cards, lis = d['canvas'], d['cards'], d['lis']
        print(' cards in canvas:', [c[0]>=cv[0] and c[1]>=cv[1] and c[2]<=cv[2] and c[3]<=cv[3] for c in cards])
        print(' card-card overlap:', inter(cards[0],cards[1]))
        print(' card-li overlap:', [inter(c,l) for c in cards for l in lis])
        if d['title']: print(' card-title overlap:', [inter(c,d['title']['r']) for c in cards])
        print(' card-credit overlap:', [inter(c,x['r']) for c in cards for x in d['credit']])
        pg.screenshot(path=str(OUT/f'shot-{name}{"-after" if len(sys.argv)>1 else ""}.png'))
        for state in (False, True):
            pg.evaluate(f"isPlaying = {str(state).lower()}")
            with ctx.expect_page(timeout=5000) as ev:
                pg.locator('#slide-canvas a').nth(1).click()
            np_ = ev.value; np_.wait_for_load_state()
            print(f' click X (isPlaying was {state}): new tab url={np_.url} isPlaying now={pg.evaluate("isPlaying")}')
            np_.close()
        ctx.close()
    b.close()
