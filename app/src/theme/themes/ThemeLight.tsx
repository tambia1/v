import { ITheme } from "../Theme.types";
import imageBg from "./assets/themeLight/bg.jpg";

export const themeLight: ITheme = {
	themeName: "light",

	color: {
		transparent: "transparent",

		normalFg: "#333333",
		normalBg: "#ffffff",
		normalFgHover: "#333333",
		normalBgHover: "#cccccc",
		normalFgActive: "#666666",
		normalBgActive: "#c2c2c2",
		normalFgSelected: "#333333",
		normalBgSelected: "#ebebeb",
		normalFgDisabled: "#959595",
		normalBgDisabled: "#ebebeb",

		accentFg: "#4c7ebb",
		accentBg: "#ffffff",
		accentFgHover: "#89b2f3",
		accentBgHover: "#f5f5f566",
		accentFgActive: "#193d5b",
		accentBgActive: "#ffffff",
		accentFgSelected: "#265a87",
		accentBgSelected: "#ffffff",
		accentFgDisabled: "#265a87",
		accentBgDisabled: "#959595",

		successFg: "#5cb85c",
		successBg: "#ffffff",
		successFgHover: "#46a046",
		successBgHover: "#ffffff",
		successFgActive: "#306f30",
		successBgActive: "#ffffff",
		successFgSelected: "#419641",
		successBgSelected: "#ffffff",
		successFgDisabled: "#419641",
		successBgDisabled: "#959595",

		errorFg: "#d9534f",
		errorBg: "#ffffff",
		errorFgHover: "#ce312c",
		errorBgHover: "#ffffff",
		errorFgActive: "#932320",
		errorBgActive: "#ffffff",
		errorFgSelected: "#c12e2a",
		errorBgSelected: "#ffffff",
		errorFgDisabled: "#c12e2a",
		errorBgDisabled: "#959595",

		warningFg: "#fac536",
		warningBg: "#ffffff",
		warningFgHover: "#ca8526",
		warningBgHover: "#ffffff",
		warningFgActive: "#9a6516",
		warningBgActive: "#ffffff",
		warningFgSelected: "#ca8526",
		warningBgSelected: "#ffffff",
		warningFgDisabled: "#ca8526",
		warningBgDisabled: "#959595",

		shadow: "1px 1px 4px",

		boxColor1: "#ffffff",
		boxColor2: "#ced9e8",
		boxColor3: "#3b5374",
		boxColor4: "#08264e",
		boxColor5: "#bbbbbb",
		boxColor6: "#08264e",
		boxColor7: "#723a3a",
		boxColor8: "#4c0808",
	},

	size: {
		xs: "0.5rem",
		s: "1.0rem",
		m: "1.5rem",
		l: "2.0rem",
		xl: "2.5rem",
	},

	images: {
		bg: imageBg,
	},
};
