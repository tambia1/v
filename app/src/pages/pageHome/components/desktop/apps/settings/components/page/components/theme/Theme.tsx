import * as S from "./Theme.styles";
import { List } from "@src/components/list/List";
import { Icon } from "@src/components/icon/Icon";
import { useThemeContext } from "@src/theme/UseThemeContext";
import { ITheme, themes } from "@src/theme/Theme.types";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useSearchParams } from "react-router-dom";
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
					<List.Cell.Image>
						<Icon iconName="iconSun" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.theme.light}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={theme.themeName === "light" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickTheme("dark")}>
					<List.Cell.Image>
						<Icon iconName="iconMoon" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.theme.dark}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={theme.themeName === "dark" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>
			</List>

			<List.Section>
				<T>{lang.settings.theme.background}</T>
			</List.Section>

			<List>
				{S.backgroundImages.map((backgroundImage, index) => (
					<List.Cell key={index} onClick={() => handleOnClickBackground(index)}>
						<List.Cell.Image>
							<S.BackgroundImage $backgroundImageIndex={index} />
						</List.Cell.Image>
						<List.Cell.Text>
							<T>{backgroundImage ? "" : lang.settings.theme.noBackground}</T>
						</List.Cell.Text>
						<List.Cell.Arrow>
							<Icon iconName={themeStore.backgroundImageIndex === index ? "iconCheck" : ""} />
						</List.Cell.Arrow>
					</List.Cell>
				))}
			</List>
		</S.Theme>
	);
};
