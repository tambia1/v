import type { Theme } from "../../Theme.types";
import imageBg from "./assets/bg.jpg";

export const themeDark: Theme = {
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
		secondaryFgHover: "#c7c7c7",
		secondaryBgHover: "#1a1a1a",
		secondaryFgActive: "#8E8E93",
		secondaryBgActive: "#000000",
		secondaryFgSelected: "#C7C7CC",
		secondaryBgSelected: "#333333",
		secondaryFgDisabled: "#f2f2f2",
		secondaryBgDisabled: "#b3b3b3",

		accentFg: "#007AFF",
		accentBg: "#161616",

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
		header: { size: "140%", weight: "normal" },
		body: { size: "100%", weight: "normal" },
		note: { size: "80%", weight: "normal" },
	},

	size: {
		content: "fit-content",
		available: "100%",
		xxs: "2.0rem",
		xs: "2.5rem",
		s: "5rem",
		m: "10rem",
		l: "15rem",
		xl: "20rem",
		xxl: "28rem",
	},

	image: {
		bg: imageBg,
	},
};
