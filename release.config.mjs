/** @type {import('semantic-release').GlobalConfig} */
export default {
  branches: ["main", { name: "next", prerelease: "beta" }],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { type: "perf", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "revert", release: "patch" },
          { scope: "no-release", release: false },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "feat", section: "Features" },
            { type: "fix", section: "Bug Fixes" },
            { type: "perf", section: "Performance" },
            { type: "refactor", section: "Refactoring" },
            { type: "revert", section: "Reverts" },
            { type: "docs", section: "Documentation", hidden: true },
            { type: "chore", hidden: true },
            { type: "ci", hidden: true },
            { type: "test", hidden: true },
            { type: "build", hidden: true },
            { type: "style", hidden: true },
          ],
        },
      },
    ],
    ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
    // npmPublish: false, плагин только поднимает версию в package.json
    ["@semantic-release/npm", { npmPublish: false }],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    "@semantic-release/github",
  ],
};
