import { Pages } from "@pages/Pages.types";
import { PageNotFound } from "@pages/pageNotFound/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Theme } from "@src/theme/Theme";
import { GlobalStyle } from "@src/styles/globalStyles";
import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageHome } from "./pages/pageHome/PageHome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Device } from "./utils/Device";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "398139791252-ekovd5i9uemhcv5p9usduinvvah3uorq.apps.googleusercontent.com";

export const App = () => {
	const { i18n } = useTranslation();
	const queryClient = new QueryClient();

	useEffect(() => {
		Device.preventIosDoubleClickToZoom();
		Device.preventDesktopContextMenu();
		Device.preventDesktopRightClick();
	}, []);

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<I18nextProvider i18n={i18n}>
				<BrowserRouter basename="/v">
					<QueryClientProvider client={queryClient}>
						<GlobalStyle />
						<Theme>
							<Routes>
								<Route path={Pages.notFound} element={<PageNotFound />} />
								<Route path={Pages.home} element={<PageHome />} />
							</Routes>
						</Theme>
					</QueryClientProvider>
				</BrowserRouter>
			</I18nextProvider>
		</GoogleOAuthProvider>
	);
};
