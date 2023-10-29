import * as S from "./PageHome.styles";
import { version } from "@src/../package.json";
import { Icon } from "@src/icons/Icon";
import { Switch } from "@src/components/switch/Switch";
import { useTheme } from "@src/theme/UseTheme";
import { themes } from "@src/theme/Theme.types";
import { SwitchState } from "@src/components/switch/Switch.styles";
import { useLanguage } from "@src/language/UseLanguage";
import { IAppIcon } from "./components/appButton/AppButton.styles";
import { useNavigate } from "react-router-dom";
import { Pages } from "../Pages.types";
import { AppButton } from "./components/appButton/AppButton";

interface IApp {
	id: IAppId;
	title: string;
	icon: IAppIcon;
	url: (typeof Pages)[keyof typeof Pages];
}

export type IAppId = "settings" | "calculator" | "camera" | "notes";

export const PageHome = () => {
	const { theme, setTheme } = useTheme();
	const { all, lang } = useLanguage();
	const navigate = useNavigate();

	const apps: IApp[] = [
		{ id: "settings", title: lang.settings.title, icon: "settings", url: Pages.settings },
		{ id: "notes", title: lang.notes.title, icon: "notes", url: Pages.notes },
		{ id: "calculator", title: lang.calculator.title, icon: "calculator", url: Pages.calculator },
		{ id: "camera", title: lang.camera.title, icon: "camera", url: Pages.home },
	];

	const handleOnChangeTheme = (switchState: SwitchState) => {
		setTheme(switchState === "left" ? themes.light : themes.dark);
	};

	const handleOnClickApplication = (appId: IAppId) => {
		const app = apps.find((app) => app.id === appId)!;

		navigate(app.url);
	};

	return (
		<S.Applications>
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
		</S.Applications>
	);
};
