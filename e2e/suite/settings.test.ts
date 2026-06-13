import * as assert from "assert";
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

describe("Settings.json Language Handling", () => {
	it("should insert jsonc header for .vscode/settings.json but not for .claude or .example", async () => {
		const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
		if (!workspacePath) throw new Error("No workspace folder found");
		const tmpDir = fs.mkdtempSync(
			path.join(workspacePath, "vscode-file-header-e2e-"),
		);

		// Create .vscode/settings.json
		const vscodeDir = path.join(tmpDir, ".vscode");
		fs.mkdirSync(vscodeDir);
		const vscodeSettingsPath = path.join(vscodeDir, "settings.json");
		fs.writeFileSync(vscodeSettingsPath, "{}", "utf8");

		// Create .claude/settings.json
		const claudeDir = path.join(tmpDir, ".claude");
		fs.mkdirSync(claudeDir);
		const claudeSettingsPath = path.join(claudeDir, "settings.json");
		fs.writeFileSync(claudeSettingsPath, "{}", "utf8");

		// Create .example/settings.json
		const exampleDir = path.join(tmpDir, ".example");
		fs.mkdirSync(exampleDir);
		const exampleSettingsPath = path.join(exampleDir, "settings.json");
		fs.writeFileSync(exampleSettingsPath, "{}", "utf8");

		// Wait for extension to activate
		const ext = vscode.extensions.getExtension("apathetic.vscode-file-header");
		if (ext && !ext.isActive) {
			await ext.activate();
		}

		// Function to process a document and return its new text
		const processDoc = async (filePath: string) => {
			const document = await vscode.workspace.openTextDocument(filePath);
			await vscode.window.showTextDocument(document);
			await vscode.commands.executeCommand("vscode-file-header.updateHeader");
			await new Promise((resolve) => setTimeout(resolve, 500));
			const text = document.getText();
			await vscode.commands.executeCommand(
				"workbench.action.closeActiveEditor",
			);
			return text;
		};

		const vscodeText = await processDoc(vscodeSettingsPath);
		const claudeText = await processDoc(claudeSettingsPath);
		const exampleText = await processDoc(exampleSettingsPath);

		// Cleanup
		fs.rmSync(tmpDir, { recursive: true, force: true });

		// Verify .vscode/settings.json gets a header
		assert.ok(
			vscodeText.includes(".vscode/settings.json (JSON — VS Code Config)"),
			"vscode settings.json should get a jsonc header",
		);

		// Verify .claude/settings.json gets NO header
		assert.strictEqual(
			claudeText.trim(),
			"{}",
			"claude settings.json should remain untouched",
		);

		// Verify .example/settings.json gets NO header
		assert.strictEqual(
			exampleText.trim(),
			"{}",
			"example settings.json should remain untouched",
		);
	});
});
