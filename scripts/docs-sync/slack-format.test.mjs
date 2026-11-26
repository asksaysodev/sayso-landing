import test from 'node:test';
import assert from 'node:assert/strict';
import { updateMessage, noUpdates, cleanPlain, releaseMetadata } from './slack-format.mjs';

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

test('no-update message names the product and says what was merged', () => {
  assert.equal(noUpdates('Sayso Map', 'small map updates').text, 'Sayso Map: small map updates. No help center updates needed.');
  assert.equal(noUpdates('Web app', 'Simple code cleanup.').text, 'Web app: Simple code cleanup. No help center updates needed.');
});

test('no-update message falls back to the original sentence without a summary', () => {
  assert.equal(noUpdates('Emails', '').text, 'Re: Recent merge to production (Emails), no help center updates needed.');
  assert.equal(noUpdates('', undefined).text, 'Re: Recent merge to production, no help center updates needed.');
});

test('the summary line cannot carry links, mentions or markup into Slack', () => {
  assert.equal(cleanPlain('fixes <!channel> see https://evil.example/x *now*\nplease'), 'fixes !channel see now please');
  assert.equal(cleanPlain('<@U123> `rm -rf`'), 'U123 rm -rf');
  assert.ok(cleanPlain('word '.repeat(80)).length <= 140);
  assert.equal(cleanPlain('..'), '');
});

test('thread context rides along as flat Slack metadata', () => {
  const m = releaseMetadata(
    { product: 'sayso-map', productName: 'Sayso Map', from: 'a'.repeat(40), to: 'b'.repeat(40), totalChangedFiles: 7, interfaceFiles: ['public/x.js'], commits: ['fix pin color', 'tidy css'] },
    { plain: 'small map updates.', summary: 'Pins changed color.' },
    'skip',
  );
  assert.equal(m.event_type, 'docs_sync_release');
  assert.equal(m.event_payload.plain, 'small map updates');
  assert.equal(m.event_payload.commits, 'fix pin color\ntidy css');
  for (const v of Object.values(m.event_payload)) assert.ok(['string', 'number'].includes(typeof v));
  assert.ok(JSON.stringify(releaseMetadata({ commits: Array(500).fill('x'.repeat(100)) }, {}, 'skip')).length < 6000);
});
