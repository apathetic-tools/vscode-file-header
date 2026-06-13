// src/defaultConfig.ts
import type { FileHeaderConfig } from "./types";

export const defaultConfig: FileHeaderConfig = {
	/** Automatically insert header on save if missing */
	autoInsert: true,

	/** Replace an outdated header path when file moves */
	autoUpdate: true,

	// === Display Header Parts ===

	/** What file path form to show in header */
	filePathStyle: "relativePath",

	/** Show the main language label (from VSCode) */
	showLanguage: true,

	/** Show format label (e.g. "React", "GitHub Issue Template") */
	showFormat: true,

	/** Show matching role labels (e.g., “Page component”) */
	showRoles: true,

	// === Templates ===

	/** Template to fill in the file path, `${filePath}` will be replaced.  */
	filePathTemplate: "${filePath}",

	/** Template for the language, `${language}` will be replaced.  */
	languageTemplate: " (${language})",

	/** Template for the format, `${format}` will be replaced.  */
	formatTemplate: " (${format})",

	/** Template for the language + format, `${language}` and `${format}` will be replaced.  */
	jointLanguageAndFormatTemplate: " (${language} — ${format})",

	/** Template for the context, `${context}` will be replaced.  */
	contextTemplate: " [${context}]",

	/** Template for the role, `${role}` will be replaced.  */
	roleTemplate: " ${role}",

	// === Matching Toggles ===

	/** Use VS Code language templates (keyed by languageId) */
	useLanguagesById: true,

	/** Use filepath-based language templates (keyed by glob patterns) */
	useLanguagesByPath: true,

	/** Match by this type of path */
	matchStyle: "relativePath",

	// === Define Templates ===

	// Official language identifier list reference:
	//  - https://code.visualstudio.com/docs/languages/identifiers
	// Comment style references:
	//  - Its official specification (if it defines lexical syntax)
	//  - Or its VS Code grammar file under https://github.com/microsoft/vscode/tree/main/extensions/<language-id>
	//  - Goal: Keep comment styles to the most common single-line form per language
	languagesById: {
		// single line comments:

		// REM
		bat: {
			headerTemplate: "REM ${headerLine}",
			docs: {
				url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/rem",
			},
		},

		// #
		coffeescript: {
			headerTemplate: "# ${headerLine}",
			docs: { url: "https://coffeescript.org/#comments" },
		},
		dockercompose: {
			headerTemplate: "# ${headerLine}",
			format: " (YAML)",
			docs: {
				note: "is YAML",
				url: "https://yaml.org/spec/1.2.2/#66-comments",
			},
		},
		diff: {
			headerTemplate: "# ${headerLine}",
			docs: { note: "non-formal, quirk of processor and now convention" },
		},
		dockerfile: {
			headerTemplate: "# ${headerLine}",
			docs: {
				note: "indirectly",
				url: "https://docs.docker.com/reference/dockerfile/#parser-directives",
			},
		},
		"git-commit": {
			headerTemplate: "# ${headerLine}",
			docs: {
				note: "mentions core.commentChar",
				url: "https://git-scm.com/docs/git-commit#Documentation/git-commit.txt-commitcleanup",
			},
		},
		"git-rebase": {
			headerTemplate: "# ${headerLine}",
			docs: {
				note: "example",
				url: "https://git-scm.com/docs/git-rebase#_rebasing_merges",
			},
		},
		julia: {
			headerTemplate: "# ${headerLine}",
			docs: { url: "https://docs.julialang.org/en/v1/base/punctuation/" },
		},
		makefile: {
			headerTemplate: "# ${headerLine}",
			docs: {
				url: "https://www.gnu.org/software/make/manual/html_node/Makefile-Contents.html",
			},
		},
		perl: {
			headerTemplate: "# ${headerLine}",
			docs: { url: "https://perldoc.perl.org/perlsyn#Comments" },
		},
		perl6: {
			headerTemplate: "# ${headerLine}",
			// label: "Raku", // not sure if VSCode already did this, will have to test
			docs: {
				note: "now called Raku",
				url: "https://docs.raku.org/language/syntax#Comments",
			},
		},
		plaintext: {
			// we probably could have specified all languageByPath here, but that would have been ugly.
			state: "fallback", // may be a special file based on filename
			headerTemplate: "# ${headerLine}",
			docs: { note: "convention but could be rendered as content" },
		},
		powershell: {
			headerTemplate: "# ${headerLine}",
			docs: {
				url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_comments?view=powershell-7.5",
			},
		},
		python: {
			headerTemplate: "# ${headerLine}",
			docs: [
				{
					note: "v3",
					url: "https://docs.python.org/3/reference/lexical_analysis.html#comments",
				},
				{
					note: "v2",
					url: "https://docs.python.org/2.7/reference/lexical_analysis.html#comments",
				},
			],
		},
		r: {
			headerTemplate: "# ${headerLine}",
			docs: {
				url: "https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Comments",
			},
		},
		ruby: {
			headerTemplate: "# ${headerLine}",
			docs: {
				url: "https://docs.ruby-lang.org/en/master/syntax/comments_rdoc.html",
			},
		},
		shellscript: {
			state: "disabled", // ⚠️ shebang (#!) must stay on line 1; we don't yet support second-line header insertion
			headerTemplate: "# ${headerLine}",
			docs: {
				note: "defacto bash",
				url: "https://www.gnu.org/software/bash/manual/bash.html#Comments",
			},
		},
		yaml: {
			headerTemplate: "# ${headerLine}",
			docs: { url: "https://yaml.org/spec/1.2.2/#66-comments" },
		},

		// %
		bibtex: {
			headerTemplate: "% ${headerLine}",
			docs: {
				note: "same as TeX, section 6.1.1",
				url: "https://texdoc.org/serve/texbook/0",
			},
		},
		erlang: {
			headerTemplate: "% ${headerLine}",
			docs: { url: "https://www.erlang.org/doc/system/modules.html#comments" },
		},
		latex: {
			headerTemplate: "% ${headerLine}",
			docs: {
				note: "same as TeX, section 6.1.1",
				url: "https://texdoc.org/serve/texbook/0",
			},
		},
		tex: {
			headerTemplate: "% ${headerLine}",
			docs: {
				note: "section 6.1.1",
				url: "https://texdoc.org/serve/texbook/0",
			},
		},

		// //
		c: {
			headerTemplate: "// ${headerLine}",
			docs: {
				note: "C99+, section 6.4.9, page 54",
				url: "https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2310.pdf",
			},
		},
		cpp: {
			headerTemplate: "// ${headerLine}",
			language: "C++",
			docs: {
				note: "official spec is purchase only",
				url: "https://en.cppreference.com/w/cpp/comments.html",
			},
		},
		csharp: {
			headerTemplate: "// ${headerLine}",
			docs: {
				url: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/comments",
			},
		},
		"cuda-cpp": {
			headerTemplate: "// ${headerLine}",
			docs: {
				note: "example",
				url: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html?highlight=comment#lambda-expressions",
			},
		},
		d: {
			headerTemplate: "// ${headerLine}",
			docs: { url: "https://dlang.org/spec/lex.html#comment" },
		},
		dart: {
			headerTemplate: "// ${headerLine}",
			docs: { url: "https://dart.dev/language/comments" },
		},
		fsharp: {
			headerTemplate: "// ${headerLine}",
			docs: {
				url: "https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/symbol-and-operator-reference/#comment-compiler-directive-and-attribute-symbols",
			},
		},
		go: {
			headerTemplate: "// ${headerLine}",
			docs: { url: "https://go.dev/ref/spec#Comments" },
		},
		groovy: {
			headerTemplate: "// ${headerLine}",
			docs: { url: "https://groovy-lang.org/syntax.html#_comments" },
		},
		java: {
			headerTemplate: "// ${headerLine}",
			docs: {
				url: "https://docs.oracle.com/javase/specs/jls/se22/html/jls-3.html#jls-3.7",
			},
		},
		javascript: {
			headerTemplate: "// ${headerLine}",
			format: " (ECMAScript)",
			docs: {
				note: "ECMAScript Spec",
				url: "https://tc39.es/ecma262/#prod-SingleLineComment",
			},
		},
		javascriptreact: {
			headerTemplate: "// ${headerLine}",
			// base: " (ECMAScript + React)", // not sure what this is, will have to test, assumed for .jsx
			docs: {
				note: "example",
				url: "https://react.dev/learn/writing-markup-with-jsx#converting-html-to-jsx",
			},
		},
		json: {
			// clients may re-enable this and add FileMatch paths where they'd like it turned on for specific paths or files where they know json can have comments.
			// because we don't really support layered configs, they will need to define the entire object but this should give them an example to drop in and modify.
			state: "disabled",
			headerTemplate: "// ${headerLine}",
			docs: { note: "does not officially or always support comments at all" },
		},
		jsonc: {
			headerTemplate: "// ${headerLine}",
			docs: { url: "https://jsonc.org/#single-line-comments" },
		},
		"objective-c": {
			headerTemplate: "// ${headerLine}",
			docs: {
				note: "example",
				url: "https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Conventions/Conventions.html#//apple_ref/doc/uid/TP40011210-CH6-SW9",
			},
		},
		"objective-cpp": {
			headerTemplate: "// ${headerLine}",
			docs: {
				note: "ObjectiveC++ is Objective-c and C++ syntax, both same for comments",
				url: "https://en.wikipedia.org/wiki/Objective-C",
			},
		},
		php: {
			headerTemplate: "// ${headerLine}",
			docs: {
				url: "https://www.php.net/manual/en/language.basic-syntax.comments.php",
			},
		},
		jade: {
			headerTemplate: "// ${headerLine}",
			docs: {
				url: "https://secure.jadeworld.com/developer-centre/Jade2020/OnlineDocumentation/content/reurls/devref/ch1languageref/using_comments_in_your_methods.htm",
			},
		},
		rust: {
			headerTemplate: "// ${headerLine}",
			docs: { url: "https://doc.rust-lang.org/reference/comments.html" },
		},
		sass: {
			headerTemplate: "// ${headerLine}",
			docs: {
				note: "care next line isn't indended",
				url: "https://sass-lang.com/documentation/syntax/comments/#in-sass",
			},
		},
		scss: {
			headerTemplate: "// ${headerLine}",
			docs: {
				note: "sass docs address scss",
				url: "https://sass-lang.com/documentation/syntax/comments/#in-scss",
			},
		},
		shaderlab: {
			headerTemplate: "// ${headerLine}",
			docs: {
				note: "Unity3D Shaders, example",
				url: "https://docs.unity3d.com/6000.2/Documentation/Manual/built-in-shader-examples-single-color.html",
			},
		},
		stylus: {
			headerTemplate: "// ${headerLine}",
			docs: { url: "https://stylus-lang.com/docs/comments.html" },
		},
		swift: {
			headerTemplate: "// ${headerLine}",
			docs: {
				url: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/#Comments",
			},
		},
		typescript: {
			headerTemplate: "// ${headerLine}",
			docs: {
				note: "shows inline comment examples",
				url: "https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#type",
			},
		},
		typescriptreact: {
			headerTemplate: "// ${headerLine}",
			// base: " (Typescript + React)", // not sure what this is, will have to test, assumed for .tsx
			docs: {
				note: "same as javascriptreact, example",
				url: "https://react.dev/learn/writing-markup-with-jsx#converting-html-to-jsx",
			},
		},

		// //-
		pug: {
			headerTemplate: "//- ${headerLine}",
			docs: { url: "https://pugjs.org/language/comments.html" },
		},

		// '
		vb: {
			headerTemplate: "' ${headerLine}",
			docs: {
				url: "https://learn.microsoft.com/en-us/dotnet/visual-basic/language-reference/statements/rem-statement",
			},
		},

		// ;
		clojure: {
			headerTemplate: ";; ${headerLine}",
			docs: {
				note: ";; is emphasis convention",
				url: "https://clojure.org/guides/weird_characters#_comment",
			},
		},
		ini: {
			headerTemplate: "; ${headerLine}",
			docs: { url: "https://en.wikipedia.org/wiki/INI_file#Comments" },
		},

		// --
		haskell: {
			headerTemplate: "-- ${headerLine}",
			docs: {
				url: "https://www.haskell.org/onlinereport/lexemes.html#sect2.3",
			},
		},
		lua: {
			headerTemplate: "-- ${headerLine}",
			docs: { url: "https://www.lua.org/manual/5.4/manual.html#3.1" },
		},
		sql: {
			headerTemplate: "-- ${headerLine}",
			docs: {
				note: "official spec is purchase only",
				url: "https://en.wikipedia.org/wiki/SQL_syntax#Comments",
			},
		},

		// *
		abap: {
			headerTemplate: "* ${headerLine}",
			docs: {
				url: "https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm?file=abencomment.htm",
			},
		},

		// -#
		haml: {
			headerTemplate: "-# ${headerLine}",
			docs: {
				url: "https://haml.info/docs/yardoc/file.REFERENCE.html#comments",
			},
		},

		// /
		slim: {
			headerTemplate: "/ ${headerLine}",
			docs: { url: "https://rubydoc.info/gems/slim/frames#code-comment" },
		},

		// block comments:

		// /* ~ */
		css: {
			headerTemplate: "/* ${headerLine} */",
			docs: { url: "https://www.w3.org/TR/css-syntax-3/#consume-comment" },
		},
		less: {
			headerTemplate: "/* ${headerLine} */",
			docs: { url: "https://lesscss.org/#comments" },
		},

		// <!-- ~ -->
		html: {
			headerTemplate: "<!-- ${headerLine} -->",
			docs: {
				url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Comments",
			},
		},
		markdown: {
			headerTemplate: "<!-- ${headerLine} -->",
			docs: {
				note: "most support HTML style, rare do not",
				url: "https://spec.commonmark.org/0.31.2/#example-179",
			},
		},
		svelte: {
			headerTemplate: "<!-- ${headerLine} -->",
			docs: { url: "https://svelte.dev/docs/svelte/basic-markup#Comments" },
		},
		vue: {
			headerTemplate: "<!-- ${headerLine} -->",
			// base: " (HTML)", // let's experiment and see what is shown for Language
			docs: {
				note: "top-level is HTML style",
				url: "https://vuejs.org/api/sfc-spec.html#comments",
			},
		},
		"vue-html": {
			headerTemplate: "<!-- ${headerLine} -->",
			// base: " (HTML)", // let's experiment and see what is shown for Language
			docs: {
				note: "top-level is HTML style",
				url: "https://vuejs.org/api/sfc-spec.html#comments",
			},
		},
		xml: {
			headerTemplate: "<!-- ${headerLine} -->",
			docs: { url: "https://www.w3.org/TR/xml11/#sec-comments" },
		},
		xsl: {
			headerTemplate: "<!-- ${headerLine} -->",
			docs: {
				note: "XSL uses XML notation",
				url: "https://www.w3.org/Style/XSL/WhatIsXSL.html",
			},
		},

		// (* ~ *)
		ocaml: {
			headerTemplate: "(* ${headerLine} *)",
			docs: { url: "https://ocaml.org/manual/5.3/lex.html#ss:comments" },
		},

		// { ~ }
		pascal: {
			headerTemplate: "{ ${headerLine} }",
			docs: {
				url: "https://www.freepascal.org/docs-html/ref/refse2.html#x10-90001.2",
			},
		},

		// {{! ~ }}
		handlebars: {
			headerTemplate: "{{! ${headerLine} }}",
			docs: { url: "https://handlebarsjs.com/guide/#comments" },
		},

		// @* ~ *@
		razor: {
			headerTemplate: "@* ${headerLine} *@",
			docs: {
				url: "https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor?view=aspnetcore-9.0#comments",
			},
		},
	},
	languagesByPath: {
		editorconfig: {
			headerTemplate: "# ${headerLine}",
			fileMatch: { glob: "**/.editorconfig", language: "EditorConfig" },
		},
		env: {
			headerTemplate: "# ${headerLine}",
			fileMatch: {
				glob: "**/.env*",
				language: "Dotenv",
				format: "Environment Variables",
			},
		},
		gitattributes: {
			headerTemplate: "# ${headerLine}",
			fileMatch: {
				glob: "**/.gitattributes",
				language: "Git",
				format: "Attributes",
			},
		},
		codeowners: {
			headerTemplate: "# ${headerLine}",
			fileMatch: {
				glob: "**/CODEOWNERS",
				language: "CODEOWNERS",
			},
		},
		cursorignore: {
			headerTemplate: "# ${headerLine}",
			fileMatch: {
				glob: "**/.cursorignore",
				language: "Cursor",
				format: "Ignore List",
			},
		},
		gitignore: {
			headerTemplate: "# ${headerLine}",
			fileMatch: {
				glob: "**/.gitignore",
				language: "Git",
				format: "Ignore List",
			},
		},
		husky: {
			headerTemplate: "# ${headerLine}",
			fileMatch: [
				{
					glob: "**/.husky/pre-commit",
					language: "Husky",
					format: "pre-commit hook",
				},
				{
					glob: "**/.husky/pre-push",
					language: "Husky",
					format: "pre-push hook",
				},
			],
		},
		npmrc: {
			headerTemplate: "# ${headerLine}",
			fileMatch: { glob: "**/.npmrc", language: "NPM", format: "Config" },
		},
		nvmrc: {
			headerTemplate: "# ${headerLine}",
			fileMatch: { glob: "**/.nvmrc", language: "NVM", format: "Config" },
		},
		prettierignore: {
			headerTemplate: "# ${headerLine}",
			fileMatch: {
				glob: "**/.prettierignore",
				language: "Prettier",
				format: "Ignore List",
			},
		},
		tool_versions: {
			headerTemplate: "# ${headerLine}",
			fileMatch: {
				glob: "**/.tool-versions",
				language: "asdf",
				format: "Tool Versions",
			},
		},
		vscode_config: {
			headerTemplate: "// ${headerLine}",
			fileMatch: {
				glob: "**/.vscode/*.json",
				language: "JSON",
				format: "VS Code Config",
			},
		},
		json_fallback: {
			state: "disabled",
			headerTemplate: "", // Required by type, but ignored because state is disabled
			fileMatch: {
				glob: "**/*.json",
				language: "JSON",
			},
		},
	},
	roles: {},
	include: [],
	exclude: [],
	skipWords: ["auto", "automatically", "generated"],
	insertAfterWords: ["copyright", "license", "(c)", "©", "licensed"],
};
