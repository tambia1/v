import { themeDark } from "./themes/themeDark/ThemeDark";
import { themeLight } from "./themes/themeLight/ThemeLight";

export const themes = { light: themeLight, dark: themeDark };

export type Theme = {
	themeName: keyof typeof themes;

	color: {
		transparent: string;
		currentColor: string;

		primary100: string;
		primary200: string;
		primary300: string;
		primary400: string;
		primary500: string;
		primary600: string;
		primary700: string;
		primary800: string;
		primary900: string;

		secondary100: string;
		secondary200: string;
		secondary300: string;
		secondary400: string;
		secondary500: string;
		secondary600: string;
		secondary700: string;
		secondary800: string;
		secondary900: string;

		success100: string;
		success200: string;
		success300: string;
		success400: string;
		success500: string;
		success600: string;
		success700: string;
		success800: string;
		success900: string;

		danger100: string;
		danger200: string;
		danger300: string;
		danger400: string;
		danger500: string;
		danger600: string;
		danger700: string;
		danger800: string;
		danger900: string;

		info100: string;
		info200: string;
		info300: string;
		info400: string;
		info500: string;
		info600: string;
		info700: string;
		info800: string;
		info900: string;
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
