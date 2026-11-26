import fs from 'node:fs/promises';
import {evaluate} from './impact.mjs';
import {topicIds} from './topics.mjs';
import {decisionForComparison} from './coverage.mjs';
import {releaseWindow} from './release-window.mjs';
import {makePrivateInput} from './private-input.mjs';
import {products,readJson} from './releases.mjs';

const base='https://api.github.com/repos/asksaysodev/';
const token=process.env.DOCS_SYNC_READ_TOKEN;
const articles=JSON.parse(await fs.readFile('.docs-sync/inventory.json'));
const report=JSON.parse(await fs.readFile('.docs-sync/releases.json'));
const previous=JSON.parse(await fs.readFile('.docs-sync/previous.json'));
const summaries={};
const manualReviews={};
const reviewStarts={};
const offlineQueue=[];
const offlineEnabled=process.env.DOCS_SYNC_PRIVATE_REVIEW_ENABLED==='true';
let remaining=process.env.DOCS_SYNC_REPLAY_ONLY==='true'?products.length:3;
for(const repo of products){
 const prior=previous.products[repo]||{events:{},transitions:[]};
 const discovered=report.products[repo];
 const {start,comparisons}=releaseWindow(repo,prior,discovered);
 if(start)reviewStarts[repo]=start;
 const gh=p=>readJson(base+repo+p,token);
 const review=async(id,from,to)=>{
   const flag = reason => {
     manualReviews[repo] ||= {};
     manualReviews[repo][id]=reason;
   };
   if(!from){flag('verified-baseline-needed');return;}
   if(from!==to){
     if(!remaining)return;
     remaining--;
   }
   let compare=from===to?{status:'identical',files:[],total_commits:0}:await gh('/compare/'+from+'...'+to);
   const direction=compare.status;
   if(direction==='behind')compare=await gh('/compare/'+to+'...'+from);
   const coverage=decisionForComparison(repo,compare,articles);
   if(!coverage){flag('comparison-needs-manual-review');return;}
   const files=compare.files.map(f=>({path:f.filename}));
   const rows=evaluate(articles,{release:{repo,head:to},files});
   // Only public article names and release identities enter the durable ledger.
   // Source filenames, model inputs and provider responses remain on the ephemeral runner.
   summaries[repo] ||= {};
   summaries[repo][id]={from,to,direction,coverage,topics:topicIds(compare.files.map(f=>f.filename+' '+(f.patch||'')).join('\n')),articles:rows.map(r=>({path:r.path,hash:r.sha256,candidate:r.candidate})),
     status:coverage.requiresNewArticleReview?'indexed-awaiting-semantic-review':'docs-current-identical-commit'};
   if(coverage.requiresNewArticleReview && offlineEnabled){
     const input=makePrivateInput(repo,compare.files,articles);
     if(input)offlineQueue.push({repo,id,input});
     else summaries[repo][id].privateReview='input-needs-verification';
   }

 };
 for(const {id,from,to} of comparisons){
   const priorImpact=prior.events[id]?.impact;
   const retry=offlineEnabled && priorImpact?.coverage?.requiresNewArticleReview &&
     (!priorImpact.privateReview || priorImpact.privateReview==='review-needs-retry');
   if(!priorImpact?.coverage||priorImpact.from!==from||retry) await review(id,from,to);
 }
 const last=prior.liveSha;
 if(last&&last!==discovered.liveSha&&!comparisons.some(c=>c.from===last&&c.to===discovered.liveSha))
   await review('transition-'+last+'-'+discovered.liveSha,last,discovered.liveSha);
}
report.summaries=summaries;
report.manualReviews=manualReviews;
report.reviewStarts=reviewStarts;
await fs.writeFile('.docs-sync/releases.json',JSON.stringify(report));
if(offlineQueue.length){
 await fs.writeFile('.docs-sync/private-queue.json',JSON.stringify(offlineQueue),{mode:0o600});
 await fs.appendFile(process.env.GITHUB_OUTPUT,'offline=true\n');
}
