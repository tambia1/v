import { Icon } from "@src/components/icon/Icon";
import styled from "styled-components";

const MOBILE_WIDTH = "700px";

export const Board = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primaryBgSelected};

	overflow: auto;
`;

export const Column = styled.div`
	width: 100%;
	min-height: 20rem;
	display: flex;
	flex-direction: column;
	box-shadow: ${(props) => props.theme.shadow.box} ${(props) => props.theme.color.primaryFg};
	min-width: 0;
	transition: all 0.3s ease;

	@media (max-width: ${MOBILE_WIDTH}) {
		flex-shrink: 0;
	}
`;

export const ColumnHeader = styled.div`
	width: 100%;
	height: 5rem;
	display: flex;
	flex-shrink: 0;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.color.primaryFg};
	background-color: ${(props) => props.theme.color.primaryBg};
	position: relative;
`;

export const Columns = styled.div`
	width: auto;
	height: auto;

	display: flex;
	flex-direction: column;
	gap: 1rem;

	margin: 1rem;


	& > ${Column}:nth-child(1) ${ColumnHeader} {
		background-color: #f48897;
	}
	& > ${Column}:nth-child(2) ${ColumnHeader} {
		background-color: #f4e688;
	}
	& > ${Column}:nth-child(3) ${ColumnHeader} {
		background-color: #88f48e;
	}
	& > ${Column}:nth-child(4) ${ColumnHeader} {
		background-color: #88e2f4;
	}

	@media (min-width: ${MOBILE_WIDTH}) {
		flex-direction: row;
	}
`;

export const ColumnBody = styled.div<{ $isDragOn: boolean }>`
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	color: ${(props) => props.theme.color.primaryFg};
	background-color: ${(props) => (props.$isDragOn ? props.theme.color.primaryBgActive : props.theme.color.primaryBg)};
	padding: 1rem;
	gap: 0.5rem;
	overflow-x: hidden;
	overflow-y: auto;
	box-sizing: border-box;
	transition: all 0.3s ease;
`;

export const Task = styled.div<{ $isDragOn: boolean }>`
	display: flex;
	width: auto;
	min-height: 5rem;
	padding: 0.5rem;
	box-shadow: ${(props) => props.theme.shadow.box} ${(props) => props.theme.color.primaryFg};
	overflow: hidden;
	transition: all 0.3s ease;

	background-color: ${(props) => (props.$isDragOn ? props.theme.color.accentFg : props.theme.color.primaryBg)};

	&:hover {
		background-color: ${(props) => props.theme.color.primaryBgHover};
	}
`;

export const HeaderText = styled.div``;

export const HeaderIcon = styled(Icon).attrs({
	fill: "#00ff00",
	stroke: "#000000",
})`
	position: absolute;
	right: 1rem;

	width: 2rem;
	height: 2rem;
	padding: 0.5rem;
	border-radius: 0.5rem;

	cursor: pointer;
	transition: all 0.3s ease;

	&:active {
		opacity: 0.5;
	}
`;

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;
