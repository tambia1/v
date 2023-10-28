import { ITheme, themes } from "@src/theme/Theme.types";
import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "./UseTheme";
import { useSearchParams } from "react-router-dom";

const themeName: ITheme["themeName"] = import.meta.env.VITE_THEME || "light";
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
		const themNameParam = searchParams.get("theme") || "";

		if (themNameParam === themes.light.themeName || themNameParam === themes.dark.themeName) {
			setCurrentTheme(themes[themNameParam]);
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
