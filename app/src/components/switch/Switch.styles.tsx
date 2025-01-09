import styled from "styled-components";

export const Switch = styled.div<{ disabled: boolean }>`
	width: 6rem;
	height: 3rem;
	display: flex;
	background-color: ${(props) => (props.disabled ? props.theme.color.primaryFgDisabled : props.theme.color.primaryFg)};
	border-radius: 100rem;
	overflow: hidden;
	padding: 0.2rem;
	box-sizing: border-box;
	cursor: pointer;
`;

export const Dot = styled.div<{ $checked: boolean }>`
	width: 50%;
	height: 100%;
	transform: translateX(${({ $checked }) => ($checked ? "100%" : "0%")});
	transition: all 0.3s ease;
	background-color: ${(props) => props.theme.color.primaryBg};
	border-radius: 100rem;
`;
