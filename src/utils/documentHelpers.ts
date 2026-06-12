import * as vscode from "vscode";

/**
 * Finds the line number where the actual content starts,
 * skipping shebangs and markdown frontmatter.
 * Returns a 0-indexed line number.
 */
export function getContentStartLine(document: vscode.TextDocument): number {
	if (document.lineCount === 0) return 0;

	let currentLine = 0;

	// 1. Skip shebang if present
	if (document.lineAt(currentLine).text.startsWith("#!")) {
		currentLine++;
	}

	if (currentLine >= document.lineCount) return currentLine;

	// 2. Skip markdown frontmatter if present
	if (document.languageId === "markdown" || document.languageId === "mdx") {
		const text = document.lineAt(currentLine).text.trim();
		if (text === "---") {
			// Look for the closing `---`
			for (let i = currentLine + 1; i < document.lineCount; i++) {
				if (document.lineAt(i).text.trim() === "---") {
					// Found closing `---`
					return i + 1;
				}
			}
		}
	}

	return currentLine;
}
