import { PageHome } from "@pages/pageHome/PageHome";
import { PageLogin } from "@pages/pageLogin/PageLogin";
import { PageNotFound } from "@pages/pageNotFound/PageNotFound";
import { Pages } from "@pages/Pages.types";
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
				<BrowserRouter>
					<Routes>
						<Route path={Pages.notFound} element={<PageNotFound />} />
						<Route path={Pages.login} element={<PageLogin />} />
						<Route path={Pages.home.dataCenter} element={<PageHome pageKey={Pages.home.dataCenter} />} />
						<Route path={Pages.home.themes} element={<PageHome pageKey={Pages.home.themes} />} />
						<Route path={Pages.home.about} element={<PageHome pageKey={Pages.home.about} />} />
					</Routes>
				</BrowserRouter>
			</ThemeUpdateContext.Provider>
		</ThemeProvider>
	);
};
