import styled from "styled-components";

export const Input = styled.input<{ $width: string; $textALign: string }>`
	width: ${(props) => props.$width};
	height: 3rem;

	display: flex;
	overflow: auto;
	outline: 0px solid transparent;
	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};
	resize: none;

	border-radius: 100rem;
	border: 1px solid ${(props) => props.theme.color.primary400};
	padding: 0rem calc(1rem - 1px) 0rem calc(1rem - 1px);
	box-sizing: border-box;
	white-space: nowrap;

	font-weight: inherit;
	font-size: inherit;

	text-align: ${(props) => props.$textALign};

	&:disabled {
		color: ${(props) => props.theme.color.primary500};
		background-color: ${(props) => props.theme.color.primary300};
		cursor: not-allowed;
		opacity: 0.6;
	}
`;
