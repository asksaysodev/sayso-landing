import fs from 'node:fs/promises';
import {topicIds} from './topics.mjs';
import {reviewTopics} from './model.mjs';
const inventory=JSON.parse(await fs.readFile('.docs-sync/inventory.json'));
const evidence=JSON.parse(await fs.readFile('.docs-sync/evidence.json'));
const changed=topicIds(evidence.files.map(f=>f.path+' '+f.patch).join('\n'));
const results=[];
for(let start=0;start<inventory.length;start+=25){
 const batch=inventory.slice(start,start+25);
 const slots=await reviewTopics(changed,batch.map(a=>topicIds(a.content)));
 results.push(...batch.map((a,i)=>({path:a.path,sha256:a.sha256,needsInspection:slots.includes(i)})));
}
await fs.writeFile('.docs-sync/topic-review.json',JSON.stringify(results));
console.log('Topic-reviewed '+results.length+' articles; '+results.filter(r=>r.needsInspection).length+' flagged for inspection.');
