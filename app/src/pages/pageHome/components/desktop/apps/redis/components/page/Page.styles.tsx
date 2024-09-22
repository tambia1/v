import styled from "styled-components";

export const Page = styled.div`
	width: auto;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;
`;

export const TableSubscriptions = styled.table`
	table-layout: fixed;
	width: 100%;
	color: ${({ theme }) => theme.color.normalFg};
	background-color: ${({ theme }) => theme.color.normalBgActive};
`;

export const TableDatabases = styled.table`
	table-layout: fixed;
	width: 100%;
	color: ${({ theme }) => theme.color.normalFg};
	background-color: ${({ theme }) => theme.color.normalBg};
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const TableCol = styled.th`
	width: 33%;
	text-align: left;
`;

export const TableRow = styled.tr``;

export const TableData = styled.td``;

export const TableDataTitle = styled.td`
	width: 100%;
	height: 5rem;
	white-space: nowrap;
	font-weight: bold;
`;

export const TableDataText = styled.td`
	width: 100%;
	height: 5rem;
	white-space: nowrap;
	font-weight: normal;
`;

export const Pressable = styled.span`
	cursor: pointer;
`;
