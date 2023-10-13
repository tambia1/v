import { version } from "@src/../package.json";
import { Icon } from "@src/components/icon/Icon";
import { Switch } from "@src/components/switch/Switch";
import { useTheme } from "@src/theme/hooks/UseTheme";
import { themes } from "@src/theme/Theme.types";
import * as S from "./PageHome.styles";
import { AppButton } from "./components/appButton/AppButton";
import { AppId, apps } from "./data/apps";
import { SwitchState } from "@src/components/switch/Switch.styles";
import { Pager } from "@src/components/pager/Pager";
import { Settings } from "./components/settings/Settings";
import { useLanguage } from "@src/language/hooks/UseLanguage";
import { Animate } from "@src/components/animate/Animate";
import { useAnimate } from "@src/components/animate/UseAnimate";

export const PageHome = () => {
	const { theme, setTheme } = useTheme();
	const { all, language } = useLanguage();
	const useAnimateAppContainer = useAnimate("hide");

	const handleOnChange = (switchState: SwitchState) => {
		setTheme(switchState === "left" ? themes.light : themes.dark);
	};

	const handleOnClick = (id: AppId) => {
		if (id === "settings") {
			useAnimateAppContainer.current.play("appear");
		}
	};

	const handleOnClosePager = () => {
		useAnimateAppContainer.current.play("disappear");
	};

	return (
		<S.PageHome>
			<S.Apps>
				{apps.map((app) => (
					<AppButton key={app.title} id={app.id} title={app.title} icon={app.icon} onClick={handleOnClick} />
				))}
			</S.Apps>

			<Animate useAnimate={useAnimateAppContainer}>
				<S.AppContainer>
					<Pager onClose={handleOnClosePager}>
						<Pager.Page id="settings" title={language.settings.title}>
							<Settings />
						</Pager.Page>
					</Pager>
				</S.AppContainer>
			</Animate>

			<S.ThemeMode>
				<Icon iconName="sun" />
				<Switch onChange={handleOnChange} state={theme.themeName === "light" ? "left" : "right"} />
				<Icon iconName="moon" />
			</S.ThemeMode>
			<S.Version>{all.version.replace(/\{version\}/g, version)}</S.Version>
		</S.PageHome>
	);
};
