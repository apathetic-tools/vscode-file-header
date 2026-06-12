// tests/helpers/mockVsConfig.ts

import type * as vscode from "vscode";

/**
 * Creates a lightweight mock of VS Code's WorkspaceConfiguration.
 *
 * You can pass in a record of settings that .get() should return.
 * Unused methods are stubbed out to satisfy the type system.
 */
export function mockVsConfig(
	settings: Record<string, unknown> = {},
): vscode.WorkspaceConfiguration {
	return {
		get: (key: string) => settings[key],
		has: (key: string) => Object.prototype.hasOwnProperty.call(settings, key),
		inspect: (key: string) => {
			if (Object.prototype.hasOwnProperty.call(settings, key)) {
				return { globalValue: settings[key] };
			}
			return undefined;
		},
		update: async () => {},
	} as any;
}
