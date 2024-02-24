/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";

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

		dts({
			insertTypesEntry: true,
		}),
	],

	resolve: {
		alias: {
			"@src": path.resolve(__dirname, "./src"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@components": path.resolve(__dirname, "./src/components"),
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
		lib: {
			entry: "./src/lib/index.ts",
			name: "ui",
		},
		rollupOptions: {
			external: ["react", "react-dom", "styled-components"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"styled-components": "styled",
				},
			},
		},
	},
});
