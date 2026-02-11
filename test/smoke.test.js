import { execSync } from 'child_process';
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { strict as assert } from 'assert';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bin = join(__dirname, '..', 'bin', 'pretty-plan.js');
const fixtureDir = join(__dirname, 'fixtures');

// Create fixture directory and test file
execSync(`mkdir -p "${fixtureDir}"`);
const mdPath = join(fixtureDir, 'test.md');
const pdfPath = join(fixtureDir, 'test.pdf');

writeFileSync(mdPath, `---
title: "Test Document"
---

# Heading 1

## Heading 2

Some **bold** and *italic* text.

\`\`\`javascript
const x = 1;
console.log(x);
\`\`\`

\`\`\`
plain code block
\`\`\`

| Col A | Col B |
|-------|-------|
| 1     | 2     |

- [ ] unchecked
- [x] checked

> A blockquote

---

[A link](https://example.com)
`);

// Clean up any previous PDF
if (existsSync(pdfPath)) unlinkSync(pdfPath);

// Run pretty-plan
try {
  execSync(`node "${bin}" "${mdPath}" --no-open`, { stdio: 'pipe' });
} catch (err) {
  console.error('FAIL: pretty-plan exited with error');
  console.error(err.stderr?.toString());
  process.exit(1);
}

// Verify PDF was created and is non-empty
assert.ok(existsSync(pdfPath), 'PDF file should exist');
const stats = readFileSync(pdfPath);
assert.ok(stats.length > 1000, `PDF should be non-trivial size (got ${stats.length} bytes)`);

// Verify PDF starts with correct header
const header = stats.slice(0, 5).toString();
assert.equal(header, '%PDF-', 'File should be a valid PDF');

// Clean up
unlinkSync(pdfPath);
unlinkSync(mdPath);

console.log('PASS: All smoke tests passed');
