import { themeDark } from "./themes/ThemeDark";
import { themeLight } from "./themes/ThemeLight";

export const themes: { [key in ThemeName]: ITheme } = { light: themeLight, dark: themeDark };

export type ThemeName = "light" | "dark";

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
export const Colors = {} as { [K in IColor]: K };

const sizes = ["xs", "s", "m", "l", "xl"] as const;
export type ISize = (typeof sizes)[number];
export const Sizes = {} as { [K in ISize]: K };

export interface ITheme {
	themeName: ThemeName;
	color: { [K in IColor]: string };
	size: { [K in ISize]: string };
}