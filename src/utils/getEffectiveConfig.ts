// src/utils/getEffectiveConfig.ts
import * as vscode from "vscode";
import { type FileHeaderConfig } from "../config";
import { mergeConfig } from "./mergeConfig";

export function getEffectiveConfig(
	defaultConfig: FileHeaderConfig,
	vsConfig: vscode.WorkspaceConfiguration,
): FileHeaderConfig {
	// Explicitly build a plain object from the workspace settings
	const userConfig: Partial<FileHeaderConfig> = {
		autoInsert: vsConfig.get("autoInsert"),
		autoUpdate: vsConfig.get("autoUpdate"),
		filePathStyle: vsConfig.get("filePathStyle"),
		showLanguage: vsConfig.get("showLanguage"),
		showFormat: vsConfig.get("showFormat"),
		showRoles: vsConfig.get("showRoles"),
		useLanguagesById: vsConfig.get("useLanguagesById"),
		useLanguagesByPath: vsConfig.get("useLanguagesByPath"),
		matchStyle: vsConfig.get("matchStyle"),
		languagesById: vsConfig.get("languagesById"),
		languagesByPath: vsConfig.get("languagesByPath"),
		roles: vsConfig.get("roles"),
	};

	return mergeConfig(defaultConfig, userConfig);
}
