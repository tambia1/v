import { themeDark } from "./themes/ThemeDark";
import { themeLight } from "./themes/ThemeLight";

export const themes = { light: themeLight, dark: themeDark };
export type IThemeName = keyof typeof themes;

export interface ITheme {
	themeName: IThemeName;

	color: {
		transparent: string;

		normalFg: string;
		normalBg: string;
		normalFgHover: string;
		normalBgHover: string;
		normalFgActive: string;
		normalBgActive: string;
		normalFgSelected: string;
		normalBgSelected: string;
		normalFgDisabled: string;
		normalBgDisabled: string;

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
}
