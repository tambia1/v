import { ReactNode, useCallback, useState } from "react";
import * as S from "./Desktop.styles";
import { useThemeContext } from "@src/theme/UseThemeContext";
import { Icon } from "@src/icons/Icon";
import { ITheme, IThemeName, themes } from "@src/theme/Theme.types";
import { useLocalesSearchParams } from "@src/pages/pageHome/hooks/useLocalesSearchParams";
import { useThemesSearchParams } from "@src/pages/pageHome/hooks/useThemesSearchParams";
import { useSearchParams } from "react-router-dom";
import { useBarSearchParams } from "../../hooks/useBarSearchParams";
import { IAppId } from "./Desktop.types";
import { apps } from "./Desktop.consts";
import { Animate } from "@src/components/animate/Animate";
import { useAnimate } from "@src/components/animate/UseAnimate";
import { ILanguageName } from "@src/locales/i18n.types";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "../../apps/settings/page/components/theme/store/useThemeStore";
import { useStoreLogin } from "@src/pages/pageHome/apps/user/stores/StoreLogin";
import { QueryUser } from "@src/pages/pageHome/apps/user/queries/QueryUser";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { AppButton } from "./components/appButton/AppButton";
import { Suspension } from "@src/components/suspension/Suspension";
import { Promises } from "@src/services/Promises";
import { BarContext } from "./hooks/UseBar";

export const Desktop = () => {
	const { theme } = useThemeContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentApp, setCurrentApp] = useState<ReactNode>(null);
	const [bar, setBar] = useState<{ isReady: boolean; position: S.IBarPosition }>({ isReady: false, position: "top" });
	const [isVisibleButtonClose, setIsVisibleButtonClose] = useState(false);
	const animateApp = useAnimate("hide");
	const { setTheme } = useThemeContext();
	const { i18n } = useTranslation();
	const themeStore = useThemeStore();
	const [loadingAppId, setLoadingAppId] = useState("");

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

		const appComponent = (
			<Suspension
				onFallbackStart={() => {
					setLoadingAppId(app.id);
					isLoading = true;
				}}
				onEnd={async () => {
					if (isLoading) {
						const timeEnd = Date.now();
						await Promises.sleep(1500 - (timeEnd - timeStart));
					}

					setLoadingAppId("");
					animateApp.current.play("appear");
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
		await animateApp.current.play("disappear");
		setCurrentApp(null);
	};

	const handleOnClickChangeTheme = (themeName: IThemeName) => {
		setTheme(themes[themeName]);

		searchParams.set("theme", themeName);
		setSearchParams(searchParams, { replace: true });
	};

	return (
		<S.Container $barPosition={bar.position} $backgroundImageIndex={themeStore.backgroundImageIndex}>
			<BarContext.Provider value={{ onClickclose: handleOnClickClose }}>
				<S.Apps>
					<S.AppsContainer>
						<Animate useAnimate={animateApp}>{currentApp}</Animate>

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
				<S.IconClose onClick={handleOnClickClose} $isVisible={isVisibleButtonClose}>
					<Icon iconName="iconXCircle" size={theme.size.l} />
				</S.IconClose>

				<S.Username>
					{queryUser.data?.firstName ? (
						<S.Success>{queryUser.data?.firstName}</S.Success>
					) : (
						<S.Error>
							<T>{lang.home.guest}</T>
						</S.Error>
					)}
				</S.Username>

				<S.IconTheme>
					{theme.themeName === "light" ? <Icon iconName="iconSun" onClick={() => handleOnClickChangeTheme("dark")} /> : <Icon iconName="iconMoon" onClick={() => handleOnClickChangeTheme("light")} />}
				</S.IconTheme>
			</S.Bar>
		</S.Container>
	);
};
