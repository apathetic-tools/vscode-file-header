// src/extension.ts
import * as vscode from "vscode";
import { defaultConfig } from "./config/";
import { generateHeaderForDocument } from "./core";
import { findOutdatedHeaderLine, getEffectiveConfig, getContentStartLine } from "./utils/";

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.workspace.onWillSaveTextDocument((event) => {
		const doc = event.document;
		if (doc.isUntitled || doc.lineCount === 0) return;

		const vsConfig = vscode.workspace.getConfiguration("fileHeader");
		const config = getEffectiveConfig(defaultConfig, vsConfig);

		const finalHeader = generateHeaderForDocument(config, doc);
		if (!finalHeader) return;

		let edit: vscode.TextEdit | undefined;

		if (config.autoUpdate) {
			const outdatedLine = findOutdatedHeaderLine(doc);
			if (outdatedLine !== undefined) {
				const lineRange = doc.lineAt(outdatedLine).range;
				edit = vscode.TextEdit.replace(lineRange, finalHeader);
			}
		}

		if (!edit) {
			if (!config.autoInsert) return;

			const insertLine = getContentStartLine(doc);
			edit = vscode.TextEdit.insert(new vscode.Position(insertLine, 0), finalHeader + "\n\n");
		}

		event.waitUntil(
			Promise.resolve([edit]),
		);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
