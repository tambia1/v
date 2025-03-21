import { themeDark } from "./themes/themeDark/ThemeDark";
import { themeLight } from "./themes/themeLight/ThemeLight";

export const themes = { light: themeLight, dark: themeDark };

type ColorGroup = "primary" | "secondary" | "ternary" | "quartery";
type ColorState = "" | "Hover" | "Active" | "Selected" | "Disabled";
type ColorType = `${ColorGroup}${"Fg" | "Bg"}${ColorState}`;

export type ITheme = {
	themeName: keyof typeof themes;

	color: { [key in ColorType]: string } & {
		transparent: string;

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
