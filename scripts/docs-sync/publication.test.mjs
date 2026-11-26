import test from 'node:test';
import assert from 'node:assert/strict';
import {classify,dashMessage,messageId,verifyLiveHelpDeployment} from './publication.mjs';
const f={filename:'content/help/tools/use-sayso-map.mdx',status:'modified',patch:'@@ -1 +1 @@\n-Open teh map.\n+Open the map.',deletions:1,additions:1};
test('only exact safe typo corrections qualify',()=>{
 assert.equal(classify([f]),'low-risk');
 for(const diff of [{status:'added'},{filename:'content/help/support/whats-new.mdx'},{patch:'-You can.\n+You cannot.'},{additions:2},{patch:'-<Ui>teh</Ui>\n+<Ui>the</Ui>'}])assert.equal(classify([{...f,...diff}]),'review');
});
test('publication messages link approved help URLs and have stable retry identities',()=>{
 const s=dashMessage(101,[f,{filename:'public/help/tools/map.mp4',status:'added'}],[{repo:'sayso-map',sha:'a'.repeat(40)}]);
 assert.match(s,/https:\/\/www.asksayso.com\/help\/tools\/use-sayso-map\//);assert.match(s,/Recordings: added map.mp4/);
 assert.equal(messageId('pr101'),messageId('pr101'));assert.notEqual(messageId('pr101'),messageId('pr102'));
});

test('notification requires the successful commit to be served by the canonical production Help Center',async()=>{
 const commit='a'.repeat(40);
 const identity=(body,status=200)=>async(url,options)=>{
   assert.equal(url,'https://www.asksayso.com/help/deployment.json');
   assert.equal(options.redirect,'error');
   assert.equal(options.cache,'no-store');
   return Response.json(body,{status});
 };
 await verifyLiveHelpDeployment(commit,identity({commit,environment:'production'}));
 for(const response of [
   identity({commit,environment:'preview'}),
   identity({commit:'b'.repeat(40),environment:'production'}),
   identity({error:'missing'},503),
 ]) await assert.rejects(()=>verifyLiveHelpDeployment(commit,response));
});
