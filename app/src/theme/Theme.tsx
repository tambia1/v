import { type ITheme, themes } from "@src/theme/Theme.types";
import { type ReactNode, useState } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "./UseThemeContext";

const themeName: ITheme["themeName"] = import.meta.env.THEME || "light";
const defaultTheme = themes[themeName];

type Props = {
	children: ReactNode;
};

export const Theme = ({ children }: Props) => {
	const [theme, setCurrentTheme] = useState(defaultTheme);

	const setTheme = (theme: ITheme) => {
		setCurrentTheme(theme);
	};

	return (
		<ThemeProvider theme={theme}>
			<ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>
		</ThemeProvider>
	);
};
