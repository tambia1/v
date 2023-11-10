import * as S from "./SettingsPage.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { Pager } from "@src/components/pager/Pager";
import { Language } from "./components/language/Language";
import { Theme } from "./components/theme/Theme";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { About } from "./components/about/About";
import { useLanguage } from "@src/language/UseLanguage";
import { Lang } from "@src/language/Lang";
import { useTheme } from "@src/theme/UseTheme";

export const SettingsPage = () => {
	const pager = usePager();
	const { lang } = useLanguage();
	const { theme } = useTheme();

	const handleOnClickLanguage = () => {
		pager.pushPage(
			<Pager.Page id="language" title={<Lang>{lang.settings.language.title}</Lang>}>
				<Language />
			</Pager.Page>
		);
	};

	const handleOnClickTheme = () => {
		pager.pushPage(
			<Pager.Page id="theme" title={<Lang>{lang.settings.theme.title}</Lang>}>
				<Theme />
			</Pager.Page>
		);
	};

	const handleOnClickAbout = () => {
		pager.pushPage(
			<Pager.Page id="about" title={<Lang>{lang.settings.about.title}</Lang>}>
				<About />
			</Pager.Page>
		);
	};

	return (
		<S.SettingsPage>
			<List.Section>
				<Lang>{lang.settings.apearance}</Lang>
			</List.Section>

			<List>
				<List.Cell onClick={handleOnClickLanguage}>
					<List.Cell.Image>
						<Icon iconName="iconGlobe" size={theme.size.m} />
					</List.Cell.Image>
					<List.Cell.Text>
						<Lang>{lang.settings.language.title}</Lang>
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
						<Lang>{lang.settings.theme.title}</Lang>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="iconChevronRight" size={theme.size.m} />
					</List.Cell.Arrow>
				</List.Cell>
				<List.Cell onClick={handleOnClickAbout}>
					<Lang>{lang.settings.about.title}</Lang>
				</List.Cell>
			</List>
		</S.SettingsPage>
	);
};
