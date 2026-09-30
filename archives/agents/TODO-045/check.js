// usage: node check.js  (リポジトリ直下で実行)
const fs = require('fs'), vm = require('vm'), cp = require('child_process');
const load = (src) => {
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(src + '\n;this.c=slidesConfig;this.d=slideData;', ctx);
  return ctx;
};
const after = load(fs.readFileSync('slides/backgammon.js', 'utf8'));
const before = load(cp.execSync('git show HEAD:slides/backgammon.js', {encoding:'utf8'}));
const html = fs.readFileSync('player.html', 'utf8');
const m = html.match(/const SPEECH_RULES = (\[[\s\S]*?\n        \]);/);
const SPEECH = vm.runInNewContext(m[1]);
const prep = (cfg, t) => (cfg.rules||[]).concat(SPEECH).reduce((a,[p,r])=>a.replace(p,r), t);
console.log('slides', after.d.length, before.d.length, 'rules', after.c.rules.length, before.c.rules.length);
// 5 字幕側
console.log('raw narration identical:', JSON.stringify(after.d.map(s=>s.narration))===JSON.stringify(before.d.map(s=>s.narration)));
// 2
const s = after.d.find(x=>x.title==='バックギャモンとは');
console.log('2 contains:', prep(after.c, s.narration).includes('させたほうが勝ち'));
// 3
after.d.forEach((sl,i)=>{ const a=prep(before.c,sl.narration), b=prep(after.c,sl.narration);
  if(a!==b){ console.log('3 DIFF slide',i,sl.title); console.log(' before:',a); console.log(' after :',b);} });
// 4
after.d.forEach((sl,i)=>{ const t=prep(after.c,sl.narration); for(const x of t.matchAll(/方/g))
  console.log('4 slide',i,sl.title,'|',t.slice(Math.max(0,x.index-8),x.index+9)); });
