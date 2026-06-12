# Configuration

The `vscode-file-header` extension can be configured in two ways: through the native VS Code Settings menu, or via a custom configuration file at the root of your project.

## VS Code Settings (Default)

By default, we recommend configuring the extension directly in your VS Code `settings.json` or through the Settings UI.
You can find all settings by searching for `fileHeader`.

Example `.vscode/settings.json`:

```json
{
  "fileHeader.autoInsert": true,
  "fileHeader.showLanguage": true,
  "fileHeader.roles": {
    "src/components/*": "React component"
  }
}
```

## Custom Configuration File

If you prefer to keep your file header settings outside of `.vscode/settings.json`, you can create a `.fileheader.json` or `.fileheader.jsonc` file at the root of your project workspace.

These files fully support JSONC (JSON with comments), allowing you to leave notes about your configuration.

> **Note**: VS Code workspace settings will always override the settings defined in your `.fileheader.jsonc` file.

### Omitting the `fileHeader.` Prefix

For convenience, you can copy and paste your settings directly from VS Code into your `.fileheader.jsonc` file. The extension accepts configuration keys both with and without the `fileHeader.` prefix.

Example `.fileheader.jsonc`:

```jsonc
{
  // Both of these work!
  "fileHeader.autoInsert": true,
  "showLanguage": true,

  "roles": {
    "src/components/*": "React component",
  },
}
```

---

## Configuration Reference

Below is the complete list of available configuration options.

### General Options

- **`autoInsert`** _(boolean, default: `true`)_  
  Automatically insert a file header when a file is saved if it is missing.
- **`autoUpdate`** _(boolean, default: `true`)_  
  Automatically replace an outdated header path if the file has been moved.

### Targeting & Exclusions

- **`include`** _(array of strings, default: `[]`)_  
  Glob patterns to explicitly target. If non-empty, only files matching these patterns will be processed.
- **`exclude`** _(array of strings, default: `[]`)_  
  Glob patterns of files to ignore (e.g., `"**/*.test.ts"`).
- **`skipWords`** _(array of strings)_  
  If the first line of a file is a comment and contains any of these words (e.g., `auto`, `generated`, `copyright`), the file will be ignored.

### Display Toggles

- **`filePathStyle`** _(string: `"filename" | "relativePath" | "absolutePath"`, default: `"relativePath"`)_  
  Defines how the file path is displayed in the header.
- **`showLanguage`** _(boolean, default: `true`)_  
  Show the main language label (derived from VS Code).
- **`showFormat`** _(boolean, default: `true`)_  
  Show the format label (e.g., "React", "GitHub Issue Template").
- **`showRoles`** _(boolean, default: `true`)_  
  Show matching role labels.

### Templates

Templates allow you to customize how different parts of the header are formatted. They support replacing variables.

- **`filePathTemplate`** _(string, default: `"${filePath}"`)_
- **`languageTemplate`** _(string, default: `" (${language})"`)_
- **`formatTemplate`** _(string, default: `" (${format})"`)_
- **`jointLanguageAndFormatTemplate`** _(string, default: `" (${language} — ${format})"`)_
- **`contextTemplate`** _(string, default: `" [${context}]"`)_
- **`roleTemplate`** _(string, default: `" ${role}"`)_

### Matching Behaviors

- **`matchStyle`** _(string: `"filename" | "relativePath" | "absolutePath"`, default: `"relativePath"`)_  
  The path style to use when matching files against your glob patterns.
- **`useLanguagesById`** _(boolean, default: `true`)_  
  Enable or disable using VS Code language ID templates.
- **`useLanguagesByPath`** _(boolean, default: `true`)_  
  Enable or disable using filepath-based language templates.

---

### Advanced Configurations

#### `languagesById`

Language header templates keyed by VS Code language ID (e.g., `typescript`, `python`).

- **Shape**: Object mapping a Language ID to a Language Template object.
- **Properties**:
  - `headerTemplate`: The template for the entire header.
  - `state`: `"enabled"`, `"disabled"`, or `"fallback"`.
  - `fileMatch`: Optional object or array of objects to add format, context, or language overrides for specific globs within this language.

```jsonc
"languagesById": {
  "typescript": {
    "headerTemplate": "/* ${headerLine} */",
    "state": "enabled",
    "fileMatch": {
      "glob": "**/*.test.ts",
      "format": "Unit Test"
    }
  }
}
```

#### `languagesByPath`

Language header templates keyed by a custom identifier, matching files entirely via glob patterns regardless of the VS Code language ID.

- **Shape**: Object mapping a custom ID to a Language Template object.
- **Properties**:
  - Same as `languagesById`, but `fileMatch` is **required**.

```jsonc
"languagesByPath": {
  "dockerfiles": {
    "headerTemplate": "# ${headerLine}",
    "fileMatch": {
      "glob": "**/Dockerfile.*",
      "language": "Docker"
    }
  }
}
```

#### `roles`

Optional mapping of glob patterns to role/type labels to provide more context about what a file is used for (e.g., "Page component", "Utility function").

- **Shape**: Object mapping a Role ID to a Role object.
- **Properties**:
  - `glob`: A string or array of glob strings to match files.
  - `role`: The label text to append (e.g., "React component").
  - `state`: `"enabled"` or `"disabled"`.
  - `matchStyle`: Override for the path match style.

```jsonc
"roles": {
  "reactComponents": {
    "glob": "src/components/**/*.tsx",
    "role": "React Component"
  }
}
```
