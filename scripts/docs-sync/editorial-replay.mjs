import fs from 'node:fs/promises';
import {reviewEditorialEvidence} from './editorial.mjs';

const cases=JSON.parse(await fs.readFile('.docs-sync/editorial-cases.json'));
if(!Array.isArray(cases)||cases.length!==6||new Set(cases.map(x=>x.topic)).size!==cases.length) {
  throw Error('Expected six unique verified editorial cases');
}

const requiredLabels={
 condition:/\b(?:condition|rating)\b/i,
 estimate:/\b(?:AVM|estimate)\b/i,
 templates:/Buyer text[\s\S]*Seller text|Seller text[\s\S]*Buyer text/i,
 scriptWizard:/\b(?:wizard|progress)\b/i,
 manageBilling:/\bManage billing\b/i,
 meetingDetection:/\b(?:meeting detection|browser)\b/i,
};
const drafts=[];
const summary=['## Anthropic editorial replay',''];
for(const {topic,hasArticle,expected} of cases){
  const output=await reviewEditorialEvidence(topic,hasArticle);
  if(output.action!==expected)throw Error(topic+': expected '+expected+' but got '+output.action);
  if(!requiredLabels[topic]?.test(output.draft))throw Error(topic+': draft omitted its verified customer-facing concept');
  drafts.push({topic,...output});
  summary.push('- '+topic+': '+output.action+' · verified draft format and evidence references.');
}
await fs.writeFile('.docs-sync/editorial-drafts.json',JSON.stringify(drafts),'utf8');
const output=summary.join('\n')+'\n';
if(process.env.GITHUB_STEP_SUMMARY)await fs.appendFile(process.env.GITHUB_STEP_SUMMARY,output);
console.log(output);
