// src/utils/getEffectiveConfig.ts
import * as vscode from "vscode";
import { parse } from "jsonc-parser";
import { type FileHeaderConfig } from "../config";
import { mergeConfig } from "./mergeConfig";

export async function getEffectiveConfig(
	defaultConfig: FileHeaderConfig,
	vsConfig: vscode.WorkspaceConfiguration,
	docUri: vscode.Uri,
): Promise<FileHeaderConfig> {
	let fileConfig: Partial<FileHeaderConfig> = {};

	const workspaceFolder = vscode.workspace.getWorkspaceFolder(docUri);
	if (workspaceFolder) {
		for (const filename of [".fileheader.jsonc", ".fileheader.json"]) {
			const fileUri = vscode.Uri.joinPath(workspaceFolder.uri, filename);
			try {
				const data = await vscode.workspace.fs.readFile(fileUri);
				const text = Buffer.from(data).toString("utf8");
				const parsed = parse(text);
				if (parsed && typeof parsed === "object") {
					for (const key of Object.keys(parsed)) {
						if (key.startsWith("fileHeader.")) {
							parsed[key.slice(11)] = parsed[key];
							delete parsed[key];
						}
					}
					fileConfig = parsed;
					break;
				}
			} catch {
				// Ignore file not found or parse errors
			}
		}
	}

	const userConfig: Partial<FileHeaderConfig> = {};
	const keys: (keyof FileHeaderConfig)[] = [
		"autoInsert",
		"autoUpdate",
		"filePathStyle",
		"showLanguage",
		"showFormat",
		"showRoles",
		"filePathTemplate",
		"languageTemplate",
		"formatTemplate",
		"jointLanguageAndFormatTemplate",
		"contextTemplate",
		"roleTemplate",
		"useLanguagesById",
		"useLanguagesByPath",
		"matchStyle",
		"languagesById",
		"languagesByPath",
		"roles",
		"include",
		"exclude",
		"skipWords",
	];

	for (const key of keys) {
		const inspect = vsConfig.inspect(key);
		if (
			inspect &&
			(inspect.globalValue !== undefined ||
				inspect.workspaceValue !== undefined ||
				inspect.workspaceFolderValue !== undefined)
		) {
			(userConfig as Record<string, unknown>)[key] = vsConfig.get(key);
		}
	}

	const mergedWithFile = mergeConfig(defaultConfig, fileConfig);
	return mergeConfig(mergedWithFile, userConfig);
}
