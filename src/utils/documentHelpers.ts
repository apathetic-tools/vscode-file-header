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

import { languageCommentStyles } from "./commentStyles";

/**
 * Checks if a line starts with a common comment marker, optionally constrained by language.
 */
export function isCommentLine(line: string, languageId?: string): boolean {
	if (languageId && languageCommentStyles[languageId]) {
		const style = languageCommentStyles[languageId];
		const trimmed = line.trim();
		if (style.line.some((token) => trimmed.startsWith(token))) return true;
		if (style.block.some((b) => trimmed.startsWith(b.start))) return true;
		// For block comments, a line might be part of it if it starts with `*` or similar continuation character,
		// but `isCommentLine` is usually used to check the FIRST line of a comment block.
		// If it's a doc comment `/**`, it starts with `/*` so it matches the block start.
		// Wait, some javadoc-style comments start lines with `*`.
		if (style.block.some((b) => b.start === "/*") && trimmed.startsWith("*"))
			return true;
		return false;
	}

	return /^(?:\/\/|#|\/\*|\*|<!--|--|;|%|'|\{-|\{\{!|@\*|-#|\(\*)/.test(line);
}

/**
 * Strips common comment tokens and closing tokens from a string.
 */
export function stripCommentTokens(text: string, languageId?: string): string {
	let stripped = text.trim();

	if (languageId && languageCommentStyles[languageId]) {
		const style = languageCommentStyles[languageId];
		for (const token of style.line) {
			if (stripped.startsWith(token)) {
				stripped = stripped.substring(token.length).trimLeft();
				break;
			}
		}
		for (const b of style.block) {
			if (stripped.startsWith(b.start)) {
				stripped = stripped.substring(b.start.length).trimLeft();
			}
			if (stripped.endsWith(b.end)) {
				stripped = stripped
					.substring(0, stripped.length - b.end.length)
					.trimRight();
			}
		}
		// Special case for JSDoc style block comments
		if (style.block.some((b) => b.start === "/*")) {
			if (stripped.startsWith("*")) {
				stripped = stripped.substring(1).trimLeft();
			}
		}
		return stripped;
	}

	// Strip common leading comment tokens
	stripped = stripped
		.replace(/^(?:\/\/|#|<!--|\/\*|%|--|;|'|\{-|\{\{!|\(\*|@\*|-#|\*)\s*/, "")
		.trim();

	// Strip common closing tokens
	stripped = stripped.replace(/(?:-->|\*\/|%\}|\*@|#-\}|\*\))$/, "").trim();

	return stripped;
}

/**
 * Gets all lines that make up the comment block starting at `startIndex`.
 */
export function getCommentBlock(
	document: vscode.TextDocument,
	startIndex: number,
	languageId?: string,
): string[] {
	const block: string[] = [];
	const firstLine = document.lineAt(startIndex).text.trim();
	block.push(firstLine);

	let inBlockComment = false;
	let blockEndTokens: string[] = [];

	if (languageId && languageCommentStyles[languageId]) {
		const style = languageCommentStyles[languageId];
		for (const b of style.block) {
			if (firstLine.startsWith(b.start)) {
				inBlockComment = true;
				blockEndTokens.push(b.end);
			}
		}
	} else {
		if (firstLine.startsWith("/*")) {
			inBlockComment = true;
			blockEndTokens = ["*/"];
		} else if (firstLine.startsWith("<!--")) {
			inBlockComment = true;
			blockEndTokens = ["-->"];
		} else if (firstLine.startsWith("{-")) {
			inBlockComment = true;
			blockEndTokens = ["-}"];
		} else if (firstLine.startsWith("{{!")) {
			inBlockComment = true;
			blockEndTokens = ["}}"];
		} else if (firstLine.startsWith("(*")) {
			inBlockComment = true;
			blockEndTokens = ["*)"];
		}
	}

	if (inBlockComment) {
		// check if the first line already contains the end token
		if (
			blockEndTokens.some(
				(token) => firstLine.endsWith(token) && firstLine.length > token.length,
			)
		) {
			return block;
		}

		for (let i = startIndex + 1; i < document.lineCount; i++) {
			const text = document.lineAt(i).text.trim();
			block.push(text);
			if (blockEndTokens.some((token) => text.includes(token))) {
				break;
			}
		}
	} else {
		// It's a single line comment style. We can collect consecutive lines that also start with a comment marker
		for (let i = startIndex + 1; i < document.lineCount; i++) {
			const text = document.lineAt(i).text.trim();
			// Empty lines could be between single line comments, but usually a header block is contiguous
			if (text.length > 0) {
				if (isCommentLine(text, languageId)) {
					block.push(text);
				} else {
					break;
				}
			}
		}
	}
	return block;
}
