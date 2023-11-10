import { useState } from "react";
import { IType, Table } from "@src/components/table/Table";
import * as S from "./TestTable.styles";
import { data } from "./Data";
import { DropDown } from "@src/components/dropDown/DropDown";

export const TestTable = () => {
	const [dropDownIndex, setDropDownIndex] = useState(1);
	const [tableType, setTableType] = useState<IType>("movable");

	const onClickDropDown = (index: number) => {
		const map: IType[] = ["movable", "transformed"];

		setDropDownIndex(index);
		setTableType(map[index]);
	};

	return (
		<S.TestTable>
			<DropDown selectedIndex={dropDownIndex} onClickItem={onClickDropDown}>
				<DropDown.Item>Movable</DropDown.Item>
				<DropDown.Item>Transformed</DropDown.Item>
			</DropDown>

			<S.TableContainer>
				<Table data={data} type={tableType} />
			</S.TableContainer>
		</S.TestTable>
	);
};
