import { ITheme, ThemeName, isThemeName as isThemeNameOk, themes } from "@src/themes/Theme.types";
import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "./hooks/UseTheme";
import { useSearchParams } from "react-router-dom";

const themeName: ThemeName = import.meta.env.VITE_THEME || "light";
const defaultTheme = themes[themeName];

interface Props {
	children: ReactNode;
}

export const Theme = ({ children }: Props) => {
	const [theme, setCurrentTheme] = useState(defaultTheme);
	const [searchParams, setSearchParams] = useSearchParams();

	const setTheme = (theme: ITheme) => {
		setCurrentTheme(theme);
		searchParams.set("theme", theme.themeName);
		setSearchParams(searchParams, { replace: true });
	};

	useEffect(() => {
		const themNameFromSearchParams = searchParams.get("theme") || "";

		if (isThemeNameOk(themNameFromSearchParams)) {
			setCurrentTheme(themes[themNameFromSearchParams]);
		} else {
			searchParams.delete("theme");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams]);

	return (
		<ThemeProvider theme={theme}>
			<ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
		</ThemeProvider>
	);
};
