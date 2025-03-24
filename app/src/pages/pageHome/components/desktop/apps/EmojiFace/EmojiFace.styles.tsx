import styled from "styled-components";

export const EmojiFace = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	color: #ffffff;
	background-color: #000000;
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
