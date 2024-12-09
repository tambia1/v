import styled from "styled-components";

export const Create = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
	flex-shrink: 0;
`;

export const Col = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
`;
