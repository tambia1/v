import { type Theme, themes } from "@src/theme/Theme.types";
import { type ReactNode, useState } from "react";
import { ThemeProvider as ThemeProviderDtyledComponents } from "styled-components";
import { ThemeContext } from "./UseThemeContext";

const themeName: Theme["themeName"] = import.meta.env.THEME || "light";
const defaultTheme = themes[themeName];

type Props = {
	children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
	const [theme, setCurrentTheme] = useState(defaultTheme);

	const setTheme = (theme: Theme) => {
		setCurrentTheme(theme);
	};

	return (
		<ThemeProviderDtyledComponents theme={theme}>
			<ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>
		</ThemeProviderDtyledComponents>
	);
};
