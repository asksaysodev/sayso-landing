import test from 'node:test';
import assert from 'node:assert/strict';
import {releaseWindow} from './release-window.mjs';

const a='a'.repeat(40), b='b'.repeat(40), c='c'.repeat(40);
const event=(id,sha,day)=>({id,sha,time:`2026-11-${day}T00:00:00Z`});

test('a first run compares current production to its immediate predecessor',()=>{
 const old=event('old',a,20), previous=event('previous',b,21), latest=event('latest',c,22);
 const discovered={events:[latest,previous,old],liveSha:c};
 assert.deepEqual(releaseWindow('sayso-composer',{},discovered),{
   start:'latest',comparisons:[{id:'latest',from:b,to:c}],
 });
 const next=event('next',a,23);
 const prior={reviewStart:'latest',liveSha:c,events:{old,previous,latest}};
 assert.deepEqual(releaseWindow('sayso-composer',prior,{events:[next],liveSha:a}),{
   start:'latest',comparisons:[{id:'latest',from:b,to:c},{id:'next',from:c,to:a}],
 });
});

test('the Map migration compares the verified same-commit predecessor only on the audited event',()=>{
 const sha='2129fd32f2368c402752b5a89475fce08d64b3a7';
 const known=event('8078515501-23201152324',sha,26);
 const fresh={events:[known],liveSha:sha};
 assert.deepEqual(releaseWindow('sayso-map',{},fresh).comparisons,[{id:known.id,from:sha,to:sha}]);
 const other=event('other',sha,27);
 assert.deepEqual(releaseWindow('sayso-map',{}, {events:[other],liveSha:sha}).comparisons,
   [{id:'other',from:null,to:sha}]);
});
