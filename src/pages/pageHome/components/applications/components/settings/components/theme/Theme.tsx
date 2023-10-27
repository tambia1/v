import * as S from "./Theme.styles";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { useTheme } from "@src/theme/UseTheme";
import { themes } from "@src/theme/Theme.types";
import { useLanguage } from "@src/language/UseLanguage";
import { Lang } from "@src/language/Lang";

export const Theme = () => {
	const { lang } = useLanguage();
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
				<Lang>{lang.settings.theme.title}</Lang>
			</List.Section>

			<List>
				<List.Cell onClick={handleOnClickLight}>
					<List.Cell.Image>
						<Icon iconName="globe" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Lang>{lang.settings.theme.light}</Lang>
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
						<Lang>{lang.settings.theme.dark}</Lang>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={theme.themeName === "dark" ? "v" : ""} />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.Theme>
	);
};
