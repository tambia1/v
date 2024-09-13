import { ErrorInfo, ReactNode, useCallback, useRef, useState } from "react";
import * as S from "./Desktop.styles";
import { useThemeContext } from "@src/theme/UseThemeContext";
import { ITheme, themes } from "@src/theme/Theme.types";
import { useLocalesSearchParams } from "@src/pages/pageHome/hooks/useLocalesSearchParams";
import { useThemesSearchParams } from "@src/pages/pageHome/hooks/useThemesSearchParams";
import { useSearchParams } from "react-router-dom";
import { useBarSearchParams } from "../../hooks/useBarSearchParams";
import { IApp, apps } from "./Desktop.apps";
import { ILanguageName } from "@src/locales/i18n.types";
import { useTranslation } from "react-i18next";
import { ThemeStore } from "@src/pages/pageHome/components/desktop/apps/settings/components/page/components/theme/store/ThemeStore";
import { useStoreLogin } from "@apps/user/stores/StoreLogin";
import { QueryUser } from "@apps/user/queries/QueryUser";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { AppButton } from "./components/appButton/AppButton";
import { Suspension } from "@src/components/suspension/Suspension";
import { Promises } from "@src/services/Promises";
import { BarMainContext } from "./hooks/UseBarMain";
import { BarMain } from "./components/barMain/BarMain";
import { useAnimation } from "@src/hooks/UseAnimation";
import { Modal } from "@src/components/modal/Modal";
import { Pager } from "@src/components/pager/Pager";
import { getExternalApps, removeAppsNotFittingByRoles as getAppsByRoles } from "./Desktop.utils";
import { BarDoneCancel } from "./components/barDoneCancel/BarDoneCancel";
import { StoreApps } from "./stores/StoreApps";

export const Desktop = () => {
	const { t } = useTranslation();
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentApp, setCurrentApp] = useState<ReactNode>(null);
	const [bar, setBar] = useState<{ isReady: boolean; position: S.IBarPosition }>({ isReady: false, position: "top" });
	const [isVisibleButtonClose, setIsVisibleButtonClose] = useState(false);
	const { setTheme } = useThemeContext();
	const { i18n } = useTranslation();
	const themeStore = ThemeStore();
	const [loadingAppId, setLoadingAppId] = useState("");
	const refApp = useRef(null);
	const animationApp = useAnimation(refApp);
	const [isErrorLoadingComponent, setIsErrorLoadingComponent] = useState(false);
	const [isShakeMode, setIsShakeMode] = useState(false);

	const storeLogin = useStoreLogin();
	const queryUser = QueryUser.queryUser({ token: storeLogin.token }, { enabled: !!storeLogin.token });

	const storeApps = StoreApps();
	const externalApps = getExternalApps(storeApps.apps);

	const allApps: IApp[][] = [...apps, externalApps];
	const appsByRole = getAppsByRoles(allApps, storeLogin.role);

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

	const handleOnClickApplication = (appId: string) => {
		if (isShakeMode) {
			return;
		}

		const app = allApps.flat().find((app) => app.id === appId)!;
		const timeStart = Date.now();
		let isLoading = false;

		const appComponent = (
			<Suspension
				onStart={async () => {
					isLoading = false;
					await animationApp.play("hide");
				}}
				onFallbackStart={() => {
					setLoadingAppId(app.id);
					isLoading = true;
				}}
				onEnd={async () => {
					if (isLoading) {
						await Promises.sleep(1500 - (Date.now() - timeStart));
					}

					setLoadingAppId("");
					isLoading = false;

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

	const handleOnClickTheme = (themeName: ITheme["themeName"]) => {
		setTheme(themes[themeName]);

		searchParams.set("theme", themeName);
		setSearchParams(searchParams, { replace: true });
	};

	const handleLoadingError = () => {
		handleOnClickClose();
		setIsErrorLoadingComponent(false);
	};

	const handleLongPressApplication = () => {
		setIsShakeMode(true);
	};

	const handleOnClickDone = () => {
		setIsShakeMode(false);
	};

	return (
		<S.Container $barPosition={bar.position} $backgroundImageIndex={themeStore.backgroundImageIndex}>
			<BarMainContext.Provider value={{ onClickClose: handleOnClickClose }}>
				<S.Apps>
					<S.AppsContainer>
						<S.AppContainer ref={refApp}>{currentApp && <S.App>{currentApp}</S.App>}</S.AppContainer>

						<Pager onChange={(_pageIndex) => {}}>
							{appsByRole.map((appsGroup, i) => {
								return (
									<S.AppGroup key={i}>
										{appsGroup.map((app) => {
											return (
												<AppButton
													key={app.id}
													id={app.id}
													title={app.title}
													icon={app.icon}
													onClick={handleOnClickApplication}
													onLongPress={handleLongPressApplication}
													isLoading={app.id === loadingAppId}
													isShakeMode={isShakeMode}
												/>
											);
										})}
									</S.AppGroup>
								);
							})}
						</Pager>
					</S.AppsContainer>
				</S.Apps>
			</BarMainContext.Provider>

			<S.Bar>
				<BarMain
					barPosition={bar.position}
					userName={queryUser.data?.firstName ? queryUser.data.firstName : <T>{lang.home.guest}</T>}
					userNameType={queryUser.data?.firstName ? "success" : "error"}
					onClickButtonTheme={handleOnClickTheme}
					onClickButtonClose={handleOnClickClose}
					isVisibleButtonClose={isVisibleButtonClose}
				/>

				{isShakeMode && <BarDoneCancel showDone={isShakeMode} onClickDone={handleOnClickDone} />}
			</S.Bar>

			<Modal
				isVisible={isErrorLoadingComponent}
				iconName="info"
				text={t(lang.all.error)}
				onClickBackground={handleLoadingError}
				buttons={[
					{
						content: t(lang.all.ok),
						onClick: handleLoadingError,
					},
				]}
			/>
		</S.Container>
	);
};
