import fs from 'node:fs/promises';
import {productionStatus,readJson} from './releases.mjs';

const token=process.env.DOCS_SYNC_READ_TOKEN;
if(!token)throw Error('Missing scoped GitHub reader');
const inventory=JSON.parse(await fs.readFile('.docs-sync/inventory.json'));
const cases=[
 {
  repo:'sayso-map',
  // Production history during migration to GitHub Deployments, independently checked in Vercel.
  from:{sha:'e7b9a5e993c2ddc1ad3efbc6e60b8cb40dcdc0c4',vercel:'dpl_8uETqEC6w4P4BBBWUGjL2aMsnC2Q'},
  to:{sha:'2129fd32f2368c402752b5a89475fce08d64b3a7',github:8078515501},
  articles:inventory.filter(a=>a.path.startsWith('content/help/tools/')&&a.path.includes('map')),
  expectedArticle:'content/help/tools/sayso-map-filters.mdx',
 },
 {
  repo:'sayso-web-app',
  from:{sha:'a5dfbbb97bad3bf68b8bd6673d4dfe0786075067',github:8066553669},
  to:{sha:'ad588ca3004f62a829176e3e8cd3aba42a17fdc6',github:8066899884},
  articles:inventory.filter(a=>/^content\/help\/(?:web-app|admins)\//.test(a.path)),
  expectedArticle:'content/help/web-app/subscription-tab.mdx',
 },
];

async function verify(ref,repo,get){
 if(!ref.github){
   const commit=await get('/commits/'+ref.sha);
   if(!ref.vercel||commit.sha!==ref.sha)throw Error('Unverified historical baseline');
   return;
 }
 const deployment=await get('/deployments/'+ref.github);
 const statuses=await get('/deployments/'+ref.github+'/statuses?per_page=100');
 if(deployment.sha!==ref.sha||!statuses.some(status=>productionStatus(repo,deployment,status)))
   throw Error('Historical deployment could not be verified');
}

const prepared=[];
for(const scenario of cases){
 const {repo,from,to,articles,expectedArticle}=scenario;
 const get=route=>readJson('https://api.github.com/repos/asksaysodev/'+repo+route,token);
 await verify(from,repo,get);
 await verify(to,repo,get);
 const comparison=await get('/compare/'+from.sha+'...'+to.sha);
 if(comparison.status!=='ahead'||!comparison.files?.length||comparison.files.length>20||
    comparison.files.some(f=>typeof f.patch!=='string')) throw Error('Incomplete historical comparison');
 const tokens=text=>text.replace(/([a-z])([A-Z])/g,'$1 $2').toLowerCase().match(/[a-z]{5,}/g)||[];
 const naming=new Set(comparison.files.flatMap(file=>tokens(file.filename.split('/').at(-1))));
 const score=article=>new Set(tokens(article.path+' '+article.content).filter(word=>naming.has(word))).size;
 const detailed=new Set([...articles].sort((a,b)=>score(b)-score(a)).slice(0,9).map(a=>a.path));
 const input={
   product:repo,
   files:comparison.files.map(({filename,patch},i)=>({id:i+1,filename,patch})),
   articles:articles.map(({path,content},i)=>({
     id:i+1,path,
     outline:detailed.has(path)
       ?content.split('\n').filter(l=>/^title:|^##? |<Ui>|<(?:Screenshot|Clip|Phone)\b/.test(l)).join('\n').slice(0,850)
       :content.split('\n').find(l=>l.startsWith('title:')),
   })),
 };
 if(JSON.stringify(input).length>47000)throw Error('Private replay exceeds its input budget');
 if(!input.articles.some(a=>a.path===expectedArticle))throw Error('Missing replay article');
 prepared.push({repo,input,test:{expectedArticle}});
}
await fs.mkdir('.docs-sync',{recursive:true});
await fs.writeFile('.docs-sync/private-replay-input.json',JSON.stringify(prepared),{mode:0o600});
