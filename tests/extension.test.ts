import * as vscode from "vscode";
import { activate } from "../src/extension";
import { makeMockDocument } from "./helpers";

vi.mock("vscode");

describe("Extension Entry Point", () => {
	let mockContext: vscode.ExtensionContext;

	beforeEach(() => {
		vi.clearAllMocks();
		
		mockContext = {
			subscriptions: [],
		} as unknown as vscode.ExtensionContext;

		// Mock getConfiguration
		(vscode.workspace.getConfiguration as any).mockReturnValue({
			get: vi.fn((key: string, defaultValue: any) => defaultValue),
			inspect: vi.fn(() => undefined),
		});
	});

	test("registers commands on activation", () => {
		activate(mockContext);
		expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
			"vscode-file-header.insertHeader",
			expect.any(Function)
		);
		expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
			"vscode-file-header.updateHeader",
			expect.any(Function)
		);
		expect(vscode.workspace.onWillSaveTextDocument).toHaveBeenCalledWith(
			expect.any(Function)
		);
	});

	test("insertHeader command handles empty/untitled documents gracefully", async () => {
		activate(mockContext);
		const insertCommand = (vscode.commands.registerCommand as any).mock.calls.find(
			(c: any[]) => c[0] === "vscode-file-header.insertHeader"
		)[1];

		// No active editor
		(vscode.window as any).activeTextEditor = undefined;
		await insertCommand();

		// Untitled document
		(vscode.window as any).activeTextEditor = {
			document: { isUntitled: true, lineCount: 1 },
			edit: vi.fn(),
		};
		await insertCommand();

		expect((vscode.window as any).activeTextEditor.edit).not.toHaveBeenCalled();
	});

	test("updateHeader command edits document", async () => {
		activate(mockContext);
		const updateCommand = (vscode.commands.registerCommand as any).mock.calls.find(
			(c: any[]) => c[0] === "vscode-file-header.updateHeader"
		)[1];

		const mockDoc = makeMockDocument({
			text: "console.log('hello');",
			languageId: "javascript",
		});
		
		(vscode.window as any).activeTextEditor = {
			document: mockDoc,
			edit: vi.fn((callback) => {
				const editBuilder = {
					insert: vi.fn(),
					replace: vi.fn(),
				};
				callback(editBuilder);
			}),
		};

		// Make sure it generates a header
		(vscode.workspace as any).asRelativePath.mockReturnValue("src/test.js");

		await updateCommand();

		expect((vscode.window as any).activeTextEditor.edit).toHaveBeenCalled();
	});
});
