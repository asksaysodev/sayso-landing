import {products} from './releases.mjs';

// This Vercel production deployment preceded the first GitHub Deployment record for Map.
// https://vercel.com/sayso-web/sayso-map/BDgUekkzyz2JCznuxGdpuy2N5FiN
const mapBaseline = {sha:'319de1819fdc0bf211d05ba05eb45e0a6b0a3a74',time:'2026-11-26T02:08:40Z'};

const mapTopics = {
  condition: {
    article:'content/help/tools/sayso-map-condition-ratings.mdx',
    mention:/\b(?:condition (?:badge|rating)s?|Condition n\/a)\b/i,
    evidence:/\b(?:condBadge|wireConditions|conditionFor|Condition n\/a|condition badges?)\b|(?:^|\/)condition\.mjs\b/i,
  },
  estimate: {
    article:'content/help/tools/sayso-map-off-market-estimates.mdx',
    mention:/\b(?:AVM|(?:off[- ]market )?value estimates?)\b/i,
    evidence:/\b(?:AVM|estimateValue|avmBubble|adjustAvmForCondition)\b/i,
  },
  pdf: {
    article:'content/help/tools/use-sayso-map.mdx',
    heading:'## Download or email the results',
    evidence:/\b(?:Download PDF|wirePdf)\b|(?:^|\/)pdf(?:-template)?\.mjs\b/i,
  },
  address: {
    article:'content/help/tools/use-sayso-map.mdx',
    heading:'## Search an address',
    evidence:/\b(?:checkAddress|ADDRESS_HELP|address validation)\b|(?:^|\/)address\.js\b/i,
  },
  templates: {
    article:'content/help/tools/sayso-map-filters.mdx',
    heading:'## Text template',
    evidence:/\b(?:Buyer text|Seller text|Text template)\b/i,
  },
};

export function initialBaseline(repo, first) {
  return repo==='sayso-map' && first.time > mapBaseline.time && first.sha !== mapBaseline.sha ? mapBaseline.sha : null;
}

export function assessCoverage(repo, files, articles) {
  const topics = repo === 'sayso-map' ? Object.entries(mapTopics) : [];
  const matched = new Set();
  let unmatchedFiles=0, filesWithoutPatch=0;
  for (const file of files) {
    if (!file.patch) filesWithoutPatch++;
    const evidence = file.filename+'\n'+(file.patch||'').split('\n').filter(line=>/^[+-]/.test(line)).join('\n');
    const matches = topics.filter(([,topic])=>topic.evidence.test(evidence));
    if (!matches.length) unmatchedFiles++;
    for (const [topic] of matches) matched.add(topic);
  }
  return {
    changedFiles:files.length,
    unmatchedFiles,
    filesWithoutPatch,
    requiresNewArticleReview:true,
    topics:[...matched].sort().map(topic=>{
      const spec=mapTopics[topic];
      const article=articles.find(a=>a.path===spec.article);
      const covered=article && (!spec.heading || article.content.split('\n').includes(spec.heading));
      return {topic,article:spec.article,disposition:covered?'review-existing':'consider-new-article'};
    }),
  };
}

export function checkMapCrossLinks(articles) {
  const failures=[];
  for (const {article,mention} of Object.values(mapTopics).filter(topic=>topic.mention)) {
    const route='/'+article.slice(8,-4)+'/';
    for (const row of articles) {
      if (row.path===article || !row.path.startsWith('content/help/')) continue;
      const body=row.content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'')
        .replace(/^\s*<(?:Screenshot|Clip|Phone)\b[^\n]*$/gm,'');
      if (mention.test(body) && !body.includes(']('+route)) failures.push({path:row.path,route});
    }
  }
  return failures;
}

export function validateCoverage(repo, coverage) {
  if (!products.includes(repo) || !coverage || coverage.requiresNewArticleReview !== true ||
      !['changedFiles','unmatchedFiles','filesWithoutPatch'].every(k=>Number.isSafeInteger(coverage[k]) && coverage[k]>=0) ||
      coverage.unmatchedFiles>coverage.changedFiles || coverage.filesWithoutPatch>coverage.changedFiles ||
      !Array.isArray(coverage.topics) || coverage.topics.length>Object.keys(mapTopics).length ||
      coverage.topics.some(row=>repo!=='sayso-map' || !Object.hasOwn(mapTopics,row.topic) ||
        mapTopics[row.topic].article!==row.article || !['review-existing','consider-new-article'].includes(row.disposition))) {
    throw Error('Unexpected release coverage');
  }
}
