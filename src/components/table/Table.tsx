import { ReactNode } from "react";
import * as S from "./Table.styles";

type IData = {
	cols: ReactNode[];
	rows: ReactNode[][];
};

export type IType = "horizontal" | "vertical";

interface Props {
	type: IType;
	data: IData;
}

export const Table = ({ data, type }: Props) => {
	return (
		<S.Table data-type={type}>
			{type === "horizontal" && (
				<S.TableContainer>
					<S.TableCols>
						<S.TableRow>
							{data.cols.map((col, i) => (
								<S.TableCol key={i}>{col}</S.TableCol>
							))}
						</S.TableRow>
					</S.TableCols>
					<S.TableRows>
						{data.rows.map((row, i) => (
							<S.TableRow key={i}>
								{row.map((cell, i) => (
									<S.TableCellData key={i}>{cell}</S.TableCellData>
								))}
							</S.TableRow>
						))}
					</S.TableRows>
				</S.TableContainer>
			)}

			{type === "vertical" && (
				<>
					{data.rows.map((row, i) => (
						<S.TableContainer key={i}>
							<S.TableRows>
								{data.cols.map((col, i) => (
									<S.TableRow key={i}>
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
