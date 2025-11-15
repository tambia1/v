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
		font100: { size: string; weight: string };
		font200: { size: string; weight: string };
		font300: { size: string; weight: string };
		font400: { size: string; weight: string };
		font500: { size: string; weight: string };
		font600: { size: string; weight: string };
		font700: { size: string; weight: string };
		font800: { size: string; weight: string };
		font900: { size: string; weight: string };
	};

	size: {
		size50: string;
		size100: string;
		size150: string;
		size200: string;
		size250: string;
		size300: string;
		size400: string;
		size500: string;
		size600: string;
		size700: string;
		size800: string;
		size900: string;
	};

	image: {
		bg: string;
	};
};
