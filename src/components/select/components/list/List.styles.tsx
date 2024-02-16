import styled from "styled-components";

export const List = styled.div`
	width: 100%;
	height: auto;

	display: flex;
	flex-direction: column;
	flex-shrink: 0;

	overflow: auto;

	box-shadow: 0 0 0.5rem 0 ${(props) => props.theme.color.shadow};
	border-radius: 1rem;
`;
