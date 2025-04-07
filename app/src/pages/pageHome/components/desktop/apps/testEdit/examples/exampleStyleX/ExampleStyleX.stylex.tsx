import { useThemeContext } from "@src/theme/UseThemeContext";
import * as stylex from "@stylexjs/stylex";
import { ReactNode } from "react";

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

const stylesThemes = stylex.create({
	themedBox: {
		color: colors.primary,
		backgroundColor: colors.secondary,
	},
});

export const Box = ({ children, ...props }: { children: ReactNode }) => {
	const themeContext = useThemeContext();
	const selectedTheme = { light: lightTheme, dark: darkTheme }[themeContext.theme.themeName];

	return (
		<div {...stylex.props(selectedTheme, stylesThemes.themedBox)} {...props}>
			{children}
		</div>
	);
};
