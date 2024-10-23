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
			<Select onClickOption={onClickSelect}>
				<Select.Display>{tableType}</Select.Display>
				<Select.Options>
					<Select.Options.Item>Horizontal</Select.Options.Item>
					<Select.Options.Item>Vertical</Select.Options.Item>
				</Select.Options>
			</Select>

			<S.TableContainer>
				<Table data={data} type={tableType} />
			</S.TableContainer>
		</S.TestTable>
	);
};
