import {
	getContentStartLine,
	isCommentLine,
	stripCommentTokens,
	getCommentBlock,
} from "../../src/utils/documentHelpers";
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

describe("isCommentLine()", () => {
	test("identifies single line comments based on languageId", () => {
		expect(isCommentLine("// hello", "javascript")).toBe(true);
		expect(isCommentLine("# hello", "python")).toBe(true);
		expect(isCommentLine("-- hello", "sql")).toBe(true);
		expect(isCommentLine("<!-- hello", "html")).toBe(true);
	});

	test("identifies block comments start", () => {
		expect(isCommentLine("/* hello", "javascript")).toBe(true);
		expect(isCommentLine("<!-- hello", "html")).toBe(true);
	});

	test("identifies javadoc style block comment continuation", () => {
		expect(isCommentLine("* hello", "javascript")).toBe(true);
	});

	test("falls back to generic regex if languageId is unknown", () => {
		expect(isCommentLine("// hello", "unknown-lang")).toBe(true);
		expect(isCommentLine("# hello", "unknown-lang")).toBe(true);
		expect(isCommentLine("/* hello", "unknown-lang")).toBe(true);
	});

	test("returns false for non-comments", () => {
		expect(isCommentLine("console.log()", "javascript")).toBe(false);
		expect(isCommentLine("def foo():", "python")).toBe(false);
	});
});

describe("stripCommentTokens()", () => {
	test("strips single line comment tokens", () => {
		expect(stripCommentTokens("// hello world", "javascript")).toBe("hello world");
		expect(stripCommentTokens("# hello world", "python")).toBe("hello world");
	});

	test("strips block comment tokens", () => {
		expect(stripCommentTokens("/* hello world */", "javascript")).toBe("hello world");
		expect(stripCommentTokens("<!-- hello world -->", "html")).toBe("hello world");
	});

	test("strips javadoc style prefixes", () => {
		expect(stripCommentTokens("* hello world", "javascript")).toBe("hello world");
		expect(stripCommentTokens("/** hello world */", "javascript")).toBe("hello world");
	});

	test("strips generic tokens when language unknown", () => {
		expect(stripCommentTokens("// hello", "unknown-lang")).toBe("hello");
		expect(stripCommentTokens("/* hello */", "unknown-lang")).toBe("hello");
	});
});

describe("getCommentBlock()", () => {
	test("extracts single line comment blocks", () => {
		const doc = makeMockDocument({
			text: ["// Line 1", "// Line 2", "const x = 1;"].join("\n"),
			languageId: "javascript"
		});
		const block = getCommentBlock(doc, 0, "javascript");
		expect(block).toEqual(["// Line 1", "// Line 2"]);
	});

	test("extracts block comments", () => {
		const doc = makeMockDocument({
			text: ["/*", " * Line 1", " * Line 2", " */", "const x = 1;"].join("\n"),
			languageId: "javascript"
		});
		const block = getCommentBlock(doc, 0, "javascript");
		expect(block).toEqual(["/*", "* Line 1", "* Line 2", "*/"]);
	});

	test("extracts single line block comment if closed on first line", () => {
		const doc = makeMockDocument({
			text: ["/* Line 1 */", "const x = 1;"].join("\n"),
			languageId: "javascript"
		});
		const block = getCommentBlock(doc, 0, "javascript");
		expect(block).toEqual(["/* Line 1 */"]);
	});

	test("extracts generic block comments when language unknown", () => {
		const doc = makeMockDocument({
			text: ["<!--", "Line 1", "-->", "content"].join("\n"),
			languageId: "unknown-lang"
		});
		const block = getCommentBlock(doc, 0, "unknown-lang");
		expect(block).toEqual(["<!--", "Line 1", "-->"]);
	});

	test("stops extraction if not a comment line for single line style", () => {
		const doc = makeMockDocument({
			text: ["// Line 1", "const x = 1;", "// Line 2"].join("\n"),
			languageId: "javascript"
		});
		const block = getCommentBlock(doc, 0, "javascript");
		expect(block).toEqual(["// Line 1"]);
	});
});
