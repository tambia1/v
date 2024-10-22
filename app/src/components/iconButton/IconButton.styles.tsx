import styled from "styled-components";

export const IconButton = styled.div`
	width: 3rem;
	height: 3rem;
	padding: 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	cursor: pointer;

	&:hover{
		color: ${(props) => props.theme.color.primaryFgHover};
		background-color: ${(props) => props.theme.color.primaryBgHover};
	}
`;
