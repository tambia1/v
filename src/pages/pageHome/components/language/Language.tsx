import * as S from "./Language.styles";
import { List } from "@src/components/list/List";
import { Text } from "@src/components/text/Text";
import { Icon } from "@src/components/icon/Icon";
import { Flag } from "@src/components/flag/Flag";
import { useLanguage } from "@src/language/hooks/UseLanguage";
import { languages } from "@src/language/Language.types";

export const Language = () => {
	const { language, setLanguage } = useLanguage();

	const handleOnClickEnglish = () => {
		setLanguage(languages.en);
	};

	const handleOnClickFinnish = () => {
		setLanguage(languages.fi);
	};

	return (
		<S.Language>
			<List.Title>
				<Text>Language</Text>
			</List.Title>

			<List>
				<List.Cell onClick={handleOnClickEnglish}>
					<List.Cell.Image>
						<Flag flagName="greatBritain" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>English</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={language.languageName === "en" ? "v" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={handleOnClickFinnish}>
					<List.Cell.Image>
						<Flag flagName="finland" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>Finnish</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={language.languageName === "fi" ? "v" : ""} />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.Language>
	);
};
