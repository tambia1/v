import * as S from "./Theme.styles";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { useTheme } from "@src/theme/UseTheme";
import { themes } from "@src/theme/Theme.types";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const Theme = () => {
	const { theme, setTheme } = useTheme();

	const handleOnClickLight = () => {
		setTheme(themes.light);
	};

	const handleOnClickDark = () => {
		setTheme(themes.dark);
	};

	return (
		<S.Theme>
			<List.Section>
				<T>{lang.settings.theme.title}</T>
			</List.Section>

			<List>
				<List.Cell onClick={handleOnClickLight}>
					<List.Cell.Image>
						<Icon iconName="iconSun" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.theme.light}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={theme.themeName === "light" ? "iconCheck" : ""} size={theme.size.m} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={handleOnClickDark}>
					<List.Cell.Image>
						<Icon iconName="iconMoon" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.theme.dark}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={theme.themeName === "dark" ? "iconCheck" : ""} size={theme.size.m} />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.Theme>
	);
};
