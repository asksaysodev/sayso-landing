import test from 'node:test';
import assert from 'node:assert/strict';
import { updateMessage, NO_UPDATES } from './slack-format.mjs';

test('channel post uses new pages / updated with a nested change line', () => {
  const m = updateMessage(
    [{ url: 'https://www.asksayso.com/help/tools/a/', title: 'Page A' }],
    [{ url: 'https://www.asksayso.com/help/tools/b/', title: 'Page B', change: 'You can now save your comps as a PDF.' }],
  );
  assert.equal(m.text, 'new pages:\n• Page A\n\nupdated:\n• Page B\n    ◦ You can now save your comps as a PDF.');
  const els = m.blocks[0].elements;
  const lists = els.filter((e) => e.type === 'rich_text_list');
  assert.deepEqual(lists.map((l) => l.indent), [0, 0, 1]);
  assert.equal(lists[0].elements[0].elements[0].type, 'link');
});

test('sections with nothing in them are left out', () => {
  const m = updateMessage([], [{ url: 'u', title: 'Only', change: 'x' }]);
  assert.ok(!m.text.includes('new pages'));
});

test('no-update message is exact', () => {
  assert.equal(NO_UPDATES.text, 'Re: Recent merge to production, no help center updates needed.');
});
