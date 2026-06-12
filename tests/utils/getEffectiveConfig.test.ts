import { defaultConfig } from "../../src/config";
import { getEffectiveConfig } from "../../src/utils/getEffectiveConfig";
import * as mergeConfigModule from "../../src/utils/mergeConfig";
import { makeDefaultConfig, mockVsConfig } from "../helpers";
import * as vscode from "vscode";

// Mock vscode module
vi.mock("vscode", () => {
	return {
		Uri: {
			file: (path: string) => ({ fsPath: path, path }),
			joinPath: (uri: { path: string }, ...paths: string[]) => ({
				path: uri.path + "/" + paths.join("/"),
			}),
		},
		workspace: {
			getWorkspaceFolder: vi.fn(),
			fs: {
				readFile: vi.fn(),
			},
		},
	};
});

describe("getEffectiveConfig()", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("calls mergeConfig with default and user config", async () => {
		const mergeSpy = vi.spyOn(mergeConfigModule, "mergeConfig").mockReturnValue(
			makeDefaultConfig({
				autoUpdate: false,
				filePathStyle: "filename",
			}),
		);

		const vsConfig = mockVsConfig({
			autoUpdate: false,
			filePathStyle: "filename",
			showLanguage: true,
		});

		const dummyUri = vscode.Uri.file("/test/file.ts") as vscode.Uri;
		const result = await getEffectiveConfig(makeDefaultConfig(), vsConfig, dummyUri);
		expect(mergeSpy).toHaveBeenCalled();
		expect(result.filePathStyle).toBe("filename");

		mergeSpy.mockRestore();
	});

	test("handles missing workspace settings gracefully", async () => {
		const mergeSpy = vi
			.spyOn(mergeConfigModule, "mergeConfig")
			.mockReturnValue(defaultConfig);

		const vsConfig = mockVsConfig();

		const dummyUri = vscode.Uri.file("/test/file.ts") as vscode.Uri;
		const result = await getEffectiveConfig(makeDefaultConfig(), vsConfig, dummyUri);

		// With the new logic, empty user config results in {} being passed as the second argument
		expect(mergeSpy).toHaveBeenCalledWith(
			expect.anything(),
			expect.objectContaining({}),
		);

		expect(result).toEqual(defaultConfig);

		mergeSpy.mockRestore();
	});

	test("loads and merges .fileheader.jsonc correctly, stripping prefixes", async () => {
		const vsConfig = mockVsConfig({
			showLanguage: false, // User config overrides file config
		});

		const dummyUri = vscode.Uri.file("/test/file.ts") as vscode.Uri;
		
		// Mock workspace folder
		(vscode.workspace.getWorkspaceFolder as import("vitest").Mock).mockReturnValue({
			uri: vscode.Uri.file("/test"),
		});

		// Mock fs.readFile to simulate a JSONC file
		const mockFileContent = Buffer.from(`
			{
				// This is a comment
				"fileHeader.autoInsert": false,
				"showFormat": false
			}
		`);
		(vscode.workspace.fs.readFile as import("vitest").Mock).mockImplementation(async (uri: { path: string }) => {
			if (uri.path.endsWith(".fileheader.jsonc")) {
				return mockFileContent;
			}
			throw new Error("File not found");
		});

		const result = await getEffectiveConfig(defaultConfig, vsConfig, dummyUri);

		// from file config
		expect(result.autoInsert).toBe(false); 
		expect(result.showFormat).toBe(false);

		// from user config (overrides file config)
		expect(result.showLanguage).toBe(false);

		// from default config
		expect(result.autoUpdate).toBe(true);
	});
});
