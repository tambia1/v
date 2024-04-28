import styled from "styled-components";

export const GraphQlReactQuery = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const Space = styled.div`
	width: 1rem;
	height: 1rem;
`;
