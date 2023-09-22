import { useState } from "react";
import { version } from "@src/../package.json";
import { Icon } from "@src/components/icon/Icon";
import { Switch } from "@src/components/switch/Switch";
import { useTheme } from "@src/components/theme/hooks/UseTheme";
import { content } from "@src/locale/en";
import { themes } from "@src/themes/Theme.types";
import * as S from "./PageHome.styles";
import { AppButton } from "./components/AppButton/AppButton";
import { AppId, apps } from "./data/apps";
import { SwitchState } from "@src/components/switch/Switch.styles";
import { Pager } from "@src/components/pager/Pager";

export const PageHome = () => {
	const { theme, setTheme } = useTheme();
	const [pagerIndex, setPagerIndex] = useState(0);

	const handleOnChange = (switchState: SwitchState) => {
		setTheme(switchState === "left" ? themes.light : themes.dark);
	};

	const handleOnClick = (id: AppId) => {
		if (id === "settings") {
			setPagerIndex(pagerIndex - 1);
		}

		if (id === "calculator") {
			setPagerIndex(pagerIndex + 1);
		}
	};

	return (
		<S.Container>
			<S.Apps>
				{apps.map((app) => (
					<AppButton key={app.title} id={app.id} title={app.title} icon={app.icon} onClick={handleOnClick} />
				))}

				<S.Test>
					<Pager currentIndex={pagerIndex}>
						<Pager.Page>aaa</Pager.Page>
						<Pager.Page>bbb</Pager.Page>
						<Pager.Page>ccc</Pager.Page>
						<Pager.Page>ddd</Pager.Page>
					</Pager>
				</S.Test>
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
