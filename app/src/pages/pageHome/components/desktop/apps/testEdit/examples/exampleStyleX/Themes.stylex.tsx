import { useThemeContext } from "@src/theme/UseThemeContext";
import * as stylex from "@stylexjs/stylex";
import { CompiledStyles } from "@stylexjs/stylex/lib/StyleXTypes";
import { ElementType, ReactNode } from "react";

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

type Props<T extends ElementType> = {
	as?: T;
	children: ReactNode;
	style?: CompiledStyles | CompiledStyles[];
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
