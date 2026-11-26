import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const repoHints={
 'sayso-web-app':['web-app','admins','account settings','dashboard','company page'],
 'sayso-backend':['permission','billing','integration','subscription','report','account','crm'],
 'sayso-desktop-app':['desktop-app','widget','coach window','meeting detection','microphone','software update'],
 'sayso-map':['sayso map'], 'sayso-composer':['sayso composer']
};
const words=s=>s.replace(/([a-z])([A-Z])/g,'$1 $2').toLowerCase().match(/[a-z]{4,}/g)||[];
const generic=new Set(['sayso','index','components','component','style','styles','hooks','types','assets','page','pages','module','utils','public','tests','test','content','help','apps','main','model','service','controller','routes','handler','static','files','update','window','button','config']);
export function dependencies(article){
 const body=(article.path+' '+article.content).toLowerCase();
 return {
   path:article.path,sha256:article.sha256,
   repositories:Object.keys(repoHints).filter(k=>repoHints[k].some(h=>body.includes(h))),
   labels:[...new Set(Array.from(article.content.matchAll(/<Ui>([^<]+)<\/Ui>/g),m=>m[1]))],
   assets:[...new Set(Array.from(article.content.matchAll(/(?:src|poster)="(\/help\/[^"]+)"/g),m=>m[1]))],
   links:[...new Set(Array.from(article.content.matchAll(/\]\((\/help\/[^)#?]*)/g),m=>m[1]))],
   roles:[...new Set(body.match(/\b(owner|admin|member)\b/g)||[])]
 };
}
export function evaluate(articles,evidence){
 const vocabulary=evidence.files.map(f=>new Set(words(f.path).filter(w=>!generic.has(w))));
 return articles.map(article=>{
   const deps=dependencies(article), body=new Set(words(article.content+' '+article.path));
   const components=evidence.files.filter((_,i)=>[...vocabulary[i]].some(w=>body.has(w))).map(f=>f.path);
   return {path:article.path,sha256:article.sha256,dependencies:deps,components,
     candidate:deps.repositories.includes(evidence.release.repo)||components.length>0,
     disposition:'requires-review',release:evidence.release.head};
 });
}
export async function writeImpact(){
 const read=async name=>JSON.parse(await fs.readFile('.docs-sync/'+name+'.json'));
 const articles=await read('inventory'), evidence=await read('evidence');
 const review=evaluate(articles,evidence);
 if(!review.length||new Set(review.map(a=>a.path)).size!==articles.length)throw Error('Incomplete inventory');
 const paths=new Set(articles.map(a=>'/'+a.path.replace(/^content\//,'').replace(/\.mdx$/,'')+'/'));
 const unresolved=[];
 for(const row of review){
   for(const src of row.dependencies.assets){
     try{await fs.access(path.join('public',src));}catch{unresolved.push({article:row.path,src});}
   }
   for(const link of row.dependencies.links){
     if(!paths.has(link.replace(/\/?$/,'/'))&&!articles.some(a=>('/'+a.path).includes(link.replace(/^\/help\//,'/help/').replace(/\/$/,'')+'/'))) unresolved.push({article:row.path,link});
   }
 }
 const result={release:evidence.release,review,unresolved,coverageHash:crypto.createHash('sha256').update(review.map(x=>x.sha256).join('')).digest('hex')};
 await fs.writeFile('.docs-sync/impact.json',JSON.stringify(result,null,2));
 console.log('Covered '+review.length+' articles; '+review.filter(x=>x.candidate).length+' candidates; '+unresolved.length+' references require inspection.');
}
if(process.argv[1]?.endsWith('/impact.mjs')) await writeImpact();
