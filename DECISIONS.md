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
