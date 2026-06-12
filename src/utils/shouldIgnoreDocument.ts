import * as vscode from "vscode";
import ignore from "ignore";
import type { FileHeaderConfig } from "../config";

export async function shouldIgnoreDocument(
	doc: vscode.TextDocument,
	config: FileHeaderConfig,
): Promise<boolean> {
	if (doc.lineCount > 0) {
		const firstLine = doc.lineAt(0).text.trim().toLowerCase();
		// Match common comment markers
		const isComment = /^(?:\/\/|#|\/\*|\*|<!--|--|;|%|'|\{-)/.test(firstLine);
		const skipWords = config.skipWords || [];
		const hasGeneratedKeyword = skipWords.some((word) => firstLine.includes(word.toLowerCase()));

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

	if (config.ignore && config.ignore.length > 0) {
		const configIg = ignore().add(config.ignore);
		if (configIg.ignores(relativePath)) {
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
	} catch (e) {
		// File doesn't exist or can't be read, safely ignore
	}

	return false;
}
