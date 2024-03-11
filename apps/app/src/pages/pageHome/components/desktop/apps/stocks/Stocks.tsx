import { IData, Table } from "@src/components/table/Table";
import * as S from "./Stocks.styles";
import { QueryStocks } from "./queries/QueryStocks";
import { Loader } from "@src/components/loader/Loader";
import { Icon } from "@src/icons/Icon";

export const Stocks = () => {
	const query = QueryStocks.symbols({}, { enabled: true });

	const tableData: IData = {
		cols: ["Symbol", "Name", "Currency", "Exchange", "Mic Code", "Country", "Type"],
		rows: [...Object.values(query.data?.data || []).map((item) => Object.values(item))],
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
				<Table data={tableData} type="horizontal" />
			</>
		</S.Stocks>
	);
};
