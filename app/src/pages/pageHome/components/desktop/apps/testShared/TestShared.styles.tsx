import styled from "styled-components";

export const TestShared = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	color: ${(props) => props.theme.color.secondaryFg};
	background-color: ${(props) => props.theme.color.secondaryBg};
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
`;

export const Col = styled.div`
	display: flex;
	flex-direction: col;
	gap: 0.5rem;
`;