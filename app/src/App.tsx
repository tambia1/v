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
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const VITE_GOOGLE_AUTH = (import.meta.env.VITE_GOOGLE_AUTH || "") as string;

export const App = () => {
	const { i18n } = useTranslation();
	const queryClient = new QueryClient();

	useEffect(() => {
		Device.preventIosDoubleClickToZoom();
		Device.preventDesktopContextMenu();
		Device.preventDesktopRightClick();
	}, []);

	return (
		<GoogleOAuthProvider clientId={VITE_GOOGLE_AUTH}>
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

						<ReactQueryDevtools initialIsOpen={false} />
					</QueryClientProvider>
				</BrowserRouter>
			</I18nextProvider>
		</GoogleOAuthProvider>
	);
};
