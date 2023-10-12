import * as S from "./Theme.styles";
import { List } from "@src/components/list/List";
import { Text } from "@src/components/text/Text";
import { Icon } from "@src/components/icon/Icon";
import { useTheme } from "@src/components/theme/hooks/UseTheme";
import { themes } from "@src/themes/Theme.types";
import { useLanguage } from "@src/components/language/hooks/UseLanguage";

export const Theme = () => {
	const { language } = useLanguage();
	const { theme, setTheme } = useTheme();

	const handleOnClickLight = () => {
		setTheme(themes.light);
	};

	const handleOnClickDark = () => {
		setTheme(themes.dark);
	};

	return (
		<S.Theme>
			<List.Title>{language.settings.theme.title}</List.Title>

			<List>
				<List.Cell onClick={handleOnClickLight}>
					<List.Cell.Image>
						<Icon iconName="globe" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>{language.settings.theme.light}</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={theme.themeName === "light" ? "v" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={handleOnClickDark}>
					<List.Cell.Image>
						<Icon iconName="globe" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>{language.settings.theme.dark}</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={theme.themeName === "dark" ? "v" : ""} />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.Theme>
	);
};
