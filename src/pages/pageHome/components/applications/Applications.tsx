import * as S from "./Applications.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { ApplicationButton } from "./components/applicationButton/ApplicationButton";
import { version } from "@src/../package.json";
import { Icon } from "@src/components/icon/Icon";
import { Switch } from "@src/components/switch/Switch";
import { useTheme } from "@src/theme/hooks/UseTheme";
import { themes } from "@src/theme/Theme.types";
import { SwitchState } from "@src/components/switch/Switch.styles";
import { useLanguage } from "@src/language/hooks/UseLanguage";
import { ApplicationContainer } from "./components/applicationContainer/ApplicationContainer";
import { Pager } from "@src/components/pager/Pager";
import { Settings } from "./components/settings/Settings";
import { ReactElement } from "react";
import { IAppIcon } from "./components/applicationButton/ApplicationButton.styles";

interface IApp {
	id: IAppId;
	title: string;
	icon: IAppIcon;
	component: ReactElement;
}

export type IAppId = "settings" | "calculator" | "camera" | "notes";

export const Applications = () => {
	const pager = usePager();

	const { theme, setTheme } = useTheme();
	const { all, language } = useLanguage();

	const apps: IApp[] = [
		{ id: "settings", title: language.settings.title, icon: "settings", component: <Settings /> },
		{ id: "calculator", title: language.calculator.title, icon: "calculator", component: <></> },
		{ id: "camera", title: language.camera.title, icon: "camera", component: <></> },
		{ id: "notes", title: language.notes.title, icon: "notes", component: <></> },
	];

	const handleOnChangeTheme = (switchState: SwitchState) => {
		setTheme(switchState === "left" ? themes.light : themes.dark);
	};

	const handleOnClickApplication = (appId: IAppId) => {
		const app = apps.find((app) => app.id === appId)!;

		pager.pushPage(
			<Pager.Page id={appId} title={`Application`}>
				<ApplicationContainer appId={appId} appTitle={app.title} appComponent={app.component} />
			</Pager.Page>
		);
	};

	return (
		<S.Applications>
			<S.Container>
				{apps.map((app) => (
					<ApplicationButton key={app.title} id={app.id} title={app.title} icon={app.icon} onClick={handleOnClickApplication} />
				))}
			</S.Container>

			<S.ThemeMode>
				<Icon iconName="sun" />
				<Switch onChange={handleOnChangeTheme} state={theme.themeName === "light" ? "left" : "right"} />
				<Icon iconName="moon" />
			</S.ThemeMode>
			<S.Version>{all.version.replace(/\{version\}/g, version)}</S.Version>
		</S.Applications>
	);
};
