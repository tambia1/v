import imageBgDark from "@pages/assets/bgDark.jpg";
import imageWorldMapDark from "@pages/pageHome/screens/screenDataCenter/assets/world-map-dark.png";
import { Theme } from "./Theme.types";

export const themeDark: Theme = {
	themeName: "themeDark",
	fontSizes: {
		small: "14px",
		medium: "16px",
		large: "20px",
	},
	colors: {
		primary: "#ffffff",
		secondary: "#ffc0cb",
		tertiary: "#33ff33",
	},
	backgroundColors: {
		primary: "#00000066",
		secondary: "#000000",
		tertiary: "#ffffffcc",
	},
	images: {
		mainBackground: imageBgDark,
		map: imageWorldMapDark,
	},
};
