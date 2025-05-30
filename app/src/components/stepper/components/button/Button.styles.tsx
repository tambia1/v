import styled from "styled-components";

export const Button = styled.div`
	width: 6rem;
	height: 3rem;

	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;

	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};
	transition: all 0.3s ease;

	cursor: pointer;

	&:hover{
		background-color: ${(props) => props.theme.color.primary200};
	}

	&:active{
		color: ${(props) => props.theme.color.primary700};
		background-color: ${(props) => props.theme.color.primary300};
	}

	&:disabled{
		color: ${(props) => props.theme.color.primary400};
		background-color: ${(props) => props.theme.color.primary100};
	}
`;
