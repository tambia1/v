import { IData, Table } from "@src/components/table/Table";
import * as S from "./Stocks.styles";
import { QueryStocks } from "./queries/QueryStocks";
import { Loader } from "@src/components/loader/Loader";
import { Icon } from "@src/icons/Icon";

export const Stocks = () => {
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

	return (
		<S.Stocks>
			{query.isLoading && (
				<S.LoaderContainer>
					<Loader />
				</S.LoaderContainer>
			)}

			<S.Refresh>
				<Icon iconName="iconRotateCcw" onClick={() => query.refetch()} />
			</S.Refresh>

			<S.TablesContainer>
				{Object.values(tables).map((table) => (
					<S.Table key={table.symbol}>
						<S.Symbol>{table.symbol}</S.Symbol>
						<Table data={table.data} type="horizontal" />
					</S.Table>
				))}
			</S.TablesContainer>
		</S.Stocks>
	);
};
