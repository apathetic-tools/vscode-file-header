// release.config.cjs (javascript —  (ECMAScript))

module.exports = {
	branches: ["main"],
	plugins: [
		"@semantic-release/commit-analyzer",
		"@semantic-release/release-notes-generator",
		"@semantic-release/changelog",
		["@semantic-release/npm", { npmPublish: false }],
		["semantic-release-vsce", { packageVsix: true }],
		["@semantic-release/git", { assets: ["package.json", "CHANGELOG.md"] }],
		["@semantic-release/github", { assets: "*.vsix" }],
	],
};
