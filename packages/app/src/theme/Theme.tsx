import { ITheme, themes } from "@src/theme/Theme.types";
import { ReactNode, useState } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "./UseThemeContext";

const themeName: ITheme["themeName"] = import.meta.env.VITE_THEME || "light";
const defaultTheme = themes[themeName];

interface Props {
	children: ReactNode;
}

export const Theme = ({ children }: Props) => {
	const [theme, setCurrentTheme] = useState(defaultTheme);

	const setTheme = (theme: ITheme) => {
		setCurrentTheme(theme);
	};

	return (
		<ThemeProvider theme={theme}>
			<ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
		</ThemeProvider>
	);
};
