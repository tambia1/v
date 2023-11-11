import { Pages } from "@pages/Pages.types";
import { PageNotFound } from "@pages/pageNotFound/PageNotFound";
import { PageHome } from "@src/pages/pageHome/PageHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Theme } from "@src/theme/Theme";
import { GlobalStyle } from "@src/styles/globalStyles";
import { Language } from "@src/language/Language";
import { I18nextProvider } from "react-i18next";
import { Suspense } from "react";
import i18n from "./locales/i18n";

export const App = () => {
	return (
		<Suspense fallback="...loading">
			<I18nextProvider i18n={i18n}>
				<BrowserRouter basename="/os">
					<GlobalStyle />
					<Theme>
						<Language>
							<Routes>
								<Route path={Pages.notFound} element={<PageNotFound />} />
								<Route path={Pages.home} element={<PageHome />} />
							</Routes>
						</Language>
					</Theme>
				</BrowserRouter>
			</I18nextProvider>
		</Suspense>
	);
};
