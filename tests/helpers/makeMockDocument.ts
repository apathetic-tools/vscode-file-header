// tests/helpers/makeMockDocument.ts
import type * as vscode from "vscode";

/**
 * Creates a lightweight mock TextDocument for testing.
 * Covers both text-based and language-based test cases.
 */
export function makeMockDocument({
	languageId = "plaintext",
	text = "",
	fsPath = "/workspace/mockfile.ts",
}: {
	languageId?: string;
	text?: string;
	fsPath?: string;
} = {}): vscode.TextDocument {
	const lines = text.split("\n");

	const partialDoc: Partial<vscode.TextDocument> = {
		languageId,
		isUntitled: false,
		lineCount: lines.length,
		lineAt: ((i: number) => ({
			text: lines[i] ?? "",
		})) as unknown as vscode.TextDocument["lineAt"],
		getText: () => text,
		uri: { fsPath, scheme: "file" } as vscode.Uri,
	};

	return partialDoc as vscode.TextDocument;
}
