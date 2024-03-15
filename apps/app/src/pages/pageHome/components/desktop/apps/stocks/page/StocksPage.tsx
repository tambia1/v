import * as S from "./StocksPage.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { List } from "@src/components/list/List";
import { Stock } from "./components/stock/Stock";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { IStockOk, QueryStocks } from "../queries/QueryStocks";

export const StocksPage = () => {
	const navigator = useNavigator();

	const query = QueryStocks.stocks({}, { enabled: true });

	const handleOnSymbol = (stock: IStockOk) => {
		navigator.pushPage(
			<Navigator.Page id={stock.meta.symbol} title={stock.meta.symbol}>
				<Stock stock={stock} />
			</Navigator.Page>
		);
	};

	return (
		<S.StocksPage>
			<List.Section>
				<T>{lang.stocks.title}</T>
			</List.Section>

			<List>
				{Object.values(query.data || {})
					.filter((stock) => stock.status === "ok")
					.map((stock) => (
						<List.Cell key={stock.meta.symbol} onClick={() => handleOnSymbol(stock as IStockOk)}>
							<List.Cell.Text>{stock.meta.symbol}</List.Cell.Text>
						</List.Cell>
					))}
			</List>
		</S.StocksPage>
	);
};
