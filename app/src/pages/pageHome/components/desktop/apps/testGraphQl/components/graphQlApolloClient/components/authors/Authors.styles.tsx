import styled from "styled-components";

export const Authors = styled.div`
	width: 100%;
	height: auto;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primary200};
`;

export const Table = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
`;

export const Space = styled.div`
	width: 1rem;
	height: 1rem;
`;
