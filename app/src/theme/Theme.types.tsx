import { themeDark } from "./themes/themeDark/ThemeDark";
import { themeLight } from "./themes/themeLight/ThemeLight";

export const themes = { light: themeLight, dark: themeDark };

export type Theme = {
	themeName: keyof typeof themes;

	color: {
		transparent: string;
		currentColor: string;

		primaryFgEnabled: string;
		primaryBgEnabled: string;
		primaryFgHover: string;
		primaryBgHover: string;
		primaryFgActive: string;
		primaryBgActive: string;
		primaryFgSelected: string;
		primaryBgSelected: string;
		primaryFgDisabled: string;
		primaryBgDisabled: string;

		secondaryFgEnabled: string;
		secondaryBgEnabled: string;
		secondaryFgHover: string;
		secondaryBgHover: string;
		secondaryFgActive: string;
		secondaryBgActive: string;
		secondaryFgSelected: string;
		secondaryBgSelected: string;
		secondaryFgDisabled: string;
		secondaryBgDisabled: string;

		tertiaryFgEnabled: string;
		tertiaryBgEnabled: string;
		tertiaryFgHover: string;
		tertiaryBgHover: string;
		tertiaryFgActive: string;
		tertiaryBgActive: string;
		tertiaryFgSelected: string;
		tertiaryBgSelected: string;
		tertiaryFgDisabled: string;
		tertiaryBgDisabled: string;

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

	font: {
		title: { size: string; weight: string };
		header: { size: string; weight: string };
		body: { size: string; weight: string };
		note: { size: string; weight: string };
	};

	size: {
		content: string;
		available: string;
		xxs: string;
		xs: string;
		s: string;
		m: string;
		l: string;
		xl: string;
		xxl: string;
	};

	image: {
		bg: string;
	};
};
