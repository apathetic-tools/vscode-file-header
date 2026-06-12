import * as vscode from "vscode";
import {
	getCommentBlock,
	getContentStartLine,
	isCommentLine,
	stripCommentTokens,
} from "./documentHelpers";
import type { PathList } from "./types";

/**
 * Checks whether the document already has a valid header comment.
 * - Skips any leading blank lines.
 * - Matches either relative path or filename.
 * - Ignores anything that follows (roles, language labels, etc.).
 */
export function hasValidHeader(
	document: vscode.TextDocument,
	paths: PathList,
): boolean {
	if (document.lineCount === 0) return false;

	const startLine = getContentStartLine(document);

	// Find the first non-empty line
	let firstNonBlankIndex = -1;
	for (let i = startLine; i < document.lineCount; i++) {
		const text = document.lineAt(i).text.trim();
		if (text.length > 0) {
			firstNonBlankIndex = i;
			break;
		}
	}
	if (firstNonBlankIndex === -1) return false;

	const firstNonBlank = document.lineAt(firstNonBlankIndex).text.trim();

	// Skip non-comment first lines
	if (!isCommentLine(firstNonBlank, document.languageId)) {
		return false;
	}

	// Escape regex meta chars
	const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

	const escapedAbsolute = escape(paths.absolutePath);
	const escapedRelative = escape(paths.relativePath);
	const escapedFileName = escape(paths.filename);

	// Match either relative path or filename at a word boundary
	const pattern = new RegExp(
		`(?:^|\\s)(${escapedAbsolute}|${escapedRelative}|${escapedFileName})(?:\\s|$)`,
	);

	// Get the entire comment block to search for the path
	const commentBlock = getCommentBlock(
		document,
		firstNonBlankIndex,
		document.languageId,
	);

	return commentBlock.some((line) => pattern.test(line));
}

/**
 * Heuristically finds the line number of an outdated file header.
 * Returns the 0-indexed line number, or undefined if no header was found.
 */
export function findOutdatedHeaderLine(
	document: vscode.TextDocument,
): number | undefined {
	if (document.lineCount === 0) return undefined;

	const startLine = getContentStartLine(document);

	// Find the first non-empty line
	let firstNonBlankIndex = -1;
	for (let i = startLine; i < document.lineCount; i++) {
		if (document.lineAt(i).text.trim().length > 0) {
			firstNonBlankIndex = i;
			break;
		}
	}
	if (firstNonBlankIndex === -1) return undefined;

	const firstNonBlank = document.lineAt(firstNonBlankIndex).text.trim();

	// Check if it's a comment
	if (!isCommentLine(firstNonBlank, document.languageId)) {
		return undefined;
	}

	const commentBlock = getCommentBlock(
		document,
		firstNonBlankIndex,
		document.languageId,
	);

	for (let idx = 0; idx < commentBlock.length; idx++) {
		const text = commentBlock[idx];
		// Strip common comment tokens
		const stripped = stripCommentTokens(text, document.languageId);

		// Grab the first word (likely the file path)
		const firstWord = stripped.split(/\s+/)[0];
		if (!firstWord) continue;

		// If it looks like a path (contains a slash or ends in an extension), it's probably our old header
		if (/[/\\]/.test(firstWord) || /\.\w+$/.test(firstWord)) {
			// Return the line index in the document
			return firstNonBlankIndex + idx;
		}
	}

	return undefined;
}
