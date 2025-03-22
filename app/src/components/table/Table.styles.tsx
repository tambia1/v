import styled from "styled-components";

export const Table = styled.div`
	color: ${(props) => props.theme.color.primaryFgEnabled};
	background-color: ${(props) => props.theme.color.primaryBgEnabled};
	display: flex;
	flex-direction: column;
	overflow: auto;
`;

export const TableContainer = styled.table`
	border-collapse: collapse;
	color: ${(props) => props.theme.color.primaryFgEnabled};
	background-color: ${(props) => props.theme.color.primaryBgEnabled};
	border: 2px solid ${(props) => props.theme.color.secondaryBgEnabled};
`;

export const TableCols = styled.thead`
	white-space: nowrap;
	border-bottom: 1px solid ${(props) => props.theme.color.secondaryBgEnabled};
`;

export const TableCol = styled.th``;

export const TableRows = styled.tbody``;

export const TableRow = styled.tr`
	border-bottom: 1px solid ${(props) => props.theme.color.secondaryBgEnabled};
`;

export const TableCellData = styled.td`
	white-space: nowrap;
	font-weight: normal;
`;

export const TableCellHead = styled.td`
	white-space: nowrap;
	font-weight: bold;
`;
