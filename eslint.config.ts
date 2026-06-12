// eslint.config.mjs
import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import fs from "fs";
import globals from "globals";
import path from "path";
import tseslint from "typescript-eslint";

// Read .prettierignore and split into lines
const prettierIgnorePath = path.resolve(".prettierignore");
const prettierIgnores = fs
	.readFileSync(prettierIgnorePath, "utf-8")
	.split(/\r?\n/)
	.map((line) => line.trim())
	.filter(Boolean)
	.filter((line) => line && !line.startsWith("#"));

export default defineConfig([
	{
		// for this to be a valid global ignore, it cannot have any other properties in this block.
		ignores: prettierIgnores,
	},
	{
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
	// = Global config =
	// JavaScript
	eslint.configs.recommended,
	// TypeScript
	tseslint.configs.recommended,

	{
		files: ["src/**/*.ts"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: process.cwd(),
			},
		},
		rules: {
			"no-unused-vars": "off", // handled by TS
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
		},
	},

	{
		files: ["tests/**/*.ts"],
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
		},
	},

	// Prettier last — disables conflicting rules
	prettier,
]);
