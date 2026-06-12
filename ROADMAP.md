<!-- Roadmap.md -->

# 📘 Roadmap / TODO

Ongoing overview of goals, priorities, and planned work for **file-header**.

> [!NOTE]
> This roadmap is not a commitment or release schedule — just a guide to focus development.

## Status

✅ Core header insertion logic implemented  
✅ Builds successfully and runs in VS Code

📅 **Next milestone:** v0.1.0 — Publish to Marketplace  
🎯 Focus: Config schema + insertion edge cases

## 🏁 Milestones

### **v0.1.0 — Public Beta**

_(subject to change)_

> First Marketplace release with stable core functionality.  
> Should be good enough to daily drive and handle most configuration scenarios.  
> Anything documented should work and have tests.

## 🧩 Header Insertion

Core logic for detecting, generating, and updating headers.

- [x] Improve template resolution for `${language}`, `${format}`, `${role}`, `${context}`
- [x] Handle shebang lines in scripts — insert header after `#!` when present
- [x] Handle frontmatter in markdown — insert header after `---` when present
- [x] Add optional auto-update on save (`workspace.onDidSaveTextDocument`)
- [ ] Add smart glob (GTP? regex?) and include/exclude handling for file targeting
- [x] Support all comment styles (single-line, multi-line, doc)
- [x] Detect and skip existing license headers (regex-based)
- [x] Handle edge cases like generated / ignored files (🤖?)
- [ ] Configurable multi-line comment styles (🤖?)
- [ ] Smarter detection of existing headers (🤖?)
- [ ] Log errors like skipped insertions due to required config missing

## ⚙️ Configuration

Enhancing configurability, schema validation, and migration.

- [ ] Fill out `languagesByPath` and special-case defaults (`.gitignore`, `.vscode/`, `.github/`)
- [ ] Implement full config schema support
- [ ] Expose `fileHeader.languages` in VS Code settings (`contributes.configuration`)
- [ ] Update `package.json` to include all `fileHeader.*` configuration keys
- [ ] Update usage documentation in README (especially configuration section)
  - [ ] Verify `CONTRIBUTING.md` remains accurate after config updates
- [ ] Support JSONC for config files
- [ ] Evaluate default role mappings for common project structures
- [ ] Improve config discovery / override logic (🤖?)
- [ ] Support `.json` or `.jsonc` extension name, parse both as jsonc.

## 🪶 Editor Integration

Features that improve the VS Code user experience.

- [ ] Add schema validation and error messages (editor intellisense?)
- [ ] Add “Reload Header” command to manually reinsert headers
- [ ] Add command to open current config in editor
- [ ] Command palette actions for "Insert Header" and "Update Header"
- [ ] Context menu integration (🤖?)
- [ ] Status bar indicator for header presence (🤖?)
- [ ] Inline preview of resolved header template (🤖?)
- [ ] VSCode "Quick fixes" for missing or invalid headers (🤖?)

## 🧪 Testing

Improving reliability and ensuring stability across changes.

- [ ] Integration tests for `activate()` lifecycle (mock VS Code API)
- [ ] End-to-end tests for header insertion on temporary files
- [ ] Snapshot tests for header output (GTP?)
- [x] Unit tests for template and config parsing (🤖?)
- [ ] Test behavior for renamed or moved files
- [ ] Benchmark timings for various functionality that is repeatable

## 🚀 Deployment

Packaging, publishing, and release automation.

- [ ] Tag and publish first public release (`v0.1.0`)
- [ ] Add release checklist or GitHub Action for publishing
- [ ] Validate VS Code manifest and metadata automatically
- [ ] Automate changelog generation for releases
- [ ] Streamline versioning between extension + future CLI
- [ ] Improve extension activation performance (🤖?)

## 🧭 Design & Architecture

Longer-term structure, maintainability, and extensibility.

- [ ] Extract `file-header` as a standalone NPM library
  - [ ] Share logic between extension and CLI
- [ ] Create a lightweight CLI (`npx file-header`) for bulk updates
- [ ] Add type-safe plugin interface for custom header rules
- [ ] Evaluate rewrite in Go for speed and portability (future exploration)
- [ ] Improve internal naming consistency
- [ ] Document key design decisions in `DECISIONS.md`
- [ ] Evaluate telemetry or usage analytics (opt-in only)

## 💡 Ideas / Someday

Uncommitted ideas worth revisiting later.

- [ ] Template presets (e.g., MIT, Apache, BSD) (🤖?)
- [ ] Visual UI for template editing (🤖?)
- [ ] Multi-language docstring support (JSDoc, Python, etc.)
- [ ] Optional decorative header styles
- [ ] Support installation from other package managers (Composer, PyPI, etc.)
  - [ ] Should we support multi-line automatically, or have the person do it manually?
  - [ ] Should they be able to add standard code under their header?
- [ ] Import/export config from other tools
- [ ] Optional comment block art / decorative headers (🤖?)
- [ ] AI-assisted header generation (experimental)
