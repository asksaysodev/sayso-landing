import test from 'node:test';
import assert from 'node:assert/strict';
import {inspectArticle} from './validate.mjs';
const header='---\ntitle: Test\ndescription: Test article\nupdated: 2026-11-25\n---\n';
test('safe media and labels are accepted',()=>assert.deepEqual(inspectArticle(header+'<Screenshot src="/help/tools/map.webp" alt="Filters" width={300} />').media,['/help/tools/map.webp']));
test('unsafe MDX, out-of-scope media, unsafe frontmatter and active link schemes fail validation',()=>{
 for(const content of ['{process.env.KEY}','export const x = 1','<script />','<Ui onClick={() => 1}>Open</Ui>','<Screenshot src="/help/../.env" />','[link](javascript:alert)'])assert.throws(()=>inspectArticle(header+content));
 assert.throws(()=>inspectArticle('---js\nmalicious\n---\nHello'));
});
