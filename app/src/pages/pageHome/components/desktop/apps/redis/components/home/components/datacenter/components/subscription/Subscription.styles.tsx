import styled from "styled-components";

export const Subscription = styled.div`
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
`;

export const WorldMapContainer = styled.div`
	width: 100%;
	max-width: 50rem;
	height: 15rem;
	display: flex;
	justify-content: center;

	& > div {
		max-width: 40rem;
	}
`;

export const Pin = styled.div`
	white-space: nowrap;
	transition: scale 0.3s ease;

	&:hover{
		scale: 150%;
	}
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 2rem;
	gap: 1rem;
`;
