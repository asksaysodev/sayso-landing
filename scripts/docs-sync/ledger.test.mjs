import test from 'node:test';
import assert from 'node:assert/strict';
import {reconcile} from './ledger.mjs';
import {products} from './releases.mjs';
const a='a'.repeat(40),b='b'.repeat(40), now='2026-11-25T12:00:00Z';
const state={version:1,products:{}};
const report={products:Object.fromEntries(products.map(repo=>[repo,{liveSha:a,events:[{id:'one',sha:a,time:now}]}]))};
test('reconciliation records a repeated SHA rollback as a new transition without duplicating events',()=>{
 const first=reconcile(state,report,now), retry=reconcile(first,report,now);
 assert.deepEqual(first,retry);
 const update=structuredClone(report);update.products['sayso-map']={liveSha:b,events:[{id:'two',sha:b,time:now}]};
 const last=reconcile(reconcile(first,update,now),report,now).products['sayso-map'];
 assert.equal(last.transitions.length,3);assert.equal(Object.keys(last.events).length,2);
});
test('an incomplete provider pass cannot advance the checkpoint',()=>{
 assert.throws(()=>reconcile(state,{products:{}},now));assert.deepEqual(state.products,{});
});
