import { IData, Table } from "@src/components/table/Table";
import * as S from "./Stocks.styles";
import { QueryStocks } from "./queries/QueryStocks";

export const Stocks = () => {
	const query = QueryStocks.queryIbmStocks({}, { enabled: true });

	const tableData: IData = {
		cols: ["Open", "Hight", "Low", "Close", "Volume"],
		rows: [...Object.values(query.data?.["Time Series (5min)"] || []).map((item) => Object.values(item))],
	};

	return (
		<S.Stocks>
			<>{query.isLoading ? "Loading..." : ""}</>
			<S.CompanyName>{query.data?.["Meta Data"]["2. Symbol"]}</S.CompanyName>
			<Table data={tableData} type="horizontal" />
		</S.Stocks>
	);
};
