const { chromium } = require('/home/ytani/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  for (const [w,h,n] of [[1280,720,'pc'],[412,915,'sp']]) {
    const ctx = await b.newContext({ viewport:{width:w,height:h}, serviceWorkers:'block' });
    const p = await ctx.newPage();
    await p.route('**/*', r => r.continue({headers:{...r.request().headers(),'cache-control':'no-cache'}}));
    await p.goto('http://localhost:8000/player.html?slides=backgammon');
    await p.waitForTimeout(1500);
    await p.evaluate(() => [...document.querySelectorAll('button')].find(x=>x.textContent.includes('バックギャモンの歴史は古い')).click());
    await p.waitForTimeout(1500);
    const r = await p.evaluate(() => {
      const img=[...document.querySelectorAll('img')].find(i=>i.src.includes('bg-ur'));
      const root=img.closest('.relative.h-full.overflow-hidden');
      const rr=root.getBoundingClientRect();
      const credit=[...root.querySelectorAll('div')].find(d=>d.textContent.startsWith('写真: BabelStone')&&!d.children.length).getBoundingClientRect();
      const caps=[...root.querySelectorAll('div.text-center.font-medium')].map(e=>e.getBoundingClientRect().bottom);
      const imgs=[...root.querySelectorAll('figure img')].map(e=>{const q=e.getBoundingClientRect();return {imgTop:q.top,imgBottom:q.bottom,inRoot:q.left>=rr.left&&q.right<=rr.right&&q.bottom<=rr.bottom}});return imgs.concat([...root.querySelectorAll('figcaption')].map(e=>{
        const cs=getComputedStyle(e), lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.25;
        const t=document.createRange(); t.selectNodeContents(e);
        const rects=[...t.getClientRects()]; const lines={};
        rects.forEach(q=>{const k=Math.round(q.top); lines[k]=(lines[k]||0)+q.width;});
        const bb=e.getBoundingClientRect();
        return {txt:e.innerHTML, lines:Math.round(bb.height/lh), lineWidthsInFs:Object.values(lines).map(x=>+(x/parseFloat(cs.fontSize)).toFixed(1)),
          inside: bb.left>=rr.left&&bb.right<=rr.right&&bb.bottom<=rr.bottom, bottom:bb.bottom, maxCapTop:null};
      }).concat([{creditTop:credit.top, capsBottom:Math.max(...caps)}]));
    });
    console.log(n, JSON.stringify(r,null,0));
    await p.screenshot({path:`archives/agents/TODO-057/shot4-${n}.png`});
    await ctx.close();
  }
  await b.close();
})();
