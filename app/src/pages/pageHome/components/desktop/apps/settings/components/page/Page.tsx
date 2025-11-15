import { Icon } from "@src/components/icon/Icon";
import { List } from "@src/components/list/List";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { About } from "./components/about/About";
import { Language } from "./components/language/Language";
import { Layout } from "./components/layout/Layout";
import { Themes } from "./components/themes/Themes";
import * as S from "./Page.styles";

export const Page = () => {
	const navigator = useNavigator();

	const handleOnClickLanguage = () => {
		navigator.pushPage(
			<Navigator.Page name="language" title={<T>{lang.settings.language.title}</T>}>
				<Language />
			</Navigator.Page>,
		);
	};

	const handleOnClickTheme = () => {
		navigator.pushPage(
			<Navigator.Page name="theme" title={<T>{lang.settings.themes.title}</T>}>
				<Themes />
			</Navigator.Page>,
		);
	};

	const handleOnClickLayout = () => {
		navigator.pushPage(
			<Navigator.Page name="bar" title={<T>{lang.settings.layout.title}</T>}>
				<Layout />
			</Navigator.Page>,
		);
	};

	const handleOnClickAbout = () => {
		navigator.pushPage(
			<Navigator.Page name="about" title={<T>{lang.settings.about.title}</T>}>
				<About />
			</Navigator.Page>,
		);
	};

	return (
		<S.Page>
			<List.Section>
				<Text variant="title">
					<T>{lang.settings.apearance}</T>
				</Text>
			</List.Section>

			<List>
				<List.Cell onClick={handleOnClickLanguage}>
					<List.Cell.Icon>
						<Icon iconName="iconGlobe" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.language.title}</T>
					</List.Cell.Text>
					<List.Cell.Image>
						<Icon iconName="iconChevronRight" />
					</List.Cell.Image>
				</List.Cell>

				<List.Cell onClick={handleOnClickTheme}>
					<List.Cell.Icon>
						<Icon iconName="iconAperture" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.themes.title}</T>
					</List.Cell.Text>
					<List.Cell.Image>
						<Icon iconName="iconChevronRight" />
					</List.Cell.Image>
				</List.Cell>

				<List.Cell onClick={handleOnClickLayout}>
					<List.Cell.Icon>
						<Icon iconName="iconLayout" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.layout.title}</T>
					</List.Cell.Text>
					<List.Cell.Info>
						<T>Top</T>
					</List.Cell.Info>
					<List.Cell.Image>
						<Icon iconName="iconChevronRight" />
					</List.Cell.Image>
				</List.Cell>

				<List.Cell onClick={handleOnClickAbout}>
					<T>{lang.settings.about.title}</T>
				</List.Cell>
			</List>
		</S.Page>
	);
};
