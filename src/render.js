import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Load theme CSS
const themeCss = readFileSync(join(__dirname, 'styles', 'theme.css'), 'utf-8');

// Load highlight.js theme CSS
const hljsDir = dirname(require.resolve('highlight.js/package.json'));
const highlightCss = readFileSync(join(hljsDir, 'styles', 'github.css'), 'utf-8');

export function renderHtml(body, title) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>${highlightCss}</style>
  <style>${themeCss}</style>
</head>
<body>
  <article class="markdown-body">${body}</article>
</body>
</html>`;
}
