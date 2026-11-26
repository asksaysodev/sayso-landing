import fs from 'node:fs/promises';
import {decisionForComparison,validateCoverage} from './coverage.mjs';
import {productionStatus,readJson,stableRelease} from './releases.mjs';

const inventory=JSON.parse(await fs.readFile('.docs-sync/inventory.json'));
const token=process.env.DOCS_SYNC_READ_TOKEN;
if (!token) throw Error('Missing GitHub App reader credential');

const cases=[
  // Deliberate historical catch-up test. The scheduled workflow compares adjacent deployments.
  {repo:'sayso-map',historicalBaseline:'319de1819fdc0bf211d05ba05eb45e0a6b0a3a74',to:{id:8078515501,sha:'2129fd32f2368c402752b5a89475fce08d64b3a7'},
    absent:['condition','estimate'],update:['address','pdf','templates']},
  {repo:'sayso-composer',from:{id:5922093567,sha:'c07e79f29e0af6ee57635d1a929d4443cadf94fd'},
    to:{id:7616220383,sha:'6e9c25e2535e8d373b8fbadc4eb37eb4d37b9fbe'},update:['scriptWizard']},
  {repo:'sayso-web-app',from:{id:8066553669,sha:'a5dfbbb97bad3bf68b8bd6673d4dfe0786075067'},
    to:{id:8066899884,sha:'ad588ca3004f62a829176e3e8cd3aba42a17fdc6'},update:['manageBilling']},
  {repo:'sayso-desktop-app',from:{tag:'v1.3.5',sha:'277933727b4cd57279154fcc83ea702033da3a58'},
    to:{tag:'v1.3.8',sha:'1a8727669a1dfff6da9039b38dbb0b6f34cc809c'},absent:['meetingDetection']},
];
const omittedArticles={
  condition:'content/help/tools/sayso-map-condition-ratings.mdx',
  estimate:'content/help/tools/sayso-map-off-market-estimates.mdx',
  meetingDetection:'content/help/desktop-app/meeting-detection.mdx',
};

async function verify(get,repo,ref){
  if(ref.tag){
    const release=await get('/releases/tags/'+ref.tag);
    const commit=await get('/commits/'+ref.tag);
    if(!stableRelease(release)||commit.sha!==ref.sha)throw Error('Unexpected stable Desktop release');
    return {sha:ref.sha,time:release.published_at};
  }
  const deployment=await get('/deployments/'+ref.id);
  const statuses=await get('/deployments/'+ref.id+'/statuses?per_page=100');
  const success=statuses.find(status=>productionStatus(repo,deployment,status));
  if(deployment.sha!==ref.sha||!success)throw Error('Unverified historical deployment for '+repo);
  return {sha:ref.sha,time:success.created_at};
}

const editorialTopics=new Set(['condition','estimate','templates','scriptWizard','manageBilling','meetingDetection']);
const editorialCases=[];
const summary=['## Historical documentation decisions',''];
for(const {repo,from,to,historicalBaseline,absent=[],update=[]} of cases){
  const get=route=>readJson('https://api.github.com/repos/asksaysodev/'+repo+route,token);
  const release=await verify(get,repo,to);
  const baseline=from ? (await verify(get,repo,from)).sha : historicalBaseline;
  if(!baseline)throw Error('No verified baseline for '+repo);
  const changed=await get('/compare/'+baseline+'...'+release.sha);
  if(changed.status!=='ahead')throw Error('Unexpected historical comparison direction for '+repo);
  // Replay with the pages introduced by the release removed from the present inventory.
  const before=inventory.filter(article=>!absent.some(topic=>article.path===omittedArticles[topic]));
  const decision=decisionForComparison(repo,changed,before);
  validateCoverage(repo,decision);
  for(const [expected,topics] of [['consider-new-article',absent],['review-existing',update]]){
    for(const topic of topics){
      if(decision.topics.find(entry=>entry.topic===topic)?.disposition!==expected)
        throw Error('Unexpected '+repo+' '+topic+' decision');
      if(editorialTopics.has(topic)) editorialCases.push({
        topic,hasArticle:expected==='review-existing',expected:expected==='review-existing'?'update':'new',
      });
    }
  }
  const redeploy=await get('/compare/'+release.sha+'...'+release.sha);
  const same=decisionForComparison(repo,redeploy,inventory);
  if(!same||same.requiresNewArticleReview)throw Error('Same source comparison should be skipped');
  summary.push(`- ${repo}: ${decision.changedFiles} changed files. Verified ${absent.length} new-article and ${update.length} update decisions. An identical production SHA skips review.`);
}
await fs.writeFile('.docs-sync/editorial-cases.json',JSON.stringify(editorialCases));
const output=summary.join('\n')+'\n';
if(process.env.GITHUB_STEP_SUMMARY)await fs.appendFile(process.env.GITHUB_STEP_SUMMARY,output);
console.log(output);
