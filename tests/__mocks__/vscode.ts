// tests/__mocks__/vscode.ts

export const workspace = {
	getWorkspaceFolder: vi.fn(),
	asRelativePath: vi.fn(),
	fs: {
		readFile: vi.fn(),
	},
};

export const Uri = {
	joinPath: vi.fn(),
	file: (path: string) => ({ fsPath: path, scheme: "file" }),
};

export type UriType = { fsPath: string; scheme: string };
export type TextDocument = { uri: UriType };
export type WorkspaceFolder = { uri: UriType };
