import type { Theme } from "../../Theme.types";
import imageBg from "./assets/bg.jpg";

export const themeLight: Theme = {
	themeName: "light",

	color: {
		transparent: "transparent",

		primaryFgEnabled: "#161616",
		primaryBgEnabled: "#ffffff",
		primaryFgHover: "#1a1a1a",
		primaryBgHover: "#c7c7c7",
		primaryFgActive: "#000000",
		primaryBgActive: "#8E8E93",
		primaryFgSelected: "#333333",
		primaryBgSelected: "#C7C7CC",
		primaryFgDisabled: "#b3b3b3",
		primaryBgDisabled: "#f2f2f2",

		secondaryFgEnabled: "#007AFF",
		secondaryBgEnabled: "#ffffff",
		secondaryFgHover: "#0066CC",
		secondaryBgHover: "#c7c7c7",
		secondaryFgActive: "#004780",
		secondaryBgActive: "#8E8E93",
		secondaryFgSelected: "#007AFF",
		secondaryBgSelected: "#C7C7CC",
		secondaryFgDisabled: "#80BFFF",
		secondaryBgDisabled: "#f2f2f2",

		successFg: "#34C759",
		successBg: "#ffffff",

		errorFg: "#FF3B30",
		errorBg: "#ffffff",

		warningFg: "#FF9500",
		warningBg: "#ffffff",
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
