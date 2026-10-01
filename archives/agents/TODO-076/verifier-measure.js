// TODO-076 verifier: node archives/agents/TODO-076/verifier-measure.js
const { createRequire } = require('module');
const req = createRequire('/home/ytani/.local/share/mise/installs/npm-playwright/latest/node_modules/');
const { chromium } = req('playwright');
const OUT = __dirname;
const URL = 'http://localhost:8000/player.html?slides=backgammon';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const errs = [];
async function open(browser, w, h, reduced) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  page.on('pageerror', e => errs.push(`${w}x${h} PAGEERROR ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errs.push(`${w}x${h} console.error ${m.text()}`); });
  await page.addInitScript(() => {
    window.__animCalls = 0;
    const o = Element.prototype.animate;
    Element.prototype.animate = function (...a) { if (this.closest && this.closest('#karena-lights')) window.__animCalls++; return o.apply(this, a); };
  });
  await page.goto(URL); await sleep(1500);
  return page;
}
const last = (page) => page.evaluate(() => renderSlide(slideData.length - 1, true));
const SIZES = [[1280, 800], [1920, 1080], [412, 915]];
(async () => {
  const browser = await chromium.launch();
  for (const [w, h] of SIZES) {
    const page = await open(browser, w, h, false);
    await last(page); await sleep(300);
    // 1 位置
    const pos = await page.evaluate(() => {
      const img = document.querySelector('img[src$="bg-karena.jpg"]'); const r = img.getBoundingClientRect();
      const s = Math.max(r.width / 1600, r.height / 1200);
      const ox = r.left + (r.width - 1600 * s) / 2, oy = r.top + (r.height - 1200 * s) / 2;
      let max = 0, n = 0;
      document.querySelectorAll('#karena-lights g > g').forEach(g => {
        const m = g.parentElement.getAttribute('transform').match(/translate\(([\d.]+) ([\d.]+)\)/);
        const c = g.parentElement.getBoundingClientRect(); // outer g bbox = same center as inner
        const b = g.getBoundingClientRect();
        const cx = (b.left + b.right) / 2, cy = (b.top + b.bottom) / 2;
        const ex = ox + m[1] * s, ey = oy + m[2] * s;
        max = Math.max(max, Math.hypot(cx - ex, cy - ey)); n++;
      });
      return { n, max, scale: s, img: [r.width, r.height] };
    });
    console.log(`[${w}x${h}] 1 position`, JSON.stringify(pos));
    await page.close();
    if (w === 1920) continue;
    // 2 明滅
    const p2 = await open(browser, w, h, false);
    await p2.evaluate(() => {
      window.__seen = new Map(); window.__max = 0; window.__bad = { text: 0, ul: 0, a: 0, out: 0 };
      const hit = (r, b) => r.right > b.left && r.left < b.right && r.bottom > b.top && r.top < b.bottom;
      const lights = [...document.querySelectorAll('#karena-lights g > g')];
      window.__iv = setInterval(() => {
        const svg = document.getElementById('karena-lights'); if (!svg) return;
        const box = svg.parentElement; const area = svg.getBoundingClientRect();
        const rg = document.createRange(); rg.selectNodeContents(box.querySelector('h2'));
        const rt = rg.getBoundingClientRect(); const ul = box.querySelector('ul').getBoundingClientRect();
        const as = [...box.querySelectorAll('a')].map(a => a.getBoundingClientRect());
        const act = [...svg.querySelectorAll('g > g')].filter(g => g.getAnimations().length > 0);
        window.__max = Math.max(window.__max, act.length);
        act.forEach(g => {
          const i = [...svg.querySelectorAll('g > g')].indexOf(g);
          if (window.__seen.has(i)) return;
          window.__seen.set(i, 1);
          const r = g.getBoundingClientRect(); const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2;
          if (hit(r, rt)) window.__bad.text++;
          if (hit(r, ul)) window.__bad.ul++;
          if (as.some(a => hit(r, a))) window.__bad.a++;
          if (!(cx > area.left && cx < area.right && cy > area.top && cy < area.bottom)) window.__bad.out++;
        });
      }, 50);
    });
    await last(p2); await sleep(6000);
    const r2 = await p2.evaluate(() => ({ max: window.__max, distinct: window.__seen.size, calls: window.__animCalls, bad: window.__bad }));
    console.log(`[${w}x${h}] 2 twinkle`, JSON.stringify(r2));
    // 5 スクショ
    await p2.evaluate(() => document.getAnimations().forEach(a => { a.pause(); const d = a.effect.getComputedTiming().duration; a.currentTime = d / 2; }));
    const st = await p2.evaluate(() => [...document.querySelectorAll('#karena-lights g > g')].filter(g => g.getAnimations().length).map(g => getComputedStyle(g).opacity));
    console.log(`[${w}x${h}] 5 paused opacity`, JSON.stringify(st));
    await p2.screenshot({ path: `${OUT}/verifier-${w}-half.png` });
    if (w === 1280) {
      await p2.evaluate(() => { document.getAnimations().forEach(a => a.cancel()); document.querySelectorAll('#karena-lights g > g').forEach(g => g.setAttribute('opacity', '1')); });
      await p2.screenshot({ path: `${OUT}/verifier-1280-all.png` });
    }
    await p2.close();
  }
  // 3 reduced
  { const p = await open(browser, 1280, 800, true); await last(p); await sleep(3000);
    const r = await p.evaluate(() => ({ anims: document.getAnimations().length, calls: window.__animCalls, nonzero: [...document.querySelectorAll('#karena-lights g > g')].filter(g => g.getAttribute('opacity') !== '0' || getComputedStyle(g).opacity !== '0').length, n: document.querySelectorAll('#karena-lights g > g').length }));
    console.log('[reduced] 3', JSON.stringify(r)); await p.close(); }
  // 4 stop
  { const p = await open(browser, 1280, 800, false); await last(p); await sleep(1000);
    await p.evaluate(() => { renderSlide(0, true); window.__c0 = window.__animCalls; }); await sleep(2000);
    const c = await p.evaluate(() => ({ after: window.__animCalls - window.__c0, lights: document.querySelectorAll('#karena-lights').length, docAnims: document.getAnimations().filter(a => a.effect.target && a.effect.target.closest('#karena-lights')).length }));
    console.log('[stop] 4 on cover', JSON.stringify(c));
    await p.evaluate(() => { window.__m = 0; window.__iv = setInterval(() => { window.__m = Math.max(window.__m, [...document.querySelectorAll('#karena-lights g > g')].filter(g => g.getAnimations().length).length); }, 50); });
    await last(p); await sleep(3000);
    const d = await p.evaluate(() => ({ lights: document.querySelectorAll('#karena-lights').length, max: window.__m, calls: window.__animCalls }));
    console.log('[stop] 4 back', JSON.stringify(d)); await p.close(); }
  // 6 other slides
  { const p = await open(browser, 1280, 800, false);
    for (const i of [0, 7]) { await p.evaluate((i) => renderSlide(i, true), i); await sleep(500);
      console.log(`[other] 6 slide ${i + 1}`, JSON.stringify(await p.evaluate(() => ({ lights: document.querySelectorAll('#karena-lights').length, title: slideData.length })))); }
    await p.close(); }
  console.log('ERRORS', JSON.stringify(errs));
  await browser.close();
})();
