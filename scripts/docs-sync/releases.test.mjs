import test from 'node:test';
import assert from 'node:assert/strict';
import {stableRelease,productionStatus,verifiedMap,mapProject,pages} from './releases.mjs';
const sha='a'.repeat(40);
test('desktop distribution requires published stable packages for both platforms',()=>{
  const r={tag_name:'v1.3.8',published_at:'2026-11-03',assets:['latest.yml','latest-mac.yml','Sayso.exe','Sayso.dmg'].map(name=>({name,state:'uploaded',size:100}))};
  assert.ok(stableRelease(r));
  for(const change of [{draft:true},{prerelease:true},{tag_name:'v1.3.8-beta.1'},{assets:r.assets.slice(1)}]) assert.ok(!stableRelease({...r,...change}));
});
test('Vercel status requires production, provider identity and successful result',()=>{
  const creator={login:'vercel[bot]'}, d={sha,environment:'Production',creator}, s={state:'success',environment_url:'https://app.vercel.app',creator};
  assert.ok(productionStatus('sayso-web-app',d,s));
  for (const environment of ['Preview','staging']) assert.ok(!productionStatus('sayso-web-app',{...d,environment},s));
  assert.ok(!productionStatus('sayso-web-app',d,{...s,state:'failure'}));
});
test('Heroku verifies the production app URL',()=>{
 const d={sha,environment:'sayso-server'}, s={state:'success',environment_url:'https://sayso-server-5b0876782ec2.herokuapp.com/',log_url:'https://dashboard.heroku.com/apps/sayso-server/activity/builds/abc'};
 assert.ok(productionStatus('sayso-backend',d,s));
 assert.ok(!productionStatus('sayso-backend',d,{...s,environment_url:'https://staging.herokuapp.com/'}));
});
test('Map requires the expected project and source repository',()=>{
 const d={projectId:mapProject,state:'READY',target:'production',meta:{githubOrg:'asksaysodev',githubRepo:'sayso-map',githubCommitSha:sha}};
 assert.ok(verifiedMap(d));
 for(const change of [{target:'preview'},{state:'ERROR'},{projectId:'another'}]) assert.ok(!verifiedMap({...d,...change}));
});
test('pagination refuses to silently truncate release history',async()=>{
 await assert.rejects(async()=>{for await(const _ of pages(async()=>Array(100).fill(1),'/x',1)){}},/pagination budget/);
});
