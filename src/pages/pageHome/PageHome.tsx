import { ReactNode, useState } from "react";
import * as S from "./PageHome.styles";
import { useTheme } from "@src/theme/UseTheme";
import { version } from "@src/../package.json";
import { Icon } from "@src/icons/Icon";
import { IThemeName, themes } from "@src/theme/Theme.types";
import { Button } from "./components/button/Button";
import { useTranslation } from "react-i18next";
import { lang } from "@src/locales/i18n";
import { useLocalesSearchParams } from "@src/locales/useLocalesSearchParams";
import { useThemesSearchParams } from "@src/theme/useThemesSearchParams";
import { useSearchParams } from "react-router-dom";
import { usePageBarSearchParams } from "./usePageBarSearchParams";
import { IAppId } from "./PageHome.types";
import { apps } from "./PageHome.consts";

export const PageHome = () => {
	const { t } = useTranslation();
	const { theme, setTheme } = useTheme();
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentApp, setCurrentApp] = useState<ReactNode>(null);
	const [pageBarPosition, setPageBarPosition] = useState<S.IPageBarPosition>("bottom");

	useLocalesSearchParams();
	useThemesSearchParams();
	usePageBarSearchParams({
		setPagePosition: (pageBarPosition: S.IPageBarPosition) => {
			setPageBarPosition(pageBarPosition);

			searchParams.set("bar", pageBarPosition);
			setSearchParams(searchParams, { replace: true });
		},
	});

	const handleOnClickApplication = (appId: IAppId) => {
		const app = apps.find((app) => app.id === appId)!;

		setCurrentApp(app.component);
	};

	const handleClose = () => {
		setCurrentApp(null);
	};

	const handleOnClickChangeTheme = (themeName: IThemeName) => {
		setTheme(themes[themeName]);

		searchParams.set("theme", themeName);
		setSearchParams(searchParams, { replace: true });
	};

	return (
		<S.PageHome $pageBarPosition={pageBarPosition}>
			<S.Apps>
				{currentApp}
				{!currentApp && apps.map((app) => <Button key={app.id} id={app.id} title={app.title} icon={app.icon} onClick={handleOnClickApplication} />)}
			</S.Apps>

			<S.PageBar>
				<S.PageBarButton onClick={handleClose} $isVisible={!!currentApp}>
					<Icon iconName="iconXCircle" size={theme.size.l} />
				</S.PageBarButton>

				<S.PageBarSeparator />

				<S.Version>{t(lang.home.version, { version })}</S.Version>
				<S.ThemeMode>
					{theme.themeName === "light" ? (
						<Icon
							iconName="iconSun"
							onClick={() => {
								handleOnClickChangeTheme("dark");
							}}
						/>
					) : (
						<Icon
							iconName="iconMoon"
							onClick={() => {
								handleOnClickChangeTheme("light");
							}}
						/>
					)}
				</S.ThemeMode>
			</S.PageBar>
		</S.PageHome>
	);
};
