// TODO-074/075/077 verifier: node archives/agents/TODO-074/verifier-measure.js
const { createRequire } = require('module');
const req = createRequire('/home/ytani/.local/share/mise/installs/npm-playwright/latest/node_modules/');
const { chromium } = req('playwright');
const OUT = __dirname;
const URL = 'http://localhost:8000/player.html?slides=backgammon';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const errs = [];
async function open(browser, w, h) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  page.on('pageerror', e => errs.push(`${w}x${h} PAGEERROR ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errs.push(`${w}x${h} console.error ${m.text()}`); });
  await page.goto(URL); await sleep(1500);
  return page;
}
const show = async (page, t) => { await page.evaluate((t) => renderSlide(slideData.findIndex(s => s.title === t), true), t); await sleep(500); };
const ov = (a, b) => !(a.r <= b.l || b.r <= a.l || a.b <= b.t || b.b <= a.t);
(async () => {
  const browser = await chromium.launch();
  for (const [w, h] of [[1280, 800], [1024, 768], [915, 412], [412, 915]]) {
    const page = await open(browser, w, h);
    await show(page, '魅力③ おしゃれ');
    const r = await page.evaluate(() => {
      const c = document.getElementById('slide-canvas');
      const root = c.querySelector('.relative.h-full.overflow-hidden') || c.firstElementChild;
      const bx = e => { const q = e.getBoundingClientRect(); return { l: q.left, t: q.top, r: q.right, b: q.bottom, w: q.width, h: q.height }; };
      const all = [...root.querySelectorAll('p,div')];
      const photo = all.find(e => e.tagName === 'P' && e.textContent.startsWith('写真（一部切り出し）'));
      const bgc = all.find(e => e.textContent.startsWith('背景: Jean') && e.children.length === 0);
      const imgs = ['bg-board1.jpg', 'bg-board2.jpg', 'bg-board3.jpg'].map(n => bx(root.querySelector(`img[src$="${n}"]`)));
      return { root: bx(root), photo: bx(photo), bgc: bx(bgc), imgs, photoLines: Math.round(photo.getBoundingClientRect().height / (parseFloat(getComputedStyle(photo).fontSize) * 1.375)) };
    });
    console.log(`\n== 074 ${w}x${h}`); console.log(JSON.stringify(r));
    const R = r.root, f = x => +x.toFixed(1);
    const inside = x => x.l >= R.l - 0.5 && x.r <= R.r + 0.5 && x.t >= R.t - 0.5 && x.b <= R.b + 0.5;
    console.log('photo right of bg credit centre:', (r.photo.l + r.photo.r) / 2 > (r.bgc.l + r.bgc.r) / 2, ' photo.r', f(r.photo.r), 'root.r', f(R.r), ' bgc.l', f(r.bgc.l), 'root.l', f(R.l));
    console.log('photo vs bgc overlap:', ov(r.photo, r.bgc));
    r.imgs.forEach((im, i) => console.log(` board${i + 1} vs photo:`, ov(im, r.photo), ' vs bgc:', ov(im, r.bgc), ' inside root:', inside(im)));
    console.log('photo inside:', inside(r.photo), 'bgc inside:', inside(r.bgc));
    await page.screenshot({ path: `${OUT}/verifier-${w}-074.png` }); console.log('photo lines:', r.photoLines);
    await show(page, '関内バックギャモンの会で始めよう');
    if (w === 1280) {
      const s = await page.evaluate(() => {
        const sp = [...document.querySelectorAll('#slide-canvas span')];
        const g = t => sp.filter(e => e.children.length === 0 && e.textContent.trim() === t)[0];
        const li = g('月 2 回').closest('li') || g('月 2 回').parentElement.parentElement;
        const o = {};
        for (const t of ['月 2 回', 'なか区民活動センター', 'Kアリーナ Bar 7']) { const e = g(t); const cs = getComputedStyle(e); o[t] = { color: cs.color, ws: cs.whiteSpace, wsParent: getComputedStyle(e.parentElement).whiteSpace }; }
        o.de = [...li.querySelectorAll('span')].map(e => e.textContent + '|' + getComputedStyle(e).whiteSpace);
        o.liText = li.textContent; return o;
      });
      console.log('\n== 075'); console.log(JSON.stringify(s, null, 1));
      await page.screenshot({ path: `${OUT}/verifier-1280-075.png` });
    }
    await show(page, '表紙');
    const c = await page.evaluate(() => { const s = slideData.find(s => s.title === '表紙'); const a = document.querySelector('#slide-canvas a'); return { dur: s.duration, narr: s.narration, hasOld: s.narration.includes('お届けするのは'), a: a && [a.textContent, a.href] }; });
    console.log(`\n== 077 ${w}x${h}`, JSON.stringify(c));
    await sleep(300);
  }
  console.log('\nERRORS:', errs.length ? errs : 'none');
  await browser.close();
})();
