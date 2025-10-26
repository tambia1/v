import type { Theme } from "../../Theme.types";
import imageBg from "./assets/bg.jpg";

export const themeDark: Theme = {
	themeName: "dark",

	color: {
		transparent: "transparent",
		currentColor: "currentColor",

		primary100: "#111827",
		primary200: "#1f2937",
		primary300: "#374151",
		primary400: "#4b5563",
		primary500: "#6b7280",
		primary600: "#9ca3af",
		primary700: "#d1d5db",
		primary800: "#e5e7eb",
		primary900: "#f3f4f6",

		secondary100: "#713f12",
		secondary200: "#854d0e",
		secondary300: "#a16207",
		secondary400: "#ca8a04",
		secondary500: "#eab308",
		secondary600: "#facc15",
		secondary700: "#fde047",
		secondary800: "#fef08a",
		secondary900: "#fef9c3",

		success100: "#365314",
		success200: "#3f6212",
		success300: "#4d7c0f",
		success400: "#65a30d",
		success500: "#84cc16",
		success600: "#a3e635",
		success700: "#bef264",
		success800: "#d9f99d",
		success900: "#ecfccb",

		danger100: "#831843",
		danger200: "#9d174d",
		danger300: "#be185d",
		danger400: "#db2777",
		danger500: "#ec4899",
		danger600: "#f472b6",
		danger700: "#f9a8d4",
		danger800: "#fbcfe8",
		danger900: "#fce7f3",

		info100: "#164e63",
		info200: "#155e75",
		info300: "#0e7490",
		info400: "#0891b2",
		info500: "#06b6d4",
		info600: "#22d3ee",
		info700: "#67e8f9",
		info800: "#a5f3fc",
		info900: "#cffafe",
	},

	shadow: {
		text: "1px 1px 3px #e5e7eb",
		box: "3px 3px 20px -5px #e5e7eb",
	},

	font: {
		title: { size: "180%", weight: "bolder" },
		header: { size: "140%", weight: "bold" },
		body: { size: "100%", weight: "normal" },
		note: { size: "80%", weight: "normal" },
	},

	size: {
		size50: "0.5rem",
		size100:  "1rem",
		size150:  "1.5rem",
		size200:  "2rem",
		size250:  "2.5rem",
		size300:  "3rem",
		size400:  "4rem",
		size500:  "5rem",
		size600:  "8rem",
		size700:  "10rem",
		size800:  "20rem",
		size900:  "30rem",
	},

	image: {
		bg: imageBg,
	},
};
