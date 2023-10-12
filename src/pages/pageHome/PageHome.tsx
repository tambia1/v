import { version } from "@src/../package.json";
import { Icon } from "@src/components/icon/Icon";
import { Switch } from "@src/components/switch/Switch";
import { useTheme } from "@src/components/theme/hooks/UseTheme";
import { themes } from "@src/themes/Theme.types";
import * as S from "./PageHome.styles";
import { AppButton } from "./components/appButton/AppButton";
import { AppId, apps } from "./data/apps";
import { SwitchState } from "@src/components/switch/Switch.styles";
import { Pager } from "@src/components/pager/Pager";
import { Settings } from "./components/settings/Settings";
import { useLanguage } from "@src/language/hooks/UseLanguage";

export const PageHome = () => {
	const { theme, setTheme } = useTheme();
	const { all, language } = useLanguage();

	const handleOnChange = (switchState: SwitchState) => {
		setTheme(switchState === "left" ? themes.light : themes.dark);
	};

	const handleOnClick = (id: AppId) => {
		console.log(id);
	};

	return (
		<S.PageHome>
			<S.Apps>
				{apps.map((app) => (
					<AppButton key={app.title} id={app.id} title={app.title} icon={app.icon} onClick={handleOnClick} />
				))}
			</S.Apps>

			<S.Test>
				<Pager>
					<Pager.Page id="settings" title={language.settings.title} body={<Settings />} />
				</Pager>
			</S.Test>

			<S.ThemeMode>
				<Icon iconName="sun" />
				<Switch onChange={handleOnChange} state={theme.themeName === "light" ? "left" : "right"} />
				<Icon iconName="moon" />
			</S.ThemeMode>
			<S.Version>{all.version.replace(/\{version\}/g, version)}</S.Version>
		</S.PageHome>
	);
};
