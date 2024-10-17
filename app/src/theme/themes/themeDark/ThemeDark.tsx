import type { ITheme } from "../../Theme.types";
import imageBg from "./assets/bg.jpg";

export const themeDark: ITheme = {
	themeName: "dark",

	color: {
		transparent: "transparent",

		primaryFg: "#e0e0e0",
		primaryBg: "#1e1e1e",
		primaryFgHover: "#ffffff",
		primaryBgHover: "#33333388",
		primaryFgActive: "#ffffff",
		primaryBgActive: "#444444",
		primaryFgSelected: "#ffffff",
		primaryBgSelected: "#555555",
		primaryFgDisabled: "#a0a0a0",
		primaryBgDisabled: "#333333",

		secondaryFg: "#3C3C43",
		secondaryBg: "#787880",
		secondaryFgHover: "#1a1a1a",
		secondaryBgHover: "#c6c6c688",
		secondaryFgActive: "#000000",
		secondaryBgActive: "#a9a9a9",
		secondaryFgSelected: "#333333",
		secondaryBgSelected: "#F3F2F8",
		secondaryFgDisabled: "#b3b3b3",
		secondaryBgDisabled: "#f2f2f2",

		accentFg: "#ffffff",
		accentBg: "#555555",
		accentFgHover: "#ffffff",
		accentBgHover: "#1e88e588",
		accentFgActive: "#ffffff",
		accentBgActive: "#0d47a1",
		accentFgSelected: "#ffffff",
		accentBgSelected: "#1e88e5",
		accentFgDisabled: "#b0b0b0",
		accentBgDisabled: "#444444",

		successFg: "#4caf50",
		successBg: "#1e1e1e",
		successFgHover: "#66bb6a",
		successBgHover: "#1e1e1e88",
		successFgActive: "#81c784",
		successBgActive: "#1e1e1e",
		successFgSelected: "#66bb6a",
		successBgSelected: "#1e1e1e",
		successFgDisabled: "#81c784",
		successBgDisabled: "#333333",

		errorFg: "#e57373",
		errorBg: "#1e1e1e",
		errorFgHover: "#f44336",
		errorBgHover: "#1e1e1e88",
		errorFgActive: "#ef5350",
		errorBgActive: "#1e1e1e",
		errorFgSelected: "#f44336",
		errorBgSelected: "#1e1e1e",
		errorFgDisabled: "#ef5350",
		errorBgDisabled: "#333333",

		warningFg: "#ffb74d",
		warningBg: "#1e1e1e",
		warningFgHover: "#ff9800",
		warningBgHover: "#1e1e1e88",
		warningFgActive: "#ffa726",
		warningBgActive: "#1e1e1e",
		warningFgSelected: "#ff9800",
		warningBgSelected: "#1e1e1e",
		warningFgDisabled: "#ffa726",
		warningBgDisabled: "#333333",

		shadow: "1px 1px 4px",

		boxColor1: "#b0b0b0",
		boxColor2: "#cfd8dc",
		boxColor3: "#888888",
		boxColor4: "#1e1e1e",
		boxColor5: "#2a2a2a",
		boxColor6: "#b0b0b0",
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
