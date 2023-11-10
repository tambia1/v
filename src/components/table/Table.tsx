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
		<>
			{type === "movable" && (
				<S.Table>
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
										<S.TableCell>{cell}</S.TableCell>
									))}
								</S.TableRow>
							))}
						</S.TableRows>
					</S.TableContainer>
				</S.Table>
			)}

			{type === "transformed" && (
				<S.Table>
					{data.rows.map((row) => (
						<S.TableContainer>
							<S.TableRows>
								{data.cols.map((col, i) => (
									<S.TableRow>
										<S.TableCell>{col}</S.TableCell>
										<S.TableCell>{row[i]}</S.TableCell>
									</S.TableRow>
								))}
							</S.TableRows>
						</S.TableContainer>
					))}
				</S.Table>
			)}
		</>
	);
};
