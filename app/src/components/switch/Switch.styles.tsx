import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Switch = styled.div<{ disabled: boolean }>`
	width: 6rem;
	height: 3rem;
	display: flex;
	background-color: ${(props) => (props.disabled ? props.theme.color.primary500 : props.theme.color.primary800)};
	border-radius: 100rem;
	overflow: hidden;
	padding: 0.2rem;
	box-sizing: border-box;
	cursor: pointer;

	${(props) =>
		props.disabled &&
		css`
		
			cursor: not-allowed;
			opacity: 0.6;
		`}

`;

export const Dot = styled.div<{ $checked: boolean }>`
	width: 50%;
	height: 100%;
	transform: translateX(${({ $checked }) => ($checked ? "100%" : "0%")});
	transition: all 0.3s ease;
	background-color: ${(props) => props.theme.color.primary100};
	border-radius: 100rem;
`;
