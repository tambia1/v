/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	base: "/v",

	plugins: [
		react({
			babel: {
				plugins: [
					[
						"babel-plugin-styled-components",
						{
							displayName: true,
							fileName: false,
						},
					],
				],
			},
		}),

		checker({
			typescript: true,
		}),

		federation({
			name: "remote",
			filename: "remote.js",
			transformFileTypes: ["ts", "tsx"],
			exposes: {
				"./App": "./src/App.tsx",
			},
			shared: ["react"],
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
		target: "es2022",
		minify: false,
		cssCodeSplit: false,
	},

	preview: {
		host: "localhost",
		port: 5001,
		strictPort: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	},
});
