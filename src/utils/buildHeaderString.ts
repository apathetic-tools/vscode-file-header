// src/utils/buildHeaderString.ts

import type { FileHeaderConfig } from "../config";
import type { PathList, ResolvedLanguageTemplate } from "./types";

/** Replace `${var}` tokens in a template string. */
function fillTemplate(template: string, vars: Record<string, string>): string {
	return template.replace(/\$\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}

/** Returns the file label according to config and path style. */
function formatFileLabel(config: FileHeaderConfig, paths: PathList): string {
	let pathValue: string;
	switch (config.filePathStyle) {
		case "filename":
			pathValue = paths.filename;
			break;
		case "absolutePath":
			pathValue = paths.absolutePath;
			break;
		case "relativePath":
		default:
			pathValue = paths.relativePath;
			break;
	}
	return fillTemplate(config.filePathTemplate, { filePath: pathValue });
}

/** Returns the base language label (already humanized). */
function partLanguageLabel(
	config: FileHeaderConfig,
	langEntry: ResolvedLanguageTemplate,
): string {
	if (!langEntry || langEntry.state === "disabled") return "";
	if (!config.showLanguage || !langEntry.language) return "";

	const language = langEntry.language.replace(/_/g, " ");

	return language;
}

/** Returns the base format label. */
function partFormatLabel(
	config: FileHeaderConfig,
	langEntry: ResolvedLanguageTemplate,
): string {
	if (!langEntry || langEntry.state === "disabled") return "";
	if (!config.showFormat || !langEntry.format) return "";

	return langEntry.format;
}

/** Combine language + format templates according to config. */
function formatLanguageAndFormatLabel(
	config: FileHeaderConfig,
	langEntry: ResolvedLanguageTemplate,
): string {
	const language = partLanguageLabel(config, langEntry);
	const format = partFormatLabel(config, langEntry);

	if (language && format) {
		return fillTemplate(config.jointLanguageAndFormatTemplate, {
			language,
			format,
		});
	} else if (language) {
		return fillTemplate(config.languageTemplate, { language });
	} else if (format) {
		return fillTemplate(config.formatTemplate, { format });
	}

	return "";
}

/** Optional context label (e.g., always based on a path). */
function formatContextLabel(
	config: FileHeaderConfig,
	langEntry: ResolvedLanguageTemplate,
): string {
	if (!langEntry.context) return "";
	return fillTemplate(config.contextTemplate, { context: langEntry.context });
}

/** Optional role label (e.g., “Page component”). */
function formatRoleLabel(config: FileHeaderConfig, roleLabel?: string): string {
	if (!config.showRoles || !roleLabel) return "";
	return fillTemplate(config.roleTemplate, { role: roleLabel });
}

/**
 * Builds the full header string for insertion.
 * Applies path, language, format, context, and role templates.
 *
 * @returns Full header string (e.g. "// src/Button.tsx (TypeScript — React) [Page]")
 */
export function buildHeaderString(
	config: FileHeaderConfig,
	langEntry: ResolvedLanguageTemplate,
	paths: PathList,
	roleLabel?: string,
): string | undefined {
	if (!langEntry || !langEntry.headerTemplate || langEntry.state === "disabled")
		return undefined;

	const parts = [
		formatFileLabel(config, paths),
		formatLanguageAndFormatLabel(config, langEntry),
		formatContextLabel(config, langEntry),
		formatRoleLabel(config, roleLabel),
	].filter(Boolean);

	const headerLine = parts.join("");

	return fillTemplate(langEntry.headerTemplate, { headerLine });
}
