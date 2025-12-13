import styled from "@emotion/styled";
import { Flag } from "@src/components/flag/Flag.styles";

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
	width: 30rem;
	height: 15rem;
	display: flex;
	justify-content: center;

	& > div {
		max-width: 40rem;
	}
`;

export const Pin = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	white-space: nowrap;
	transition: scale 0.3s ease;

	&:hover{
		scale: 150%;
	}

	& ${Flag} {
		margin-left: -50%;
		margin-top: -50%;
		width: 100%;
		height: 100%;
		box-shadow: 0px 0px 5px 5px #ffffff88;
	}
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 2rem;
	gap: 1rem;
`;
