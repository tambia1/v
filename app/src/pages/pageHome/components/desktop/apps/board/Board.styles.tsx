import styled from "styled-components";

export const Board = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const Column = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-shadow: ${(props) => props.theme.color.shadow};
	min-width: 0;
`;

export const ColumnTitle = styled.div`
	width: 100%;
	height: 5rem;
	display: flex;
	flex-shrink: 0;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};
`;

export const Columns = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: row;
	gap: 1rem;

	& > ${Column}:nth-child(1) ${ColumnTitle} {
		background-color: #f48897;
	}
	& > ${Column}:nth-child(2) ${ColumnTitle} {
		background-color: #f4e688;
	}
	& > ${Column}:nth-child(3) ${ColumnTitle} {
		background-color: #88f48e;
	}
	& > ${Column}:nth-child(4) ${ColumnTitle} {
		background-color: #88e2f4;
	}
`;

export const ColumnBody = styled.div<{ $isDragging: boolean }>`
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => (props.$isDragging ? props.theme.color.normalBgHover : props.theme.color.normalBg)};
	padding: 1rem;
	gap: 0.5rem;
	overflow-x: hidden;
	overflow-y: auto;
	box-sizing: border-box;
	transition: all 0.3s ease;
`;

export const Task = styled.div`
	display: flex;
	width: auto;
	min-height: 5rem;
	padding: 0.5rem;
	box-shadow: ${(props) => props.theme.color.shadow};
	background-color: ${(props) => props.theme.color.normalBg};
	overflow: hidden;

	&:hover {
		background-color: ${(props) => props.theme.color.normalBgHover};
	}

	&:active {
		background-color: ${(props) => props.theme.color.normalBgActive};
	}
`;
