import test from 'node:test';
import assert from 'node:assert/strict';
import {outbound,topicIds} from './topics.mjs';
test('provider payload contains only fixed public vocabulary and batch positions',()=>{
 const source='SECRET-CANARY proprietaryAlgorithm() customer@example.com private/path/Settings.ts';
 const payload=outbound(topicIds(source),[topicIds(source)]);
 assert.deepEqual(payload,{changedTopics:['settings'],articles:[{slot:0,topics:['settings']}]});
 for(const invalid of ['private filename',999,{},null,1.3])assert.throws(()=>outbound([invalid],[]));
 assert.throws(()=>outbound([],[[0,0]]));
});
