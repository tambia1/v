/// <reference types="vitest" />
/// <reference types="vite/client" />

import * as fs from "node:fs";
import * as path from "node:path";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";
import { defineConfig, type Plugin, type PluginOption } from "vite";
import checker from "vite-plugin-checker";
import styleX from "vite-plugin-stylex";

dotenv.config({ path: `./env/.env.${process.env.ENV}` });

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
		}) as PluginOption,

		checker({
			typescript: true,
		}) as unknown as Plugin,

		styleX(),
	],

	server: {
		https: {
			key: fs.readFileSync(path.resolve(__dirname, "./certificates/key.pem")),
			cert: fs.readFileSync(path.resolve(__dirname, "./certificates/cert.pem")),
		},
	},

	resolve: {
		alias: {
			"@src": path.resolve(__dirname, "./src"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@apps": path.resolve(
				__dirname,
				"./src/pages/pageHome/components/desktop/apps",
			),
			"@tanstack/react-query": path.resolve(
				__dirname,
				"../node_modules/@tanstack/react-query",
			),
		},
	},

	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./vitest-setup.ts",
		css: true,
		include: ["./src/**/*.test.{ts,tsx}"],
		exclude: ["./playwright-tests/**", "**/node_modules/**"],
		coverage: {
			include: ["./src/**/*.test.{ts,tsx}"],
			exclude: ["./playwright-tests/**", "**/node_modules/**"],
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
		rollupOptions: {
			output: {
				chunkFileNames: "assets/js/[name]-[hash].js",
				entryFileNames: "assets/js/[name]-[hash].js",

				assetFileNames: ({ name }) => {
					if (/manifest/.test(name ?? "")) {
						return "[name]-[hash][extname]";
					}

					if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? "")) {
						return "assets/images/[name]-[hash][extname]";
					}

					if (/\.css$/.test(name ?? "")) {
						return "assets/css/[name]-[hash][extname]";
					}

					if (/\.ttf$/.test(name ?? "")) {
						return "assets/fonts/[name]-[hash][extname]";
					}

					return "assets/[name]-[hash][extname]";
				},

				manualChunks: (id) => {
					if (id.includes("node_modules")) return "node";

					return "";
				},
			},
		},
	},
});
