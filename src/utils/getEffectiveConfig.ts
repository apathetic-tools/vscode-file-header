// src/utils/getEffectiveConfig.ts
import * as vscode from "vscode";
import { type FileHeaderConfig } from "../config";
import { mergeConfig } from "./mergeConfig";

export function getEffectiveConfig(
	defaultConfig: FileHeaderConfig,
	vsConfig: vscode.WorkspaceConfiguration,
): FileHeaderConfig {
	const userConfig: Partial<FileHeaderConfig> = {
		autoInsert: vsConfig.get("autoInsert"),
		autoUpdate: vsConfig.get("autoUpdate"),
		filePathStyle: vsConfig.get("filePathStyle"),
		showLanguage: vsConfig.get("showLanguage"),
		showFormat: vsConfig.get("showFormat"),
		showRoles: vsConfig.get("showRoles"),
		filePathTemplate: vsConfig.get("filePathTemplate"),
		languageTemplate: vsConfig.get("languageTemplate"),
		formatTemplate: vsConfig.get("formatTemplate"),
		jointLanguageAndFormatTemplate: vsConfig.get("jointLanguageAndFormatTemplate"),
		contextTemplate: vsConfig.get("contextTemplate"),
		roleTemplate: vsConfig.get("roleTemplate"),
		useLanguagesById: vsConfig.get("useLanguagesById"),
		useLanguagesByPath: vsConfig.get("useLanguagesByPath"),
		matchStyle: vsConfig.get("matchStyle"),
		languagesById: vsConfig.get("languagesById"),
		languagesByPath: vsConfig.get("languagesByPath"),
		roles: vsConfig.get("roles"),
		ignore: vsConfig.get("ignore"),
		skipWords: vsConfig.get("skipWords"),
	};

	return mergeConfig(defaultConfig, userConfig);
}
