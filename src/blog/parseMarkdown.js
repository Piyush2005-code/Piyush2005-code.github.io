/**
 * parseMarkdown.js — Zero-dependency Markdown → HTML renderer
 *
 * Supported syntax (Medium-compatible):
 *   # ## ###          headings
 *   **bold**          bold
 *   *italic*          italic
 *   `code`            inline code
 *   [text](url)       links
 *   ![alt](url)       images
 *   ```lang … ```     fenced code blocks
 *   > text            blockquotes
 *   - item            unordered lists
 *   1. item           ordered lists
 *   ---               horizontal rule
 *   blank line        paragraph break
 */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseInline(text) {
  return text
    // Images before links so ![...](...) isn't eaten by link regex
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) =>
      `<img src="${src}" alt="${escapeHtml(alt)}" class="blog-img" loading="lazy" />`)
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) =>
      `<a href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${escapeHtml(label)}</a>`)
    // Bold **text** or __text__
    .replace(/\*\*(.+?)\*\*|__(.+?)__/g, (_, a, b) => `<strong>${a || b}</strong>`)
    // Italic *text* or _text_  (after bold so ** is already consumed)
    .replace(/\*(.+?)\*|_(.+?)_/g, (_, a, b) => `<em>${a || b}</em>`)
    // Inline code
    .replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);
}

export function parseMarkdown(md) {
  const lines = md.split('\n');
  const html = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ── Fenced code block ──────────────────────────────────────────────────
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      html.push(
        `<pre class="blog-code${lang ? ` language-${lang}` : ''}"><code>${codeLines.join('\n')}</code></pre>`
      );
      i++; // skip closing ```
      continue;
    }

    // ── Horizontal rule ────────────────────────────────────────────────────
    if (/^---+$/.test(line.trim())) {
      html.push('<hr class="blog-hr" />');
      i++;
      continue;
    }

    // ── Headings ───────────────────────────────────────────────────────────
    const hMatch = line.match(/^(#{1,3})\s+(.+)/);
    if (hMatch) {
      const level = hMatch[1].length;
      const text = parseInline(hMatch[2]);
      const id = hMatch[2].toLowerCase().replace(/[^\w]+/g, '-');
      html.push(`<h${level} id="${id}" class="blog-h${level}">${text}</h${level}>`);
      i++;
      continue;
    }

    // ── Blockquote ─────────────────────────────────────────────────────────
    if (line.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(parseInline(lines[i].slice(2)));
        i++;
      }
      html.push(`<blockquote class="blog-blockquote">${quoteLines.join('<br />')}</blockquote>`);
      continue;
    }

    // ── Unordered list ─────────────────────────────────────────────────────
    if (/^[-*+]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(`<li>${parseInline(lines[i].replace(/^[-*+]\s/, ''))}</li>`);
        i++;
      }
      html.push(`<ul class="blog-ul">${items.join('')}</ul>`);
      continue;
    }

    // ── Ordered list ───────────────────────────────────────────────────────
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(`<li>${parseInline(lines[i].replace(/^\d+\.\s/, ''))}</li>`);
        i++;
      }
      html.push(`<ol class="blog-ol">${items.join('')}</ol>`);
      continue;
    }

    // ── Blank line (paragraph break) ───────────────────────────────────────
    if (line.trim() === '') {
      i++;
      continue;
    }

    // ── Paragraph ──────────────────────────────────────────────────────────
    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('#') &&
           !lines[i].startsWith('```') && !lines[i].startsWith('>') &&
           !/^[-*+]\s/.test(lines[i]) && !/^\d+\.\s/.test(lines[i]) &&
           !/^---+$/.test(lines[i].trim())) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      html.push(`<p class="blog-p">${parseInline(paraLines.join(' '))}</p>`);
    }
  }

  return html.join('\n');
}
