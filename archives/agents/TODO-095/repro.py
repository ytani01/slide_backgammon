"""4 枚目の「世界の遊戯人口」の札の強調の枠を、yt_slide の動画の書き出しと同じ手順で確かめる（TODO-095）。

1〜3 枚目をコマ送りで撮ってから 4 枚目を撮り、6 秒のコマで札の box-shadow を出し、画面を OUT に保存する。
yt_slide の .venv で動かす: cd ~/work/yt_slide && .venv/bin/python <このファイル> <URL> <OUT.jpg>
URL は slide_backgammon を配る http.server の player.html?slides=backgammon（8000 番は使わない）。
"""
import base64
import io
import sys

from playwright.sync_api import sync_playwright
from ytslide.video import FIT, FPS, PLAY, SYNC_ANIMATIONS, record_slide

url, out = sys.argv[1], sys.argv[2]
PROBE = """() => { const c = document.querySelector('#world-say [data-say="4"]');
  return 'ring-4=' + c.classList.contains('ring-4') + ' box-shadow=' + getComputedStyle(c).boxShadow; }"""
with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={'width': 1920, 'height': 1080})
    page.clock.install()
    page.goto(url)
    page.wait_for_function("() => typeof renderSlide === 'function'")
    page.clock.pause_at(page.evaluate('Date.now()') + 1000)
    # 前のスライドで強調の class が先に作られる（ここが無いと再現しない）。秒は .srt の間隔
    for i, sec in enumerate([7.8, 15.233, 19.546]):
        record_slide(page, i, sec, io.BytesIO())
    page.evaluate('() => { isPlaying = false; }')
    page.evaluate(FIT, 3)
    page.clock.run_for(50)
    page.wait_for_timeout(500)
    page.evaluate(PLAY)
    page.clock.run_for(16)
    elapsed = 0
    for k in range(181):  # 6.0 秒のコマまで
        t = round(k * 1000 / FPS)
        page.clock.run_for(t - elapsed)
        elapsed = t
        page.evaluate(SYNC_ANIMATIONS)
    print(page.evaluate(PROBE))
    cdp = page.context.new_cdp_session(page)
    open(out, 'wb').write(base64.b64decode(cdp.send('Page.captureScreenshot', {'format': 'jpeg'})['data']))
    b.close()
