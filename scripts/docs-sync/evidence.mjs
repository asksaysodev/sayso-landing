import fs from 'node:fs/promises';
import {products,readJson,stableRelease} from './releases.mjs';
const [repo,base,head]=process.argv.slice(2);
if(!products.includes(repo)||![base,head].every(x=>/^[a-f0-9]{40}$/.test(x)))throw Error('Expected exact product and deployed SHAs');
const gh=p=>readJson('https://api.github.com/repos/asksaysodev/'+repo+p,process.env.DOCS_SYNC_READ_TOKEN);
if(process.env.HISTORICAL_DESKTOP==='1'){
 for(const [tag,sha] of [['v1.3.5',base],['v1.3.8',head]]){
   if(!stableRelease(await gh('/releases/tags/'+tag))||(await gh('/commits/'+tag)).sha!==sha)
     throw Error('Historical desktop release verification failed');
 }
}
const data=await gh('/compare/'+base+'...'+head);
if(data.files.length>=300)throw Error('Comparison may be truncated; manual review required');
const files=data.files.filter(f=>!/(^|\/)(node_modules|dist|vendor)\/|(?:-lock\.json|\.lock|\.map)$/.test(f.filename)).map(f=>({
 path:f.filename,status:f.status,patch:(f.patch||'').slice(0,12000),
 incomplete:!f.patch||f.patch.length>12000
}));
if(files.length>140) throw Error('Release exceeds analysis budget');
await fs.mkdir('.docs-sync',{recursive:true});
await fs.writeFile('.docs-sync/evidence.json',JSON.stringify({release:{repo,base,head,direction:data.status},files}));
