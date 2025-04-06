import * as stylex from "@stylexjs/stylex";

export const colors = stylex.defineVars({
	primary: "color",
	secondary: "color",
});

export const lightTheme = stylex.createTheme(colors, {
	primary: "#000000",
	secondary: "#ff00ff",
});

export const darkTheme = stylex.createTheme(colors, {
	primary: "#ff00ff",
	secondary: "#000000",
});
