import { IData } from "@src/components/table/Table";
import * as S from "./Symbol.styles";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";
import { Chart } from "@src/components/chart/Chart";

interface Props {
	symbol: string;
	data: IData;
}

export const Symbol = ({ symbol, data }: Props) => {
	const { t } = useTranslation();
	console.log("Translated text:", t(lang.stocks.symbol, { symbol: symbol }));

	return (
		<S.Symbol>
			<Text size="l">{t(lang.stocks.symbol, { symbol: symbol })}</Text>

			<S.Chart>
				<Chart data={data.rows as number[][]} />
			</S.Chart>
		</S.Symbol>
	);
};
