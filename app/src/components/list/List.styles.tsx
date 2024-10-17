import styled from "styled-components";

export const List = styled.div`
	width: 100%;
	max-width: 50rem;
	height: auto;

	display: flex;
	flex-direction: column;
	flex-shrink: 0;

	overflow: auto;

	box-shadow: ${(props) => props.theme.shadow.box} ${(props) => props.theme.color.secondaryFg};
	border-radius: 1rem;
`;
