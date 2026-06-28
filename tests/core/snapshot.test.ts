import { describe, expect, it } from "vitest";
import { generateHeaderForDocument } from "../../src/core/generateHeaderForDocument";
import { makeDefaultConfig, makeMockDocument } from "../helpers";

describe("Header output snapshots", () => {
	const config = makeDefaultConfig();

	const testCases = [
		{ languageId: "typescript", filename: "index.ts" },
		{ languageId: "python", filename: "main.py" },
		{ languageId: "html", filename: "index.html" },
		{ languageId: "css", filename: "styles.css" },
		{ languageId: "ruby", filename: "app.rb" },
		{ languageId: "dockerfile", filename: "Dockerfile" },
		{ languageId: "yaml", filename: "docker-compose.yml" },
		{ languageId: "markdown", filename: "README.md" },
		{ languageId: "jsonc", filename: ".vscode/settings.json" },
		{ languageId: "rust", filename: "main.rs" },
		{ languageId: "go", filename: "main.go" },
		{ languageId: "c", filename: "main.c" },
		{ languageId: "cpp", filename: "main.cpp" },
		{ languageId: "csharp", filename: "Program.cs" },
		{ languageId: "xml", filename: "config.xml" },
		{ languageId: "java", filename: "Main.java" },
		{ languageId: "sql", filename: "query.sql" },
		{ languageId: "lua", filename: "script.lua" },
		{ languageId: "clojure", filename: "core.clj" },
		{ languageId: "vb", filename: "script.vb" },
		{ languageId: "ignore", filename: ".gitignore" },
	];

	for (const { languageId, filename } of testCases) {
		it(`generates correct header for ${languageId} (${filename})`, () => {
			const doc = makeMockDocument({
				languageId,
				fsPath: `/path/to/project/src/${filename}`,
			});
			const header = generateHeaderForDocument(config, doc);
			expect(header).toMatchSnapshot();
		});
	}
});
