import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { themeGame } from "../Commander.styles";
import arenaIcon1 from "./game/images/arenas/arenaIcon1.png";
import arenaIcon2 from "./game/images/arenas/arenaIcon2.png";
import arenaIcon3 from "./game/images/arenas/arenaIcon3.png";
import buttonActive from "./images/buttonActive.png";
import bg from "./images/menuBg.png";

export const PageMenu = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primary200};
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
	background-size: cover;
`;

export const PageContainer = styled.div`
	position: absolute;
	width: 375px;
	height: 595px;
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
	background-image: url(${buttonActive});
	z-index: 1;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50% 50%;
	color: ${themeGame.button.active.text};
	transition: all 0.1s ease;
	border: none;
	background-color: transparent;
	font-family: inherit;

	&:active {
		transform: scale(0.97);
		color: ${themeGame.button.active.pressed.text};
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

	height: 350px;
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
