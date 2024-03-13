import { IData } from "@src/components/table/Table";
import * as S from "./Symbol.styles";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";

interface Props {
	symbol: string;
	data: IData;
}

export const Symbol = (props: Props) => {
	const { t } = useTranslation();
	console.log("Translated text:", t(lang.stocks.symbol, { symbol: props.symbol }));

	return (
		<S.Symbol>
			<Text size="l">{t(lang.stocks.symbol, { symbol: props.symbol })}</Text>
		</S.Symbol>
	);
};
