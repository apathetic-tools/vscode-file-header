import * as assert from "assert";
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

describe("Extension E2E Test Suite", () => {
	vscode.window.showInformationMessage("Start all tests.");

	it("should generate header in a temporary file", async () => {
		// Create a temporary file
		const tmpDir = os.tmpdir();
		const tmpFilePath = path.join(tmpDir, "test-file.ts");

		fs.writeFileSync(tmpFilePath, "console.log('Hello World');\n", "utf8");

		// Open the document in VS Code
		const document = await vscode.workspace.openTextDocument(tmpFilePath);
		await vscode.window.showTextDocument(document);

		// Wait for extension to activate (if not already)
		const ext = vscode.extensions.getExtension("apathetic.vscode-file-header");
		if (ext && !ext.isActive) {
			await ext.activate();
		}

		// Execute the insert header command
		await vscode.commands.executeCommand("vscode-file-header.updateHeader");

		// Allow some time for the command to finish its edits
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Verify the document now has a header
		const newText = document.getText();
		console.log("---- GENERATED TEXT ----");
		console.log(newText);
		console.log("------------------------");
		
		// Cleanup
		fs.unlinkSync(tmpFilePath);
		await vscode.commands.executeCommand("workbench.action.closeActiveEditor");

		assert.ok(
			newText.includes("// test-file.ts"),
			"File path should be in header",
		);
		assert.ok(
			newText.toLowerCase().includes("typescript"),
			"Language should be in header",
		);
		assert.ok(
			newText.includes("console.log('Hello World');"),
			"Original content should remain",
		);
	});
});
