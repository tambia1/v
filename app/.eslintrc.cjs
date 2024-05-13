module.exports = {
	root: true,
	env: { browser: true, node: true, es2020: true },
	extends: ["eslint:recommended", "plugin:@typescript-eslint/eslint-recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "prettier"],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	rules: {
		"padding-line-between-statements": ["error", { blankLine: "always", prev: "*", next: "return" }],
		"react/react-in-jsx-scope": "off",
		"react/jsx-uses-react": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/ban-types": [
			"error",
			{
				extendDefaults: true,
				types: {
					"{}": false,
				},
			},
		],
	},
};
