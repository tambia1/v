import { ReactNode, useEffect, useState } from "react";
import * as S from "./PageHome.styles";
import { useThemeContext } from "@src/theme/UseThemeContext";
import { Icon } from "@src/icons/Icon";
import { ITheme, IThemeName, themes } from "@src/theme/Theme.types";
import { Button } from "./components/button/Button";
import { useLocalesSearchParams } from "@src/pages/pageHome/hooks/useLocalesSearchParams";
import { useThemesSearchParams } from "@src/pages/pageHome/hooks/useThemesSearchParams";
import { useSearchParams } from "react-router-dom";
import { useBarSearchParams } from "./hooks/useBarSearchParams";
import { IAppId } from "./PageHome.types";
import { apps } from "./PageHome.consts";
import { Animate } from "@src/components/animate/Animate";
import { useAnimate } from "@src/components/animate/UseAnimate";
import { ILanguageName } from "@src/locales/i18n.types";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "./apps/settings/page/components/theme/store/useThemeStore";
import { version } from "@src/../package.json";
import { Files } from "@src/services/Files";
import { Icons } from "@src/icons/Icon.types";

export const PageHome = () => {
	const { theme } = useThemeContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentApp, setCurrentApp] = useState<ReactNode>(null);
	const [bar, setBar] = useState<{ isReady: boolean; position: S.IBarPosition }>({ isReady: false, position: "bottom" });
	const [isVisibleButtonClose, setIsVisibleButtonClose] = useState(false);
	const animateApp = useAnimate("hide");
	const { setTheme } = useThemeContext();
	const { i18n } = useTranslation();
	const themeStore = useThemeStore();

	useLocalesSearchParams({
		onChange: (language: ILanguageName) => {
			i18n.changeLanguage(language);
		},
	});

	useThemesSearchParams({
		onChange: (themeName: ITheme["themeName"]) => {
			setTheme(themes[themeName]);
		},
	});

	useBarSearchParams({
		onChange: (barPosition: S.IBarPosition) => {
			setBar({ isReady: true, position: barPosition });
		},
	});

	const handleOnClickApplication = (appId: IAppId) => {
		const app = apps.find((app) => app.id === appId)!;
		setCurrentApp(app.component);
		setIsVisibleButtonClose(true);
		animateApp.current.play("appear");
	};

	const handleOnClickClose = () => {
		setIsVisibleButtonClose(false);
		animateApp.current.play("disappear").then(() => {
			setCurrentApp(null);
		});
	};

	const handleOnClickChangeTheme = (themeName: IThemeName) => {
		searchParams.set("theme", themeName);
		setSearchParams(searchParams, { replace: true });
	};

	useEffect(() => {
		Files.download(
			Object.values(Icons),
			(props) => {
				console.log("progress", props.progress);
			},
			(props) => {
				console.log("finish", props.errors);
			}
		);
	}, []);

	return (
		<S.PageHome $barPosition={bar.position} $backgroundImage={themeStore.backgroundImage}>
			<S.Apps>
				<Animate useAnimate={animateApp}>{currentApp}</Animate>

				{apps.map((app) => (
					<Button key={app.id} id={app.id} title={app.title} icon={app.icon} onClick={handleOnClickApplication} />
				))}
			</S.Apps>

			<S.Bar>
				<S.IconClose onClick={handleOnClickClose} $isVisible={isVisibleButtonClose}>
					<Icon iconName="iconXCircle" size={theme.size.l} />
				</S.IconClose>

				<S.IconTheme>
					{theme.themeName === "light" ? <Icon iconName="iconSun" onClick={() => handleOnClickChangeTheme("dark")} /> : <Icon iconName="iconMoon" onClick={() => handleOnClickChangeTheme("light")} />}
				</S.IconTheme>

				<S.Version>{version}</S.Version>
			</S.Bar>
		</S.PageHome>
	);
};
