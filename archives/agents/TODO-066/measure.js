// usage: NODE_PATH=/tmp/pw/node_modules node measure.js
const { chromium } = require('playwright-core');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch();
  for (const [w, h] of [[1280, 720], [412, 915]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, bypassCSP: true });
    const page = await ctx.newPage();
    await page.route('**/*', (r) => r.continue({ headers: { ...r.request().headers(), 'cache-control': 'no-cache' } }));
    await page.goto('http://localhost:8000/player.html?slides=backgammon');
    await page.waitForTimeout(1500);
    // チャプター一覧が畳まれていれば開く
    const btn = page.getByText('バックギャモンの歴史は古い').first();
    if (!(await btn.isVisible())) {
      const t = page.getByText('チャプター一覧').first();
      await t.click().catch(() => {});
      await page.waitForTimeout(500);
    }
    await btn.click();
    await page.waitForTimeout(1500);
    const r = await page.evaluate(() => {
      const R = (e) => { const b = e.getBoundingClientRect(); return { l: b.left, r: b.right, t: b.top, b: b.bottom, cx: (b.left + b.right) / 2, cy: (b.top + b.bottom) / 2 }; };
      const vis = (e) => e.getBoundingClientRect().width > 0;
      const line = [...document.querySelectorAll('div.bg-gradient-to-r.from-sky-400')].find(vis);
      const axis = line.parentElement;
      const grid = axis.querySelector('.grid');
      const cols = [...grid.children];
      const dots = cols.map((c) => c.querySelector('.rounded-full'));
      const ringPx = parseFloat(getComputedStyle(dots[0]).boxShadow.match(/(\d+(\.\d+)?)px\s*(?:\d+px\s*)*rgb/)?.[1] ?? 'NaN');
      const arrows = cols.map((c) => c.querySelector('[style*=clip-path]'));
      const big = axis.querySelector(':scope > [style*=clip-path]');
      const prev = axis.previousElementSibling, next = axis.nextElementSibling;
      const cap = [...next.querySelectorAll('*')].filter(e=>e.children.length===0&&e.textContent.trim()).map(R);
      const cr = [...document.querySelectorAll('*')].filter(e=>e.children.length===0&&/BabelStone/.test(e.textContent)).map(R);
      let f = axis; while (f && !(f.getBoundingClientRect().width>0 && Math.abs(f.getBoundingClientRect().width/f.getBoundingClientRect().height-16/9)<0.02)) f = f.parentElement;
      const frame = f ? R(f) : null;
      const cqw = axis.getBoundingClientRect().width; // placeholder
      return { line: R(line), axis: R(axis), big: R(big), dots: dots.map(R), ring: getComputedStyle(dots[0]).boxShadow,
        arrows: arrows.map((a) => a && R(a)), prev: R(prev), next: R(next), slideParent: R(axis.closest('[class*=cqw], section, .slide') || axis.parentElement),
        vw: innerWidth, cap, cr, frame };
    });
    const tag = `${w}x${h}`;
    fs.writeFileSync(`result-${tag}.json`, JSON.stringify(r, null, 1));
    const ax = await page.evaluate(() => { const l = [...document.querySelectorAll('div.bg-gradient-to-r.from-sky-400')].find(e=>e.getBoundingClientRect().width>0); return l.parentElement.getBoundingClientRect().toJSON(); });
    await page.screenshot({ path: `shot-${tag}.png` });
    console.log(tag, JSON.stringify(r));
    await ctx.close();
  }
  await browser.close();
})();
