import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root='content/help';
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const articles=walk(root).filter(p=>p.endsWith('.mdx')).sort().map(p=>{const content=fs.readFileSync(p,'utf8');return {path:p,sha256:crypto.createHash('sha256').update(content).digest('hex'),content};});
fs.mkdirSync('.docs-sync',{recursive:true});fs.writeFileSync('.docs-sync/inventory.json',JSON.stringify(articles,null,2));
console.log('Inventoried '+articles.length+' articles');
