import { ITheme } from "./Theme.types";

export const themeDark: ITheme = {
	themeName: "dark",

	color: {
		background: "#000000",
		onBackground: "#ffffff",
		primary: "#9E9E9E",
		onPrimary: "#000000",
		secondary: "#607D8B",
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
