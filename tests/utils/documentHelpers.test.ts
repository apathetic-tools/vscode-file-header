import { getContentStartLine } from "../../src/utils/documentHelpers";
import { makeMockDocument } from "../helpers";

describe("getContentStartLine()", () => {
	test("returns 0 for empty document", () => {
		const doc = makeMockDocument({});
		expect(getContentStartLine(doc)).toBe(0);
	});

	test("returns 0 for document without shebang or frontmatter", () => {
		const doc = makeMockDocument({
			text: "console.log('hello');",
		});
		expect(getContentStartLine(doc)).toBe(0);
	});

	test("skips shebang line", () => {
		const doc = makeMockDocument({
			text: ["#!/usr/bin/env node", "console.log('hello');"].join("\n"),
		});
		expect(getContentStartLine(doc)).toBe(1);
	});

	test("skips markdown frontmatter", () => {
		const doc = makeMockDocument({
			text: ["---", "title: Hello", "---", "# Header"].join("\n"),
			languageId: "markdown",
		});
		expect(getContentStartLine(doc)).toBe(3);
	});

	test("skips frontmatter and shebang if somehow combined (unlikely but possible)", () => {
		const doc = makeMockDocument({
			text: [
				"#!/usr/bin/env node",
				"---",
				"title: Hello",
				"---",
				"# Header",
			].join("\n"),
			languageId: "markdown",
		});
		expect(getContentStartLine(doc)).toBe(4);
	});

	test("does not skip frontmatter for non-markdown/mdx files", () => {
		const doc = makeMockDocument({
			text: ["---", "title: Hello", "---", "console.log('hello');"].join("\n"),
			languageId: "typescript",
		});
		expect(getContentStartLine(doc)).toBe(0);
	});

	test("does not skip if frontmatter is not closed", () => {
		const doc = makeMockDocument({
			text: ["---", "title: Hello", "# Header"].join("\n"),
			languageId: "markdown",
		});
		expect(getContentStartLine(doc)).toBe(0);
	});
});
