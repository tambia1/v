import { Chart, type Line } from "@src/components/chart/Chart";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import type { StockOk } from "../../../queries/QueryStocks";
import * as S from "./Stock.styles";

type Props = {
	stock: StockOk;
};

export const Stock = ({ stock }: Props) => {
	const theme = useTheme();
	const { t } = useTranslation();

	const lines: Line[] = [
		{
			color: theme.color.success900,
			data: stock.values.map((item, i) => [i, Number(item.close)]),
		},
	];

	return (
		<S.Symbol>
			<Text variant="header">{t(lang.stocks.exchange, { exchange: stock.meta.exchange })}</Text>

			<S.Chart>
				<Chart lines={lines} />
			</S.Chart>
		</S.Symbol>
	);
};
