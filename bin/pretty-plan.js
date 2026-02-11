#!/usr/bin/env node
import { program } from 'commander';
import { convert } from '../src/convert.js';

program
  .name('pretty-plan')
  .description('Convert Markdown files to beautifully styled PDFs')
  .version('1.0.0')
  .argument('<file>', 'Markdown file to convert')
  .option('-o, --output <path>', 'Output PDF file path')
  .option('--no-open', 'Do not open the PDF after generation')
  .action(convert);

program.parse();
