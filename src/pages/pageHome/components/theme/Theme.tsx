import * as S from "./Theme.styles";
import { List } from "@src/components/list/List";
import { Text } from "@src/components/text/Text";
import { Icon } from "@src/components/icon/Icon";
import { useTheme } from "@src/components/theme/hooks/UseTheme";
import { themes } from "@src/themes/Theme.types";

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
			<List.Title>Theme</List.Title>

			<List>
				<List.Cell onClick={handleOnClickLight}>
					<List.Cell.Image>
						<Icon iconName="globe" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>Light</Text>
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
						<Text>Dark</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={theme.themeName === "dark" ? "v" : ""} />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.Theme>
	);
};
