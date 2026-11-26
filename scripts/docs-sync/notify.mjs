import {dashMessage,messageId} from './publication.mjs';
import {productionStatus} from './releases.mjs';
const api='https://api.github.com/repos/asksaysodev/sayso-landing';
const channel=process.env.DASH_SLACK_CHANNEL_ID;
if(channel!=='C0AFQT4KF1D')throw Error('Unexpected Dash channel');
async function gh(path,method='GET',body){
 const r=await fetch(api+path,{method,headers:{Authorization:'Bearer '+process.env.GH_TOKEN,'Content-Type':'application/json'},body:body&&JSON.stringify(body),signal:AbortSignal.timeout(30000)});
 if(r.status===404)return null;
 if(!r.ok)throw Error('Publication verifier failed ('+r.status+')');
 return r.json();
}
async function slack(method,body){
 const r=await fetch('https://slack.com/api/'+method,{method:'POST',headers:{Authorization:'Bearer '+process.env.DASH_SLACK_BOT_TOKEN,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});
 const result=await r.json();
 if(!r.ok||!result.ok)throw Error('Dash request failed: '+(result.error||r.status));
 return result;
}
if(process.argv[2]==='auth-test'){
 const auth=await slack('auth.test',{});
 if(!auth.bot_id)throw Error('Expected a Slack bot');
 console.log('Dash bot credential accepted and channel ID matches.');
}else{
 if(process.env.GITHUB_REF!=='refs/heads/development')throw Error('Unexpected workflow ref');
 const ref='docs-sync-ledger';
 const readFile=async path=>gh('/contents/'+path+'?ref='+ref);
 const ledgerFile=await readFile('docs/help-center/state.json');
 if(!ledgerFile)throw Error('Production evidence ledger required');
 const blob=ledgerFile.encoding==='base64'?ledgerFile:await gh('/git/blobs/'+ledgerFile.sha);
 const ledger=JSON.parse(Buffer.from(blob.content,'base64'));
 const deps=await gh('/deployments?environment=Production&per_page=1');
 const deployment=deps?.[0];
 if(!deployment)throw Error('Missing landing deployment');
 const statuses=await gh('/deployments/'+deployment.id+'/statuses?per_page=1');
 if(!productionStatus('sayso-landing',deployment,statuses?.[0])){console.log('Landing deployment is not successfully published');process.exit(0);}
 const alias=await fetch('https://api.vercel.com/v13/deployments/www.asksayso.com?teamId=team_xB1qUuGI103ezs0hoOHOEWBg',{headers:{Authorization:'Bearer '+process.env.DOCS_SYNC_VERCEL_TOKEN},signal:AbortSignal.timeout(20000)});
 if(!alias.ok)throw Error('Landing production alias verification failed');
 const live=await alias.json();
 if(live.meta?.githubOrg!=='asksaysodev'||live.meta.githubRepo!=='sayso-landing'||live.target!=='production'||live.readyState!=='READY'||live.meta.githubCommitSha!==deployment.sha)throw Error('Production alias and GitHub deployment disagree');
 for(let page=1;page<=100;page++){
   const prs=await gh('/issues?state=closed&labels=docs-sync&per_page=100&page='+page);
   for(const issue of prs){
     if(!issue.pull_request?.merged_at)continue;
     const number=issue.number, receipt='docs/help-center/receipts/pr-'+number+'.json';
     const existing=await readFile(receipt);
     if(existing)continue;
     const pr=await gh('/pulls/'+number);
     if(!pr.merged_at||pr.base.ref!=='development'||pr.head.repo?.full_name!=='asksaysodev/sayso-landing'||!pr.head.ref.startsWith('docs-sync/'))continue;
     const compare=await gh('/compare/'+pr.merge_commit_sha+'...'+deployment.sha);
     if(!['identical','ahead'].includes(compare?.status))continue;
     const releases=Array.from((pr.body||'').matchAll(/^Docs-Sync-Release: (sayso-[a-z-]+)@([a-f0-9]{40})$/gm)).map(m=>({repo:m[1],sha:m[2]}));
     if(!releases.length||!releases.every(r=>Object.values(ledger.products[r.repo]?.events||{}).some(e=>e.sha===r.sha)))throw Error('Missing verified product reference for documentation PR '+number);
     const files=await gh('/pulls/'+number+'/files?per_page=100');
     if(files.length!==pr.changed_files||files.some(f=>!f.filename.startsWith('content/help/')&&!f.filename.startsWith('public/help/')))throw Error('Unexpected documentation PR scope');
     const text=dashMessage(number,files,releases);
     // Reserve before posting. An ambiguous send stays pending for manual reconciliation.
     const put=(entry,sha)=>gh('/contents/'+receipt,'PUT',{branch:ref,sha,message:'chore: record Dash publication receipt',content:Buffer.from(JSON.stringify(entry)).toString('base64')});
     const key='sayso-docs-pr-'+number, pending={deployment:deployment.id,status:'pending',key};
     const reserved=await put(pending);
     const sent=await slack('chat.postMessage',{channel,text,client_msg_id:messageId(key),unfurl_links:false,unfurl_media:false});
     await put({...pending,status:'sent',ts:sent.ts},reserved.content.sha);
   }
   if(prs.length<100)break;
   if(page===100)throw Error('Publication history exceeds reconciliation budget');
 }
}
