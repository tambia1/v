import { Select } from "@src/components/select/Select";
import { Table, type Type } from "@src/components/table/Table";
import { useState } from "react";
import { data } from "./Data";
import * as S from "./TestTable.styles";

export const TestTable = () => {
	const [tableType, setTableType] = useState<Type>("horizontal");

	const onClickSelect = (index: number, _value: string) => {
		const map: Type[] = ["horizontal", "vertical"];

		setTableType(map[index]);
	};

	return (
		<S.TestTable>
			<Select onClickItem={onClickSelect}>
				<Select.Display>{tableType}</Select.Display>
				<Select.Items>
					<Select.Items.Item value="hor">Horizontal</Select.Items.Item>
					<Select.Items.Item value="var">Vertical</Select.Items.Item>
				</Select.Items>
			</Select>

			<S.TableContainer>
				<Table data={data} type={tableType} />
			</S.TableContainer>
		</S.TestTable>
	);
};
