import test from 'node:test';
import assert from 'node:assert/strict';
import {stableRelease,productionStatus,discoverProduct,pages} from './releases.mjs';
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
  for (const environment_url of [undefined,'broken','http://app.vercel.app','https://vercel.app.example.com']) {
    assert.ok(!productionStatus('sayso-map',d,{...s,environment_url}));
  }
});
test('Heroku verifies the production app URL',()=>{
 const d={sha,environment:'sayso-server'}, s={state:'success',environment_url:'https://sayso-server-5b0876782ec2.herokuapp.com/',log_url:'https://dashboard.heroku.com/apps/sayso-server/activity/builds/abc'};
 assert.ok(productionStatus('sayso-backend',d,s));
 assert.ok(!productionStatus('sayso-backend',d,{...s,environment_url:'https://staging.herokuapp.com/'}));
});
test('Map, Web App and Composer discover successful GitHub Production deployments', async () => {
  const creator = {login:'vercel[bot]'};
  const time = '2026-11-26T06:00:00Z';
  const mapSha = '2129fd32f2368c402752b5a89475fce08d64b3a7';
  const success = {id:23201152324,state:'success',created_at:time,environment_url:'https://sayso-koj1e4i23-sayso-web.vercel.app',creator};
  const production = {id:8078515501,sha:mapSha,environment:'Production',created_at:time,creator};
  const preview = {...production,id:8078515502,sha,environment:'Preview'};
  const failed = {...production,id:8078515503,sha};
  const responses = {
    '/deployments?environment=Production&per_page=100&page=1':[failed,preview,production],
    '/deployments/8078515501/statuses?per_page=100':[success],
    '/deployments/8078515502/statuses?per_page=100':[success],
    '/deployments/8078515503/statuses?per_page=100':[{...success,state:'failure'}],
  };
  const gh = async route => {
    assert.ok(Object.hasOwn(responses,route),'unexpected route '+route);
    return responses[route];
  };
  for (const repo of ['sayso-map','sayso-web-app','sayso-composer']) {
    const discovered = await discoverProduct(repo,'2026-11-25T00:00:00Z',gh);
    assert.deepEqual(discovered,{liveSha:mapSha,events:[{id:'8078515501-23201152324',sha:mapSha,time}]});
  }
});

test('pagination refuses to silently truncate release history',async()=>{
 await assert.rejects(async()=>{for await(const _ of pages(async()=>Array(100).fill(1),'/x',1)){}},/pagination budget/);
});
