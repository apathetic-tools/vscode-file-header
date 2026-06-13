module.exports = {
	branches: ["main"],
	plugins: [
		[
			"@semantic-release/commit-analyzer",
			{
				preset: "angular",
				releaseRules: [
					// Keep releases in 0.x.x for now:
					// Breaking changes bump minor (0.1.0 -> 0.2.0)
					{ breaking: true, release: "minor" },
					// Features bump minor to match python-semantic-release (0.1.0 -> 0.2.0)
					{ type: "feat", release: "minor" },
					// Fixes bump patch (0.1.0 -> 0.1.1)
					{ type: "fix", release: "patch" },
				],
			},
		],
		"@semantic-release/release-notes-generator",
		"@semantic-release/changelog",
		["@semantic-release/npm", { npmPublish: false }],
		["semantic-release-vsce", { packageVsix: true }],
		["@semantic-release/git", { assets: ["package.json", "CHANGELOG.md"] }],
		["@semantic-release/github", { assets: "*.vsix" }],
	],
};
