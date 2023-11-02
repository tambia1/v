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

interface IApp {
	id: IAppId;
	title: string;
	icon: IAppIcon;
	component: React.ReactElement;
}

export type IAppId = "settings" | "calculator" | "camera" | "notes";

export const AppContainer = () => {
	const { lang } = useLanguage();
	const pager = usePager();
	const { theme, setTheme } = useTheme();
	const { all } = useLanguage();

	const handleOnChangeTheme = (switchState: SwitchState) => {
		setTheme(switchState === "left" ? themes.light : themes.dark);
	};

	const apps: IApp[] = [
		{ id: "settings", title: lang.settings.title, icon: "settings", component: <Settings /> },
		{ id: "notes", title: lang.notes.title, icon: "notes", component: <Notes /> },
		{ id: "calculator", title: lang.calculator.title, icon: "calculator", component: <Calculator /> },
		{ id: "camera", title: lang.camera.title, icon: "camera", component: <></> },
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
					<AppButton key={app.title} id={app.id} title={app.title} icon={app.icon} onClick={handleOnClickApplication} />
				))}
			</S.Container>

			<S.ThemeMode>
				<Icon iconName="sun" />
				<Switch onChange={handleOnChangeTheme} state={theme.themeName === "light" ? "left" : "right"} />
				<Icon iconName="moon" />
			</S.ThemeMode>

			<S.Version>{all.version.replace(/\{version\}/g, version)}</S.Version>
		</S.AppContainer>
	);
};