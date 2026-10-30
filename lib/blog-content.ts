/**
 * Helpers for splitting blog MDX into renderable chunks without breaking it.
 * Kept free of server-only imports so it can be unit-tested directly.
 */

const BLOCK_START = /^(#|\||[-*+] |>|!\[|\d+\. |\{|import |export )/;
const JSX_OPEN = /^<([A-Za-z][\w.]*)\b/;

/**
 * Line index of the blank line that ends the second top-level prose paragraph,
 * or -1 if there is no safe place. Content inside JSX blocks (such as
 * <CalloutBox> or <ScriptExample>), code fences and list items never counts as
 * a paragraph, so a split here always lands between complete top-level blocks.
 */
export function findInlineCtaLine(lines: string[]): number {
  let paragraphs = 0;
  let inParagraph = false;
  let inFence = false;
  let inList = false;
  let jsxTag: string | null = null;
  let jsxDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (inFence) {
      if (line.startsWith('```')) inFence = false;
      continue;
    }
    if (jsxTag) {
      if (new RegExp(`^<${jsxTag}\\b`).test(line) && !line.endsWith('/>')) jsxDepth += 1;
      if (line.includes(`</${jsxTag}>`)) {
        jsxDepth -= 1;
        if (jsxDepth === 0) jsxTag = null;
      }
      continue;
    }

    if (line === '') {
      if (inParagraph) {
        inParagraph = false;
        paragraphs += 1;
        if (paragraphs === 2) return i;
      }
      inList = false;
      continue;
    }

    if (line.startsWith('```')) {
      inFence = true;
      inParagraph = false;
      continue;
    }

    const open = line.match(JSX_OPEN);
    if (open && !inParagraph) {
      const tag = open[1];
      const closesOnSameLine = line.endsWith('/>') || line.includes(`</${tag}>`);
      if (!closesOnSameLine) {
        jsxTag = tag;
        jsxDepth = 1;
      }
      continue;
    }

    if (BLOCK_START.test(line)) {
      inList = /^([-*+] |\d+\. )/.test(line);
      if (inParagraph) {
        // A block started without a blank line: the paragraph ended on the previous line,
        // but there is no blank line to split on, so keep looking.
        inParagraph = false;
        paragraphs += 1;
      }
      continue;
    }

    // Indented lines and lines directly under a list item continue that list item.
    if (inList || /^\s{2,}/.test(raw)) continue;

    inParagraph = true;
  }
  return -1;
}
