import * as S from "./Page.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { Language } from "./components/language/Language";
import { Theme } from "./components/theme/Theme";
import { Layout } from "./components/layout/Layout";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { About } from "./components/about/About";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const Page = () => {
	const navigator = useNavigator();

	const handleOnClickLanguage = () => {
		navigator.pushPage(
			<Navigator.Page id="language" title={<T>{lang.settings.language.title}</T>}>
				<Language />
			</Navigator.Page>
		);
	};

	const handleOnClickTheme = () => {
		navigator.pushPage(
			<Navigator.Page id="theme" title={<T>{lang.settings.theme.title}</T>}>
				<Theme />
			</Navigator.Page>
		);
	};

	const handleOnClickLayout = () => {
		navigator.pushPage(
			<Navigator.Page id="bar" title={<T>{lang.settings.layout.title}</T>}>
				<Layout />
			</Navigator.Page>
		);
	};

	const handleOnClickAbout = () => {
		navigator.pushPage(
			<Navigator.Page id="about" title={<T>{lang.settings.about.title}</T>}>
				<About />
			</Navigator.Page>
		);
	};

	return (
		<S.Page>
			<List.Section>
				<T>{lang.settings.apearance}</T>
			</List.Section>

			<List>
				<List.Cell onClick={handleOnClickLanguage}>
					<List.Cell.Image>
						<Icon iconName="iconGlobe" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.language.title}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="iconChevronRight" />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={handleOnClickTheme}>
					<List.Cell.Image>
						<Icon iconName="iconAperture" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.theme.title}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="iconChevronRight" />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={handleOnClickLayout}>
					<List.Cell.Image>
						<Icon iconName="iconLayout" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.layout.title}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="iconChevronRight" />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={handleOnClickAbout}>
					<T>{lang.settings.about.title}</T>
				</List.Cell>
			</List>
		</S.Page>
	);
};
