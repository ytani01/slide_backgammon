// TODO-078〜082 verifier: node archives/agents/TODO-079/verifier-measure.js
const { createRequire } = require('module');
const req = createRequire('/home/ytani/.local/share/mise/installs/npm-playwright/latest/node_modules/');
const { chromium } = req('playwright');
const OUT = __dirname;
const URL = 'http://localhost:8000/player.html?slides=backgammon';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const errs = [];
const J = (x) => JSON.stringify(x);
async function open(browser, w, h, reduce) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: reduce ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  const tag = `${w}x${h}${reduce ? ' reduce' : ''}`;
  page.on('pageerror', e => errs.push(`${tag} PAGEERROR ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errs.push(`${tag} console.error ${m.text()}`); });
  await page.goto(URL); await sleep(1500);
  return page;
}
const show = async (page, t) => { await page.evaluate((t) => renderSlide(slideData.findIndex(s => s.title === t), true), t); await sleep(400); };
// 再生開始して、ナレーション秒 t（rate 2）に達した時点ごとに fn を evaluate で読む
async function timeline(page, times, fn) {
  await page.evaluate(() => { isMuted = true; playbackRate = 2; isPlaying = true; speechRunId++; });
  const t0 = Date.now(); const out = [];
  for (const t of times) {
    const wait = t0 + t / 2 * 1000 - Date.now(); if (wait > 0) await sleep(wait);
    out.push([t, await page.evaluate(fn)]);
  }
  await page.evaluate(() => { isPlaying = false; });
  return out;
}
const SAY = () => [...document.querySelectorAll('[data-say]')].map(e => e.classList.contains('ring-4') ? 1 : 0).join('');
const YEARS = () => [...document.querySelectorAll('[data-say-show]')].map(e => e.style.opacity === '' ? 'v' : e.style.opacity).join(',');
const PH = () => [...document.querySelectorAll('[data-cue]')].map(e => { const cs = getComputedStyle(e); const m = new DOMMatrix(cs.transform); return { cue: e.dataset.cue, op: +(+cs.opacity).toFixed(2), deg: +(Math.atan2(m.b, m.a) * 180 / Math.PI).toFixed(2), sc: +Math.hypot(m.a, m.b).toFixed(3), ty: +m.f.toFixed(1) }; });
(async () => {
  const browser = await chromium.launch();
  // 1. TODO-078
  console.log('## 078');
  for (const [w, h] of [[1280, 800], [1024, 768], [915, 412], [412, 915]]) {
    const page = await open(browser, w, h);
    await show(page, '魅力③ おしゃれ');
    const r = await page.evaluate(() => {
      const ul = document.querySelector('#style-photos ul');
      let c = ul.parentElement; while (c && getComputedStyle(c).containerType === 'normal') c = c.parentElement;
      const cqw = c.getBoundingClientRect().width / 100;
      const ulr = ul.getBoundingClientRect();
      const b = (e) => e.getBoundingClientRect();
      const i1 = b(document.querySelector('img[src$="bg-board1.jpg"]')), i2 = b(document.querySelector('img[src$="bg-board2.jpg"]'));
      const lis = [...ul.querySelectorAll(':scope > li')].map(li => b(li));
      const vo = (a, q) => a.top < q.bottom && q.top < a.bottom;
      return { cqw, ulL: ulr.left, ulR: ulr.right, oldR: ulr.left + 54 * cqw,
        li: lis.map(l => ({ l: l.left, r: l.right, w: l.width, ovB2: vo(l, i2) ? Math.max(0, l.right - i2.left) : 0, ovB1: vo(l, i1) ? Math.max(0, l.right - i1.left) : 0 })),
        b2L: i2.left, b1L: i1.left, oldOvB2: lis.map(l => vo(l, i2) ? Math.max(0, ulr.left + 54 * cqw - i2.left) : 0), oldOvB1: lis.map(l => vo(l, i1) ? Math.max(0, ulr.left + 54 * cqw - i1.left) : 0) };
    });
    console.log(`${w}x${h}`, J(r, (k, v) => typeof v === 'number' ? +v.toFixed(1) : v));
    if (w === 1280) {
      await page.screenshot({ path: `${OUT}/verifier-1280-078-final.png` });
      await page.close();
    } else await page.close();
  }
  const page = await open(browser, 1280, 800);
  // 2. 079
  console.log('## 079');
  await show(page, '世界中でプレーされている');
  const cnt = () => document.getElementById('world-count').textContent;
  for (const [t, v] of await timeline(page, [5, 11, 15], () => ({ n: document.getElementById('world-count').textContent, ph: [...document.querySelectorAll('#world-photos [data-cue]')].map(e => { const cs = getComputedStyle(e); const m = new DOMMatrix(cs.transform); return `${e.dataset.cue}:op${(+cs.opacity).toFixed(2)}:deg${(Math.atan2(m.b, m.a) * 180 / Math.PI).toFixed(1)}:sc${Math.hypot(m.a, m.b).toFixed(2)}:ty${m.f.toFixed(1)}`; }) }))) console.log('t=', t, J(v));
  // 3. 080
  const say = async (title, times, label) => {
    console.log('## 080', label);
    await show(page, title);
    for (const [t, v] of await timeline(page, times, () => ({ ring: SAYf(), yrs: YEARSf() }))) console.log('t=', t, J(v));
  };
  await page.addInitScript?.(() => {});
  await page.evaluate(`window.SAYf = ${SAY.toString()}; window.YEARSf = ${YEARS.toString()};`);
  await say('世界中で日本人が大活躍', [2, 7, 12, 20, 24], 'japan(4.1,10.8,17 / end 23.3)');
  await page.screenshot({ path: `${OUT}/verifier-japan-t24-dummy.png` }).catch(() => {});
  await say('魅力① 簡単で手軽', [2, 6, 8.5, 12, 14], 'easy(4.1,7.7,9.6 / end 13.4)');
  await say('魅力② ゲームとしての面白さ', [1, 8, 14, 20, 23.5], 'fun(2.2,12.5,16.5 / end 22.7)');
  // 4. 081
  console.log('## 081');
  await show(page, '魅力③ おしゃれ');
  for (const [t, v] of await timeline(page, [2.0, 2.6, 3.3, 6.6, 8], () => [...document.querySelectorAll('#style-photos [data-cue]')].map(e => { const cs = getComputedStyle(e); const m = new DOMMatrix(cs.transform); return `${e.dataset.cue}:op${(+cs.opacity).toFixed(2)}:deg${(Math.atan2(m.b, m.a) * 180 / Math.PI).toFixed(1)}:sc${Math.hypot(m.a, m.b).toFixed(2)}:ty${m.f.toFixed(1)}`; }))) console.log('t=', t, J(v));
  // 日本人 t=12 スクリーンショット
  await show(page, '世界中で日本人が大活躍');
  await page.evaluate(() => { isMuted = true; playbackRate = 2; isPlaying = true; speechRunId++; });
  await sleep(6000 + 100); await page.screenshot({ path: `${OUT}/verifier-japan-t12.png` });
  await page.evaluate(() => { isPlaying = false; });
  // 5. 082
  console.log('## 082');
  await show(page, '表紙');
  const an = () => page.evaluate(() => ({ line: document.getElementById('cover-line').getAnimations().length, dice: document.getElementById('cover-dice').getAnimations().length }));
  console.log('right after show(+400ms):', J(await an()));
  await sleep(2000);
  console.log('after 2.4s:', J(await an()), J(await page.evaluate(() => ({ line: getComputedStyle(document.getElementById('cover-line')).transform, dice: getComputedStyle(document.getElementById('cover-dice')).transform, diceOp: getComputedStyle(document.getElementById('cover-dice')).opacity }))));
  await page.evaluate(() => coverPlay());
  console.log('after coverPlay():', J(await an()));
  // 7. 073 history
  console.log('## 073');
  await show(page, 'バックギャモンの歴史は古い');
  await sleep(300);
  console.log('not playing clip-path:', await page.evaluate(() => document.getElementById('history-line').style.clipPath));
  await show(page, 'バックギャモンの歴史は古い');
  for (const [t, v] of await timeline(page, [10], () => document.getElementById('history-line').style.clipPath)) console.log('t=', t, v);
  await page.close();
  // 6. 最後の形
  const TITLES = ['世界中でプレーされている', '世界中で日本人が大活躍', '魅力① 簡単で手軽', '魅力② ゲームとしての面白さ', '魅力③ おしゃれ', '表紙'];
  for (const reduce of [false, true]) {
    console.log('## 最後の形', reduce ? 'reducedMotion=reduce' : 'isPlaying 触らず');
    const p = await open(browser, 1280, 800, reduce);
    for (const t of TITLES) {
      await show(p, t); if (t !== '表紙') await sleep(1500);
      console.log(t, J(await p.evaluate(() => ({
        playing: isPlaying, count: document.getElementById('world-count')?.textContent, ring: document.querySelectorAll('.ring-4').length,
        ph: [...document.querySelectorAll('[data-cue]')].map(e => { const cs = getComputedStyle(e); return `${(+cs.opacity)}:${cs.transform === 'none' ? 'none' : 'm'}`; }),
        yrs: [...document.querySelectorAll('[data-say-show]')].map(e => getComputedStyle(e).opacity),
        coverAnim: document.getElementById('cover-line') ? document.getElementById('cover-line').getAnimations().length + document.getElementById('cover-dice').getAnimations().length : undefined,
        hist: undefined,
      }))));
    }
    await show(p, 'バックギャモンの歴史は古い'); await sleep(500);
    console.log('history clip-path', await p.evaluate(() => document.getElementById('history-line').style.clipPath));
    if (!reduce) await p.screenshot({ path: `${OUT}/verifier-dummy.png` }).catch(() => {});
    await p.close();
  }
  console.log('\nERRORS:', errs.length ? errs : 'none');
  await browser.close();
})().then(() => run083()).then(() => run084()).then(() => run085()).then(() => run086()).then(() => run087()).then(() => run089()).then(() => run090()).then(() => run091());

// ---- TODO-083（node verifier-measure.js の後半。上の IIFE が終わってから走る）----
const RING = () => ({ ring: [...document.querySelectorAll('[data-say]')].map(e => e.classList.contains('ring-4') ? 1 : 0).join(''),
  sc: [...document.querySelectorAll('[data-say].ring-4')].map(e => getComputedStyle(e).transform + '|' + (e.className.match(/scale-\S+/) || ['-'])[0]).join(';') });
const SAYS = [
  ['バックギャモンとは', [1, 3, 6, 10, 14]],
  ['バックギャモンの歴史は古い', [1, 5, 10, 14, 18]],
  ['世界中でプレーされている', [2, 5, 7, 11, 15, 20]],
  ['魅力③ おしゃれ', [1, 2.6, 3.3, 6.6, 8, 9]],
  ['関内バックギャモンの会で始めよう', [5, 9, 14, 18, 20.5, 23]],
];
const MORE = {
  'バックギャモンの歴史は古い': () => ({ clip: document.getElementById('history-line').style.clipPath }),
  '世界中でプレーされている': () => ({ n: document.getElementById('world-count').textContent, ph: [...document.querySelectorAll('#world-photos [data-cue]')].map(e => `${e.dataset.cue}:op${(+getComputedStyle(e).opacity).toFixed(2)}`) }),
  '魅力③ おしゃれ': () => ({ ph: [...document.querySelectorAll('#style-photos [data-cue]')].map(e => `${e.dataset.cue}:op${(+getComputedStyle(e).opacity).toFixed(2)}`) }),
};
const run083 = async () => {
  const browser = await chromium.launch();
  const e0 = errs.length;
  const page = await open(browser, 1280, 800);
  console.log('\n## TODO-083');
  for (const [title, times] of SAYS) {
    await show(page, title);
    console.log('--', title);
    for (const [t, v] of await timeline(page, times, RING)) console.log('t=', t, J(v));
  }
  await page.close();
  // 動きの一部は MORE を使うため、タイトルごとに別に読む
  for (const title of Object.keys(MORE)) {
    const p = await open(browser, 1280, 800); await show(p, title);
    const times = title === 'バックギャモンの歴史は古い' ? [10] : title === '世界中でプレーされている' ? [5, 11, 15] : [2.6, 3.3, 6.6, 8];
    console.log('-- more', title);
    for (const [t, v] of await timeline(p, times, MORE[title])) console.log('t=', t, J(v));
    await p.close();
  }
  // 日本人の札の scale
  { const p = await open(browser, 1280, 800); await show(p, '世界中で日本人が大活躍');
    console.log('-- japan scale'); for (const [t, v] of await timeline(p, [12], RING)) console.log('t=', t, J(v)); await p.close(); }
  // きらめき（6 秒）
  { const p = await open(browser, 1280, 800); await show(p, '関内バックギャモンの会で始めよう');
    const r = await p.evaluate(async () => {
      const gs = [...document.querySelectorAll('#karena-lights g > g')]; const seen = new Set(); let max = 0;
      for (let i = 0; i < 60; i++) { let n = 0; gs.forEach((g, k) => { if (g.getAnimations().length) { n++; seen.add(k); } }); max = Math.max(max, n); await new Promise(r => setTimeout(r, 100)); }
      return { distinctLit: seen.size, maxConcurrent: max };
    });
    console.log('-- twinkle 6s', J(r)); await p.close(); }
  // スクリーンショット
  for (const [title, t, f] of [['バックギャモンの歴史は古い', 10, 'verifier-history-t10.png'], ['関内バックギャモンの会で始めよう', 20, 'verifier-kannai-t20.png']]) {
    const p = await open(browser, 1280, 800); await show(p, title);
    await p.evaluate(() => { isMuted = true; playbackRate = 2; isPlaying = true; speechRunId++; });
    await sleep(t / 2 * 1000 + 100); await p.screenshot({ path: `${OUT}/${f}` }); await p.close();
  }
  // 再生していない・reduce
  for (const reduce of [false, true]) {
    for (const [title] of SAYS) {
      const p = await open(browser, 1280, 800, reduce); await show(p, title); await sleep(1200);
      console.log('final', reduce ? 'reduce' : 'notplaying', title, J(await p.evaluate(RING))); await p.close();
    }
  }
  console.log('ERRORS(083):', errs.slice(e0).length ? errs.slice(e0) : 'none');
  await browser.close();
};

// ---- TODO-083 の強い強調・TODO-084 ----
const run084 = async () => {
  const browser = await chromium.launch();
  const e0 = errs.length;
  console.log('\n## 084');
  const STRONG = ['ring-[0.7cqw]', 'ring-amber-300', '!shadow-[0_0_3cqw_0.6cqw_rgba(252,211,77,0.8)]'];
  // 1. 歴史 t=10
  let page = await open(browser, 1280, 800); await show(page, 'バックギャモンの歴史は古い'); await page.evaluate(k => { window.STRONG = k; }, STRONG);
  for (const [t, v] of await timeline(page, [10], (() => {
    const els = [...document.querySelectorAll('#history-say [data-say]')];
    const on = els.filter(e => e.classList.contains('ring-[0.7cqw]'))[0];
    const c = (document.querySelector('#slide-canvas .relative.h-full.overflow-hidden') || document.getElementById('slide-canvas'));
    let q = on.parentElement; while (q && getComputedStyle(q).containerType === 'normal') q = q.parentElement;
    const cqw = q.getBoundingClientRect().width / 100;
    const r = on.getBoundingClientRect();
    const cap = on.nextElementSibling; const cr = cap.getBoundingClientRect();
    const rg = document.createRange(); rg.selectNodeContents(cap); const tr = rg.getBoundingClientRect();
    return { idx: els.indexOf(on), classes: STRONG.map(k => on.classList.contains(k)), ring4: els.map(e => e.classList.contains('ring-4')), onlyOne: els.filter(e => e.classList.contains('ring-[0.7cqw]')).length,
      imgBottom: r.bottom, capBoxTop: cr.top, textTop: tr.top, gapImgToCapBox: cr.top - r.bottom, ringOuterBottom: r.bottom + 0.7 * cqw, shadowOuterBottom_approx: r.bottom + (0.6 + 3) * cqw,
      ringOverlapCapBox: Math.max(0, r.bottom + 0.7 * cqw - cr.top), ringOverlapText: Math.max(0, r.bottom + 0.7 * cqw - tr.top),
      shadowOverlapText_approx: Math.max(0, r.bottom + 3.6 * cqw - tr.top), cqw };
  }))) console.log('history t=', t, J(v, (k, x) => typeof x === 'number' ? +x.toFixed(1) : x));
  await page.close();
  // 2. 最後のスライド
  page = await open(browser, 1280, 800); await show(page, '関内バックギャモンの会で始めよう'); await page.evaluate(k => { window.STRONG = k; }, STRONG);
  for (const [t, v] of await timeline(page, [18, 20, 21.0, 21.6, 23.5, 25], (() => ({
    say: [...document.querySelectorAll('[data-say]')].map(e => (e.classList.contains('ring-4') || e.classList.contains('ring-[0.7cqw]')) ? 1 : 0).join(''),
    strongOn: [...document.querySelectorAll('a[data-say]')].map(a => STRONG.every(k => a.classList.contains(k)) ? 'S' : STRONG.some(k => a.classList.contains(k)) ? 'part' : '-').join(''),
  })))) console.log('karena t=', t, J(v));
  await page.close();
  // 3. 最後のスライド 3 幅、4. 歴史の収まり
  for (const [w, h] of [[1280, 800], [915, 412], [412, 915]]) {
    const p = await open(browser, w, h); await show(p, '関内バックギャモンの会で始めよう'); await sleep(300);
    const r = await p.evaluate(() => {
      const root = document.querySelector('#slide-canvas .relative.h-full.overflow-hidden') || document.getElementById('slide-canvas').firstElementChild;
      const R = root.getBoundingClientRect(); const as = [...document.querySelectorAll('#karena-say a')].map(a => a.getBoundingClientRect());
      const h2 = document.createRange(); h2.selectNodeContents(document.querySelector('#slide-canvas h2')); const H = h2.getBoundingClientRect();
      const a2 = document.querySelectorAll('#karena-say a')[1];
      const xt = [...a2.querySelectorAll('*')].filter(e => e.textContent.includes('Twitter') && ![...e.children].some(c => c.textContent.includes('Twitter')))[0];
      const xr = document.createRange(); xr.selectNodeContents(xt); const XR = xr.getBoundingClientRect(); const AR = as[1];
      return { gapV: as[1].top - as[0].bottom, rootIn: as.every(a => a.top >= R.top && a.bottom <= R.bottom + 0.5 && a.left >= R.left && a.right <= R.right + 0.5), a1TopMinusTitleBottom: as[0].top - H.bottom,
        xText: xt.textContent, xTextInsideCard: XR.left >= AR.left && XR.right <= AR.right && XR.top >= AR.top && XR.bottom <= AR.bottom, xScrollW: xt.scrollWidth, xClientW: xt.clientWidth, xTextLines: Math.round(XR.height / parseFloat(getComputedStyle(xt).lineHeight)), cardW: as.map(a => a.width), cardH: as.map(a => a.height) };
    });
    console.log(`karena layout ${w}x${h}`, J(r, (k, x) => typeof x === 'number' ? +x.toFixed(1) : x));
    const tw = await p.evaluate(async () => {
      const root = document.querySelector('#slide-canvas .relative.h-full.overflow-hidden') || document.getElementById('slide-canvas').firstElementChild;
      const gs = [...document.querySelectorAll('#karena-lights g > g')]; const seen = new Set(); let max = 0, bad = 0, cbad = 0;
      const hit = (r, b) => r.right > b.left && r.left < b.right && r.bottom > b.top && r.top < b.bottom;
      const tt = document.createRange(); tt.selectNodeContents(document.querySelector('#slide-canvas h2'));
      for (let i = 0; i < 60; i++) { const blocks = [tt, ...root.querySelectorAll('ul, a')].map(e => e.getBoundingClientRect()); let n = 0;
        gs.forEach((g, k) => { if (g.getAnimations().length) { n++; seen.add(k); if (blocks.some(b => hit(g.getBoundingClientRect(), b))) bad++; const gr = g.getBoundingClientRect(), cx = (gr.left + gr.right) / 2, cy = (gr.top + gr.bottom) / 2; if (blocks.some(b => cx > b.left && cx < b.right && cy > b.top && cy < b.bottom)) cbad++; } });
        max = Math.max(max, n); await new Promise(r => setTimeout(r, 100)); }
      return { distinctLit: seen.size, maxConcurrent: max, overlapSamples: bad, centreInBlockSamples: cbad };
    });
    console.log(`twinkle 6s ${w}x${h}`, J(tw));
    if (w === 1280) {
      await show(p, '関内バックギャモンの会で始めよう');
      await p.evaluate(() => { isMuted = true; playbackRate = 2; isPlaying = true; speechRunId++; });
      await sleep(11000 + 100); await p.screenshot({ path: `${OUT}/verifier-kannai-t22.png` });
    }
    await p.close();
  }
  for (const [w, h] of [[1280, 800], [915, 412], [412, 915]]) {
    const p = await open(browser, w, h); await show(p, 'バックギャモンの歴史は古い'); await sleep(300);
    const r = await p.evaluate(() => {
      const root = document.querySelector('#slide-canvas .relative.h-full.overflow-hidden') || document.getElementById('slide-canvas').firstElementChild;
      const R = root.getBoundingClientRect();
      const leaves = [...root.querySelectorAll('*')].filter(e => e.children.length === 0 && (e.textContent.trim() || e.tagName === 'IMG') && !e.matches('img.absolute.inset-0') && e.getBoundingClientRect().width > 0);
      const img0 = [...root.querySelectorAll('#history-say img')].map(e => e.getBoundingClientRect());
      const credit = leaves.find(e => e.textContent.startsWith('写真')); const C = credit && credit.getBoundingClientRect();
      const hl = document.getElementById('history-line').getBoundingClientRect();
      const body = leaves.filter(e => e !== credit && !e.closest('h2') && e.tagName !== 'IMG' || (e.tagName === 'IMG' && e.closest('#history-say')));
      let mb = -1, mr = -1, ml = 1e9; body.forEach(e => { const q = e.getBoundingClientRect(); mb = Math.max(mb, q.bottom); mr = Math.max(mr, q.right); ml = Math.min(ml, q.left); });
      const lastText = body.filter(e => e.tagName !== 'IMG').map(e => e.getBoundingClientRect().bottom);
      return { rootB: R.bottom, rootR: R.right, rootL: R.left, maxBottom: mb, maxRight: mr, minLeft: ml, insideRoot: mb <= R.bottom + 0.5 && mr <= R.right + 0.5 && ml >= R.left - 0.5,
        lineInside: hl.left >= R.left && hl.right <= R.right && hl.bottom <= R.bottom, creditTop: C && C.top, lastTextBottom: Math.max(...lastText), textVsCreditOverlap: C ? Math.max(0, Math.max(...lastText) - C.top) : null };
    });
    console.log(`history fit ${w}x${h}`, J(r, (k, x) => typeof x === 'number' ? +x.toFixed(1) : x));
    await p.close();
  }
  { const p = await open(browser, 1280, 800); await show(p, 'バックギャモンの歴史は古い');
    await p.evaluate(() => { isMuted = true; playbackRate = 2; isPlaying = true; speechRunId++; });
    await sleep(5000 + 100); await p.screenshot({ path: `${OUT}/verifier-history-t10-strong.png` }); await p.close(); }
  console.log('ERRORS(084):', errs.slice(e0).length ? errs.slice(e0) : 'none');
  await browser.close();
};

// ---- 世界の写真・締めくくり ----
const run085 = async () => {
  const browser = await chromium.launch(); const e0 = errs.length;
  console.log('\n## 085');
  let p = await open(browser, 1280, 800); await show(p, '世界中でプレーされている');
  for (const [t, v] of await timeline(p, [0.1, 2.0, 5, 11], () => ({ n: document.getElementById('world-count').textContent,
    ph: [...document.querySelectorAll('#world-photos [data-cue]')].map(e => { const cs = getComputedStyle(e); const m = new DOMMatrix(cs.transform); return `${e.dataset.cue}:op${(+cs.opacity).toFixed(2)}:deg${(Math.atan2(m.b, m.a) * 180 / Math.PI).toFixed(1)}:sc${Math.hypot(m.a, m.b).toFixed(2)}`; }) }))) console.log('world t=', t, J(v));
  await p.close();
  p = await open(browser, 1280, 800); await show(p, '関内バックギャモンの会で始めよう');
  console.log('last slide', J(await p.evaluate(() => { const s = slideData[slideData.length - 1]; return { title: s.title, duration: s.duration, tail: s.narration.slice(-30) }; })));
  for (const [t, v] of await timeline(p, [25], () => ({ say: [...document.querySelectorAll('[data-say]')].map(e => (e.classList.contains('ring-4') || e.classList.contains('ring-[0.7cqw]')) ? 1 : 0).join('') }))) console.log('karena t=', t, J(v));
  await p.close();
  console.log('ERRORS(085):', errs.slice(e0).length ? errs.slice(e0) : 'none');
  await browser.close();
};

// ---- TODO-085・086 ----
const { execFileSync } = require('child_process');
const run086 = async () => {
  const browser = await chromium.launch(); const e0 = errs.length;
  console.log('\n## 085/086');
  const TT = ['表紙', 'バックギャモンとは', 'バックギャモンの歴史は古い', '世界中でプレーされている', '世界中で日本人が大活躍', '魅力① 簡単で手軽', '魅力② ゲームとしての面白さ', '魅力③ おしゃれ', '関内バックギャモンの会で始めよう'];
  for (const [w, h] of [[1280, 800], [412, 915]]) {
    const p = await open(browser, w, h);
    if (w === 1280) {
      for (const t of TT) { await show(p, t);
        console.log('filter/opacity', t, J(await p.evaluate(() => { const i = document.querySelector('#slide-canvas > div > img, #slide-canvas .relative.h-full.overflow-hidden > img'); const cs = getComputedStyle(i); return { filter: cs.filter, opacity: cs.opacity }; }))); }
      // 背景だけの明るさ
      for (const [t, f] of [['バックギャモンとは', 'toha'], ['世界中でプレーされている', 'world'], ['世界中で日本人が大活躍', 'japan']]) {
        await show(p, t); await sleep(500);
        await p.evaluate(() => { const root = document.querySelector('#slide-canvas .relative.h-full.overflow-hidden'); [...root.children].forEach(c => { if (c.tagName !== 'IMG' && !(c.className.includes('inset-0'))) c.style.visibility = 'hidden'; }); });
        const el = await p.$('#slide-canvas .relative.h-full.overflow-hidden'); const png = `${OUT}/verifier-bgonly-${f}.png`; await el.screenshot({ path: png });
        const m = execFileSync('python3', ['-c', `from PIL import Image,ImageStat;print(round(ImageStat.Stat(Image.open('${png}').convert('L')).mean[0],1))`]).toString().trim();
        console.log('bg-only mean', t, m);
        await show(p, t); await sleep(500);
        const el2 = await p.$('#slide-canvas .relative.h-full.overflow-hidden'); await el2.screenshot({ path: `${OUT}/verifier-final-${f}.png` });
      }
    }
    await show(p, '世界中で日本人が大活躍'); await sleep(300);
    console.log(`japan credit ${w}x${h}`, J(await p.evaluate(() => {
      const root = document.querySelector('#slide-canvas .relative.h-full.overflow-hidden'); const R = root.getBoundingClientRect();
      const c = [...root.children].find(e => e.textContent.startsWith('写真（望月プロ）')); const C = c.getBoundingClientRect();
      const band = document.querySelector('[data-say="17"]').getBoundingClientRect();
      return { text: c.textContent, left: c.className.includes('left-['), cLeftOfRoot: C.left - R.left, cBottomGap: R.bottom - C.bottom, inside: C.left >= R.left && C.right <= R.right && C.bottom <= R.bottom + 0.5 && C.top >= R.top, bandBottom: band.bottom, creditTop: C.top, overlapBand: Math.max(0, band.bottom - C.top), lines: Math.round(C.height / (parseFloat(getComputedStyle(c).fontSize) * 1.5)), h: C.height, w: C.width };
    }), (k, x) => typeof x === 'number' ? +x.toFixed(1) : x));
    await p.close();
  }
  console.log('ERRORS(085/086):', errs.slice(e0).length ? errs.slice(e0) : 'none');
  await browser.close();
};

// ---- TODO-087・088 ----
const run087 = async () => {
  const browser = await chromium.launch(); const e0 = errs.length;
  console.log('\n## 087/088');
  const SH = [['表紙', 'cover'], ['バックギャモンとは', 'toha'], ['魅力① 簡単で手軽', 'easy'], ['魅力② ゲームとしての面白さ', 'fun'], ['魅力③ おしゃれ', 'style']];
  let p = await open(browser, 1280, 800);
  for (const [t, f] of SH) {
    await show(p, t); await sleep(500);
    await p.evaluate(() => { const root = document.querySelector('#slide-canvas .relative.h-full.overflow-hidden') || document.getElementById('slide-canvas').firstElementChild; [...root.children].forEach(c => { if (c.tagName !== 'IMG' && !c.className.includes('inset-0') && !c.className.includes('blur-')) c.style.visibility = 'hidden'; }); });
    const el = await p.evaluateHandle(() => document.querySelector('#slide-canvas .relative.h-full.overflow-hidden') || document.getElementById('slide-canvas').firstElementChild);
    const png = `${OUT}/verifier-bgonly-${f}.png`; await el.asElement().screenshot({ path: png });
    const m = execFileSync('python3', ['-c', `from PIL import Image,ImageStat;print(round(ImageStat.Stat(Image.open('${png}').convert('L')).mean[0],1))`]).toString().trim();
    console.log('bg-only mean', t, m);
    await show(p, t); await sleep(500);
    const e2 = await p.evaluateHandle(() => document.querySelector('#slide-canvas .relative.h-full.overflow-hidden') || document.getElementById('slide-canvas').firstElementChild);
    await e2.asElement().screenshot({ path: `${OUT}/verifier-final2-${f}.png` });
    console.log('img', t, J(await p.evaluate(() => { const i = document.querySelector('#slide-canvas img'); const cs = getComputedStyle(i); return { src: i.getAttribute('src'), filter: cs.filter, opacity: cs.opacity, natW: i.naturalWidth }; })));
  }
  await p.close();
  for (const [w, h] of [[1280, 800], [1024, 768], [915, 412], [412, 915]]) {
    p = await open(browser, w, h); await show(p, '魅力③ おしゃれ'); await sleep(500);
    const r = await p.evaluate(() => {
      const root = document.querySelector('#slide-canvas .relative.h-full.overflow-hidden'); const R = root.getBoundingClientRect();
      const bgCredit = [...root.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.includes('背景')).map(e => e.textContent);
      const ph = [...root.querySelectorAll('p')].find(e => e.textContent.startsWith('写真（一部切り出し）')); const P = ph.getBoundingClientRect();
      const imgs = ['bg-board1.jpg', 'bg-board2.jpg', 'bg-board3.jpg'].map(n => root.querySelector(`img[src$="${n}"]`).getBoundingClientRect());
      const ov = (a, b) => !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
      return { bgCreditEls: bgCredit, bgImgSrc: root.querySelector('img').getAttribute('src'), natW: root.querySelector('img').naturalWidth,
        photoCreditInside: P.left >= R.left - 0.5 && P.right <= R.right + 0.5 && P.top >= R.top && P.bottom <= R.bottom + 0.5, overlapPhotos: imgs.map(i => ov(P, i)), P: [P.left, P.top, P.right, P.bottom].map(x => +x.toFixed(1)), R: [R.left, R.top, R.right, R.bottom].map(x => +x.toFixed(1)),
        board3Bottom: +imgs[2].bottom.toFixed(1), board2Bottom: +imgs[1].bottom.toFixed(1), bg: getComputedStyle(ph).backgroundColor, color: getComputedStyle(ph).color };
    });
    console.log(`style credit ${w}x${h}`, J(r)); await p.close();
  }
  console.log('ERRORS(087/088):', errs.slice(e0).length ? errs.slice(e0) : 'none');
  await browser.close();
};

// ---- TODO-087・089（魅力③、写真 4 枚）----
const run089 = async () => {
  const browser = await chromium.launch(); const e0 = errs.length;
  console.log('\n## 089');
  for (const [w, h] of [[1280, 800], [1024, 768], [915, 412], [412, 915]]) {
    const p = await open(browser, w, h); await show(p, '魅力③ おしゃれ'); await sleep(500);
    const r = await p.evaluate(() => {
      const root = document.querySelector('#slide-canvas .relative.h-full.overflow-hidden'); const R = root.getBoundingClientRect();
      const poly = (e) => { const q = e.getBoundingClientRect(); const m = new DOMMatrix(getComputedStyle(e).transform); const a = Math.atan2(m.b, m.a); const sc = R.width / root.offsetWidth; const W = e.offsetWidth * sc, H = e.offsetHeight * sc; const cx = (q.left + q.right) / 2, cy = (q.top + q.bottom) / 2;
        return [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy]) => { const x = sx * W / 2, y = sy * H / 2; return [cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)]; }); };
      const rectPoly = (b) => [[b.left, b.top], [b.right, b.top], [b.right, b.bottom], [b.left, b.bottom]];
      const sat = (A, B) => { for (const P of [A, B]) for (let i = 0; i < 4; i++) { const [x1, y1] = P[i], [x2, y2] = P[(i + 1) % 4]; const nx = y2 - y1, ny = x1 - x2; const pr = (Q) => Q.map(([x, y]) => x * nx + y * ny); const a = pr(A), b = pr(B); if (Math.max(...a) <= Math.min(...b) || Math.max(...b) <= Math.min(...a)) return false; } return true; };
      const names = ['bg-board1.jpg', 'bg-board4.jpg', 'bg-board2.jpg', 'bg-board3.jpg'];
      const imgs = names.map(n => root.querySelector(`img[src$="${n}"]`));
      const lis = [...root.querySelectorAll('#style-photos ul > li')].map(l => rectPoly(l.getBoundingClientRect()));
      const ph = [...root.querySelectorAll('p')].find(e => e.textContent.startsWith('写真（一部切り出し）')); const P = rectPoly(ph.getBoundingClientRect()); const PB = ph.getBoundingClientRect();
      const inside = (e) => poly(e).every(([x, y]) => x >= R.left - 0.5 && x <= R.right + 0.5 && y >= R.top - 0.5 && y <= R.bottom + 0.5);
      const bgCredit = [...root.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.includes('背景')).map(e => e.textContent);
      return { liOverlap: imgs.map(i => lis.map(l => sat(poly(i), l))), creditOverlap: imgs.map(i => sat(poly(i), P)), imgInsideRoot: imgs.map(inside),
        creditInside: PB.left >= R.left - 0.5 && PB.right <= R.right + 0.5 && PB.bottom <= R.bottom + 0.5, creditText: ph.textContent, bgCredit,
        natW: imgs.map(i => i.naturalWidth), bgSrc: root.querySelector('img').getAttribute('src'), bgNat: root.querySelector('img').naturalWidth };
    });
    console.log(`style ${w}x${h}`, J(r)); await p.close();
  }
  const p = await open(browser, 1280, 800); await show(p, '魅力③ おしゃれ');
  for (const [t, v] of await timeline(p, [2.5, 3.5, 5, 7], () => [...document.querySelectorAll('#style-photos img[data-cue]')].map(e => { const cs = getComputedStyle(e); const m = new DOMMatrix(cs.transform); return `${e.dataset.cue}:op${(+cs.opacity).toFixed(2)}:deg${(Math.atan2(m.b, m.a) * 180 / Math.PI).toFixed(1)}:sc${Math.hypot(m.a, m.b).toFixed(2)}:ty${m.f.toFixed(1)}`; }))) console.log('style t=', t, J(v));
  await p.close();
  console.log('ERRORS(089):', errs.slice(e0).length ? errs.slice(e0) : 'none');
  await browser.close();
};

// ---- TODO-090 ----
const run090 = async () => {
  const browser = await chromium.launch(); const e0 = errs.length;
  console.log('\n## 090');
  for (const [w, h] of [[1280, 800], [412, 915]]) {
    const p = await open(browser, w, h); await show(p, '魅力② ゲームとしての面白さ'); await sleep(800);
    const r = await p.evaluate(() => {
      const cards = [...document.querySelectorAll('#fun-say > div')];
      const f = (q) => { const b = q.getBoundingClientRect(); return { w: +b.width.toFixed(1), h: +b.height.toFixed(1), top: +b.top.toFixed(1) }; };
      return { imgs: cards.map(c => { const i = c.querySelector('img'); return { src: i.getAttribute('src'), nat: i.naturalWidth + 'x' + i.naturalHeight, alt: i.alt, box: f(i), ratio: +(i.getBoundingClientRect().width / i.getBoundingClientRect().height).toFixed(3), fit: getComputedStyle(i).objectFit }; }),
        textTops: cards.map(c => f(c.lastElementChild).top), cardTops: cards.map(c => f(c).top), cardH: cards.map(c => f(c).h) };
    });
    console.log(`fun ${w}x${h}`, J(r));
    if (w === 1280) { const el = await p.evaluateHandle(() => document.querySelector('#slide-canvas .relative.h-full.overflow-hidden')); await el.asElement().screenshot({ path: `${OUT}/verifier-fun-090.png` }); }
    await p.close();
  }
  console.log('ERRORS(090):', errs.slice(e0).length ? errs.slice(e0) : 'none');
  await browser.close();
};

// ---- TODO-091 ----
const fs = require('fs');
const FS = () => { document.getElementById('player-viewport').classList.add('pseudo-fullscreen'); document.getElementById('viewport-stage').classList.add('is-fullscreen'); };
const ROOT = () => document.querySelector('#slide-canvas .relative.h-full.overflow-hidden') || document.getElementById('slide-canvas').firstElementChild;
const TM = (a) => a.map(x => { const t = x.effect.getTiming(); return `delay${t.delay}/dur${t.duration}`; });
const run091 = async () => {
  const browser = await chromium.launch(); const e0 = errs.length;
  console.log('\n## 091');
  // 1. 表紙
  let p = await open(browser, 1280, 800); await show(p, '表紙');
  console.log('1 cover', J(await p.evaluate(() => ({ line: [...document.getElementById('cover-line').getAnimations()].map(x => { const t = x.effect.getTiming(); return [t.delay, t.duration]; }), dice: [...document.getElementById('cover-dice').getAnimations()].map(x => { const t = x.effect.getTiming(); return [t.delay, t.duration]; }) }))));
  // 2. とは
  await show(p, 'バックギャモンとは');
  console.log('2 rules d', await p.evaluate(() => document.getElementById('rules-track').getAttribute('d')));
  console.log('2 rules fights', J(await p.evaluate(async () => { const sp = document.getElementById('rules-sparks'); let prev = false, fights = 0, minX = null; const hd = document.getElementById('rules-head-white');
    for (let i = 0; i < 60; i++) { const on = sp.children.length > 0; if (on && !prev) fights++; prev = on; await new Promise(r => setTimeout(r, 100)); } return { fights, spId: !!sp }; })));
  await p.close();
  // 3. 世界
  p = await open(browser, 1280, 800); await show(p, '世界中でプレーされている');
  for (const [t, v] of await timeline(p, [0.1, 4, 9], () => document.getElementById('world-count').textContent)) console.log('3 world t=', t, v);
  await p.close();
  // 4. 魅力①
  p = await open(browser, 1280, 800); await show(p, '魅力① 簡単で手軽');
  console.log('4 easy', J(await p.evaluate(() => { const s = slideData.find(s => s.title === '魅力① 簡単で手軽'); return { dur: s.duration, has: s.narration.includes('1ゲームは15分ほどと短いので、何局も続けて楽しめます。'), says: [...document.querySelectorAll('[data-say]')].map(e => e.dataset.say) }; })));
  for (const [t, v] of await timeline(p, [2, 6, 10, 14, 17], RING)) console.log('4 easy t=', t, J(v));
  await p.close();
  // 5. 魅力②
  p = await open(browser, 1280, 800); await show(p, '魅力② ゲームとしての面白さ');
  console.log('5 fun', J(await p.evaluate(() => { const s = slideData.find(s => s.title === '魅力② ゲームとしての面白さ'); return { dur: s.duration, starts: s.narration.startsWith('ゲームとしての主な魅力は次のとおりです。'), says: [...document.querySelectorAll('[data-say]')].map(e => e.dataset.say), filter: getComputedStyle(document.querySelector('#slide-canvas img')).filter }; })));
  for (const [t, v] of await timeline(p, [2, 8, 15, 20, 24], RING)) console.log('5 fun t=', t, J(v));
  await p.close();
  // 6. 魅力③ 5 条件
  const styleChk = () => {
    const root = document.querySelector('#slide-canvas .relative.h-full.overflow-hidden'); const R = root.getBoundingClientRect();
    let c = root.parentElement; while (c && getComputedStyle(c).containerType === 'normal') c = c.parentElement; const cqw = c.getBoundingClientRect().width / 100;
    const poly = (e) => { const q = e.getBoundingClientRect(); const m = new DOMMatrix(getComputedStyle(e).transform); const a = Math.atan2(m.b, m.a); const sc = R.width / root.offsetWidth; const W = e.offsetWidth * sc, H = e.offsetHeight * sc; const cx = (q.left + q.right) / 2, cy = (q.top + q.bottom) / 2;
      return [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy]) => { const x = sx * W / 2, y = sy * H / 2; return [cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)]; }); };
    const rp = (b) => [[b.left, b.top], [b.right, b.top], [b.right, b.bottom], [b.left, b.bottom]];
    const sat = (A, B) => { for (const P of [A, B]) for (let i = 0; i < 4; i++) { const [x1, y1] = P[i], [x2, y2] = P[(i + 1) % 4]; const nx = y2 - y1, ny = x1 - x2; const pr = (Q) => Q.map(([x, y]) => x * nx + y * ny); const a = pr(A), b = pr(B); if (Math.max(...a) <= Math.min(...b) || Math.max(...b) <= Math.min(...a)) return false; } return true; };
    const imgs = [...root.querySelectorAll('#style-photos img[data-cue]')]; const polys = imgs.map(poly);
    const lis = [...root.querySelectorAll('#style-photos ul > li')].map(l => rp(l.getBoundingClientRect()));
    const ph = [...root.querySelectorAll('p')].find(e => e.textContent.startsWith('写真（一部切り出し）')); const PB = ph.getBoundingClientRect();
    const xs = polys.flat().map(q => q[0]), ys = polys.flat().map(q => q[1]);
    const bgImg = root.querySelector('img');
    return { n: imgs.length, bgOpacity: getComputedStyle(bgImg).opacity, liOv: polys.map(P => lis.map(l => sat(P, l))).flat().some(Boolean), crOv: polys.map(P => sat(P, rp(PB))).some(Boolean),
      inRoot: polys.every(P => P.every(([x, y]) => x >= R.left - 0.5 && x <= R.right + 0.5 && y >= R.top - 0.5 && y <= R.bottom + 0.5)), crInRoot: PB.left >= R.left - 0.5 && PB.right <= R.right + 0.5 && PB.bottom <= R.bottom + 0.5,
      photosWpx: +(Math.max(...xs) - Math.min(...xs)).toFixed(1), photosWcqw: +((Math.max(...xs) - Math.min(...xs)) / cqw).toFixed(2), photosHcqw: +((Math.max(...ys) - Math.min(...ys)) / cqw).toFixed(2), liRightCqw: +(Math.max(...lis.map(l => l[1][0])) / cqw).toFixed(2) };
  };
  for (const [w, h, full] of [[1280, 800, 0], [1024, 768, 0], [915, 412, 0], [412, 915, 0], [1920, 1080, 1]]) {
    p = await open(browser, w, h); if (full) await p.evaluate(FS); await show(p, '魅力③ おしゃれ'); await sleep(500);
    console.log(`6 style ${w}x${h}${full ? ' FULL' : ''}`, J(await p.evaluate(styleChk))); await p.close();
  }
  // 7. 関内
  for (const [w, h] of [[1280, 800], [1024, 768], [915, 412], [412, 915]]) {
    p = await open(browser, w, h); await show(p, '関内バックギャモンの会で始めよう'); await sleep(500);
    console.log(`7 karena ${w}x${h}`, J(await p.evaluate(() => { const root = document.querySelector('#slide-canvas .relative.h-full.overflow-hidden'); const R = root.getBoundingClientRect();
      const col = document.querySelector('#karena-say > div'); const tr = document.createRange(); tr.selectNodeContents(document.querySelector('#slide-canvas h2')); const H = tr.getBoundingClientRect();
      const bs = [document.querySelector('#karena-say ul'), ...document.querySelectorAll('#karena-say a')].map(e => e.getBoundingClientRect());
      return { mb6: col.className.includes('mb-[6cqw]'), inside: bs.every(b => b.left >= R.left && b.right <= R.right + 0.5 && b.bottom <= R.bottom + 0.5 && b.top >= R.top), belowTitle: bs.map(b => +(b.top - H.bottom).toFixed(1)), ulTop: +bs[0].top.toFixed(1), titleBottom: +H.bottom.toFixed(1) }; }))); await p.close();
  }
  // 8. clamp / 全 9 枚
  const src = fs.readFileSync(`${__dirname}/../../../slides/backgammon.js`, 'utf8');
  console.log('8 clamp( (JS 関数 clamp を除く):', (src.match(/(?<![\w])clamp\((?![a-z]*\)|s\))/g) || []).length, ' CSS clamp( 行:', src.split('\n').filter(l => /clamp\([^)]*rem/.test(l)).length, ' max(…rem:', (src.match(/max\([^)]*rem/g) || []).length);
  console.log('8 all clamp( lines:', src.split('\n').map((l, i) => /clamp\(/.test(l) ? i + 1 + ':' + l.trim().slice(0, 60) : null).filter(Boolean).join(' | '));
  const TT = ['表紙', 'バックギャモンとは', 'バックギャモンの歴史は古い', '世界中でプレーされている', '世界中で日本人が大活躍', '魅力① 簡単で手軽', '魅力② ゲームとしての面白さ', '魅力③ おしゃれ', '関内バックギャモンの会で始めよう'];
  const fit = () => { const root = document.querySelector('#slide-canvas .relative.h-full.overflow-hidden'); const R = root.getBoundingClientRect();
    const skip = (e) => e.closest('#karena-lights') || (e.className && typeof e.className === 'string' && (e.className.includes('inset-0') || e.className.includes('blur-'))) || e.closest('svg');
    const els = [...root.querySelectorAll('*')].filter(e => !skip(e) && (e.tagName === 'IMG' || (e.children.length === 0 && e.textContent.trim())) && e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== 'hidden');
    const out = els.filter(e => { const b = e.getBoundingClientRect(); return b.left < R.left - 0.5 || b.right > R.right + 0.5 || b.top < R.top - 0.5 || b.bottom > R.bottom + 0.5; }).map(e => (e.tagName + ':' + (e.textContent.trim().slice(0, 14) || e.getAttribute('src'))));
    const credits = [...root.querySelectorAll('*')].filter(e => typeof e.className === 'string' && e.className.includes('bottom-[0.8cqw]') && e.textContent.trim()).map(e => ({ t: e.textContent.trim().slice(0, 10), b: e.getBoundingClientRect() }));
    const ov = (a, b) => !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
    const crOv = []; for (let i = 0; i < credits.length; i++) for (let j = i + 1; j < credits.length; j++) if (ov(credits[i].b, credits[j].b)) crOv.push(credits[i].t + '×' + credits[j].t);
    const photos = [...root.querySelectorAll('img')].filter(e => !e.className.includes('inset-0') && !e.className.includes('w-full h-full')); const crPh = [];
    for (const c of credits) for (const ph of photos) if (ov(c.b, ph.getBoundingClientRect())) crPh.push(c.t + '×' + (ph.getAttribute('src') || '').slice(-14));
    const textOv = []; for (const c of credits) for (const e of root.querySelectorAll('h2, li, a, p, span, div')) { if (e.children.length || !e.textContent.trim() || e.closest('[class*="bottom-[0.8cqw]"]')) continue; if (ov(c.b, e.getBoundingClientRect())) textOv.push(c.t + '×' + e.textContent.trim().slice(0, 10)); }
    return { out, nCredits: credits.length, crOv, crPh, crTextOv: textOv }; };
  for (const [w, h] of [[1024, 768], [915, 412]]) {
    p = await open(browser, w, h);
    for (const t of TT) { await show(p, t); await sleep(400); console.log(`8 fit ${w}x${h} ${t}`, J(await p.evaluate(fit))); }
    await p.close();
  }
  // 9 + 全画面スクリーンショット
  p = await open(browser, 1920, 1080); await p.evaluate(FS);
  for (let i = 0; i < TT.length; i++) { await show(p, TT[i]); await sleep(500); await p.screenshot({ path: `${OUT}/verifier-full-${i + 1}.png` }); }
  console.log('9 subtitle', J(await p.evaluate(() => { const b = document.getElementById('subtitle-banner'); const c = document.getElementById('caption-text'); return { banner: getComputedStyle(b).fontSize, caption: c && getComputedStyle(c).fontSize, bannerDisplay: getComputedStyle(b).display, stage: document.getElementById('viewport-stage').getBoundingClientRect().width }; })));
  await p.close();
  console.log('ERRORS(091):', errs.slice(e0).length ? errs.slice(e0) : 'none');
  await browser.close();
};
