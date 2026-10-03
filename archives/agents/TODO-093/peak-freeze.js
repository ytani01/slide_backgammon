// 頂点（scale 1.3）の形を固定して撮る。ページ内で style を書き換えるだけで、ファイルは変えない
const { chromium } = require('/home/ytani/.local/share/mise/installs/npm-playwright/1.63.0/node_modules/playwright');
(async()=>{const b=await chromium.launch();
for (const [n,vp] of [['pc',{width:1280,height:720}],['sp',{width:412,height:915}]]){
 const p=await b.newPage({viewport:vp,deviceScaleFactor:n==='sp'?3:1});await p.goto('http://localhost:8123/player.html?slides=backgammon#5');await p.waitForTimeout(3000);
 const r=await p.evaluate(()=>{const e=document.querySelector('[data-say-pop]');const st=document.createElement('style');st.textContent='[data-say-pop]{transition:none!important;transform:scale(1.3)!important;color:#fcd34d!important}';document.head.append(st);
  void e.offsetWidth;const q=e.getBoundingClientRect(),c=document.querySelectorAll('#japan-say [data-say]')[1],ph=c.querySelector('img').getBoundingClientRect(),cc=c.getBoundingClientRect(),t=[...c.querySelectorAll('div')].find(d=>d.textContent.startsWith('矢澤')).getBoundingClientRect();
  return {popR:q.right,card1R:e.closest('[data-say]').getBoundingClientRect().right,card2L:cc.left,photo2L:ph.left,name2L:t.left}});
 console.log(n,JSON.stringify(r));
 await p.screenshot({path:`archives/agents/TODO-093/shot-${n}-peak-frozen.png`,clip:n==='sp'?{x:20,y:90,width:370,height:190}:{x:48,y:230,width:870,height:250}});}
await b.close()})();
