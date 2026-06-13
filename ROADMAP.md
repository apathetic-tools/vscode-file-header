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
- [x] Add smart glob (regex?) and include/exclude handling for file targeting
- [x] Support all comment styles (single-line, multi-line, doc)
- [x] Detect and skip existing license headers (regex-based)
- [x] Handle edge cases like generated / ignored files
- [ ] Configurable multi-line comment styles
- [ ] Smarter detection of existing headers
- [ ] Configurable `insertAfterWords` to intelligently place the file header _below_ existing copyright/license blocks instead of at the very top.

## ⚙️ Configuration

Enhancing configurability, schema validation, and migration.

- [x] Fill out `languagesByPath` and special-case defaults (`.gitignore`, `.vscode/`, `.github/`)
- [x] Implement full config schema support
- [x] Expose `fileHeader.languages` in VS Code settings (`contributes.configuration`)
- [x] Update `package.json` to include all `fileHeader.*` configuration keys
- [x] Update usage documentation in README (especially configuration section)
  - [x] Verify `CONTRIBUTING.md` remains accurate after config updates
- [x] Support JSONC for config files
- [ ] Evaluate default role mappings for common project structures
- [x] Improve config discovery / override logic
- [x] Support `.json` or `.jsonc` extension name, parse both as jsonc.

## 🪶 Editor Integration

Features that improve the VS Code user experience.

- [x] Add schema validation and error messages (editor intellisense?)
- [x] ~Add “Reload Header” command to manually reinsert headers~ (covered by "Update Header")
- [x] ~Add command to open current config in editor~ (omitted: multiple config sources make "current" ambiguous)
- [x] Command palette actions for "Insert Header" and "Update Header"
- [x] ~Context menu integration~ (omitted: command palette is sufficient, avoids crowding context menus)
- [x] ~Status bar indicator for header presence~ (omitted: unnecessary UX, better served by debug logs)
- [ ] Inline preview of resolved header template
- [x] ~VSCode "Quick fixes" for missing or invalid headers~ (omitted: obtrusive UX, use command palette or auto-save instead)

## 🧪 Testing

Improving reliability and ensuring stability across changes.

- [x] ~Integration tests for `activate()` lifecycle (mock VS Code API)~ (omitted: lifecycle is already covered by E2E tests)
- [x] End-to-end tests for header insertion on temporary files
- [x] Snapshot tests for header output
- [x] Unit tests for template and config parsing
- [x] Test behavior for renamed or moved files

## 🚀 Deployment

Packaging, publishing, and release automation.

- [ ] Tag and publish first public release (`v0.1.0`)
- [ ] Add release checklist or GitHub Action for publishing
- [ ] Validate VS Code manifest and metadata automatically
- [ ] Automate changelog generation for releases
- [ ] Streamline versioning between extension + future CLI
- [ ] Improve extension activation performance
- [ ] 2026-06-19: Revisit and remove `@vscode/test-electron` and `@eslint/js` from `minimum-release-age-exclude` in `.npmrc`

## 🧭 Design & Architecture

Longer-term structure, maintainability, and extensibility.

- [ ] Extract `file-header` as a standalone NPM library
  - [ ] Share logic between extension and CLI
- [ ] Create a lightweight CLI (`npx file-header`) for bulk updates
  - [ ] Implement benchmarking suite to measure whole-codebase processing times
  - [ ] Run benchmarks in CI to catch performance regressions
  - [ ] Compare current code execution time against the previous commit's performance to provide a reliable delta
- [ ] Add type-safe plugin interface for custom header rules
- [ ] Evaluate rewrite in Go for speed and portability (future exploration)
- [ ] Improve internal naming consistency
- [ ] Document key design decisions in `DECISIONS.md`
- [ ] Evaluate telemetry or usage analytics (opt-in only)

## 💡 Ideas / Someday

Uncommitted ideas worth revisiting later.

- [ ] Template presets (e.g., MIT, Apache, BSD)
- [ ] Visual UI for template editing
- [ ] Multi-language docstring support (JSDoc, Python, etc.)
- [ ] Optional decorative header styles
- [ ] Support installation from other package managers (Composer, PyPI, etc.)
  - [ ] Should we support multi-line automatically, or have the person do it manually?
  - [ ] Should they be able to add standard code under their header?
- [ ] Import/export config from other tools
- [ ] Optional comment block art / decorative headers
- [ ] AI-assisted header generation (experimental)
