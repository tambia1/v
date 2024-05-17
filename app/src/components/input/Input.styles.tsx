import styled from "styled-components";

export const Input = styled.input`
	display: flex;
	width: fit-content;
	height: auto;
	overflow: auto;
	outline: 0px solid transparent;
	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};
	resize: none;

	border-radius: 100em;
	border: 1px solid #8f9092;
	text-shadow: 0 1px #fff;
	transition: all 0.1s ease;
	padding: 0.5em 1em 0.5em 1em;
	box-sizing: border-box;
	min-width: 5em;
	white-space: nowrap;

	&:hover {
	}

	&:active {
		box-shadow: inset 0 0 3px 0px #bbbbbb, inset 0 0 10px #dddddd;
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;
