import styled from "styled-components";

export const Table = styled.div`
	color: ${({ theme }) => theme.color.normalFg};
	background-color: ${({ theme }) => theme.color.normalBg};
	display: flex;
	flex-direction: column;
	overflow: auto;
`;

export const TableContainer = styled.table`
	border-collapse: collapse;
	color: ${({ theme }) => theme.color.normalFg};
	background-color: ${({ theme }) => theme.color.normalBg};
	border: 2px solid ${({ theme }) => theme.color.accentBg};
`;

export const TableCols = styled.thead`
	white-space: nowrap;
	border-bottom: 1px solid ${({ theme }) => theme.color.accentBg};
`;

export const TableCol = styled.th``;

export const TableRows = styled.tbody``;

export const TableRow = styled.tr`
	border-bottom: 1px solid ${({ theme }) => theme.color.accentBg};
`;

export const TableCellData = styled.td`
	white-space: nowrap;
	font-weight: normal;
	width: 50%;
`;

export const TableCellHead = styled.td`
	white-space: nowrap;
	font-weight: normal;
	width: 50%;
	font-weight: bold;
`;
