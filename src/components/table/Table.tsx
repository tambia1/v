import { ReactNode } from "react";
import * as S from "./Table.styles";

type IData = {
	cols: ReactNode[];
	rows: ReactNode[][];
};

interface Props {
	data: IData;
}

export const Table = ({ data }: Props) => {
	return (
		<S.Table>
			<S.TableCols>
				{data.cols.map((col) => (
					<S.TableCol>{col}</S.TableCol>
				))}
			</S.TableCols>
			<S.TableRows>
				{data.rows.map((row) => (
					<S.TableRow>
						{row.map((cell) => (
							<S.TableCell>{cell}</S.TableCell>
						))}
					</S.TableRow>
				))}
			</S.TableRows>
		</S.Table>
	);
};
