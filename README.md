<!-- README.md -->

# File Header for AI

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/apathetic.file-header-for-ai?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=apathetic.file-header-for-ai)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/apathetic.file-header-for-ai?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=apathetic.file-header-for-ai)
[![CI](https://github.com/apathetic-tools/vscode-file-header/actions/workflows/ci.yml/badge.svg)](https://github.com/apathetic-tools/vscode-file-header/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

📘 **[Roadmap](./ROADMAP.md)** · 📝 **[Release Notes](https://github.com/apathetic-tools/vscode-file-header/releases)**

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

Once published, install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
Or, for local builds:

```sh
pnpm vsce package
code --install-extension vscode-file-header-0.0.1.vsix
```

## Configuration & Defaults

This extension is strictly **zero-configuration** by default. We provide sensible, non-destructive behavior out of the box so you don't have to configure anything. 

Here is what you can expect by default:

- **`autoInsert` (true):** Automatically inserts a header on save if it's missing.
- **`autoUpdate` (true):** Updates the header's file path if you rename or move the file.
- **`filePathStyle` ("relativePath"):** Displays the path relative to your workspace root.
- **`showLanguage` (true):** Includes the VS Code language identifier in the header.
- **Smart Skips:** The extension automatically avoids inserting headers on files that already start with `auto`, `generated`, `copyright`, or `license` comments.

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

> ✨ _ChatGPT was used to help draft language, formatting, and code — plus we just love em dashes._
