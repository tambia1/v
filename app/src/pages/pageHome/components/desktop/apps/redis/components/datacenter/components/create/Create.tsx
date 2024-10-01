import * as S from "./Create.styles";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";

export const Create = () => {
	const { t } = useTranslation();

	return (
		<S.Create>
			<Text size="l">{t(lang.redis.create.title)}</Text>

			<S.Spacer />
			<Text size="m">create database</Text>
		</S.Create>
	);
};
