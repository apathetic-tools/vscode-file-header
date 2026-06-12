import * as vscode from "vscode";
import { shouldIgnoreDocument } from "../../src/utils/shouldIgnoreDocument";
import { makeMockDocument, makeDefaultConfig } from "../helpers";

describe("shouldIgnoreDocument()", () => {
	beforeEach(() => {
		vi.resetAllMocks();

		// Setup default mocks
		vi.mocked(vscode.workspace.getWorkspaceFolder).mockReturnValue({
			uri: { fsPath: "/workspace", scheme: "file" },
		} as unknown as vscode.WorkspaceFolder);
		vi.mocked(vscode.workspace.asRelativePath).mockImplementation(
			(uri: unknown) => (uri as vscode.Uri).fsPath.replace("/workspace/", ""),
		);
		vi.mocked(vscode.Uri.joinPath).mockImplementation(
			(...args) =>
				({
					fsPath: args
						.map((a) => (typeof a === "string" ? a : a.fsPath))
						.join("/"),
					scheme: "file",
				}) as unknown as vscode.Uri,
		);
	});

	describe("generated file detection", () => {
		test("returns true for // auto-generated", async () => {
			const doc = makeMockDocument({ text: "// auto-generated" });
			const config = makeDefaultConfig();
			expect(await shouldIgnoreDocument(doc, config)).toBe(true);
		});

		test("returns true for # automatically generated", async () => {
			const doc = makeMockDocument({ text: "# automatically generated" });
			const config = makeDefaultConfig();
			expect(await shouldIgnoreDocument(doc, config)).toBe(true);
		});

		test("returns true for /* generated */", async () => {
			const doc = makeMockDocument({ text: "/* GENERATED */" });
			const config = makeDefaultConfig();
			expect(await shouldIgnoreDocument(doc, config)).toBe(true);
		});

		test("returns false for regular comment", async () => {
			const doc = makeMockDocument({ text: "// This is a nice file" });
			const config = makeDefaultConfig();
			expect(await shouldIgnoreDocument(doc, config)).toBe(false);
		});

		test("returns false for generated keyword not in comment", async () => {
			const doc = makeMockDocument({ text: "const auto = generated;" });
			const config = makeDefaultConfig();
			expect(await shouldIgnoreDocument(doc, config)).toBe(false);
		});
	});

	describe("config.include patterns", () => {
		test("returns true if does not match any include pattern", async () => {
			const doc = makeMockDocument({ fsPath: "/workspace/src/foo.js" });
			const config = makeDefaultConfig({ include: ["src/**/*.ts"] });
			expect(await shouldIgnoreDocument(doc, config)).toBe(true);
		});

		test("returns false if matches include pattern", async () => {
			const doc = makeMockDocument({ fsPath: "/workspace/src/foo.ts" });
			const config = makeDefaultConfig({ include: ["src/**/*.ts"] });
			expect(await shouldIgnoreDocument(doc, config)).toBe(false);
		});
	});

	describe("config.exclude patterns", () => {
		test("returns true if matches exclude pattern", async () => {
			const doc = makeMockDocument({ fsPath: "/workspace/src/foo.test.ts" });
			const config = makeDefaultConfig({ exclude: ["**/*.test.ts"] });
			expect(await shouldIgnoreDocument(doc, config)).toBe(true);
		});

		test("returns false if does not match exclude pattern", async () => {
			const doc = makeMockDocument({ fsPath: "/workspace/src/foo.ts" });
			const config = makeDefaultConfig({ exclude: ["**/*.test.ts"] });
			expect(await shouldIgnoreDocument(doc, config)).toBe(false);
		});
	});

	describe("gitignore support", () => {
		test("returns true if matches .gitignore", async () => {
			vi.mocked(vscode.workspace.fs.readFile).mockResolvedValue(
				Buffer.from("ignored_file.ts\n"),
			);

			const doc = makeMockDocument({ fsPath: "/workspace/ignored_file.ts" });
			const config = makeDefaultConfig();
			expect(await shouldIgnoreDocument(doc, config)).toBe(true);
		});

		test("returns false if doesn't match .gitignore", async () => {
			vi.mocked(vscode.workspace.fs.readFile).mockResolvedValue(
				Buffer.from("ignored_file.ts\n"),
			);

			const doc = makeMockDocument({ fsPath: "/workspace/cool_file.ts" });
			const config = makeDefaultConfig();
			expect(await shouldIgnoreDocument(doc, config)).toBe(false);
		});

		test("ignores missing .gitignore safely", async () => {
			vi.mocked(vscode.workspace.fs.readFile).mockRejectedValue(
				new Error("File not found"),
			);

			const doc = makeMockDocument({ fsPath: "/workspace/cool_file.ts" });
			const config = makeDefaultConfig();
			expect(await shouldIgnoreDocument(doc, config)).toBe(false);
		});
	});
});
