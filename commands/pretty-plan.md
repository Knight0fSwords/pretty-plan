---
name: pretty-plan
description: Convert a markdown file to a beautifully styled PDF and open it
argument-hint: "<path-to-markdown-file>"
allowed-tools: [Read, Bash]
---

# Pretty Plan

Convert a markdown file to a beautifully styled PDF with Typora-inspired typography, syntax-highlighted code blocks, and polished formatting.

## Instructions

1. The user has provided a file path: `$ARGUMENTS`
2. Verify the file exists by reading it
3. Run the pretty-plan CLI tool (globally linked via npm link):

```bash
pretty-plan $ARGUMENTS
```

4. If successful, tell the user the PDF has been generated and opened
5. If it fails, explain the error and suggest a fix
