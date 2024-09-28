import styled from "styled-components";

export const Subscription = styled.div`
	width: auto;
	height: auto;

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
	height: 15rem;
	display: flex;
	justify-content: center;

	& > div {
		max-width: 40rem;
	}
`;

export const Pin = styled.div`
	white-space: nowrap;
`;
