import * as S from "./Notes.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { Pager } from "@src/components/pager/Pager";
import { List } from "@src/components/list/List";
import { Text } from "@src/components/text/Text";
import { Icon } from "@src/components/icon/Icon";
import { useLanguage } from "@src/language/hooks/UseLanguage";

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
				<Text>{language.notes.title}</Text>
			</List.Section>

			<List>
				<List.Cell onClick={handleOnClickLanguage}>
					<List.Cell.Image>
						<Icon iconName="globe" size="s" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>{language.settings.language.title}</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="chevronRight" size="s" />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.Notes>
	);
};
