import { Icon } from "@src/components/icon/Icon";
import { List } from "@src/components/list/List";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { type ITheme, themes } from "@src/theme/Theme.types";
import { useThemeContext } from "@src/theme/UseThemeContext";
import { useSearchParams } from "react-router-dom";
import * as S from "./Theme.styles";
import { ThemeStore } from "./store/ThemeStore";

export const Theme = () => {
	const { theme, setTheme } = useThemeContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const themeStore = ThemeStore();

	const handleOnClickTheme = (themeName: ITheme["themeName"]) => {
		setTheme(themes[themeName]);

		searchParams.set("theme", themeName);
		setSearchParams(searchParams, { replace: true });
	};

	const handleOnClickBackground = (backgroundImageIndex: number) => {
		themeStore.setBackgroundImageIndex(backgroundImageIndex);
	};

	return (
		<S.Theme>
			<List.Section>
				<T>{lang.settings.theme.mode}</T>
			</List.Section>

			<List>
				<List.Cell onClick={() => handleOnClickTheme("light")}>
					<List.Cell.Left>
						<Icon iconName="iconSun" />
					</List.Cell.Left>
					<List.Cell.Center>
						<T>{lang.settings.theme.light}</T>
					</List.Cell.Center>
					<List.Cell.Right>
						<Icon iconName={theme.themeName === "light" ? "iconCheck" : ""} />
					</List.Cell.Right>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickTheme("dark")}>
					<List.Cell.Left>
						<Icon iconName="iconMoon" />
					</List.Cell.Left>
					<List.Cell.Center>
						<T>{lang.settings.theme.dark}</T>
					</List.Cell.Center>
					<List.Cell.Right>
						<Icon iconName={theme.themeName === "dark" ? "iconCheck" : ""} />
					</List.Cell.Right>
				</List.Cell>
			</List>

			<List.Section>
				<T>{lang.settings.theme.background}</T>
			</List.Section>

			<List>
				{S.backgroundImages.map((backgroundImage, index) => (
					<List.Cell key={index} onClick={() => handleOnClickBackground(index)}>
						<List.Cell.Left>
							<S.BackgroundImage $backgroundImageIndex={index} />
						</List.Cell.Left>
						<List.Cell.Center>
							<T>{backgroundImage.light ? "" : lang.settings.theme.noBackground}</T>
						</List.Cell.Center>
						<List.Cell.Right>
							<Icon iconName={themeStore.backgroundImageIndex === index ? "iconCheck" : ""} />
						</List.Cell.Right>
					</List.Cell>
				))}
			</List>
		</S.Theme>
	);
};
