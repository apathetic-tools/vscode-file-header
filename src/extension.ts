// src/extension.ts
import * as vscode from "vscode";
import { defaultConfig } from "./config/";
import { generateHeaderForDocument } from "./core";
import {
	findOutdatedHeaderLine,
	getEffectiveConfig,
	getContentStartLine,
	shouldIgnoreDocument,
} from "./utils/";

export function activate(context: vscode.ExtensionContext) {
	const insertHeaderCmd = vscode.commands.registerCommand(
		"vscode-file-header.insertHeader",
		async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const doc = editor.document;
			if (doc.isUntitled || doc.lineCount === 0) return;

			const vsConfig = vscode.workspace.getConfiguration("fileHeader", doc.uri);
			const config = await getEffectiveConfig(defaultConfig, vsConfig, doc.uri);

			if (await shouldIgnoreDocument(doc, config)) {
				vscode.window.showInformationMessage(
					"File is ignored based on header configuration.",
				);
				return;
			}

			const finalHeader = generateHeaderForDocument(config, doc);
			if (!finalHeader) return;

			const outdatedLine = findOutdatedHeaderLine(doc);
			if (outdatedLine !== undefined) {
				vscode.window.showInformationMessage(
					"Header already exists. Use 'Update Header' instead.",
				);
				return;
			}

			const insertLine = getContentStartLine(doc);
			await editor.edit((editBuilder) => {
				editBuilder.insert(
					new vscode.Position(insertLine, 0),
					finalHeader + "\n\n",
				);
			});
		},
	);

	const updateHeaderCmd = vscode.commands.registerCommand(
		"vscode-file-header.updateHeader",
		async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const doc = editor.document;
			if (doc.isUntitled || doc.lineCount === 0) return;

			const vsConfig = vscode.workspace.getConfiguration("fileHeader", doc.uri);
			const config = await getEffectiveConfig(defaultConfig, vsConfig, doc.uri);

			if (await shouldIgnoreDocument(doc, config)) {
				vscode.window.showInformationMessage(
					"File is ignored based on header configuration.",
				);
				return;
			}

			const finalHeader = generateHeaderForDocument(config, doc);
			if (!finalHeader) return;

			const outdatedLine = findOutdatedHeaderLine(doc);
			await editor.edit((editBuilder) => {
				if (outdatedLine === undefined) {
					const insertLine = getContentStartLine(doc);
					editBuilder.insert(
						new vscode.Position(insertLine, 0),
						finalHeader + "\n\n",
					);
				} else {
					const lineRange = doc.lineAt(outdatedLine).range;
					editBuilder.replace(lineRange, finalHeader);
				}
			});
		},
	);

	const disposable = vscode.workspace.onWillSaveTextDocument((event) => {
		const doc = event.document;
		if (doc.isUntitled || doc.lineCount === 0) return;

		const vsConfig = vscode.workspace.getConfiguration("fileHeader", doc.uri);

		event.waitUntil(
			(async () => {
				const config = await getEffectiveConfig(defaultConfig, vsConfig, doc.uri);
				if (await shouldIgnoreDocument(doc, config)) {
					return [];
				}

				const finalHeader = generateHeaderForDocument(config, doc);
				if (!finalHeader) return [];

				let edit: vscode.TextEdit | undefined;

				if (config.autoUpdate) {
					const outdatedLine = findOutdatedHeaderLine(doc);
					if (outdatedLine !== undefined) {
						const lineRange = doc.lineAt(outdatedLine).range;
						edit = vscode.TextEdit.replace(lineRange, finalHeader);
					}
				}

				if (!edit) {
					if (!config.autoInsert) return [];

					const insertLine = getContentStartLine(doc);
					edit = vscode.TextEdit.insert(
						new vscode.Position(insertLine, 0),
						finalHeader + "\n\n",
					);
				}

				return edit ? [edit] : [];
			})(),
		);
	});

	context.subscriptions.push(insertHeaderCmd, updateHeaderCmd, disposable);
}

export function deactivate() {}
