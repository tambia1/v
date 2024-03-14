import * as S from "./Symbol.styles";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";
import { Chart } from "@src/components/chart/Chart";
import { IStockOk } from "../../../queries/QueryStocks";

interface Props {
	stock: IStockOk;
}

export const Symbol = ({ stock }: Props) => {
	const { t } = useTranslation();
	console.log("Translated text:", t(lang.stocks.symbol, { symbol: stock.meta.symbol }));

	const data: number[][][] = [
		stock.values.map((item, i) => [i, Number(item.open)]),
		stock.values.map((item, i) => [i, Number(item.close)]),
		stock.values.map((item, i) => [i, Number(item.low)]),
		stock.values.map((item, i) => [i, Number(item.high)]),
	];

	return (
		<S.Symbol>
			<Text size="l">{t(lang.stocks.symbol, { symbol: stock.meta.symbol })}</Text>

			<S.Chart>
				<Chart data={data} />
			</S.Chart>
		</S.Symbol>
	);
};
