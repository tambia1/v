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
	border: 1px solid ${(props) => props.theme.color.primary700};
	overflow: hidden;

	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};
`;

export const IconCounter = styled(Icon)`
	cursor: pointer;
	flex-shrink: 0;
`;
