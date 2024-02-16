import { useState } from "react";
import { IType, Table } from "@src/components/table/Table";
import * as S from "./TestTable.styles";
import { data } from "./Data";
import { Select } from "@src/components/select/Select";

export const TestTable = () => {
	const [selectIndex, setSelectIndex] = useState(0);
	const [tableType, setTableType] = useState<IType>("horizontal");

	const onClickSelect = (index: number) => {
		const map: IType[] = ["horizontal", "vertical"];

		setSelectIndex(index);
		setTableType(map[index]);
	};

	return (
		<S.TestTable>
			<Select selectedIndex={selectIndex} onClickItem={onClickSelect}>
				<Select.Item>Horizontal</Select.Item>
				<Select.Item>Vertical</Select.Item>
			</Select>

			<S.TableContainer>
				<Table data={data} type={tableType} />
			</S.TableContainer>
		</S.TestTable>
	);
};
