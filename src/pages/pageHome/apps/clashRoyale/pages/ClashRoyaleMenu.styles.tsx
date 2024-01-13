import styled from "styled-components";
import supercellMagicFont from "./game/fonts/SupercellMagicFont.ttf";
import bg from "./game/images/misc/bg.webp";
import splash0 from "./game/images/misc/splash_0.png";
import splash1 from "./game/images/misc/splash_1.png";
import splash2 from "./game/images/misc/splash_2.png";
import buttonYellow from "./game/images/misc/button_yellow.png";
import arenaIcon1 from "./game/images/arenas/arenaIcon1.png";

export const ClashRoyaleMenu = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};

	@font-face {
		font-family: "clashRoyaleFont";
		font-weight: normal;
		font-style: normal;
		src: url(${supercellMagicFont});
	}

	font-family: "clashRoyaleFont", sans-serif;
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
	bottom: 100px;
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

export const Paging = styled.div`
	overflow: hidden;
	background-position: 0px 0px;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;

	height: 250px;
	bottom: 200px;
	top: auto;
`;

export const PagingItem = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50%;

	background-image: url(${arenaIcon1});
`;
