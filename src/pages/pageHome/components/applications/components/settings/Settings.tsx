import * as S from "./Settings.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { Pager } from "@src/components/pager/Pager";
import { Language } from "./components/language/Language";
import { Theme } from "./components/theme/Theme";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { About } from "./components/about/About";
import { useLanguage } from "@src/language/UseLanguage";
import { Lang } from "@src/language/Lang";

export const Settings = () => {
	const pager = usePager();
	const { lang } = useLanguage();

	const handleOnClickLanguage = () => {
		pager.pushPage(
			<Pager.Page id="language" title={lang.settings.language.title}>
				<Language />
			</Pager.Page>
		);
	};

	const handleOnClickTheme = () => {
		pager.pushPage(
			<Pager.Page id="theme" title={lang.settings.theme.title}>
				<Theme />
			</Pager.Page>
		);
	};

	const handleOnClickAbout = () => {
		pager.pushPage(
			<Pager.Page id="about" title={lang.settings.about.title}>
				<About />
			</Pager.Page>
		);
	};

	return (
		<S.Settings>
			<List.Section>
				<Lang>{lang.settings.apearance}</Lang>
			</List.Section>

			<List>
				<List.Cell onClick={handleOnClickLanguage}>
					<List.Cell.Image>
						<Icon iconName="globe" size="s" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Lang>{lang.settings.language.title}</Lang>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="chevronRight" size="s" />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={handleOnClickTheme}>
					<List.Cell.Image>
						<Icon iconName="aperture" size="s" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Lang>{lang.settings.theme.title}</Lang>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="chevronRight" size="s" />
					</List.Cell.Arrow>
				</List.Cell>
				<List.Cell onClick={handleOnClickAbout}>
					<Lang>{lang.settings.about.title}</Lang>
				</List.Cell>
			</List>
		</S.Settings>
	);
};
