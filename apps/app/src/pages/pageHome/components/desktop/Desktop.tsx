import { ErrorInfo, ReactNode, useCallback, useRef, useState } from "react";
import * as S from "./Desktop.styles";
import { useThemeContext } from "@src/theme/UseThemeContext";
import { ITheme, IThemeName, themes } from "@src/theme/Theme.types";
import { useLocalesSearchParams } from "@src/pages/pageHome/hooks/useLocalesSearchParams";
import { useThemesSearchParams } from "@src/pages/pageHome/hooks/useThemesSearchParams";
import { useSearchParams } from "react-router-dom";
import { useBarSearchParams } from "../../hooks/useBarSearchParams";
import { IAppId } from "./Desktop.types";
import { apps } from "./Desktop.apps";
import { ILanguageName } from "@src/locales/i18n.types";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@apps/settings/page/components/theme/store/useThemeStore";
import { useStoreLogin } from "@apps/user/stores/StoreLogin";
import { QueryUser } from "@apps/user/queries/QueryUser";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { AppButton } from "./components/appButton/AppButton";
import { Suspension } from "@src/components/suspension/Suspension";
import { Promises } from "@src/services/Promises";
import { BarContext } from "./hooks/UseBar";
import { Bar } from "./components/bar/Bar";
import { useAnimation } from "@src/hooks/UseAnimation";
import { Modal } from "@src/components/modal/Modal";

export const Desktop = () => {
	const { t } = useTranslation();
	const { theme } = useThemeContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentApp, setCurrentApp] = useState<ReactNode>(null);
	const [bar, setBar] = useState<{ isReady: boolean; position: S.IBarPosition }>({ isReady: false, position: "top" });
	const [isVisibleButtonClose, setIsVisibleButtonClose] = useState(false);
	const { setTheme } = useThemeContext();
	const { i18n } = useTranslation();
	const themeStore = useThemeStore();
	const [loadingAppId, setLoadingAppId] = useState("");
	const refApp = useRef(null);
	const animationApp = useAnimation(refApp);
	const [isErrorLoadingComponent, setIsErrorLoadingComponent] = useState(false);

	const storeLogin = useStoreLogin();
	const queryUser = QueryUser.queryUser({ token: storeLogin.token }, { enabled: !!storeLogin.token });

	useLocalesSearchParams({
		onChange: useCallback((language: ILanguageName) => {
			i18n.changeLanguage(language);
		}, []),
	});

	useThemesSearchParams({
		onChange: useCallback((themeName: ITheme["themeName"]) => {
			setTheme(themes[themeName]);
		}, []),
	});

	useBarSearchParams({
		onChange: useCallback((barPosition: S.IBarPosition) => {
			setBar({ isReady: true, position: barPosition });
		}, []),
	});

	const handleOnClickApplication = (appId: IAppId) => {
		const app = apps.find((app) => app.id === appId)!;

		const timeStart = Date.now();
		let isLoading = false;

		console.log("appComponent");

		const appComponent = (
			<Suspension
				onFallbackStart={() => {
					setLoadingAppId(app.id);
					isLoading = true;
				}}
				onFallbackEnd={() => {
					setLoadingAppId(app.id);
					isLoading = true;
				}}
				onEnd={async () => {
					if (isLoading) {
						const timeEnd = Date.now();
						await Promises.sleep(1500 - (timeEnd - timeStart));
					}

					setLoadingAppId("");

					await animationApp.play("hide");
					await animationApp.play("appear");
				}}
				onError={(_error: Error, _errorInfo: ErrorInfo) => {
					setLoadingAppId("");
					setIsErrorLoadingComponent(true);
				}}
			>
				{app.component}
			</Suspension>
		);

		setCurrentApp(appComponent);
		setIsVisibleButtonClose(true);
	};

	const handleOnClickClose = async () => {
		setIsVisibleButtonClose(false);
		await animationApp.play("disappear");
		setCurrentApp(null);
	};

	const handleOnClickChangeTheme = (themeName: IThemeName) => {
		setTheme(themes[themeName]);

		searchParams.set("theme", themeName);
		setSearchParams(searchParams, { replace: true });
	};

	const handleLoadingError = () => {
		handleOnClickClose();
		setIsErrorLoadingComponent(false);
	};

	return (
		<S.Container $barPosition={bar.position} $backgroundImageIndex={themeStore.backgroundImageIndex}>
			<BarContext.Provider value={{ onClickclose: handleOnClickClose }}>
				<S.Apps>
					<S.AppsContainer>
						<S.AppContainer ref={refApp}>{currentApp && <S.App>{currentApp}</S.App>}</S.AppContainer>

						{apps.map((app) => {
							if (app.roles.includes(storeLogin.role)) {
								return <AppButton key={app.id} id={app.id} title={app.title} icon={app.icon} onClick={handleOnClickApplication} isLoading={app.id === loadingAppId} />;
							}

							return null;
						})}
					</S.AppsContainer>
				</S.Apps>
			</BarContext.Provider>

			<S.Bar>
				<Bar
					theme={theme}
					userName={queryUser.data?.firstName ? queryUser.data.firstName : <T>{lang.home.guest}</T>}
					userNameType={queryUser.data?.firstName ? "success" : "error"}
					onClickButtonClose={handleOnClickClose}
					isVisibleButtonClose={isVisibleButtonClose}
					onClickButtonTheme={handleOnClickChangeTheme}
				/>
			</S.Bar>

			<Modal
				isVisible={isErrorLoadingComponent}
				iconName="info"
				text={t(lang.misc.error)}
				onClickBackground={handleLoadingError}
				buttonContentA={t(lang.misc.ok)}
				buttonCallbackA={handleLoadingError}
			></Modal>
		</S.Container>
	);
};