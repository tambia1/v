import { Icon } from "@src/components/icon/Icon";
import styled from "styled-components";

export const Compose = styled.div`
	width: 12rem;
	height: 3rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	box-sizing: border-box;
	border-radius: 3rem;
	border: 1px solid ${(props) => props.theme.color.primaryBgActive};
	overflow: hidden;

	color: ${(props) => props.theme.color.primaryFg};
	background-color: ${(props) => props.theme.color.primaryBg};
`;

export const IconCounter = styled(Icon)`
	cursor: pointer;
	flex-shrink: 0;
`;