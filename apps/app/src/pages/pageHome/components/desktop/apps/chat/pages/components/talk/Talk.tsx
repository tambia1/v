import * as S from "./Talk.styles";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";

export const Talk = () => {
	const { t } = useTranslation();

	return (
		<S.Talk>
			<Text size="l">{t(lang.settings.about.text)}</Text>
		</S.Talk>
	);
};
