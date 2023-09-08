import { ITheme, ThemeName, themes } from "@src/themes/Theme.types";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { ThemeProvider } from "styled-components";

const themeName: ThemeName = import.meta.env.VITE_THEME || "themeLight";
const defaultTheme = themes[themeName];

export const ThemeContext = createContext<{ theme: ITheme; setTheme: Dispatch<SetStateAction<ITheme>> }>({ theme: defaultTheme, setTheme: () => {} });

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

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("Theme must be rendered as a child of Theme component");
	}

	return context;
};
