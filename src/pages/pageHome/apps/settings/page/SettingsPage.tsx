import * as S from "./SettingsPage.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { Pager } from "@src/components/pager/Pager";
import { Language } from "./components/language/Language";
import { Theme } from "./components/theme/Theme";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { About } from "./components/about/About";
import { useTheme } from "@src/theme/UseTheme";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const SettingsPage = () => {
	const pager = usePager();
	const { theme } = useTheme();

	const handleOnClickLanguage = () => {
		pager.pushPage(
			<Pager.Page id="language" title={<T>{lang.settings.language.title}</T>}>
				<Language />
			</Pager.Page>
		);
	};

	const handleOnClickTheme = () => {
		pager.pushPage(
			<Pager.Page id="theme" title={<T>{lang.settings.theme.title}</T>}>
				<Theme />
			</Pager.Page>
		);
	};

	const handleOnClickAbout = () => {
		pager.pushPage(
			<Pager.Page id="about" title={<T>{lang.settings.about.title}</T>}>
				<About />
			</Pager.Page>
		);
	};

	return (
		<S.SettingsPage>
			<List.Section>
				<T>{lang.settings.apearance}</T>
			</List.Section>

			<List>
				<List.Cell onClick={handleOnClickLanguage}>
					<List.Cell.Image>
						<Icon iconName="iconGlobe" size={theme.size.m} />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.language.title}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="iconChevronRight" size={theme.size.m} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={handleOnClickTheme}>
					<List.Cell.Image>
						<Icon iconName="iconAperture" size={theme.size.m} />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.theme.title}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="iconChevronRight" size={theme.size.m} />
					</List.Cell.Arrow>
				</List.Cell>
				<List.Cell onClick={handleOnClickAbout}>
					<T>{lang.settings.about.title}</T>
				</List.Cell>
			</List>
		</S.SettingsPage>
	);
};
