import imageBgLight from "@pages/assets/bgLight.jpg";
import imageWorldMapLight from "@pages/pageHome/screens/screenDataCenter/assets/world-map-light.png";
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
		small: "14px",
		medium: "16px",
		large: "20px",
	},

	image: {
		mainBackground: imageBgLight,
		map: imageWorldMapLight,
	},
};
