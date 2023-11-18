import { ITheme } from "../Theme.types";

export const themeLight: ITheme = {
	themeName: "light",

	color: {
		transparent: "transparent",
		normalFg: "#333333",
		normalBg: "#ffffff",
		normalFgHover: "#999999",
		normalBgHover: "#f5f5f566",
		normalFgActive: "#666666",
		normalBgActive: "#c2c2c2",
		normalFgSelected: "#333333",
		normalBgSelected: "#ebebeb",
		normalFgDisabled: "#959595",
		normalBgDisabled: "#ebebeb",

		accentFg: "#ffffff",
		accentBg: "#e4eefa",
		accentFgHover: "#ffffff",
		accentBgHover: "#296293",
		accentFgActive: "#ffffff",
		accentBgActive: "#193d5b",
		accentFgSelected: "#ffffff",
		accentBgSelected: "#265a87",
		accentFgDisabled: "#959595",
		accentBgDisabled: "#265a87",

		successFg: "#ffffff",
		successBg: "#5cb85c",
		successFgHover: "#ffffff",
		successBgHover: "#46a046",
		successFgActive: "#ffffff",
		successBgActive: "#306f30",
		successFgSelected: "#ffffff",
		successBgSelected: "#419641",
		successFgDisabled: "#959595",
		successBgDisabled: "#419641",

		errorFg: "#ffffff",
		errorBg: "#d9534f",
		errorFgHover: "#ffffff",
		errorBgHover: "#ce312c",
		errorFgActive: "#ffffff",
		errorBgActive: "#932320",
		errorFgSelected: "#ffffff",
		errorBgSelected: "#c12e2a",
		errorFgDisabled: "#959595",
		errorBgDisabled: "#c12e2a",

		shadow: "#00000066",
	},

	size: {
		xs: "0.5rem",
		s: "1.0rem",
		m: "1.5rem",
		l: "2.0rem",
		xl: "2.5rem",
	},
};
