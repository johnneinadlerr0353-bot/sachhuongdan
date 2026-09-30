const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
(async()=>{
  const dir=process.argv[2], out=process.argv[3]; fs.mkdirSync(out,{recursive:true});
  const list=JSON.parse(fs.readFileSync(path.join(dir,'list.json')));
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}).catch(()=>chromium.launch());
  for(const [n,w,h] of list){
    const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1.5});
    await p.goto('file://'+path.resolve(dir,n+'.html')); await p.waitForTimeout(300);
    await p.screenshot({path:path.join(out,n+'.png')}); await p.close();
  }
  await b.close();
})();
