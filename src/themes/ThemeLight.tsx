import imageBgLight from "@pages/assets/bgLight.jpg";
import imageWorldMapLight from "@pages/pageHome/screens/screenDataCenter/assets/world-map-light.png";
import { Theme } from "./Theme.types";

export const themeLight: Theme = {
	themeName: "themeLight",
	fontSizes: {
		small: "14px",
		medium: "16px",
		large: "20px",
	},
	colors: {
		primary: "#000000",
		secondary: "#ffc0cb",
		tertiary: "#aaffaa",
	},
	backgroundColors: {
		primary: "#ffffffcc",
		secondary: "#ffffff",
		tertiary: "#00000033",
	},
	images: {
		mainBackground: imageBgLight,
		map: imageWorldMapLight,
	},
};
