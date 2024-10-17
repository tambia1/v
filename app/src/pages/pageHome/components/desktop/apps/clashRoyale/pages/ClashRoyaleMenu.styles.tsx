import styled, { css } from "styled-components";
import arenaIcon1 from "./game/images/arenas/arenaIcon1.png";
import arenaIcon2 from "./game/images/arenas/arenaIcon2.png";
import arenaIcon3 from "./game/images/arenas/arenaIcon3.png";
import arenaIcon4 from "./game/images/arenas/arenaIcon4.png";
import arenaIcon5 from "./game/images/arenas/arenaIcon5.png";
import arenaIcon6 from "./game/images/arenas/arenaIcon6.png";
import arenaIcon7 from "./game/images/arenas/arenaIcon7.png";
import arenaIcon8 from "./game/images/arenas/arenaIcon8.png";
import arenaIcon9 from "./game/images/arenas/arenaIcon9.png";
import arenaIcon10 from "./game/images/arenas/arenaIcon10.png";
import arenaIcon11 from "./game/images/arenas/arenaIcon11.png";
import bg from "./game/images/misc/bg.webp";
import buttonYellow from "./game/images/misc/button_yellow.png";
import splash0 from "./game/images/misc/splash_0.png";
import splash1 from "./game/images/misc/splash_1.png";
import splash2 from "./game/images/misc/splash_2.png";

export const ClashRoyaleMenu = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primaryBgSelected};
`;

export const Page = styled.div`
	position: absolute;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Bg = styled.div`
	position: absolute;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	background-image: url(${bg});
	background-size: 340px;
`;

export const Splash = styled.div`
	position: absolute;
	width: 375px;
	height: 595px;
	background-image: url(${splash0}), url(${splash1}), url(${splash2});
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50% 0%;
	display: flex;
	justify-content: center;
`;

export const ButtonStart = styled.button<{ $isVisible: boolean }>`
	display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
	align-items: center;
	justify-content: center;
	outline: none;
	cursor: pointer;
	position: absolute;
	bottom: 80px;
	width: 150px;
	height: 76px;
	background-image: url(${buttonYellow});
	z-index: 1;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50% 50%;
	color: #ffffff;
	text-shadow: 0px 0px 5px #000000;
	transition: all 0.1s ease;
	border: none;
	background-color: transparent;
	font-family: inherit;

	&:active {
		transform: scale(1.1);
	}
`;

export const PagingContainer = styled.div`
	overflow: hidden;
	background-position: 0px 0px;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;

	height: 250px;
	bottom: 180px;
	border-radius: 1rem;
	top: auto;
`;

export const PagingItem = css`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50%;
`;

export const PagingItem1 = styled.div`
	${PagingItem}
	background-image: url(${arenaIcon1});
`;

export const PagingItem2 = styled.div`
	${PagingItem}
	background-image: url(${arenaIcon2});
`;

export const PagingItem3 = styled.div`
	${PagingItem}
	background-image: url(${arenaIcon3});
`;

export const PagingItem4 = styled.div`
	${PagingItem}
	background-image: url(${arenaIcon4});
`;

export const PagingItem5 = styled.div`
	${PagingItem}
	background-image: url(${arenaIcon5});
`;

export const PagingItem6 = styled.div`
	${PagingItem}
	background-image: url(${arenaIcon6});
`;

export const PagingItem7 = styled.div`
	${PagingItem}
	background-image: url(${arenaIcon7});
`;

export const PagingItem8 = styled.div`
	${PagingItem}
	background-image: url(${arenaIcon8});
`;

export const PagingItem9 = styled.div`
	${PagingItem}
	background-image: url(${arenaIcon9});
`;

export const PagingItem10 = styled.div`
	${PagingItem}
	background-image: url(${arenaIcon10});
`;

export const PagingItem11 = styled.div`
	${PagingItem}
	background-image: url(${arenaIcon11});
`;
