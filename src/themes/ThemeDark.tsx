import imageBgDark from "@pages/assets/bgDark.jpg";
import imageWorldMapDark from "@pages/pageHome/screens/screenDataCenter/assets/world-map-dark.png";
import { ITheme } from "./Theme.types";

export const themeDark: ITheme = {
	themeName: "dark",

	color: {
		primary: "#9E9E9E",
		primaryVariant: "#616161",
		secondary: "#607D8B",
		secondaryVariant: "#455A64",
		background: "#000000",
		surface: "#000000",
		error: "#c51162",
		onPrimary: "#ffffff",
		onSecondary: "#000000",
		onBackground: "#ffffff",
		onSurface: "#ffffff",
		onError: "#ffffff",
	},

	size: {
		small: "14px",
		medium: "16px",
		large: "20px",
	},

	image: {
		mainBackground: imageBgDark,
		map: imageWorldMapDark,
	},
};
