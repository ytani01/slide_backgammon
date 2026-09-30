# TODO-041 reviewer: リンクのクリック・キー操作・見た目を測る
from pathlib import Path
from playwright.sync_api import sync_playwright

URL = (Path(__file__).resolve().parents[3] / 'player.html').as_uri() + '?slides=backgammon'
STYLE = """a => { const s = getComputedStyle(a); const p = getComputedStyle(a.parentElement);
  return {display: s.display, color: s.color, parentColor: p.color, deco: s.textDecorationLine,
          cursor: s.cursor, rect: a.getBoundingClientRect().toJSON()}; }"""

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={'width': 1280, 'height': 900})
    ctx.route('https://kannaibg.wixsite.com/**', lambda r: r.fulfill(body='stub'))
    page = ctx.new_page()
    page.goto(URL); page.wait_for_load_state('networkidle')
    qr = page.evaluate("slideData.findIndex(s => s.title === '関内バックギャモンの会で始めよう')")
    for idx in (0, qr):
        page.evaluate(f'renderSlide({idx})'); page.wait_for_timeout(300)
        a = page.locator('#slide-canvas a[href*="kannaibg"]')
        print('slide', idx, 'count', a.count(), a.evaluate(STYLE))
        before = page.evaluate('isPlaying')
        with ctx.expect_page() as pop:
            a.click()
        pop.value.close()
        print('  click: isPlaying', before, '->', page.evaluate('isPlaying'),
              'active=', page.evaluate('document.activeElement.tagName'))
        cur = page.evaluate('currentIndex')
        page.keyboard.press('ArrowRight'); page.wait_for_timeout(200)
        print('  ArrowRight after click: currentIndex', cur, '->', page.evaluate('currentIndex'))
        page.keyboard.press('Space'); page.wait_for_timeout(200)
        print('  Space after click: isPlaying', page.evaluate('isPlaying'))
        # 比較: 枠の余白クリックは切り替わる
        page.evaluate(f'renderSlide({idx})'); page.wait_for_timeout(300)
        b0 = page.evaluate('isPlaying')
        page.locator('#player-viewport').click(position={'x': 5, 'y': 5})
        print('  viewport click: isPlaying', b0, '->', page.evaluate('isPlaying'))
        if page.evaluate('isPlaying'): page.locator('#play-btn').click()
    b.close()
