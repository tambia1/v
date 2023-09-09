import imageBgDark from "@pages/assets/bgDark.jpg";
import imageWorldMapDark from "@pages/pageHome/screens/screenDataCenter/assets/world-map-dark.png";
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
		small: "14px",
		medium: "16px",
		large: "20px",
	},

	image: {
		mainBackground: imageBgDark,
		map: imageWorldMapDark,
	},
};
