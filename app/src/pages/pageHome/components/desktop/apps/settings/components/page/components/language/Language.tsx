import { Flag } from "@src/components/flag/Flag";
import { Icon } from "@src/components/icon/Icon";
import { List } from "@src/components/list/List";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import type { ILanguageName } from "@src/locales/i18n.types";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import * as S from "./Language.styles";

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
					<List.Cell.Left>
						<Flag flagName="gb" />
					</List.Cell.Left>
					<List.Cell.Center>
						<T>{lang.settings.language.english}</T>
					</List.Cell.Center>
					<List.Cell.Right>
						<Icon iconName={i18n.language === "en" ? "iconCheck" : ""} />
					</List.Cell.Right>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeLanguage("fi")}>
					<List.Cell.Left>
						<Flag flagName="fi" />
					</List.Cell.Left>
					<List.Cell.Center>
						<T>{lang.settings.language.finnish}</T>
					</List.Cell.Center>
					<List.Cell.Right>
						<Icon iconName={i18n.language === "fi" ? "iconCheck" : ""} />
					</List.Cell.Right>
				</List.Cell>
			</List>
		</S.Language>
	);
};
