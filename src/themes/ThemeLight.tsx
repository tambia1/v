import { ITheme } from "./Theme.types";

export const themeLight: ITheme = {
	themeName: "light",

	color: {
		background: "#ffffff",
		onBackground: "#000000",
		primary: "#00BCD4",
		onPrimary: "#000000",
		secondary: "#006064",
		onSecondary: "#ffffff",
		error: "#c51162",
		onError: "#ffffff",
		success: "#4CAF50",
		onSuccess: "#ffffff",
	},

	size: {
		xs: "0.5rem",
		s: "1.0rem",
		m: "1.5rem",
		l: "2.0rem",
		xl: "2.5rem",
	},
};
