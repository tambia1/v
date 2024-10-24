import { Select } from "@src/components/select/Select";
import { type IType, Table } from "@src/components/table/Table";
import { useState } from "react";
import { data } from "./Data";
import * as S from "./TestTable.styles";

export const TestTable = () => {
	const [tableType, setTableType] = useState<IType>("horizontal");

	const onClickSelect = (index: number) => {
		const map: IType[] = ["horizontal", "vertical"];

		setTableType(map[index]);
	};

	return (
		<S.TestTable>
			<Select onClickItem={onClickSelect}>
				<Select.Display>{tableType}</Select.Display>
				<Select.Items>
					<Select.Items.Item>Horizontal</Select.Items.Item>
					<Select.Items.Item>Vertical</Select.Items.Item>
				</Select.Items>
			</Select>

			<S.TableContainer>
				<Table data={data} type={tableType} />
			</S.TableContainer>
		</S.TestTable>
	);
};
