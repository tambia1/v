import * as S from "./StocksPage.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { List } from "@src/components/list/List";
import { Symbol } from "./components/about/Symbol";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { QueryStocks } from "../queries/QueryStocks";
import { IData } from "@src/components/table/Table";

export const StocksPage = () => {
	const navigator = useNavigator();

	const query = QueryStocks.stocks({}, { enabled: true });

	const tables: { symbol: string; data: IData }[] = [];

	if (query.data) {
		const items = Object.values(query.data);

		items.forEach((item) => {
			if (item.status === "ok") {
				tables.push({
					symbol: item.meta.symbol,
					data: {
						cols: ["Datetime", "Open", "High", "Low", "Close", "Volume"],
						rows: item.values.map((value) => Object.values(value)),
					},
				});
			}
		});
	}

	const handleOnSymbol = (symbol: string, data: IData) => {
		navigator.pushPage(
			<Navigator.Page id={symbol} title={symbol}>
				<Symbol symbol={symbol} data={data} />
			</Navigator.Page>
		);
	};

	return (
		<S.StocksPage>
			<List.Section>
				<T>{lang.settings.apearance}</T>
			</List.Section>

			<List>
				{Object.values(tables).map((table) => (
					<List.Cell key={table.symbol} onClick={() => handleOnSymbol(table.symbol, table.data)}>
						<List.Cell.Text>{table.symbol}</List.Cell.Text>
					</List.Cell>
				))}
			</List>
		</S.StocksPage>
	);
};
