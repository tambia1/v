import { useThemeContext } from "@src/theme/UseThemeContext";
import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { AnchorHTMLAttributes, ElementType, HTMLAttributes, ReactNode } from "react";

export const themeVars = stylex.defineVars({
	transparent: "color",
	currentColor: "color",

	primary100: "color",
	primary200: "color",
	primary300: "color",
	primary400: "color",
	primary500: "color",
	primary600: "color",
	primary700: "color",
	primary800: "color",
	primary900: "color",

	secondary100: "color",
	secondary200: "color",
	secondary300: "color",
	secondary400: "color",
	secondary500: "color",
	secondary600: "color",
	secondary700: "color",
	secondary800: "color",
	secondary900: "color",

	success100: "color",
	success200: "color",
	success300: "color",
	success400: "color",
	success500: "color",
	success600: "color",
	success700: "color",
	success800: "color",
	success900: "color",

	danger100: "color",
	danger200: "color",
	danger300: "color",
	danger400: "color",
	danger500: "color",
	danger600: "color",
	danger700: "color",
	danger800: "color",
	danger900: "color",

	info100: "color",
	info200: "color",
	info300: "color",
	info400: "color",
	info500: "color",
	info600: "color",
	info700: "color",
	info800: "color",
	info900: "color",

	shadowText: "shadow",
	shadowBox: "shadow",

	titleSize: "font-size",
	titleWeight: "font-weight",
	headerSize: "font-size",
	headerWeight: "font-weight",
	bodySize: "font-size",
	bodyWeight: "font-weight",
	noteSize: "font-size",
	noteWeight: "font-weight",

	size50: "length",
	size100: "length",
	size150: "length",
	size200: "length",
	size250: "length",
	size300: "length",
	size400: "length",
	size500: "length",
	size600: "length",
	size700: "length",
	size800: "length",
	size900: "length",

	bg: "image",
});

export const lightTheme = stylex.createTheme(themeVars, {
	// color
	transparent: "transparent",
	currentColor: "currentColor",

	primary100: "#f3f4f6",
	primary200: "#e5e7eb",
	primary300: "#d1d5db",
	primary400: "#9ca3af",
	primary500: "#6b7280",
	primary600: "#4b5563",
	primary700: "#374151",
	primary800: "#1f2937",
	primary900: "#111827",

	secondary100: "#dbeafe",
	secondary200: "#bfdbfe",
	secondary300: "#93c5fd",
	secondary400: "#60a5fa",
	secondary500: "#3b82f6",
	secondary600: "#2563eb",
	secondary700: "#1d4ed8",
	secondary800: "#1e40af",
	secondary900: "#1e3a8a",

	success100: "#d1fae5",
	success200: "#a7f3d0",
	success300: "#6ee7b7",
	success400: "#34d399",
	success500: "#10b981",
	success600: "#059669",
	success700: "#047857",
	success800: "#065f46",
	success900: "#064e3b",

	danger100: "#fee2e2",
	danger200: "#fecaca",
	danger300: "#fca5a5",
	danger400: "#f87171",
	danger500: "#ef4444",
	danger600: "#dc2626",
	danger700: "#b91c1c",
	danger800: "#991b1b",
	danger900: "#7f1d1d",

	info100: "#f3e8ff",
	info200: "#e9d5ff",
	info300: "#d8b4fe",
	info400: "#c084fc",
	info500: "#a855f7",
	info600: "#9333ea",
	info700: "#7e22ce",
	info800: "#6b21a8",
	info900: "#581c87",

	// shadow
	shadowText: "1px 1px 3px red #1f2937",
	shadowBox: "2px 2px 10px -5px #1f2937",

	// font
	titleSize: "180%",
	titleWeight: "bolder",
	headerSize: "140%",
	headerWeight: "bold",
	bodySize: "100%",
	bodyWeight: "normal",
	noteSize: "80%",
	noteWeight: "normal",

	// size
	size50: "0.5rem",
	size100: "1rem",
	size150: "1.5rem",
	size200: "2rem",
	size250: "2.5rem",
	size300: "3rem",
	size400: "4rem",
	size500: "5rem",
	size600: "8rem",
	size700: "10rem",
	size800: "20rem",
	size900: "30rem",

	// image
	bg: `url(${"imageBg"})`,
});

export const darkTheme = stylex.createTheme(themeVars, {
	// color
	transparent: "transparent",
	currentColor: "currentColor",

	primary100: "#111827",
	primary200: "#1f2937",
	primary300: "#374151",
	primary400: "#4b5563",
	primary500: "#6b7280",
	primary600: "#9ca3af",
	primary700: "#d1d5db",
	primary800: "#e5e7eb",
	primary900: "#f3f4f6",

	secondary100: "#713f12",
	secondary200: "#854d0e",
	secondary300: "#a16207",
	secondary400: "#ca8a04",
	secondary500: "#eab308",
	secondary600: "#facc15",
	secondary700: "#fde047",
	secondary800: "#fef08a",
	secondary900: "#fef9c3",

	success100: "#365314",
	success200: "#3f6212",
	success300: "#4d7c0f",
	success400: "#65a30d",
	success500: "#84cc16",
	success600: "#a3e635",
	success700: "#bef264",
	success800: "#d9f99d",
	success900: "#ecfccb",

	danger100: "#831843",
	danger200: "#9d174d",
	danger300: "#be185d",
	danger400: "#db2777",
	danger500: "#ec4899",
	danger600: "#f472b6",
	danger700: "#f9a8d4",
	danger800: "#fbcfe8",
	danger900: "#fce7f3",

	info100: "#164e63",
	info200: "#155e75",
	info300: "#0e7490",
	info400: "#0891b2",
	info500: "#06b6d4",
	info600: "#22d3ee",
	info700: "#67e8f9",
	info800: "#a5f3fc",
	info900: "#cffafe",

	// shadow
	shadowText: "1px 1px 3px red #e5e7eb",
	shadowBox: "2px 2px 10px -5px #e5e7eb",

	// font
	titleSize: "180%",
	titleWeight: "bolder",
	headerSize: "140%",
	headerWeight: "bold",
	bodySize: "100%",
	bodyWeight: "normal",
	noteSize: "80%",
	noteWeight: "normal",

	// size
	size50: "0.5rem",
	size100: "1rem",
	size150: "1.5rem",
	size200: "2rem",
	size250: "2.5rem",
	size300: "3rem",
	size400: "4rem",
	size500: "5rem",
	size600: "8rem",
	size700: "10rem",
	size800: "20rem",
	size900: "30rem",

	// image
	bg: `url(${"imageBg"})`,
});

type Props<T extends ElementType> = {
	as?: T;
	children: ReactNode;
	style?: StyleXStyles | StyleXStyles[];
};

export const Elm = <T extends ElementType = "div">({ as, children, style, ...props }: Props<T>) => {
	const themeContext = useThemeContext();
	const selectedTheme = { light: lightTheme, dark: darkTheme }[themeContext.theme.themeName];

	const Component = as || "div";

	return (
		<Component {...stylex.props(selectedTheme, style)} {...props}>
			{children}
		</Component>
	);
};

const styles = stylex.create({
	default: {
		display: "flex",
		width: "fit-content",
		padding: "5px",
		borderRadius: "5px",
		color: themeVars.success100,
		backgroundColor: themeVars.success500,
		boxShadow: themeVars.shadowBox,
	},
});

export const Box1 = ({ children }: { children: ReactNode }) => {
	return <Elm style={[styles.default]}>{children}</Elm>;
};

export const Box2 = ({ children, ...rest }: HTMLAttributes<HTMLSpanElement>) => {
	return (
		<Elm as="span" {...rest} style={[styles.default]}>
			{children}
		</Elm>
	);
};

export const Box3 = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
	return (
		<Elm as="div" {...rest} style={[styles.default]}>
			{children}
		</Elm>
	);
};

export const Box4 = ({ children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
	return (
		<Elm as="a" {...rest} style={[styles.default]}>
			{children}
		</Elm>
	);
};
