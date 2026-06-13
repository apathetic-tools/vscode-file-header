<!-- Roadmap.md -->

# 📘 Roadmap / TODO

Ongoing overview of goals, priorities, and planned work for **file-header**.

> [!NOTE]
> This roadmap is not a commitment or release schedule — just a guide to focus development.

## Status

✅ Published v1.0.0 to VS Code Marketplace
✅ Core insertion and configuration logic implemented

📅 **Next milestone:** v1.1.0 — Feature Expansion  
🎯 Focus: Standalone CLI and extended configurability

## 🏁 Milestones

### **v1.x.x — Feature Expansion**

_(subject to change)_

> Post-1.0 feature expansion and configuration improvements.

## 🧩 Header Insertion

Core logic for detecting, generating, and updating headers.

- [ ] Configurable multi-line comment styles
- [ ] Smarter detection of existing headers

## ⚙️ Configuration

Enhancing configurability, schema validation, and migration.

- [ ] Evaluate default role mappings for common project structures

## 🪶 Editor Integration

Features that improve the VS Code user experience.

- [ ] Inline preview of resolved header template

## 🧪 Testing

Improving reliability and ensuring stability across changes.

## 🚀 Deployment

Packaging, publishing, and release automation.

- [ ] Validate VS Code manifest and metadata automatically
- [ ] Add `OVSX_PAT` to GitHub secrets and update semantic-release config once Open VSX namespace is approved
- [ ] Streamline versioning between extension + future CLI
- [ ] Improve extension activation performance
- [ ] 2026-06-19: Revisit and remove `@vscode/test-electron` and `@eslint/js` from `minimumReleaseAgeExclude` in `pnpm-workspace.yaml`
- [ ] Revisit `peerDependencyRules` for `typescript` in `pnpm-workspace.yaml` once `vite-tsconfig-paths` > 6.1.1 is released

## 🧭 Design & Architecture

Longer-term structure, maintainability, and extensibility.

- [ ] Extract core logic into a standalone NPM library with a CLI (`npx file-header`) for bulk updates
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
