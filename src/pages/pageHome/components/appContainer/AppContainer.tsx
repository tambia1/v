import * as S from "./AppContainer.styles";
import { useLanguage } from "@src/language/UseLanguage";
import { IAppIcon } from "./components/appButton/AppButton.styles";
import { AppButton } from "./components/appButton/AppButton";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { Pager } from "@src/components/pager/Pager";
import { useTheme } from "@src/theme/UseTheme";
import { SwitchState } from "@src/components/switch/Switch.styles";
import { version } from "@src/../package.json";
import { Icon } from "@src/icons/Icon";
import { Switch } from "@src/components/switch/Switch";
import { themes } from "@src/theme/Theme.types";
import { Settings } from "../apps/settings/Settings";
import { Notes } from "../apps/notes/Notes";
import { Calculator } from "../apps/calculator/Calculator";
import { TestDropDown } from "../apps/testDropDown/TestDropDown";
import { Tetris } from "../apps/tetris/Tetris";
import { TestTable } from "../apps/testTable/TestTable";

interface IApp {
	id: IAppId;
	title: string;
	icon: IAppIcon;
	component: React.ReactElement;
}

export type IAppId = "settings" | "calculator" | "camera" | "notes" | "tetris" | "test" | "testDropDown" | "testTree" | "testTabs" | "testTable";

export const AppContainer = () => {
	const { lang } = useLanguage();
	const pager = usePager();
	const { theme, setTheme } = useTheme();
	const { all } = useLanguage();

	const handleOnChangeTheme = (switchState: SwitchState) => {
		setTheme(switchState === "left" ? themes.light : themes.dark);
	};

	const handleSetThemeLight = () => {
		setTheme(themes.light);
	};

	const handleSetThemeDark = () => {
		setTheme(themes.dark);
	};

	const apps: IApp[] = [
		{ id: "settings", title: lang.settings.title, icon: "settings", component: <Settings /> },
		{ id: "notes", title: lang.notes.title, icon: "notes", component: <Notes /> },
		{ id: "calculator", title: lang.calculator.title, icon: "calculator", component: <Calculator /> },
		{ id: "camera", title: lang.camera.title, icon: "camera", component: <></> },
		{ id: "tetris", title: lang.tetris.title, icon: "tetris", component: <Tetris /> },
		{ id: "test", title: lang.test.title, icon: "weather", component: <></> },
		{ id: "testDropDown", title: lang.testDropDown.title, icon: "photos", component: <TestDropDown /> },
		{ id: "testTable", title: lang.testTable.title, icon: "photos", component: <TestTable /> },
	];

	const handleOnClickApplication = (appId: IAppId) => {
		const app = apps.find((app) => app.id === appId)!;

		pager.pushPage(
			<Pager.Page id={app.id} title={app.title}>
				{app.component}
			</Pager.Page>
		);
	};

	return (
		<S.AppContainer>
			<S.Container>
				{apps.map((app) => (
					<AppButton key={app.id} id={app.id} title={app.title} icon={app.icon} onClick={handleOnClickApplication} />
				))}
			</S.Container>

			<S.ThemeMode>
				<Icon iconName="iconSun" onClick={handleSetThemeLight} />
				<Switch onChange={handleOnChangeTheme} state={theme.themeName === "light" ? "left" : "right"} />
				<Icon iconName="iconMoon" onClick={handleSetThemeDark} />
			</S.ThemeMode>

			<S.Version>{all.version.replace(/\{version\}/g, version)}</S.Version>
		</S.AppContainer>
	);
};
