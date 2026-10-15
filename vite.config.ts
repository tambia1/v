import { defineConfig } from "vite-plus";

const ignorePatterns = ["**/dist/**", "**/coverage/**", "**/playwright-report/**", "**/test-results/**", "**/certificates/**"];

export default defineConfig({
	staged: {
		"*": "vp check --fix",
	},
	fmt: {
		ignorePatterns,
		useTabs: true,
		printWidth: 160,
		singleQuote: false,
		sortImports: true,
		sortPackageJson: false,
	},
	lint: {
		ignorePatterns,
		plugins: ["eslint", "typescript", "unicorn", "react", "jsx-a11y", "oxc", "import"],
		jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
		rules: {
			"vite-plus/prefer-vite-plus-imports": "error",
			"no-param-reassign": "error",
			"default-param-last": "error",
			"no-else-return": "error",
			"typescript/prefer-as-const": "error",
			"typescript/prefer-enum-initializers": "error",
			"typescript/no-inferrable-types": "error",
			"react/self-closing-comp": "error",
			"react/rules-of-hooks": "warn",
			"react/exhaustive-deps": "warn",
			"unicorn/prefer-number-properties": "error",
		},
		options: { typeAware: true, typeCheck: true },
	},
	run: {
		cache: true,
	},
});
