import { Pages } from "@pages/Pages.types";
import { PageNotFound } from "@pages/pageNotFound/PageNotFound";
import { PageHome } from "@src/pages/pageHome/PageHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Theme } from "./components/theme/Theme";
import { GlobalStyle } from "./styles/globalStyles";

export const App = () => {
	return (
		<BrowserRouter basename="/os">
			<GlobalStyle />
			<Theme>
				<Routes>
					<Route path={Pages.notFound} element={<PageNotFound />} />
					<Route path={Pages.home} element={<PageHome />} />
				</Routes>
			</Theme>
		</BrowserRouter>
	);
};
