import * as S from "./Language.styles";
import { List } from "@src/components/list/List";
import { Text } from "@src/components/text/Text";
import { Icon } from "@src/components/icon/Icon";
import { Flag } from "@src/components/flag/Flag";
import { useLanguage } from "@src/language/hooks/UseLanguage";
import { languages } from "@src/language/Language.types";
import { Button } from "@src/components/button/Button";
import { useState } from "react";

export const Language = () => {
	const { language, setLanguage } = useLanguage();
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
				<Text>{language.settings.language.title}</Text>
			</List.Section>

			<List>
				<List.Cell onClick={handleOnClickEnglish}>
					<List.Cell.Image>
						<Flag flagName="greatBritain" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>{language.settings.language.english}</Text>
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
						<Text>{language.settings.language.finnish}</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={selectedLanguage.languageName === "fi" ? "v" : ""} />
					</List.Cell.Arrow>
				</List.Cell>
			</List>

			<List.Section>
				<Button onClick={handleOnClickSave}>{language.settings.language.save}</Button>
			</List.Section>
		</S.Language>
	);
};
