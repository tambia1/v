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
		xs: "10px",
		s: "14px",
		m: "16px",
		l: "20px",
		xl: "24px",
	},
};
