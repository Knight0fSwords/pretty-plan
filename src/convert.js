import { readFileSync } from 'fs';
import { resolve, basename } from 'path';
import open from 'open';
import { parseMarkdown } from './parse.js';
import { renderHtml } from './render.js';
import { generatePdf } from './pdf.js';

export async function convert(file, options) {
  const inputPath = resolve(file);
  const filename = basename(inputPath);

  // Verify file exists and is markdown
  let source;
  try {
    source = readFileSync(inputPath, 'utf-8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`Error: File not found: ${inputPath}`);
      process.exit(1);
    }
    throw err;
  }

  if (!/\.(md|markdown|mdx)$/i.test(filename)) {
    console.error(`Error: Not a markdown file: ${filename}`);
    process.exit(1);
  }

  let title = filename.replace(/\.(md|markdown|mdx)$/i, '');

  // Determine output path
  const outputPath = options.output
    ? resolve(options.output)
    : inputPath.replace(/\.(md|markdown|mdx)$/i, '.pdf');

  // Strip YAML frontmatter
  const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (frontmatterMatch) {
    const titleMatch = frontmatterMatch[1].match(/^title:\s*["']?(.+?)["']?\s*$/m);
    if (titleMatch) title = titleMatch[1];
    source = source.slice(frontmatterMatch[0].length);
  }

  const body = parseMarkdown(source);
  const html = renderHtml(body, title);

  console.log(`Converting ${filename} → PDF...`);

  try {
    await generatePdf(html, outputPath, title);
  } catch (err) {
    console.error(`Error generating PDF: ${err.message}`);
    process.exit(1);
  }

  console.log(`Written to ${outputPath}`);

  if (options.open !== false) {
    try {
      await open(outputPath);
    } catch {
      console.error('Warning: Could not open PDF automatically. Open it manually at the path above.');
    }
  }
}
