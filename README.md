# pretty-plan

Convert Markdown files to beautifully styled PDFs with Typora-inspired typography, syntax-highlighted code blocks, and polished formatting.

```
input.md → marked → highlight.js → HTML → Puppeteer → output.pdf
```

## Install

```bash
git clone https://github.com/Knight0fSwords/pretty-plan.git
cd pretty-plan
npm install
npm link
```

Requires Node.js 20+. The first `npm install` downloads Puppeteer's bundled Chromium (~200MB).

## Usage

```bash
# Generate PDF in the same directory, then open it
pretty-plan docs/plans/my-plan.md

# Custom output path
pretty-plan README.md --output ~/Desktop/readme.pdf

# Generate without opening
pretty-plan README.md --no-open
```

## What It Renders

- **Syntax-highlighted code blocks** (37 common languages via highlight.js)
- **GFM tables** with alternating row colors
- **Task lists** (`- [ ]` / `- [x]`)
- **Blockquotes** with left accent border
- **YAML frontmatter** stripped from output (title extracted if present)
- **Headers and footers** with document title, date, and page numbers

## Options

```
Usage: pretty-plan [options] <file>

Arguments:
  file                 Markdown file to convert

Options:
  -V, --version        output the version number
  -o, --output <path>  output PDF file path
  --no-open            do not open the PDF after generation
  -h, --help           display help for command
```

## Claude Code Slash Command

pretty-plan includes a `/pretty-plan` slash command for Claude Code. To install it:

```bash
ln -sf "$(pwd)/commands/pretty-plan.md" ~/.claude/commands/pretty-plan.md
```

Then in Claude Code:

```
/pretty-plan docs/plans/my-plan.md
```

## PDF Output

- **Page size:** Letter (8.5" x 11")
- **Margins:** 0.75" on all sides
- **Header:** Document title + date
- **Footer:** Page X of Y
- **Typography:** System font stack, 15px body, 1.7 line-height
- **Code blocks:** Soft gray background, rounded corners, GitHub syntax theme

The title is pulled from YAML frontmatter (`title:` field) or derived from the filename.

## Security

- JavaScript is disabled in the Puppeteer rendering context
- All outbound network requests are blocked during rendering
- HTML entities in titles are escaped to prevent injection
- The browser process is always cleaned up, even on errors

## Development

```bash
npm test        # Run smoke tests
npm link        # Make available globally
```

## Dependencies

| Package | Purpose |
|---------|---------|
| [commander](https://github.com/tj/commander.js) | CLI framework |
| [marked](https://github.com/markedjs/marked) | Markdown parser with GFM support |
| [marked-highlight](https://github.com/markedjs/marked-highlight) | Syntax highlighting extension |
| [highlight.js](https://highlightjs.org/) | Syntax highlighter (common languages) |
| [puppeteer](https://pptr.dev/) | Headless Chrome for PDF generation |
| [open](https://github.com/sindresorhus/open) | Cross-platform file opener |

## License

MIT
