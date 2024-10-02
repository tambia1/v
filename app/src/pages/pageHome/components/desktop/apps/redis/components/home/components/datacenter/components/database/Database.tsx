import * as S from "./Database.styles";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";

type Props = {
	databaseId: number;
};

export const Database = ({ databaseId }: Props) => {
	const { t } = useTranslation();

	return (
		<S.Database>
			<Text size="l">{t(lang.redis.database.title)}</Text>

			<S.Spacer />
			<Text size="m">subscription id {databaseId}</Text>
		</S.Database>
	);
};
