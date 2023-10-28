import { Icon } from "@src/icons/Icon.styles";
import styled from "styled-components";

export const Settings = styled.div`
	width: auto;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
`;

export const Folders = styled.div`
	width: auto;
	height: 100%;

	display: grid;
	grid-template-columns: auto min-content;

	& ${Icon}:hover {
		color: ${(props) => props.theme.color.normalFgHover};
		cursor: pointer;
	}
`;
