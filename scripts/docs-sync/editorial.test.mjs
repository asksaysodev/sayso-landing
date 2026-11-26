import test from 'node:test';
import assert from 'node:assert/strict';
import {buildEditorialBrief} from './editorial-brief.mjs';
import {validateEditorialResult} from './editorial.mjs';

test('the editorial request accepts only curated topics and an article-presence boolean',()=>{
 const first=buildEditorialBrief('condition',false);
 assert.match(first.existingHelp,/Find comps/);
 assert.match(buildEditorialBrief('condition',true).existingHelp,/condition ratings mean/);
 assert.match(JSON.stringify(first),/Condition n\/a/);
 const canary='PRIVATE_SOURCE_CANARY customer@example.com secret=abc';
 assert.throws(()=>buildEditorialBrief(canary,false),/Unapproved/);
 assert.throws(()=>buildEditorialBrief('condition',{source:canary}),/Unapproved/);
 assert.doesNotMatch(JSON.stringify(buildEditorialBrief('condition',false,canary)),/PRIVATE_SOURCE_CANARY/);
});

test('editorial responses require known evidence and exclude executable markup',()=>{
 const brief=buildEditorialBrief('condition',false);
 const draft={action:'new',draft:'Similar homes can display a condition badge.',evidence:[1]};
 assert.deepEqual(validateEditorialResult(draft,brief),draft);
 for(const invalid of [{evidence:[]},{evidence:[20]},{evidence:[1,1]},{draft:'<script />'},
  {draft:'{fetch("https://example.com")}'},{action:'publish'},{action:'skip'}]) {
   assert.throws(()=>validateEditorialResult({...draft,...invalid},brief),/Unusable/);
 }
 assert.equal(validateEditorialResult({action:'skip',draft:'',evidence:[]},brief).action,'skip');
});
