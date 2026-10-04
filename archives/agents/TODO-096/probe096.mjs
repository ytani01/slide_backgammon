// usage: NP=/home/ytani/work/star-base-defender/tests/node_modules node probe096.mjs
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(process.env.NP + '/');
const { chromium } = require('playwright');
const D = new URL('.', import.meta.url).pathname;
const b = await chromium.launch();
const URL_ = 'http://localhost:8000/player.html?slides=backgammon#2';
const errs = [];
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
p.on('pageerror', e => errs.push(e.message));
await p.goto(URL_); await p.waitForTimeout(3000);
await p.screenshot({ path: D + 'shot-board.png' });
const geo = await p.evaluate(() => [-1,0,1].map(k => { const e = document.getElementById('rules-track-'+k); const r = e.getBoundingClientRect(); return {k, l:r.left, t:r.top, r:r.right, b:r.bottom}; }));
console.log('track bbox', JSON.stringify(geo));
const read = () => p.evaluate(() => {
  const o = {};
  for (const k of [-1,0,1]) {
    for (const c of ['white','brown']) { const h = document.getElementById(`rules-head-${c}-${k}`); o[c+k] = [h.getAttribute('visibility'), h.getAttribute('transform')]; }
    const s = document.getElementById('rules-sparks-'+k);
    o['sp'+k] = [s.querySelectorAll('line').length, s.querySelectorAll('rect').length];
  }
  return o;
});
const rows = []; let shotSpark = false, shotWall = false;
const t0 = Date.now();
while (Date.now() - t0 < 30000) {
  const o = await read(); o.t = (Date.now() - t0) / 1000; rows.push(o);
  if (!shotSpark && [-1,0,1].some(k => o['sp'+k][0] > 0)) { shotSpark = true; await p.screenshot({ path: D + 'shot-spark.png' }); }
  if (!shotWall && [-1,0,1].some(k => o['sp'+k][1] > 0)) { shotWall = true; await p.screenshot({ path: D + 'shot-wall.png' }); }
  await p.waitForTimeout(250);
}
fs.writeFileSync(D + 'samples.json', JSON.stringify(rows));
const xy = s => s && s.match(/translate\(([-\d.e]+) ([-\d.e]+)\)/).slice(1).map(Number);
// 2: per head: visible-run starts and traverse durations
for (const k of [-1,0,1]) for (const c of ['white','brown']) {
  const key = c + k; const runs = []; let st = null, prev = null;
  for (const r of rows) {
    const vis = r[key][0] === 'visible';
    if (vis && st === null) st = r.t;
    if (!vis && st !== null) { runs.push([st, r.t]); st = null; }
  }
  // speed: mean |dpos| per sec while visible and moving
  let tot = 0, n = 0;
  for (let i = 1; i < rows.length; i++) { if (rows[i][key][0]==='visible' && rows[i-1][key][0]==='visible') { const a = xy(rows[i][key][1]), c2 = xy(rows[i-1][key][1]); const d = Math.hypot(a[0]-c2[0], a[1]-c2[1]); if (d>0.5 && d<80) { tot += d/(rows[i].t-rows[i-1].t); n++; } } }
  console.log(key, 'visible runs(start-end s):', runs.map(r => r[0].toFixed(1)+'-'+r[1].toFixed(1)).join(' '), 'mean px/s', (tot/n).toFixed(0));
}
// 3: sparks/wall counts and freeze
for (const k of [-1,0,1]) {
  const L = rows.filter(r => r['sp'+k][0] > 0).length, W = rows.filter(r => r['sp'+k][1] > 0).length;
  // wall episodes
  let eps = [], cur = null;
  rows.forEach((r, i) => { const w = r['sp'+k][1] > 0; if (w && !cur) cur = [i, i]; else if (w) cur[1] = i; else if (cur) { eps.push(cur); cur = null; } });
  if (cur) eps.push(cur);
  const info = eps.map(([i, j]) => { let same = true; for (let m = i+1; m <= j; m++) for (const c of ['white','brown']) if (rows[m][c+k][1] !== rows[i][c+k][1]) same = false; return `wall ${rows[i].t.toFixed(1)}-${rows[j].t.toFixed(1)}s (${(rows[j].t-rows[i].t+0.25).toFixed(2)}s) heads-frozen=${same}`; });
  console.log('track', k, 'spark samples', L, 'wall samples', W, info.join(' | '));
}
await p.close();
const q = await b.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' });
q.on('pageerror', e => errs.push('RM ' + e.message));
await q.goto(URL_); await q.waitForTimeout(3000);
const rd = () => q.evaluate(() => [...document.querySelectorAll('[id^=rules-head]')].map(h => h.id + ' ' + h.getAttribute('visibility') + ' ' + h.getAttribute('transform')));
const a = await rd(); await q.waitForTimeout(2500); const c = await rd();
console.log('reduced', a.length, 'same:', JSON.stringify(a) === JSON.stringify(c)); console.log(a.join('\n'));
await q.screenshot({ path: D + 'shot-reduced.png' });
console.log('pageerrors', JSON.stringify(errs));
await b.close();
