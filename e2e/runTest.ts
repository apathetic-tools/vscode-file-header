import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { runTests } from "@vscode/test-electron";

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, "../../../");

		// The path to the extension test script
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, "./suite/index");

		const testWorkspace = fs.mkdtempSync(
			path.join(os.tmpdir(), "vscode-file-header-workspace-"),
		);
		const launchArgs = [testWorkspace];

		// Download VS Code, unzip it and run the integration test
		await runTests({
			extensionDevelopmentPath,
			extensionTestsPath,
			launchArgs,
		});
	} catch (err) {
		console.error("Failed to run tests", err);
		process.exit(1);
	}
}

main();
