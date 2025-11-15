import { Icon } from "@src/components/icon/Icon";
import { List } from "@src/components/list/List";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { type Theme, themes } from "@src/theme/Theme.types";
import { useThemeContext } from "@src/theme/UseThemeContext";
import { useSearchParams } from "react-router-dom";
import { ThemeStore } from "./store/ThemeStore";
import * as S from "./Themes.styles";

export const Themes = () => {
	const { theme, setTheme } = useThemeContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const themeStore = ThemeStore();

	const handleOnClickTheme = (themeName: Theme["themeName"]) => {
		setTheme(themes[themeName]);

		searchParams.set("theme", themeName);
		setSearchParams(searchParams, { replace: true });
	};

	const handleOnClickBackground = (backgroundImageIndex: number) => {
		themeStore.setBackgroundImageIndex(backgroundImageIndex);
	};

	return (
		<S.Themes>
			<List.Section>
				<Text variant="title">
					<T>{lang.settings.themes.mode}</T>
				</Text>
			</List.Section>

			<List>
				<List.Cell onClick={() => handleOnClickTheme("light")}>
					<List.Cell.Icon>
						<Icon iconName="iconSun" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.themes.light}</T>
					</List.Cell.Text>
					<List.Cell.Image>
						<Icon iconName={theme.themeName === "light" ? "iconCheck" : ""} />
					</List.Cell.Image>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickTheme("dark")}>
					<List.Cell.Icon>
						<Icon iconName="iconMoon" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.themes.dark}</T>
					</List.Cell.Text>
					<List.Cell.Image>
						<Icon iconName={theme.themeName === "dark" ? "iconCheck" : ""} />
					</List.Cell.Image>
				</List.Cell>
			</List>

			<List.Section>
				<Text variant="title">
					<T>{lang.settings.themes.background}</T>
				</Text>
			</List.Section>

			<List>
				{S.backgroundImages.map((backgroundImage, index) => (
					<List.Cell key={index} onClick={() => handleOnClickBackground(index)}>
						<List.Cell.Icon>
							<S.BackgroundImage $backgroundImageIndex={index} />
						</List.Cell.Icon>
						<List.Cell.Text>
							<T>{backgroundImage.light ? "" : lang.settings.themes.noBackground}</T>
						</List.Cell.Text>
						<List.Cell.Image>
							<Icon iconName={themeStore.backgroundImageIndex === index ? "iconCheck" : ""} />
						</List.Cell.Image>
					</List.Cell>
				))}
			</List>
		</S.Themes>
	);
};
