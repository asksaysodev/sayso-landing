import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {products} from './releases.mjs';
import {validateCoverage} from './coverage.mjs';
const sha=/^[a-f0-9]{40}$/;
export function reconcile(previous,report,observedAt) {
  if(previous.version!==1)throw Error('Unknown ledger format');
  const next=structuredClone(previous);
  for(const repo of products) {
    const data=report.products[repo];
    if(!data || !sha.test(data.liveSha)) throw Error('Missing current production evidence for '+repo);
    const state=next.products[repo] ||= {events:{},transitions:[],liveSha:null};
    for(const e of data.events){
      if(!/^[A-Za-z0-9_-]{1,100}$/.test(e.id)||!sha.test(e.sha)||!Number.isFinite(Date.parse(e.time)))throw Error('Invalid release evidence');
      const old=state.events[e.id];
      if(old && old.sha!==e.sha)throw Error('Deployment identity changed');
      if(!old)state.events[e.id]={sha:e.sha,time:e.time,status:'pending-review'};
    }
    const start=report.reviewStarts?.[repo];
    if(start!==undefined){
      if(!Object.hasOwn(state.events,start)||(state.reviewStart&&state.reviewStart!==start))
        throw Error('Invalid release review starting point');
      state.reviewStart=start;
    }
    if(state.liveSha!==data.liveSha){
      state.transitions.push({from:state.liveSha,to:data.liveSha,observedAt,status:'pending-review'});
      state.liveSha=data.liveSha;
    }
  }
  for (const [repo,flags] of Object.entries(report.manualReviews||{})) {
    if (!products.includes(repo)) throw Error('Unknown manual review product');
    const state=next.products[repo];
    for (const [id,reason] of Object.entries(flags)) {
      if (!['verified-baseline-needed','comparison-needs-manual-review'].includes(reason)) throw Error('Unknown manual review reason');
      const event=state.events[id]??state.transitions.findLast(t=>'transition-'+t.from+'-'+t.to===id);
      if (event) event.reviewBlock=reason;
    }
  }
  for(const [repo,summaries] of Object.entries(report.summaries||{})){
    if(!products.includes(repo))throw Error('Unknown review product');
    for(const [id,impact] of Object.entries(summaries)){
      if(!sha.test(impact.to)||!sha.test(impact.from)||!impact.articles?.length||
        impact.articles.some(a=>!/^content\/help\/[a-z0-9-]+\/[a-z0-9-]+\.mdx$/.test(a.path)||!/^([a-f0-9]{64})$/.test(a.hash)))throw Error('Unexpected impact index');
      if (impact.coverage) validateCoverage(repo,impact.coverage);
      if(impact.privateReview!==undefined&&!['input-needs-verification','draft-needs-verification','review-needs-retry'].includes(impact.privateReview))
        throw Error('Unknown offline review status');
      const state=next.products[repo];
      const target=state.events[id]??state.transitions.findLast(t=>'transition-'+t.from+'-'+t.to===id);
      if(target && (target.sha || target.to)===impact.to){
        const inventory=impact.articles.map(a=>[a.path,a.hash]);
        const key=createHash('sha256').update(JSON.stringify(inventory)).digest('hex');
        next.inventories ||= {};
        next.inventories[key] ||= inventory;
        delete target.reviewBlock;
        target.impact={coverage:impact.coverage,privateReview:impact.privateReview,from:impact.from,to:impact.to,direction:impact.direction,status:impact.status,
          inventory:key,candidates:impact.articles.flatMap((a,i)=>a.candidate?[i]:[])};
      }
    }
  }
  next.checkedAt=observedAt;
  return next;
}
const endpoint='https://api.github.com/repos/asksaysodev/sayso-landing';
const ref='docs-sync-ledger', file='/contents/docs/help-center/state.json';
async function request(url,method='GET',body){
 const r=await fetch(endpoint+url,{method,headers:{Authorization:'Bearer '+process.env.GH_TOKEN,'Content-Type':'application/json'},body:body&&JSON.stringify(body),signal:AbortSignal.timeout(30000)});
 if(!r.ok&&r.status!==404)throw Error('Ledger request failed ('+r.status+')');
 return r.status===404?null:r.json();
}
async function main(){
 const command=process.argv[2];
 const existing=await request(file+'?ref='+ref);
 const blob=existing && (existing.encoding==='base64'?existing:await request('/git/blobs/'+existing.sha));
 const previous=blob?JSON.parse(Buffer.from(blob.content,'base64')):{version:1,products:{}};
 if(command==='cursor'){
   await fs.mkdir('.docs-sync',{recursive:true});
   await fs.writeFile('.docs-sync/previous.json',JSON.stringify(previous));
   const since=previous.checkedAt?new Date(Date.parse(previous.checkedAt)-7*86400000):new Date(Date.now()-7*86400000);
   await fs.appendFile(process.env.GITHUB_OUTPUT,'since='+since.toISOString()+'\n');
   return;
 }
 if(command!=='save')throw Error('Unknown ledger operation');
 const report=JSON.parse(await fs.readFile('.docs-sync/releases.json'));
 const next=reconcile(previous,report,new Date().toISOString());
 if(!existing && !await request('/git/ref/heads/'+ref)){
   const base=await request('/git/ref/heads/development');
   await request('/git/refs','POST',{ref:'refs/heads/'+ref,sha:base.object.sha});
 }
 await request(file,'PUT',{branch:ref,message:'chore: record verified documentation candidates',
  content:Buffer.from(JSON.stringify(next,null,2)+'\n').toString('base64'),sha:existing?.sha});
}
if(process.argv[1]?.endsWith('/ledger.mjs'))await main();
