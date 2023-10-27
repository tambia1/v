import { themeDark } from "./themes/ThemeDark";
import { themeLight } from "./themes/ThemeLight";

export const themes = { light: themeLight, dark: themeDark };

export type IThemeName = keyof typeof themes;

const colors = [
	"transparent",
	"normalFg",
	"normalBg",
	"normalFgHover",
	"normalBgHover",
	"normalFgActive",
	"normalBgActive",
	"normalFgSelected",
	"normalBgSelected",
	"normalFgDisabled",
	"normalBgDisabled",
	"accentFg",
	"accentBg",
	"accentFgHover",
	"accentBgHover",
	"accentFgActive",
	"accentBgActive",
	"accentFgSelected",
	"accentBgSelected",
	"accentFgDisabled",
	"accentBgDisabled",
	"successFg",
	"successBg",
	"successFgHover",
	"successBgHover",
	"successFgActive",
	"successBgActive",
	"successFgSelected",
	"successBgSelected",
	"successFgDisabled",
	"successBgDisabled",
	"errorFg",
	"errorBg",
	"errorFgHover",
	"errorBgHover",
	"errorFgActive",
	"errorBgActive",
	"errorFgSelected",
	"errorBgSelected",
	"errorFgDisabled",
	"errorBgDisabled",
] as const;
export type IColor = (typeof colors)[number];

const sizes = ["xs", "s", "m", "l", "xl"] as const;
export type ISize = (typeof sizes)[number];

export interface ITheme {
	themeName: IThemeName;
	color: { [K in IColor]: string };
	size: { [K in ISize]: string };
}
