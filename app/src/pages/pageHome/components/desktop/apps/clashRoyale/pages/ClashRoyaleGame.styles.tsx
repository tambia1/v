import styled from "@emotion/styled";
import arena1 from "./game/images/arenas/arena1.jpg";

export const ClashRoyaleGame = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ClashRoyaleBoardBg = styled.div`
	width: 100%;
	height: 100%;

	background-image: url(${arena1});
	background-size: cover;
	background-position: 50% 50%;
	filter: blur(2px);
`;

export const ClashRoyaleBoard = styled.div`
	position: absolute;
	width: 550px;
	height: 768px;
	display: flex;
	justify-content: center;

	box-shadow: 0px 0px 10px 0px #00000088;
`;
