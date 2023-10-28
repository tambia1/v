import { Pages } from "@pages/Pages.types";
import { PageNotFound } from "@pages/pageNotFound/PageNotFound";
import { PageHome } from "@src/pages/pageHome/PageHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Theme } from "@src/theme/Theme";
import { GlobalStyle } from "@src/styles/globalStyles";
import { Language } from "@src/language/Language";
import { PageSettings } from "./pages/pageSettings/PageSettings";

export const App = () => {
	return (
		<BrowserRouter basename="/os">
			<GlobalStyle />
			<Theme>
				<Language>
					<Routes>
						<Route path={Pages.notFound} element={<PageNotFound />} />
						<Route path={Pages.home} element={<PageHome />} />
						<Route path={Pages.settings} element={<PageSettings />} />
					</Routes>
				</Language>
			</Theme>
		</BrowserRouter>
	);
};
