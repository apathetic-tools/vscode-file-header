// src/configTypes.ts

export interface FileHeaderConfig {
	/** Automatically insert header on save if missing */
	autoInsert: boolean;

	/** Replace an outdated header path when file moves */
	autoUpdate: boolean;

	// === Display Header Parts ===

	/** What file path form to show in header */
	filePathStyle: FilePathStyle;

	/** Show the main language label (from VSCode) */
	showLanguage: boolean;

	/** Show format label (e.g. "React", "GitHub Issue Template") */
	showFormat: boolean;

	/** Show matching role labels (e.g., “Page component”) */
	showRoles: boolean;

	// === Templates ===

	/** Template to fill in the file path, `${filePath}` will be replaced.  */
	filePathTemplate: TemplateString;

	/** Template for the language, `${language}` will be replaced.  */
	languageTemplate: TemplateString;

	/** Template for the format, `${format}` will be replaced.  */
	formatTemplate: TemplateString;

	/** Template for the language + format, `${language}` and `${format}` will be replaced.  */
	jointLanguageAndFormatTemplate: TemplateString;

	/** Template for the context, `${context}` will be replaced.  */
	contextTemplate: TemplateString;

	/** Template for the role, `${role}` will be replaced.  */
	roleTemplate: TemplateString;

	// === Matching Toggles ===

	/** Use VS Code language templates (keyed by languageId) */
	useLanguagesById: boolean;

	/** Use filepath-based language templates (keyed by glob patterns) */
	useLanguagesByPath: boolean;

	/** Match by this type of path */
	matchStyle: FilePathStyle;

	// === Define Templates ===

	/** Language header templates keyed by VSCode language ID */
	languagesById: Record<VSCodeLangId, LanguagesById>;

	/** Language header templates keyed by filename/glob */
	languagesByPath?: Record<CustomLangId, LanguagesByPath>;

	/** Optional roles to match against file globs */
	roles?: Roles;

	/** Patterns to only process files matching these for header insertion */
	include?: GlobString[];

	/** Patterns to exclude files from header insertion */
	exclude?: GlobString[];

	/** Words that, if present in the first line comment, signal a generated file */
	skipWords?: string[];

	/** Words that, if present in the first line comment block, signal a license/copyright block to skip over */
	insertAfterWords?: string[];
}

/** Language header template keyed by VSCode language ID */
export interface LanguagesById extends LanguageTemplate {
	/** Template state (default: "enabled"; "fallback" = defer to FilepathTemplate) */
	state?: "enabled" | "disabled" | "fallback";

	/** Optional additional filepath match criteria */
	fileMatch?: LangFileMatch | LangFileMatch[];
}

/** Language header template keyed by filename/glob */
export interface LanguagesByPath extends LanguageTemplate {
	/** Template state (default: "enabled") */
	state?: "enabled" | "disabled";

	/** Filepath match criteria */
	fileMatch: LangFileMatch | LangFileMatch[];
}

/** Base language template format */
export interface LanguageTemplate {
	/** Template for the entire header, `${headerLine}` will be replaced.  */
	headerTemplate: TemplateString;

	/** Override for match by this type of path */
	matchStyle?: FilePathStyle;

	/** Override for displayed language label */
	language?: LabelString;

	/** Override template for the language, `${language}` will be replaced.  */
	languageTemplate?: TemplateString;

	/** Optional format name (e.g. "React", "GitHub Issue Template") */
	format?: LabelString;

	/** Override template for the language, `${format}` will be replaced.  */
	formatTemplate?: TemplateString;

	/** Override template for the language + format, `${language}` and `${format}` will be replaced.  */
	jointLanguageAndFormatTemplate?: TemplateString;

	/** Documentation metadata (used for generation, not runtime) */
	docs?: DocSource | DocSource[];
}

/** Role configuration for globs */
export interface Role {
	/** Role state (default: "enabled") */
	state?: "enabled" | "disabled";

	/** Override for match by this type of path */
	matchStyle?: FilePathStyle;

	/** Glob pattern to match files */
	glob: GlobString | GlobString[] | Glob[];

	/** Label text to append */
	role: LabelString;

	/** Override template for the role, `${role}` will be replaced.  */
	roleTemplate?: TemplateString;
}

/** A glob match entry */
export interface LangFileMatch {
	/** Override for match by this type of path */
	matchStyle?: FilePathStyle;

	/** Glob pattern to match files */
	glob: GlobString | GlobString[] | Glob[];

	/** Override language label */
	language?: LabelString;

	/** Override template for the language, `${language}` will be replaced.  */
	languageTemplate?: TemplateString;

	/** Override format label */
	format?: LabelString;

	/** Override template for the format, `${format}` will be replaced.  */
	formatTemplate?: TemplateString;

	/** Override template for the language + format, `${language}` and `${format}` will be replaced.  */
	jointLanguageAndFormatTemplate?: TemplateString;

	/** Optional context Label (e.g., variant or part) */
	context?: LabelString;

	/** Override template for the context, `${context}` will be replaced.  */
	contextTemplate?: TemplateString;
}

export interface Glob {
	/** Override for match by this type of path */
	matchStyle?: FilePathStyle;

	/** Glob pattern to match files */
	glob: GlobString | GlobString[];
}

/** Documentation metadata (used for generation, not runtime) */
export interface DocSource {
	note?: string;
	url?: URLString;
}

/** What kind of path matching style to use */
export type FilePathStyle = "filename" | "relativePath" | "absolutePath";

// === Primitives for export ===
export type Roles = Record<RoleId, Role>;

// === Common string primitives for clarity ===
export type CustomLangId = string;
export type LabelString = string;
export type GlobString = string;
export type RoleId = string;
export type TemplateString = string;
export type URLString = string;
export type VSCodeLangId = string;
