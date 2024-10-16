import styled from "styled-components";

export const Input = styled.input`
	width: fit-content;
	min-width: 5rem;
	height: 2.5rem;

	display: flex;
	overflow: auto;
	outline: 0px solid transparent;
	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};
	resize: none;

	border-radius: 100rem;
	border: 1px solid ${(props) => props.theme.color.normalFg};;
	padding: 0rem calc(1rem - 1px) 0rem calc(1rem - 1px);
	box-sizing: border-box;
	white-space: nowrap;

	font-weight: inherit;
	font-size: inherit;

	&:disabled {
		color: ${(props) => props.theme.color.normalFgDisabled};
		background-color: ${(props) => props.theme.color.normalBgDisabled};
	}
`;
