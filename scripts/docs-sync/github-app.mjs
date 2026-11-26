import crypto from 'node:crypto';
const id=process.env.DOCS_SYNC_APP_ID;
const key=process.env.DOCS_SYNC_APP_PRIVATE_KEY;
if(!/^\d+$/.test(id||'')||!key)throw Error('Missing Docs Sync GitHub App credentials');
const encode=x=>Buffer.from(JSON.stringify(x)).toString('base64url');
const now=Math.floor(Date.now()/1000);
const payload=encode({alg:'RS256',typ:'JWT'})+'.'+encode({iat:now-60,exp:now+540,iss:id});
const jwt=payload+'.'+crypto.sign('RSA-SHA256',Buffer.from(payload),key).toString('base64url');
async function api(path,options={}){
 const r=await fetch('https://api.github.com'+path,{...options,headers:{Authorization:'Bearer '+jwt,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',...options.headers},signal:AbortSignal.timeout(30000)});
 if(!r.ok)throw Error('GitHub App request failed: '+r.status+' '+path);
 return r.json();
}
const installation=await api('/orgs/asksaysodev/installation');
const repos=['sayso-desktop-app','sayso-web-app','sayso-backend','sayso-map','sayso-composer','sayso-stills-bot'];
const result=await api('/app/installations/'+installation.id+'/access_tokens',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({repositories:repos,permissions:{contents:'read',deployments:'read',pull_requests:'read'}})});
if(!result.token)throw Error('No installation token returned');
console.log('::add-mask::'+result.token);
if(!process.env.GITHUB_OUTPUT)throw Error('Expected GitHub Actions output file');
const fs=await import('node:fs');fs.appendFileSync(process.env.GITHUB_OUTPUT,'token='+result.token+'\n');
