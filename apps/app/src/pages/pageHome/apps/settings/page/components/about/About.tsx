import * as S from "./About.styles";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";

export const About = () => {
	const { t } = useTranslation();

	return (
		<S.About>
			<Text size="l">{t(lang.settings.about.text)}</Text>
		</S.About>
	);
};
