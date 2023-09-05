import { themeDark } from "./ThemeDark";
import { themeLight } from "./ThemeLight";

export interface Theme {
	themeName: ThemeName;
	fontSizes: {
		small: string;
		medium: string;
		large: string;
	};
	colors: {
		primary: string;
		secondary: string;
		tertiary: string;
	};
	backgroundColors: {
		primary: string;
		secondary: string;
		tertiary: string;
	};
	images: {
		mainBackground: string;
		map: string;
	};
}

export type ThemeName = "themeLight" | "themeDark";
export const themes: { [key in ThemeName]: Theme } = { themeLight, themeDark };
