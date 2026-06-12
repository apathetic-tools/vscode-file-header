import * as assert from "assert";
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

describe("Rename File Behavior E2E Test Suite", () => {
	it("should update header when a file is renamed and saved", async () => {
		// Create a temporary file
		const tmpDir = os.tmpdir();
		const originalName = "original-file.ts";
		const originalPath = path.join(tmpDir, originalName);

		fs.writeFileSync(originalPath, "console.log('Hello World');\n", "utf8");

		// Open the document in VS Code
		let document = await vscode.workspace.openTextDocument(originalPath);
		await vscode.window.showTextDocument(document);

		// Wait for extension to activate (if not already)
		const ext = vscode.extensions.getExtension("apathetic.vscode-file-header");
		if (ext && !ext.isActive) {
			await ext.activate();
		}

		// Execute the insert header command to add the initial header
		await vscode.commands.executeCommand("vscode-file-header.updateHeader");

		// Allow some time for the command to finish its edits
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Assert initial header
		assert.ok(document.getText().includes("// original-file.ts"));

		// Save the file to write header to disk
		await document.save();

		// Close the editor
		await vscode.commands.executeCommand("workbench.action.closeActiveEditor");

		// Rename the file on disk
		const newName = "renamed-file.ts";
		const newPath = path.join(tmpDir, newName);
		fs.renameSync(originalPath, newPath);

		// Open the renamed document
		document = await vscode.workspace.openTextDocument(newPath);
		const newEditor = await vscode.window.showTextDocument(document);

		// Edit the document so it is dirty and can be saved
		await newEditor.edit((editBuilder) => {
			editBuilder.insert(
				new vscode.Position(document.lineCount, 0),
				"// Trigger save edit\n",
			);
		});

		// Save the document to trigger onWillSaveTextDocument hooks
		await document.save();

		// Allow some time for the hooks to process
		await new Promise((resolve) => setTimeout(resolve, 500));

		const finalContent = document.getText();

		// Cleanup
		fs.unlinkSync(newPath);
		await vscode.commands.executeCommand("workbench.action.closeActiveEditor");

		// Verify header was updated
		assert.ok(
			!finalContent.includes("// original-file.ts"),
			"Old file path should be removed",
		);
		assert.ok(
			finalContent.includes("// renamed-file.ts"),
			"New file path should be in header",
		);
	});
});
