import type { ITheme } from "../../Theme.types";
import imageBg from "./assets/bg.jpg";

export const themeLight: ITheme = {
	themeName: "light",

	color: {
		transparent: "transparent",

		primaryFg: "#161616",
		primaryBg: "#ffffff",
		primaryFgHover: "#1a1a1a",
		primaryBgHover: "#c7c7c7",
		primaryFgActive: "#000000",
		primaryBgActive: "#8E8E93",
		primaryFgSelected: "#333333",
		primaryBgSelected: "#C7C7CC",
		primaryFgDisabled: "#b3b3b3",
		primaryBgDisabled: "#f2f2f2",

		secondaryFg: "#161616",
		secondaryBg: "#F2F2F2",

		ternaryFg: "#161616",
		ternaryBg: "#E4E4E4",

		quarteryFg: "#aaaaaa",
		quarteryBg: "#ffffff",

		accentFg: "#007AFF",
		accentBg: "#ffffff",

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

	fontSize: {
		title: "180%",
		header: "140%",
		body: "100%",
		note: "80%",
	},

	fontWeight: {
		title: "bold",
		header: "regular",
		body: "regular",
		note: "regular",
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
