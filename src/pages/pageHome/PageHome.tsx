import { version } from "@src/../package.json";
import { Icon } from "@src/components/icon/Icon";
import { Switch } from "@src/components/switch/Switch";
import { useTheme } from "@src/components/theme/hooks/UseTheme";
import { content } from "@src/locale/en";
import { themes } from "@src/themes/Theme.types";
import * as S from "./PageHome.styles";
import { AppButton } from "./components/AppButton/AppButton";
import { apps } from "./data/apps";
import { SwitchState } from "@src/components/switch/Switch.styles";

export const PageHome = () => {
	const { theme, setTheme } = useTheme();

	const handleOnChange = (switchState: SwitchState) => {
		setTheme(switchState === "left" ? themes.light : themes.dark);
	};

	return (
		<S.Container>
			<S.Apps>
				{apps.map((app) => (
					<AppButton key={app.title} title={app.title} icon={app.icon} />
				))}
			</S.Apps>
			<S.ThemeMode>
				<Icon iconName="sun" />
				<Switch onChange={handleOnChange} state={theme.themeName === "light" ? "left" : "right"} />
				<Icon iconName="moon" />
			</S.ThemeMode>
			<S.Version>{content.all.version.replace(/\{version\}/g, version)}</S.Version>
		</S.Container>
	);
};
