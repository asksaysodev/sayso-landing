// Dash's channel post, in the layout Kuvaal specified.
const t = (text, style) => ({ type: 'text', text, ...(style ? { style } : {}) });
const link = (url, text) => ({ type: 'link', url, text });
const item = (...elements) => ({ type: 'rich_text_section', elements });
const list = (indent, items) => ({ type: 'rich_text_list', style: 'bullet', indent, elements: items });

// The channel post Kuvaal specified: "new pages:" then "updated:" with a nested "what changed" line.
export function updateMessage(newPages, updated) {
  const blocks = [];
  if (newPages.length) {
    blocks.push(item(t('new pages:', { bold: true })), list(0, newPages.map((p) => item(link(p.url, p.title)))));
  }
  if (updated.length) {
    if (blocks.length) blocks.push(item(t('\n')));
    blocks.push(item(t('updated:', { bold: true })));
    for (const p of updated) {
      blocks.push(list(0, [item(link(p.url, p.title))]));
      if (p.change) blocks.push(list(1, [item(t(p.change))]));
    }
  }
  const fallback = [
    newPages.length ? 'new pages:\n' + newPages.map((p) => `• ${p.title}`).join('\n') : '',
    updated.length ? 'updated:\n' + updated.map((p) => `• ${p.title}${p.change ? '\n    ◦ ' + p.change : ''}`).join('\n') : '',
  ].filter(Boolean).join('\n\n');
  return { text: fallback, blocks: [{ type: 'rich_text', elements: blocks }] };
}
export const NO_UPDATES = { text: 'Re: Recent merge to production, no help center updates needed.' };

