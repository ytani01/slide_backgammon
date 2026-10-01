// TODO-073 verifier: node archives/agents/TODO-073/verifier-measure.js
const { createRequire } = require('module');
const req = createRequire('/home/ytani/.local/share/mise/installs/npm-playwright/latest/node_modules/');
const { chromium } = req('playwright');
const OUT = __dirname;
const URL = 'http://localhost:8000/player.html?slides=backgammon#3';
const state = (page) => page.evaluate(() => {
  const l = document.getElementById('history-line');
  return l && { clip: l.style.clipPath, heads: [...document.querySelectorAll('[data-history-head]')].map(h => h.style.opacity),
    isPlaying, muted: isMuted, run: speechRunId };
});
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function scenario(browser, w, h, reduced, shots) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  await page.goto(URL); await page.waitForSelector('#history-line'); await sleep(1500);
  const tag = `${w}${reduced ? 'r' : ''}`;
  console.log(`[${tag}] before play`, JSON.stringify(await state(page)));
  if (shots.includes(-1)) await page.screenshot({ path: `${OUT}/verifier-${tag}-before.png` });
  // 再生開始。ページ内で rAF ごとに clip-path の右側 inset を記録
  await page.evaluate(() => {
    window.__log = []; window.__t0 = null;
    const l = document.getElementById('history-line');
    const f = () => { if (window.__t0 !== null) window.__log.push([(performance.now() - window.__t0) / 1000, parseFloat((l.style.clipPath.match(/inset\(0px ([\d.]+)%/) || l.style.clipPath.match(/inset\(0 ([\d.]+)%/) || [0, NaN])[1])]); requestAnimationFrame(f); };
    requestAnimationFrame(f);
  });
  const t0 = Date.now();
  await page.evaluate(() => { window.__t0 = performance.now(); }); await page.click('#play-btn');
  for (const s of [0, 5, 10, 12, 16]) {
    const wait = s * 1000 - (Date.now() - t0); if (wait > 0) await sleep(wait);
    const st = await state(page);
    console.log(`[${tag}] t=${((Date.now() - t0) / 1000).toFixed(2)}s`, JSON.stringify(st));
    if (shots.includes(s)) await page.screenshot({ path: `${OUT}/verifier-${tag}-${s}s.png` });
  }
  const log = await page.evaluate(() => window.__log);
  const ins = log.filter(x => !isNaN(x[1]));
  const first = ins.find(x => x[0] > 1 && x[1] < 99.9), at = (t) => ins.find(x => x[0] >= t);
  // 停止区間: 値が変わらない最長区間を、中央付近で探す
  let plateau = null; for (let i = 1; i < ins.length; i++) if (ins[i][0] > 10 && Math.abs(ins[i][1] - ins[i-1][1]) < 0.01 && ins[i][1] > 1 && ins[i][1] < 99) { plateau = plateau || [ins[i][0], ins[i][1]]; }
  const mid = ins.filter(x => x[0] > 10.3 && x[0] < 12.3).map(x => x[1]);
  console.log(`[${tag}] first<100 at`, first && first[0].toFixed(2), 'inset=', first && first[1].toFixed(2),
    '; inset 10.3-12.3s min/max', Math.min(...mid).toFixed(2), Math.max(...mid).toFixed(2),
    '; first drop after 12.3s at', (ins.find(x => x[0] > 12.3 && x[1] < Math.min(...mid) - 0.5) || [NaN])[0].toFixed?.(2));
  console.log(`[${tag}] min inset in first 8s`, Math.min(...ins.filter(x => x[0] < 8).map(x => x[1])), 'max', Math.max(...ins.filter(x => x[0] < 8).map(x => x[1])));
  if (tag === '1280') { // 5. 一時停止（新しいページで、9.5 秒＝1 区間目の伸びている途中で止める）
    const p2 = await ctx.newPage(); await p2.goto(URL); await p2.waitForSelector('#history-line'); await sleep(1000);
    await p2.click('#play-btn'); await sleep(9500); await p2.click('#play-btn'); await sleep(200);
    const a = await state(p2); await sleep(2000); const b = await state(p2);
    console.log(`[${tag}] paused at ~9.5s`, a.clip, '->', b.clip, 'isPlaying', a.isPlaying, b.isPlaying);
  }
  await ctx.close();
}
(async () => {
  const browser = await chromium.launch();
  await scenario(browser, 1280, 800, false, [-1, 0, 10, 16]);
  await scenario(browser, 412, 915, false, [0, 16]);
  await scenario(browser, 1280, 800, true, []);
  await browser.close();
})();
