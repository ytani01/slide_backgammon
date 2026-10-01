const { chromium } = require('/home/ytani/.npm/_npx/6bcb61ec6d5aea22/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  for (const [w,h] of [[1280,720],[412,915]]) {
    const p = await b.newPage({ viewport:{width:w,height:h} });
    const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push(String(e)));
    await p.goto('http://127.0.0.1:8765/player.html?slides=backgammon');
    await p.evaluate(()=>fetch('images/bg-karena.jpg',{cache:'reload'}));await p.reload();await p.waitForTimeout(2000);
    await p.evaluate(()=>renderSlide(slideData.length-1,true));
    await p.waitForTimeout(1500);
    const r = await p.evaluate(()=>{
      const rc=e=>{const b=e.getBoundingClientRect();return [b.left,b.top,b.right,b.bottom].map(x=>+x.toFixed(1))};
      const img=[...document.querySelectorAll('img')].find(i=>i.src.includes('bg-karena'));
      const out={img:img&&{src:img.src,nw:img.naturalWidth,op:img.style.opacity,rect:rc(img)}};
      const root=img.closest('[class*="relative"]')||img.parentElement;
      out.root=rc(root);
      out.h=[...document.querySelectorAll('h1,h2,h3')].filter(e=>e.offsetParent&&e.getBoundingClientRect().width).map(e=>[e.tagName,e.textContent.trim().slice(0,30),rc(e)]);
      out.li=[...root.querySelectorAll('li')].map(e=>[e.textContent.trim().slice(0,20),rc(e)]);
      out.qr=[...root.querySelectorAll('img')].filter(i=>/qr/.test(i.src)).map(i=>[i.src.split('/').pop(),rc(i.parentElement),rc(i)]);
      const c=[...root.querySelectorAll('div')].find(d=>d.textContent.trim().startsWith('背景:')&&!d.children.length);
      out.credit=c&&[c.textContent,rc(c)];
      out.vis=[innerWidth,innerHeight];
      return out;});
    console.log(w+'x'+h, JSON.stringify(r,null,1), 'errors:',errs.length, errs);
    await p.screenshot({path:`/home/ytani/work/slide_backgammon/archives/agents/TODO-068/re-${w}x${h}.png`});
  }
  await b.close();
})();
