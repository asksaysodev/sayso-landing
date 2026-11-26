import fs from 'node:fs/promises';
import path from 'node:path';
import {execFileSync, spawn} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {captureMap} from './capture-map.mjs';
import {chromium} from 'playwright';
import sharp from 'sharp';

const [product, rootArg, outArg] = process.argv.slice(2);
const root = path.resolve(rootArg), out = path.resolve(outArg);
const origin = 'http://127.0.0.1:3861';
const viewport = product === 'sayso-map' ? {width:1280,height:900} : {width:1280,height:800};
await fs.mkdir(out,{recursive:true});
const browser = await chromium.launch(process.env.STILLS_BROWSER_CHANNEL ? {channel:process.env.STILLS_BROWSER_CHANNEL} : {});
let server, context;
const shot = path.join(out,'screen.webp');
async function screenshot(page) {
  await page.evaluate(()=>document.fonts.ready);
  await sharp(await page.screenshot()).webp({quality:86}).toFile(shot);
}

async function startComposer() {
  const cwd=path.join(root,product);
  server=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--webpack','--hostname','127.0.0.1','--port','3861'],{
    cwd,stdio:'ignore',env:{PATH:process.env.PATH,HOME:process.env.HOME,NEXT_TELEMETRY_DISABLED:'1',
      NEXT_PUBLIC_SUPABASE_URL:'http://127.0.0.1:3999',NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:'fixture-only'}});
  for (let i=0;i<90;i++){
    if(server.exitCode!==null) throw Error('Composer server exited');
    if(await fetch(origin,{signal:AbortSignal.timeout(3000)}).then(r=>r.ok).catch(()=>false)) break;
    await new Promise(r=>setTimeout(r,1000));
  }
}

async function composer(page) {
  await context.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());
  await page.goto(origin+'/?start=1');
  await page.addStyleTag({content:'nextjs-portal { display:none !important }'});
  for(const name of [/Sellers/,/Expired listing/,/^Cold/]) await page.getByRole('button',{name}).click();
  await page.getByRole('heading',{name:"What's the goal of this call?"}).waitFor();
  await screenshot(page);
  await page.getByRole('button',{name:'Next →',exact:true}).click();
  await page.getByRole('heading',{name:'Tell us about the call'}).waitFor();
  await page.locator('textarea').first().pressSequentially('A listing consultation for a fictional homeowner.',{delay:45});
}

try {
  if (['sayso-web-app','sayso-desktop-app'].includes(product)) {
    process.env.STILLS_PRODUCT_DIR=root;
    const web=product==='sayso-web-app', adapter=web?'web':'desktop';
    const mod=await import(pathToFileURL(path.join(root,'sayso-stills-bot','harness',adapter+'.mjs')));
    const png=path.join(out,'screen.png');
    try {
      const result=await (web?mod.shootWeb:mod.shootDesktop)(browser,{out:png,page:'dashboard',state:'idle',scale:2});
      if(result.unmocked?.length) throw Error('Unmatched fixture requests');
      await sharp(png).webp({quality:86}).toFile(shot);
      await fs.unlink(png);
    } finally {await (web?mod.closeWeb:mod.closeDesktop)();}
  } else {
    if(!['sayso-map','sayso-composer'].includes(product)) throw Error('Unknown capture product');
    if(product==='sayso-composer') await startComposer();
    const options={viewport,deviceScaleFactor:product==='sayso-map'?3:2,serviceWorkers:'block'};
    const mapPublic=path.join(root,product,'public');
    if(product==='sayso-map'){
      context=await browser.newContext(options);
      try {await captureMap(await context.newPage(),mapPublic,out);}
      finally {await context.close();}
    }
    context=await browser.newContext({...options,recordVideo:{dir:out,size:viewport}});
    const page=await context.newPage(), video=page.video();
    if(product==='sayso-map') await captureMap(page,mapPublic,out,{recordTemplates:true});
    else await composer(page);
    await context.close();
    const raw=await video.path();
    execFileSync('ffmpeg',['-loglevel','error','-y','-i',raw,'-an','-c:v','libx264','-pix_fmt','yuv420p','-crf',product==='sayso-map'?'18':'24','-movflags','+faststart',path.join(out,'walkthrough.mp4')]);
    await fs.unlink(raw);
    if(product!=='sayso-map') await fs.copyFile(shot,path.join(out,'poster.webp'));
  }
} finally {
  await browser.close();
  server?.kill();
}
