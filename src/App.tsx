import { Pages } from "@pages/Pages.types";
import { PageNotFound } from "@pages/pageNotFound/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Theme } from "@src/theme/Theme";
import { GlobalStyle } from "@src/styles/globalStyles";
import { I18nextProvider } from "react-i18next";
import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageHome } from "./pages/pageHome/PageHome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const App = () => {
	const { i18n } = useTranslation();
	const queryClient = new QueryClient();

	useEffect(() => {
		initSettings();
	}, []);

	return (
		<Suspense fallback="...loading">
			<I18nextProvider i18n={i18n}>
				<BrowserRouter basename="/os">
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
		</Suspense>
	);
};

let initSettings = function () {
	//prevent iOS double click zooming
	let lastTouchEnd = 0;
	document.addEventListener(
		"touchend",
		function (e) {
			let now = new Date().getTime();
			if (now - lastTouchEnd <= 300) {
				e.preventDefault();
			}
			lastTouchEnd = now;
		},
		false
	);

	//prevent iOS native behavior
	// document.addEventListener('touchmove', function(e){ e.preventDefault(); }, {capture: false, passive: false});

	//prevent right click button for desktop browsers
	document.addEventListener(
		"mousedown",
		function (e) {
			if (e.which > 1) {
				e.stopPropagation();
			}
		},
		true
	);

	//prevent context menu in desktop only
	let deviceType = typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("Mobile") !== -1 ? "Mobile" : "Desktop";

	if (deviceType == "Desktop") {
		document.body.onselectstart = function () {
			return false;
		};
		document.body.oncontextmenu = function () {
			return false;
		};
	}
};
