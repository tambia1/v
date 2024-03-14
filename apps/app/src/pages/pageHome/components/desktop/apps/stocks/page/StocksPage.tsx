import * as S from "./StocksPage.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { List } from "@src/components/list/List";
import { Symbol } from "./components/about/Symbol";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { IStockOk, QueryStocks } from "../queries/QueryStocks";
import { IData } from "@src/components/table/Table";

export const StocksPage = () => {
	const navigator = useNavigator();

	const query = QueryStocks.stocks({}, { enabled: true });

	// const tables: { symbol: string; data: IData }[] = [];

	// if (query.data) {
	// 	const items = Object.values(query.data);

	// 	items.forEach((item) => {
	// 		if (item.status === "ok") {
	// 			tables.push({
	// 				symbol: item.meta.symbol,
	// 				data: {
	// 					cols: ["Datetime", "Open", "High", "Low", "Close", "Volume"],
	// 					rows: item.values.map((value) => Object.values(value)),
	// 				},
	// 			});
	// 		}
	// 	});
	// }

	const handleOnSymbol = (stock: IStockOk) => {
		navigator.pushPage(
			<Navigator.Page id={stock.meta.symbol} title={stock.meta.symbol}>
				<Symbol stock={stock} />
			</Navigator.Page>
		);
	};

	return (
		<S.StocksPage>
			<List.Section>
				<T>{lang.settings.apearance}</T>
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
