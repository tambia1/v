import * as S from "./Symbol.styles";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";
import { Chart, ILine } from "@src/components/chart/Chart";
import { IStockOk } from "../../../queries/QueryStocks";

interface Props {
	stock: IStockOk;
}

export const Symbol = ({ stock }: Props) => {
	const { t } = useTranslation();
	console.log("Translated text:", t(lang.stocks.symbol, { symbol: stock.meta.symbol }));

	const lines: ILine[] = [
		// {
		// 	color: "#00ff00",
		// 	data: stock.values.map((item, i) => [i, Number(item.open)]),
		// },
		{
			color: "#ff0000",
			data: stock.values.map((item, i) => [i, Number(item.close)]),
		},
		// {
		// 	color: "#0000ff",
		// 	data: stock.values.map((item, i) => [i, Number(item.high)]),
		// },
		// {
		// 	color: "#ff00ff",
		// 	data: stock.values.map((item, i) => [i, Number(item.low)]),
		// },
	];

	return (
		<S.Symbol>
			<Text size="l">{t(lang.stocks.symbol, { symbol: stock.meta.symbol })}</Text>

			<S.Chart>
				<Chart lines={lines} />
			</S.Chart>
		</S.Symbol>
	);
};
