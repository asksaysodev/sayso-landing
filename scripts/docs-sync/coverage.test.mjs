import test from 'node:test';
import assert from 'node:assert/strict';
import {assessCoverage,checkMapCrossLinks,initialBaseline,validateCoverage} from './coverage.mjs';

const condition='content/help/tools/sayso-map-condition-ratings.mdx';
const estimate='content/help/tools/sayso-map-off-market-estimates.mdx';

test('a first Map GitHub deployment is compared against the verified Vercel baseline',()=>{
  const release={sha:'2129fd32f2368c402752b5a89475fce08d64b3a7',time:'2026-11-26T06:49:57Z'};
  assert.equal(initialBaseline('sayso-map',release),'319de1819fdc0bf211d05ba05eb45e0a6b0a3a74');
  assert.equal(initialBaseline('sayso-map',{...release,time:'2026-11-25T00:00:00Z'}),null);
  assert.equal(initialBaseline('sayso-composer',release),null);
});

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
