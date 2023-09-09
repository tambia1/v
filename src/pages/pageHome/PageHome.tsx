import { version } from "@src/../package.json";
import { Icon } from "@src/components/icon/Icon";
import { Switch } from "@src/components/switch/Switch";
import { useTheme } from "@src/components/theme/hooks/UseTheme";
import { content } from "@src/locale/en";
import { themes } from "@src/themes/Theme.types";
import * as S from "./PageHome.styles";

export const PageHome = () => {
	const { theme, setTheme } = useTheme();

	const handleOnChange = (isChecked: boolean) => {
		setTheme(isChecked ? themes.light : themes.dark);
	};

	return (
		<S.Container>
			<S.Title>Hello</S.Title>
			<S.Theme>
				<Icon iconName="sun" />
				<Switch onChange={handleOnChange} initialValue={theme.themeName === "light"} />
				<Icon iconName="moon" />
			</S.Theme>
			<S.Version>{content.all.version.replace(/\{version\}/g, version)}</S.Version>
		</S.Container>
	);
};
