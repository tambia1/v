import styled from "styled-components";

export const ChickenScream = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-image: linear-gradient(0deg, #32AE7F, #04B4C6); 
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

export const Chicken = styled.div`
	position: absolute;
	left: 2rem;
	bottom: 3rem;

	font-size: 50%;

`;
