---
sidebar_position: 3
---

# Getting Started

Create your first ChSON cheatsheet in under 5 minutes.

## 1. Create the File

Create a file named `my-tool.chson.json`:

```json
{
  "$schema": "https://chson.dev/schema/v1/chson.schema.json",
  "title": "My Tool Cheatsheet",
  "publicationDate": "2026-01-16",
  "description": "Quick reference for My Tool.",
  "sections": [
    {
      "title": "Basics",
      "items": [
        {
          "title": "First command",
          "example": "mytool init",
          "description": "Initialize a new project."
        },
        {
          "title": "Run it",
          "example": "mytool run",
          "description": "Execute the default task."
        }
      ]
    }
  ]
}
```

## 2. Validate It

Use the ChSON CLI to check your file:

```bash
# Clone the repo
git clone https://github.com/carlesandres/csif.sh.git
cd csif.sh

# Install dependencies
npm install

# Validate your cheatsheet
node packages/chson-cli/src/chson.js validate path/to/my-tool.chson.json
```

## 3. Render It

Convert to Markdown:

```bash
node packages/chson-cli/src/chson.js render markdown path/to/my-tool.chson.json
```

This outputs a formatted Markdown table you can use in documentation, READMEs, or static sites.

## Tips

- **One example per item** - Keep examples focused and scannable
- **Short descriptions** - Aim for one sentence
- **Logical sections** - Group related commands together
- **Use `metadata`** - Add `homepage`, `category`, or custom fields

## Next Steps

- Browse the [Registry](/docs/registry) for examples
- Read the [Schema Reference](/docs/schema) for all available fields
- Contribute your cheatsheets to the registry
