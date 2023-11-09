import { Table } from "@src/components/table/Table";
import * as S from "./TestTable.styles";
import { data } from "./Data";

export const TestTable = () => {
	return (
		<S.TestTable>
			<Table data={data} />
		</S.TestTable>
	);
};
