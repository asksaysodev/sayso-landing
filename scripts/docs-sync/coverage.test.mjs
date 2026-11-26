import test from 'node:test';
import assert from 'node:assert/strict';
import {assessCoverage,checkMapCrossLinks,decisionForComparison,validateCoverage} from './coverage.mjs';

const condition='content/help/tools/sayso-map-condition-ratings.mdx';
const estimate='content/help/tools/sayso-map-off-market-estimates.mdx';

test('new behavior is checked against the inventory and unknown files stay visible',()=>{
  const files=[
    {filename:'public/app.js',patch:'@@ header\n+function condBadge(c) {}\n+function avmBubble(avm) {}'},
    {filename:'lib/new-feature.mjs'},
  ];
  const coverage=assessCoverage('sayso-map',files,[{path:estimate,content:'Existing AVM article'}]);
  assert.deepEqual(coverage,{
    changedFiles:2,unmatchedFiles:1,filesWithoutPatch:1,requiresNewArticleReview:true,
    topics:[
      {topic:'condition',article:condition,disposition:'consider-new-article'},
      {topic:'estimate',article:estimate,disposition:'review-existing'},
    ],
  });
  assert.doesNotThrow(()=>validateCoverage('sayso-map',coverage));
});

test('Map feature mentions require links from other Help Center articles',()=>{
  const path='content/help/tools/sayso-map.mdx';
  const route='/help/tools/sayso-map-condition-ratings/';
  assert.deepEqual(checkMapCrossLinks([{path,content:'A condition badge may appear.'}]),[{path,route}]);
  assert.deepEqual(checkMapCrossLinks([{path,content:'A [condition badge]('+route+') may appear.'}]),[]);
  assert.deepEqual(checkMapCrossLinks([{path:condition,content:'A condition badge may appear.'}]),[]);
});

test('new and existing tasks produce separate decisions while unknown behavior stays pending',()=>{
 const comparison={status:'ahead',total_commits:1,files:[
  {filename:'electron/callDetection/callPrompt.ts',patch:'+Show the prompt'},
  {filename:'electron/otherBehavior.ts',patch:'+Different behavior'},
 ]};
 const article={path:'content/help/desktop-app/meeting-detection.mdx',content:'An existing article'};
 const first=decisionForComparison('sayso-desktop-app',comparison,[]);
 assert.equal(first.topics[0].disposition,'consider-new-article');
 const update=decisionForComparison('sayso-desktop-app',comparison,[article]);
 assert.equal(update.topics[0].disposition,'review-existing');
 assert.equal(update.unmatchedFiles,1);
 assert.equal(update.requiresNewArticleReview,true);
});

test('only a complete identical comparison skips the source review',()=>{
 const same={status:'identical',files:[],total_commits:0};
 const result=decisionForComparison('sayso-map',same,[]);
 assert.equal(result.requiresNewArticleReview,false);
 assert.doesNotThrow(()=>validateCoverage('sayso-map',result));
 for(const comparison of [
  {...same,status:'ahead',total_commits:1},
  {...same,status:'diverged',total_commits:5},
  {...same,files:null},
  {...same,files:[{filename:'src/foo.ts'}]},
  {...same,status:'ahead',total_commits:101,files:[{filename:'src/foo.ts'}]},
 ]) assert.equal(decisionForComparison('sayso-map',comparison,[]),null);
});
