/**
 * Tests for findInlineCtaLine. Run with: node --experimental-strip-types scripts/test-blog-content.mjs
 */
import assert from 'node:assert/strict';
import { findInlineCtaLine } from '../lib/blog-content.ts';

const cases = [
  { name: 'two plain paragraphs', md: 'One.\n\nTwo.\n\n## H', expect: 3 },
  { name: 'paragraph text inside a CalloutBox is not counted', md: 'One.\n\n<CalloutBox type="tip">\nInside text.\n\nMore inside.\n</CalloutBox>\n\nTwo.\n\nThree.', expect: 9 },
  { name: 'ScriptExample on one line is skipped', md: 'One.\n\n<ScriptExample label="x">Hi there.</ScriptExample>\n\nTwo.\n', expect: 5 },
  { name: 'list continuation lines are not paragraphs', md: 'One.\n\n- item\n  continued\nlazy continuation\n\nTwo.\n\nThree.', expect: 7 },
  { name: 'code fence content is skipped', md: 'One.\n\n```\nnot prose\n\nstill code\n```\n\nTwo.\n\nEnd.', expect: 9 },
  { name: 'second paragraph at the end with no blank line', md: 'One.\n\nTwo.', expect: -1 },
  { name: 'heading between paragraphs', md: 'One.\n\n## H\n\nTwo.\n\nThree.', expect: 5 },
  { name: 'only one paragraph', md: '## H\n\nOne.\n\n- a\n- b\n', expect: -1 },
];

let failed = 0;
for (const c of cases) {
  const got = findInlineCtaLine(c.md.split('\n'));
  try {
    assert.equal(got, c.expect);
    console.log(`ok   ${c.name}`);
  } catch {
    failed += 1;
    console.log(`FAIL ${c.name}: expected ${c.expect}, got ${got}`);
  }
}
if (failed) process.exit(1);
