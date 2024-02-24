import styled from "styled-components";

export const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
	cursor: pointer;
	/* background-image: linear-gradient(to top, #d8d9db 0%, #ffffff 80%, #fdfdfd 100%); */
	background-color: red;
	border-radius: 100em;
	border: 1px solid #8f9092;
	color: #606060;
	text-shadow: 0 1px #fff;
	transition: all 0.1s ease;
	padding: 0.5em 1em 0.5em 1em;
	box-sizing: border-box;
	margin: 3px;
	min-width: 7em;
	width: fit-content;
	white-space: nowrap;

	&:active {
		box-shadow: inset 0 0 5px 3px #bbbbbb, inset 0 0 10px #dddddd;
		background-image: linear-gradient(to top, #fdfdfd 0%, #ffffff 20%, #d8d9db 100%);
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;
