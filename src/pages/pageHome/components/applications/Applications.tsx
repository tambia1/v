import * as S from "./Applications.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { Pager } from "@src/components/pager/Pager";
import { AppId, apps } from "../../data/apps";
import { ApplicationButton } from "./components/applicationButton/ApplicationButton";
import { Settings } from "../settings/Settings";
import { version } from "@src/../package.json";
import { Icon } from "@src/components/icon/Icon";
import { Switch } from "@src/components/switch/Switch";
import { useTheme } from "@src/theme/hooks/UseTheme";
import { themes } from "@src/theme/Theme.types";
import { SwitchState } from "@src/components/switch/Switch.styles";
import { useLanguage } from "@src/language/hooks/UseLanguage";

export const Applications = () => {
	const pager = usePager();
	const { language } = useLanguage();

	const { theme, setTheme } = useTheme();
	const { all } = useLanguage();

	const handleOnChangeTheme = (switchState: SwitchState) => {
		setTheme(switchState === "left" ? themes.light : themes.dark);
	};

	const handleOnClickApplication = (id: AppId) => {
		if (id === "settings") {
			pager.pushPage(
				<Pager.Page id="about" title={language.settings.title}>
					<Settings />
				</Pager.Page>
			);
		}
	};

	return (
		<>
			<S.Applications>
				{apps.map((app) => (
					<ApplicationButton key={app.title} id={app.id} title={app.title} icon={app.icon} onClick={handleOnClickApplication} />
				))}
			</S.Applications>

			<S.ThemeMode>
				<Icon iconName="sun" />
				<Switch onChange={handleOnChangeTheme} state={theme.themeName === "light" ? "left" : "right"} />
				<Icon iconName="moon" />
			</S.ThemeMode>
			<S.Version>{all.version.replace(/\{version\}/g, version)}</S.Version>
		</>
	);
};
