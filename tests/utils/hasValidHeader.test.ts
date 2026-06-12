// tests/utils/hasValidHeader.test.ts

/*
 ✓ returns true when header contains relative path
  ✓ returns true when header contains filename only
  ✓ returns false when comment does not contain file info
  ✓ returns false when first line is not a comment
  ✓ returns false for empty document
  ✓ skips leading blank lines
*/

import { hasValidHeader } from "../../src/utils/hasValidHeader";
import type { PathList } from "../../src/utils/types";
import { makeMockDocument } from "../helpers";

describe("hasValidHeader()", () => {
	const paths: PathList = {
		absolutePath: "/abs/src/components/Button.tsx",
		relativePath: "src/components/Button.tsx",
		filename: "Button.tsx",
	};

	test("returns true when header contains relative path", () => {
		const doc = makeMockDocument({
			text: "// src/components/Button.tsx (React component)",
		});
		expect(hasValidHeader(doc, paths)).toBe(true);
	});

	test("returns true when header contains filename only", () => {
		const doc = makeMockDocument({ text: "// Button.tsx" });
		expect(hasValidHeader(doc, paths)).toBe(true);
	});

	test("returns false when comment does not contain file info", () => {
		const doc = makeMockDocument({ text: "// This is just a comment" });
		expect(hasValidHeader(doc, paths)).toBe(false);
	});

	test("returns false when first line is not a comment", () => {
		const doc = makeMockDocument({ text: "import React from 'react';" });
		expect(hasValidHeader(doc, paths)).toBe(false);
	});

	test("returns false for empty document", () => {
		const doc = makeMockDocument({});
		expect(hasValidHeader(doc, paths)).toBe(false);
	});

	test("skips leading blank lines", () => {
		const doc = makeMockDocument({
			text: ["", "   ", "// src/components/Button.tsx"].join("\n"),
		});
		expect(hasValidHeader(doc, paths)).toBe(true);
	});

	test("skips shebang line", () => {
		const doc = makeMockDocument({
			text: ["#!/usr/bin/env node", "// src/components/Button.tsx"].join("\n"),
		});
		expect(hasValidHeader(doc, paths)).toBe(true);
	});

	test("skips shebang line and blank lines", () => {
		const doc = makeMockDocument({
			text: ["#!/usr/bin/env node", "", "// src/components/Button.tsx"].join("\n"),
		});
		expect(hasValidHeader(doc, paths)).toBe(true);
	});
});
