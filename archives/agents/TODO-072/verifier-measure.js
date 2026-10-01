const { chromium } = require('/home/ytani/.local/share/mise/installs/npm-playwright/1.63.0/node_modules/.mise/playwright@1.63.0/node_modules/playwright');
const URL='http://localhost:8000/player.html?slides=backgammon#2';
const OUT='/home/ytani/work/slide_backgammon/archives/agents/TODO-072/verifier-fight.png';
const sample = () => new Promise(res => {
  const out=[]; const t0=performance.now();
  const g=id=>{const m=/translate\(([-\d.e]+) ([-\d.e]+)\)/.exec(document.getElementById(id).getAttribute('transform')||'');return m?[+m[1],+m[2]]:null};
  const iv=setInterval(()=>{
    out.push({t:Math.round(performance.now()-t0),w:g('rules-head-white'),b:g('rules-head-brown'),sp:document.getElementById('rules-sparks').children.length,
      lw:document.getElementById('rules-line-white').getAttribute('stroke-dasharray'),lb:document.getElementById('rules-line-brown').getAttribute('stroke-dasharray')});
    if(performance.now()-t0>12000){clearInterval(iv);res(out)}
  },50);
});
(async()=>{
  const br=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  const ctx=await br.newContext({viewport:{width:1280,height:800}});
  const page=await ctx.newPage(); const errs=[];
  page.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push(m.type()+': '+m.text())});
  page.on('pageerror',e=>errs.push('pageerror: '+e.message));
  await page.goto(URL); await page.evaluate(()=>fetch('slides/backgammon.js',{cache:'reload'})); await page.reload(); await page.waitForTimeout(1500);
  console.log('svg', await page.evaluate(()=>!!document.getElementById('rules-svg')));
  console.log('FIGHT in served js', await page.evaluate(async()=>(await (await fetch('slides/backgammon.js')).text()).match(/FIGHT = [\d.]+/)[0]));
  // 1,2,3
  const shot = page.evaluate(sample);
  let shotDone=false;
  const poll=setInterval(async()=>{ if(shotDone)return; const n=await page.evaluate(()=>document.getElementById('rules-sparks').children.length).catch(()=>0); if(n>0){shotDone=true; await page.screenshot({path:OUT});} },100);
  const s=await shot; clearInterval(poll);
  const fights=[]; let cur=null;
  for(const r of s){ if(r.sp>0){ if(!cur){cur={start:r.t,w:r.w,b:r.b,n:0,end:r.t};fights.push(cur)} cur.end=r.t; cur.n++; } else cur=null; }
  fights.forEach((f,i)=>{const d=Math.hypot(f.w[0]-f.b[0],f.w[1]-f.b[1]);console.log('fight',i,'t',f.start,'dur',f.end-f.start+50,'w',f.w.map(Math.round),'b',f.b.map(Math.round),'dist',Math.round(d))});
  require('fs').writeFileSync('samples.json',JSON.stringify(s));
  console.log('screenshot', shotDone);
  // 4: slide switch
  const speed = async()=>{const a=await page.evaluate(sample); return a};
  const mv = (a)=>{ // mean per-50ms movement of white head when no fight, excluding big jumps
    const d=[];for(let i=1;i<a.length;i++){if(a[i].sp||a[i-1].sp)continue;const x=Math.hypot(a[i].w[0]-a[i-1].w[0],a[i].w[1]-a[i-1].w[1]);if(x<80)d.push(x)}
    return {n:d.length,mean:(d.reduce((p,c)=>p+c,0)/d.length).toFixed(2)};};
  console.log('speed before', JSON.stringify(mv(s)), 'per50ms (unit px)');
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1000);
  console.log('slide3 hash', await page.evaluate(()=>location.hash), 'svg on 3:', await page.evaluate(()=>!!document.getElementById('rules-svg')));
  await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(500);
  console.log('hash', await page.evaluate(()=>location.hash), 'svg', await page.evaluate(()=>!!document.getElementById('rules-svg')));
  const g2=()=>page.evaluate(()=>document.getElementById('rules-head-white').getAttribute('transform')+' | '+document.getElementById('rules-head-brown').getAttribute('transform'));
  console.log('t0',await g2()); await page.waitForTimeout(500); console.log('t+0.5',await g2());
  const s2=await page.evaluate(sample); console.log('speed after', JSON.stringify(mv(s2)));
  console.log('errors', JSON.stringify(errs,null,1));
  // 5: reduced motion
  await page.emulateMedia({reducedMotion:'reduce'}); await page.goto(URL); await page.reload(); await page.waitForTimeout(1500);
  console.log('rm a',await g2()); await page.waitForTimeout(500); console.log('rm b',await g2());
  await br.close();
})();
