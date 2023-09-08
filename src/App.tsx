import { PageNotFound } from "@pages/pageNotFound/PageNotFound";
import { Pages } from "@pages/Pages.types";
import { PageHome } from "@src/pages/pageLogin/PageHome";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyles";
import { Theme, ThemeName, themes } from "./themes/Theme.types";

const themeName: ThemeName = import.meta.env.VITE_THEME || "themeLight";
const defaultTheme = themes[themeName];

export const ThemeUpdateContext = createContext<{ theme: Theme; setTheme: Dispatch<SetStateAction<Theme>> }>({ theme: defaultTheme, setTheme: () => {} });

export const App = () => {
	const [theme, setTheme] = useState(defaultTheme);

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<ThemeUpdateContext.Provider value={{ theme, setTheme }}>
				<BrowserRouter basename="/os">
					<Routes>
						<Route path={Pages.notFound} element={<PageNotFound />} />
						<Route path={Pages.home} element={<PageHome />} />
					</Routes>
				</BrowserRouter>
			</ThemeUpdateContext.Provider>
		</ThemeProvider>
	);
};
