import fs from 'node:fs/promises';
import {evaluate} from './impact.mjs';
import {topicIds} from './topics.mjs';
import {products,readJson} from './releases.mjs';

const base='https://api.github.com/repos/asksaysodev/';
const token=process.env.DOCS_SYNC_READ_TOKEN;
const articles=JSON.parse(await fs.readFile('.docs-sync/inventory.json'));
const report=JSON.parse(await fs.readFile('.docs-sync/releases.json'));
const previous=JSON.parse(await fs.readFile('.docs-sync/previous.json'));
const summaries={};
let remaining=3;
for(const repo of products){
 const prior=previous.products[repo]||{events:{},transitions:[]};
 const discovered=report.products[repo];
 const combined={...prior.events,...Object.fromEntries(discovered.events.map(e=>[e.id,e]))};
 const ordered=Object.entries(combined).sort(([,a],[,b])=>a.time.localeCompare(b.time));
 const gh=p=>readJson(base+repo+p,token);
 const review=async(id,from,to)=>{
   if(!remaining||!from)return;
   remaining--;
   let compare=await gh('/compare/'+from+'...'+to);
   const direction=compare.status;
   if(direction==='behind')compare=await gh('/compare/'+to+'...'+from);
   if(direction==='diverged'||compare.files?.length>=300||compare.total_commits>100)return;
   const files=compare.files.map(f=>({path:f.filename}));
   const rows=evaluate(articles,{release:{repo,head:to},files});
   // Only public article names and release identities enter the durable ledger.
   // Source filenames, model inputs and provider responses remain on the ephemeral runner.
   summaries[repo] ||= {};
   summaries[repo][id]={from,to,direction,topics:topicIds(compare.files.map(f=>f.filename+' '+(f.patch||'')).join('\n')),articles:rows.map(r=>({path:r.path,hash:r.sha256,candidate:r.candidate})),
     status:'indexed-awaiting-semantic-review'};
 };
 for(let i=1;i<ordered.length;i++){
   const [id,e]=ordered[i];
   if(!prior.events[id]?.impact)await review(id,ordered[i-1][1].sha,e.sha);
 }
 const last=prior.liveSha;
 if(last && last!==discovered.liveSha)
   await review('transition-'+last+'-'+discovered.liveSha,last,discovered.liveSha);
}
report.summaries=summaries;
await fs.writeFile('.docs-sync/releases.json',JSON.stringify(report));
