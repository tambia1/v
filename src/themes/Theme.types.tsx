import { themeDark } from "./ThemeDark";
import { themeLight } from "./ThemeLight";

export const themes: { [key in ThemeName]: ITheme } = { light: themeLight, dark: themeDark };

export type ThemeName = "light" | "dark";

export interface ITheme {
	themeName: ThemeName;

	color: {
		primary: string;
		primaryVariant: string;
		secondary: string;
		secondaryVariant: string;
		background: string;
		surface: string;
		error: string;
		onPrimary: string;
		onSecondary: string;
		onBackground: string;
		onSurface: string;
		onError: string;
	};

	size: {
		small: string;
		medium: string;
		large: string;
	};

	image: {
		mainBackground: string;
		map: string;
	};
}
