import fs from 'node:fs';
const token=process.env.DOCS_SYNC_READ_TOKEN;
if(!token)throw Error('Missing read-only installation token');
const names=['sayso-desktop-app','sayso-web-app','sayso-backend','sayso-map','sayso-composer'];
async function api(path){
 const response=await fetch('https://api.github.com/repos/asksaysodev/'+path,{headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},signal:AbortSignal.timeout(30000)});
 if(!response.ok)throw Error('GitHub API '+response.status+' for '+path);
 return response.json();
}
const results=[];
for(const repo of names){
 if(repo==='sayso-desktop-app'){
  const releases=await api(repo+'/releases?per_page=30');
  const r=releases.find(x=>!x.draft&&!x.prerelease&&/^v?\d+\.\d+\.\d+$/.test(x.tag_name)&&x.published_at&&x.assets?.length);
  if(!r){results.push({repo,verified:false,reason:'No stable published release with assets'});continue;}
  const commit=await api(repo+'/commits/'+encodeURIComponent(r.tag_name));
  results.push({repo,verified:true,sha:commit.sha,version:r.tag_name,publishedAt:r.published_at,url:r.html_url,source:'github-release'});
 }else{
  const deployments=await api(repo+'/deployments?environment=production&per_page=30');
  let verified=null;
  for(const d of deployments){
   const statuses=await api(repo+'/deployments/'+d.id+'/statuses?per_page=1');
   const s=statuses[0];
   if(s?.state==='success'&&d.production_environment===true){verified={repo,verified:true,sha:d.sha,publishedAt:s.created_at,url:s.environment_url||null,source:'github-deployment',deploymentId:d.id};break;}
  }
  results.push(verified||{repo,verified:false,reason:'No verified production deployment in GitHub; provider-specific adapter needed'});
 }
}
fs.mkdirSync('.docs-sync',{recursive:true});
fs.writeFileSync('.docs-sync/releases.json',JSON.stringify(results,null,2));
for(const r of results)console.log(r.repo+': '+(r.verified?r.sha:r.reason));
