import { ReactNode, useState } from "react";
import * as S from "./PageHome.styles";
import { useTheme } from "@src/theme/UseTheme";
import { version } from "@src/../package.json";
import { Icon } from "@src/icons/Icon";
import { IThemeName, themes } from "@src/theme/Theme.types";
import { IAppIcon } from "./components/button/Button.styles";
import { Button } from "./components/button/Button";
import { Notes } from "./apps/notes/Notes";
import { Calculator } from "./apps/calculator/Calculator";
import { Tetris } from "./apps/tetris/Tetris";
import { TestDropDown } from "./apps/testDropDown/TestDropDown";
import { TestTable } from "./apps/testTable/TestTable";
import { Settings } from "./apps/settings/Settings";
import { Test } from "./apps/test/Test";
import { useTranslation } from "react-i18next";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useLocalesSearchParams } from "@src/locales/useLocalesSearchParams";
import { useThemesSearchParams } from "@src/theme/useThemesSearchParams";
import { useSearchParams } from "react-router-dom";

interface IApp {
	id: IAppId;
	title: React.ReactNode;
	icon: IAppIcon;
	component: React.ReactElement;
}

export type IAppId = "settings" | "calculator" | "camera" | "notes" | "tetris" | "test" | "testDropDown" | "testTree" | "testTabs" | "testTable";

export const PageHome = () => {
	const { t } = useTranslation();

	const { theme, setTheme } = useTheme();
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentApp, setCurrentApp] = useState<ReactNode>(null);

	useLocalesSearchParams();
	useThemesSearchParams();

	const apps: IApp[] = [
		{ id: "settings", title: <T>{lang.settings.title}</T>, icon: "settings", component: <Settings /> },
		{ id: "notes", title: <T>{lang.notes.title}</T>, icon: "notes", component: <Notes /> },
		{ id: "calculator", title: <T>{lang.calculator.title}</T>, icon: "calculator", component: <Calculator /> },
		{ id: "camera", title: <T>{lang.camera.title}</T>, icon: "camera", component: <></> },
		{ id: "tetris", title: <T>{lang.tetris.title}</T>, icon: "tetris", component: <Tetris /> },
		{ id: "test", title: <T>{lang.test.title}</T>, icon: "weather", component: <Test /> },
		{ id: "testDropDown", title: <T>{lang.testDropDown.title}</T>, icon: "photos", component: <TestDropDown /> },
		{ id: "testTable", title: <T>{lang.testTable.title}</T>, icon: "photos", component: <TestTable /> },
	];

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
		<S.PageHome>
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
