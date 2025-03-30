import styled from "styled-components";

export const IconButton = styled.div`
	width: 3rem;
	height: 3rem;
	border-radius: 0.5rem;

	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;

	color: ${(props) => props.theme.color.primary800};
	transition: all 0.3s ease;

	cursor: pointer;

	& svg {
		stroke: ${(props) => props.theme.color.primary800};
		fill: ${(props) => props.theme.color.primary100};
	}

	&:hover{
		color: ${(props) => props.theme.color.primary400};
		background-color: ${(props) => props.theme.color.primary600};
	}
`;
