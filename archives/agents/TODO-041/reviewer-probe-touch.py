# TODO-041 reviewer: タッチでのタップ・リンク上から始めたスワイプ、template.js のリンクのフォーカス
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[3]
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={'width': 1280, 'height': 900}, has_touch=True)
    ctx.route('https://**/*', lambda r: r.fulfill(body='stub') if 'kannaibg' in r.request.url or 'github' in r.request.url else r.continue_())
    popups = []
    ctx.on('page', lambda pg: popups.append(pg))
    page = ctx.new_page()
    page.goto(ROOT.joinpath('player.html').as_uri() + '?slides=backgammon'); page.wait_for_load_state('networkidle')
    cdp = ctx.new_cdp_session(page)
    qr = page.evaluate("slideData.findIndex(s => s.title === '関内バックギャモンの会で始めよう')")
    page.evaluate(f'renderSlide({qr})'); page.wait_for_timeout(300)
    box = page.locator('#slide-canvas a[href*="kannaibg"]').bounding_box()
    cx, cy = box['x'] + box['width'] / 2, box['y'] + box['height'] / 2
    # タップ
    page.touchscreen.tap(cx, cy); page.wait_for_timeout(500)
    page.wait_for_timeout(300); print('tap: popups', [x.url for x in popups], 'isPlaying', page.evaluate('isPlaying'), 'index', page.evaluate('currentIndex'))
    # リンク上から右へスワイプ（最後のスライドなので前へ戻る向き）（120px）
    popups.clear()
    page.evaluate(f'renderSlide({qr})'); page.wait_for_timeout(300)
    def t(kind, x): cdp.send('Input.dispatchTouchEvent', {'type': kind, 'touchPoints': [] if kind == 'touchEnd' else [{'x': x, 'y': cy}]})
    t('touchStart', cx)
    for k in range(1, 7): t("touchMove", cx + 20 * k)
    t('touchEnd', 0); page.wait_for_timeout(500)
    print('swipe from link: popups', len(popups), 'isPlaying', page.evaluate('isPlaying'), 'index', qr, '->', page.evaluate('currentIndex'))
    # 比較: リンクの外（枠の左端近く）から同じスワイプ
    page.evaluate(f'renderSlide({qr})'); page.wait_for_timeout(300)
    vb = page.locator('#player-viewport').bounding_box(); cy = vb['y'] + vb['height'] / 2; x0 = vb['x'] + 400
    t('touchStart', x0)
    for k in range(1, 7): t("touchMove", x0 + 20 * k)
    t('touchEnd', 0); page.wait_for_timeout(500)
    print('swipe outside link: index', qr, '->', page.evaluate('currentIndex'))
    b.close()

    # template.js:237 の既存リンクもクリック後にフォーカスが残るか
    b = p.chromium.launch(); ctx = b.new_context(viewport={'width': 1280, 'height': 900})
    ctx.route('https://github.com/**', lambda r: r.fulfill(body='stub'))
    page = ctx.new_page()
    page.goto(ROOT.joinpath('player.html').as_uri() + '?slides=template'); page.wait_for_load_state('networkidle')
    i = page.evaluate("slideData.findIndex(s => s.title === '引用')")
    page.evaluate(f'renderSlide({i})'); page.wait_for_timeout(300)
    with ctx.expect_page() as pop: page.locator('#slide-canvas a').first.click()
    pop.value.close()
    page.keyboard.press('ArrowRight'); page.wait_for_timeout(200)
    print('template link: active', page.evaluate('document.activeElement.tagName'), 'ArrowRight', i, '->', page.evaluate('currentIndex'))
    b.close()
