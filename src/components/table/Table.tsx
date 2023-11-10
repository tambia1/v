import { ReactNode } from "react";
import * as S from "./Table.styles";

type IData = {
	cols: ReactNode[];
	rows: ReactNode[][];
};

export type IType = "movable" | "transformed";

interface Props {
	type: IType;
	data: IData;
}

export const Table = ({ data, type }: Props) => {
	return (
		<S.Table data-type={type}>
			{type === "movable" && (
				<S.TableContainer>
					<S.TableCols>
						{data.cols.map((col) => (
							<S.TableCol>{col}</S.TableCol>
						))}
					</S.TableCols>
					<S.TableRows>
						{data.rows.map((row) => (
							<S.TableRow>
								{row.map((cell) => (
									<S.TableCellData>{cell}</S.TableCellData>
								))}
							</S.TableRow>
						))}
					</S.TableRows>
				</S.TableContainer>
			)}

			{type === "transformed" && (
				<>
					{data.rows.map((row) => (
						<S.TableContainer>
							<S.TableRows>
								{data.cols.map((col, i) => (
									<S.TableRow>
										<S.TableCellHead>{col}</S.TableCellHead>
										<S.TableCellData>{row[i]}</S.TableCellData>
									</S.TableRow>
								))}
							</S.TableRows>
						</S.TableContainer>
					))}
				</>
			)}
		</S.Table>
	);
};
