// src/hasValidHeader.ts
import * as vscode from "vscode";
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

	// Find the first non-empty line
	let firstNonBlank = "";
	for (let i = 0; i < document.lineCount; i++) {
		// Skip shebang which must be on the very first line
		if (i === 0 && document.lineAt(0).text.startsWith("#!")) {
			continue;
		}

		const text = document.lineAt(i).text.trim();
		if (text.length > 0) {
			firstNonBlank = text;
			break;
		}
	}
	if (!firstNonBlank) return false;

	// Skip non-comment first lines
	if (
		!firstNonBlank.startsWith("//") &&
		!firstNonBlank.startsWith("#") &&
		!firstNonBlank.startsWith("<!--") &&
		!firstNonBlank.startsWith("/*")
	) {
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

	return pattern.test(firstNonBlank);
}

/**
 * Heuristically finds the line number of an outdated file header.
 * Returns the 0-indexed line number, or undefined if no header was found.
 */
export function findOutdatedHeaderLine(document: vscode.TextDocument): number | undefined {
	if (document.lineCount === 0) return undefined;

	for (let i = 0; i < document.lineCount; i++) {
		// Skip shebang which must be on the very first line
		if (i === 0 && document.lineAt(0).text.startsWith("#!")) {
			continue;
		}

		const text = document.lineAt(i).text.trim();
		if (text.length > 0) {
			// Check if it's a comment
			if (
				!text.startsWith("//") &&
				!text.startsWith("#") &&
				!text.startsWith("<!--") &&
				!text.startsWith("/*") &&
				!text.startsWith("%") &&
				!text.startsWith("--") &&
				!text.startsWith(";") &&
				!text.startsWith("'") &&
				!text.startsWith("(*") &&
				!text.startsWith("{-") &&
				!text.startsWith("{{!") &&
				!text.startsWith("@*") &&
				!text.startsWith("-#")
			) {
				return undefined;
			}

			// Strip common comment tokens
			let stripped = text
				.replace(/^(?:\/\/|#|<!--|\/\*|%|--|;|'|{-|{\!|\(\*|@\*|-#)\s*/, "")
				.trim();
			
			// Strip common closing tokens
			stripped = stripped.replace(/(?:-->|\*\/|%\}|\*@|#-\}|\*\))$/, "").trim();

			// Grab the first word (likely the file path)
			const firstWord = stripped.split(/\s+/)[0];
			if (!firstWord) return undefined;

			// If it looks like a path (contains a slash or ends in an extension), it's probably our old header
			if (/[\/\\]/.test(firstWord) || /\.\w+$/.test(firstWord)) {
				return i;
			}

			// First non-blank line didn't match our heuristic, stop looking
			return undefined;
		}
	}

	return undefined;
}
