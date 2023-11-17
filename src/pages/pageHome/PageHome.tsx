import { ReactNode, useState } from "react";
import * as S from "./PageHome.styles";
import { useTheme } from "@src/theme/UseTheme";
import { Icon } from "@src/icons/Icon";
import { IThemeName } from "@src/theme/Theme.types";
import { Button } from "./components/button/Button";
import { useLocalesSearchParams } from "@src/locales/useLocalesSearchParams";
import { useThemesSearchParams } from "@src/theme/useThemesSearchParams";
import { useSearchParams } from "react-router-dom";
import { usePageBarSearchParams } from "./usePageBarSearchParams";
import { IAppId } from "./PageHome.types";
import { apps } from "./PageHome.consts";

export const PageHome = () => {
	const { theme } = useTheme();
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentApp, setCurrentApp] = useState<ReactNode>(null);
	const [pageBarPosition, setPageBarPosition] = useState<S.IPageBarPosition>("bottom");

	useLocalesSearchParams();
	useThemesSearchParams();
	usePageBarSearchParams({
		onChange: (pageBarPosition: S.IPageBarPosition) => {
			setPageBarPosition(pageBarPosition);
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
				<S.IconClose onClick={handleClose} $isVisible={!!currentApp}>
					<Icon iconName="iconXCircle" size={theme.size.l} />
				</S.IconClose>

				<S.IconTheme>
					{theme.themeName === "light" ? <Icon iconName="iconSun" onClick={() => handleOnClickChangeTheme("dark")} /> : <Icon iconName="iconMoon" onClick={() => handleOnClickChangeTheme("light")} />}
				</S.IconTheme>
			</S.PageBar>
		</S.PageHome>
	);
};
