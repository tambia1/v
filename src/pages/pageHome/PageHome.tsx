import { ReactNode, useEffect, useState } from "react";
import * as S from "./PageHome.styles";
import { useTheme } from "@src/theme/UseTheme";
import { version } from "@src/../package.json";
import { Icon } from "@src/icons/Icon";
import { themes } from "@src/theme/Theme.types";
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
import { ILanguage, languages } from "@src/locales/i18n.types";
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
	const [currentApp, setCurrentApp] = useState<ReactNode>(null);

	const { i18n } = useTranslation();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const language = (searchParams.get("language") || "") as ILanguage;

		if (languages.includes(language)) {
			i18n.changeLanguage(language);
		} else {
			searchParams.delete("language");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams]);

	const handleSetThemeLight = () => {
		setTheme(themes.dark);
	};

	const handleSetThemeDark = () => {
		setTheme(themes.light);
	};

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

	return (
		<S.PageHome>
			<S.Container>
				{currentApp}
				{!currentApp && apps.map((app) => <Button key={app.id} id={app.id} title={app.title} icon={app.icon} onClick={handleOnClickApplication} />)}
			</S.Container>

			<S.TabBar>
				<S.TabBarButton onClick={handleClose} $isVisible={!!currentApp}>
					<Icon iconName="iconCircle" size={theme.size.l} />
				</S.TabBarButton>

				<S.TabBarSeparator />

				<S.Version>{t(lang.home.version, { version: version })}</S.Version>
				<S.ThemeMode>{theme.themeName === "light" ? <Icon iconName="iconSun" onClick={handleSetThemeLight} /> : <Icon iconName="iconMoon" onClick={handleSetThemeDark} />}</S.ThemeMode>
			</S.TabBar>
		</S.PageHome>
	);
};
