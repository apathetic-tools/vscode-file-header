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
