import { IData, Table } from "@src/components/table/Table";
import * as S from "./Stocks.styles";
import { QueryStocks } from "./queries/QueryStocks";
import { Loader } from "@src/components/loader/Loader";
import { Icon } from "@src/icons/Icon";

export const Stocks = () => {
	const query = QueryStocks.queryIbmStocks({}, { enabled: true });

	const tableData: IData = {
		cols: ["Open", "Hight", "Low", "Close", "Volume"],
		rows: [...Object.values(query.data?.["Time Series (5min)"] || []).map((item) => Object.values(item))],
	};

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

			<>
				<S.CompanyName>{query.data?.["Meta Data"]["2. Symbol"]}</S.CompanyName>
				<Table data={tableData} type="horizontal" />
			</>
		</S.Stocks>
	);
};
