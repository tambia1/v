import { ReactNode, useState } from "react";
import * as S from "./PageHome.styles";
import { useLanguage } from "@src/language/UseLanguage";
import { useTheme } from "@src/theme/UseTheme";
import { version } from "@src/../package.json";
import { Icon } from "@src/icons/Icon";
import { themes } from "@src/theme/Theme.types";
import { Lang } from "@src/language/Lang";
import { IAppIcon } from "./components/button/Button.styles";
import { Button } from "./components/button/Button";
import { Notes } from "./apps/notes/Notes";
import { Calculator } from "./apps/calculator/Calculator";
import { Tetris } from "./apps/tetris/Tetris";
import { TestDropDown } from "./apps/testDropDown/TestDropDown";
import { TestTable } from "./apps/testTable/TestTable";
import { Settings } from "./apps/settings/Settings";
import { Test } from "./apps/test/Test";

interface IApp {
	id: IAppId;
	title: React.ReactNode;
	icon: IAppIcon;
	component: React.ReactElement;
}

export type IAppId = "settings" | "calculator" | "camera" | "notes" | "tetris" | "test" | "testDropDown" | "testTree" | "testTabs" | "testTable";

export const PageHome = () => {
	const { lang } = useLanguage();
	const { theme, setTheme } = useTheme();
	const [currentApp, setCurrentApp] = useState<ReactNode>(null);

	const handleSetThemeLight = () => {
		setTheme(themes.dark);
	};

	const handleSetThemeDark = () => {
		setTheme(themes.light);
	};

	const apps: IApp[] = [
		{ id: "settings", title: <Lang>{lang.settings.title}</Lang>, icon: "settings", component: <Settings /> },
		{ id: "notes", title: <Lang>{lang.notes.title}</Lang>, icon: "notes", component: <Notes /> },
		{ id: "calculator", title: <Lang>{lang.calculator.title}</Lang>, icon: "calculator", component: <Calculator /> },
		{ id: "camera", title: <Lang>{lang.camera.title}</Lang>, icon: "camera", component: <></> },
		{ id: "tetris", title: <Lang>{lang.tetris.title}</Lang>, icon: "tetris", component: <Tetris /> },
		{ id: "test", title: <Lang>{lang.test.title}</Lang>, icon: "weather", component: <Test /> },
		{ id: "testDropDown", title: <Lang>{lang.testDropDown.title}</Lang>, icon: "photos", component: <TestDropDown /> },
		{ id: "testTable", title: <Lang>{lang.testTable.title}</Lang>, icon: "photos", component: <TestTable /> },
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

				<S.Version>
					<Lang replacer={(str: string) => str.replace(/\{version\}/g, version)}>{lang.home.version}</Lang>
				</S.Version>

				<S.ThemeMode>{theme.themeName === "light" ? <Icon iconName="iconSun" onClick={handleSetThemeLight} /> : <Icon iconName="iconMoon" onClick={handleSetThemeDark} />}</S.ThemeMode>
			</S.TabBar>
		</S.PageHome>
	);
};
