<!-- PUBLISH.md (markdown) -->

# Publishing vscode-file-header

Publishing is **100% automated** via GitHub Actions using `semantic-release`.

---

## Automated Publishing

When PRs are merged or commits are pushed directly to the `main` branch, the [Release Workflow](../.github/workflows/release.yml) automatically runs.

It analyzes the commit messages based on the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `fix: ...` triggers a **Patch** release (`1.0.1 -> 1.0.2`)
- `feat: ...` triggers a **Minor** release (`1.0.0 -> 1.1.0`)
- `BREAKING CHANGE: ...` (or `type!: ...`) triggers a **Major** release (`1.x.x -> 2.0.0`)

The pipeline will automatically:

1. Bump the version number in `package.json`
2. Generate the `CHANGELOG.md`
3. Package the extension (`pnpm package`)
4. Publish the `.vsix` to the **Visual Studio Marketplace** and **Open VSX Registry**
5. Publish a GitHub Release with the compiled `.vsix` attached

You can also manually trigger a release from the GitHub Actions tab by running the **Release Workflow** via `workflow_dispatch`.

---

## Manual Publishing (Fallback)

If the CI pipeline fails and you must publish a hotfix manually from your local machine, follow these steps:

1. **Ensure you are logged in**
   ```sh
   pnpm exec vsce login apathetic
   ```
2. **Update version number** in `package.json`
3. **Commit & tag the release**
   ```sh
   git add package.json
   git commit -m "release: v1.x.x"
   git tag v1.x.x
   git push && git push --tags
   ```
4. **Build the extension package**
   ```sh
   pnpm package
   ```
   This creates `file-header-ai-1.x.x.vsix`.
5. **Publish to Marketplaces**
   - Both Marketplaces (VSCE & Open VSX):
     ```sh
     pnpm run publish
     ```
   - Visual Studio Marketplace only:
     ```sh
     pnpm run publish:vsce
     ```
   - Open VSX Registry only:
     ```sh
     pnpm run publish:ovsx
     ```

---

## Verifying the Release

- The extension should appear/refresh on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=apathetic.file-header-ai) and the [Open VSX Registry](https://open-vsx.org/extension/apathetic/file-header-ai).
- The [GitHub Releases page](https://github.com/apathetic-tools/vscode-file-header/releases) will have the official changelog and `.vsix` attachments.
