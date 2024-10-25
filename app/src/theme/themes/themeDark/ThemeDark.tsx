import type { ITheme } from "../../Theme.types";
import imageBg from "./assets/bg.jpg";

export const themeDark: ITheme = {
	themeName: "dark",

	color: {
		transparent: "transparent",

		primaryFg: "#ffffff",
		primaryBg: "#161616",
		primaryFgHover: "#c7c7c7",
		primaryBgHover: "#1a1a1a",
		primaryFgActive: "#8E8E93",
		primaryBgActive: "#000000",
		primaryFgSelected: "#C7C7CC",
		primaryBgSelected: "#333333",
		primaryFgDisabled: "#f2f2f2",
		primaryBgDisabled: "#b3b3b3",

		secondaryFg: "#f2f2f2",
		secondaryBg: "#161616",

		ternaryFg: "#E5E5EA",
		ternaryBg: "#8E8E93",

		accentFg: "#007AFF",
		accentBg: "#161616",

		quarteryFg: "#888888",
		quarteryBg: "#A9A9A9",

		successFg: "#34C759",
		successBg: "#161616",

		errorFg: "#FF3B30",
		errorBg: "#161616",

		warningFg: "#FF9500",
		warningBg: "#161616",
	},

	shadow: {
		text: "1px 1px 3px",
		box: "3px 3px 20px -5px",
	},

	font: {
		title: { size: "180%", weight: "bold" },
		header: { size: "140%", weight: "regular" },
		body: { size: "100%", weight: "regular" },
		note: { size: "80%", weight: "regular" },
	},

	size: {
		xs: "0.5rem",
		s: "1.0rem",
		m: "1.5rem",
		l: "2.0rem",
		xl: "2.5rem",
	},

	image: {
		bg: imageBg,
	},
};
