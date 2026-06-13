# DECISIONS.md

A record of major design and implementation decisions in **file-header** — what was considered, what was chosen, and why.

Each entry should be:

- **Atomic:** one key decision per entry.
- **Dated:** include the date you made the call.
- **Rationale-focused:** emphasize _why_ something was done (or not done), not just _what_.

---

# Template

## [YYYY-MM-DD] Title of Decision

### Context

What was happening — what problem or limitation you encountered, or what idea you were evaluating.

### Options Considered

- Option A — pros/cons
- Option B — pros/cons
- (Optional) Related discussions, experiments, or PRs

### Decision

The chosen path (or decision _not_ to act), with a short explanation.

### Consequences

Implications, trade-offs, or follow-ups to keep in mind.

---

# Example

## [2026-06-13] Default Standard JSON Over VS Code's Native JSONC

### Context

VS Code natively classifies all files named `settings.json` (such as `.vscode/settings.json`, `.claude/settings.json`, or `.example/settings.json`) as `jsonc` (JSON with comments). Because our extension relied on `doc.languageId`, it was automatically injecting standard `jsonc` header comments into `.json` files that did not support comments, potentially breaking external parsers.

### Options Considered

- Option A: Explicitly exclude non-JSONC directories (e.g., `.claude/` or `.example/`).
  - _Pros:_ Solves the immediate bug.
  - _Cons:_ A "whack-a-mole" approach. As new tools create configuration files, we would need to constantly update exclusions to prevent injecting headers.
- Option B: Introduce a global `json_fallback` that treats `**/*.json` as standard `json` (disabling headers), and explicitly opt-in files we know are `jsonc` (like `**/.vscode/*.json`).
  - _Pros:_ Safe by default. Strict adherence to standard JSON specifications unless an exception is made.
  - _Cons:_ Requires slightly more complex cascading match logic.

### Decision

Chosen Option B. We implemented a priority check where `languagesByPath` is evaluated _before_ `languagesById`. A global `json_fallback` (`**/*.json`) explicitly sets the language to `JSON` (which has headers disabled), while specific known exceptions like `**/.vscode/*.json` are evaluated first and allowed to use `jsonc` headers.

Crucially, this means we are intentionally **ignoring** VS Code's reported `jsonc` language ID on `.json` files. Even if a user manually sets a `.json` file's language to JSON with Comments in VS Code, our extension will treat it as standard JSON by default based on its extension.

### Consequences

- The extension safely defaults to not breaking standard JSON files with unexpected comments.
- Because we ignore VS Code's native `jsonc` reporting for `.json` files, users _must_ explicitly add a rule to our extension's `languagesByPath` if they want a specific `.json` file treated as `jsonc` to receive headers.

---

## [2026-06-11] Example: Auto-Update and Auto-Insert Headers by Default

### Context

Originally, auto-updating header paths was disabled to avoid confusion on renames, and auto-insert was not configurable. However, for a tool focused on "maximum convenience for AI context", **stale context is harmful**. If a user renames a file but forgets to update the header, they feed incorrect context to the LLM.

### Options Considered

- 🔒 Safe by default: Opt-in only, manual updates.
- ⚡ Convenient by default: Auto-insert and auto-update on save.

### Decision

Set `autoUpdate = true` and `autoInsert = true` by default.

### Consequences

- **Pros**: The extension "just works" like Prettier. Stale context is eliminated, and zero-config magic is preserved.
- **Cons**: Might cause unwanted edits if a user opens a file in a repo where headers aren't allowed.
- **Mitigation**: We provide an easy opt-out via `.vscode/settings.json`, and our detection heuristic strictly ensures we only replace comments that look like our generated file paths (avoiding clobbering copyright headers or docstrings).
