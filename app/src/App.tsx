import { Pages } from "@pages/Pages.types";
import { PageNotFound } from "@pages/pageNotFound/PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GlobalStyle } from "@src/styles/globalStyles";
import { Theme } from "@src/theme/Theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageHome } from "./pages/pageHome/PageHome";
import { Device } from "./utils/Device";

import "dotenv/config";

const VITE_MODE = import.meta.env.VITE_MODE || "dev";
const VITE_GOOGLE_AUTH = import.meta.env.VITE_GOOGLE_AUTH || "";

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

						{VITE_MODE === "dev" && <ReactQueryDevtools initialIsOpen={false} />}
					</QueryClientProvider>
				</BrowserRouter>
			</I18nextProvider>
		</GoogleOAuthProvider>
	);
};
