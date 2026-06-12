// tests/__mocks__/vscode.ts

export const workspace = {
	getWorkspaceFolder: vi.fn(),
	asRelativePath: vi.fn(),
	fs: {
		readFile: vi.fn(),
	},
	getConfiguration: vi.fn(() => ({
		get: vi.fn(),
	})),
	onWillSaveTextDocument: vi.fn(),
};

export const commands = {
	registerCommand: vi.fn(),
};

export const window = {
	activeTextEditor: undefined as any,
	showInformationMessage: vi.fn(),
};

export class Position {
	constructor(
		public line: number,
		public character: number,
	) {}
}

export class Range {
	constructor(
		public startLine: number,
		public startChar: number,
		public endLine: number,
		public endChar: number,
	) {}
}

export const TextEdit = {
	insert: vi.fn((pos, text) => ({ type: "insert", pos, text })),
	replace: vi.fn((range, text) => ({ type: "replace", range, text })),
};

export const Uri = {
	joinPath: vi.fn(),
	file: (path: string) => ({ fsPath: path, scheme: "file" }),
};

export type UriType = { fsPath: string; scheme: string };
export type TextDocument = { uri: UriType };
export type WorkspaceFolder = { uri: UriType };
