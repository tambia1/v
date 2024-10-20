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

		ternaryFg: string;
		ternaryBg: string;

		quarteryFg: string;
		quarteryBg: string;

		accentFg: string;
		accentBg: string;

		successFg: string;
		successBg: string;

		errorFg: string;
		errorBg: string;

		warningFg: string;
		warningBg: string;
	};

	shadow: {
		text: string;
		box: string;
	};

	fontSize: {
		title: string;
		header: string;
		body: string;
		note: string;
	};

	fontWeight: {
		title: string;
		header: string;
		body: string;
		note: string;
	};

	size: {
		xs: string;
		s: string;
		m: string;
		l: string;
		xl: string;
	};

	image: {
		bg: string;
	};
}
