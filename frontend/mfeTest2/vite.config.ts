/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "node:path";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
	base: "/v",

	plugins: [
		react({
			jsxImportSource: "@emotion/react",
			babel: {
				plugins: ["@emotion/babel-plugin"],
			},
		}),

		checker({
			typescript: true,
		}),

		federation({
			name: "frontend",
			filename: "remote.js",
			exposes: {
				"./Mfe": "./src/mfe/Mfe.tsx",
			},
		}),
	],

	resolve: {
		alias: {
			"@src": path.resolve(__dirname, "./src"),
		},
	},

	test: {
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

	build: {
		target: "ESNext",
		minify: false,
		cssCodeSplit: false,
		sourcemap: true,
	},
});
