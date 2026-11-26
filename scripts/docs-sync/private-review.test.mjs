import test from 'node:test';
import assert from 'node:assert/strict';
import {validatePrivateReview} from './private-review.mjs';

const input={files:[{id:1},{id:2}],articles:[{id:1,path:'article'}]};
const file=(id,status)=>({id,status});
const proposal={action:'update',article:1,title:'Update the existing article',draft:'Refresh the screenshot.',files:[1],visual:true};

test('offline review records unresolved and undocumented evidence separately',()=>{
 const reviewed=validatePrivateReview(input,{files:[file(1,'customer-facing'),file(2,'uncertain')],proposals:[proposal]});
 assert.equal(reviewed.pending,1);
 assert.equal(validatePrivateReview(input,{files:[file(1,'customer-facing'),file(2,'internal')],proposals:[]}).pending,1);
 assert.equal(validatePrivateReview(input,{files:[file(1,'customer-facing'),file(2,'internal')],proposals:[proposal]}).pending,0);
});

test('offline review must account for every source file and target an existing page for updates',()=>{
 const files=[file(1,'customer-facing'),file(2,'internal')];
 for(const result of [
  {files:[file(1,'customer-facing')],proposals:[]},
  {files:[files[0],files[0]],proposals:[]},
  {files,proposals:[{...proposal,article:8}]},
  {files,proposals:[{...proposal,files:[3]}]},
  {files,proposals:[{...proposal,action:'new'}]},
 ]) assert.throws(()=>validatePrivateReview(input,result));
});

test('a draft citing internal changes alone stays unverified',()=>{
 const reviewed=validatePrivateReview(input,{files:[file(1,'customer-facing'),file(2,'internal')],
   proposals:[{...proposal,files:[2,2]}]});
 assert.equal(reviewed.proposals[0].supported,false);
 assert.deepEqual(reviewed.proposals[0].files,[2]);
 assert.equal(reviewed.unverifiedProposals,1);
 assert.equal(reviewed.pending,1);
});
