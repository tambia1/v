import { ThemeName, themes } from "@src/themes/Theme.types";
import { ReactNode, useState } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "./hooks/UseTheme";

const themeName: ThemeName = import.meta.env.VITE_THEME || "light";
const defaultTheme = themes[themeName];

interface Props {
	children: ReactNode;
}

export const Theme = ({ children }: Props) => {
	const [theme, setTheme] = useState(defaultTheme);

	return (
		<ThemeProvider theme={theme}>
			<ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
		</ThemeProvider>
	);
};
