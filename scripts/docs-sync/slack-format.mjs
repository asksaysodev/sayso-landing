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
// The one-line "what was merged" summary comes from an AI reading commit titles, so it is cleaned
// before it reaches Slack: one line, no links, mentions or markup, and a hard length cap.
export function cleanPlain(s) {
  let out = String(s || '')
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/[<>@*_`~|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (out.length > 140) out = out.slice(0, 140).replace(/\s+\S*$/, '');
  out = out.replace(/[.!?,;:\s]+$/, '');
  return out.length >= 3 ? out : '';
}

// "Sayso Map: small map updates. No help center updates needed."
// Without a summary it falls back to the original sentence.
export function noUpdates(productName, plain) {
  const line = cleanPlain(plain);
  const name = cleanPlain(productName);
  if (!line) return { text: `Re: Recent merge to production${name ? ` (${name})` : ''}, no help center updates needed.` };
  return { text: `${name ? name + ': ' : ''}${line}. No help center updates needed.` };
}

// Travels with the post (hidden in Slack) so Dash can answer replies in the thread: "what was merged then?"
// Slack keeps metadata values flat, so the commit titles are one newline-joined string.
export function releaseMetadata(release, result, decision) {
  const cut = (s, n) => String(s || '').slice(0, n);
  return {
    event_type: 'docs_sync_release',
    event_payload: {
      product: cut(release.product, 80),
      product_name: cut(release.productName, 80),
      from: cut(release.from, 40),
      to: cut(release.to, 40),
      decision: cut(decision, 20),
      plain: cleanPlain(result.plain),
      summary: cut(result.summary, 400),
      files_changed: Number(release.totalChangedFiles) || 0,
      interface_files_changed: (release.interfaceFiles || []).length,
      commits: cut((release.commits || []).join('\n'), 3500),
    },
  };
}

