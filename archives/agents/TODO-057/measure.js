const { chromium } = require('/home/ytani/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  for (const [w,h,n] of [[1280,720,'pc'],[412,915,'sp']]) {
    const ctx = await b.newContext({ viewport:{width:w,height:h}, serviceWorkers:'block' });
    const p = await ctx.newPage();
    await p.route('**/*', r => r.continue({headers:{...r.request().headers(),'cache-control':'no-cache'}}));
    await p.goto('http://localhost:8000/player.html?slides=backgammon');
    await p.waitForTimeout(1500);
    await p.evaluate(() => { const bt=[...document.querySelectorAll('#playlist-items button, button')].find(x=>x.textContent.includes('バックギャモンの歴史は古い')); bt.click(); });
    await p.waitForTimeout(1500);
    const r = await p.evaluate(() => {
      const img = [...document.querySelectorAll('img')].find(i=>i.src.includes('bg-sokhta'));
      const root = img.closest('.relative.h-full.overflow-hidden');
      const R = e => { const b=e.getBoundingClientRect(); return {l:+b.left.toFixed(1),t:+b.top.toFixed(1),r:+b.right.toFixed(1),b:+b.bottom.toFixed(1)}; };
      const fcs=[...root.querySelectorAll('figcaption')], figimgs=[...root.querySelectorAll('figure img')];
      const caps=[...root.querySelectorAll('div.text-center.font-medium')];
      const credit=[...root.querySelectorAll('div')].find(d=>d.textContent.startsWith('写真: Cyrussis')&&d.children.length===0);
      return { natW: img.naturalWidth, root:R(root),
        fc: fcs.map(e=>({fs:getComputedStyle(e).fontSize,rect:R(e),txt:e.textContent})),
        cap: caps.map(e=>({fs:getComputedStyle(e).fontSize,rect:R(e)})),
        figimg: figimgs.map(e=>({rect:R(e),nat:e.naturalWidth})),
        credit: credit&&{rect:R(credit),txt:credit.textContent,fs:getComputedStyle(credit).fontSize},
        scrollOverflow:{sw:root.scrollWidth,cw:root.clientWidth,sh:root.scrollHeight,ch:root.clientHeight}};
    });
    console.log(n, JSON.stringify(r));
    await p.screenshot({path:`archives/agents/TODO-057/shot-${n}.png`});
    await ctx.close();
  }
  await b.close();
})();
