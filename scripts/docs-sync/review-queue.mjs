import fs from 'node:fs/promises';
import {topicIds} from './topics.mjs';
import {reviewTopics} from './model.mjs';
const report=JSON.parse(await fs.readFile('.docs-sync/releases.json'));
const inventory=JSON.parse(await fs.readFile('.docs-sync/inventory.json'));
const tags=inventory.map(a=>topicIds(a.content));
const cache=new Map();
for(const reviews of Object.values(report.summaries)){
 for(const review of Object.values(reviews)){
   const key=JSON.stringify(review.topics);
   let verdicts=cache.get(key);
   if(!verdicts){
     verdicts=new Set();
     if(review.topics.length){
       for(let i=0;i<tags.length;i+=25){
         for(const slot of await reviewTopics(review.topics,tags.slice(i,i+25)))verdicts.add(i+slot);
       }
     }
     cache.set(key,verdicts);
   }
   for(const [i,article] of review.articles.entries()){
     if(article.hash!==inventory[i].sha256||article.path!==inventory[i].path)throw Error('Article index changed during review');
     article.candidate ||= verdicts.has(i);
   }
   review.status='topic-reviewed-awaiting-factual-verification';
   delete review.topics;
 }
}
await fs.writeFile('.docs-sync/releases.json',JSON.stringify(report));
