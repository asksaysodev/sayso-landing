import fs from 'node:fs/promises';
import path from 'node:path';
import {createProcessor} from '@mdx-js/mdx';
import matter from 'gray-matter';
import {checkMapCrossLinks} from './coverage.mjs';

const fields={Screenshot:['src','width','alt','caption'],Clip:['src','poster','width','alt','caption'],Phone:['src','alt','caption'],PhoneSteps:[],Tabs:[],Tab:['label'],Ui:[],Kbd:[],Callout:['type','title'],Faq:['q']};
const safeLocal=/^\/help\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_.-]+$/;
export function inspectArticle(source){
 if(!/^---\r?\n/.test(source))throw Error('Expected YAML article metadata');
 const {data,content}=matter(source);
 if(!data.title||!data.description||!data.updated)throw Error('Missing article metadata');
 const tree=createProcessor().parse(content), media=[], links=[];
 const walk=node=>{
   if(['mdxjsEsm','mdxFlowExpression','mdxTextExpression','html'].includes(node.type))throw Error('Executable MDX is prohibited');
   if(node.type.startsWith('mdxJsx')){
     if(!Object.hasOwn(fields,node.name))throw Error('Unsupported component '+node.name);
     const seen=new Set();
     for(const a of node.attributes){
       if(a.type!=='mdxJsxAttribute'||!fields[node.name].includes(a.name)||seen.has(a.name))throw Error('Unsupported or duplicate property');
       seen.add(a.name);
       if(typeof a.value!=='string' && !(a.name==='width'&&/^\d{1,4}$/.test(a.value?.value)))throw Error('Only literal properties are permitted');
       if(['poster','src'].includes(a.name)){
         if(!safeLocal.test(a.value)||a.value.includes('..'))throw Error('Unsafe media path');
         media.push(a.value);
       }
     }
   }
   if(node.url){
     if(!/^(?:https?:\/\/|mailto:|tel:|#|\/(?!\/))/.test(node.url)||/[\\\x00-\x1f]/.test(node.url))throw Error('Unsafe link');
     links.push(node.url);
   }
   for(const child of node.children||[])walk(child);
 };
 walk(tree);
 return {links,media};
}
if(process.argv[1]?.endsWith('/validate.mjs')){
 const inventory=JSON.parse(await fs.readFile('.docs-sync/inventory.json'));
 const paths=new Set(inventory.map(a=>'/'+a.path.slice(8,-4)+'/'));
 for(const article of inventory){
   try{
     const {links,media}=inspectArticle(article.content);
     for(const src of media)await fs.access(path.join('public',src));
     for(const href of links.filter(l=>l.startsWith('/help/'))){
       const url=href.split(/[?#]/)[0].replace(/\/?$/,'/');
       if(!paths.has(url)&&![...paths].some(p=>p.startsWith(url)))throw Error('Unknown help link '+url);
     }
   }catch(e){throw Error(article.path+': '+e.message);}
 }
 const missingLinks=checkMapCrossLinks(inventory);
 if(missingLinks.length)throw Error('Missing Map cross-links: '+missingLinks.map(x=>x.path+' → '+x.route).join(', '));
 console.log('Validated MDX, Help Center routes and referenced media for '+inventory.length+' articles.');
}
