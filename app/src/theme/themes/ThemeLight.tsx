import { ITheme } from "../Theme.types";
import imageBg from "./assets/themeLight/bg.jpg";

export const themeLight: ITheme = {
	themeName: "light",

	color: {
		transparent: "transparent",

		normalFg: "#333333",
		normalBg: "#ffffff",
		normalFgHover: "#1a1a1a",
		normalBgHover: "#e6e6e6",
		normalFgActive: "#000000",
		normalBgActive: "#d9d9d9",
		normalFgSelected: "#333333",
		normalBgSelected: "#f2f2f2",
		normalFgDisabled: "#b3b3b3",
		normalBgDisabled: "#f2f2f2",

		accentFg: "#007acc",
		accentBg: "#ffffff",
		accentFgHover: "#005fa3",
		accentBgHover: "#e6f2ff",
		accentFgActive: "#003d66",
		accentBgActive: "#d9e9ff",
		accentFgSelected: "#005fa3",
		accentBgSelected: "#e6f2ff",
		accentFgDisabled: "#99c2e6",
		accentBgDisabled: "#e6e6e6",

		successFg: "#4cae4c",
		successBg: "#ffffff",
		successFgHover: "#3b8b3b",
		successBgHover: "#e6ffe6",
		successFgActive: "#2a5c2a",
		successBgActive: "#d9ffd9",
		successFgSelected: "#3b8b3b",
		successBgSelected: "#e6ffe6",
		successFgDisabled: "#99cc99",
		successBgDisabled: "#e6e6e6",

		errorFg: "#d9534f",
		errorBg: "#ffffff",
		errorFgHover: "#c9302c",
		errorBgHover: "#ffe6e6",
		errorFgActive: "#ac2925",
		errorBgActive: "#ffd9d9",
		errorFgSelected: "#c9302c",
		errorBgSelected: "#ffe6e6",
		errorFgDisabled: "#e6b3b3",
		errorBgDisabled: "#f2f2f2",

		warningFg: "#f0ad4e",
		warningBg: "#ffffff",
		warningFgHover: "#ec971f",
		warningBgHover: "#fff4e6",
		warningFgActive: "#d58512",
		warningBgActive: "#ffecd9",
		warningFgSelected: "#ec971f",
		warningBgSelected: "#fff4e6",
		warningFgDisabled: "#ffcc99",
		warningBgDisabled: "#f2f2f2",

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
