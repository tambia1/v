import { Global } from "@emotion/react";
import { Pages } from "@pages/Pages.types";
import { PageNotFound } from "@pages/pageNotFound/PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { globalStyles } from "@src/styles/globalStyles";
import { ThemeProvider } from "@src/theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageHome } from "./pages/pageHome/PageHome";
import { Device } from "./utils/Device";

const ENV = import.meta.env.VITE_ENV || "dev";
const GOOGLE_AUTH = import.meta.env.VITE_GOOGLE_AUTH || "dev";

export const App = () => {
	const { i18n } = useTranslation();
	const queryClient = new QueryClient();

	useEffect(() => {
		Device.preventIosDoubleClickToZoom();
		Device.preventDesktopContextMenu();
		Device.preventDesktopRightClick();
	}, []);

	return (
		<GoogleOAuthProvider clientId={GOOGLE_AUTH}>
			<I18nextProvider i18n={i18n}>
				<BrowserRouter basename="/v">
					<QueryClientProvider client={queryClient}>
						<Global styles={globalStyles} />
						<ThemeProvider>
							<Routes>
								<Route path={Pages.notFound} element={<PageNotFound />} />
								<Route path={Pages.home} element={<PageHome />} />
							</Routes>
						</ThemeProvider>

						{ENV === "dev" && <ReactQueryDevtools initialIsOpen={false} />}
					</QueryClientProvider>
				</BrowserRouter>
			</I18nextProvider>
		</GoogleOAuthProvider>
	);
};
