// src/core/headerInserter.ts

import type * as vscode from "vscode";
import type { FileHeaderConfig } from "../config";
import {
	buildHeaderString,
	findRoleLabel,
	getFilePaths,
	hasValidHeader,
	type ResolvedLanguageTemplate,
} from "../utils";
import { minimatch } from "minimatch";

/**
 * Compute the header text to insert for a given document.
 * Returns `undefined` if no header should be added.
 */
export function generateHeaderForDocument(
	config: FileHeaderConfig,
	doc: vscode.TextDocument,
): string | undefined {
	const paths = getFilePaths(doc);

	// Skip if document already has a valid header
	if (hasValidHeader(doc, paths, config)) return;

	// Try languageId → then path
	let template: ResolvedLanguageTemplate | undefined;

	if (config.useLanguagesByPath) {
		template = generateHeaderByPath(config, doc, paths);
	}

	if (!template && config.useLanguagesById) {
		template = generateHeaderByLanguageId(config, doc);
		if (template && template.state && template.state === "fallback") {
			template = undefined;
		}
	}

	if (!template || !template.headerTemplate || template.state === "disabled")
		return;

	const roleLabel = findRoleLabel(config, paths);
	return buildHeaderString(config, template, paths, roleLabel);
}

/**
 * Generate header based on VS Code language ID (languagesById).
 */
export function generateHeaderByLanguageId(
	config: FileHeaderConfig,
	doc: vscode.TextDocument,
): ResolvedLanguageTemplate | undefined {
	const langId = doc.languageId;
	const langEntry = config.languagesById[langId];

	// Skip unknown or disabled languages
	if (!langEntry || langEntry.state === "disabled") return;
	if (!langEntry.headerTemplate) return;

	return {
		headerTemplate: langEntry.headerTemplate,
		state: langEntry.state,
		language: langEntry.language ?? langId,
		format: langEntry.format,
		context: undefined,
	};
}

export function generateHeaderByPath(
	config: FileHeaderConfig,
	_doc: vscode.TextDocument,
	paths: ReturnType<typeof getFilePaths>,
): ResolvedLanguageTemplate | undefined {
	if (!config.languagesByPath) return undefined;

	for (const [customId, langEntry] of Object.entries(config.languagesByPath)) {
		const fileMatches = Array.isArray(langEntry.fileMatch)
			? langEntry.fileMatch
			: [langEntry.fileMatch];

		for (const match of fileMatches) {
			const matchStyle =
				match.matchStyle ?? langEntry.matchStyle ?? config.matchStyle;
			const targetPath = paths[matchStyle] ?? paths.relativePath;

			const globs = Array.isArray(match.glob) ? match.glob : [match.glob];

			for (const g of globs) {
				const patterns =
					typeof g === "string"
						? [g]
						: Array.isArray(g.glob)
							? g.glob
							: [g.glob];

				for (const pattern of patterns) {
					if (minimatch(targetPath, pattern, { dot: true })) {
						if (!langEntry.headerTemplate && langEntry.state !== "disabled")
							return undefined;

						return {
							headerTemplate: langEntry.headerTemplate,
							state: langEntry.state,
							language: match.language ?? langEntry.language ?? customId,
							format: match.format ?? langEntry.format,
							context: match.context ?? undefined,
						};
					}
				}
			}
		}
	}

	return undefined;
}
