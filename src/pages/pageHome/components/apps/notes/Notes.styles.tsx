import { Headers } from "@src/components/pager/Pager.styles";
import { Icon } from "@src/icons/Icon.styles";
import styled from "styled-components";

export const Settings = styled.div`
	width: auto;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	& ${Headers} {
		background-color: #fbdc4a;
	}
`;

export const CellGrid = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;

	& ${Icon}:hover {
		color: ${(props) => props.theme.color.normalFgHover};
		cursor: pointer;
	}
`;
