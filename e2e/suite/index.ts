import * as path from "path";
// eslint-disable-next-line @typescript-eslint/no-require-imports
import Mocha = require("mocha");
import { glob } from "glob";

export async function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
		ui: "bdd",
		color: true,
		timeout: 10000,
	});

	const testsRoot = __dirname;

	try {
		const files = await glob("**/**.test.js", { cwd: testsRoot });

		// Add files to the test suite
		files.forEach((f: string) => mocha.addFile(path.resolve(testsRoot, f)));

		// Run the mocha test
		return new Promise((resolve, reject) => {
			mocha.run((failures) => {
				if (failures > 0) {
					reject(new Error(`${failures} tests failed.`));
				} else {
					resolve();
				}
			});
		});
	} catch (err) {
		console.error(err);
		throw err;
	}
}
