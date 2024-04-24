import * as S from "./Stock.styles";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";
import { Chart, ILine } from "@src/components/chart/Chart";
import { IStockOk } from "../../../queries/QueryStocks";
import { useTheme } from "styled-components";

interface Props {
	stock: IStockOk;
}

export const Stock = ({ stock }: Props) => {
	const theme = useTheme();
	const { t } = useTranslation();

	const lines: ILine[] = [
		{
			color: theme.color.successBg,
			data: stock.values.map((item, i) => [i, Number(item.close)]),
		},
	];

	return (
		<S.Symbol>
			<Text size="l">{t(lang.stocks.exchange, { exchange: stock.meta.exchange })}</Text>

			<S.Chart>
				<Chart lines={lines} />
			</S.Chart>
		</S.Symbol>
	);
};
