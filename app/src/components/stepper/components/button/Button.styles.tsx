import styled from "styled-components";

export const Button = styled.div`
	width: 6rem;
	height: 3rem;

	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;

	color: ${(props) => props.theme.color.primaryFg};
	background-color: ${(props) => props.theme.color.primaryBg};
	transition: all 0.3s ease;

	cursor: pointer;

	&:hover{
		color: ${(props) => props.theme.color.primaryFgHover};
		background-color: ${(props) => props.theme.color.primaryBgHover};
	}

	&:active{
		color: ${(props) => props.theme.color.primaryFgActive};
		background-color: ${(props) => props.theme.color.primaryBgActive};
	}

	&:disabled{
		color: ${(props) => props.theme.color.primaryFgDisabled};
		background-color: ${(props) => props.theme.color.primaryBgDisabled};
	}
`;
