const { chromium } = require('/home/ytani/.npm/_npx/6bcb61ec6d5aea22/node_modules/playwright');
const D='/home/ytani/work/slide_backgammon/archives/agents/TODO-068/';
(async () => {
  const b = await chromium.launch();
  for (const [w,h] of [[1280,720],[412,915]]) {
    const p = await b.newPage({ viewport:{width:w,height:h} });
    const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push(String(e)));
    const U='http://127.0.0.1:8765/player.html?slides=backgammon';
    await p.goto(U);
    await p.evaluate(()=>Promise.all([fetch('slides/backgammon.js',{cache:'reload'}),fetch('images/bg-karena.jpg',{cache:'reload'})]));
    await p.reload(); await p.waitForTimeout(2000);
    const meas=()=>p.evaluate(()=>{
      const rc=e=>{const b=e.getBoundingClientRect();return [b.left,b.top,b.right,b.bottom].map(x=>+x.toFixed(1))};
      const img=[...document.querySelectorAll('img')].find(i=>/bg-/.test(i.src)&&i.className.includes('absolute'));
      const root=img.parentElement;
      const c=[...root.children].find(d=>d.className.includes('bottom-[0.8cqw]'));
      return {frame:rc(root),bg:img.src.split('/').pop(),
        h2:rc(root.querySelector('h2')),
        li:[...root.querySelectorAll('li')].map(rc),
        qrCard:[...root.querySelectorAll('a')].map(rc),
        qrImg:[...root.querySelectorAll('a img')].map(i=>rc(i)[2]-rc(i)[0]),
        credit:c&&{text:c.textContent,rect:rc(c),cls:c.className,color:getComputedStyle(c).color,bgc:getComputedStyle(c).backgroundColor}};
    });
    await p.evaluate(()=>renderSlide(slideData.length-1,true)); await p.waitForTimeout(1500);
    console.log(w,h,'LAST',JSON.stringify(await meas()));
    await p.screenshot({path:`${D}r3-${w}x${h}.png`});
    const idx=await p.evaluate(()=>slideData.findIndex(s=>s.render().includes('AI 生成（Gemini）')&&!s.render().includes('K-ARENA')));
    await p.evaluate(i=>renderSlide(i,true),idx); await p.waitForTimeout(1500);
    console.log(w,h,'OTHER idx',idx,JSON.stringify(await meas()));
    await p.screenshot({path:`${D}r3-other-${w}x${h}.png`});
    console.log('errors',errs.length,errs);
  }
  await b.close();
})();
