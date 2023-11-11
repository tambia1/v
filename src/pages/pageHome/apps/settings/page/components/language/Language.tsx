import * as S from "./Language.styles";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { Flag } from "@src/components/flag/Flag";
import { useTranslation } from "react-i18next";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const Language = () => {
	const { i18n } = useTranslation();

	const handleOnClickEnglish = () => {
		i18n.changeLanguage("en");
	};

	const handleOnClickFinnish = () => {
		i18n.changeLanguage("fi");
	};

	return (
		<S.Language>
			<List.Section>
				<T>{lang.settings.language.title}</T>
			</List.Section>

			<List>
				<List.Cell onClick={handleOnClickEnglish}>
					<List.Cell.Image>
						<Flag flagName="greatBritain" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.language.english}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={i18n.language === "en" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={handleOnClickFinnish}>
					<List.Cell.Image>
						<Flag flagName="finland" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.language.finnish}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={i18n.language === "fi" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.Language>
	);
};
