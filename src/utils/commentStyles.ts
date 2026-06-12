export interface CommentStyle {
	line: string[];
	block: Array<{ start: string; end: string }>;
}

export const cStyle: CommentStyle = { line: ["//"], block: [{ start: "/*", end: "*/" }] };
export const hashStyle: CommentStyle = { line: ["#"], block: [] };
export const htmlStyle: CommentStyle = { line: [], block: [{ start: "<!--", end: "-->" }] };
export const sqlStyle: CommentStyle = { line: ["--"], block: [{ start: "/*", end: "*/" }] };
export const texStyle: CommentStyle = { line: ["%"], block: [] };
export const lispStyle: CommentStyle = { line: [";", ";;"], block: [] };
export const xmlStyle: CommentStyle = { line: [], block: [{ start: "<!--", end: "-->" }] };

export const languageCommentStyles: Record<string, CommentStyle> = {
	javascript: cStyle,
	typescript: cStyle,
	javascriptreact: cStyle,
	typescriptreact: cStyle,
	c: cStyle,
	cpp: cStyle,
	csharp: cStyle,
	"cuda-cpp": cStyle,
	d: cStyle,
	dart: cStyle,
	fsharp: cStyle,
	go: cStyle,
	groovy: cStyle,
	java: cStyle,
	jsonc: cStyle,
	"objective-c": cStyle,
	"objective-cpp": cStyle,
	php: { line: ["//", "#"], block: [{ start: "/*", end: "*/" }] },
	rust: cStyle,
	sass: cStyle,
	scss: cStyle,
	shaderlab: cStyle,
	stylus: cStyle,
	swift: cStyle,
	css: { line: [], block: [{ start: "/*", end: "*/" }] },
	less: { line: ["//"], block: [{ start: "/*", end: "*/" }] },

	python: hashStyle,
	coffeescript: hashStyle,
	dockercompose: hashStyle,
	diff: hashStyle,
	dockerfile: hashStyle,
	"git-commit": hashStyle,
	"git-rebase": hashStyle,
	julia: hashStyle,
	makefile: hashStyle,
	perl: hashStyle,
	perl6: hashStyle,
	powershell: { line: ["#"], block: [{ start: "<#", end: "#>" }] },
	r: hashStyle,
	ruby: { line: ["#"], block: [{ start: "=begin", end: "=end" }] },
	shellscript: hashStyle,
	yaml: hashStyle,

	html: htmlStyle,
	markdown: htmlStyle,
	svelte: htmlStyle,
	vue: htmlStyle,
	"vue-html": htmlStyle,
	xml: xmlStyle,
	xsl: xmlStyle,

	bibtex: texStyle,
	erlang: texStyle,
	latex: texStyle,
	tex: texStyle,

	bat: { line: ["REM", "::"], block: [] },
	clojure: lispStyle,
	ini: { line: [";"], block: [] },
	haskell: { line: ["--"], block: [{ start: "{-", end: "-}" }] },
	lua: { line: ["--"], block: [{ start: "--[[", end: "]]" }] },
	sql: sqlStyle,

	abap: { line: ["*"], block: [] },
	haml: { line: ["-#"], block: [] },
	slim: { line: ["/"], block: [] },
	pug: { line: ["//-", "//"], block: [] },
	vb: { line: ["'"], block: [] },

	ocaml: { line: [], block: [{ start: "(*", end: "*)" }] },
	pascal: { line: [], block: [{ start: "{", end: "}" }, { start: "(*", end: "*)" }] },
	handlebars: { line: [], block: [{ start: "{{!", end: "}}" }] },
	razor: { line: [], block: [{ start: "@*", end: "*@" }] },
	jade: { line: ["//", "//-"], block: [] },
};
