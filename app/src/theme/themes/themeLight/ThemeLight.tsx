import type { Theme } from "../../Theme.types";
import imageBg from "./assets/bg.jpg";

export const themeLight: Theme = {
	themeName: "light",

	color: {
		transparent: "transparent",
		currentColor: "currentColor",

		primary100: "#f3f4f6",
		primary200: "#e5e7eb",
		primary300: "#d1d5db",
		primary400: "#9ca3af",
		primary500: "#6b7280",
		primary600: "#4b5563",
		primary700: "#374151",
		primary800: "#1f2937",
		primary900: "#111827",

		secondary100: "#dbeafe",
		secondary200: "#bfdbfe",
		secondary300: "#93c5fd",
		secondary400: "#60a5fa",
		secondary500: "#3b82f6",
		secondary600: "#2563eb",
		secondary700: "#1d4ed8",
		secondary800: "#1e40af",
		secondary900: "#1e3a8a",

		success100: "#d1fae5",
		success200: "#a7f3d0",
		success300: "#6ee7b7",
		success400: "#34d399",
		success500: "#10b981",
		success600: "#059669",
		success700: "#047857",
		success800: "#065f46",
		success900: "#064e3b",

		danger100: "#fee2e2",
		danger200: "#fecaca",
		danger300: "#fca5a5",
		danger400: "#f87171",
		danger500: "#ef4444",
		danger600: "#dc2626",
		danger700: "#b91c1c",
		danger800: "#991b1b",
		danger900: "#7f1d1d",

		info100: "#f3e8ff",
		info200: "#e9d5ff",
		info300: "#d8b4fe",
		info400: "#c084fc",
		info500: "#a855f7",
		info600: "#9333ea",
		info700: "#7e22ce",
		info800: "#6b21a8",
		info900: "#581c87",
	},

	shadow: {
		text: `1px 1px 3px`,
		box: `2px 2px 10px -5px`,
	},

	font: {
		title: { size: "180%", weight: "bolder" },
		header: { size: "140%", weight: "bold" },
		body: { size: "100%", weight: "normal" },
		note: { size: "80%", weight: "normal" },
	},

	size: {
		size50: "0.5rem",
		size100: "1rem",
		size150: "1.5rem",
		size200: "2rem",
		size250: "2.5rem",
		size300: "3rem",
		size400: "4rem",
		size500: "5rem",
		size600: "8rem",
		size700: "10rem",
		size800: "20rem",
		size900: "30rem",
	},

	image: {
		bg: imageBg,
	},
};
