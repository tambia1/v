import imageBgLight from "@pages/assets/bgLight.jpg";
import imageWorldMapLight from "@pages/pageHome/screens/screenDataCenter/assets/world-map-light.png";
import { ITheme } from "./Theme.types";

export const themeLight: ITheme = {
	themeName: "light",

	color: {
		primary: "#6200ee",
		primaryVariant: "#3700b3",
		secondary: "#03dac6",
		secondaryVariant: "#018786",
		background: "#ffffff",
		surface: "#ffffff",
		error: "#c51162",
		onPrimary: "#ffffff",
		onSecondary: "#000000",
		onBackground: "#000000",
		onSurface: "#000000",
		onError: "#ffffff",
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
