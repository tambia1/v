import * as S from "./Language.styles";
import { List } from "@src/components/list/List";
import { Icon } from "@src/components/icon/Icon";
import { useTranslation } from "react-i18next";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useSearchParams } from "react-router-dom";
import { ILanguageName } from "@src/locales/i18n.types";
import { Flag } from "@src/components/flag/Flag";

export const Language = () => {
	const { i18n } = useTranslation();
	const [searchParams, setSearchParams] = useSearchParams();

	const handleOnClickChangeLanguage = (languageName: ILanguageName) => {
		i18n.changeLanguage(languageName);

		searchParams.set("language", languageName);
		setSearchParams(searchParams, { replace: true });
	};

	return (
		<S.Language>
			<List.Section>
				<T>{lang.settings.language.title}</T>
			</List.Section>

			<List>
				<List.Cell onClick={() => handleOnClickChangeLanguage("en")}>
					<List.Cell.Image>
						<Flag flagName="flagGb" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.language.english}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={i18n.language === "en" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeLanguage("fi")}>
					<List.Cell.Image>
						<Flag flagName="flagFi" />
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
