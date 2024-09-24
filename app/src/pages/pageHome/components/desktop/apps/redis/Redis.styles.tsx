import { Icon } from "@src/icons/Icon";
import styled from "styled-components";

export const Redis = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;

export const MenuIcon = styled(Icon)`
	cursor: pointer;
	padding: 0.5rem;

	&:hover {
		background-color: ${(props) => props.theme.color.normalBgHover};
	}

	&:active {
		background-color: ${(props) => props.theme.color.normalBgActive};
	}
`;
