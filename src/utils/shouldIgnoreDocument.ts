import * as vscode from "vscode";
import ignore from "ignore";
import { minimatch } from "minimatch";
import type { FileHeaderConfig } from "../config";
import { isCommentLine } from "./documentHelpers";

export async function shouldIgnoreDocument(
	doc: vscode.TextDocument,
	config: FileHeaderConfig,
): Promise<boolean> {
	if (doc.lineCount > 0) {
		const firstLine = doc.lineAt(0).text.trim().toLowerCase();
		// Match common comment markers
		const isComment = isCommentLine(firstLine, doc.languageId);
		const skipWords = config.skipWords || [];
		const hasGeneratedKeyword = skipWords.some((word) =>
			firstLine.includes(word.toLowerCase()),
		);

		if (isComment && hasGeneratedKeyword) {
			return true;
		}
	}

	const uri = doc.uri;
	if (uri.scheme !== "file") {
		return false;
	}

	const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
	if (!workspaceFolder) {
		return false;
	}

	const relativePath = vscode.workspace.asRelativePath(uri, false);

	if (config.include && config.include.length > 0) {
		const isIncluded = config.include.some((pattern) =>
			minimatch(relativePath, pattern, { dot: true }),
		);
		if (!isIncluded) {
			return true;
		}
	}

	if (config.exclude && config.exclude.length > 0) {
		const isExcluded = config.exclude.some((pattern) =>
			minimatch(relativePath, pattern, { dot: true }),
		);
		if (isExcluded) {
			return true;
		}
	}

	try {
		const gitignoreUri = vscode.Uri.joinPath(workspaceFolder.uri, ".gitignore");
		const gitignoreData = await vscode.workspace.fs.readFile(gitignoreUri);
		const gitignoreContent = Buffer.from(gitignoreData).toString("utf-8");

		const gitIg = ignore().add(gitignoreContent);
		if (gitIg.ignores(relativePath)) {
			return true;
		}
	} catch {
		// File doesn't exist or can't be read, safely ignore
	}

	return false;
}
