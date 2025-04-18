import { useThemeContext } from "@src/theme/UseThemeContext";
import * as stylex from "@stylexjs/stylex";
import { CompiledStyles } from "@stylexjs/stylex/lib/StyleXTypes";
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

export const Elm = ({ children, style, ...props }: { children: ReactNode; style?: CompiledStyles | CompiledStyles[] }) => {
	const themeContext = useThemeContext();
	const selectedTheme = { light: lightTheme, dark: darkTheme }[themeContext.theme.themeName];

	return (
		<div {...stylex.props(selectedTheme, style)} {...props}>
			{children}
		</div>
	);
};
