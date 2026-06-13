<!-- README.md -->

# Apathetic File Header for AI

[![Visual Studio Marketplace Version](https://vsmarketplacebadges.dev/version/apathetic.file-header-ai.svg?style=plastic&color=blue)](https://marketplace.visualstudio.com/items?itemName=apathetic.file-header-ai)
[![Installs](https://vsmarketplacebadges.dev/downloads-short/apathetic.file-header-ai.svg?style=plastic&color=5c2d91)](https://marketplace.visualstudio.com/items?itemName=apathetic.file-header-ai)
[![CI](https://img.shields.io/github/actions/workflow/status/apathetic-tools/vscode-file-header/ci.yml?style=plastic)](https://github.com/apathetic-tools/vscode-file-header/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=plastic)](LICENSE)

📘 **[Roadmap](./ROADMAP.md)** · 📝 **[Changelog](./CHANGELOG.md)**

> Lightweight, zero-config file headers for AI chats and humans.  
> A VS Code extension by **Apathetic Tools**.

Adds a **single-line file-header comment** containing the _relative filepath_ and an optional _role label_ at the top of your files.  
Perfect for developers who often paste files into chat — whether to **AI assistants** or **other humans**.

## Features

- ⚡ **Auto-Inserts on Save:** Automatically adds headers when saving a file.
- 🧭 **Contextual Headers:** Inserts the **relative filepath + filename** at the top of the file.
- 💬 **Multi-Language:** Supports per-language comment styles (`//`, `#`, `<!-- -->`, `/* */`, etc.).
- 🧠 **Smart Detection:** Automatically skips files that already have a valid header.
- 📜 **Smart Insertion:** Skips shebang in scripts and frontmatter in markdown.
- 🧩 **Role Hints:** Optional **role** hints via glob patterns (e.g. `(React component)`).
- 🏷️ **Format Modifiers:** Optional language **format** modifier (e.g. `(TypeScript React)`).
- ⚙️ **Configurable:** Works with user, `.code-workspace`, `.vscode`, and local `.file-header` settings.
- 🚀 **Zero-Config Default:** Sensible, non-destructive behavior out of the box. Minimal, fast, and MIT-licensed.

## Example

```ts
// src/components/Button.tsx (TypeScript React)
```

## Installation

Install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=apathetic.file-header-ai) or the [Open VSX Registry](https://open-vsx.org/extension/apathetic/file-header-ai).

## Configuration & Defaults

This extension is strictly **zero-configuration** by default. We provide sensible, non-destructive behavior out of the box so you don't have to configure anything.

Here is what you can expect by default:

- **`autoInsert` (true):** Automatically inserts a header on save if it's missing.
- **`autoUpdate` (true):** Updates the header's file path if you rename or move the file.
- **`filePathStyle` ("relativePath"):** Displays the path relative to your workspace root.
- **`showLanguage` (true):** Includes the VS Code language identifier in the header.
- **Smart Skips:** The extension automatically avoids inserting headers on files that already start with `auto` or `generated` comments.
- **Smart Placement:** The extension automatically inserts headers _after_ existing `copyright` or `license` comment blocks, rather than overwriting them.

If you wish to change these defaults, define specific include/exclude rules, or add custom "role" labels (e.g., `(React component)`):

📖 **[Read the Configuration Guide](docs/configuration.md)** for detailed settings, schemas, and examples.

## Roadmap

Version 1.0 will be **feature complete** for everyday and AI-chat use.  
Future updates may expand configurability.  
See [Roadmap.md](./Roadmap.md) for details.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup and development instructions.

## License

[MIT](LICENSE) © 2025 Apathetic Tools

> ✨ _AI tools were used to help draft language, formatting, and code — plus we just love em dashes._
