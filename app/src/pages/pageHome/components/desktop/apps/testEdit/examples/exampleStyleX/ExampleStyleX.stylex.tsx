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

const style = stylex.create({
	default: {
		color: colors.primary,
		backgroundColor: colors.secondary,
	},
});

export const Base = ({ children, style, ...props }: { children: ReactNode; style?: CompiledStyles | CompiledStyles[] }) => {
	const themeContext = useThemeContext();
	const selectedTheme = { light: lightTheme, dark: darkTheme }[themeContext.theme.themeName];

	return (
		<div {...stylex.props(selectedTheme, style)} {...props}>
			{children}
		</div>
	);
};

export const Box = ({ children, ...props }: { children: ReactNode }) => {
	return (
		<Base style={[style.default]} {...props}>
			{children}
		</Base>
	);
};
