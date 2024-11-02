import styled from "styled-components";

export const Input = styled.input`
	width: fit-content;
	min-width: 20rem;
	height: 3rem;

	display: flex;
	overflow: auto;
	outline: 0px solid transparent;
	color: ${(props) => props.theme.color.primaryFg};
	background-color: ${(props) => props.theme.color.primaryBg};
	resize: none;

	border-radius: 100rem;
	border: 1px solid ${(props) => props.theme.color.primaryFg};;
	padding: 0rem calc(1rem - 1px) 0rem calc(1rem - 1px);
	box-sizing: border-box;
	white-space: nowrap;

	font-weight: inherit;
	font-size: inherit;

	&:disabled {
		color: ${(props) => props.theme.color.primaryFgDisabled};
		background-color: ${(props) => props.theme.color.primaryBgDisabled};
	}
`;
