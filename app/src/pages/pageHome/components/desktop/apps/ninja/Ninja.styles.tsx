import styled from "styled-components";
import board from "./pages/game/images/board.jpg";
import grass from "./pages/game/images/grass.png";

export const NinjaGame = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${(props) => props.theme.color.primary200};
`;

export const Board = styled.div`
	position: absolute;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	background-image: url(${board});
	background-size: 100% 100%;
`;

export const Grass = styled.div`
	position: absolute;
	left: 0px;
	right: 0px;
	bottom: 0px;
	height: 97px;
	background-image: url(${grass});
`;
