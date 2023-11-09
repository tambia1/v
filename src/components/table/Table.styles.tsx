import styled from "styled-components";

export const Table = styled.div`
	display: flex;
	flex-direction: column;
	color: ${({ theme }) => theme.color.normalFg};
	background-color: ${({ theme }) => theme.color.normalBg};
`;

export const TableCols = styled.div`
	display: flex;
	flex-direction: row;
`;

export const TableCol = styled.div`
	display: flex;
	flex-direction: column;
`;

export const TableRows = styled.div`
	display: flex;
	flex-direction: column;
`;

export const TableRow = styled.div`
	display: flex;
	flex-direction: row;
`;

export const TableCell = styled.div`
	display: flex;
	flex-direction: column;
`;
