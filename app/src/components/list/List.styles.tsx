import styled from "styled-components";

export const List = styled.div`
	width: 100%;
	max-width: 50rem;
	height: auto;

	display: flex;
	flex-direction: column;
	flex-shrink: 0;

	overflow: auto;

	border-radius: 2rem;
	border: 1px solid ${(props) => props.theme.color.primary400};
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primary100};
`;
