import styled from "styled-components";
import arena1 from "./game/images/arenas/arena1.jpg";

export const ClashRoyaleGame = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	background-image: url(${arena1});
	background-size: cover;
	background-position: 50% 50%;
	filter: blur(2px);
`;

export const ClashRoyaleBoard = styled.div`
	position: absolute;
	width: 689px;
	height: 963px;
	width: 550px;
	height: 768px;
	display: flex;
	justify-content: center;
`;
