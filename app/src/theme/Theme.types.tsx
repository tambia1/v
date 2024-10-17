import { themeDark } from "./themes/themeDark/ThemeDark";
import { themeLight } from "./themes/themeLight/ThemeLight";

export const themes = { light: themeLight, dark: themeDark };

export interface ITheme {
	themeName: keyof typeof themes;

	color: {
		transparent: string;

		primaryFg: string;
		primaryBg: string;
		primaryFgHover: string;
		primaryBgHover: string;
		primaryFgActive: string;
		primaryBgActive: string;
		primaryFgSelected: string;
		primaryBgSelected: string;
		primaryFgDisabled: string;
		primaryBgDisabled: string;

		secondaryFg: string;
		secondaryBg: string;
		secondaryFgHover: string;
		secondaryBgHover: string;
		secondaryFgActive: string;
		secondaryBgActive: string;
		secondaryFgSelected: string;
		secondaryBgSelected: string;
		secondaryFgDisabled: string;
		secondaryBgDisabled: string;

		accentFg: string;
		accentBg: string;
		accentFgHover: string;
		accentBgHover: string;
		accentFgActive: string;
		accentBgActive: string;
		accentFgSelected: string;
		accentBgSelected: string;
		accentFgDisabled: string;
		accentBgDisabled: string;

		successFg: string;
		successBg: string;
		successFgHover: string;
		successBgHover: string;
		successFgActive: string;
		successBgActive: string;
		successFgSelected: string;
		successBgSelected: string;
		successFgDisabled: string;
		successBgDisabled: string;

		errorFg: string;
		errorBg: string;
		errorFgHover: string;
		errorBgHover: string;
		errorFgActive: string;
		errorBgActive: string;
		errorFgSelected: string;
		errorBgSelected: string;
		errorFgDisabled: string;
		errorBgDisabled: string;

		warningFg: string;
		warningBg: string;
		warningFgHover: string;
		warningBgHover: string;
		warningFgActive: string;
		warningBgActive: string;
		warningFgSelected: string;
		warningBgSelected: string;
		warningFgDisabled: string;
		warningBgDisabled: string;

		shadow: string;

		boxColor1: string;
		boxColor2: string;
		boxColor3: string;
		boxColor4: string;
		boxColor5: string;
		boxColor6: string;
		boxColor7: string;
		boxColor8: string;
	};

	size: {
		xs: string;
		s: string;
		m: string;
		l: string;
		xl: string;
	};

	images: {
		bg: string;
	};
}
