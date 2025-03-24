import type { Theme } from "../../Theme.types";
import imageBg from "./assets/bg.jpg";

export const themeDark: Theme = {
	themeName: "dark",

	color: {
		transparent: "transparent",
		currentColor: "currentColor",

		primaryFgEnabled: "#ffffff",
		primaryBgEnabled: "#161616",
		primaryFgHover: "#c7c7c7",
		primaryBgHover: "#1a1a1a",
		primaryFgActive: "#8E8E93",
		primaryBgActive: "#000000",
		primaryFgSelected: "#C7C7CC",
		primaryBgSelected: "#333333",
		primaryFgDisabled: "#f2f2f2",
		primaryBgDisabled: "#b3b3b3",

		secondaryFgEnabled: "#007AFF",
		secondaryBgEnabled: "#161616",
		secondaryFgHover: "#0066CC",
		secondaryBgHover: "#1a1a1a",
		secondaryFgActive: "#004780",
		secondaryBgActive: "#000000",
		secondaryFgSelected: "#007AFF",
		secondaryBgSelected: "#333333",
		secondaryFgDisabled: "#80BFFF",
		secondaryBgDisabled: "#b3b3b3",

		tertiaryFgEnabled: "#595959",
		tertiaryBgEnabled: "#f5f5f5",
		tertiaryFgHover: "#404040",
		tertiaryBgHover: "#e0e0e0",
		tertiaryFgActive: "#262626",
		tertiaryBgActive: "#d1d1d1",
		tertiaryFgSelected: "#1a1a1a",
		tertiaryBgSelected: "#c0c0c0",
		tertiaryFgDisabled: "#8c8c8c",
		tertiaryBgDisabled: "#e6e6e6",

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
