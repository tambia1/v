import * as S from "./Notes.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { Pager } from "@src/components/pager/Pager";
import { List } from "@src/components/list/List";
import { Icon } from "@src/components/icon/Icon";
import { useLanguage } from "@src/language/hooks/UseLanguage";
import { Lang } from "@src/language/components/lang/Lang";

export const Notes = () => {
	const pager = usePager();
	const { language } = useLanguage();

	const handleOnClickLanguage = () => {
		pager.pushPage(
			<Pager.Page id="language" title={language.settings.language.title}>
				aaa
			</Pager.Page>
		);
	};

	return (
		<S.Notes>
			<List.Section>
				<Lang>{language.notes.title}</Lang>
			</List.Section>

			<List>
				<List.Cell onClick={handleOnClickLanguage}>
					<List.Cell.Image>
						<Icon iconName="globe" size="s" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Lang>{language.settings.language.title}</Lang>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="chevronRight" size="s" />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.Notes>
	);
};
