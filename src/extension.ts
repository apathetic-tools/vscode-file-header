// src/extension.ts
import * as vscode from "vscode";
import { defaultConfig } from "./config/";
import { generateHeaderForDocument } from "./core";
import { getEffectiveConfig } from "./utils/";

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.workspace.onWillSaveTextDocument((event) => {
		const doc = event.document;
		if (doc.isUntitled || doc.lineCount === 0) return;

		const vsConfig = vscode.workspace.getConfiguration("fileHeader");
		const config = getEffectiveConfig(defaultConfig, vsConfig);

		const finalHeader = generateHeaderForDocument(config, doc);
		if (!finalHeader) return;

		let insertLine = 0;
		if (doc.lineCount > 0 && doc.lineAt(0).text.startsWith("#!")) {
			insertLine = 1;
		}

		event.waitUntil(
			Promise.resolve([
				vscode.TextEdit.insert(new vscode.Position(insertLine, 0), finalHeader + "\n\n"),
			]),
		);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
