import { Icon } from "@src/components/icon/Icon";
import styled from "styled-components";

export const Compose = styled.div`
	width: 12rem;
	height: 3rem;
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	align-items: center;
	box-sizing: border-box;
	border-radius: 10rem;
	border: 1px solid ${(props) => props.theme.color.primaryBgActive};
	overflow: hidden;

	color: ${(props) => props.theme.color.primaryFgEnabled};
	background-color: ${(props) => props.theme.color.primaryBgEnabled};
`;

export const IconCounter = styled(Icon)`
	cursor: pointer;
	flex-shrink: 0;
`;
