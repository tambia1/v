import { ITheme } from "../Theme.types";
import imageBg from "./assets/themeDark/bg.jpg";

export const themeDark: ITheme = {
	themeName: "dark",

	color: {
		transparent: "transparent",

		normalFg: "#dedede",
		normalBg: "#2a2a2a",
		normalFgHover: "#dedede",
		normalBgHover: "#34343466",
		normalFgActive: "#dedede",
		normalBgActive: "#676767",
		normalFgSelected: "#dedede",
		normalBgSelected: "#3e3e3e",
		normalFgDisabled: "#dedede",
		normalBgDisabled: "#3e3e3e",

		accentFg: "#ffffff",
		accentBg: "#676767",
		accentFgHover: "#ffffff",
		accentBgHover: "#296293",
		accentFgActive: "#ffffff",
		accentBgActive: "#193d5b",
		accentFgSelected: "#ffffff",
		accentBgSelected: "#265a87",
		accentFgDisabled: "#959595",
		accentBgDisabled: "#265a87",

		successFg: "#336633",
		successBg: "#2a2a2a",
		successFgHover: "#7cc67c",
		successBgHover: "#2a2a2a",
		successFgActive: "#aedcae",
		successBgActive: "#2a2a2a",
		successFgSelected: "#87cb87",
		successBgSelected: "#2a2a2a",
		successFgDisabled: "#87cb87",
		successBgDisabled: "#959595",

		errorFg: "#935454",
		errorBg: "#2a2a2a",
		errorFgHover: "#2a2a2a",
		errorBgHover: "#e17875",
		errorFgActive: "#2a2a2a",
		errorBgActive: "#eeb1af",
		errorFgSelected: "#2a2a2a",
		errorBgSelected: "#e48481",
		errorFgDisabled: "#959595",
		errorBgDisabled: "#c12e2a",

		warningFg: "#2a2a2a",
		warningBg: "#87691D",
		warningFgHover: "#2a2a2a",
		warningBgHover: "#ca8526",
		warningFgActive: "#2a2a2a",
		warningBgActive: "#9a6516",
		warningFgSelected: "#2a2a2a",
		warningBgSelected: "#ca8526",
		warningFgDisabled: "#959595",
		warningBgDisabled: "#ca8526",

		shadow: "1px 1px 4px",

		boxColor1: "#959595",
		boxColor2: "#ced9e8",
		boxColor3: "#888888",
		boxColor4: "#222222",
		boxColor5: "#2a2a2a",
		boxColor6: "#959595",
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
