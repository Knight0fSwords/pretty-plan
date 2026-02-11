#!/usr/bin/env node
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { program } from 'commander';
import { convert } from '../src/convert.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

program
  .name('pretty-plan')
  .description('Convert Markdown files to beautifully styled PDFs')
  .version(pkg.version)
  .argument('<file>', 'Markdown file to convert')
  .option('-o, --output <path>', 'Output PDF file path')
  .option('--no-open', 'Do not open the PDF after generation')
  .action(convert);

program.parse();
