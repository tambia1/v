/// <reference types="vite-plus/test" />
/// <reference types="vite-plus/client" />

import path from "path";

import babel from "@rolldown/plugin-babel";
import react from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig({
	base: "/v",

	plugins: lazyPlugins(() => [
		react({
			jsxImportSource: "@emotion/react",
		}),

		babel({
			plugins: ["@emotion/babel-plugin"],
		}),
	]),

	resolve: {
		alias: {
			"@src": path.resolve(__dirname, "./src"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@components": path.resolve(__dirname, "./src/components"),
		},
	},

	test: {
		passWithNoTests: true,
		globals: true,
		environment: "jsdom",
		css: true,
		coverage: {
			include: ["**", "./src/**/*.test.{ts,tsx}"],
			exclude: ["./src/zzz/**"],
			provider: "v8",
			reporter: ["text", "json", "html"],
			all: true,
			thresholds: {
				lines: 85,
				functions: 85,
				branches: 85,
				statements: 85,
				autoUpdate: true,
			},
		},
	},

	pack: {
		entry: ["./src/lib/index.ts"],
		format: ["esm"],
		platform: "browser",
		dts: {
			generator: "tsgo",
		},
	},
});
