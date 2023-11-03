import * as S from "./Language.styles";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { Flag } from "@src/components/flag/Flag";
import { useLanguage } from "@src/language/UseLanguage";
import { languages } from "@src/language/Language.types";
import { Lang } from "@src/language/Lang";

export const Language = () => {
	const { lang, language, setLanguage } = useLanguage();

	const handleOnClickEnglish = () => {
		setLanguage(languages.en);
	};

	const handleOnClickFinnish = () => {
		setLanguage(languages.fi);
	};

	return (
		<S.Language>
			<List.Section>
				<Lang>{lang.settings.language.title}</Lang>
			</List.Section>

			<List>
				<List.Cell onClick={handleOnClickEnglish}>
					<List.Cell.Image>
						<Flag flagName="greatBritain" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Lang>{lang.settings.language.english}</Lang>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={language.languageName === "en" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={handleOnClickFinnish}>
					<List.Cell.Image>
						<Flag flagName="finland" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Lang>{lang.settings.language.finnish}</Lang>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={language.languageName === "fi" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.Language>
	);
};
