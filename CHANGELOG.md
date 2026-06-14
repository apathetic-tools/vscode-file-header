## [1.1.1](https://github.com/apathetic-tools/vscode-file-header/compare/v1.1.0...v1.1.1) (2026-06-14)

### Bug Fixes

- broaden VS Code engine compatibility to 1.50.0+ ([7ea6e73](https://github.com/apathetic-tools/vscode-file-header/commit/7ea6e73cd5830e3a9820e9c23a9c307ac339429e))

# [1.1.0](https://github.com/apathetic-tools/vscode-file-header/compare/v1.0.1...v1.1.0) (2026-06-14)

### Features

- add support for Open VSX publishing ([e12b270](https://github.com/apathetic-tools/vscode-file-header/commit/e12b270eb16558bb166b30a78c1cc54d3b3d90c9))

## [1.0.1](https://github.com/apathetic-tools/vscode-file-header/compare/v1.0.0...v1.0.1) (2026-06-13)

### Bug Fixes

- default to standard json over vscode jsonc ([46fdd2e](https://github.com/apathetic-tools/vscode-file-header/commit/46fdd2e1c35b31b7227e2d7307a8f1fa891a0914))

# 1.0.0 (2026-06-13)

### Bug Fixes

- add git write permissions to semantic-release ([d737142](https://github.com/apathetic-tools/vscode-file-header/commit/d737142e29a70f9062bd5d8adba15b0f9edc4fc5))
- resolve lint and format errors causing CI failures ([cfbee24](https://github.com/apathetic-tools/vscode-file-header/commit/cfbee24b487f66eb9f5cffbdc8559af88dd404b1))
- resolve typescript deprecation by moving to Node16 module resolution ([7921186](https://github.com/apathetic-tools/vscode-file-header/commit/7921186281969afb1b8d3a0202c80e763a18fedd))
- update eslint v9 configs to fix OOM during linting ([c506982](https://github.com/apathetic-tools/vscode-file-header/commit/c506982c4da0e7a4677373b7364ba04ecb356cc3))

### Features

- add Insert Header and Update Header commands ([91fc33c](https://github.com/apathetic-tools/vscode-file-header/commit/91fc33c9299ad0947af46f2bdc8db6aaa979c5f6))
- add insertAfterWords config to gracefully insert headers below existing license blocks ([35ce7e1](https://github.com/apathetic-tools/vscode-file-header/commit/35ce7e13dd3f9b68d0452d1d908567684fd658ff))
- add shebang support and update README features list ([fed2faa](https://github.com/apathetic-tools/vscode-file-header/commit/fed2faa5736bd2d57feaa079075a74e1118ae1e1))
- add support for custom .fileheader.jsonc configuration ([33e88e7](https://github.com/apathetic-tools/vscode-file-header/commit/33e88e7154360c76a381277ebf2ac0a3d3eb8168))
- **config:** add default languagesByPath config for common dotfiles ([b542270](https://github.com/apathetic-tools/vscode-file-header/commit/b54227087e00f19483494a0cbb331bb946c8004b))
- default to auto-insert and auto-update on save ([2ee70f8](https://github.com/apathetic-tools/vscode-file-header/commit/2ee70f8a272988ae10c4f39871a34d90f47655a9))
- expose all configuration keys in package.json and workspace settings ([f54bb8c](https://github.com/apathetic-tools/vscode-file-header/commit/f54bb8c3de3132a229077282a0c89813179198d7))
- handle frontmatter in markdown files and update docs ([590929d](https://github.com/apathetic-tools/vscode-file-header/commit/590929dd26e9e7d65a26c5be44c2f84faac2ac06))
- implement full config schema support ([dc79704](https://github.com/apathetic-tools/vscode-file-header/commit/dc7970413de04c29208fbe189c51f96991ce3906))
- implement include/exclude globbing for file targeting ([eda34ce](https://github.com/apathetic-tools/vscode-file-header/commit/eda34cec5545d77b4593d8faa84fa4c7533d7889))
- setup semantic-release deployment pipeline ([150c182](https://github.com/apathetic-tools/vscode-file-header/commit/150c1824cab02d127e8fe5013e158af4caa567f7))
- skip header insertion for generated files and honor ignore settings ([eb643bb](https://github.com/apathetic-tools/vscode-file-header/commit/eb643bbdf4b33d49fd8355254f6e5c1c5569c779))
- support all comment styles for header detection ([68bb371](https://github.com/apathetic-tools/vscode-file-header/commit/68bb371f3fd16a3f75905651ed51d0fa570ad380))
