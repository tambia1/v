import * as S from "./Language.styles";
import { List } from "@src/components/list/List";
import { Icon } from "@src/components/icon/Icon";
import { Flag } from "@src/components/flag/Flag";
import { useLanguage } from "@src/language/hooks/UseLanguage";
import { languages } from "@src/language/Language.types";
import { Button } from "@src/components/button/Button";
import { useState } from "react";
import { Lang } from "@src/language/components/lang/Lang";

export const Language = () => {
	const { lang, language, setLanguage } = useLanguage();
	const [selectedLanguage, setSelectedLanguage] = useState(language);

	const handleOnClickSave = () => {
		setLanguage(languages[selectedLanguage.languageName]);
	};

	const handleOnClickEnglish = () => {
		setSelectedLanguage(languages.en);
	};

	const handleOnClickFinnish = () => {
		setSelectedLanguage(languages.fi);
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
						<Icon iconName={selectedLanguage.languageName === "en" ? "v" : ""} />
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
						<Icon iconName={selectedLanguage.languageName === "fi" ? "v" : ""} />
					</List.Cell.Arrow>
				</List.Cell>
			</List>

			<List.Section>
				<Button onClick={handleOnClickSave}>
					<Lang>{lang.settings.language.save}</Lang>
				</Button>
			</List.Section>
		</S.Language>
	);
};
